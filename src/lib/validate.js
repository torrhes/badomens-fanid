export const normalizeHandle = (v) => v.trim().replace(/^@+/, '');
export const isValidHandle = (h) => /^[A-Za-z0-9_]{1,15}$/.test(h);
export const SHARE_TEXT = 'I made my Bad Omens Fan ID. What’s your Top 5? #BadOmens';
