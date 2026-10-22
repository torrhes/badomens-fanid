// Serverless endpoint (Vercel/Netlify style). Env: X_BEARER_TOKEN
// GET /api/x-profile?username=handle -> { username, name, protected, photo: dataURL|null }
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const u = String(req.query.username || '').replace(/^@+/, '');
  if (!/^[A-Za-z0-9_]{1,15}$/.test(u)) return res.status(400).json({ error: 'invalid_username' });
  const r = await fetch(`https://api.x.com/2/users/by/username/${u}?user.fields=profile_image_url,protected,name`,
    { headers: { Authorization: `Bearer ${process.env.X_BEARER_TOKEN}` } });
  if (!r.ok) return res.status(r.status).json({ error: 'x_api_error' });
  const d = (await r.json()).data;
  if (!d) return res.status(404).json({ error: 'not_found' });
  let photo = null;
  if (!d.protected && d.profile_image_url) {
    const img = await fetch(d.profile_image_url.replace('_normal', '_400x400'));
    if (img.ok) photo = `data:${img.headers.get('content-type')};base64,` + Buffer.from(await img.arrayBuffer()).toString('base64');
  }
  res.status(200).json({ username: d.username, name: d.name, protected: !!d.protected, photo });
}
