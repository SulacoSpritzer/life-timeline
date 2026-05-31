// Shared sample profiles for tests. Keep these representative of real onboarding output.
export const demo = {
  birthYear: 1985, sex: 'female', birthRegion: 'US Midwest', currentRegion: 'US Midwest',
  profession: 'knowledge work', education: 'college', health: { smoker: false, conditions: [] },
  familyHistory: ['heart disease', 'dementia'],
  partner: { status: 'married', since: 2013 },
  children: [{ birthYear: 2015 }, { birthYear: 2018 }],
  parents: [{ birthYear: 1958, sex: 'male', alive: true }, { birthYear: 1958, sex: 'female', alive: true }],
  pastRelationships: [], pastEvents: [], disposition: { caregiving: 'med' },
};

export const minimal = { birthYear: 1990, sex: 'male' };                       // only required fields
export const smokerHS = { birthYear: 1985, sex: 'male', education: 'high', health: { smoker: true } };
export const collegeNS = { birthYear: 1985, sex: 'male', education: 'college', health: { smoker: false } };
export const maleNoHistory = { birthYear: 1985, sex: 'male' };                 // no family history, male
export const femaleNoHistory = { birthYear: 1985, sex: 'female' };

export const allProfiles = [demo, minimal, smokerHS, collegeNS, maleNoHistory, femaleNoHistory];
