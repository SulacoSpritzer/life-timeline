// Render a profile's engine output as readable text — for human review and the LLM judge.
import { run } from '../../src/engine/engine.js';
import { DOMAINS, NOW } from '../../src/model.js';

export function renderTimelineText(profile, name = '') {
  const items = run(profile);
  const byDom = {};
  for (const it of items) (byDom[it.dom] ||= []).push(it);
  const when = (it) => (it.kind === 'event' ? `${it.at.est}` : `${it.s.est}–${it.e.est}`);
  const fh = (profile.familyHistory || []).join(', ') || 'none';
  const par = (profile.parents || []).map((p) => (p.alive === false ? `deceased ${p.diedYear || ''}`.trim() : `b.${p.birthYear}`)).join(', ') || '—';

  let out = (name ? `# ${name}\n` : '');
  out += `Profile: born ${profile.birthYear} (age ${NOW - profile.birthYear}) · ${profile.sex} · ${profile.education || '—'} · ${profile.profession || '—'} · ${profile.currentRegion || '—'} · ${profile.health?.smoker ? 'smoker' : 'non-smoker'} · family history: ${fh} · ${profile.partner?.status || 'single'} · ${(profile.children || []).length} children · parents: ${par}\n\n`;

  for (const d of DOMAINS) {
    const di = byDom[d.id];
    if (!di || !di.length) continue;
    di.sort((a, b) => (a.kind === 'event' ? a.at.est : a.s.est) - (b.kind === 'event' ? b.at.est : b.s.est));
    out += `${d.label.toUpperCase()}\n`;
    for (const it of di) out += `  ${when(it).padEnd(11)} ${it.label} [${it.prov}, ${Math.round(it.conf * 100)}%] — ${it.source}\n`;
    out += '\n';
  }
  return out.trim();
}
