export async function fetchXProfile(handle) {
  const url = `https://unavatar.io/x/${encodeURIComponent(handle)}?fallback=false`;
  let r;
  try {
    r = await fetch(url);
  } catch {
    throw new Error('failed');
  }
  if (r.status === 404)
    return { username: handle, name: '', protected: false, photo: null };
  if (!r.ok) throw new Error('failed');
  const blob = await r.blob();
  if (!blob.type.startsWith('image/'))
    return { username: handle, name: '', protected: false, photo: null };
  const photo = await new Promise((res, rej) => {
    const f = new FileReader();
    f.onload = () => res(f.result);
    f.onerror = rej;
    f.readAsDataURL(blob);
  });
  return { username: handle, name: '', protected: false, photo };
}
