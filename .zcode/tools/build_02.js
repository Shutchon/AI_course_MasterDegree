// Deck 02 — Data Understanding & Cleaning
const L = require("./deck_lib");
const { C, FONT, MONO, W, H, M } = L;

const TAG = "SESSION 02";
const pres = L.deckInit("02 Data Understanding & Cleaning");
let pn = 1;

// 1 · Title
L.titleSlide(pres, {
  num: "02",
  title: "Data Understanding\n& Cleaning",
  subtitle: "Real data is messy. Learn to look at it properly, find what's broken, and fix it without lying to your model.",
});
pn++;

// 2 · Agenda
L.agendaSlide(pres, {
  sessionTag: TAG, pageNo: ++pn,
  items: [
    { t: "Why cleaning matters", d: "garbage in, garbage out" },
    { t: "Anatomy of a dataset", d: "features X, target y, dtypes" },
    { t: "EDA — look before you model", d: "distributions · target · groups" },
    { t: "Missing data", d: "find it, understand it, impute it" },
    { t: "Duplicates", d: "quiet score-inflators" },
    { t: "Outliers", d: "detect, investigate, then decide" },
    { t: "Inconsistent categories", d: "\"BKK\" vs \"Bangkok\"" },
    { t: "The cleaning checklist", d: "your reusable routine" },
  ],
});

// 3 · why cleaning matters
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "The 80% truth", title: "Data scientists spend most time here", pageNo: ++pn });
  L.bigStat(s, { x: M + 1.5, y: 2.3, w: 4.0, value: "~80%", label: "of a data scientist's time goes to\npreparing & cleaning data — not modeling", size: 84 });
  L.bullets(s, [
    { t: "Why we can't skip it:", b: true },
    "Models don't “fix” dirty data — they learn it",
    "Median-imputing a typo (age = 800) shifts everything",
    "Leaked duplicates = a test set your model already memorized",
    { t: "Session goal: a repeatable routine you'll run on every dataset — including your final project.", b: true, c: C.PRIMARY_DARK },
  ], { x: 6.6, y: 2.3, w: W - 6.6 - M, h: 3.6, size: 16, gap: 12 });
}

// 4 · workflow position
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Where we are", title: "This session = steps 2–3 of the workflow", pageNo: ++pn });
  L.flowRow(s, pres, { x: M, y: 2.1, w: W - 2 * M, h: 1.4, steps: [
    { t: "1 · Frame", d: "done in S01" },
    { t: "2 · Collect & EDA", d: "today — look & question" },
    { t: "3 · Prepare", d: "today: clean · next: transform" },
    { t: "4–8 · Train → share", d: "sessions 04–08" },
  ]});
  L.card(s, pres, { x: M, y: 3.95, w: (W - 2 * M - 0.4) / 2, h: 2.0, title: "Understand (EDA)", body: "What is each column? What's missing? What's weird? How does the target behave? EDA is asking the data questions — before it asks you for a model.", bodySize: 14 });
  L.card(s, pres, { x: M + (W - 2 * M - 0.4) / 2 + 0.4, y: 3.95, w: (W - 2 * M - 0.4) / 2, h: 2.0, title: "Clean", body: "Fix missing values, drop/reconcile duplicates, handle outliers, normalize categories. Cleaning must happen BEFORE the train/test split (except… we'll see why in S03).", bodySize: 14 });
}

