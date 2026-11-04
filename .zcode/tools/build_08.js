// Deck 08 — Final Project: Customer Churn Prediction
const L = require("./deck_lib");
const { C, FONT, MONO, W, H, M } = L;

const TAG = "SESSION 08";
const pres = L.deckInit("08 Final Project — Customer Churn Prediction");
let pn = 1;

// 1 · Title
L.titleSlide(pres, {
  num: "08",
  title: "Final Project:\nCustomer Churn Prediction",
  subtitle: "One real business problem, every skill from the course — EDA to pipeline to honest evaluation to a 5-minute story.",
});
pn++;

// 2 · Agenda
L.agendaSlide(pres, {
  sessionTag: TAG, pageNo: ++pn,
  items: [
    { t: "The business problem", d: "why churn is money" },
    { t: "The dataset", d: "Telco: 7,043 customers, 19 columns" },
    { t: "The 8 project steps", d: "= the whole course, in order" },
    { t: "Real results to beat", d: "baseline & model benchmarks" },
    { t: "Error analysis & insight", d: "what drives churn" },
    { t: "Presenting an ML project", d: "the 5-minute structure" },
    { t: "Rubric & deliverables", d: "exactly how you're graded" },
    { t: "After this course", d: "XGBoost · deep learning · MLOps" },
  ],
});

// 3 · business
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "The problem", title: "Churn: keeping a customer is 5–25× cheaper than finding one", pageNo: ++pn });
  const w = (W - 2 * M - 0.8) / 3, y = 2.1, h = 2.9;
  L.card(s, pres, { x: M, y, w, h, title: "The question", body: "Which customers will leave us next month?\n\n— before they leave, while a discount or a phone call can still save them.", bodySize: 14 });
  L.card(s, pres, { x: M + w + 0.4, y, w, h, title: "The data", body: "7,043 telecom customers\n19 columns: contract, services, tenure, charges\nTarget: Churn (Yes/No) — 26.5% positive", bodySize: 14 });
  L.card(s, pres, { x: M + 2 * (w + 0.4), y, w, h, title: "The real deliverable", body: "Not a model.\n\nA ranked list of at-risk customers + the story of WHY — that a retention team can act on Monday.", bodySize: 14, tint: C.ACCENT_TINT, titleColor: "92400E" });
  s.addText("This is supervised classification — you now own every tool for it.",
    { x: M, y: 5.4, w: W - 2 * M, h: 0.5, fontSize: 16.5, fontFace: FONT, bold: true, color: C.PRIMARY_DARK, margin: 0 });
}

// 4 · dataset card
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Dataset", title: "Telco churn — 7,043 × 19", pageNo: ++pn });
  L.compTable(s, pres, {
    x: M, y: 2.0, w: 7.5, colW: [2.6, 4.9], fontSize: 12.5, rowH: 0.48,
    rows: [
      ["column group", "columns"],
      ["target", { t: "Churn (Yes/No) — 26.5% Yes", c: "92400E" }],
      ["account", "tenure (months), Contract, PaperlessBilling, PaymentMethod"],
      ["services (0/1)", "PhoneService, MultipleLines, OnlineSecurity, …StreamingMovies"],
      ["internet", "InternetService: DSL / Fiber optic / No"],
      ["charges", "MonthlyCharges ($), TotalCharges ($) — ⚠ dtype trap"],
      ["id", "customerID — drop it (memorization risk)"],
    ],
  });
  L.codeBlock(s, pres, { x: M, y: 5.6, w: 7.5, h: 1.4, size: 11.5, lines: [
    { t: "url = \"https://raw.githubusercontent.com/IBM/" },
    { t: "        telco-customer-churn-on-icp4d/master/data/Telco-Customer-Churn.csv\"" },
    { t: "df = pd.read_csv(url)" },
    { t: "df[\"TotalCharges\"] = pd.to_numeric(df[\"TotalCharges\"], errors=\"coerce\")  # 11 blanks → NaN" },
  ]});
  L.bullets(s, [
    { t: "⚠ TotalCharges trap", b: true, c: "9F1239" },
    "stored as text — 11 cells are \" \"",
    "to_numeric(errors=\"coerce\") → NaN → imputer handles it (S02+S03!)",
    { t: "26.5% positive = mildly imbalanced", b: true },
    "accuracy will lie a bit → AUC + recall (S04)",
  ], { x: 8.3, y: 2.2, w: W - 8.3 - M, h: 4.4, size: 13.5, gap: 10 });
}

