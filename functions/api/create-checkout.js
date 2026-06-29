const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

const clean = (value, limit = 80) =>
  typeof value === 'string' ? value.slice(0, limit) : '';

const cleanList = (value, limit = 12) =>
  Array.isArray(value)
    ? value.filter(v => typeof v === 'string').map(v => v.slice(0, 40)).slice(0, limit)
    : [];

async function writeEvent(env, event, body) {
  if (!env.ANALYTICS) return;
  await env.ANALYTICS.put(`event:${Date.now()}:${crypto.randomUUID()}`, JSON.stringify({
    ts: new Date().toISOString(),
    event,
    userId: clean(body.userId),
    path: '',
    supplements: cleanList(body.supplements),
    targets: cleanList(body.targets),
  }));
}

function siteUrl(request, env) {
  return (env.PUBLIC_URL || new URL(request.url).origin).replace(/\/$/, '');
}

function isMobile(request) {
  return /Android|iPhone|iPad|iPod|Mobile/i.test(request.headers.get('user-agent') || '');
}

function normalizePrivateKey(value) {
  return String(value || '')
    .replace(/\\n/g, '\n')
    .replace(/-----BEGIN PRIVATE KEY-----|-+END PRIVATE KEY-----|\s/g, '');
}

function base64ToBytes(value) {
  const binary = atob(value);
  return Uint8Array.from(binary, char => char.charCodeAt(0));
}

function base64Url(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  bytes.forEach(byte => { binary += String.fromCharCode(byte); });
  return btoa(binary);
}

async function rsaSign(privateKey, value) {
  const key = await crypto.subtle.importKey(
    'pkcs8',
    base64ToBytes(normalizePrivateKey(privateKey)),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  return base64Url(await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(value)));
}

function signedContent(params) {
  return [...params.entries()]
    .filter(([key, value]) => key !== 'sign' && value !== undefined && value !== '')
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
}

async function alipayCheckout(request, env, reportId, body) {
  if (!env.ALIPAY_APP_ID || !env.ALIPAY_APP_PRIVATE_KEY) return null;

  const base = siteUrl(request, env);
  const mobile = isMobile(request);
  const method = mobile ? 'alipay.trade.wap.pay' : 'alipay.trade.page.pay';
  const amount = String(env.ALIPAY_AMOUNT || '6.90');
  const params = new URLSearchParams({
    app_id: env.ALIPAY_APP_ID,
    method,
    format: 'JSON',
    charset: 'utf-8',
    sign_type: 'RSA2',
    timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
    version: '1.0',
    return_url: `${base}/?report=${encodeURIComponent(reportId)}#result`,
    notify_url: `${base}/api/payment-webhook`,
    biz_content: JSON.stringify({
      out_trade_no: reportId,
      total_amount: amount,
      subject: env.ALIPAY_SUBJECT || '完整 PDF 报告',
      product_code: mobile ? 'QUICK_WAP_WAY' : 'FAST_INSTANT_TRADE_PAY',
      passback_params: encodeURIComponent(clean(body.userId)),
    }),
  });

  params.set('sign', await rsaSign(env.ALIPAY_APP_PRIVATE_KEY, signedContent(params)));
  const gateway = env.ALIPAY_GATEWAY || 'https://openapi.alipay.com/gateway.do';
  return json({ url: `${gateway}?${params.toString()}`, reportId, provider: 'alipay' });
}

function manualCheckout(env, reportId) {
  if (env.ALIPAY_MANUAL_PAYMENT === '0') return null;
  return json({
    provider: 'manual_alipay',
    reportId,
    orderId: reportId,
    amount: String(env.ALIPAY_AMOUNT || '6.90'),
    qrUrl: env.ALIPAY_PERSONAL_QR_URL || '/assets/alipay-qr.jpg',
    confirmEndpoint: '/api/notify-payment',
  });
}

function paymentLinkUrl(env, reportId) {
  if (!env.PAYMENT_LINK_URL) return '';
  const url = new URL(env.PAYMENT_LINK_URL);
  url.searchParams.set('reportId', reportId);
  return url.toString();
}

async function stripeCheckout(request, env, reportId, body) {
  if (!env.STRIPE_SECRET_KEY || !env.STRIPE_PRICE_ID) return null;

  const base = siteUrl(request, env);
  const params = new URLSearchParams({
    mode: 'payment',
    'line_items[0][price]': env.STRIPE_PRICE_ID,
    'line_items[0][quantity]': '1',
    client_reference_id: reportId,
    success_url: `${base}/?report=${encodeURIComponent(reportId)}#result`,
    cancel_url: `${base}/#result`,
    'metadata[reportId]': reportId,
    'metadata[userId]': clean(body.userId),
    'metadata[quizSet]': clean(body.quizSet, 40),
  });

  const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });
  const data = await res.json();
  if (!res.ok) return json({ error: data.error?.message || 'stripe checkout failed' }, 502);
  return json({ url: data.url, reportId, provider: 'stripe' });
}

export async function onRequestPost({ request, env }) {
  if (!env.ANALYTICS) return json({ error: 'ANALYTICS KV binding missing' }, 500);

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json({ error: 'invalid json' }, 400);
  }

  const reportId = clean(body.reportId);
  const userId = clean(body.userId);
  if (!reportId || !userId) return json({ error: 'missing reportId or userId' }, 400);

  await env.ANALYTICS.put(`checkout:${reportId}`, JSON.stringify({
    reportId,
    userId,
    quizSet: clean(body.quizSet, 40),
    lang: clean(body.lang, 12),
    amount: String(env.ALIPAY_AMOUNT || '6.90'),
    supplements: cleanList(body.supplements),
    targets: cleanList(body.targets),
    createdAt: new Date().toISOString(),
    paid: false,
  }));
  await writeEvent(env, 'checkout_start', body);

  const manual = manualCheckout(env, reportId);
  if (manual) return manual;

  const alipay = await alipayCheckout(request, env, reportId, body);
  if (alipay) return alipay;

  const stripe = await stripeCheckout(request, env, reportId, body);
  if (stripe) return stripe;

  const url = paymentLinkUrl(env, reportId);
  if (url) return json({ url, reportId, provider: 'payment_link' });

  return json({ error: 'payment provider not configured' }, 500);
}