// 5 · anatomy
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Running example", title: "The Titanic dataset — our lab rat this session", pageNo: ++pn });
  L.compTable(s, pres, {
    x: M, y: 2.0, w: 7.6, colW: [1.35, 1.0, 1.15, 1.0, 0.8, 1.3], fontSize: 11, rowH: 0.4,
    rows: [
      [{ t: "y: survived", c: "FFFFFF", f: C.ACCENT }, "pclass", "sex", "age", "sibsp", "fare"],
      [{ t: "0", c: "92400E", b: true }, "3", "male", "22.0", "1", "7.25"],
      [{ t: "1", c: "92400E", b: true }, "1", "female", "38.0", "1", "71.28"],
      [{ t: "1", c: "92400E", b: true }, "3", "female", "26.0", "0", "7.93"],
    ],
  });
  s.addText("891 passengers · 8 columns · target: survived (0/1) — did they live?", { x: M, y: 4.0, w: 7.6, h: 0.4, fontSize: 13, fontFace: FONT, color: C.MUTED, margin: 0 });
  L.bullets(s, [
    { t: "X = features", b: true },
    "pclass, sex, age, sibsp, parch, fare, embarked",
    { t: "y = target: survived", b: true, c: "92400E" },
    "Task: binary classification — predict survival from passenger info",
    { t: "First studied in 1912… still teaching in 2026.", sub: true },
  ], { x: 8.7, y: 2.2, w: W - 8.7 - M, h: 3.4, size: 14, gap: 10 });
  L.codeBlock(s, pres, { x: M, y: 4.55, w: 7.6, h: 1.5, size: 12.5, lines: [
    { t: "import pandas as pd, seaborn as sns" },
    { t: "df = sns.load_dataset(\"titanic\")[[\"survived\",\"pclass\",\"sex\",\"age\"," },
    { t: "                                  \"sibsp\",\"parch\",\"fare\",\"embarked\"]]" },
  ]});
}

// 6 · dtypes
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Column types", title: "Know your dtypes — they steer every decision", pageNo: ++pn });
  const w = (W - 2 * M - 0.8) / 3, y = 2.05, h = 3.3;
  L.card(s, pres, { x: M, y, w, h, title: "Numerical", body: "int64 / float64\n\nage, fare, sibsp, parch\n\n→ mean/median, histograms, scaling, outliers", bodySize: 14 });
  L.card(s, pres, { x: M + w + 0.4, y, w, h, title: "Categorical", body: "object / category\n\nsex, embarked\n\n→ value_counts(), encoding (S03): one-hot, ordinal", bodySize: 14 });
  L.card(s, pres, { x: M + 2 * (w + 0.4), y, w, h, title: "Ordinal (in between)", body: "ordered categories\n\npclass 1st < 2nd < 3rd\n\n→ keep the order (map 1,2,3), don't one-hot blindly", bodySize: 14 });
  s.addText("df.dtypes is the first thing I print — half of ML bugs on tabular data are dtype surprises (\"age\" stored as object because of \"42 y/o\").",
    { x: M, y: 5.7, w: W - 2 * M, h: 0.65, fontSize: 15, fontFace: FONT, color: C.TEXT, margin: 0 });
}

// 7 · first look code
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "EDA step 1", title: "The first five minutes with any dataset", pageNo: ++pn });
  L.codeBlock(s, pres, { x: M, y: 2.0, w: 7.1, h: 4.4, size: 13.5, lines: [
    { t: "df.shape              # (891, 8)  rows, columns" },
    { t: "df.head(10)           # eyeball real values" },
    { t: "df.info()             # dtypes + missing per column" },
    { t: "df.describe()         # numeric summary" },
    { t: "df[\"sex\"].value_counts()        # category sanity" },
    { t: "df[\"embarked\"].value_counts(dropna=False)" },
  ]});
  L.outputBlock(s, pres, { x: M, y: 4.25, w: 7.1, h: 1.9, lines: [
    "df[\"embarked\"].value_counts(dropna=False)",
    "",
    "embarked",
    { t: "S      644", b: true },
    "C      168",
    "Q       77",
    { t: "NaN      2   <- count the missing too!", c: "B45309" },
  ]});
  L.bullets(s, [
    { t: "What you're hunting:", b: true },
    "missing values & their pattern",
    "impossible values (negative age?)",
    "weird categories / typos",
    "surprising ranges (fare = 0?)",
    { t: "Run all five on EVERY dataset you ever meet. No exceptions.", b: true, c: C.PRIMARY_DARK },
  ], { x: 8.1, y: 2.2, w: W - 8.1 - M, h: 4.0, size: 14.5, gap: 10 });
}