// 5 · EDA highlights
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Step 1 · EDA", title: "What the data already screams", pageNo: ++pn });
  s.addChart(pres.charts.BAR, [{ name: "churn rate", labels: ["Month-to-month", "One year", "Two year"], values: [42.7, 11.3, 2.8] }], {
    x: M, y: 2.15, w: 5.8, h: 3.9, barDir: "col",
    chartColors: ["E11D48", "F59E0B", "0D9488"], varyColors: true,
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.TEXT,
    catAxisLabelColor: C.MUTED, valAxisLabelColor: C.MUTED, valAxisMaxVal: 50,
    valGridLine: { color: "E2E8F0", size: 0.5 }, catGridLine: { style: "none" },
    showLegend: false, chartArea: { fill: { color: "FFFFFF" } },
    showTitle: true, title: "churn rate by contract type (%)", titleColor: C.TEXT, titleFontSize: 13,
  });
  L.bullets(s, [
    { t: "Contract is destiny: 43% vs 3%", b: true },
    { t: "Fiber customers churn 41.9%", b: true },
    "vs DSL 19.0%, no internet 7.4% — pricey+flaky?",
    { t: "Churners: tenure 18 vs stayers 38 months", b: true },
    "the first year is the danger zone",
    { t: "Churners pay more: $74.4 vs $61.3 / month", b: true },
    { t: "Every one of these becomes a slide in YOUR presentation", c: C.PRIMARY_DARK, b: true },
  ], { x: 7.0, y: 2.3, w: W - 7.0 - M, h: 3.8, size: 14, gap: 10 });
}

// 6 · method map
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "The method", title: "The project IS the course", pageNo: ++pn });
  L.flowRow(s, pres, { x: M, y: 2.0, w: W - 2 * M, h: 1.5, steps: [
    { t: "EDA & clean", d: "S02 skills" },
    { t: "Split FIRST", d: "S03 golden rule" },
    { t: "Pipeline", d: "S03 ColumnTransformer" },
    { t: "Baseline + metrics", d: "S04 Dummy/AUC/recall" },
  ]});
  L.flowRow(s, pres, { x: M, y: 3.65, w: W - 2 * M, h: 1.5, startNum: 5, steps: [
    { t: "Model zoo (CV)", d: "S05–06 compare families" },
    { t: "Tune the finalist", d: "S07 RandomizedSearch" },
    { t: "Error analysis", d: "S07 drivers & misses" },
    { t: "Test ONCE + present", d: "S04 + today" },
  ]});
  s.addText("Starter notebook `08.final_project_starter.ipynb` has this exact skeleton with TODO cells — you fill the thinking.",
    { x: M, y: 5.5, w: W - 2 * M, h: 0.5, fontSize: 15, fontFace: FONT, bold: true, color: C.PRIMARY_DARK, margin: 0 });
}

// 7 · baseline + zoo
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Steps 3–5", title: "Benchmarks from my run (stratified 5-fold CV)", pageNo: ++pn });
  L.compTable(s, pres, {
    x: M, y: 2.05, w: 7.7, colW: [3.9, 1.9, 1.9], fontSize: 14, rowH: 0.58,
    rows: [
      ["model", "CV acc", "CV ROC-AUC"],
      [{ t: "Dummy (\"nobody churns\")", c: C.MUTED }, "0.735", { t: "0.500", c: C.MUTED }],
      [{ t: "RandomForest", b: true }, "0.784", "0.818"],
      ["HistGradientBoosting", "0.793", "0.838"],
      [{ t: "LogisticRegression", b: true }, { t: "0.803", b: true }, { t: "0.846", b: true }],
    ],
  });
  L.bullets(s, [
    { t: "Read it like S04 taught you", b: true },
    "accuracy 0.735 is FREE — ignore it forever",
    "AUC is the honest ladder: 0.500 → 0.846",
    { t: "Plot twist: plain LogisticRegression wins", b: true, c: C.PRIMARY_DARK },
    "clean features + readable story beats the forest here",
    "your job: reproduce, tune (S07), maybe beat it with XGBoost",
  ], { x: 8.4, y: 2.2, w: W - 8.4 - M, h: 4.2, size: 14, gap: 10 });
}

