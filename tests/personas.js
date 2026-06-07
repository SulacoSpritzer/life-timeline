// Synthetic users spanning background: sex, age, class/wealth (proxied by education +
// profession + region, since we don't collect income yet), education, collar, health,
// and major health events. Used by personas.test.js (deterministic) and the LLM-judge eval.
//
// NOTE: "wealth" is only proxied today — there is no income/wealth input wired in, so the
// income–mortality gradient fact in the corpus is not yet applied. Flagged on purpose.

const parents = (motherBirth, fatherBirth, aliveOpts = {}) => [
  { birthYear: fatherBirth, sex: 'male', alive: aliveOpts.fatherDied == null, diedYear: aliveOpts.fatherDied },
  { birthYear: motherBirth, sex: 'female', alive: aliveOpts.motherDied == null, diedYear: aliveOpts.motherDied },
];

/** @type {{name:string, tags:string[], profile:object}[]} */
export const PERSONAS = [
  { name: 'Young · poor · blue-collar · smoker · at-risk', tags: ['young', 'poor', 'blue-collar', 'unhealthy', 'male'],
    profile: { birthYear: 2000, sex: 'male', birthRegion: 'rural South', currentRegion: 'rural South', education: 'high', profession: 'manual / trades', health: { smoker: true, conditions: [] }, familyHistory: ['heart disease', 'addiction'], partner: { status: 'single' }, children: [], parents: parents(1972, 1970) } },

  { name: 'Young · educated · white-collar · healthy', tags: ['young', 'educated', 'white-collar', 'healthy', 'female'],
    profile: { birthYear: 1998, sex: 'female', currentRegion: 'urban Northeast', education: 'graduate', profession: 'knowledge work', health: { smoker: false, conditions: [] }, familyHistory: [], partner: { status: 'single' }, children: [], parents: parents(1968, 1966) } },

  { name: 'Mid · wealthy · educated · white-collar · healthy', tags: ['middle', 'wealthy', 'educated', 'white-collar', 'healthy', 'male'],
    profile: { birthYear: 1980, sex: 'male', currentRegion: 'urban West', education: 'graduate', profession: 'business / finance', health: { smoker: false, conditions: [] }, familyHistory: [], partner: { status: 'married', since: 2010 }, children: [{ birthYear: 2014 }, { birthYear: 2017 }], parents: parents(1952, 1950) } },

  { name: 'Mid · middle-class · college · family cancer', tags: ['middle', 'middle-class', 'college', 'female'],
    profile: { birthYear: 1982, sex: 'female', currentRegion: 'US Midwest', education: 'college', profession: 'education', health: { smoker: false, conditions: [] }, familyHistory: ['cancer'], partner: { status: 'married', since: 2011 }, children: [{ birthYear: 2015 }, { birthYear: 2019 }], parents: parents(1954, 1952) } },

  { name: 'Mid · poor · blue-collar · smoker · had a heart attack', tags: ['middle', 'poor', 'blue-collar', 'unhealthy', 'major-event', 'male'],
    profile: { birthYear: 1978, sex: 'male', currentRegion: 'rural Midwest', education: 'high', profession: 'manual / trades', health: { smoker: true, conditions: ['hypertension'] }, familyHistory: ['heart disease', 'type 2 diabetes'], partner: { status: 'married', since: 2003 }, children: [{ birthYear: 2005 }], parents: parents(1950, 1948, { fatherDied: 2019 }), pastEvents: [{ year: 2015, label: 'Heart attack', kind: 'event' }] } },

  { name: 'Old · wealthy · educated · healthy', tags: ['old', 'wealthy', 'educated', 'healthy', 'male'],
    profile: { birthYear: 1950, sex: 'male', currentRegion: 'urban Northeast', education: 'graduate', profession: 'business / finance', health: { smoker: false, conditions: [] }, familyHistory: [], partner: { status: 'married', since: 1978 }, children: [{ birthYear: 1982 }, { birthYear: 1985 }], parents: parents(1922, 1920, { motherDied: 2008, fatherDied: 2001 }) } },

  { name: 'Old · poor · less-educated · unhealthy', tags: ['old', 'poor', 'less-educated', 'unhealthy', 'female'],
    profile: { birthYear: 1948, sex: 'female', currentRegion: 'rural South', education: 'high', profession: 'manual / trades', health: { smoker: true, conditions: ['type 2 diabetes'] }, familyHistory: ['dementia', 'heart disease'], partner: { status: 'married', since: 1970 }, children: [{ birthYear: 1972 }], parents: parents(1920, 1918, { motherDied: 2002, fatherDied: 1995 }) } },

  { name: 'Old · middle-class · widowed · healthy', tags: ['old', 'middle-class', 'healthy', 'female'],
    profile: { birthYear: 1955, sex: 'female', currentRegion: 'US Midwest', education: 'college', profession: 'healthcare', health: { smoker: false, conditions: [] }, familyHistory: ['cancer'], partner: { status: 'single' }, children: [{ birthYear: 1985 }, { birthYear: 1988 }], parents: parents(1928, 1926, { motherDied: 2012, fatherDied: 2005 }) } },

  { name: 'Young · single · educated · no kids', tags: ['young', 'educated', 'single', 'female'],
    profile: { birthYear: 1996, sex: 'female', currentRegion: 'urban West', education: 'graduate', profession: 'creative / arts', health: { smoker: false, conditions: [] }, familyHistory: ['depression/anxiety'], partner: { status: 'single' }, children: [], parents: parents(1966, 1964) } },

  { name: 'Mid · single · public service · no kids', tags: ['middle', 'middle-class', 'single', 'male'],
    profile: { birthYear: 1979, sex: 'male', currentRegion: 'urban South', education: 'college', profession: 'public service', health: { smoker: false, conditions: [] }, familyHistory: [], partner: { status: 'single' }, children: [], parents: parents(1951, 1949) } },

  { name: 'Mid · female · family history breast cancer + dementia', tags: ['middle', 'college', 'family-history', 'female'],
    profile: { birthYear: 1981, sex: 'female', currentRegion: 'urban Northeast', education: 'college', profession: 'healthcare', health: { smoker: false, conditions: [] }, familyHistory: ['cancer', 'dementia'], partner: { status: 'married', since: 2009 }, children: [{ birthYear: 2012 }, { birthYear: 2016 }], parents: parents(1953, 1951) } },

  { name: 'Old · highly-educated · long-lived parents', tags: ['old', 'educated', 'healthy', 'female'],
    profile: { birthYear: 1952, sex: 'female', currentRegion: 'urban West', education: 'graduate', profession: 'education', health: { smoker: false, conditions: [] }, familyHistory: [], partner: { status: 'married', since: 1980 }, children: [{ birthYear: 1984 }], parents: parents(1924, 1922, { motherDied: 2018 }) } },

  { name: 'Mid · self-employed · smoker · family diabetes', tags: ['middle', 'self-employed', 'unhealthy', 'male'],
    profile: { birthYear: 1976, sex: 'male', currentRegion: 'rural West', education: 'college', profession: 'self-employed', health: { smoker: true, conditions: [] }, familyHistory: ['type 2 diabetes', 'depression/anxiety'], partner: { status: 'married', since: 2004 }, children: [{ birthYear: 2008 }], parents: parents(1948, 1946) } },

  { name: 'Young · recovered major illness', tags: ['young', 'college', 'major-event', 'male'],
    profile: { birthYear: 1995, sex: 'male', currentRegion: 'US Midwest', education: 'college', profession: 'knowledge work', health: { smoker: false, conditions: [] }, familyHistory: [], partner: { status: 'partnered', since: 2021 }, children: [], parents: parents(1965, 1963), pastEvents: [{ year: 2018, label: 'Thyroid cancer (recovered)', kind: 'event' }] } },
];