// 8 · info output
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "EDA step 1", title: "df.info() — read it like a detective", pageNo: ++pn });
  L.outputBlock(s, pres, { x: M, y: 2.0, w: 6.4, h: 4.4, size: 12.5, lines: [
    "<class 'pandas.core.frame.DataFrame'>",
    "RangeIndex: 891 entries, 0 to 890",
    "Data columns (total 8 columns):",
    " #   Column    Non-Null  Dtype",
    "---  ------    --------  -----",
    " 0   survived  891       int64",
    " 1   pclass    891       int64",
    " 2   sex       891       object",
    { t: " 3   age       714  <<<   float64", c: "B45309", b: true },
    " 4   sibsp     891       int64",
    " 5   parch     891       int64",
    " 6   fare      891       float64",
    { t: " 7   embarked  889  <<<   object", c: "B45309", b: true },
  ]});
  L.bullets(s, [
    { t: "age: 714 / 891 → 177 missing (19.9%)", b: true, c: "B45309" },
    "embarked: 2 missing — tiny, easy",
    { t: "Questions to ask next:", b: true },
    "Which passengers lack age? Random — or 3rd class? (missingness can be a signal)",
    "How will we fill them? → coming in 4 slides",
  ], { x: 7.4, y: 2.2, w: W - 7.4 - M, h: 3.8, size: 14.5, gap: 11 });
}

// 9 · describe
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "EDA step 1", title: "df.describe() — sanity check in numbers", pageNo: ++pn });
  L.compTable(s, pres, {
    x: M, y: 2.05, w: 6.8, colW: [1.5, 1.3, 1.3, 1.3, 1.4], fontSize: 12, rowH: 0.42,
    rows: [
      ["", "age", "fare", "sibsp", "parch"],
      ["min", { t: "0.42", c: "B45309" }, { t: "0.00", c: "B45309" }, "0", "0"],
      ["50%", "28.0", "14.45", "0", "0"],
      ["max", "80.0", "512.33", "8", "6"],
      ["mean", "29.7", "32.20", "0.52", "0.38"],
    ],
  });
  L.bullets(s, [
    { t: "age min 0.42 → infants on board. Real, keep.", b: true },
    { t: "fare min 0.00 → crew / complimentary tickets?", b: true },
    "investigate: df[df.fare == 0] — 15 rows",
    { t: "fare max 512 vs median 14.45 → wildly skewed", b: true },
    "the mean (32.2) lies; use the median",
    { t: "max is never “wrong” until you check — outliers are suspects, not criminals", c: C.PRIMARY_DARK, b: true },
  ], { x: 7.6, y: 2.15, w: W - 7.6 - M, h: 3.9, size: 14, gap: 10 });
}

// 10 · target first
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "EDA step 2 · target", title: "Always start EDA with the target", pageNo: ++pn });
  s.addChart(pres.charts.BAR, [{ name: "passengers", labels: ["died (0)", "survived (1)"], values: [549, 342] }], {
    x: M, y: 2.1, w: 5.6, h: 4.2, barDir: "col",
    chartColors: [C.MUTED, C.PRIMARY], varyColors: true,
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.TEXT,
    catAxisLabelColor: C.MUTED, valAxisLabelColor: C.MUTED,
    valGridLine: { color: "E2E8F0", size: 0.5 }, catGridLine: { style: "none" },
    showLegend: false, chartArea: { fill: { color: "FFFFFF" } },
  });
  L.bullets(s, [
    { t: "38.4% survived — the base rate", b: true },
    "A model that always says “died” scores 61.6% accuracy",
    { t: "That's your DummyClassifier — the number to beat (S04)", b: true, c: "92400E" },
    "This is also where you spot class imbalance",
    "Here 62/38 is mild; fraud detection can be 99.4/0.6 (!)",
  ], { x: 7.0, y: 2.35, w: W - 7.0 - M, h: 3.6, size: 15.5, gap: 12 });
}

// 11 · sex
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "EDA step 3 · groups", title: "“Women and children first” — is it in the data?", pageNo: ++pn });
  s.addChart(pres.charts.BAR, [{ name: "survival rate", labels: ["female", "male"], values: [74.2, 18.9] }], {
    x: M, y: 2.1, w: 5.6, h: 4.2, barDir: "col",
    chartColors: [C.PRIMARY, C.MUTED], varyColors: true,
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.TEXT,
    catAxisLabelColor: C.MUTED, valAxisLabelColor: C.MUTED, valAxisMaxVal: 100,
    valGridLine: { color: "E2E8F0", size: 0.5 }, catGridLine: { style: "none" },
    showLegend: false, chartArea: { fill: { color: "FFFFFF" } },
  });
  L.codeBlock(s, pres, { x: 7.0, y: 2.15, w: W - 7.0 - M, h: 1.15, size: 12.5, lines: [
    { t: "df.groupby(\"sex\")[\"survived\"].mean()" },
  ]});
  L.bullets(s, [
    { t: "74% vs 19% — sex alone is a powerful feature", b: true },
    "groupby().mean() is the workhorse of EDA",
    "You just did “hypothesis-driven EDA”: history said X, data confirms/refutes",
  ], { x: 7.0, y: 3.6, w: W - 7.0 - M, h: 2.6, size: 15, gap: 11 });
}