// 8 · threshold
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Step 6", title: "The threshold is a BUSINESS decision", pageNo: ++pn });
  L.compTable(s, pres, {
    x: M, y: 2.1, w: 7.7, colW: [2.3, 1.7, 1.7, 2.0], fontSize: 14, rowH: 0.58,
    rows: [
      ["threshold (LR, test)", "recall", "precision", "reads as"],
      [{ t: "0.50 (default)", b: true }, "0.56", "0.66", "balanced"],
      [{ t: "0.65", b: true, c: "92400E" }, { t: "0.30", c: "92400E" }, { t: "0.75", c: C.PRIMARY_DARK, b: true }, "few, safe calls"],
      [{ t: "0.35", c: "92400E" }, { t: "0.71", c: C.PRIMARY_DARK }, "0.54", "catch more, waste offers"],
    ],
  });
  L.bullets(s, [
    { t: "Retention offers cost money", b: true },
    "a 300฿ coupon × 500 customers = 150,000฿",
    "if you can only AFFORD to call 100 customers →\nrank by predict_proba, take the top 100 (AUC thinking!)",
    { t: "threshold moves along the ROC curve from S04", b: true, c: C.PRIMARY_DARK },
  ], { x: M, y: 4.6, w: 7.7, h: 1.9, size: 13.5, gap: 8 });
  L.card(s, pres, { x: 8.4, y: 2.1, w: W - 8.4 - M, h: 4.4, title: "Report this way", body: "\"At threshold 0.5 we catch 56% of all churners; 66% of our calls hit real churners.\nLowering to 0.35 catches 71% but 46% of calls are wasted.\n\nBudget says 100 calls → top-100 list catches X%.\"\n\nTHAT is a decision-ready sentence.", bodySize: 14.5 });
}

// 9 · error analysis
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Step 7", title: "What drives churn (LR weights, scaled)", pageNo: ++pn });
  L.compTable(s, pres, {
    x: M, y: 2.05, w: 7.5, colW: [3.3, 1.6, 2.6], fontSize: 13.5, rowH: 0.52,
    rows: [
      ["feature", "weight", "reads as"],
      [{ t: "tenure", b: true }, { t: "−1.23", c: C.PRIMARY_DARK, b: true }, "every extra month anchors customers"],
      ["Contract: Two-year", "−0.76", "locked-in = safe"],
      [{ t: "InternetService: Fiber", b: true }, { t: "+0.64", c: "9F1239", b: true }, "fiber = churn rocket"],
      ["Contract: Month-to-month", "+0.59", "free to leave, free to leave…"],
      ["InternetService: DSL", "−0.64", "older, loyal crowd"],
    ],
  });
  L.bullets(s, [
    { t: "Insight slide for your presentation:", b: true },
    "\"New month-to-month fiber customers are our flight risk — call them in month 3, not month 11.\"",
    { t: "Cross-check with EDA (slide 5): the model and the eyes agree · bonus: permutation importance as a second opinion", b: true, c: C.PRIMARY_DARK },
  ], { x: M, y: 5.4, w: 7.5, h: 1.4, size: 13, gap: 7 });
  L.card(s, pres, { x: 8.3, y: 2.05, w: W - 8.3 - M, h: 4.6, title: "Error analysis ≠ vibes", body: "Look at the top misses:\n\n· churners with LOW predicted risk (missed danger — why?)\n· stayers with HIGH risk (future churn? save them proactively?)\n\nfind_common_traits(top_misses)\n→ the insight slide writes itself.", bodySize: 14.5 });
}

// 10 · final test
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Step 8", title: "The final word: test set, once", pageNo: ++pn });
  L.bigStat(s, { x: M + 0.6, y: 2.5, w: 3.4, value: "0.842", label: "test ROC-AUC\n(CV said 0.846 — honest)", size: 64 });
  L.bigStat(s, { x: M + 4.6, y: 2.5, w: 3.4, value: "0.56", label: "recall @ 0.5\nof all true churners", size: 64, color: C.PRIMARY_DARK });
  L.bigStat(s, { x: M + 8.6, y: 2.5, w: 3.4, value: "0.806", label: "accuracy\n(vs Dummy 0.735)", size: 64, color: "B45309" });
  s.addText("CV 0.846 → test 0.842: a small, honest gap. THIS sentence belongs in your report —\nthe gap is the difference between a student and a data scientist.",
    { x: M, y: 5.35, w: W - 2 * M, h: 0.8, fontSize: 16, fontFace: FONT, bold: true, color: C.PRIMARY_DARK, margin: 0 });
}

