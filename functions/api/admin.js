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

  const reportId = typeof body.reportId === 'string' ? body.reportId.trim().slice(0, 80) : '';
  if (!reportId) return json({ error: 'missing reportId' }, 400);

  await markPaid(env, reportId);
  return json({ ok: true, reportId });
}