// 12 · pclass
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "EDA step 3 · groups", title: "Money bought lifeboats", pageNo: ++pn });
  s.addChart(pres.charts.BAR, [{ name: "survival rate", labels: ["1st class", "2nd class", "3rd class"], values: [63.0, 47.3, 24.2] }], {
    x: M, y: 2.1, w: 5.6, h: 4.2, barDir: "col",
    chartColors: [C.PRIMARY, "14B8A6", C.MUTED], varyColors: true,
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.TEXT,
    catAxisLabelColor: C.MUTED, valAxisLabelColor: C.MUTED, valAxisMaxVal: 80,
    valGridLine: { color: "E2E8F0", size: 0.5 }, catGridLine: { style: "none" },
    showLegend: false, chartArea: { fill: { color: "FFFFFF" } },
  });
  L.bullets(s, [
    { t: "1st class: 63% · 3rd class: 24%", b: true },
    "pclass is ordinal — 1 > 2 > 3 in privilege",
    "and it correlates with fare…",
    { t: "Question for the lab: female + 3rd class — which effect wins?", c: "92400E", b: true },
    "Hint: df.pivot_table(index=\"pclass\", columns=\"sex\", values=\"survived\")",
  ], { x: 7.0, y: 2.35, w: W - 7.0 - M, h: 3.6, size: 15, gap: 12 });
}

// 13 · distributions
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "EDA step 4 · distributions", title: "Know your shapes: age vs fare", pageNo: ++pn });
  s.addChart(pres.charts.BAR, [{ name: "passengers", labels: ["0-10", "10-20", "20-30", "30-40", "40-50", "50-60", "60-70", "70-80"], values: [64, 115, 230, 155, 86, 42, 17, 5] }], {
    x: M, y: 2.25, w: 5.7, h: 3.7, barDir: "col", chartColors: [C.PRIMARY],
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.MUTED, dataLabelFontSize: 9,
    catAxisLabelColor: C.MUTED, valAxisLabelColor: C.MUTED,
    valGridLine: { color: "E2E8F0", size: 0.5 }, catGridLine: { style: "none" },
    showLegend: false, chartArea: { fill: { color: "FFFFFF" } }, showTitle: true, title: "age — roughly bell-ish, skew right", titleColor: C.TEXT, titleFontSize: 13,
  });
  s.addChart(pres.charts.BAR, [{ name: "passengers", labels: ["0-10", "10-25", "25-50", "50-100", "100-200", "200-300", "300+"], values: [336, 221, 174, 107, 33, 17, 3] }], {
    x: 6.9, y: 2.25, w: 5.7, h: 3.7, barDir: "col", chartColors: [C.ACCENT],
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.MUTED, dataLabelFontSize: 9,
    catAxisLabelColor: C.MUTED, valAxisLabelColor: C.MUTED,
    valGridLine: { color: "E2E8F0", size: 0.5 }, catGridLine: { style: "none" },
    showLegend: false, chartArea: { fill: { color: "FFFFFF" } }, showTitle: true, title: "fare (£) — extreme right skew (skew = 4.8)", titleColor: C.TEXT, titleFontSize: 13,
  });
  s.addText("Skewed columns → prefer MEDIAN over mean, and consider a log transform in S03. Distribution shape decides your tools.",
    { x: M, y: 6.15, w: W - 2 * M, h: 0.45, fontSize: 14, fontFace: FONT, color: C.MUTED, margin: 0 });
}

