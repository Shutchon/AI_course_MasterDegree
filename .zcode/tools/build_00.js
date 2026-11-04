// Deck 00 — Course Overview
const L = require("./deck_lib");
const { C, FONT, MONO, W, H, M } = L;

const TAG = "SESSION 00";
const pres = L.deckInit("00 Course Overview — Machine Learning with scikit-learn");
let pn = 1;

// 1 · Title
L.titleSlide(pres, {
  num: "00",
  title: "Machine Learning\nwith scikit-learn",
  subtitle: "Course overview — what you will learn, how the course works, and how to use AI assistants well.",
});
pn++;

// 2 · Agenda
L.agendaSlide(pres, {
  sessionTag: TAG, pageNo: ++pn,
  items: [
    { t: "What this course is about", d: "From data to a working model — the practical path" },
    { t: "Who this course is for", d: "Prerequisites and mindset" },
    { t: "Course roadmap", d: "8 sessions, 8 labs, 1 final project" },
    { t: "How each session works", d: "Slides → demo → lab in Colab" },
    { t: "Your toolkit", d: "Google Colab · scikit-learn · pandas · seaborn" },
    { t: "Vibe coding policy", d: "Using AI assistants without fooling yourself" },
  ],
});

// 3 · What this course is about
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "The big picture", title: "What this course is about", pageNo: ++pn });
  s.addText(
    "You will learn to turn raw data into models that predict something useful — and to prove they actually work.",
    { x: M, y: 1.95, w: W - 2 * M, h: 0.85, fontSize: 20, fontFace: FONT, color: C.TEXT, margin: 0 }
  );
  L.bigStat(s, { x: M + 0.3, y: 3.1, w: 3.2, value: "8", label: "hands-on sessions\nslides + Colab lab every time", size: 72 });
  L.bigStat(s, { x: M + 4.3, y: 3.1, w: 3.2, value: "10+", label: "models you can use\nand explain the next day", size: 72, color: C.PRIMARY_DARK });
  L.bigStat(s, { x: M + 8.3, y: 3.1, w: 3.2, value: "1", label: "end-to-end capstone\nchurn prediction project", size: 72, color: C.ACCENT });
}

// 4 · Who this course is for
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Prerequisites", title: "Who this course is for", pageNo: ++pn });
  const y = 2.0, h = 2.25, w = (W - 2 * M - 0.6) / 3;
  L.card(s, pres, { x: M, y, w, h, title: "You already have", body: "Some Python — variables, loops, functions, maybe pandas. You can read code and modify it.", tint: C.PRIMARY_FAINT });
  L.card(s, pres, { x: M + w + 0.3, y, w, h, title: "You do NOT need", body: "A math degree. We keep equations light: intuition first, formulas only when they earn their place.", tint: C.PANEL, titleColor: C.TEXT });
  L.card(s, pres, { x: M + 2 * (w + 0.3), y, w, h, title: "You will gain", body: "A working ML workflow: clean data, build pipelines, pick models, evaluate honestly, tune, ship.", tint: C.ACCENT_TINT, titleColor: "92400E" });
  s.addText("Mindset: run everything yourself. In this course, the lab notebook matters more than the slides.",
    { x: M, y: 4.75, w: W - 2 * M, h: 0.6, fontSize: 16, fontFace: FONT, italic: true, color: C.MUTED, margin: 0 });
}

// 5 · Roadmap
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Roadmap", title: "8 sessions — fundamentals to project", pageNo: ++pn });
  L.flowRow(s, pres, { x: M, y: 2.0, w: W - 2 * M, h: 1.5, steps: [
    { t: "01 · Intro to ML", d: "first model in 5 lines" },
    { t: "02 · Data cleaning", d: "understand & tidy data" },
    { t: "03 · Pipelines", d: "features & leakage" },
    { t: "04 · Evaluation", d: "train/test + CV + metrics" },
  ]});
  L.flowRow(s, pres, { x: M, y: 3.85, w: W - 2 * M, h: 1.5, steps: [
    { t: "05 · Regression", d: "Linear → trees" },
    { t: "06 · Classification", d: "+ ensembles" },
    { t: "07 · Unsupervised", d: "clustering, PCA + tuning" },
    { t: "08 · Capstone", d: "churn project" },
  ]});
  s.addText("Sessions 1–4: the foundations every model needs.   Sessions 5–8: model families, then a full project.",
    { x: M, y: 5.75, w: W - 2 * M, h: 0.5, fontSize: 15, fontFace: FONT, color: C.MUTED, margin: 0 });
}

