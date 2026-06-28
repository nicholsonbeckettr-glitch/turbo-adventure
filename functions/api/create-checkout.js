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
    supplements: cleanList(body.supplements),
    targets: cleanList(body.targets),
    createdAt: new Date().toISOString(),
    paid: false,
  }));
  await writeEvent(env, 'checkout_start', body);

  const stripe = await stripeCheckout(request, env, reportId, body);
  if (stripe) return stripe;

  const url = paymentLinkUrl(env, reportId);
  if (url) return json({ url, reportId, provider: 'payment_link' });

  return json({ error: 'payment provider not configured' }, 500);
}