// 14 · correlation
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "EDA step 5 · relationships", title: "Correlation — a quick map, not the territory", pageNo: ++pn });
  L.compTable(s, pres, {
    x: M, y: 2.1, w: 6.2, colW: [2.2, 1.7], fontSize: 13, rowH: 0.46,
    rows: [
      ["feature", "corr with survived"],
      [{ t: "pclass", b: true }, { t: "−0.34", c: C.PRIMARY_DARK, b: true }],
      ["fare", { t: "+0.26", c: C.PRIMARY_DARK }],
      ["age", "−0.08"],
      ["sibsp", "−0.04"],
      ["parch", "+0.08"],
    ],
  });
  s.addText("sns.heatmap(df.corr(numeric_only=True), annot=True)", { x: M, y: 5.15, w: 6.2, h: 0.35, fontSize: 12, fontFace: MONO, color: C.MUTED, margin: 0 });
  L.bullets(s, [
    { t: "pclass −0.34: higher class (1) → survived more", b: true },
    { t: "but sex (74% vs 19%) barely shows up here!", b: true, c: "B45309" },
    "correlation only sees LINEAR numeric relations",
    "sex is categorical — compare group means instead",
    { t: "corr is a metal detector: it finds where to dig, not what's buried", c: C.PRIMARY_DARK, b: true },
  ], { x: 7.2, y: 2.25, w: W - 7.2 - M, h: 3.8, size: 14.5, gap: 11 });
}

// 15 · missing mechanisms
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Missing data", title: "Not all missing is equal", pageNo: ++pn });
  const y = 2.05, h = 3.1, w = (W - 2 * M - 0.8) / 3;
  L.card(s, pres, { x: M, y, w, h, title: "Missing completely\nat random", body: "Typos, sensor glitch — no pattern.\nSafe to impute simply.", bodySize: 13.5 });
  L.card(s, pres, { x: M + w + 0.4, y, w, h, title: "Missing with a reason", body: "3rd-class records were sloppier → age missing correlates with pclass. The GAP ITSELF is information.", bodySize: 13.5, tint: C.ACCENT_TINT, titleColor: "92400E" });
  L.card(s, pres, { x: M + 2 * (w + 0.4), y, w, h, title: "Missing by design", body: "deck is NaN for 77% — mostly 3rd class (no cabin assigned). This is a story about wealth, not lost data.", bodySize: 13.5 });
  s.addText("Practical rule: plot missingness against the target & features (sns.heatmap of isna()). If it relates → make “was_missing” a feature.",
    { x: M, y: 5.5, w: W - 2 * M, h: 0.6, fontSize: 15, fontFace: FONT, bold: true, color: C.PRIMARY_DARK, margin: 0 });
}

// 16 · what not to do
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Missing data", title: "Two lazy fixes and their price", pageNo: ++pn });
  L.codeBlock(s, pres, { x: M, y: 2.05, w: 7.3, h: 1.9, size: 13.5, lines: [
    { t: "df.dropna()          # 💥 loses 179 rows = 20% of the data" },
    { t: "df[\"age\"].fillna(0)  # 💥 0 is a baby — 177 fake infants" },
  ]});
  const w = (W - 2 * M - 0.4) / 2;
  L.card(s, pres, { x: M, y: 4.25, w, h: 2.1, title: "dropna()", body: "Simple, honest — but here it throws away 1st-class passengers' rows too, and biases your data toward whoever kept good records.", tint: "FEE2E2", titleColor: "9F1239", bodySize: 14 });
  L.card(s, pres, { x: M + w + 0.4, y: 4.25, w, h: 2.1, title: "fillna(0)", body: "Silent lie: age 0.0 = infant. Models trust your numbers. Every imputation invents data — make it a PLAUSIBLE invention.", tint: "FEE2E2", titleColor: "9F1239", bodySize: 14 });
  L.bullets(s, [
    { t: "Sometimes dropna IS right:", b: true },
    "when 2/891 rows are affected (embarked)",
    "when the whole row is junk",
  ], { x: 8.0, y: 2.2, w: W - 8.0 - M, h: 1.9, size: 14, gap: 8 });
}

