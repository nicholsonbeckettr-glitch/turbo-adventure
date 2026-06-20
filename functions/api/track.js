const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

const cleanList = (value, limit = 12) =>
  Array.isArray(value)
    ? value.filter(v => typeof v === 'string').map(v => v.slice(0, 40)).slice(0, limit)
    : [];

export async function onRequestPost({ request, env }) {
  if (!env.ANALYTICS) return json({ error: 'ANALYTICS KV binding missing' }, 500);

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json({ error: 'invalid json' }, 400);
  }

  const event = typeof body.event === 'string' ? body.event : '';
  const userId = typeof body.userId === 'string' ? body.userId.slice(0, 80) : '';
  if (!['page_view', 'quiz_start', 'result', 'copy_report', 'download_report'].includes(event) || !userId) {
    return json({ error: 'invalid event' }, 400);
  }

  const now = new Date().toISOString();
  const userKey = `user:${userId}`;
  const existingUser = await env.ANALYTICS.get(userKey, 'json');
  await env.ANALYTICS.put(userKey, JSON.stringify({
    firstSeen: existingUser?.firstSeen || now,
    lastSeen: now,
  }));

  await env.ANALYTICS.put(`event:${Date.now()}:${crypto.randomUUID()}`, JSON.stringify({
    ts: now,
    event,
    userId,
    path: typeof body.path === 'string' ? body.path.slice(0, 120) : '',
    supplements: cleanList(body.supplements),
    targets: cleanList(body.targets),
  }));

  return json({ ok: true });
}
