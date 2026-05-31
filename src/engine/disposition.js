// Disposition: a small read on how someone tends to act, derived from their history,
// surfaced as a lens that personalizes projections. v1 exposes caregiving propensity
// as a live control; the other reads are descriptive.

export const DISP_TILT = {
  low: 'Career–family balance: toward career',
  med: 'Career–family balance: even',
  high: 'Career–family balance: toward family',
};

/** Relationship-persistence read, from any past relationships + their sentiment. */
export function relationshipText(profile) {
  const rels = profile.pastRelationships || [];
  if (!rels.length) return 'Relationship persistence: not enough history yet';
  const hardEndings = rels.filter((r) => (r.sentiment ?? 0) <= -2).length;
  if (hardEndings >= 2) return 'Relationship persistence: low — repeated hard endings';
  if (hardEndings === 1) return 'Relationship persistence: moderate';
  return 'Relationship persistence: steady';
}

/** Default caregiving propensity from the profile (falls back to 'med'). */
export function defaultCaregiving(profile) {
  return profile.disposition?.caregiving || 'med';
}