// 17 · SimpleImputer
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Missing data", title: "Impute — fill with a defensible guess", pageNo: ++pn });
  L.compTable(s, pres, {
    x: M, y: 2.0, w: 7.6, colW: [2.5, 2.5, 2.6], fontSize: 13, rowH: 0.5,
    rows: [
      ["column type", "strategy", "why"],
      ["numeric, skewed", "median", "robust to outliers"],
      ["numeric, symmetric", "mean", "fine when no outliers"],
      ["categorical", "most_frequent", "the mode category"],
      ["rare & important", "constant", "fill \"Unknown\" → its own category"],
    ],
  });
  L.codeBlock(s, pres, { x: M, y: 5.0, w: 7.6, h: 1.6, size: 12.5, lines: [
    { t: "from sklearn.impute import SimpleImputer" },
    { t: "imp = SimpleImputer(strategy=\"median\")" },
    { t: "df[[\"age\", \"fare\"]] = imp.fit_transform(df[[\"age\", \"fare\"]])" },
    { t: "# (in S03 we'll do this INSIDE a Pipeline — no leakage)" },
  ]});
  L.bullets(s, [
    { t: "Why not pandas fillna?", b: true },
    "fillna is fine for quick EDA…",
    { t: "but sklearn's imputer remembers the training median and applies it to future data — reproducible, leak-safe", b: true, c: C.PRIMARY_DARK },
  ], { x: 8.3, y: 2.2, w: W - 8.3 - M, h: 3.4, size: 13.5, gap: 10 });
}

// 18 · duplicates
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Duplicates", title: "111 identical rows — innocent or dangerous?", pageNo: ++pn });
  L.codeBlock(s, pres, { x: M, y: 2.0, w: 7.4, h: 1.8, size: 13.5, lines: [
    { t: "df.duplicated().sum()      # 111" },
    { t: "df[df.duplicated(keep=False)].sort_values(\"fare\").head(6)" },
  ]});
  L.bullets(s, [
    { t: "Here: plausible — many passengers share all 8 coarse values", b: true },
    "Not copied-pasted accidents",
    { t: "Danger case: duplicates across train/test split", b: true, c: "9F1239" },
    "the model gets quizzed on exact rows it studied → inflated score",
    { t: "Rule: check duplicates ALWAYS; drop when suspicious (df.drop_duplicates())", c: C.PRIMARY_DARK, b: true },
  ], { x: M, y: 4.2, w: W - 2 * M, h: 2.3, size: 15, gap: 10 });
}

// 19 · outliers IQR
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Outliers", title: "Finding outliers — the IQR fence", pageNo: ++pn });
  // IQR diagram
  const bx = M, by = 2.4, bw = 7.2, bh = 0.9;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx + bw * 0.25, y: by, w: bw * 0.5, h: bh, rectRadius: 0.06, fill: { color: C.PRIMARY }, line: { color: "FFFFFF", width: 0 } });
  s.addShape(pres.shapes.LINE, { x: bx + bw * 0.75, y: by + 0.1, w: bw * 0.125, h: 0, line: { color: C.MUTED, width: 2 } });
  s.addShape(pres.shapes.LINE, { x: bx + bw * 0.125, y: by + 0.1, w: bw * 0.125, h: 0, line: { color: C.MUTED, width: 2 } });
  s.addText("Q1 = 7.91", { x: bx + bw * 0.25 - 0.5, y: by + bh + 0.05, w: 1.4, h: 0.3, fontSize: 11, fontFace: FONT, color: C.MUTED, align: "center", margin: 0 });
  s.addText("Q3 = 31.0", { x: bx + bw * 0.75 - 0.5, y: by + bh + 0.05, w: 1.4, h: 0.3, fontSize: 11, fontFace: FONT, color: C.MUTED, align: "center", margin: 0 });
  s.addText("IQR = 23.1 (the box)", { x: bx + bw * 0.5 - 1.2, y: by + 0.18, w: 2.6, h: 0.5, fontSize: 13, fontFace: FONT, bold: true, color: "FFFFFF", align: "center", margin: 0 });
  s.addShape(pres.shapes.OVAL, { x: bx + bw * 0.92, y: by + 0.25, w: 0.35, h: 0.35, fill: { color: C.ACCENT }, line: { color: "FFFFFF", width: 0 } });
  s.addShape(pres.shapes.OVAL, { x: bx + bw * 0.88, y: by + 0.27, w: 0.3, h: 0.3, fill: { color: C.ACCENT }, line: { color: "FFFFFF", width: 0 } });
  s.addShape(pres.shapes.OVAL, { x: bx + bw * 0.97, y: by + 0.22, w: 0.4, h: 0.4, fill: { color: C.ACCENT }, line: { color: "FFFFFF", width: 0 } });
  s.addText("beyond Q3 + 1.5·IQR = £66 → 116 fares", { x: bx + bw * 0.6, y: by - 0.5, w: 3.6, h: 0.35, fontSize: 11.5, fontFace: FONT, color: "92400E", margin: 0 });
  L.codeBlock(s, pres, { x: M, y: 4.05, w: 7.2, h: 2.3, size: 12.5, lines: [
    { t: "q1, q3 = df[\"fare\"].quantile([0.25, 0.75])" },
    { t: "iqr = q3 - q1" },
    { t: "fence_hi = q3 + 1.5 * iqr          # 66.06" },
    { t: "outliers = df[df[\"fare\"] > fence_hi]" },
    { t: "len(outliers)                       # 116  (age: only 11)" },
  ]});
  L.bullets(s, [
    { t: "116 “outliers” in fare?!", b: true },
    "In skewed data the fence flags the TAIL, not errors",
    { t: "Options (in order of preference):", b: true },
    "keep + use median/robust stats",
    "log-transform the column (S03)",
    "cap (winsorize) at a percentile",
    "delete only with a story why",
  ], { x: 8.1, y: 2.3, w: W - 8.1 - M, h: 4.0, size: 13.5, gap: 9 });
}

