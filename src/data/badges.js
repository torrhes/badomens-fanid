const BADGES = [
  { name: 'THE FIRST OMEN', level: 12 },
  { name: 'ORIGINAL SIN', level: 11 },
  { name: 'THE INITIATED', level: 10 },
  { name: 'KINGDOM OF CARDS', level: 9 },
  { name: 'HELLBOUND', level: 8 },
  { name: 'THORN-BOUND', level: 7 },
  { name: 'DETHRONE', level: 6 },
  { name: 'CONCRETE JUNGLE', level: 5 },
  { name: 'JUST PRETENDING', level: 4 },
  { name: 'SPECTER', level: 3 },
  { name: 'FRESH OMEN', level: 2 },
  { name: 'BABY OMENS', level: 1 }
];

export function getBadge(year) {
  const y = Number(year);

  if (!Number.isFinite(y) || y < 2015) {
    return BADGES[0];
  }

  if (y >= 2026) {
    return BADGES[BADGES.length - 1];
  }

  const index = y - 2015;
  return BADGES[Math.min(index, BADGES.length - 1)];
}
