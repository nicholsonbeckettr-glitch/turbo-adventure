const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

const clean = (value, limit = 120) =>
  typeof value === 'string' ? value.slice(0, limit) : '';

function siteUrl(request, env) {
  return (env.PUBLIC_URL || new URL(request.url).origin).replace(/\/$/, '');
}

function base64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  bytes.forEach(byte => { binary += String.fromCharCode(byte); });
  return btoa(binary);
}

async function feishuSign(secret, timestamp) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(`${timestamp}\n${secret}`),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  return base64(await crypto.subtle.sign('HMAC', key, new Uint8Array()));
}

async function sendFeishu(env, message) {
  if (!env.FEISHU_WEBHOOK_URL) return false;
  const timestamp = String(Math.floor(Date.now() / 1000));
  const payload = {
    msg_type: 'text',
    content: { text: message },
  };
  if (env.FEISHU_BOT_SECRET) {
    payload.timestamp = timestamp;
    payload.sign = await feishuSign(env.FEISHU_BOT_SECRET, timestamp);
  }
  const res = await fetch(env.FEISHU_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.ok;
}

export async function onRequestPost({ request, env }) {
  if (!env.ANALYTICS) return json({ error: 'ANALYTICS KV binding missing' }, 500);

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json({ error: 'invalid json' }, 400);
  }

  const reportId = clean(body.reportId, 80);
  const userId = clean(body.userId, 80);
  if (!reportId || !userId) return json({ error: 'missing reportId or userId' }, 400);

  const checkout = await env.ANALYTICS.get(`checkout:${reportId}`, 'json');
  if (!checkout) return json({ error: 'checkout not found' }, 404);

  const pendingKey = `manual-payment:${reportId}`;
  const existing = await env.ANALYTICS.get(pendingKey, 'json');
  if (existing?.notifiedAt) return json({ ok: true, duplicate: true, reportId });

  const now = new Date().toISOString();
  await env.ANALYTICS.put(pendingKey, JSON.stringify({
    reportId,
    userId,
    amount: checkout.amount || env.ALIPAY_AMOUNT || '6.90',
    createdAt: now,
    status: 'pending',
  }));
  await env.ANALYTICS.put(`event:${Date.now()}:${crypto.randomUUID()}`, JSON.stringify({
    ts: now,
    event: 'manual_payment_pending',
    userId,
    path: '',
    supplements: checkout.supplements || [],
    targets: checkout.targets || [],
  }));

  const base = siteUrl(request, env);
  const ok = await sendFeishu(env, [
    '待确认支付宝订单',
    `金额：${checkout.amount || env.ALIPAY_AMOUNT || '6.90'} 元`,
    `订单号：${reportId}`,
    `时间：${now}`,
    `后台：${base}/admin.html`,
  ].join('\n'));
  if (!ok) return json({ error: 'feishu webhook failed' }, 502);

  await env.ANALYTICS.put(pendingKey, JSON.stringify({
    reportId,
    userId,
    amount: checkout.amount || env.ALIPAY_AMOUNT || '6.90',
    createdAt: now,
    notifiedAt: new Date().toISOString(),
    status: 'pending',
  }));
  return json({ ok: true, reportId });
}