// 20 · outlier wisdom
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Outliers", title: "An outlier is a suspect, not a criminal", pageNo: ++pn });
  L.card(s, pres, { x: M, y: 2.1, w: (W - 2 * M - 0.4) / 2, h: 2.5, title: "The £512.33 ticket is REAL", body: "Three first-class passengers really paid it (the Fortunes, with their maid). Deleting them removes the signal “extreme wealth → survived”. ", bodySize: 14 });
  L.card(s, pres, { x: M + (W - 2 * M - 0.4) / 2 + 0.4, y: 2.1, w: (W - 2 * M - 0.4) / 2, h: 2.5, title: "But age = 800 would be fake", body: "A keystroke error. It stretches every mean, every scale, every distance-based model (KNN!). Fix or remove — after checking the raw record.", bodySize: 14, tint: "FEE2E2", titleColor: "9F1239" });
  s.addText("Before deleting anything: df[df.fare > 300] → look at THOSE rows. Real people? Keep. Broken record? Kill. Decide with evidence, not vibes.",
    { x: M, y: 5.0, w: W - 2 * M, h: 0.75, fontSize: 16, fontFace: FONT, bold: true, color: C.PRIMARY_DARK, margin: 0 });
}

// 21 · inconsistent categories
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Categories", title: "\"BKK\" vs \"Bangkok\" — same, different, or new?", pageNo: ++pn });
  L.outputBlock(s, pres, { x: M, y: 2.05, w: 6.6, h: 2.5, size: 12.5, lines: [
    "df[\"city\"].value_counts()",
    "",
    "Bangkok     412",
    "BKK         173   <<< same city, two spellings",
    "bangkok      42   <<< case",
    "Khonkaen    118",
    "ขอนแก่น      19   <<< Thai/English mixed",
  ]});
  L.codeBlock(s, pres, { x: M, y: 4.8, w: 6.6, h: 1.5, size: 12.5, lines: [
    { t: "city_map = {\"BKK\": \"Bangkok\", \"bangkok\": \"Bangkok\", \"ขอนแก่น\": \"Khonkaen\"}" },
    { t: "df[\"city\"] = df[\"city\"].replace(city_map)" },
  ]});
  L.bullets(s, [
    { t: "value_counts() is your weapon", b: true },
    "Run it on EVERY object column",
    "Watch for: case, whitespace (\" Bangkok\"), synonyms, typos, mixed languages",
    { t: "Left alone, one city becomes 4 “different” categories → thinner data, dumber model", c: "9F1239", b: true },
    { t: "Also: strip whitespace: df[\"city\"].str.strip()", c: C.PRIMARY_DARK },
  ], { x: 7.5, y: 2.25, w: W - 7.5 - M, h: 3.9, size: 14, gap: 10 });
}