// 6 · How each session works
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Rhythm", title: "How each session works", pageNo: ++pn });
  L.pipelineDiagram(s, pres, { x: M, y: 2.05, w: W - 2 * M, stages: [
    { t: "Slides (~60 min)", d: "concepts in English" },
    { t: "Demo notebook", d: "run along, same code as slides" },
    { t: "Lab notebook (~60 min)", d: "โจทย์ภาษาไทย in Colab" },
    { t: "Solution", d: "unlocked after the lab" },
  ]});
  L.card(s, pres, { x: M, y: 3.6, w: (W - 2 * M - 0.3) / 2, h: 2.3,
    title: "Every file lives in one repository",
    body: "slides/ (PDF + PPTX)  ·  demos/ (run-along notebooks)  ·  excercises/ (Thai labs)  ·  excercises/solutions/ (worked answers). Open any notebook in Colab with one click — no installs, no downloads.", bodySize: 14 });
  L.card(s, pres, { x: M + (W - 2 * M - 0.3) / 2 + 0.3, y: 3.6, w: (W - 2 * M - 0.3) / 2, h: 2.3,
    title: "Assessment",
    body: "Labs 40% (complete + honest attempts) · Final project 40% (working pipeline + honest evaluation + short presentation) · Participation 20% (demo follow-along, questions).", bodySize: 14, tint: C.PANEL, titleColor: C.TEXT });
}

// 7 · Toolkit
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Toolkit", title: "Your toolkit — already installed in Colab", pageNo: ++pn });
  const y = 2.0, h = 1.95, w = (W - 2 * M - 0.9) / 4;
  L.card(s, pres, { x: M, y, w, h, title: "Google Colab", body: "Free Jupyter in the browser. GPU not needed for this course. Your work saves to Google Drive.", bodySize: 12.5 });
  L.card(s, pres, { x: M + (w + 0.3), y, w, h, title: "scikit-learn", body: "The ML library. One consistent API: fit() → predict(). Classification, regression, clustering, preprocessing, tuning.", bodySize: 12.5 });
  L.card(s, pres, { x: M + 2 * (w + 0.3), y, w, h, title: "pandas", body: "Tables (DataFrames): load, inspect, clean, transform data. The first tool you touch in every project.", bodySize: 12.5 });
  L.card(s, pres, { x: M + 3 * (w + 0.3), y, w, h, title: "seaborn + matplotlib", body: "Plots: distributions, correlations, decision boundaries. Seeing your data comes before modeling it.", bodySize: 12.5 });
  L.codeBlock(s, pres, { x: M, y: 4.35, w: W - 2 * M, h: 1.9, size: 15, lines: [
    { t: "# Everything above is pre-installed in Colab. Just import and go:" },
    { t: "import pandas as pd                  # tables" },
    { t: "import seaborn as sns                # plots" },
    { t: "from sklearn.model_selection import train_test_split   # the ML library" },
  ]});
}