// 11 · presentation
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Communicate", title: "The 5-minute presentation skeleton", pageNo: ++pn });
  L.compTable(s, pres, {
    x: M, y: 2.05, w: W - 2 * M, colW: [0.9, 3.6, 7.07], fontSize: 13.5, rowH: 0.6,
    rows: [
      ["min", "slide", "content"],
      ["0:00", "Problem", "one sentence + the business stake"],
      ["0:30", "Data & method", "1 EDA chart + your pipeline diagram (no code dumps)"],
      ["1:30", "Results", "CV vs test, right metric, baseline next to it"],
      ["2:30", "Insight", "the drivers chart + one decision-ready sentence"],
      ["3:30", "Limits & next", "what could break it (leak? drift?), what you'd try next"],
      ["4:30", "Ask", "what you need from the audience"],
    ],
  });
  s.addText("Never: code screenshots, 12 decimal places, \"we tried 9 models\" (nobody cares) — sell the DECISION.",
    { x: M, y: 6.15, w: W - 2 * M, h: 0.45, fontSize: 14, fontFace: FONT, bold: true, color: "92400E", margin: 0 });
}

// 12 · rubric
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Grading", title: "Rubric — 40% of the course", pageNo: ++pn });
  L.compTable(s, pres, {
    x: M, y: 2.0, w: W - 2 * M, colW: [4.3, 1.7, 1.5, 3.07], fontSize: 12, rowH: 0.48,
    rows: [
      ["dimension", "weight", "full marks", "zero marks"],
      ["Clean pipeline", "25%", "ColumnTransformer+Pipeline, split-first", "manual transforms / leakage"],
      ["Honest evaluation", "25%", "baseline, right metric, CV vs test gap reported", "test-set peeking"],
      ["Error analysis & insight", "20%", "drivers + misses + decision sentence", "score dump only"],
      ["Presentation", "15%", "5-min skeleton, business language", "code walkthrough"],
      ["Reproducibility", "15%", "runs top-to-bottom, seeds set, joblib saved", "random notebook order"],
    ],
  });
  s.addText("No points for the highest AUC. Points for the cleanest, most honest, most actionable project.",
    { x: M, y: 6.35, w: W - 2 * M, h: 0.5, fontSize: 15.5, fontFace: FONT, bold: true, color: C.PRIMARY_DARK, margin: 0 });
}

// 13 · deliverables
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Deliverables", title: "What you hand in", pageNo: ++pn });
  const w = (W - 2 * M - 0.8) / 3, y = 2.1, h = 2.8;
  L.card(s, pres, { x: M, y, w, h, title: "① Notebook", body: "The completed starter notebook:\nall 8 steps, your own EDA & error analysis,\nmarkdown commentary in Thai or English.", bodySize: 13.5 });
  L.card(s, pres, { x: M + w + 0.4, y, w, h, title: "② Model artifact", body: "churn_pipeline.joblib — the fitted Pipeline\n(+ the one cell that loads & predicts on a raw row).", bodySize: 13.5 });
  L.card(s, pres, { x: M + 2 * (w + 0.4), y, w, h, title: "③ 5-minute talk", body: "4–6 slides using today's skeleton.\nPresent in class, English or Thai.", bodySize: 13.5 });
  L.bullets(s, [
    { t: "AI assistants: fully allowed — cite your prompts in a final cell, and be ready to explain every line (S00 policy)", c: C.PRIMARY_DARK, b: true },
  ], { x: M, y: 5.3, w: W - 2 * M, h: 0.6, size: 14, gap: 8 });
}

// 14 · mistakes
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Warning", title: "The five classic project fails", pageNo: ++pn });
  const y0 = 2.0;
  const rows = [
    ["Peeked at the test set (tuned on it)", "test = train in disguise", "CV for all decisions"],
    ["Reported accuracy only (26.5% positive!)", "\"73.5% accurate\" = free", "AUC + recall + baseline"],
    ["Left TotalCharges as text", "imputer silently errors / garbage", "to_numeric(coerce) first"],
    ["9 models, zero error analysis", "a zoo, not a project", "insight beats leaderboard"],
    ["Reads like code, not a story", "nobody can act on it", "5-minute skeleton"],
  ];
  L.compTable(s, pres, {
    x: M, y: y0, w: W - 2 * M, colW: [4.7, 4.0, 3.0], fontSize: 13.5, rowH: 0.55,
    rows: [["fail", "symptom", "prevention"], ...rows],
  });
}

