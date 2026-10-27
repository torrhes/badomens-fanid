export const normalizeHandle = (v) => v.trim().replace(/^@+/, '');
export const isValidHandle = (h) => /^[A-Za-z0-9_]{1,15}$/.test(h);
export const isCardComplete = ({ handle, year, top }) => {
  const validHandle = isValidHandle(handle);
  const validYear = Boolean(year);
  const validTop = Array.isArray(top) && top.filter(Boolean).length === 5;
  return validHandle && validYear && validTop;
};
export const SHARE_TEXT =
  'I got my Bad Omens Fan ID 🖤 What’s your Top 5? Show me yours.';
export const SHARE_URL = 'https://bo-fan-id.vercel.app/';
