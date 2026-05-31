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