// 15 · extensions
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "For the ambitious", title: "Extension menu (bonus bragging rights)", pageNo: ++pn });
  const w = (W - 2 * M - 1.2) / 4, y = 2.1, h = 3.4;
  L.card(s, pres, { x: M, y, w, h, title: "XGBoost / LightGBM", body: "%pip install xgboost\nswap into the SAME pipeline —\nbeat my 0.846 CV AUC?", bodySize: 12.5 });
  L.card(s, pres, { x: M + w + 0.4, y, w, h, title: "Cost-based threshold", body: "false negative costs 3,000฿,\nfalse positive costs 300฿ —\npick the profit-maximizing threshold.", bodySize: 12.5 });
  L.card(s, pres, { x: M + 2 * (w + 0.4), y, w, h, title: "Calibration", body: "does \"70% risk\" mean 70%?\nCalibratedClassifierCV —\nprobabilities you can trust.", bodySize: 12.5 });
  L.card(s, pres, { x: M + 3 * (w + 0.4), y, w, h, title: "Explain one customer", body: "pick 1 test customer,\nwalk through WHY the model\nsays they'll churn.", bodySize: 12.5 });
}

// 16 · after course
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "The road ahead", title: "After this course", pageNo: ++pn });
  const w = (W - 2 * M - 0.8) / 3, y = 2.1, h = 3.2;
  L.card(s, pres, { x: M, y, w, h, title: "Deeper tabular ML", body: "XGBoost · LightGBM · CatBoost\nfeature engineering at scale\ntime-series validation", bodySize: 13.5 });
  L.card(s, pres, { x: M + w + 0.4, y, w, h, title: "Deep learning", body: "fastai / PyTorch\n(images, text, audio)\nstart with the “Is it a bird?” notebook", bodySize: 13.5 });
  L.card(s, pres, { x: M + 2 * (w + 0.4), y, w, h, title: "Production / MLOps", body: "model serving & monitoring\ndrift, retraining, champion-challenger\nMLflow, Docker, cloud", bodySize: 13.5 });
  s.addText("Everything you learned transfers: split honestly, measure honestly, explain simply.",
    { x: M, y: 5.7, w: W - 2 * M, h: 0.5, fontSize: 16, fontFace: FONT, bold: true, color: C.PRIMARY_DARK, margin: 0 });
}

// 17 · Lab
L.labSlide(pres, {
  sessionTag: TAG, pageNo: ++pn, num: "08",
  title: "โปรเจ็คจบคอร์ส — ทำนายลูกค้าที่จะยกเลิก (Churn)",
  goal: "Deliver an end-to-end churn predictor: clean pipeline, honest evaluation, business-ready insight — graded by the rubric.",
  tasks: [
    "EDA: อัตรา churn รวม + แยกตาม contract / internet / tenure — พาดหัวข่าว 3 ข้อ",
    "แบ่ง 80/20 stratify ก่อน แล้วสร้าง pipeline (จัดการ TotalCharges + one-hot 16 คอลัมน์)",
    "Baseline Dummy → เทียบ ≥3 โมเดลด้วย stratified CV (AUC เป็นหลัก)",
    "Tune โมเดลที่ดีที่สุด (RandomizedSearchCV) แล้ววัด test ครั้งเดียว — เทียบกับ CV",
    "Error analysis + top drivers → ประโยค decision-ready 1 ประโยค แล้วส่ง notebook + joblib + สไลด์ 5 นาที",
  ],
  vibe: "ลองถาม AI: \"ช่วยรีวิวโค้ดโปรเจ็คฉันเหมือน senior data scientist — หา leakage, metric ผิด, และจุดที่ต้อง error analysis เพิ่ม\" — ถือเป็น code review รอบแรกก่อนส่งจริง",
});

// 18 · Takeaways (course close)
L.takeaways(pres, {
  sessionTag: TAG, pageNo: ++pn,
  items: [
    "The project IS the course: EDA → split-first pipelines → baseline → CV comparison → tuning → error analysis → one honest test.",
    "Churn results to beat: CV AUC 0.846 / test 0.842 with plain LogisticRegression — insight (tenure, contract, fiber) matters as much as the score.",
    "The threshold is a business decision — recall vs precision is a budget conversation, not a math one.",
    "Grading rewards honesty and actionability, never leaderboard scores.",
    "You now have the full classical-ML toolkit — go build, measure honestly, and explain simply.",
  ],
});

L.save(pres, "D:/Repositories/AI_course_MasterDegree/slides/08 Final Project Customer Churn Prediction.pptx").then(() => console.log("08 done"));
