// Auto-assembled from the corpus research workflows (research -> independent
// adversarial verification -> structured fact). Each entry is grounded in a cited,
// published source. See CORPUS.md. Regenerate by re-running the assembler.
export const RESEARCHED_FACTS = [
  {
    "id": "career.entry-age",
    "domain": "career",
    "topic": "Workforce entry by education",
    "kind": "rate",
    "statement": "Among recent high school graduates not enrolled in college, 66.4% were in the labor force in October 2024, versus 40.0% of recent high school dropouts (ages 16-24); the per-education entry ages (~18 HS, ~20 associate, ~22 bachelor's) are modal completion ages inferred from BLS age-range definitions, not measured first-job ages.",
    "metric": {
      "value": 66.4,
      "probabilityPct": 66.4,
      "byEducation": {
        "hsGradNotEnrolledPct": 66.4,
        "hsDropoutPct": 40
      },
      "ageLo": 16,
      "ageHi": 24,
      "ageHsCompletion": 18,
      "ageAssociateCompletion": 20,
      "ageBachelorCompletion": 22
    },
    "conditioning": {
      "educationLevel": [
        "recent HS graduate not enrolled in college",
        "recent HS dropout"
      ],
      "ageRangeHsGradDropout": "16-24",
      "ageRangeAssociateCollege": "20-29",
      "period": "October 2024",
      "schoolingCompleteByAge": 25
    },
    "provenance": "data",
    "confidence": 0.85,
    "source": {
      "org": "U.S. Bureau of Labor Statistics",
      "title": "College Enrollment and Work Activity of Recent High School and College Graduates — 2024",
      "year": 2025,
      "url": "https://www.bls.gov/news.release/hsgec.nr0.htm"
    },
    "note": "The two labor-force participation rates (66.4% and 40.0%), the BLS age-range definitions (16-24 for HS graduates/dropouts; 20-29 for associate/college graduates), and the \"by age 25 most people have completed schooling\" framing are confirmed verbatim from BLS (data for Oct 2024, released April 2025; supplemented by the BLS CPS Educational Attainment page, https://www.bls.gov/cps/demographics/educational-attainment.htm). However, there is NO single official US \"median age of entering full-time work by education level\": the per-level entry ages (~18 HS, ~20 associate, ~22 bachelor's, mid-to-late 20s advanced) are modal completion ages INFERRED from BLS definitions, not measured first-job ages. Confidence on those inferred ages specifically remains ~0.6; a measured version would require custom NLSY tabulation."
  },
  {
    "id": "career.job-tenure",
    "domain": "career",
    "topic": "Lifetime job count",
    "kind": "distribution",
    "statement": "People born 1957-1964 held an average of 12.9 jobs from ages 18 to 58, with over 40% of those jobs held before age 25 (5.6 jobs at 18-24, 4.5 at 25-34, 2.9 at 35-44, 2.2 at 45-54, and 1.3 at 55-58).",
    "metric": {
      "value": 12.9,
      "ageLo": 18,
      "ageHi": 58,
      "pctBeforeAge25": 40,
      "byAge": {
        "18-24": 5.6,
        "25-34": 4.5,
        "35-44": 2.9,
        "45-54": 2.2,
        "55-58": 1.3
      },
      "durationUnder1YrStart18to24Pct": 61,
      "durationUnder5YrStart18to24Pct": 87,
      "durationUnder1YrStart45to54Pct": 21,
      "durationUnder5YrStart45to54Pct": 56,
      "cohortSize": 9964,
      "employeeTenureMedianYearsLo": 3.9,
      "employeeTenureMedianYearsHi": 4.1
    },
    "conditioning": {
      "birthCohort": "1957-1964",
      "study": "NLSY79"
    },
    "provenance": "data",
    "confidence": 0.93,
    "source": {
      "org": "U.S. Bureau of Labor Statistics",
      "title": "Number of Jobs, Labor Market Experience, Marital Status, and Health for those Born 1957-1964 (NLSY79)",
      "year": 2025,
      "url": "https://www.bls.gov/news.release/archives/nlsoy_08262025.htm"
    },
    "note": "Updated to the August 26, 2025 BLS release: 12.9 jobs over ages 18-58 (was 12.7 over 18-56), and the oldest bucket is split into 2.2 (45-54) and 1.3 (55-58). Duration percentages and the separate Employee-Tenure caveat (median ~3.9-4.1 yrs with current employer, a different program) are confirmed. Could not byte-verify live BLS pages (BLS 403-blocks WebFetch and curl); numbers confirmed via multiple independent BLS-sourced snippets plus BLS's own Threads/X posts."
  },
  {
    "id": "career.peak-title",
    "domain": "career",
    "topic": "Peak career title age",
    "kind": "milestone",
    "statement": "US chief executives (the peak/top title) have a median age of about 52, those holding any management title about 46, versus a median age of about 42 for all employed workers, with peak earnings in the 45-54 age band (~$1,213/week in 2024).",
    "metric": {
      "medianAgeChiefExecutive": 52,
      "medianAgeManagement": 46,
      "medianAgeAllWorkers": 42,
      "peakEarningsAgeLo": 45,
      "peakEarningsAgeHi": 54,
      "peakWeeklyEarningsUsd": 1213,
      "weeklyEarningsAge25to34Usd": 802,
      "chiefExecAvgAge": 51.2,
      "chiefExecAvgAgeMale": 51.7,
      "chiefExecAvgAgeFemale": 50.1,
      "firstManagerAge": 30,
      "firstCeoAge": 50,
      "fortune500CeoAvgAge": 58,
      "incomingSP500CeoAvgAge": 53
    },
    "conditioning": {
      "region": "US"
    },
    "provenance": "data",
    "confidence": 0.82,
    "source": {
      "org": "U.S. Bureau of Labor Statistics",
      "title": "Current Population Survey, Employed people by detailed occupation and age (Table 11b), annual averages",
      "year": 2023,
      "url": "https://www.bls.gov/cps/cpsaat11b.htm"
    },
    "note": "Confirmed. Headline (early 50s for peak/top executive title, mid-40s for management title-holding, 45-54 peak earnings) is correct and independently corroborated (Data USA average age ~51 for chief executives; Fortune CEO ages consistent). Caveats: (1) exact BLS decimals (52.2 / 46.4) and reference year could not be read off the live table because BLS blocks automated fetch, so treat decimals as approximate; (2) these are medians of current title-holders, a proxy for peak seniority, not age of first attainment, and BLS \"Chief executives\" includes public-sector/non-corporate roles.",
    "tags": [
      "career",
      "age",
      "executive",
      "management",
      "earnings",
      "BLS"
    ]
  },
  {
    "id": "career.second-career",
    "domain": "career",
    "topic": "Encore careers prevalence",
    "kind": "distribution",
    "statement": "In 2011, about 9 million Americans ages 44-70 (9% of that age group) were in encore careers combining purpose, social impact, and continued income, with another ~31 million interested — together about 40% (two in five) of Americans ages 44-70.",
    "metric": {
      "ageLo": 44,
      "ageHi": 70,
      "value": 9000000,
      "perDecadePct": 9,
      "interestedCount": 31000000,
      "inOrInterestedPct": 40
    },
    "conditioning": {
      "ageRange": "44-70",
      "year": 2011,
      "construct": "encore career (non-governmental research definition)"
    },
    "provenance": "data",
    "confidence": 0.85,
    "source": {
      "org": "MetLife Foundation / Civic Ventures",
      "title": "Encore Career Choices: Purpose, Passion and a Paycheck in a Tough Economy",
      "year": 2011,
      "url": "https://encore.org/wp-content/uploads/files/EncoreCareerChoices.pdf"
    },
    "note": "Publisher of record in 2011 is Civic Ventures (org later renamed Encore.org, then CoGenerate); research by Penn Schoen Berland. Methodology: two surveys — telephone survey of 930 Americans 44-70 fielded June 16-30, 2011 (±3.21% at 95% CL), and online survey of 1,408 Americans 44-70 fielded Sept 6-23, 2011. Core 9M / 9% / 31M figures verified exactly against the primary-source PDF. Caveats: 2011-vintage (~15 yrs old); \"encore career\" has no equivalent federal statistic; secondary supporting figures (AARP 7% switching; 47% career-changers at 50-59) are unverified and lower-confidence.",
    "tags": [
      "encore-career",
      "second-career",
      "career-change",
      "midlife",
      "purpose-work",
      "2011"
    ]
  },
  {
    "id": "origins.cohort-recession",
    "domain": "career",
    "topic": "Graduating into a recession (cohort effect on earnings)",
    "kind": "rate",
    "statement": "Entering the labor market during a recession cuts initial earnings by about 9% (roughly a 6-7% wage loss per 1 percentage-point rise in the graduation-year unemployment rate), shrinking by about 0.25 pp per year and largely fading after 8-15 years, though losses are effectively permanent for the most disadvantaged graduates.",
    "metric": {
      "initialEarningsLossPct": 9,
      "lossPerUnemploymentPointPctLo": 6,
      "lossPerUnemploymentPointPctHi": 7,
      "annualDeclinePctPerYear": 0.25,
      "residualLossAt15YearsPct": 2.5,
      "fadeYearsLo": 8,
      "fadeYearsHi": 15
    },
    "conditioning": {
      "appliesAt": "labor-market-entry / graduation year",
      "drivenBy": "graduation-year unemployment rate",
      "subgroup": "effects effectively permanent for least-advantaged graduates"
    },
    "provenance": "data",
    "confidence": 0.92,
    "source": {
      "org": "American Economic Journal: Applied Economics",
      "title": "The Short- and Long-Term Career Effects of Graduating in a Recession (Oreopoulos, von Wachter & Heisz); corroborated by Kahn 2010 (Labour Economics) and von Wachter 2020 (JEP)",
      "year": 2012,
      "url": "https://www.aeaweb.org/articles?id=10.1257/app.4.1.1"
    },
    "requires": [
      "birthYear",
      "education"
    ],
    "note": "Foundational coefficients (~9% initial loss, ~6-7% per pp of graduation-year unemployment, fade over 8-10 years per Oreopoulos et al.) independently confirmed verbatim against original sources and the NBER digest, and corroborated by an SF Fed letter and von Wachter's 2020 JEP synthesis (effects \"fade after ten to fifteen years\"). Kahn (2010, US NLSY) finds longer persistence with ~2.5% still significant at 15 years; the 8-10 vs 10-15 year fade reflects a real cross-dataset range (US NLSY vs Canadian administrative data), not a conflict. All three sources agree effects are effectively permanent for the most disadvantaged subgroups. Requires birthYear (to locate graduation year/macro conditions) and education (degree completion timing)."
  },
  {
    "id": "origins.mobility",
    "domain": "career",
    "topic": "Childhood neighborhood exposure and adult income mobility",
    "kind": "rate",
    "statement": "A child's adult income outcomes converge toward their destination area's average at roughly 4% per year of childhood spent there (a causal \"exposure effect\"), so moving young to a higher-opportunity area raises lifetime earnings by about $302,000 per child moved at age 8 (~$99,000 in present value); experimentally, children who moved to a lower-poverty neighborhood before age 13 earned 31% (+$3,477/yr) more in their mid-twenties.",
    "metric": {
      "perYearConvergencePct": 4,
      "mtoEarningsGainPct": 31,
      "mtoEarningsGainUsdPerYear": 3477,
      "mtoControlMeanUsdPerYear": 11270,
      "mtoAgeCutoff": 13,
      "lifetimeEarningsGainUsd": 302000,
      "lifetimeEarningsGainPvUsd": 99000,
      "avgMoveAge": 8,
      "causalSharePct": 67
    },
    "conditioning": {
      "comparison": "destination area average vs. origin",
      "moveTiming": "younger moves yield larger gains; adolescent moves show slight disruption (negative) effects",
      "causalSplitNote": "~two-thirds of cross-county variation is causal place effect, ~one-third is family sorting (softest figure)"
    },
    "provenance": "data",
    "confidence": 0.9,
    "source": {
      "org": "Quarterly Journal of Economics / Opportunity Insights",
      "title": "The Impacts of Neighborhoods on Intergenerational Mobility I: Childhood Exposure Effects (Chetty & Hendren); New Evidence from the Moving to Opportunity Experiment (Chetty, Hendren & Katz)",
      "year": 2018,
      "url": "https://opportunityinsights.org/paper/neighborhoodsi/"
    },
    "requires": [
      "birthRegion",
      "currentRegion",
      "children"
    ],
    "note": "Confirmed across top-5 journals (QJE, AER) and experimentally validated by the randomized MTO voucher design. The 4%/yr exposure rate, +31%/$302k MTO/lifetime gains, and age-13 cutoff are independently confirmed and robust. Treat the \"~two-thirds causal vs. one-third sorting\" split as an approximate estimate (could not be re-verified to the exact fraction from accessible source text); point estimates carry confidence intervals and vary by specification."
  },
  {
    "id": "children.adhd",
    "domain": "children",
    "topic": "ADHD prevalence and heritability in children",
    "kind": "rate",
    "statement": "Among US children aged 3-17, 11.4% have ever been diagnosed with ADHD (~7 million, about 1 in 9), with a strong sex skew (boys 15% vs. girls 8%) and rising with age (2.4% at 3-5, 11.5% at 6-11, 15.5% at 12-17); ADHD is among the most heritable psychiatric conditions, with twin-study heritability averaging ~74% (consensus 70-80%).",
    "metric": {
      "prevalencePct": 11.4,
      "currentPrevalencePct": 10.5,
      "prevalencePctBoys": 15,
      "prevalencePctGirls": 8,
      "prevalencePctAge3to5": 2.4,
      "prevalencePctAge6to11": 11.5,
      "prevalencePctAge12to17": 15.5,
      "heritabilityPct": 74,
      "heritabilityPctLo": 70,
      "heritabilityPctHi": 80,
      "affectedCountMillions": 7,
      "ageLo": 3,
      "ageHi": 17
    },
    "conditioning": {
      "population": "US children",
      "ageRange": "3-17",
      "year": 2022,
      "diagnosisType": "parent-reported ever-diagnosed (2022 NSCH)"
    },
    "provenance": "data",
    "confidence": 0.95,
    "source": {
      "org": "CDC",
      "title": "Data and Statistics on ADHD",
      "year": 2022,
      "url": "https://www.cdc.gov/adhd/data/index.html"
    },
    "requires": [
      "children",
      "familyHistory"
    ],
    "note": "Caveats (nuance, not contested): (1) prevalence is parent-reported diagnosis and reflects diagnosed cases; true prevalence by strict clinical criteria runs lower (~5-8%). (2) Twin-based heritability (~74%, Faraone & Larsson 2019, Molecular Psychiatry, https://www.nature.com/articles/s41380-018-0070-0; categorical/clinical estimates ~79-80%; clinical adult heritability ~0.72 per Larsson et al. 2013, Psychological Medicine, https://pmc.ncbi.nlm.nih.gov/articles/PMC4071160/) far exceeds SNP-based GWAS heritability (~14-22%), a known \"missing heritability\" gap attributed to rare variants; this does not undermine the twin-study consensus but should be flagged if used to imply specific genetic causation. (3) Heritability is a population statistic, not genetic determinism for any individual. Negligible shared-environment effect.",
    "tags": [
      "adhd",
      "neurodevelopmental",
      "heritability",
      "prevalence",
      "children",
      "mental-health"
    ]
  },
  {
    "id": "children.autism",
    "domain": "children",
    "topic": "Autism spectrum disorder prevalence, sibling recurrence, and heritability",
    "kind": "rate",
    "statement": "As of 2022 US surveillance, autism spectrum disorder is identified in 1 in 31 children (32.2 per 1,000; boys ~1 in 20, girls ~1 in 70, a 3.4:1 male-to-female ratio); a younger sibling of an affected child has about a 20% chance of being diagnosed by age 3 (~7x the population baseline), and twin studies estimate heritability at 64-91%.",
    "metric": {
      "prevalencePct": 3.22,
      "prevalenceBoysPct": 4.92,
      "prevalenceGirlsPct": 1.43,
      "maleToFemaleRatio": 3.4,
      "recurrencePct": 20.2,
      "recurrenceRelativeRisk": 7,
      "heritabilityLoPct": 64,
      "heritabilityHiPct": 91,
      "surveillanceAge": 8
    },
    "conditioning": {
      "region": "United States",
      "surveillanceYear": 2022,
      "ascertainment": "identified/diagnosed cases; long-term rise driven substantially by broadened criteria, awareness, and ascertainment",
      "recurrenceMethod": "~20% prospective cohorts vs ~7-10% population-register",
      "recurrencePredictors": "male sex, >1 affected older sibling"
    },
    "provenance": "data",
    "confidence": 0.96,
    "source": {
      "org": "CDC (MMWR Surveillance Summaries)",
      "title": "Prevalence and Early Identification of ASD Among Children Aged 4 and 8 Years — ADDM Network, 16 Sites, US, 2022",
      "year": 2025,
      "url": "https://www.cdc.gov/mmwr/volumes/74/ss/ss7402a1.htm"
    },
    "requires": [
      "children",
      "sex",
      "familyHistory"
    ],
    "note": "Prevalence 1 in 31 (32.2/1,000) up from 1 in 36 (2020) and 4.8x the first ADDM report (1 in 150); M:F ratio is narrowing (4.2 to 3.4) but the absolute boy-girl gap is widening. Sibling recurrence is method-dependent: 20.2% prospective (Ozonoff et al., Pediatrics 2024;154(2):e2023065297, BSRC, n=1,605) vs ~7-10% population-register. Heritability 64-91% from twin meta-analysis (Tick et al., J Child Psychol Psychiatry 2016;57(5):585-595; MZ correlation ~0.98, DZ 0.53-0.67; shared-environment contribution modest). All figures trace to mainstream primary sources."
  },
  {
    "id": "children.grandparenthood-age",
    "domain": "children",
    "topic": "Age at first grandchild (US)",
    "kind": "milestone",
    "statement": "In the US 1960 birth cohort, the mean age at first grandchild was about 50 (white women 49.0, black women 47.8, white men 50.8, black men 50.6), with women a few years earlier than men.",
    "metric": {
      "medianAge": 50,
      "bySex": {
        "female": 48.4,
        "male": 50.7
      },
      "byRaceSex": {
        "whiteWomen": 49,
        "blackWomen": 47.8,
        "whiteMen": 50.8,
        "blackMen": 50.6
      }
    },
    "conditioning": {
      "region": "US",
      "cohort": 1960,
      "sex": [
        "male",
        "female"
      ],
      "race": [
        "white",
        "black"
      ]
    },
    "provenance": "data",
    "confidence": 0.85,
    "source": {
      "org": "Demography (Margolis & Verdery)",
      "title": "A Cohort Perspective on the Demography of Grandparenthood: Past, Present, and Future Changes in Race and Sex Disparities in the United States",
      "year": 2019,
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6667684/"
    },
    "note": "The study stratifies by sex and race (not sex/education). The popular \"47 average\" and \"median 50 women / 54 men\" figures and the \"37% in 40s / 43% in 50s\" distribution are not backed by a rigorous primary source (only unattributed secondary content) and should be treated as low-confidence; the rigorous cohort estimate puts men closer to ~51."
  },
  {
    "id": "children.intergenerational",
    "domain": "children",
    "topic": "Intergenerational transmission of income and education",
    "kind": "gradient",
    "statement": "A child's adult economic and educational standing is strongly tied to their parents': in the US a 10-percentile rise in parental income rank predicts a ~3.4-percentile rise in the child's adult income rank (rank-rank slope ≈ 0.34), the income intergenerational elasticity (IGE) sits in a method-sensitive ~0.4–0.6 range, education elasticities run ~0.2–0.45, and decompositions attribute roughly 1/6 of the parental-education effect to genetics and ~5/6 to social/environmental factors.",
    "metric": {
      "rankRankSlope": 0.34,
      "igeLo": 0.4,
      "igeHi": 0.6,
      "educationElasticityLo": 0.2,
      "educationElasticityHi": 0.45,
      "geneticSharePct": 17,
      "socialSharePct": 83
    },
    "conditioning": {
      "region": "US national headline (rank-rank); US/UK typical (education elasticities)"
    },
    "provenance": "data",
    "confidence": 0.9,
    "source": {
      "org": "Quarterly Journal of Economics / NBER (Chetty, Hendren, Kline & Saez)",
      "title": "Where is the Land of Opportunity? The Geography of Intergenerational Mobility in the United States",
      "year": 2014,
      "url": "https://www.nber.org/system/files/working_papers/w19843/w19843.pdf"
    },
    "requires": [
      "children",
      "parents"
    ],
    "tags": [
      "intergenerational-mobility",
      "income",
      "education",
      "rank-rank",
      "IGE",
      "heritability",
      "social-mobility"
    ],
    "note": "Rank-rank slope 0.34 is rock-solid (directly confirmed in Chetty et al. 2014). Present IGE as a method-sensitive range (~0.4–0.6), not a point estimate: older studies ~0.2, Solon/Zimmerman 1992 ~0.4, Mazumder 2005 and lifecycle-corrected work ~0.5–0.6. Education elasticities ~0.2–0.45 confirmed via the 2018 Education Economics meta-regression (Engzell & Tropf). The specific US \"0.59 SD years-of-schooling gap\" figure could not be independently re-verified (paywalled, HTTP 403) — flag before publishing. The ~1/6 genetic, ~5/6 social decomposition comes from one sociological-genomics literature strand (Conley et al. 2015, Sociological Science) — cite cautiously. Supporting sources: Opportunity Insights (https://opportunityinsights.org/); Engzell & Tropf, Education Economics 26(6), 2018 (https://www.tandfonline.com/doi/abs/10.1080/09645292.2018.1517863); Conley et al. 2015, Sociological Science 2 (https://sociologicalscience.com/articles-vol2-6-82/)."
  },
  {
    "id": "children.number",
    "domain": "children",
    "topic": "US fertility rate",
    "kind": "rate",
    "statement": "The US total fertility rate was 1,621.0 births per 1,000 women in 2023 (about 1.62 children per woman) and 1,626.5 in 2024 (about 1.6), both well below the 2,100 replacement level the country has been under since 2007.",
    "metric": {
      "tfrPer1000_2023": 1621,
      "tfrPer1000_2024": 1626.5,
      "childrenPerWoman_2023": 1.62,
      "childrenPerWoman_2024": 1.63,
      "replacementPer1000": 2100,
      "replacementChildrenPerWoman": 2.1,
      "gfrPer1000_2024": 53.8,
      "gfrPer1000_2023": 54.5,
      "totalBirths_2024": 3628934,
      "totalBirths_2023": 3596017,
      "cohortFertilityApprox": 2,
      "belowReplacementSinceYear": 2007
    },
    "conditioning": {
      "country": "US",
      "measure": "period total fertility rate"
    },
    "provenance": "data",
    "confidence": 0.96,
    "source": {
      "org": "CDC/NCHS",
      "title": "Births: Final Data for 2023 (National Vital Statistics Reports, Vol. 74, No. 3)",
      "year": 2025,
      "url": "https://www.cdc.gov/nchs/data/nvsr/nvsr74/nvsr74-3.pdf"
    },
    "note": "Two corrections to the original findings: (1) NCHS Data Brief No. 535 (July 2025) is FINAL 2024 data titled \"Births in the United States, 2024,\" not \"provisional/final-adjacent.\" (2) The 2024 TFR is precisely 1,626.5 per 1,000 women, slightly ABOVE (not below) the 2023 value of 1,621.0; births rose and GFR fell while TFR rose marginally. Completed cohort fertility (~2.0) is general demographic background, not a headline figure from these specific reports. Core claim (2023 TFR = 1,621.0 = ~1.62 children/woman, below replacement) is fully confirmed.",
    "tags": [
      "fertility",
      "TFR",
      "births",
      "demographics",
      "CDC",
      "below replacement"
    ]
  },
  {
    "id": "children.sandwich",
    "domain": "children",
    "topic": "Sandwich generation",
    "kind": "distribution",
    "statement": "About 23% of U.S. adults are in the sandwich generation (have a parent 65+ and are raising a child under 18 or financially supported an adult child), peaking at 54% of those in their 40s, with the age breakdown: under 30 6%, 30s 27%, 40s 54%, 50s 36%, 60+ 7%.",
    "metric": {
      "value": 23,
      "byAge": {
        "under30": 6,
        "in30s": 27,
        "in40s": 54,
        "in50s": 36,
        "over60": 7
      },
      "peakPct": 54,
      "peakAgeLo": 40,
      "peakAgeHi": 49
    },
    "conditioning": {
      "country": "US",
      "definition": "parent 65+ AND raising child under 18 or financially supported adult child in past year",
      "surveyDate": "2021-10"
    },
    "provenance": "data",
    "confidence": 0.97,
    "source": {
      "org": "Pew Research Center",
      "title": "More than half of Americans in their 40s are 'sandwiched' between an aging parent and their own children",
      "year": 2022,
      "url": "https://www.pewresearch.org/short-reads/2022/04/08/more-than-half-of-americans-in-their-40s-are-sandwiched-between-an-aging-parent-and-their-own-children/"
    },
    "note": "Overall 23%, peak 54%, and full age breakdown all independently confirmed against the named 2022 Pew source (confidence 0.97). Correction: the \"36% married vs. 13% unmarried\" split is NOT from this 2022 report — it traces to the older 2013 Pew \"Sandwich Generation\" report (different definition). The 2022 report uses granular marital categories (~32% married, 23% divorced/separated, 20% living with a partner, 7% widowed, 7% never married); omit the 36%/13% split or use the 32%-married figure (confidence 0.6 on the mis-sourcing).",
    "tags": [
      "sandwich-generation",
      "caregiving",
      "aging-parents",
      "demographics",
      "pew"
    ]
  },
  {
    "id": "children.spacing",
    "domain": "children",
    "topic": "Spacing between children (interpregnancy interval)",
    "kind": "distribution",
    "statement": "In the US the median interpregnancy interval (birth to next conception) is 29 months from birth-certificate data (27 months in NSFG), roughly 2.5 years, which adds ~9 months of gestation to give birth-to-birth spacing of about 3 years (~38 months); it ranges by race/ethnicity (non-Hispanic white 26, non-Hispanic black 30, Hispanic 34 months), by mother's age (11-14 months under 20 up to 39-76 months at 40+), and by state (25 months in ID/MT/ND/SD/UT/WI to 32 months in CA), with ~30% of intervals under 18 months, ~50% at 18-59 months, and ~21% at 60+ months.",
    "metric": {
      "medianIPIMonths": 29,
      "medianIPIMonthsNSFG": 27,
      "medianBirthToBirthMonths": 38,
      "gestationMonths": 9,
      "byRaceEthnicityMonths": {
        "nonHispanicWhite": 26,
        "nonHispanicBlack": 30,
        "hispanic": 34
      },
      "byMotherAgeMonths": {
        "under20": 12,
        "age40plusLow": 39,
        "age40plusHigh": 76
      },
      "byStateMonths": {
        "low": 25,
        "high": 32
      },
      "distributionBirthCertificate": {
        "under18mo": 0.3,
        "from18to59mo": 0.5,
        "over60mo": 0.21
      },
      "distributionNSFG": {
        "under18mo": 0.29,
        "from18to59mo": 0.52,
        "over60mo": 0.18
      }
    },
    "conditioning": {
      "country": "US",
      "source": "2011 birth certificates; 2006-2010 NSFG",
      "definition": "interpregnancy interval = birth to next conception"
    },
    "provenance": "data",
    "confidence": 0.95,
    "source": {
      "org": "CDC / National Center for Health Statistics (NCHS)",
      "title": "Interpregnancy Intervals in the United States: Data From the Birth Certificate and the National Survey of Family Growth (National Vital Statistics Reports, Vol. 64, No. 3)",
      "year": 2015,
      "url": "https://www.cdc.gov/nchs/data/nvsr/nvsr64/nvsr64_03.pdf"
    },
    "note": "All brief figures confirmed verbatim against the primary CDC/NCHS source. Refinement: exact overall median IPI is 29 months from the birth certificate (not \"28-29\"); NSFG gives 27 months. The birth-to-birth conversion (~3 years / ~38 months) is an inferred/derived step (IPI + ~9 months gestation), not directly quoted from the report.",
    "tags": [
      "interpregnancy interval",
      "child spacing",
      "fertility",
      "CDC",
      "NCHS",
      "birth interval"
    ]
  },
  {
    "id": "finance.debt-arc",
    "domain": "finances",
    "topic": "Household debt by age",
    "kind": "phase",
    "statement": "In the Federal Reserve's 2022 Survey of Consumer Finances, US family debt rises through early/mid-adulthood and peaks for families whose reference person is roughly 45-54 before declining into retirement (any-debt prevalence falls from 77.2% at 55-64 to 64.8% at 65-74 and 53.4% at 75+), with 77.4% of all families holding debt at a conditional median of $80,200.",
    "metric": {
      "peakAgeLo": 45,
      "peakAgeHi": 54,
      "anyDebtPct": 77.4,
      "conditionalMedianUsd": 80200,
      "conditionalMeanUsd": 163800,
      "medianMortgageUsd": 155600,
      "medianVehicleLoanUsd": 15400,
      "medianCreditCardUsd": 2700,
      "medianEducationLoanUsd": 24500,
      "anyDebtByAge": {
        "age55to64Pct": 77.2,
        "age65to74Pct": 64.8,
        "age75PlusPct": 53.4
      }
    },
    "conditioning": {
      "ageOfReferencePerson": true
    },
    "provenance": "data",
    "confidence": 0.82,
    "source": {
      "org": "Federal Reserve Board",
      "title": "Changes in U.S. Family Finances from 2019 to 2022: Evidence from the Survey of Consumer Finances, Federal Reserve Bulletin 109(4)",
      "year": 2023,
      "url": "https://www.federalreserve.gov/publications/files/scf23.pdf"
    },
    "note": "The cited scf23.pdf bulletin stratifies debt by TYPE (Table 4), not by age of head; the \"peaks at 45-54\" age stratification comes only from the SCF interactive data tables (federalreserve.gov/econres/scf/dataviz/scf/table) and secondary analyses (EBRI, which gives 77.2%/64.8%/53.4% by age band), not the narrative PDF. The granular credit-card-by-age figures ($3,000 at 45-54; $3,450 at 55-64) and the exact 45-54 median total-debt dollar value could NOT be independently confirmed (they live only in the Fed's JavaScript-rendered interactive table) and should not be published as precise numbers. Peak age band is metric-sensitive: auto loans peak at 35-44, student loans peak under 35."
  },
  {
    "id": "finance.homeownership-age",
    "domain": "finances",
    "topic": "First-time home buyer age",
    "kind": "milestone",
    "statement": "Per NAR's 2025 survey, the median age of first-time U.S. home buyers rose to a record-high 40 years (up from 38 the prior year), while first-time buyers fell to a historic-low 21% of the market with a median 10% down payment; the median age of all buyers combined was 59.",
    "metric": {
      "medianAge": 40,
      "ageLo": 38,
      "value": 40,
      "deltaYears": 2,
      "firstTimeBuyerSharePct": 21,
      "downPaymentPct": 10,
      "medianAgeAllBuyers": 59,
      "medianAgeRepeatBuyers": 62
    },
    "conditioning": {
      "buyerType": "first-time",
      "country": "US",
      "surveyPeriod": "2024-07 to 2025-06"
    },
    "provenance": "data",
    "confidence": 0.97,
    "source": {
      "org": "National Association of Realtors (NAR)",
      "title": "First-Time Home Buyer Share Falls to Historic Low of 21%, Median Age Rises to 40 (2025 Profile of Home Buyers and Sellers)",
      "year": 2025,
      "url": "https://www.nar.realtor/newsroom/first-time-home-buyer-share-falls-to-historic-low-of-21-median-age-rises-to-40"
    },
    "note": "The \"40\" is NAR's 2025 survey figure, not an undisputed fact: the Mortgage Bankers Association disputes it, arguing NAR's low-response mail survey (~3.5% response rate, ~6,100 responses) overstates buyer age, with MBA's mortgage-record analysis putting the true first-time-buyer median age around 32-33. Present as \"NAR's 2025 survey figure.\" Also: the 59 is the median age of ALL buyers combined; repeat buyers alone median 62 — do not conflate.",
    "tags": [
      "housing",
      "homeownership",
      "first-time-buyer",
      "median-age",
      "NAR",
      "affordability"
    ]
  },
  {
    "id": "finance.networth-age",
    "domain": "finances",
    "topic": "Median household net worth by age of head",
    "kind": "distribution",
    "statement": "U.S. median household net worth rises with age from $39,000 for heads under 35 to a peak of $409,900 at ages 65-74, then declines to $335,600 at age 75+ (2022 Survey of Consumer Finances).",
    "metric": {
      "peakAge": "65-74",
      "peakValue": 409900,
      "byAge": {
        "under35": 39000,
        "35-44": 135600,
        "45-54": 247200,
        "55-64": 364500,
        "65-74": 409900,
        "75plus": 335600
      },
      "unit": "USD",
      "measure": "median"
    },
    "provenance": "data",
    "confidence": 0.97,
    "source": {
      "org": "Board of Governors of the Federal Reserve System",
      "title": "Changes in U.S. Family Finances from 2019 to 2022: Evidence from the Survey of Consumer Finances",
      "year": 2023,
      "url": "https://www.federalreserve.gov/publications/files/scf23.pdf"
    },
    "note": "2022 SCF data. All six bracket figures verified to the exact dollar via Fidelity's table (sourced to the Fed's Oct 2023 SCF report); peak bracket (65-74, $409,900) and rise-then-decline shape independently corroborated by NerdWallet and Fed materials. The $409,900 figure is exact, not rounded; \"$410,000\" is a secondary-reporter rounding. Relayed by Fidelity (https://www.fidelity.com/learning-center/smart-money/average-net-worth-by-age) and NerdWallet (https://www.nerdwallet.com/finance/learn/average-net-worth-by-age). SCF index: https://www.federalreserve.gov/econres/scfindex.htm",
    "tags": [
      "net worth",
      "age",
      "SCF",
      "Federal Reserve",
      "median",
      "household finances"
    ]
  },
  {
    "id": "finance.retirement-savings",
    "domain": "finances",
    "topic": "U.S. retirement savings balances and participation",
    "kind": "distribution",
    "statement": "Among U.S. families that hold a retirement account, the 2022 SCF median balance is ~$86,900 (only 54.3% of families have any account, so ~46% have $0), with holder-only medians rising by age (under-35 ~$18,800, 35-44 ~$45,000, 45-54 ~$119,000, 55-64 ~$185,000-$204,000), while Vanguard's year-end-2024 401(k) data show a $38,176 median and $148,153 average balance.",
    "metric": {
      "medianBalanceAllAgesHolders": 86900,
      "participationRate": 0.543,
      "noAccountShare": 0.457,
      "medianBalanceByAge": {
        "under35": 18800,
        "35to44": 45000,
        "45to54": 119000,
        "55to64": 185000
      },
      "medianBalanceByAgeHigh": {
        "55to64": 204000
      },
      "vanguard401kMedian": 38176,
      "vanguard401kAverage": 148153,
      "peakAgeBand": "65to74"
    },
    "conditioning": {
      "definition": "by-age figures are holder-only medians (exclude the ~46% of families with $0), not whole-population medians",
      "scfYear": 2022,
      "vanguardDataYear": 2024,
      "ageBandSource": "CRR brief and underlying SCF, not CRS IF12928",
      "subpopulationNote": "55-64 ranges $185k-$204k depending on subpopulation; CRR's $204k is for working households with a 401(k)"
    },
    "provenance": "data",
    "confidence": 0.85,
    "source": {
      "org": "Federal Reserve Board / Center for Retirement Research at Boston College / Vanguard",
      "title": "Changes in U.S. Family Finances from 2019 to 2022 (SCF 2022); 401(k)/IRA Holdings in 2022 (CRR); How America Saves 2025 (Vanguard)",
      "year": 2025,
      "url": "https://www.federalreserve.gov/publications/files/scf23.pdf"
    },
    "note": "Confirmed with corrections: (1) CITATION FIX — CRS IF12928 confirms only the 54.3% participation rate and distribution buckets; it does NOT contain by-age median balances. Cite CRR (\"401(k)/IRA Holdings in 2022,\" https://crr.bc.edu/401k-ira-holdings-in-2022-an-update-from-the-scf/) and the underlying SCF (https://www.federalreserve.gov/publications/files/scf23.pdf) for the age-band medians, not CRS. (2) NUMBER FIX — 45-54 holder median is $119,000 (CRR), not the ~$115,000 some sources cite; 55-64 is ~$185k-$204k depending on subpopulation ($204k = CRR working households with a 401(k)). (3) DEFINITION CAVEAT — the by-age figures here are holder-only medians; much lower figures seen elsewhere (e.g., dqydj under-35 ~$4,700, all-ages ~$13,000) are whole-population medians that count the ~46% with $0 and must not be conflated. Headline anchors ($86,900 SCF holder median, 54.3% participation; Vanguard $38,176 median / $148,153 average) are robustly confirmed. Vanguard source: https://corporate.vanguard.com/content/dam/corp/research/pdf/how_america_saves_report_2025.pdf"
  },
  {
    "id": "parents.caregiving-duration",
    "domain": "parents",
    "topic": "Duration of family caregiving for an aging parent/adult",
    "kind": "phase",
    "statement": "Family caregiving for an adult care recipient lasts an average of 5.5 years, with nearly 30% of caregivers providing care for 5 or more years (up from 24% in 2015) at about 27 hours per week, with the average caregiver aged 51.",
    "metric": {
      "deltaYears": 5.5,
      "value": 5.5,
      "probabilityPct": 30,
      "perDecadePct": 27,
      "age": 51
    },
    "conditioning": {
      "careRecipientAge": "18+",
      "scope": "adult care recipients (relatives/friends 18+), not parent-only subset",
      "comparisonYear2015Pct": 24,
      "hoursPerWeek": 27,
      "selfReportedSurvey": true
    },
    "provenance": "data",
    "confidence": 0.98,
    "source": {
      "org": "AARP Public Policy Institute and National Alliance for Caregiving",
      "title": "Caregiving in the US 2025",
      "year": 2025,
      "url": "https://www.aarp.org/content/dam/aarp/ppi/topics/ltss/family-caregiving/caregiving-in-us-2025.doi.10.26419-2fppi.00373.001.pdf"
    },
    "note": "The 5.5-year mean is for adult care recipients generally (ages 18+, n=6,549), not a parent-only subset; the report publishes no parent-only duration figure and no sex/education stratification for duration. Self-reported survey, not a federal statistic. The original finding's \"50.6 years for caregivers of adults\" sub-claim was NOT found in the source and is dropped as unverified; the report states average caregiver age is 51. The \"27 hours/week\" prose value corresponds to 27.3 hours in Figure 15."
  },
  {
    "id": "parents.caregiving-prevalence",
    "domain": "parents",
    "topic": "Prevalence and profile of US unpaid family caregivers",
    "kind": "distribution",
    "statement": "In 2020, 21.3% of US adults (more than 1 in 5, roughly 53.0 million people, up from 43.5 million in 2015) were unpaid family caregivers in the prior 12 months, with an average caregiver age of 49.4 years and about 61% being women.",
    "metric": {
      "prevalencePct": 21.3,
      "caregiversMillions2020": 53,
      "caregiversMillions2015": 43.5,
      "increaseMillions": 9.5,
      "averageAge": 49.4,
      "womenPct": 61,
      "adultCareOnlyPrevalencePct": 19
    },
    "conditioning": {
      "country": "US",
      "year": 2020,
      "scope": "unpaid family caregivers of any adult or child with special needs in prior 12 months",
      "narrowerScopeNote": "19% figure refers specifically to caregivers of an adult"
    },
    "provenance": "data",
    "confidence": 0.98,
    "source": {
      "org": "National Alliance for Caregiving and AARP",
      "title": "Caregiving in the U.S. 2020",
      "year": 2020,
      "url": "https://www.aarp.org/pri/topics/ltss/family-caregiving/caregiving-in-the-united-states/"
    },
    "note": "Confirmed by two independent searches plus a direct fetch of the AARP PRI landing page; 21.3%/53.0M verified against the AARP primary source, and the 49.4-year average age and 61% women confirmed via a second search quoting the report directly. The headline 21.3%/53.0M counts caregivers of any adult or child with special needs; a narrower ~19% (~1 in 5) refers specifically to those caring for an adult. A newer Caregiving in the U.S. 2025 edition exists, but the 2020 edition is the correct source here. Full report PDF: https://www.caregiving.org/wp-content/uploads/2021/01/full-report-caregiving-in-the-united-states-01-21.pdf",
    "tags": [
      "caregiving",
      "family",
      "aging",
      "demographics",
      "unpaid-care"
    ]
  },
  {
    "id": "parents.eldercare-onset",
    "domain": "parents",
    "topic": "Eldercare onset / loss of independence at 65+",
    "kind": "risk",
    "statement": "About 52% of US adults turning 65 will develop a disability serious enough to need substantial long-term services and supports before death (median duration ~2 years, with 1 in 7 needing help for 5+ years); the need rises sharply with age, from 3.4% of those 65–74 to 7% at 75–84 and 20.7% at 85+.",
    "metric": {
      "probabilityPct": 52,
      "deltaYears": 2,
      "fiveYearPlusPct": 14,
      "anyLtssLifetimePct": 70,
      "byAge": {
        "a65to74": 3.4,
        "a75to84": 7,
        "a85plus": 20.7
      },
      "durationYearsBySex": {
        "male": 2.2,
        "female": 3.7
      }
    },
    "conditioning": {
      "population": "US adults turning 65",
      "highNeedThreshold": "2+ ADLs or severe cognitive impairment",
      "adlGradientSource": "CDC NHIS 2016",
      "durationBySexMeasure": "paid-facility long-term care (ACL/AALTCI)"
    },
    "provenance": "data",
    "confidence": 0.9,
    "source": {
      "org": "ASPE, US Dept. of HHS",
      "title": "Long-Term Services and Supports for Older Americans: Risks and Financing (Favreault & Dey)",
      "year": 2016,
      "url": "https://aspe.hhs.gov/reports/long-term-services-supports-older-americans-risks-financing-research-brief-0"
    },
    "note": "The 52% (high-need: 2+ ADLs/severe cognitive impairment, paired with 1-in-7 for 5+ years) and the ~70% (any-LTSS lifetime risk, paired with ACL's 20% for 5+ years) are different severity thresholds and must not be mixed. Age gradient sourced to CDC/NCHS NHIS 2016 (85+ ~6x more likely than 65–74). Duration-by-sex (women 3.7 vs men 2.2 years, per ACL/AALTCI) reflects a different paid-facility measure; confidence for these sex-specific decimals is only ~0.5. An earlier \"~2.5 vs ~1.5 year\" figure was unverified and dropped."
  },
  {
    "id": "parents.inheritance-age",
    "domain": "parents",
    "topic": "Age of inheritance receipt",
    "kind": "distribution",
    "statement": "In the US, the probability of receiving an inheritance peaks at ages 56-65 (median ~11.2% across SCF survey years) with the bulk of inheritances received between ages 46 and 75; among recipients the conditional median inheritance is roughly $189,661 at 46-55 and $189,157 at 56-65, while population-wide the median is far more modest (~$19k-$22k) since only about 20-30% of households ever receive one.",
    "metric": {
      "ageLo": 46,
      "ageHi": 75,
      "probabilityPct": 11.2,
      "peakProbabilityAgeLo": 56,
      "peakProbabilityAgeHi": 65,
      "conditionalMedian46to55": 189661,
      "conditionalMedian56to65": 189157,
      "conditionalMedian36to45": 174589,
      "populationMedianLo": 19000,
      "populationMedianHi": 22000,
      "everReceivedPctLo": 20,
      "everReceivedPctHi": 30,
      "byAge": {
        "unconditionalMedian36to45": 6319,
        "unconditionalMedian46to55": 19792,
        "unconditionalMedian56to65": 9702,
        "unconditionalMedian66to75": 12328
      }
    },
    "conditioning": {
      "country": "US",
      "dataSource": "Federal Reserve Survey of Consumer Finances",
      "surveyWaves": "2001,2004,2007,2010,2013,2016,2019",
      "dollarsBasis": "nominal, median across SCF surveys 2001-2019"
    },
    "provenance": "data",
    "confidence": 0.8,
    "source": {
      "org": "Penn Wharton Budget Model (University of Pennsylvania)",
      "title": "Inheritances by Age and Income Group",
      "year": 2021,
      "url": "https://budgetmodel.wharton.upenn.edu/issues/2021/7/16/inheritances-by-age-and-income-group"
    },
    "note": "Core claims confirmed: ages 56-65 have the highest receipt probability (~11.2%); the bulk of inheritances occur between ages 46 and 75 (source phrase is \"46 and 75,\" not 46-65); conditional recipient medians are ~$189k for the middle bands. The individual unconditional per-age dollar figures ($6,319 / $9,702 / $19,792 / $12,328) are approximate nominal SCF medians and were NOT independently table-verified — one search loosely attributed the ~$19,800 value to the 56-65 band rather than 46-55, so treat the by-age unconditional dollars as approximate, not precise. A separate probate \"6-month median\" timing claim is not covered here and remains unverified (lower confidence).",
    "tags": [
      "inheritance",
      "wealth-transfer",
      "aging-parents",
      "SCF",
      "age-distribution"
    ]
  },
  {
    "id": "partner.cohabitation",
    "domain": "partner",
    "topic": "First premarital cohabitation",
    "kind": "distribution",
    "statement": "Cohabitation is now the most common first union for U.S. women: 48% of women aged 15-44 had cohabitation as their first union in 2006-2010 (up from 34% in 1995), the median first premarital cohabitation lasted 22 months, over 1 in 4 women had cohabited by age 20 and nearly 3 in 4 by age 30, and by 2015-2019 some 67.3% of women aged 22-44 had ever cohabited.",
    "metric": {
      "firstUnionCohabPct2006_2010": 48,
      "firstUnionCohabPct2002": 43,
      "firstUnionCohabPct1995": 34,
      "everCohabitedPct2015_2019": 67.3,
      "everCohabitedPct2006_2010": 62.5,
      "cohabitedByAge20Pct": 25,
      "cohabitedByAge30Pct": 75,
      "medianDurationMonths2006_2010": 22,
      "medianDurationMonths1995": 13,
      "threeYearToMarriagePct": 40,
      "threeYearIntactUnmarriedPct": 32,
      "threeYearDissolvedPct": 27,
      "ageLo": 15,
      "ageHi": 44
    },
    "conditioning": {
      "sex": "female",
      "education": {
        "everCohabitedHSorLessPct2015_2019": 72.6,
        "everCohabitedSomeCollegeOrHigherPct2015_2019": 64.8,
        "everCohabitedSomeCollegeOrHigherPct2006_2010": 56
      }
    },
    "provenance": "data",
    "confidence": 0.95,
    "source": {
      "org": "National Center for Health Statistics (CDC)",
      "title": "First Premarital Cohabitation in the United States: 2006-2010 National Survey of Family Growth (National Health Statistics Reports No. 64)",
      "year": 2013,
      "url": "https://www.cdc.gov/nchs/data/nhsr/nhsr064.pdf"
    },
    "note": "Two precisions: (1) the education stratum in the 67.3% (2015-2019) source is \"some college or higher\" (64.8%) vs \"HS/GED or less\" (72.6%), not \"bachelor's+\" as originally phrased; the convergence is driven by rising cohabitation among more-educated women (56.0% to 64.8%) while staying flat for less-educated women, not a \"lower among educated\" story. (2) Flagship 48% and by-age figures are 2006-2010; the 67.3% is a different period (2015-2019), age band (22-44), and metric (ever cohabited vs first union). NSFG publishes no single median age at first cohabitation, so age is expressed via the by-age-20/by-age-30 distribution. Prevalence corroborated by CDC MMWR QuickStats, MMWR 2021;70(2), https://www.cdc.gov/mmwr/volumes/70/wr/mm7002a5.htm."
  },
  {
    "id": "partner.divorce-prob",
    "domain": "partner",
    "topic": "First-marriage dissolution probability and timing",
    "kind": "rate",
    "statement": "For women, about 22% of first marriages dissolve (separation or divorce) within 5 years and 36% within 10 years per current 2011-2015 NSFG data (20%/33% in the older 2006-2010 NSFG), with 10-year dissolution ranging from 47% for Black non-Hispanic to 20% for Asian non-Hispanic women.",
    "metric": {
      "prob5yrPct": 22,
      "prob10yrPct": 36,
      "prob5yrPctOlder": 20,
      "prob10yrPctOlder": 33,
      "byRace10yr": {
        "blackNonHispanic": 47,
        "hispanic": 34,
        "whiteNonHispanic": 32,
        "asianNonHispanic": 20
      },
      "medianDurationYears2008": 10,
      "medianDurationYears2023": 12,
      "divorceTiming2023": {
        "within5yrPct": 16,
        "yrs5to9Pct": 24,
        "yrs25plusPct": 22
      }
    },
    "conditioning": {
      "sex": "female",
      "raceEthnicity": [
        "Black non-Hispanic",
        "Hispanic",
        "White non-Hispanic",
        "Asian non-Hispanic"
      ],
      "marriageType": "first marriage (NSFG); all marriages (ACS timing)",
      "outcome": "separation or divorce"
    },
    "provenance": "data",
    "confidence": 0.9,
    "source": {
      "org": "CDC/NCHS",
      "title": "NSFG Key Statistics (Listing D, marriage disruption), 2011-2015 data",
      "year": 2015,
      "url": "https://www.cdc.gov/nchs/nsfg/key_statistics/d.htm"
    },
    "note": "The headline 20%/5yr and 33%/10yr figures come from the older 2006-2010 NSFG (NHSR No. 49); CDC's current 2011-2015 NSFG figures are slightly higher at 22%/36%. Race/ethnicity stratification (47/34/32/20) is from the 2006-2010 report and applies to women, combining separation and divorce. Median duration (10 to 12 yrs) and the 16%/24%/22% timing distribution come from Pew/Census ACS (2025) covering all marriages, not just first marriages. The ~40-50% lifetime divorce figure is a projection, not an observed NSFG number.",
    "tags": [
      "divorce",
      "marriage",
      "NSFG",
      "partner",
      "dissolution"
    ]
  },
  {
    "id": "partner.first-marriage",
    "domain": "partner",
    "topic": "Median age at first marriage",
    "kind": "milestone",
    "statement": "In the US, the median age at first marriage in 2024 was 30.2 years for men and 28.6 years for women, up from 23.1 (men) and 21.1 (women) in 1974.",
    "metric": {
      "medianAge": 29.4,
      "bySex": {
        "male": 30.2,
        "female": 28.6
      },
      "baseline1974": {
        "male": 23.1,
        "female": 21.1
      },
      "deltaYears": {
        "male": 7.1,
        "female": 7.5
      }
    },
    "conditioning": {
      "country": "US",
      "year": 2024,
      "baselineYear": 1974
    },
    "provenance": "data",
    "confidence": 0.97,
    "source": {
      "org": "U.S. Census Bureau",
      "title": "Families and Living Arrangements press release (Current Population Survey, Table MS-2)",
      "year": 2024,
      "url": "https://www.census.gov/newsroom/press-releases/2024/families-and-living-arrangements.html"
    },
    "note": "CPS estimates carry sampling error. The separate ACS survey (Table B12007) reports slightly different 2023 figures (30.6 men / 28.7 women), and a newer 2025 CPS release shows 30.8 / 28.4; for the cited 2024 reference year the figures are accurate. Underlying table: https://www2.census.gov/programs-surveys/demo/tables/families/time-series/marital/ms2.xls",
    "tags": [
      "marriage",
      "milestone",
      "us-census",
      "cps",
      "demographics"
    ]
  },
  {
    "id": "partner.remarriage",
    "domain": "partner",
    "topic": "Remarriage",
    "kind": "rate",
    "statement": "In 2021 the U.S. remarriage rate was 32.0 per 1,000 previously married men and 17.2 per 1,000 previously married women (down from 48.9 and 25.2 in 2008, roughly a one-third decline), with men remarrying at about 1.9x the rate of women; among those whose first marriage ended in divorce or widowhood, 64% of men versus 52% of women had remarried (Pew 2013), and most who remarry do so within about five years (men ~3 yrs, women ~4-5 yrs, approximate).",
    "metric": {
      "value": 32,
      "bySex": {
        "male": 32,
        "female": 17.2
      },
      "probabilityPct": 64,
      "deltaYears": 5
    },
    "conditioning": {
      "unit": "remarriages per 1,000 previously married",
      "year": 2021,
      "rate2008": {
        "male": 48.9,
        "female": 25.2
      },
      "declinePct": {
        "male": -34.6,
        "female": -31.7
      },
      "maleToFemaleRateRatio": 1.9,
      "eligibleRemarriedSharePct": {
        "male": 64,
        "female": 52,
        "year": 2013,
        "source": "Pew"
      },
      "medianYearsToRemarriage": {
        "male": 3,
        "female": 4.5,
        "qualifier": "approximate, secondary summaries"
      }
    },
    "provenance": "data",
    "confidence": 0.88,
    "source": {
      "org": "BGSU National Center for Family & Marriage Research",
      "title": "Remarriage Rate 2021 (FP-23-19), Westrick-Payne; with Pew Research Center, The Demographics of Remarriage (Chapter 2)",
      "year": 2023,
      "url": "https://www.bgsu.edu/ncfmr/resources/data/family-profiles/westrick-payne-remarriage-rate-2021-fp-23-19.html"
    },
    "note": "Headline remarriage rates (BGSU/NCFMR, 2021 ACS) and Pew remarried-shares (2013) confirmed against primary sources. \"Roughly 33%\" decline is an average; the male decline is slightly larger (-34.6%) than the female (-31.7%). The median-years-to-remarriage values (men ~3, women ~4-5) trace to secondary legal/news summaries citing Pew/Census, not a parsed primary headline, and should stay hedged as approximate. The scholarworks.bgsu.edu PDF mirror returns 403 to automated fetch, but the bgsu.edu HTML version is accessible and authoritative. Census P70-167 (2021) prevalence/age figures cited correctly but not re-verified this pass.",
    "tags": [
      "remarriage",
      "divorce",
      "marriage",
      "sex-differences",
      "BGSU",
      "Pew"
    ]
  },
  {
    "id": "partner.widowhood-age",
    "domain": "partner",
    "topic": "Widowhood prevalence by sex",
    "kind": "distribution",
    "statement": "Among adults 75+, 54% of women are currently widowed versus 20% of men (~2.7x gap), and about 80% of the widowed population is women, driven by women living longer and tending to marry older men.",
    "metric": {
      "ageLo": 75,
      "femaleWidowedPct": 54,
      "maleWidowedPct": 20,
      "femaleToMaleRatio": 2.7,
      "womenShareOfWidowedPct": 80,
      "femaleEverMarriedSpouseDeathPct": 58,
      "maleEverMarriedSpouseDeathPct": 28,
      "bySex": {
        "male": 20,
        "female": 54
      }
    },
    "conditioning": {
      "ageGroup": "75+",
      "currentlyWidowed": "current widowhood status among all adults 75+; ever-married figures (58% women / 28% men) restricted to those ever married"
    },
    "provenance": "data",
    "confidence": 0.88,
    "source": {
      "org": "U.S. Census Bureau",
      "title": "Marriage, Divorce, Widowhood Remain Prevalent Among Older Populations",
      "year": 2021,
      "url": "https://www.census.gov/library/stories/2021/04/love-and-loss-among-older-adults.html"
    },
    "note": "Prevalence/gender-gap figures verbatim-match the primary Census source (based on 2016 ACS + 2014 SIPP), confidence 0.88. The widely circulated \"average widowhood age 59 / median 59.4 (first marriage) / 60.3 (second marriage)\" figure, attributed to \"U.S. Census Bureau, 2011,\" has no locatable primary Census publication and should not be presented as a sourced Census statistic (confidence ~0.40); it is omitted from the metric here. No correction needed to prevalence figures."
  },
  {
    "id": "behavior.activity",
    "domain": "self",
    "topic": "Physical activity and longevity",
    "kind": "gradient",
    "statement": "Meeting recommended physical activity (~150 min/wk moderate or 75 min/wk vigorous) is associated with about 3.4 more years of life expectancy versus inactivity; half the recommended dose adds ~1.8 years and twice the dose ~4.2 years (max observed ~4.5), while being obese and inactive is linked to ~5-7 fewer years than being normal-weight and active.",
    "metric": {
      "deltaYearsRecommended": 3.4,
      "deltaYearsHalfDose": 1.8,
      "deltaYearsDoubleDose": 4.2,
      "deltaYearsMax": 4.5,
      "deltaYearsObeseInactiveLo": -7,
      "deltaYearsObeseInactiveHi": -5,
      "consensusDeltaYearsLo": 3,
      "consensusDeltaYearsHi": 4.5
    },
    "conditioning": {
      "activityDose": "recommended (~150 min/wk moderate or 75 min/wk vigorous), referenced against inactivity",
      "cohortSize": 654827,
      "deaths": 82465
    },
    "provenance": "data",
    "confidence": 0.9,
    "source": {
      "org": "PLOS Medicine (National Cancer Institute/NIH)",
      "title": "Leisure Time Physical Activity of Moderate to Vigorous Intensity and Mortality: A Large Pooled Cohort Analysis",
      "year": 2012,
      "url": "https://journals.plos.org/plosmedicine/article?id=10.1371%2Fjournal.pmed.1001335"
    },
    "requires": [],
    "note": "Headline figures (3.4 / 1.8 / 4.2 / 5-7 years) verified verbatim against the NIH/NCI press release; six pooled cohorts of 654,827 adults with ~82,465 deaths. Independently corroborated by a UK Biobank study (3.88 and 4.51 life-years gained at moderate/high objectively measured activity). Broader literature spans ~0.4-7 years depending on dose and whether body weight is combined; \"about 3 to 4.5 years\" is the defensible headline. Effect is dose-dependent rather than a single fixed constant.",
    "tags": [
      "physical-activity",
      "exercise",
      "longevity",
      "life-expectancy",
      "mortality",
      "obesity",
      "dose-response"
    ]
  },
  {
    "id": "behavior.alcohol",
    "domain": "self",
    "topic": "Alcohol consumption and life expectancy",
    "kind": "gradient",
    "statement": "All-cause mortality risk is lowest at or below ~100 g alcohol/week (~5 standard drinks); relative to that threshold, a 40-year-old loses roughly 6 months of life expectancy at 100-200 g/week, 1-2 years at 200-350 g/week, and 4-5 years above 350 g/week, with each additional 100 g/week raising risk of stroke (HR 1.14), fatal hypertensive disease (HR 1.24), and heart failure (HR 1.09) while modestly lowering myocardial infarction risk (HR 0.94).",
    "metric": {
      "thresholdGramsPerWeek": 100,
      "deltaYears100to200": -0.5,
      "deltaYears200to350": -1.5,
      "deltaYears350plus": -4.5,
      "hrStrokePer100g": 1.14,
      "hrHypertensivePer100g": 1.24,
      "hrHeartFailurePer100g": 1.09,
      "hrMyocardialInfarctionPer100g": 0.94,
      "nDrinkers": 599912,
      "nStudies": 83,
      "nDeaths": 40310,
      "referenceAge": 40
    },
    "conditioning": {
      "appliesTo": "current drinkers",
      "referenceAge": 40,
      "drinkSizeNote": "100 g/week ~5 standard drinks; years-lost figures depend on drink-size definition (UK unit=8g, US standard=14g)"
    },
    "provenance": "data",
    "confidence": 0.92,
    "source": {
      "org": "The Lancet",
      "title": "Risk thresholds for alcohol consumption: combined analysis of individual-participant data for 599 912 current drinkers in 83 prospective studies",
      "year": 2018,
      "url": "https://pubmed.ncbi.nlm.nih.gov/29676281/"
    },
    "note": "Combined analysis of 599,912 current drinkers across 83 prospective studies (5.4M person-years, 40,310 deaths); every cited number matches the primary Lancet source exactly. This is mainstream consensus on heavy-drinking harm, not a single weak study. Important caveat: the apparent low-dose protective (\"J-curve\") effect, including the MI HR<1, is widely contested — recent Mendelian-randomization work (Kember et al. 2024) finds a positive linear mortality association with no protective tail, and the apparent benefit is attributed to sick-quitter/abstainer-reference confounding. Do not over-claim any protective effect at low intake. Years-lost figures depend on drink-size convention: 350 g/week is ~17.5 drinks at the paper's ~20 g convention but ~25 drinks at the US 14 g standard.",
    "requires": [
      "conditions"
    ],
    "tags": [
      "alcohol",
      "mortality",
      "life-expectancy",
      "cardiovascular",
      "lifestyle"
    ]
  },
  {
    "id": "behavior.loneliness",
    "domain": "self",
    "topic": "Loneliness and social isolation as mortality risk factors",
    "kind": "risk",
    "statement": "Social isolation, loneliness, and living alone each raise mortality risk by roughly 25-35% (Holt-Lunstad 2015: odds ratios of 1.29, 1.26, and 1.32 across 70 studies and ~3.4M people), equivalently a 50% greater odds of survival for people with strong social relationships (Holt-Lunstad 2010: OR 1.50, 95% CI 1.42-1.59, 148 studies, 308,849 people).",
    "metric": {
      "oddsRatioIsolation": 1.29,
      "oddsRatioLoneliness": 1.26,
      "oddsRatioLivingAlone": 1.32,
      "mortalityRiskLoPct": 25,
      "mortalityRiskHiPct": 35,
      "survivalOddsRatio": 1.5,
      "survivalOddsRatioCiLo": 1.42,
      "survivalOddsRatioCiHi": 1.59
    },
    "conditioning": {
      "strongerEffectIf": "average sample age under 65",
      "consistentAcross": "gender, follow-up length, world region",
      "attenuatedBy": "strongest confounder control"
    },
    "provenance": "data",
    "confidence": 0.97,
    "source": {
      "org": "Perspectives on Psychological Science (SAGE)",
      "title": "Loneliness and Social Isolation as Risk Factors for Mortality: A Meta-Analytic Review (Holt-Lunstad et al.)",
      "year": 2015,
      "url": "https://pubmed.ncbi.nlm.nih.gov/25910392/"
    },
    "requires": [
      "partner",
      "children",
      "parents"
    ],
    "note": "Two confirmed meta-analyses. The 2015 figures (OR 1.29 isolation / 1.26 loneliness / 1.32 living alone) and the 2010 figure (survival OR 1.50, CI 1.42-1.59, the source of the \"comparable to smoking\" framing) appear verbatim across primary records (PubMed/PMC) and publishers (SAGE, PLOS). The 2010 1.50 is the protective survival odds, not a mortality OR, so it is framed as a survival benefit. Present ranges (~25-35% increased mortality risk) rather than single point estimates, since effect sizes attenuate somewhat under the strongest confounder control. Mainstream, heavily cited science.",
    "tags": [
      "loneliness",
      "social-isolation",
      "mortality",
      "meta-analysis",
      "social-relationships",
      "living-alone"
    ]
  },
  {
    "id": "behavior.obesity",
    "domain": "self",
    "topic": "Years of life lost with obesity, by class",
    "kind": "gradient",
    "statement": "Relative to a healthy weight (BMI 18.5-24.9), obesity shortens life in proportion to severity: class I (BMI 30-34.9) loses roughly 2-4 years, class II (BMI 35-39.9) about 4-8 years, and class III ranges from 6.5 years at BMI 40-44.9 up to 13.7 years at BMI 55-59.9; all-cause mortality rises about 31% per 5 kg/m2 above BMI 25 (HR 1.45 grade 1, 1.94 grade 2, 2.76 grade 3), with larger effects in men (HR 1.51 vs 1.30) and at younger ages (1.52 at 35-49 vs 1.21 at 70-89).",
    "metric": {
      "deltaYearsClass1Lo": 2,
      "deltaYearsClass1Hi": 4,
      "deltaYearsClass2Lo": 4,
      "deltaYearsClass2Hi": 8,
      "deltaYearsClass3Bmi40": 6.5,
      "deltaYearsClass3Bmi45": 8.9,
      "deltaYearsClass3Bmi50": 9.8,
      "deltaYearsClass3Bmi55": 13.7,
      "deltaYearsObeseMenFrom40": 4.2,
      "deltaYearsObeseWomenFrom40": 3.5,
      "deltaYearsClass3MenFrom40": 9.1,
      "deltaYearsClass3WomenFrom40": 7.7,
      "hazardRatioPer5Bmi": 1.31,
      "hazardRatioGrade1": 1.45,
      "hazardRatioGrade2": 1.94,
      "hazardRatioGrade3": 2.76,
      "hazardRatioMen": 1.51,
      "hazardRatioWomen": 1.3,
      "hazardRatioAge35to49": 1.52,
      "hazardRatioAge70to89": 1.21
    },
    "conditioning": {
      "referenceBMI": "18.5-24.9 (healthy weight)",
      "hazardReference": "BMI 22.5-25 for grade-specific HRs",
      "ageAnchor": "life-years-lost estimated from age 40",
      "regionalHRRange": "1.29 (North America) to 1.39 (Europe/East Asia)",
      "caveat": "class I/II year figures are approximate consensus ranges; class I is attenuated in some analyses (obesity-paradox debate)"
    },
    "provenance": "data",
    "confidence": 0.92,
    "source": {
      "org": "PLOS Medicine (Kitahara et al., pooled analysis of 20 prospective studies); corroborated by Bhaskaran et al. Lancet Diabetes & Endocrinol 2018 and the Global BMI Mortality Collaboration, Lancet 2016",
      "title": "Association between Class III Obesity (BMI 40-59) and Mortality: A Pooled Analysis of 20 Prospective Studies",
      "year": 2014,
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4087039/"
    },
    "requires": [
      "conditions",
      "sex"
    ],
    "note": "Mainstream consensus, not a contested or single-study claim. Class III figures verified to the digit against PLOS Medicine 2014 (BMI 40-44.9: 6.5 yrs CI 5.7-7.3; 45-49.9: 8.9 yrs CI 7.4-10.4; 50-54.9: 9.8 yrs CI 7.4-12.2; 55-59.9: 13.7 yrs CI 10.5-16.9); above BMI 50 the loss (9.8 yrs) exceeds current-vs-never smoking (8.9 yrs) in that study. Bhaskaran 2018 (n=3.6M, from age 40): overall obese 4.2 yrs men / 3.5 yrs women; class 3 9.1 yrs men / 7.7 yrs women. Global BMI Collaboration 2016: HR 1.31 per 5 kg/m2. Class I/II single-year figures are approximate ranges that vary by source/sex/age/smoking adjustment; direction and magnitude undisputed by major health bodies. NCI press release (2014): https://www.cancer.gov/news-events/press-releases/2014/classobesity. requires conditions (obesity/BMI status) and sex (men show larger losses and HRs).",
    "tags": [
      "obesity",
      "BMI",
      "mortality",
      "life-expectancy",
      "years-of-life-lost",
      "all-cause-mortality"
    ]
  },
  {
    "id": "health.bone.peak",
    "domain": "self",
    "topic": "Bone mass over the lifespan",
    "kind": "phase",
    "statement": "Peak bone mass is reached in the mid-20s to early 30s, after which gradual loss begins; in women, loss accelerates to roughly 1-2%/yr around menopause (cumulatively ~10% over the transition, up to ~20% in the first 5-7 postmenopausal years), totaling about 25% (up to ~30%) age-related loss by age 70, with osteoporosis typically onset 10-15 years after menopause.",
    "metric": {
      "peakAgeLo": 24,
      "peakAgeHi": 32,
      "annualLossPctLo": 1,
      "annualLossPctHi": 2,
      "annualLossLaterPctLo": 0.5,
      "annualLossLaterPctHi": 1.5,
      "cumulativeTransitionPct": 10,
      "cumulativeEarlyPostmenoPct": 20,
      "cumulativeBy70PctLo": 25,
      "cumulativeBy70PctHi": 30,
      "osteoporosisOnsetYearsPostMenoLo": 10,
      "osteoporosisOnsetYearsPostMenoHi": 15
    },
    "conditioning": {
      "sex": "female",
      "lifeStage": "postmenopause"
    },
    "provenance": "data",
    "confidence": 0.7,
    "source": {
      "org": "PMC (Ji M-X, Yu Q)",
      "title": "Primary osteoporosis in postmenopausal women",
      "year": 2015,
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5643776/"
    },
    "note": "Partially confirmed with corrections. Headline timing claims hold (peak in 20s-early 30s; accelerated loss in first ~5-10 yr post-menopause; osteoporosis 10-15 yr after menopause). Three specifics were overstated/mis-attributed: (1) the cited PMC source says mid-20s for spine/hip, not ~30; (2) that source does not contain a 2-3%/yr figure (it gives ~10% over the transition); typical annual rate is 1-2%; (3) \"30-40% by age 70\" should be ~25-30%. Figures are for women postmenopause; men lose bone more slowly. No sex/education stratification beyond this applies."
  },
  {
    "id": "health.cancer.incidence",
    "domain": "self",
    "topic": "Cancer incidence rises with age",
    "kind": "distribution",
    "statement": "The median age at cancer diagnosis (any site, both sexes, all races) is 67 years, and new-case incidence climbs steeply with age: under-20s are fewer than 26 per 100,000 while those 60+ exceed 1,000 per 100,000, with the largest share of new diagnoses (30.8%) occurring at ages 65–74 and about 81% occurring at age 55 or older.",
    "metric": {
      "medianAge": 67,
      "perDecade": {
        "under20": 26,
        "age45to49": 350,
        "age60plus": 1000
      },
      "byAge": {
        "under20": 0.9,
        "20to34": 2.7,
        "35to44": 4.9,
        "45to54": 10.7,
        "55to64": 22.9,
        "65to74": 30.8,
        "75to84": 19.9,
        "85plus": 7.3
      },
      "share55plusPct": 80.9,
      "shareBefore45Pct": 8.5,
      "peakBandLo": 65,
      "peakBandHi": 74
    },
    "conditioning": {
      "sexes": "both",
      "races": "all",
      "site": "any",
      "registry": "SEER 21",
      "incidenceYears": "2019-2023",
      "perCapitaUnit": "per 100,000"
    },
    "provenance": "data",
    "confidence": 0.98,
    "source": {
      "org": "NCI SEER",
      "title": "Cancer Stat Facts: Cancer of Any Site; Risk Factors: Age",
      "year": 2024,
      "url": "https://seer.cancer.gov/statfacts/html/all.html"
    },
    "note": "The per-100,000 figures are NCI's rounded summary values, and median age at diagnosis varies by cancer site. The age-related rise is gradual-but-accelerating, not a single threshold. Cross-referenced with NCI \"Risk Factors: Age\" (https://www.cancer.gov/about-cancer/causes-prevention/risk/age).",
    "tags": [
      "cancer",
      "incidence",
      "aging",
      "epidemiology",
      "SEER",
      "health"
    ]
  },
  {
    "id": "health.dementia.onset",
    "domain": "self",
    "topic": "Dementia/Alzheimer's onset and prevalence by age",
    "kind": "gradient",
    "statement": "Alzheimer's dementia prevalence rises steeply with age among U.S. adults 65+: 5.0% at 65-74, 13.2% at 75-84, and 33.4% at 85+, with about 11% (roughly 1 in 9) of all people 65+ affected (7.2 million Americans in 2025); most cases begin at age 65+ and fewer than 10% are early-onset.",
    "metric": {
      "ageLo": 65,
      "probabilityPct": 11,
      "value": 7200000,
      "byAge": {
        "65_74": 5,
        "75_84": 13.2,
        "85plus": 33.4
      },
      "earlyOnsetPct": 10,
      "projected2060": 13800000
    },
    "conditioning": {
      "population": "U.S. adults 65+",
      "condition": "Alzheimer's dementia",
      "year": 2025
    },
    "provenance": "data",
    "confidence": 0.93,
    "source": {
      "org": "Alzheimer's Association",
      "title": "2025 Alzheimer's Disease Facts and Figures (Alzheimer's & Dementia)",
      "year": 2025,
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12040760/"
    },
    "note": "Core figures (5.0%/13.2%/33.4%, 7.2M, 65+ onset, <10% early-onset) are exact matches to the primary peer-reviewed source. Caveats: \"~11% of 65+\" is the Alzheimer's Association figure (some federal sources cite ~10% all-cause dementia); \"doubles every ~5 years after 65\" is a widely cited approximation, not a verbatim source claim; \"two-thirds women\" and \"~7.4M in 2026\" are lower-confidence and not independently confirmed. NIA onset claims: https://www.nia.nih.gov/health/alzheimers-and-dementia/alzheimers-disease-fact-sheet",
    "tags": [
      "dementia",
      "alzheimers",
      "aging",
      "prevalence",
      "health"
    ]
  },
  {
    "id": "health.diabetes.onset",
    "domain": "self",
    "topic": "Type 2 diabetes onset",
    "kind": "distribution",
    "statement": "In the US, the mean age at type 2 diabetes diagnosis is about 51.7 years (NHANES 1999-2018). Total diabetes prevalence (diagnosed + undiagnosed) rises sharply with age, from roughly 4.8% of adults 18-44 to 18.9% of those 45-64 and 29.2% of those 65+; diagnosed-only prevalence is lower (about 3.0%, 14.5%, and 24.4% respectively). New-case incidence is highest in the 45-64 group (about 10.1 per 1,000 vs 3.0 in 18-44 and 6.8 in 65+) (CDC National Diabetes Statistics Report, 2024).",
    "metric": {
      "meanAgeAtDiagnosis": 51.7,
      "meanAgeCI95Lo": 51.22,
      "meanAgeCI95Hi": 52.19,
      "totalPrevalencePctByAge": {
        "a18_44": 4.8,
        "a45_64": 18.9,
        "a65plus": 29.2
      },
      "diagnosedPrevalencePctByAge": {
        "a18_44": 3,
        "a45_64": 14.5,
        "a65plus": 24.4
      },
      "undiagnosedPctByAge": {
        "a18_44": 1.9,
        "a45_64": 4.5,
        "a65plus": 4.7
      },
      "totalPrevalencePct": 12,
      "incidenceRatePer1000ByAge": {
        "a18_44": 3,
        "a45_64": 10.1,
        "a65plus": 6.8
      },
      "peakIncidenceAgeLo": 45,
      "peakIncidenceAgeHi": 64
    },
    "conditioning": {
      "country": "US",
      "diabetesType": "type 2 (prevalence figures are total/diagnosed diabetes of all types, ~90-95% type 2)",
      "ageAtDiagnosisSource": "NHANES 1999-2018 (Sci Rep 2024)",
      "prevalenceSource": "CDC National Diabetes Statistics Report 2024; prevalence percentages from 2017-2020 NHANES data, incidence from 2021 data"
    },
    "provenance": "data",
    "confidence": 0.9,
    "source": {
      "org": "CDC / Scientific Reports (NHANES)",
      "title": "National Diabetes Statistics Report (CDC, 2024); Age at type 2 diabetes diagnosis and the risk of mortality among US population (Sci Rep, NHANES 1999-2018)",
      "year": 2024,
      "url": "https://www.cdc.gov/diabetes/php/data-research/index.html"
    },
    "note": "Mean age at diagnosis 51.71 (95% CI 51.22-52.19) confirmed exactly from Sci Rep 2024 (PMC11589141 / s41598-024-80790-8, NHANES 1999-2018). Corrected three mislabeled metrics against CDC National Diabetes Statistics Report (May 15, 2024) Table 1a/1b: (1) The 4.8/18.9/29.2 figures are TOTAL diabetes prevalence (diagnosed+undiagnosed), NOT diagnosed-only as originally stated; diagnosed-only is 3.0/14.5/24.4. Relabeled and added both series. (2) Original undiagnosedPctByAge 2.2/3.8/2.7 were actually counts in MILLIONS (Table 1b), not percentages; corrected to the true undiagnosed percentages 1.9/4.5/4.7 (Table 1a). (3) Prevalence percentages are from 2017-2020 NHANES data, not 2021 as originally conditioned (2021 applies to counts/incidence). Confirmed peak incidence in 45-64 (rate 10.1/1,000 and 633k of 1,211k new cases) and topline ~12% total prevalence (current CDC At-a-Glance, 2023 data). URL is real and relevant. Raised confidence to 0.90 given strong primary-source corroboration."
  },
  {
    "id": "health.disability.onset",
    "domain": "self",
    "topic": "Disability onset (US)",
    "kind": "gradient",
    "statement": "There is no published average age of disability onset; instead, activity-limiting disability rises sharply with age, with adults 75+ showing 10.6% needing help with ADLs and 18.8% with IADLs (CDC/NHIS 2014), while peer-reviewed HRS data put overall ADL-disability prevalence at 16.5% among adults 50+ in 2018, peaking at 20.2% for those 65+.",
    "metric": {
      "adlNeedHelpPct75plus": 10.6,
      "iadlNeedHelpPct75plus": 18.8,
      "adlPrevalencePct50plus": 16.5,
      "adlPrevalencePct50plusLo": 15.8,
      "adlPrevalencePct50plusHi": 17.2,
      "adlPrevalencePct65plus": 20.2,
      "adlPrevalencePct65plusLo": 19.2,
      "adlPrevalencePct65plusHi": 21.2,
      "adlPrevalencePct50to64": 12.7,
      "adlPrevalencePct50to64Lo": 11.7,
      "adlPrevalencePct50to64Hi": 13.8,
      "anyDisabilityPct18to44": 18.4,
      "anyDisabilityPct45to64": 26.7,
      "anyDisabilityPct65plus": 41.6
    },
    "conditioning": {
      "byAge": {
        "75plus_adl": 10.6,
        "75plus_iadl": 18.8,
        "50to64_adl": 12.7,
        "65plus_adl": 20.2
      },
      "measure": "ADL/IADL help-need and any-disability prevalence",
      "country": "US"
    },
    "provenance": "data",
    "confidence": 0.8,
    "source": {
      "org": "CDC/NCHS, MMWR QuickStats (NHIS 2014)",
      "title": "Percentage of Adults with Activity Limitations, by Age Group and Type of Limitation — NHIS, United States, 2014",
      "year": 2016,
      "url": "https://www.cdc.gov/mmwr/volumes/65/wr/mm6501a6.htm"
    },
    "note": "Confirmed, with two small corrections. (1) The original findings labeled the HRS higher-prevalence cohort as \"75+\"; the paper actually stratifies it as 65+ (20.2%). The 16.5% overall and the \"middle-aged worsening\" claim are exactly right. (2) The \"median onset ~91.5-95.6\" snippet remains a niche conditional-survival statistic, correctly flagged as not a population mean. The honest headline stands: activity-limiting disability has no published mean onset age; ADL/IADL help-need clusters and peaks at 75+, rising sharply with age."
  },
  {
    "id": "health.mental.onset",
    "domain": "self",
    "topic": "Age at onset of mental disorders",
    "kind": "distribution",
    "statement": "Across mental disorders the median age at onset is 18 (IQR 11–34) with peak onset at 14.5 years; cumulative onset reaches 34.6% before age 14, 48.4% before 18, and 62.5% before 25 (Solmi 2022 global meta-analysis), consistent with NCS-R findings that half of lifetime cases begin by 14 and three-quarters by 24.",
    "metric": {
      "medianAge": 18,
      "ageLo": 11,
      "ageHi": 34,
      "age": 14.5,
      "byAge": {
        "before14Pct": 34.6,
        "before18Pct": 48.4,
        "before25Pct": 62.5
      },
      "peakAge": 14.5,
      "ncsrHalfByAge": 14,
      "ncsrThreeQuartersByAge": 24
    },
    "conditioning": {
      "byCategoryMedianAge": {
        "neurodevelopmental": 12,
        "anxiety": 17,
        "ocd": 19,
        "eating": 18,
        "substanceUse": 25,
        "schizophreniaSpectrum": 25,
        "mood": 31
      },
      "byCategoryPeakAge": {
        "neurodevelopmental": 5.5,
        "anxiety": 5.5,
        "ocd": 14.5,
        "eating": 15.5,
        "substanceUse": 19.5,
        "schizophreniaSpectrum": 20.5,
        "mood": 20.5
      },
      "population": "global pooled epidemiology",
      "metricType": "median across disorders and cumulative-onset percentages"
    },
    "provenance": "data",
    "confidence": 0.98,
    "source": {
      "org": "Molecular Psychiatry",
      "title": "Age at onset of mental disorders worldwide: large-scale meta-analysis of 192 epidemiological studies (Solmi et al.)",
      "year": 2022,
      "url": "https://www.nature.com/articles/s41380-021-01161-7"
    },
    "note": "Headline numbers from two methods/populations agree the peak onset window is mid-adolescence (~14–15) but measure related-but-distinct quantities: Solmi's \"median 18\" is the median across disorders (global pooled epidemiology), not equivalent to Kessler NCS-R's US retrospective \"50% of cases by 14 / 75% by 24.\" NCS-R median age by class: anxiety 11, impulse-control 11, substance use 20, mood 30. Kessler RC et al., Arch Gen Psychiatry 2005;62(6):593–602, https://pubmed.ncbi.nlm.nih.gov/15939837/.",
    "tags": [
      "mental-health",
      "age-of-onset",
      "epidemiology",
      "adolescence",
      "meta-analysis"
    ]
  },
  {
    "id": "health.mortality.income",
    "domain": "self",
    "topic": "Income–life expectancy gradient",
    "kind": "gradient",
    "statement": "In the US (2001–2014), expected age at death measured at age 40 differed by 14.6 years for men (95% CI 14.4–14.8) and 10.1 years for women (95% CI 9.9–10.3) between the top 1% and bottom 1% of household pre-tax income; from 2001–2014 life expectancy rose 2.34 yrs (men) / 2.91 yrs (women) in the top 5% but only 0.32 / 0.04 yrs in the bottom 5%, widening the gap (P<.001).",
    "metric": {
      "deltaYears": 14.6,
      "bySex": {
        "male": 14.6,
        "female": 10.1
      },
      "maleGapLo": 14.4,
      "maleGapHi": 14.8,
      "femaleGapLo": 9.9,
      "femaleGapHi": 10.3,
      "topPctMaleExpectedAge": 87,
      "bottomPctMaleExpectedAge": 72,
      "trendMaleTop5Pct": 2.34,
      "trendFemaleTop5Pct": 2.91,
      "trendMaleBottom5Pct": 0.32,
      "trendFemaleBottom5Pct": 0.04,
      "measuredAtAge": 40
    },
    "conditioning": {
      "incomeComparison": "top 1% vs bottom 1% of household pre-tax income",
      "measuredAtAge": 40,
      "outcome": "expected age at death (not life expectancy at birth)",
      "adjustment": "race/ethnicity-adjusted",
      "period": "2001-2014",
      "country": "United States",
      "trendIncomeBands": "top 5% vs bottom 5%"
    },
    "provenance": "data",
    "confidence": 0.99,
    "source": {
      "org": "JAMA (Chetty R, Stepner M, Abraham S, et al.)",
      "title": "The Association Between Income and Life Expectancy in the United States, 2001-2014",
      "year": 2016,
      "url": "https://pubmed.ncbi.nlm.nih.gov/27063997/"
    },
    "note": "All headline numbers, CIs, and trend figures match the JAMA abstract verbatim. Caveats are accurate: gap is in expected age at death measured at age 40 (not life expectancy at birth), 1st vs 100th income percentile, household pre-tax income, race/ethnicity-adjusted. Precise bottom-5% trend figures are 0.32 (men) / 0.04 (women), not the rounded \"~0\"."
  },
  {
    "id": "health.mortality.region",
    "domain": "self",
    "topic": "US state life expectancy range",
    "kind": "gradient",
    "statement": "Across US states, total-population life expectancy at birth ranged from a high of 80.0 years (Hawaii) to a low of 72.2 years (West Virginia) in 2022, a spread of about 7.8 years.",
    "metric": {
      "ageHi": 80,
      "ageLo": 72.2,
      "deltaYears": 7.8,
      "bySex": {
        "male": 69.5
      }
    },
    "conditioning": {
      "geography": "US states + DC",
      "highest": "Hawaii",
      "lowest": "West Virginia",
      "lowestMale": "Mississippi",
      "ageBasis": "at birth"
    },
    "provenance": "data",
    "confidence": 0.92,
    "source": {
      "org": "National Center for Health Statistics (CDC/NCHS)",
      "title": "U.S. State Life Tables, 2022 (National Vital Statistics Reports, Vol. 74, No. 12)",
      "year": 2024,
      "url": "https://www.cdc.gov/nchs/data/nvsr/nvsr74/nvsr74-12.pdf"
    },
    "note": "Corrected from prior findings: (1) lowest total-population state is West Virginia (72.2), not Mississippi — Mississippi is lowest only for males (69.5); (2) the range is ~7.8 years, not ~9 years; (3) the \"~9-year Hawaii-vs-Mississippi gap across 2020/2021/2022\" claim is unsupported by 2022 total-population data. Most current authoritative data is the 2022 US State Life Tables (released Dec 2024). IHME's modeled ~7-year state gap is roughly consistent with the NCHS ~7.8-year figure.",
    "tags": [
      "life-expectancy",
      "mortality",
      "us-states",
      "regional",
      "nchs"
    ]
  },
  {
    "id": "health.sensory.decline",
    "domain": "self",
    "topic": "Vision and hearing decline with age",
    "kind": "gradient",
    "statement": "Near-vision (presbyopia) decline is near-universal after age 45 and stops worsening around 65, while disabling hearing loss rises steeply with age from ~5% at 45-54 to 55% at 75+, and ~15% of US adults 18+ (37.5 million) report some trouble hearing, with men nearly twice as likely as women (ages 20-69).",
    "metric": {
      "presbyopiaOnsetAge": 45,
      "presbyopiaPlateauAge": 65,
      "anyTroubleHearingPct18plus": 15,
      "anyTroubleHearingMillions18plus": 37.5,
      "hearingLossPct20to69": 14,
      "hearingLossMillions20to69": 27.7,
      "disablingHearingLossByAge": {
        "age45to54Pct": 5,
        "age55to64Pct": 10,
        "age65to74Pct": 22,
        "age75plusPct": 55
      },
      "selfReportedTroubleHearingByAge": {
        "age18to39Pct": 5.5,
        "age40to69Pct": 19,
        "age70plusPct": 43.2
      }
    },
    "conditioning": {
      "sex": {
        "note": "Men are almost twice as likely as women to have hearing loss among adults ages 20-69",
        "maleRiskRatioVsFemale": 2
      },
      "ageStratified": true
    },
    "provenance": "data",
    "confidence": 0.95,
    "source": {
      "org": "NIDCD (NIH)",
      "title": "Quick Statistics About Hearing, Balance, & Dizziness",
      "year": 2024,
      "url": "https://www.nidcd.nih.gov/health/statistics/quick-statistics-hearing"
    },
    "note": "Multi-source fact spanning vision and hearing. Presbyopia figures (onset after 45, plateau after 65) are from the National Eye Institute consumer page (https://www.nei.nih.gov/learn-about-eye-health/eye-conditions-and-diseases/presbyopia); peer-reviewed sources place first symptoms nearer 40-45, so 'after 45' is NEI consumer framing, not a hard clinical onset. CORRECTION: the disabling hearing-loss age brackets (45-54 ~5%, 55-64 10%, 65-74 22%, 75+ 55%) derive from 2015-2020 NHANES, NOT NHANES 2011-2012 as originally stated; the 14% / 27.7M figure for ages 20-69 is from NHANES 2011-2012 (page also lists 16% / 28.0M for 1999-2004). Self-reported trouble-hearing splits (18-39: 5.5%, 40-69: 19.0%, 70+: 43.2%) are from the separate 2015 NIDCD news release ('1 in 6 adults reports trouble hearing', https://www.nidcd.nih.gov/news/2015/new-prevalence-data-shows-1-6-adults-reports-trouble-hearing), not the Quick Statistics page. Caveat: self-reported vs. audiometric metrics across different surveys are mixed and should not be directly compared."
  },
  {
    "id": "health.vo2max.decline",
    "domain": "self",
    "topic": "VO2max decline with age",
    "kind": "rate",
    "statement": "Peak VO2 (aerobic capacity) declines about 3-6% per decade in the 20s and 30s, then accelerates curvilinearly with each successive decade to exceed 20% per decade in the 70s and beyond, with steeper per-decade declines in men than women from the 40s onward.",
    "metric": {
      "perDecadePct": {
        "20s_30s_lo": 3,
        "20s_30s_hi": 6,
        "70s_plus": 20
      },
      "ageLo": 21,
      "ageHi": 87,
      "byAge": {
        "twenties_thirtiesPctPerDecadeLo": 3,
        "twenties_thirtiesPctPerDecadeHi": 6,
        "seventies_plusPctPerDecade": 20
      }
    },
    "conditioning": {
      "sex": "decline per decade larger in men than women from 40s onward",
      "population": "healthy adults, Baltimore Longitudinal Study of Aging",
      "measurement": "serial treadmill peak VO2",
      "design": "longitudinal (median follow-up 7.9 years); cross-sectional studies underestimate steepness in older adults"
    },
    "provenance": "data",
    "confidence": 0.97,
    "source": {
      "org": "Circulation (American Heart Association)",
      "title": "Accelerated Longitudinal Decline of Aerobic Capacity in Healthy Older Adults",
      "year": 2005,
      "url": "https://www.ahajournals.org/doi/10.1161/circulationaha.105.545459"
    },
    "note": "Endpoint figures (3-6% per decade in 20s/30s, >20% per decade in 70s+, larger decline in men from 40s on, accelerating/curvilinear not constant) are verbatim from the source abstract. Intermediate per-decade values for the 40s/50s/60s and the \"~25% per decade in older men\" figure are interpolated/derived, not stated explicitly in the abstract, and should be treated as approximate. Sample: 810 adults (375 women, 435 men), ages 21-87. DOI: 10.1161/CIRCULATIONAHA.105.545459; abstract: https://pubmed.ncbi.nlm.nih.gov/16043637/"
  },
  {
    "id": "heritability.addiction",
    "domain": "self",
    "topic": "Heritability of alcohol/substance use disorder",
    "kind": "risk",
    "statement": "Alcohol use disorder is roughly 49% heritable (95% CI 0.43–0.53) with substance use disorders broadly ~50% genetic, and children of a parent with AUD carry about 2–4x the general-population risk though fewer than half develop it.",
    "metric": {
      "heritabilityPct": 49,
      "heritabilityLoPct": 43,
      "heritabilityHiPct": 53,
      "relativeRiskLo": 2,
      "relativeRiskHi": 4
    },
    "conditioning": {
      "disorder": "alcohol/substance use disorder",
      "consensusRangePct": "40-60",
      "bySubstanceRangePct": "30-80"
    },
    "provenance": "data",
    "confidence": 0.92,
    "requires": [
      "familyHistory"
    ],
    "source": {
      "org": "Psychological Medicine (Verhulst, Neale & Kendler)",
      "title": "The heritability of alcohol use disorders: a meta-analysis of twin and adoption studies",
      "year": 2015,
      "url": "https://pubmed.ncbi.nlm.nih.gov/25171596/"
    },
    "tags": [
      "addiction",
      "alcohol",
      "heritability",
      "genetics",
      "familyHistory",
      "twinStudies"
    ],
    "note": "Meta-analysis of 12 twin + 5 adoption studies; AUD h²≈0.49 (95% CI 0.43–0.53). Remaining variance is environmental, splitting into a small but statistically significant shared-environment component (c²≈0.10, 95% CI 0.03–0.16) plus a larger non-shared/unique-environment component. Consensus range commonly stated ~50% (40–60%); by-substance genetic contribution ranges ~30–80% (nicotine/cocaine high, hallucinogens low). NIAAA confirms 2–4x family-history risk and ~50–60% range; fewer than half of children of an affected parent develop AUD. Family-history multiplier varies by population/severity."
  },
  {
    "id": "heritability.alzheimers",
    "domain": "self",
    "topic": "Family history of Alzheimer's disease",
    "kind": "risk",
    "statement": "Having one affected first-degree relative raises Alzheimer's disease relative risk to 1.73 (95% CI 1.59-1.87) — roughly doubling lifetime risk per mainstream consensus — with a robust dose-response (two FDRs RR 3.98, four FDRs RR 14.77).",
    "metric": {
      "relativeRisk": 1.73,
      "ciLo": 1.59,
      "ciHi": 1.87,
      "relativeRiskTwoFDR": 3.98,
      "relativeRiskFourFDR": 14.77
    },
    "conditioning": {
      "affectedFirstDegreeRelatives": 1,
      "doseResponse": "RR rises with number of affected FDRs",
      "cohort": "Utah, largely white European ancestry"
    },
    "provenance": "data",
    "confidence": 0.88,
    "source": {
      "org": "Neurology (Cannon-Albright LA, et al.)",
      "title": "Relative risk for Alzheimer disease based on complete family history",
      "year": 2019,
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6511086/"
    },
    "requires": [
      "familyHistory"
    ],
    "note": "Genealogical relative risk, not absolute lifetime percentage; absolute risk also depends heavily on APOE genotype and age. Exact RRs derive from a single largely white European-ancestry Utah cohort, so the precise figures aren't universal even though the ~1.5x-2x direction is corroborated by NIA, Alzheimer's Association, Mayo Clinic, and Cedars-Sinai. Parent-of-origin breakdown (father RR 2.54 vs. mother RR 1.72) is suggestive only — not consistently statistically significant and contested in the broader literature."
  },
  {
    "id": "heritability.breast-cancer",
    "domain": "self",
    "topic": "Breast cancer risk from family history",
    "kind": "risk",
    "statement": "Having one affected first-degree relative (mother, sister, or daughter) roughly doubles breast cancer risk (RR 1.80, 99% CI 1.69-1.91); two affected relatives raise it ~3-fold (RR 2.93) and three or more ~4-fold (RR 3.90), translating to a lifetime risk rising from ~7.8% with no affected relative to ~13.3% with one and ~21.1% with two.",
    "metric": {
      "relativeRiskOne": 1.8,
      "relativeRiskOneLo": 1.69,
      "relativeRiskOneHi": 1.91,
      "relativeRiskTwo": 2.93,
      "relativeRiskTwoLo": 2.36,
      "relativeRiskTwoHi": 3.64,
      "relativeRiskThreePlus": 3.9,
      "relativeRiskThreePlusLo": 2.03,
      "relativeRiskThreePlusHi": 7.49,
      "pooledRelativeRiskOne": 2.1,
      "lifetimeRiskNoRelativePct": 7.8,
      "lifetimeRiskOneRelativePct": 13.3,
      "lifetimeRiskTwoRelativesPct": 21.1,
      "baselineLifetimeRiskPct": 13
    },
    "conditioning": {
      "relativeType": "first-degree (mother, sister, daughter)",
      "outcome": "breast cancer",
      "region": "developed countries",
      "ageHorizon": "cumulative incidence by age 80"
    },
    "provenance": "data",
    "confidence": 0.97,
    "requires": [
      "familyHistory",
      "sex"
    ],
    "source": {
      "org": "Collaborative Group on Hormonal Factors in Breast Cancer",
      "title": "Familial breast cancer: collaborative reanalysis of individual data from 52 epidemiological studies including 58,209 women with breast cancer and 101,986 women without the disease",
      "year": 2001,
      "url": "https://pubmed.ncbi.nlm.nih.gov/11705483/"
    },
    "note": "Confirmed and mainstream. The Lancet 2001 reanalysis (52 studies, 160k+ women) supports the relative-risk figures verbatim against the PubMed abstract; Pharoah 1997 meta-analysis (74 studies) independently pooled RR 2.1 for one first-degree relative; \"doubled with one, ~5-fold with two\" framing is corroborated by Cancer Research UK, breastcancer.org, and Susan G. Komen. Standard caveat: this is a relative, not absolute, increase, and most women with an affected first-degree relative never develop breast cancer."
  },
  {
    "id": "heritability.colorectal-cancer",
    "domain": "self",
    "topic": "Colorectal cancer risk with family history (one affected first-degree relative)",
    "kind": "risk",
    "statement": "Having one affected first-degree relative roughly doubles colorectal cancer risk (pooled relative risk ~2.2, with NCI PDQ citing RR 2.25 [95% CI 2.00-2.53] and the Butterworth meta-analysis RR 2.24 [95% CI 2.06-2.43]), placing first-degree relatives at a twofold-to-threefold increased risk.",
    "metric": {
      "relativeRisk": 2.24,
      "relativeRiskCiLo": 2.06,
      "relativeRiskCiHi": 2.43,
      "relativeRiskNci": 2.25,
      "relativeRiskColon": 2.42,
      "relativeRiskRectal": 1.89,
      "relativeRiskTwoOrMoreRelatives": 3.97
    },
    "conditioning": {
      "affectedFirstDegreeRelatives": 1,
      "cancerSite": "colorectal",
      "note": "RR ~3.97 (2.60-6.06) with two or more affected relatives; risk especially elevated if relative diagnosed before age 55"
    },
    "provenance": "data",
    "confidence": 0.97,
    "source": {
      "org": "National Cancer Institute",
      "title": "Colorectal Cancer Prevention (PDQ) - Health Professional Version",
      "year": 2024,
      "url": "https://www.cancer.gov/types/colorectal/hp/colorectal-prevention-pdq"
    },
    "requires": [
      "familyHistory"
    ],
    "note": "Mainstream and uncontested, corroborated by three independent meta-analyses (Butterworth 2006: 47 studies, RR 2.24; NCI PDQ: RR 2.25; Mehraban Far 2019: RR 1.87). Caveat: cohort-design estimates trend lower (~1.4-1.9) than case-control (~2.2-2.4), so \"roughly doubled / ~2-fold\" is the firm consensus rather than a single precise point estimate.",
    "tags": [
      "colorectal-cancer",
      "family-history",
      "first-degree-relative",
      "heritability",
      "relative-risk"
    ]
  },
  {
    "id": "heritability.depression",
    "domain": "self",
    "topic": "Heritability and familial risk of major depression",
    "kind": "risk",
    "statement": "Major depression is roughly 37% heritable (95% CI 31-42%; higher in women ~40-42% vs men ~29-30%), and having a first-degree relative with depression raises your risk about 2- to 3-fold (pooled OR 2.84).",
    "metric": {
      "heritabilityPct": 37,
      "heritabilityPctLo": 31,
      "heritabilityPctHi": 42,
      "heritabilityPctWomen": 41,
      "heritabilityPctMen": 30,
      "oddsRatio": 2.84,
      "relativeRisk": 2.5
    },
    "conditioning": {
      "populationBasis": "twin and family studies",
      "snpBasedHeritabilityPct": 9
    },
    "requires": [
      "familyHistory",
      "sex"
    ],
    "provenance": "data",
    "confidence": 0.93,
    "source": {
      "org": "American Journal of Psychiatry",
      "title": "Genetic Epidemiology of Major Depression: Review and Meta-Analysis",
      "year": 2000,
      "url": "https://psychiatryonline.org/doi/full/10.1176/appi.ajp.157.10.1552"
    },
    "note": "Sullivan, Neale & Kendler 2000 meta-analysis: twin-based additive genetic heritability ~37% (shared environment ~0%, individual-specific environment/error ~63%); pooled OR 2.84 in first-degree relatives. Sex difference confirmed (higher in women). Familial risk replicated by Wilde et al. 2014 (J Affect Disord; OR 2.14, 95% CI 1.72-2.67 for one affected proband, rising to ~3.23 with multiple affected relatives). Standard caveat: twin-based heritability (~37%) exceeds SNP/GWAS-based estimates (~9%) — the known \"missing heritability\" gap. Consensus literature range 30-40%. Mainstream and replicated for 20+ years.",
    "tags": [
      "depression",
      "heritability",
      "family-history",
      "genetics",
      "twin-study",
      "MDD"
    ]
  },
  {
    "id": "heritability.diabetes",
    "domain": "self",
    "topic": "Family history of type 2 diabetes",
    "kind": "risk",
    "statement": "Having one biological parent (or one affected first-degree relative) with type 2 diabetes roughly doubles your risk (RR ~1.76) and raises lifetime risk to about 40%, while having both parents (or 2+ affected first-degree relatives) raises relative risk to about 3x (RR ~3.31) and lifetime risk to about 70%.",
    "metric": {
      "relativeRiskOneParent": 1.76,
      "relativeRiskBothParents": 3.31,
      "lifetimeRiskOneParentPct": 40,
      "lifetimeRiskBothParentsPct": 70
    },
    "conditioning": {
      "familyHistoryOf": "type2diabetes",
      "oneParentRR_CI": "1.70-1.83",
      "bothParentsRR_CI": "3.16-3.48",
      "bothParentsProxy": "2+ affected first-degree relatives; some sources cite up to ~6x for both parents"
    },
    "provenance": "data",
    "confidence": 0.85,
    "requires": [
      "familyHistory"
    ],
    "source": {
      "org": "Liu et al. (PMC) / Cleveland Clinic",
      "title": "Family history of type 2 diabetes and the risk of type 2 diabetes among young and middle-aged adults (cohort n≈375,724); Cleveland Clinic, Type 2 Diabetes health library",
      "year": 2025,
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11880113/"
    },
    "note": "Relative-risk figures from Liu et al. 2025 cohort (n≈375,724): RR 1.76 (95% CI 1.70-1.83) for one affected first-degree relative; RR 3.31 (95% CI 3.16-3.48) for 2+ affected first-degree relatives, verified verbatim. Lifetime 40%/70% figures from Cleveland Clinic (https://my.clevelandclinic.org/health/diseases/21501-type-2-diabetes): \"Your lifetime risk of developing T2D is 40% if you have one biological parent with T2D. It's 70% if both of your biological parents have it.\" Caveat 1: the 3.31 figure is \"2+ affected first-degree relatives\" (parents + siblings), a close proxy for \"both parents,\" not an exact both-parents estimate; some sources cite up to ~6x, so ~3x is a conservative central value. Caveat 2: maternal-vs-paternal transmission asymmetry is real but inconsistent across studies (directionally noted, not settled)."
  },
  {
    "id": "heritability.heart-disease",
    "domain": "self",
    "topic": "Family history of coronary heart disease",
    "kind": "risk",
    "statement": "A first-degree family history of myocardial infarction roughly doubles your own CHD/MI risk (~1.5–2x, independent of other risk factors; pooled RR 1.60), with a clear dose-response: 1 affected relative IRR 1.46, 2 relatives 2.38, and 3+ relatives 3.58.",
    "metric": {
      "relativeRisk": 1.6,
      "relativeRiskLo": 1.44,
      "relativeRiskHi": 1.77,
      "irr1Relative": 1.46,
      "irr2Relatives": 2.38,
      "irr3PlusRelatives": 3.58,
      "rrRangeLo": 1.5,
      "rrRangeHi": 2
    },
    "conditioning": {
      "relativeDegree": "first-degree",
      "outcome": "coronary heart disease / myocardial infarction",
      "independentOfOtherRiskFactors": true,
      "doseResponse": true,
      "prematureParentalOnsetRaisesRiskFurther": true
    },
    "provenance": "data",
    "confidence": 0.9,
    "requires": [
      "familyHistory"
    ],
    "source": {
      "org": "PLOS ONE",
      "title": "A Detailed Family History of Myocardial Infarction and Risk of Myocardial Infarction – A Nationwide Cohort Study (Ranthe et al.)",
      "year": 2015,
      "url": "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0125896"
    },
    "tags": [
      "heredity",
      "cardiovascular",
      "coronary-heart-disease",
      "myocardial-infarction",
      "family-history",
      "dose-response"
    ],
    "note": "Mainstream consensus across multiple large independent datasets (Danish ~4.4M-person nationwide cohort, INTERHEART ~30k across 52 countries, Framingham, plus a meta-analysis) converging on ~1.5–2x RR with a clear dose-response. Pooled RR 1.60 (95% CI 1.44–1.77) comes from 12 case-control studies (per MDPI/JCM 2024 review, PMC11477357), not cohort studies. Danish cohort dose-response (Ranthe 2015): 1 first-degree relative IRR 1.46 (1.42–1.49), 2 relatives 2.38 (2.22–2.56), ≥3 relatives 3.58 (2.66–4.81). INTERHEART (Chow et al., JACC 2011) shows premature parental onset raises risk further (both parents with MI, one before 50 → OR 3.26; both premature → OR 6.56 with very wide CI 1.39–30.95). The 'shifts onset earlier' effect is directionally well-supported but not quantified as a canonical 'X years earlier' figure; the eye-catching 6.56 / ~10-fold extremes rest on small subgroups with wide CIs and should not be presented as central estimates. The robust, defensible headline is ~1.5–2x."
  },
  {
    "id": "heritability.longevity",
    "domain": "self",
    "topic": "Heritability of longevity",
    "kind": "rate",
    "statement": "About 20-25% of variation in human lifespan is heritable (twin-study estimates of 0.26 for men and 0.23 for women), with most longevity driven by environment, behavior, and chance; having a mother who lived to 90+ raises a woman's odds of healthy survival to 90 by roughly 25% (OR 1.25), and both parents reaching 90 by about 38% (OR 1.38).",
    "metric": {
      "heritabilityPct": 24,
      "heritabilityLoPct": 15,
      "heritabilityHiPct": 33,
      "heritabilityMenPct": 26,
      "heritabilityWomenPct": 23,
      "oddsRatioMotherTo90": 1.25,
      "oddsRatioMotherCiLo": 1.11,
      "oddsRatioMotherCiHi": 1.42,
      "oddsRatioBothParentsTo90": 1.38
    },
    "conditioning": {
      "prediction": "parental longevity to 90+ predicting healthy survival to 90 measured in women (Women's Health Initiative, n=22,735)",
      "note": "emerging non-consensus revision (Sarel et al. Science 2026) estimates intrinsic-lifespan heritability ~50% after separating intrinsic from extrinsic deaths; an opposing 2018 analysis argues assortative mating inflates classic estimates toward ~7-15%"
    },
    "provenance": "data",
    "confidence": 0.88,
    "requires": [
      "familyHistory",
      "parents",
      "sex"
    ],
    "source": {
      "org": "Human Genetics (Herskind et al.)",
      "title": "The heritability of human longevity: a population-based study of 2872 Danish twin pairs born 1870-1900",
      "year": 1996,
      "url": "https://pubmed.ncbi.nlm.nih.gov/8786073/"
    },
    "note": "Mainstream consensus: ~20-25% of lifespan variation is heritable (range ~15-33% across studies, clustering at 20-25%); most variation is non-genetic. Parental longevity is a modest-but-real predictor, not deterministic (Sun et al., Age and Ageing 2018, https://academic.oup.com/ageing/article/47/6/853/5067592). The ~25% figure is pressured in both directions: a Jan 2026 Science paper (Sarel et al., \"Heritability of intrinsic human life span is about 50%...\", https://www.science.org/doi/10.1126/science.adz1187) argues it is biased low (~50-54% when separating intrinsic from extrinsic deaths; single model-dependent study, confidence ~0.4), while a 2018 study (PMC6218226) argues assortative mating inflates it (true value perhaps ~7-15%). This two-sided uncertainty supports reporting ~20-25% as a central estimate with genuine uncertainty rather than a precise value. sex is required only for the female-specific parental-longevity prediction."
  },
  {
    "id": "origins.aces",
    "domain": "self",
    "topic": "Adverse Childhood Experiences (ACEs) and premature mortality",
    "kind": "gradient",
    "statement": "In nationally representative U.S. data, 63.9% of adults report at least one adverse childhood experience and 17.3% report 4 or more (~1 in 6), and exposure follows a dose-response gradient: people with 6+ ACEs died on average nearly 20 years earlier (mean age 60.6 vs 79.1) and were 1.7x more likely to die by age 75 and 2.4x more likely to die by age 65.",
    "metric": {
      "prevalencePctAny": 63.9,
      "prevalencePct4plus": 17.3,
      "deltaYears": 18.5,
      "meanAgeDeathHighExposure": 60.6,
      "meanAgeDeathNoExposure": 79.1,
      "yearsLifeLostHighExposure": 25.2,
      "yearsLifeLostNoExposure": 9.2,
      "relativeRiskDeathBy75": 1.7,
      "relativeRiskDeathBy65": 2.4,
      "acesThresholdHighExposure": 6
    },
    "conditioning": {
      "appliesTo": "high-exposure tail (6+ ACEs) for mortality estimates; prevalence figures are population-wide",
      "studyDesign": "observational cohort, associations adjusted but not causal"
    },
    "provenance": "data",
    "confidence": 0.92,
    "source": {
      "org": "American Journal of Preventive Medicine (Brown et al.); CDC MMWR (Swedo et al.)",
      "title": "Adverse Childhood Experiences and the Risk of Premature Mortality (2009); Prevalence of ACEs Among U.S. Adults — BRFSS 2011–2020 (2023)",
      "year": 2009,
      "url": "https://pubmed.ncbi.nlm.nih.gov/19840693/"
    },
    "requires": [],
    "note": "Two standing caveats: (1) the ~20-years-earlier death and 1.7x/2.4x relative risks apply to the high-exposure 6+ ACEs tail, not the average person with one ACE; (2) associations are observational, though the gradient is robust, biologically plausible (toxic stress), and replicated across independent cohorts and meta-analyses (e.g., Hughes et al., Lancet Public Health 2017). BRFSS national figures (63.9%/17.3%) preferred over the original CDC-Kaiser cohort for prevalence. Foundational: Felitti et al., 1998.",
    "tags": [
      "aces",
      "childhood-adversity",
      "mortality",
      "toxic-stress",
      "dose-response",
      "public-health"
    ]
  },
  {
    "id": "origins.childhood-poverty",
    "domain": "self",
    "topic": "Childhood poverty and adult earnings, health, and life expectancy",
    "kind": "gradient",
    "statement": "Growing up in poverty lowers adult outcomes across earnings, health, and longevity: moving out of a high-poverty neighborhood before age 13 raised adult earnings by about 31% ($3,477/yr on a ~$11,270 base), poverty-linked adverse childhood experiences raise premature-mortality risk roughly 40-50% (HR ~1.41), and the extreme ACE-burden tail (6+ ACEs) is associated with dying about 19-20 years earlier and 54% higher mortality.",
    "metric": {
      "earningsGainPct": 31,
      "earningsGainUSD": 3477,
      "controlEarningsUSD": 11270,
      "moverAgeThreshold": 13,
      "prematureMortalityHR": 1.41,
      "prematureMortalityHRLo": 1.24,
      "prematureMortalityHRHi": 1.62,
      "prematureMortalityElevationPctLo": 40,
      "prematureMortalityElevationPctHi": 50,
      "aceExtremeDeltaYearsLo": 19,
      "aceExtremeDeltaYearsHi": 20,
      "aceExtremeMortalityElevationPct": 54,
      "aceExtremeAgeAtDeath": 60.6,
      "comparisonAgeAtDeath": 79.1,
      "aceExtremeThreshold": 6
    },
    "conditioning": {
      "earnings": "MTO randomized place effect, movers before age 13; near-zero for teen movers",
      "lifeExpectancy": "19-20 year figure is ACE-burden (6+ ACEs), NOT poverty alone; ACEs and poverty overlap but are distinct",
      "prematureMortalityDoseResponse": "HR 1.14/1.44/1.54/1.74 for 1/2/3/>=4 ACEs"
    },
    "provenance": "data",
    "confidence": 0.85,
    "source": {
      "org": "Opportunity Insights / Lancet Regional Health-Americas / Am J Prev Med (CDC)",
      "title": "The Effects of Exposure to Better Neighborhoods on Children (Chetty, Hendren & Katz 2016); Adverse Childhood Experiences and Premature Mortality (Forrester et al. 2022); ACEs and Risk of Premature Mortality (Brown et al. 2009)",
      "year": 2022,
      "url": "https://opportunityinsights.org/paper/newmto/"
    },
    "requires": [
      "birthRegion"
    ],
    "note": "Most common misuse risk is conflating the ACE-extreme ~20-year life-expectancy gap with poverty alone; frame ~20 years as ACE-burden and use the ~40-50% premature-mortality elevation (HR ~1.41) as the poverty-specific figure. Direction and existence of all three effects are firm mainstream consensus; precise effect sizes carry normal cohort/measurement variation.",
    "tags": [
      "childhood-poverty",
      "ACEs",
      "earnings",
      "mortality",
      "life-expectancy",
      "neighborhood-effects",
      "social-determinants"
    ]
  },
  {
    "id": "origins.county-le",
    "domain": "self",
    "topic": "Geographic inequality in US life expectancy (county and neighborhood)",
    "kind": "gradient",
    "statement": "US life expectancy varies by about 20 years between the longest-lived county (Summit County, CO, 86.8 yrs) and the shortest-lived (Oglala Lakota County/Pine Ridge, SD, 66.8 yrs), and within a single state the neighborhood (census-tract) gap reaches nearly 35 years (e.g., New York: 59.0 yrs on Roosevelt Island vs. 93.6 yrs in a Lower Manhattan/Chinatown tract).",
    "metric": {
      "deltaYearsCounty": 20.1,
      "countyHigh": 86.8,
      "countyLow": 66.8,
      "deltaYearsTract": 34.6,
      "tractHigh": 93.6,
      "tractLow": 59
    },
    "conditioning": {
      "geographicUnitCounty": "US county, IHME 2014",
      "geographicUnitTract": "US census tract within a single state (New York), NCHS USALEEP 2010-2015"
    },
    "provenance": "data",
    "confidence": 0.97,
    "requires": [
      "currentRegion"
    ],
    "source": {
      "org": "IHME / JAMA Internal Medicine (Dwyer-Lindgren et al.); NCHS USALEEP",
      "title": "Inequalities in Life Expectancy Among US Counties, 1980 to 2014; NCHS Census-Tract Life Expectancy (USALEEP), 2010-2015",
      "year": 2017,
      "url": "https://www.healthdata.org/news-events/newsroom/news-releases/growing-gap-between-longest-and-shortest-lifespans-us-emphasizes"
    },
    "note": "Always state the geographic unit: the ~20-year gap is county-level (IHME 2014; figures 86.8/86.5/85.9 high, 66.8 low reproduced verbatim across ScienceDaily, IHME, NIH Director's Blog, WEF), while the larger ~35-year gap is census-tract/neighborhood within a single state (NCHS USALEEP 2010-2015; NY 59.0 vs 93.6 confirmed by NY Health Foundation) — the two are not interchangeable. The 11.8-year average within-city figure (Journal of Urban Health, 2025) was not re-verified and should be dropped if precision matters. The 403 on the IHME URL is a bot-block only; claims confirmed via mirror sources."
  },
  {
    "id": "origins.rural-urban",
    "domain": "self",
    "topic": "Rural vs. urban mortality and life expectancy gap",
    "kind": "gradient",
    "statement": "Living in a rural area carries a roughly 2–2.5 year life-expectancy disadvantage (2.48 yrs for women, 2.53 yrs for men in 2019) and an age-adjusted all-cause death rate about 20% higher than urban areas (834.0 vs 693.4 per 100,000 in 2019), with rural rates higher for all 10 leading causes of death.",
    "metric": {
      "deltaYears": -2.5,
      "deltaYearsWomen": -2.48,
      "deltaYearsMen": -2.53,
      "allCauseDeathRateRuralPer100k": 834,
      "allCauseDeathRateUrbanPer100k": 693.4,
      "allCauseRelativeRisk": 1.2,
      "heartDiseaseRuralPer100k": 189.1,
      "heartDiseaseUrbanPer100k": 156.3,
      "cancerRuralPer100k": 164.1,
      "cancerUrbanPer100k": 142.8,
      "clrdRuralPer100k": 52.5,
      "clrdUrbanPer100k": 35.4,
      "primeAgeNaturalCauseExcessPct": 43,
      "year": 2019
    },
    "conditioning": {
      "classification": "NCHS 2013 urban-rural scheme",
      "ageRangePrimeWorking": "25-54",
      "trend": "gap widened since ~1990; rural LE declined 2010-2019 while urban rose"
    },
    "provenance": "data",
    "confidence": 0.95,
    "source": {
      "org": "CDC NCHS",
      "title": "Trends in Death Rates in Urban and Rural Areas: United States, 1999–2019 (Data Brief No. 417)",
      "year": 2021,
      "url": "https://www.cdc.gov/nchs/products/databriefs/db417.htm"
    },
    "requires": [
      "birthRegion",
      "currentRegion"
    ],
    "note": "Confirmed against primary sources. LE gap from Cosby et al. (Int J Epidemiol, 2022, PMC8743112); all-cause and cause-specific rates verbatim from CDC NCHS Data Brief 417 (2021); USDA ERS EIB-265 \"The Nature of the Rural-Urban Mortality Gap\" is dated March 2024 (not 2023) — https://www.ers.usda.gov/publications/pub-details?pubid=108701. Prime working-age (25–54) natural-cause mortality ~43% higher in rural areas. Cite as ranges (LE gap ~2–2.5 yrs; all-cause mortality ~20% higher); classification per NCHS 2013 urban-rural scheme.",
    "tags": [
      "rural",
      "urban",
      "mortality",
      "life-expectancy",
      "geography",
      "social-determinants"
    ]
  },
  {
    "id": "reproductive.fertility.decline",
    "domain": "self",
    "topic": "Female fertility decline with age",
    "kind": "gradient",
    "statement": "Female fecundity (natural monthly chance of conception) declines gradually starting around age 32, drops more rapidly after age 37, and by age 40 is roughly half that of women in their late 20s and early 30s; clinically, an accelerated decline after age 35 is why evaluation is recommended after 6 months rather than 12.",
    "metric": {
      "declineBeginsAge": 32,
      "rapidDeclineAge": 37,
      "clinicalThresholdAge": 35,
      "relativeFertilityAt40Pct": 50,
      "peakAgeLo": 20,
      "peakAgeHi": 30,
      "oocytesAtAge37": 25000,
      "oocytesAtMenopauseAge51": 1000
    },
    "conditioning": {
      "sex": "female",
      "measure": "natural fecundability without assisted reproduction"
    },
    "provenance": "data",
    "confidence": 0.95,
    "source": {
      "org": "American College of Obstetricians and Gynecologists (ACOG) Committee on Gynecologic Practice & American Society for Reproductive Medicine (ASRM)",
      "title": "Female age-related fertility decline. Committee Opinion No. 589",
      "year": 2014,
      "url": "https://pubmed.ncbi.nlm.nih.gov/24559617/"
    },
    "note": "All metric numbers confirmed against primary sources. The \"32 gradual / 37 rapid\" decline language matches Committee Opinion No. 589 verbatim (\"fecundity of women decreases gradually but significantly beginning approximately at age 32 years and decreases more rapidly after age 37 years\"). Oocyte counts (25,000 at age 37; ~1,000 at age 51) match CO 589 and StatPearls (NBK576440) exactly. The over-35 / evaluate-after-6-months recommendation is confirmed in CO 589. Two corrections to the citation: (1) org changed from \"ASRM Practice Committee\" to reflect that CO 589 was jointly developed by ACOG's Committee on Gynecologic Practice and ASRM. (2) The \"relative fertility ~half at age 40\" figure (relativeFertilityAt40Pct:50) is NOT actually in CO 589 — it comes from the separate ASRM \"Optimizing natural fertility: a committee opinion\" (Fertil Steril 2022), which states verbatim: \"Relative fertility is decreased by about half at age 40 compared with women in their late 20s and early 30s, the time of peak fertility.\" Statement minimally edited to add \"and early 30s\" to match that source's stratification of peak fertility. The PubMed URL is real and correct for CO 589. No claims are overstated."
  }
];
