const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

const text = (body, status = 200) =>
  new Response(body, {
    status,
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });

function normalizePublicKey(value) {
  return String(value || '')
    .replace(/\\n/g, '\n')
    .replace(/-----BEGIN PUBLIC KEY-----|-+END PUBLIC KEY-----|\s/g, '');
}

function base64ToBytes(value) {
  const binary = atob(value);
  return Uint8Array.from(binary, char => char.charCodeAt(0));
}

function hex(buffer) {
  return [...new Uint8Array(buffer)]
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
}

async function hmacHex(secret, value) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  return hex(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value)));
}

async function verifyStripeSignature(request, env, rawBody) {
  if (!env.STRIPE_WEBHOOK_SECRET) return false;
  const header = request.headers.get('stripe-signature') || '';
  const parts = Object.fromEntries(header.split(',').map(part => part.split('=')));
  if (!parts.t || !parts.v1) return false;
  const expected = await hmacHex(env.STRIPE_WEBHOOK_SECRET, `${parts.t}.${rawBody}`);
  return expected === parts.v1;
}

function alipaySignedContent(params) {
  return [...params.entries()]
    .filter(([key, value]) => key !== 'sign' && key !== 'sign_type' && value !== undefined && value !== '')
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
}

function sameAmount(actual, expected) {
  return Number(actual).toFixed(2) === Number(expected).toFixed(2);
}

async function verifyAlipaySignature(env, params) {
  if (!env.ALIPAY_PUBLIC_KEY || params.get('sign_type') !== 'RSA2') return false;
  const key = await crypto.subtle.importKey(
    'spki',
    base64ToBytes(normalizePublicKey(env.ALIPAY_PUBLIC_KEY)),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['verify'],
  );
  return crypto.subtle.verify(
    'RSASSA-PKCS1-v1_5',
    key,
    base64ToBytes(params.get('sign') || ''),
    new TextEncoder().encode(alipaySignedContent(params)),
  );
}

async function markPaid(env, reportId, provider, payload) {
  const now = new Date().toISOString();
  await env.ANALYTICS.put(`paid:${reportId}`, JSON.stringify({ reportId, provider, paidAt: now }));

  const checkout = await env.ANALYTICS.get(`checkout:${reportId}`, 'json');
  if (checkout) {
    await env.ANALYTICS.put(`checkout:${reportId}`, JSON.stringify({ ...checkout, paid: true, paidAt: now }));
  }

  await env.ANALYTICS.put(`event:${Date.now()}:${crypto.randomUUID()}`, JSON.stringify({
    ts: now,
    event: 'payment_success',
    userId: checkout?.userId || payload?.customer || payload?.buyer_id || '',
    path: '',
    supplements: checkout?.supplements || [],
    targets: checkout?.targets || [],
  }));
}

async function handleAlipayNotify(env, rawBody) {
  const params = new URLSearchParams(rawBody);
  const verified = await verifyAlipaySignature(env, params);
  if (!verified) return text('failure', 400);

  const reportId = params.get('out_trade_no')?.slice(0, 80);
  const status = params.get('trade_status');
  if (!reportId || !['TRADE_SUCCESS', 'TRADE_FINISHED'].includes(status)) return text('success');
  if (env.ALIPAY_APP_ID && params.get('app_id') !== env.ALIPAY_APP_ID) return text('failure', 400);

  const checkout = await env.ANALYTICS.get(`checkout:${reportId}`, 'json');
  const expectedAmount = checkout?.amount || env.ALIPAY_AMOUNT;
  if (!checkout || !sameAmount(params.get('total_amount'), expectedAmount)) return text('failure', 400);

  await markPaid(env, reportId, 'alipay', Object.fromEntries(params.entries()));
  return text('success');
}

export async function onRequestPost({ request, env }) {
  if (!env.ANALYTICS) return json({ error: 'ANALYTICS KV binding missing' }, 500);

  const rawBody = await request.text();
  const contentType = request.headers.get('content-type') || '';
  if (contentType.includes('application/x-www-form-urlencoded')) {
    return handleAlipayNotify(env, rawBody);
  }

  const verified = await verifyStripeSignature(request, env, rawBody);
  if (!verified) return json({ error: 'invalid signature' }, 400);

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch (e) {
    return json({ error: 'invalid json' }, 400);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data?.object || {};
    const reportId = session.metadata?.reportId || session.client_reference_id;
    if (reportId) await markPaid(env, String(reportId).slice(0, 80), 'stripe', session);
  }

  return json({ received: true });
}
