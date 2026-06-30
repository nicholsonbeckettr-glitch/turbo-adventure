const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

async function listKeys(kv, prefix) {
  const keys = [];
  let cursor;
  do {
    const page = await kv.list({ prefix, cursor, limit: 1000 });
    keys.push(...page.keys.map(k => k.name));
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);
  return keys;
}

const bump = (obj, key) => {
  if (key) obj[key] = (obj[key] || 0) + 1;
};

function authorized(request, env) {
  const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  return Boolean(env.ADMIN_TOKEN && token === env.ADMIN_TOKEN);
}

function normalizeReportInput(value) {
  return String(value || '')
    .trim()
    .replace(/^(订单号|訂單號|报告码|報告碼|report\s*id|order\s*id)\s*[:：#-]?\s*/i, '')
    .replace(/\s+/g, '')
    .slice(0, 80);
}

async function resolveReportId(env, rawValue) {
  const input = normalizeReportInput(rawValue);
  if (!input) {
    return { error: '请先输入付款弹窗里的订单号 / reportId / 报告码。', status: 400 };
  }

  const exactCheckout = await env.ANALYTICS.get(`checkout:${input}`, 'json');
  const exactPaid = await env.ANALYTICS.get(`paid:${input}`, 'json');
  if (exactCheckout || exactPaid) return { reportId: input, input };

  if (input.length < 6) {
    return { error: '报告码太短，请至少输入前 6 位，或输入完整订单号。', status: 400 };
  }

  const lowerInput = input.toLowerCase();
  const checkoutKeys = await listKeys(env.ANALYTICS, 'checkout:');
  const matches = checkoutKeys
    .map(key => key.slice('checkout:'.length))
    .filter(reportId => reportId.toLowerCase().startsWith(lowerInput));

  if (matches.length === 1) return { reportId: matches[0], input };
  if (matches.length > 1) {
    return { error: '这个报告码匹配到多个订单，请输入更完整的订单号。', status: 409 };
  }

  return {
    error: '没有找到这个订单号对应的待付款报告。请确认输入的是付款弹窗里的订单号/reportId，不是支付宝或微信流水号。',
    status: 404,
  };
}

async function markPaid(env, reportId) {
  const now = new Date().toISOString();
  const checkout = await env.ANALYTICS.get(`checkout:${reportId}`, 'json');
  await env.ANALYTICS.put(`paid:${reportId}`, JSON.stringify({ reportId, provider: 'manual', paidAt: now }));
  if (checkout) {
    await env.ANALYTICS.put(`checkout:${reportId}`, JSON.stringify({ ...checkout, paid: true, paidAt: now }));
  }
  await env.ANALYTICS.put(`event:${Date.now()}:${crypto.randomUUID()}`, JSON.stringify({
    ts: now,
    event: 'payment_success',
    userId: checkout?.userId || 'manual',
    path: '',
    supplements: checkout?.supplements || [],
    targets: checkout?.targets || [],
  }));
}

export async function onRequestGet({ request, env }) {
  if (!env.ANALYTICS) return json({ error: 'ANALYTICS KV binding missing' }, 500);
  if (!env.ADMIN_TOKEN) return json({ error: 'ADMIN_TOKEN missing' }, 500);

  if (!authorized(request, env)) return json({ error: 'unauthorized' }, 401);

  const [eventKeys, userKeys] = await Promise.all([
    listKeys(env.ANALYTICS, 'event:'),
    listKeys(env.ANALYTICS, 'user:'),
  ]);

  const events = await Promise.all(eventKeys.slice(-1000).map(key => env.ANALYTICS.get(key, 'json')));
  const stats = {
    users: userKeys.length,
    events: eventKeys.length,
    byEvent: {},
    supplements: {},
    targets: {},
    daily: {},
    recent: [],
  };

  events.filter(Boolean).forEach(item => {
    bump(stats.byEvent, item.event);
    bump(stats.daily, item.ts?.slice(0, 10));
    (item.supplements || []).forEach(id => bump(stats.supplements, id));
    (item.targets || []).forEach(target => bump(stats.targets, target));
  });

  stats.recent = events
    .filter(Boolean)
    .sort((a, b) => String(b.ts).localeCompare(String(a.ts)))
    .slice(0, 20)
    .map(({ ts, event, path, supplements, targets }) => ({ ts, event, path, supplements, targets }));

  return json(stats);
}

export async function onRequestPost({ request, env }) {
  if (!env.ANALYTICS) return json({ error: 'ANALYTICS KV binding missing' }, 500);
  if (!env.ADMIN_TOKEN) return json({ error: 'ADMIN_TOKEN missing' }, 500);
  if (!authorized(request, env)) return json({ error: 'unauthorized' }, 401);

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json({ error: 'invalid json' }, 400);
  }

  const resolved = await resolveReportId(env, body.reportId);
  if (resolved.error) return json({ error: resolved.error }, resolved.status);

  await markPaid(env, resolved.reportId);
  return json({ ok: true, reportId: resolved.reportId, input: resolved.input });
}
