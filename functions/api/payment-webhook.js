const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

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
    userId: checkout?.userId || payload?.customer || '',
    path: '',
    supplements: checkout?.supplements || [],
    targets: checkout?.targets || [],
  }));
}

export async function onRequestPost({ request, env }) {
  if (!env.ANALYTICS) return json({ error: 'ANALYTICS KV binding missing' }, 500);

  const rawBody = await request.text();
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
