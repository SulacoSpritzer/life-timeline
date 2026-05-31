// Core data model + shared constants for Life Timeline.
// JSDoc typedefs document the engine's output contract (portable to TypeScript later).

/** Current calendar year (app runtime). */
export const NOW = new Date().getFullYear();

/** A point in time with an uncertainty range. @typedef {{est:number, lo:number, hi:number}} Pt */
/** Build a Pt. @param {number} est @param {number} [lo] @param {number} [hi] @returns {Pt} */
export const pt = (est, lo, hi) => ({ est, lo: lo ?? est, hi: hi ?? est });

/**
 * One thing on the timeline. This is exactly what every generator emits.
 * @typedef {Object} Item
 * @property {string} id                     stable id (used by derived/affects links)
 * @property {string} dom                    domain id: self|career|finances|partner|children|parents
 * @property {'phase'|'event'} kind          a span (phase) or a moment (event)
 * @property {string} label
 * @property {Pt} [s]                         phase start
 * @property {Pt} [e]                         phase end
 * @property {Pt} [at]                        event time
 * @property {'recorded'|'data'|'inferred'} prov   where it came from
 * @property {number} conf                   0..1 confidence
 * @property {string} basis                  plain-language reason
 * @property {string} source                 citation / source label
 * @property {'onboarding'|'data'|'inferred'|'deep-dive'} addedBy
 * @property {{v:number,label:string}} [sentiment]  how it felt (-2..2)
 * @property {boolean} [historical]          surfaced on a deep dive (past event)
 * @property {boolean} [highlight]           emphasized (single accent)
 * @property {boolean} [dispo]               shaped by disposition (recomputes live)
 * @property {string[]} [derived]            ids this was derived from
 * @property {string[]} [affects]            ids this reaches into
 * @property {boolean} [risk]                flag (e.g. relationship strain)
 */

/** The six life domains, in display order. */
export const DOMAINS = [
  { id: 'physical', label: 'Physical health' },
  { id: 'mental', label: 'Mental well-being' },
  { id: 'events', label: 'Life events' },
  { id: 'career', label: 'Career' },
  { id: 'finances', label: 'Finances' },
  { id: 'partner', label: 'Partner' },
  { id: 'children', label: 'Children' },
  { id: 'parents', label: 'Parents' },
];
export const DOM = Object.fromEntries(DOMAINS.map((d) => [d.id, d]));

/**
 * The profile captured at onboarding (and enriched on deep dives).
 * @typedef {Object} Profile
 * @property {number} birthYear              required
 * @property {'male'|'female'|'other'} sex   required
 * @property {string} [birthRegion]
 * @property {string} [currentRegion]
 * @property {string} [profession]
 * @property {string} [education]
 * @property {{smoker?:boolean, conditions?:string[]}} [health]
 * @property {{status:'married'|'partnered'|'single', since?:number}} [partner]
 * @property {{birthYear:number}[]} [children]
 * @property {{birthYear:number, sex:'male'|'female'|'other', alive:boolean, diedYear?:number}[]} [parents]
 * @property {{birthYear?:number, endYear?:number, label?:string, sentiment?:number}[]} [pastRelationships]
 * @property {{year:number, label:string, sentiment?:number, kind?:'event'|'phase', endYear?:number}[]} [pastEvents]
 * @property {{caregiving:'low'|'med'|'high'}} [disposition]
 */

/** A blank profile with sensible defaults. @returns {Profile} */
export const emptyProfile = () => ({
  birthYear: undefined,
  sex: undefined,
  birthRegion: '',
  currentRegion: '',
  profession: '',
  education: '',
  health: { smoker: false, conditions: [] },
  familyHistory: [],
  partner: { status: 'single' },
  children: [],
  parents: [],
  pastRelationships: [],
  pastEvents: [],
  disposition: { caregiving: 'med' },
});

export const clampYear = (y) => Math.max(1900, Math.min(2200, Math.round(y)));
