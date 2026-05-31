// ─────────────────────────────────────────────────────────────────────────────
// INPUT REGISTRY  —  the canonical questions.
//
// The system has three separate entities:
//   1. Input   — a question / a piece of profile data we collect (THIS file). Canonical.
//   2. Fact    — a corpus item (corpus.js). It REFERENCES input ids; it never re-asks.
//   3. Profile — one person's answers, keyed by input id. Used to build their timeline.
//
// Many-to-many: one Input feeds many Facts; one Fact needs many Inputs. Because Facts
// reference a canonical input id (e.g. 'sex'), the question is defined and asked ONCE —
// never "nine different ways". And onboarding is DERIVED from the facts: an input is only
// ever asked if some fact references it (no data point ⇒ no question). See AUTHORING.md.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @typedef {Object} Input
 * @property {string} id            canonical key facts reference, e.g. 'sex'
 * @property {string} label
 * @property {string} prompt        the question text (lives here, once)
 * @property {'year'|'enum'|'number'|'boolean'|'text'|'list'|'object'} type
 * @property {string[]} [options]
 * @property {string} group         onboarding section: basics|place|work|health|family
 * @property {'core'|'standard'|'deep'} tier   when to ask (progressive)
 */

/** @type {Input[]} */
export const INPUTS = [
  { id: 'birthYear', label: 'Birth year', prompt: 'When were you born?', type: 'year', group: 'basics', tier: 'core' },
  { id: 'sex', label: 'Sex', prompt: 'What is your sex?', type: 'enum', options: ['male', 'female', 'other'], group: 'basics', tier: 'core' },
  { id: 'education', label: 'Education', prompt: 'Highest level of education?', type: 'enum', options: ['high', 'college', 'graduate'], group: 'work', tier: 'standard' },
  { id: 'profession', label: 'Profession', prompt: 'What kind of work do you do?', type: 'enum', group: 'work', tier: 'standard' },
  { id: 'currentRegion', label: 'Where you live', prompt: 'Where do you live now?', type: 'text', group: 'place', tier: 'standard' },
  { id: 'birthRegion', label: 'Where you grew up', prompt: 'Where did you grow up?', type: 'text', group: 'place', tier: 'standard' },
  { id: 'smoker', label: 'Smoking', prompt: 'Do you smoke?', type: 'boolean', group: 'health', tier: 'standard' },
  { id: 'conditions', label: 'Conditions', prompt: 'Any major health conditions?', type: 'list', group: 'health', tier: 'deep' },
  { id: 'partner', label: 'Partner', prompt: 'Are you partnered?', type: 'object', group: 'family', tier: 'standard' },
  { id: 'children', label: 'Children', prompt: 'Do you have children?', type: 'list', group: 'family', tier: 'standard' },
  { id: 'parents', label: 'Parents', prompt: "Your parents' birth years and status?", type: 'list', group: 'family', tier: 'standard' },
];

const BY_ID = Object.fromEntries(INPUTS.map((i) => [i.id, i]));
export const getInput = (id) => BY_ID[id];

/**
 * Which `conditioning` keys are askable questions (map to an input), vs. descriptive
 * metadata that is NOT a question (country, year, measure, population, …). This is how
 * we avoid turning every metadata key into a question.
 */
const COND_TO_INPUT = {
  sex: 'sex', sexes: 'sex',
  education: 'education',
  smoker: 'smoker',
  region: 'currentRegion',
  partnered: 'partner', partnerStatus: 'partner',
  profession: 'profession',
};

const tierRank = (t) => ({ core: 0, standard: 1, deep: 2 }[t] ?? 1);
const needsSexValue = (v) => v && v !== 'both' && !(Array.isArray(v) && v.length > 1);

/**
 * Derive the onboarding from the corpus: the deduplicated set of inputs that at least one
 * fact references, each with full traceability back to the facts that justify it.
 *
 * @param {import('./corpus.js').Fact[]} facts
 * @returns {{ index: Map<string,string[]>, active: {input:Input, facts:string[], count:number}[] }}
 */
export function deriveInputs(facts) {
  /** inputId -> Set(factId) — the reverse index = traceability */
  const index = new Map();
  const add = (inputId, factId) => {
    if (!BY_ID[inputId]) return;            // only real inputs become questions
    if (!index.has(inputId)) index.set(inputId, new Set());
    index.get(inputId).add(factId);
  };

  for (const f of facts) {
    if (f.emit && f.emit.as === 'none') continue;   // background facts ask nothing
    add('birthYear', f.id);                          // anything dated needs a birth year
    (f.requires || []).forEach((inp) => add(inp, f.id));     // explicit declarations
    const c = f.conditioning || {};
    for (const k of Object.keys(c)) { const inp = COND_TO_INPUT[k]; if (inp && (k !== 'sex' || needsSexValue(c[k]))) add(inp, f.id); }
    if (f.metric && f.metric.bySex) add('sex', f.id);        // a by-sex number needs sex
    if (f.appliesIf) for (const k of Object.keys(f.appliesIf)) { const inp = COND_TO_INPUT[k] || (BY_ID[k] && k); if (inp) add(inp, f.id); }
  }

  const active = [...index.keys()]
    .map((id) => ({ input: BY_ID[id], facts: [...index.get(id)], count: index.get(id).size }))
    .filter((x) => x.input)
    .sort((a, b) => tierRank(a.input.tier) - tierRank(b.input.tier) || b.count - a.count);
  return { index, active };
}

/** Traceability: which facts justify asking a given input. */
export const factsNeeding = (facts, inputId) => deriveInputs(facts).index.get(inputId) || [];
