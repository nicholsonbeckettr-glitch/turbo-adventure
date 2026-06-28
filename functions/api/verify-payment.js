const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

export async function onRequestGet({ request, env }) {
  if (!env.ANALYTICS) return json({ error: 'ANALYTICS KV binding missing' }, 500);

  const reportId = new URL(request.url).searchParams.get('reportId')?.slice(0, 80);
  if (!reportId) return json({ error: 'missing reportId' }, 400);

  const paid = await env.ANALYTICS.get(`paid:${reportId}`, 'json');
  return json({ paid: Boolean(paid), reportId });
}