// 22 · checklist
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Summary", title: "The cleaning checklist — run on every dataset", pageNo: ++pn });
  L.flowRow(s, pres, { x: M, y: 2.05, w: W - 2 * M, h: 1.5, steps: [
    { t: "shape & head", d: "know what a row IS" },
    { t: "info()", d: "dtypes + missing" },
    { t: "describe()", d: "sanity ranges" },
    { t: "target EDA", d: "base rate + imbalance" },
  ]});
  L.flowRow(s, pres, { x: M, y: 3.75, w: W - 2 * M, h: 1.5, steps: [
    { t: "value_counts()", d: "category sanity" },
    { t: "impute", d: "median / mode / Unknown" },
    { t: "duplicates", d: "check → decide" },
    { t: "outliers", d: "investigate → decide" },
  ]});
  s.addText("Print it, tape it to your monitor. This exact list is Lab 02 — and Session 08's project.",
    { x: M, y: 5.6, w: W - 2 * M, h: 0.45, fontSize: 15, fontFace: FONT, bold: true, color: C.PRIMARY_DARK, margin: 0 });
}

// 23 · teaser
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Next session", title: "Clean ≠ model-ready", pageNo: ++pn });
  s.addText("sex is still the word “female”. fare spans £0–£512. Models eat NUMBERS on comparable scales.",
    { x: M, y: 2.0, w: W - 2 * M, h: 0.7, fontSize: 18, fontFace: FONT, color: C.TEXT, margin: 0 });
  const y = 3.0, h = 2.4, w = (W - 2 * M - 0.8) / 3;
  L.card(s, pres, { x: M, y, w, h, title: "Encode", body: "female/male → 1/0 or one-hot columns. embarked S/C/Q → 3 columns.", bodySize: 14 });
  L.card(s, pres, { x: M + w + 0.4, y, w, h, title: "Scale", body: "age 0–80 and fare 0–512 → comparable ranges. KNN & friends will thank you.", bodySize: 14 });
  L.card(s, pres, { x: M + 2 * (w + 0.4), y, w, h, title: "Engineer", body: "family = sibsp + parch + 1 · fare_log · child = age < 12", bodySize: 14 });
  s.addText("Session 03 — and the single most important sklearn idea: Pipelines (no leakage, ever).",
    { x: M, y: 5.85, w: W - 2 * M, h: 0.5, fontSize: 15.5, fontFace: FONT, bold: true, color: "92400E", margin: 0 });
}

// 24 · Lab
L.labSlide(pres, {
  sessionTag: TAG, pageNo: ++pn, num: "02",
  title: "ทำความรู้จักกับ Titanic — Clean it like a pro",
  goal: "Run the full EDA + cleaning checklist on the Titanic dataset and justify every decision you make.",
  tasks: [
    "โหลด titanic จาก seaborn แล้วตรวจ shape / head / info / describe",
    "หา column ที่มี missing — เขียนว่าจะ impute ด้วยอะไร เพราะอะไร",
    "สำรวจ target: อัตรารอดชีวิตรวม แยกตาม sex และ pclass",
    "ตรวจ duplicates และ outliers ของ fare (IQR) แล้วตัดสินใจว่าจะทำอะไร",
    "โจทย์ชวนคิด: ผู้หญิงชั้น 3 กับผู้ชายชั้น 1 ใครรอดมากกว่ากัน? (pivot_table)",
  ],
  vibe: "ลองถาม AI: “ช่วยเขียนโค้ดสำรวจ missingness — วาด heatmap ของ df.isna() และเทียบอัตรา missing ของ age แยกตาม pclass” แล้วตีความผลเองว่า missing เป็นแบบสุ่มหรือมีรูปแบบ",
});

// 25 · Takeaways
L.takeaways(pres, {
  sessionTag: TAG, pageNo: ++pn,
  items: [
    "EDA first, models later: head / info / describe / value_counts on every dataset.",
    "Start with the target — 38.4% survived is the baseline your model must beat.",
    "Impute deliberately: median for skewed numbers, mode for categories, never blanket dropna().",
    "Duplicates can quietly inflate your score; outliers are suspects — investigate before deleting.",
    "Clean data ≠ ready data: encoding & scaling come next, inside Pipelines.",
  ],
  nextTag: "Session 03", nextTitle: "Feature Engineering & Pipelines — numbers in, no leakage",
});

L.save(pres, "D:/Repositories/AI_course_MasterDegree/slides/02 Data Understanding and Cleaning.pptx").then(() => console.log("02 done"));