// 8 · Colab tour (schematic)
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Colab in 60 seconds", title: "Google Colab — your lab bench", pageNo: ++pn });
  // schematic: notebook UI
  const bx = M, by = 2.0, bw = 7.4, bh = 4.4;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx, y: by, w: bw, h: bh, rectRadius: 0.1, fill: { color: "FFFFFF" }, line: { color: "CBD5E1", width: 1.25 } });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx + 0.25, y: by + 0.25, w: bw - 0.5, h: 0.5, rectRadius: 0.05, fill: { color: C.PANEL }, line: { color: "FFFFFF", width: 0 } });
  s.addText("＋ Code  |  ＋ Text  |  ▶ Run all  |  Runtime", { x: bx + 0.45, y: by + 0.3, w: bw - 0.9, h: 0.4, fontSize: 12, fontFace: FONT, color: C.MUTED, valign: "middle", margin: 0 });
  // code cell
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx + 0.25, y: by + 1.0, w: bw - 0.5, h: 0.75, rectRadius: 0.05, fill: { color: C.CODE_BG }, line: { color: C.CODE_BG, width: 0 } });
  s.addText("▶", { x: bx + 0.35, y: by + 1.18, w: 0.4, h: 0.4, fontSize: 14, fontFace: FONT, color: C.PRIMARY, margin: 0 });
  s.addText("print(\"hello ML\")", { x: bx + 0.85, y: by + 1.1, w: bw - 1.2, h: 0.55, fontSize: 13, fontFace: MONO, color: C.CODE, valign: "middle", margin: 0 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx + 0.25, y: by + 1.85, w: bw - 0.5, h: 0.55, rectRadius: 0.05, fill: { color: C.PANEL }, line: { color: "E2E8F0", width: 1 } });
  s.addText("hello ML", { x: bx + 0.45, y: by + 1.9, w: bw - 0.9, h: 0.45, fontSize: 12.5, fontFace: MONO, color: C.MUTED, valign: "middle", margin: 0 });
  // text cell
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx + 0.25, y: by + 2.6, w: bw - 0.5, h: 0.7, rectRadius: 0.05, fill: { color: "FFFFFF" }, line: { color: "CBD5E1", width: 1 } });
  s.addText("## Markdown cell — notes, questions, สรุปเป็นภาษาไทยได้", { x: bx + 0.45, y: by + 2.68, w: bw - 0.9, h: 0.55, fontSize: 12.5, fontFace: FONT, color: C.TEXT, valign: "middle", margin: 0 });
  s.addText("Cells run top→bottom. State (variables) lives between cells — Restart runtime wipes it.",
    { x: bx + 0.25, y: by + 3.55, w: bw - 0.5, h: 0.7, fontSize: 12.5, fontFace: FONT, italic: true, color: C.MUTED, margin: 0 });
  // right: 4 quick tips
  L.bullets(s, [
    { t: "Shift + Enter runs the current cell", b: true },
    "Everything is in the cloud — nothing to install",
    "File → Save a copy in Drive keeps your work",
    "Runtime → Run all = “fresh run” sanity check",
    { t: "Number on a cell = the order it ran", sub: true },
  ], { x: 8.5, y: 2.15, w: W - 8.5 - M, h: 4.2, size: 15, gap: 12 });
}

// 9 · Python/pandas refresher
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Refresher", title: "The 20% of pandas you'll use 80% of the time", pageNo: ++pn });
  L.codeBlock(s, pres, { x: M, y: 1.95, w: 7.6, h: 4.45, size: 13, lines: [
    { t: "df = pd.read_csv(\"titanic.csv\")        # load a table" },
    { t: "df.head()                              # first 5 rows" },
    { t: "df.info()                              # columns, types, missing" },
    { t: "df.describe()                          # quick statistics" },
    { t: "df[\"age\"]                              # one column (Series)" },
    { t: "df[[\"age\", \"fare\"]]                     # two columns" },
    { t: "df[df[\"age\"] > 30]                     # filter rows" },
    { t: "df.groupby(\"sex\")[\"survived\"].mean()    # group + aggregate" },
    { t: "df[\"fare\"].fillna(df[\"fare\"].median())  # fill missing" },
    { t: "df[\"fare\"].isna().sum()                # count missing" },
    { t: "df.sort_values(\"fare\").tail(3)         # biggest fares" },
    { t: "df[\"sex\"].value_counts(normalize=True) # category shares" },
  ]});
  L.bullets(s, [
    { t: "A DataFrame is a table", b: true },
    "columns = Series (one type each)",
    "rows = samples / records",
    { t: "In ML language:", b: true },
    { t: "feature columns → X (the inputs)", sub: true },
    { t: "target column → y (what we predict)", sub: true },
    { t: "Lab 01 starts from here — if these feel rusty, redo this in the demo notebook.", c: C.PRIMARY_DARK, b: true },
  ], { x: 8.5, y: 2.1, w: W - 8.5 - M, h: 4.2, size: 14.5, gap: 9 });
}

