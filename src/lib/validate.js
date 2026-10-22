export const normalizeHandle = (v) => v.trim().replace(/^@+/, '');
export const isValidHandle = (h) => /^[A-Za-z0-9_]{1,15}$/.test(h);
export const SHARE_TEXT =
  'I got my Bad Omens Fan ID 🖤 What’s your Top 5? Show me yours.';
export const SHARE_URL = 'https://bo-fan-id.vercel.app/';