// 10 · Vibe coding policy
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Policy", title: "Vibe coding — welcome, with guardrails", pageNo: ++pn });
  s.addText("You may use AI assistants (Colab AI, ChatGPT, Copilot…) everywhere in this course — labs included. ML is where they shine and where they lie.",
    { x: M, y: 1.9, w: W - 2 * M, h: 0.7, fontSize: 16.5, fontFace: FONT, color: C.TEXT, margin: 0 });
  const y = 2.85, w = (W - 2 * M - 0.4) / 2;
  L.card(s, pres, { x: M, y, w, h: 3.0, title: "✓ Great uses", tint: C.PRIMARY_FAINT, body: "• Explain an error message\n• “write me EDA code for this column”\n• Boilerplate: train_test_split, plots\n• “explain this metric like I'm five”\n• Debug your pipeline step by step", bodySize: 14 });
  L.card(s, pres, { x: M + w + 0.4, y, w, h: 3.0, title: "✗ Where they fail you", tint: "FEE2E2", titleColor: "9F1239", body: "• Invent plausible-but-wrong APIs\n• Silently evaluate on the test set\n• “improve” accuracy by leaking data\n• Confident nonsense about metrics\n• Code you can't explain = not yours", bodySize: 14 });
  s.addText("Rule of the course: you must be able to explain every line you submit. If you can't, ask the AI to explain it — then you own it.",
    { x: M, y: 6.1, w: W - 2 * M, h: 0.6, fontSize: 15, fontFace: FONT, bold: true, color: C.PRIMARY_DARK, margin: 0 });
}

// 11 · Logistics / grading chart
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Logistics", title: "How you'll be graded", pageNo: ++pn });
  s.addChart(pres.charts.DOUGHNUT, [{ name: "Grade", labels: ["Labs", "Final project", "Participation"], values: [40, 40, 20] }], {
    x: M, y: 2.0, w: 4.2, h: 4.3,
    chartColors: [C.PRIMARY, C.ACCENT, C.PRIMARY_DARK],
    showPercent: true, holeSize: 60, showLegend: true, legendPos: "b",
    chartArea: { fill: { color: "FFFFFF" } },
  });
  L.bullets(s, [
    { t: "Labs (40%) — 8 Thai-language labs in Colab", b: true },
    { t: "graded on completion + honest attempts, not on max score", sub: true },
    { t: "Final project (40%) — churn prediction capstone", b: true },
    { t: "clean pipeline, honest evaluation, 5-minute presentation", sub: true },
    { t: "Participation (20%)", b: true },
    { t: "running demos along with me, asking questions", sub: true },
  ], { x: 5.6, y: 2.3, w: W - 5.6 - M, h: 3.8, size: 16, gap: 11 });
}

// 12 · Takeaways + next
L.takeaways(pres, {
  sessionTag: TAG, pageNo: ++pn,
  items: [
    "8 sessions: fundamentals (1–4) → model families (5–7) → capstone project (8).",
    "Every session: English slides → run-along demo → Thai lab in Colab.",
    "Toolkit (Colab, sklearn, pandas, seaborn) is pre-installed — zero setup.",
    "AI assistants are allowed everywhere — but you must be able to explain every line you submit.",
  ],
  nextTag: "Session 01", nextTitle: "Introduction to Machine Learning — your first model in 5 lines",
});

L.save(pres, "D:/Repositories/AI_course_MasterDegree/slides/00 Course Overview.pptx").then(() => console.log("00 done"));
