// Deck 06 — Classification + Ensembles
const L = require("./deck_lib");
const { C, FONT, MONO, W, H, M } = L;

const TAG = "SESSION 06";
const pres = L.deckInit("06 Classification and Ensembles");
let pn = 1;

// 1 · Title
L.titleSlide(pres, {
  num: "06",
  title: "Classification\n& Ensembles",
  subtitle: "Open every remaining black box — logistic, trees, SVM — then let committees of models outvote any single one.",
});
pn++;

// 2 · Agenda
L.agendaSlide(pres, {
  sessionTag: TAG, pageNo: ++pn,
  items: [
    { t: "Decision boundaries", d: "what a classifier actually draws" },
    { t: "Logistic regression", d: "sigmoid, probabilities, weights" },
    { t: "Decision trees", d: "rules you can read aloud" },
    { t: "Naive Bayes & SVM", d: "the 90-second tour" },
    { t: "Why ensembles", d: "one tree = opinion, many = wisdom" },
    { t: "Bagging → RandomForest", d: "+ feature importances" },
    { t: "Boosting → HistGradientBoosting", d: "and XGBoost beyond" },
    { t: "Voting & the full scoreboard", d: "who wins when" },
  ],
});

// 3 · boundaries
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Concept", title: "A classifier draws a boundary", pageNo: ++pn });
  // real decision regions (breast cancer, 2 features, standardized)
  s.addImage({ path: "D:/Repositories/AI_course_MasterDegree/assets/figures/img_boundaries.png", x: M, y: 1.95, w: 12.23, h: 3.35 });
  L.bullets(s, [
    { t: "Same data, same goal — different geometry: a straight line (logistic) · axis-aligned rectangles (tree) · wiggly neighborhoods (KNN) · a smooth curve (RBF-SVM)", b: true },
    { t: "Real fits on breast cancer (mean radius × mean texture, standardized) — test accuracy printed on each panel", c: C.MUTED },
    { t: "predict() returns the class; predict_proba() returns the probability — every sklearn classifier offers both", b: true, c: C.PRIMARY_DARK },
  ], { x: M, y: 5.5, w: W - 2 * M, h: 1.45, size: 14, gap: 7 });
}

// 4 · logistic sigmoid
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Black box #2", title: "Logistic regression: a probability pump", pageNo: ++pn });
  s.addChart(pres.charts.LINE, [
    { name: "sigmoid(z)", labels: ["−6", "−4", "−2", "0", "2", "4", "6"], values: [0.002, 0.018, 0.12, 0.5, 0.88, 0.98, 1.0] },
  ], {
    x: M, y: 2.0, w: 6.6, h: 4.3,
    chartColors: [C.PRIMARY], lineSize: 3.5, lineSmooth: true, lineDataSymbol: "none",
    valAxisMinVal: 0, valAxisMaxVal: 1, valAxisLabelColor: C.MUTED, catAxisLabelColor: C.MUTED,
    valGridLine: { color: "E2E8F0", size: 0.5 }, catGridLine: { style: "none" },
    showLegend: false, chartArea: { fill: { color: "FFFFFF" } },
    valAxisTitle: "P(malignant)", showValAxisTitle: true, valAxisTitleColor: C.MUTED, valAxisTitleFontSize: 11,
    catAxisTitle: "z = weighted sum of features", showCatAxisTitle: true, catAxisTitleColor: C.MUTED, catAxisTitleFontSize: 11,
  });
  L.bullets(s, [
    { t: "z = w·x + b  (same as linear!)", b: true },
    "sigmoid squashes z into probability 0–1",
    { t: "predict_proba → the number", b: true },
    "predict → threshold at 0.5 by default",
    { t: "\"Logistic regression\" = classification. The name lies.", b: true, c: "92400E" },
  ], { x: 7.4, y: 2.2, w: W - 7.4 - M, h: 2.9, size: 14.5, gap: 11 });
  L.outputBlock(s, pres, { x: 7.4, y: 5.35, w: W - 7.4 - M, h: 0.95, lines: [
    "CV accuracy 0.974 · ROC-AUC 0.995",
  ]});
}

// 5 · logistic coefficients
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Interpretation", title: "Logistic weights = evidence, in log-odds", pageNo: ++pn });
  L.compTable(s, pres, {
    x: M, y: 2.05, w: 7.4, colW: [3.0, 1.7, 2.7], fontSize: 13, rowH: 0.52,
    rows: [
      ["feature (standardized)", "weight", "reads as"],
      [{ t: "worst texture", b: true }, { t: "−1.25", c: "9F1239", b: true }, "coarser texture → malignant"],
      ["radius error", "−1.07", "size variability → malignant"],
      ["worst symmetry", "−0.96", "asymmetry → malignant"],
      ["worst concave points", "−0.94", "concavities → malignant"],
      ["area error", "−0.94", "area variability → malignant"],
    ],
  });
  s.addText("(Signs here are data-specific; magnitude = strength of evidence. Positive class = benign in this encoding.)",
    { x: M, y: 5.35, w: 7.4, h: 0.6, fontSize: 11.5, fontFace: FONT, color: C.MUTED, margin: 0 });
  L.bullets(s, [
    { t: "Same reading skill as S05", b: true },
    "linear: weights move the VALUE",
    "logistic: weights move the PROBABILITY",
    "exp(w) = odds ratio — \"evidence multiplier\"",
    { t: "Trains fast, scales big — the industry default first classifier", c: C.PRIMARY_DARK, b: true },
  ], { x: 8.2, y: 2.2, w: W - 8.2 - M, h: 3.9, size: 14, gap: 11 });
}

// 6 · trees how
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Black box #3", title: "Decision trees: 20 questions for tumors", pageNo: ++pn });
  L.pipelineDiagram(s, pres, { x: M, y: 2.05, w: W - 2 * M, stages: [
    { t: "\"worst radius ≤ 16.8?\"", d: "no → malignant-ish branch" },
    { t: "\"concave points ≤ 0.14?\"", d: "yes → likely benign" },
    { t: "\"area error ≤ 91.6?\"", d: "refine again" },
    { t: "leaf", d: "predict class + proba" },
  ]});
  L.bullets(s, [
    { t: "How is a question chosen?", b: true },
    "try candidate thresholds per feature",
    "keep the split that best separates the classes (Gini / entropy — purity math, intuition is enough)",
    { t: "Stop when: max_depth / min_samples_leaf / pure leaves", c: C.PRIMARY_DARK },
    "No scaling needed — thresholds compare raw values",
  ], { x: M, y: 3.85, w: W - 2 * M, h: 1.9, size: 14.5, gap: 9 });
}

// 7 · reading a real tree
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Interpretation", title: "A real fitted tree, read aloud", pageNo: ++pn });
  s.addImage({ path: "D:/Repositories/AI_course_MasterDegree/assets/figures/img_tree.png", x: M, y: 2.0, w: 7.6, h: 4.15 });
  s.addText("plot_tree(tree3) — the same depth-3 model, drawn as a flowchart (test acc 0.944)",
    { x: M, y: 6.3, w: 7.6, h: 0.35, fontSize: 11.5, fontFace: FONT, color: C.MUTED, margin: 0 });
  L.bullets(s, [
    { t: "This IS the model", b: true },
    "export_text(tree, feature_names=…)",
    "a doctor can audit every decision",
    { t: "\"Small, smooth tumors are benign\" — the data says so", c: C.PRIMARY_DARK },
    { t: "plot_tree() draws it as a flowchart", sub: true },
  ], { x: 8.3, y: 2.2, w: W - 8.3 - M, h: 3.6, size: 14, gap: 11 });
}

// 8 · tree danger
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Trees' dark side", title: "Unleashed, a tree memorizes everything", pageNo: ++pn });
  L.compTable(s, pres, {
    x: M, y: 2.1, w: 7.7, colW: [3.3, 1.5, 1.5, 1.4], fontSize: 14, rowH: 0.6,
    rows: [
      ["tree", "train acc", "CV acc", "AUC"],
      [{ t: "unrestricted", c: "9F1239" }, { t: "1.000", c: "9F1239", b: true }, "0.910", "0.900"],
      [{ t: "max_depth = 3", b: true }, "0.977", { t: "0.924", b: true }, { t: "0.934", b: true }],
    ],
  });
  L.bullets(s, [
    { t: "A free tree grows until every leaf is pure", b: true },
    "one patient per leaf → 100% train accuracy",
    { t: "its CV accuracy (0.910) is the WORST of today's models", b: true, c: "9F1239" },
    "restrict depth / min_samples → generalizes better",
    { t: "…or grow many restricted trees and average them → RandomForest (soon)", b: true, c: C.PRIMARY_DARK },
  ], { x: M, y: 4.55, w: 7.7, h: 1.9, size: 14, gap: 9 });
  L.card(s, pres, { x: 8.5, y: 2.1, w: W - 8.5 - M, h: 4.3, title: "Also: trees are unstable", body: "Two random samples → two quite different trees.\n\nHigh variance is the disease.\nEnsembles are the cure.\n\nRemember this slide — the next one pays it off.", bodySize: 15 });
}

// 9 · NB + SVM
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "The 90-second tour", title: "Naive Bayes & SVM", pageNo: ++pn });
  const w = (W - 2 * M - 0.4) / 2;
  L.card(s, pres, { x: M, y: 2.05, w, h: 4.35, title: "GaussianNB — 0.930 acc / 0.986 AUC", body: "Assumes features are independent given the class (naive — they never are).\n\nAnd still works shockingly well.\n\n· trains in a blink, tiny data OK\n· THE classic for spam & text (S06 of any NLP course)\n\nUse when: speed, small data, or a strong baseline.", bodySize: 14 });
  L.card(s, pres, { x: M + w + 0.4, y: 2.05, w, h: 4.35, title: "SVM (RBF) — 0.977 acc / 0.995 AUC ★ today's best single", body: "Draws the widest street between classes (max margin), possibly curved via kernels.\n\n· powerful on small/medium clean data\n· NEEDS scaling (S03!)\n· doesn't scale to millions of rows; no predict_proba by default\n\nUse when: medium data, strong boundaries.", bodySize: 14, tint: C.ACCENT_TINT, titleColor: "92400E" });
}

// 10 · single scoreboard
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Scoreboard 1/2", title: "Single models, stratified 5-fold CV", pageNo: ++pn });
  L.compTable(s, pres, {
    x: M, y: 2.05, w: 7.7, colW: [4.0, 1.85, 1.85], fontSize: 14, rowH: 0.5,
    rows: [
      ["model", "CV acc", "AUC"],
      [{ t: "Dummy (most_frequent)", c: C.MUTED }, "0.627", "0.500"],
      ["DecisionTree (free)", "0.910", "0.900"],
      ["GaussianNB", "0.930", "0.986"],
      ["KNN (k=5)", "0.963", "0.985"],
      ["LogisticRegression", "0.974", "0.995"],
      [{ t: "SVM (RBF)", b: true }, { t: "0.977", b: true }, { t: "0.995", b: true }],
    ],
  });
  L.bullets(s, [
    { t: "Every model beats Dummy by miles — but AUC (0.900 vs 0.995) separates them far better than accuracy, and ranks the free tree LAST", b: true },
  ], { x: M, y: 6.0, w: 7.7, h: 0.85, size: 13, gap: 7 });
  L.card(s, pres, { x: 8.5, y: 2.05, w: W - 8.5 - M, h: 4.4, title: "Next question", body: "Can we COMBINE models —\ntake a few imperfect opinions\nand beat the best single one?\n\n(The answer is yes —\nand it's how real tabular ML\ncompetitions are won.)", bodySize: 16 });
}

// 11 · why ensembles
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "★ Ensembles", title: "Wisdom of crowds: why committees work", pageNo: ++pn });
  L.bullets(s, [
    { t: "One tree: high variance", b: true },
    "new sample → new tree → new opinions",
    { t: "Ask 100 slightly-different trees", b: true },
    "each sees a random slice of rows & features",
    "errors are UNCORRELATED-ish → they cancel in the vote",
    { t: "Conditions (the ML version of Galton's ox):", b: true },
    { t: "each member better than chance", sub: true },
    { t: "members disagree with each other", sub: true },
    { t: "aggregate by voting (classify) or averaging (regress)", sub: true },
  ], { x: M, y: 2.1, w: 6.4, h: 4.3, size: 15, gap: 10 });
  // diagram: many trees → vote
  const tx = 7.6;
  [0, 1, 2].forEach((i) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: tx, y: 2.2 + i * 1.25, w: 1.9, h: 0.95, rectRadius: 0.08, fill: { color: C.PRIMARY_TINT }, line: { color: "FFFFFF", width: 0 } });
    s.addText(`tree ${i + 1}\n(random slice)`, { x: tx, y: 2.2 + i * 1.25, w: 1.9, h: 0.95, fontSize: 12, fontFace: FONT, bold: true, color: C.PRIMARY_DARK, align: "center", valign: "middle", margin: 0 });
    s.addText("→", { x: tx + 2.0, y: 2.45 + i * 1.25, w: 0.5, h: 0.45, fontSize: 18, fontFace: FONT, color: C.MUTED, align: "center", margin: 0 });
  });
  s.addText("… × 100", { x: tx + 0.35, y: 6.0, w: 1.4, h: 0.35, fontSize: 12, fontFace: FONT, color: C.MUTED, margin: 0 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: tx + 2.6, y: 3.35, w: 2.1, h: 1.5, rectRadius: 0.08, fill: { color: C.PRIMARY }, line: { color: "FFFFFF", width: 0 } });
  s.addText("VOTE /\naverage", { x: tx + 2.6, y: 3.35, w: 2.1, h: 1.5, fontSize: 16, fontFace: FONT, bold: true, color: "FFFFFF", align: "center", valign: "middle", margin: 0 });
}

// 12 · random forest
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "★ Ensembles", title: "RandomForest: bagging + a random twist", pageNo: ++pn });
  L.pipelineDiagram(s, pres, { x: M, y: 2.05, w: W - 2 * M, stages: [
    { t: "bootstrap rows", d: "sample WITH replacement" },
    { t: "random features per split", d: "the \"forest\" twist" },
    { t: "grow deep tree", d: "no pruning — variance is fine" },
    { t: "× 100 trees → vote", d: "aggregate" },
  ]});
  L.compTable(s, pres, {
    x: M, y: 3.75, w: 7.3, colW: [3.3, 2.0, 2.0], fontSize: 14, rowH: 0.55,
    rows: [
      ["model", "CV acc", "AUC"],
      ["single free tree", "0.910", "0.900"],
      [{ t: "RandomForest(100)", b: true }, { t: "0.956", b: true }, { t: "0.989", b: true }],
    ],
  });
  L.bullets(s, [
    { t: "Feature importances (real, this dataset)", b: true },
    "worst area 0.15 · concave points 0.13 · mean concave 0.11",
    "≈ \"which columns did the forest actually use?\"",
    { t: "Caveat: correlated features share/split credit — read as a hint, not a verdict", c: "92400E" },
  ], { x: M, y: 5.5, w: 7.3, h: 1.2, size: 13, gap: 7 });
  L.card(s, pres, { x: 8.1, y: 3.75, w: W - 8.1 - M, h: 3.0, title: "Why it works", body: "Deep trees = low bias, high variance.\nAveraging 100 uncorrelated-ish trees ≈ variance ÷ 100.\n\nStrong default: little tuning, no scaling needed, handles mixed types.", bodySize: 14.5 });
}

// 13 · boosting
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "★ Ensembles", title: "Boosting: each tree fixes the last one's mistakes", pageNo: ++pn });
  L.pipelineDiagram(s, pres, { x: M, y: 2.05, w: W - 2 * M, stages: [
    { t: "tree 1", d: "predicts; notes its misses" },
    { t: "tree 2", d: "focuses on tree 1's misses" },
    { t: "tree 3…N", d: "keeps chasing residuals" },
    { t: "sum of all", d: "shallow but cumulative" },
  ]});
  L.compTable(s, pres, {
    x: M, y: 3.75, w: 7.3, colW: [3.5, 1.9, 1.9], fontSize: 14, rowH: 0.5,
    rows: [
      ["model", "CV acc", "AUC"],
      ["RandomForest(100)", "0.956", "0.989"],
      [{ t: "HistGradientBoosting", b: true }, { t: "0.967", b: true }, { t: "0.992", b: true }],
    ],
  });
  L.bullets(s, [
    { t: "Bagging: parallel, deep trees, vote · Boosting: sequential, shallow trees, add up — HistGB is sklearn's fast boosting (native NaN support!)", b: true },
    { t: "Same family beyond sklearn: XGBoost, LightGBM, CatBoost — the kings of tabular Kaggle. Your S08 project can try them.", c: C.PRIMARY_DARK, b: true },
  ], { x: M, y: 5.55, w: W - 2 * M, h: 1.2, size: 13, gap: 7 });
}

// 14 · voting/stacking
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "★ Ensembles", title: "Voting & stacking: mix different species", pageNo: ++pn });
  L.codeBlock(s, pres, { x: M, y: 2.0, w: 7.7, h: 3.4, size: 12, lines: [
    { t: "vote = VotingClassifier([" },
    { t: "    (\"lr\",  make_pipeline(StandardScaler()," },
    { t: "                      LogisticRegression(max_iter=5000)))," },
    { t: "    (\"rf\",  RandomForestClassifier(random_state=42))," },
    { t: "    (\"knn\", make_pipeline(StandardScaler()," },
    { t: "                      KNeighborsClassifier()))]," },
    { t: "    voting=\"soft\")   # average PROBABILITIES" },
  ]});
  L.compTable(s, pres, {
    x: M, y: 5.6, w: 7.7, colW: [3.6, 2.05, 2.05], fontSize: 13.5, rowH: 0.5,
    rows: [
      ["model", "CV acc", "AUC"],
      [{ t: "Voting(LR + RF + KNN)", b: true }, { t: "0.972", b: true }, { t: "0.995", b: true }],
    ],
  });
  L.bullets(s, [
    { t: "hard voting", b: true },
    "each model votes a class label",
    { t: "soft voting (better)", b: true },
    "average predict_proba — confidence counts",
    { t: "Stacking: a small \"meta-model\" learns to weight the members — sklearn's StackingClassifier", sub: true },
    { t: "Members should DISAGREE (diversity > quantity)", c: C.PRIMARY_DARK, b: true },
  ], { x: 8.4, y: 2.2, w: W - 8.4 - M, h: 4.2, size: 13.5, gap: 10 });
}

// 15 · full scoreboard
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Scoreboard 2/2", title: "The full table — and its three lessons", pageNo: ++pn });
  L.compTable(s, pres, {
    x: M, y: 2.0, w: 7.7, colW: [4.0, 1.85, 1.85], fontSize: 13, rowH: 0.48,
    rows: [
      ["model", "CV acc", "AUC"],
      [{ t: "Dummy (most_frequent)", c: C.MUTED }, "0.627", "0.500"],
      ["DecisionTree (free)", "0.910", "0.900"],
      ["GaussianNB", "0.930", "0.986"],
      [{ t: "RandomForest(100)", c: C.PRIMARY_DARK }, "0.956", "0.989"],
      ["KNN (k=5)", "0.963", "0.985"],
      ["HistGradientBoosting", "0.967", "0.992"],
      ["Voting(LR+RF+KNN)", "0.972", "0.995"],
      ["LogisticRegression", "0.974", "0.995"],
      [{ t: "SVM (RBF)", b: true }, { t: "0.977", b: true }, { t: "0.995", b: true }],
    ],
  });
  L.bullets(s, [
    { t: "Lesson 1", b: true },
    "ensembles lifted the tree 0.910 → 0.956+",
    { t: "Lesson 2", b: true },
    "on this easy set, tuned singles match ensembles —\nno free lunch; ALWAYS run the table (S04 method)",
    { t: "Lesson 3", b: true },
    "on bigger, messier tabular data, boosting usually wins\n(that's why S08 lets you try XGBoost)",
  ], { x: 8.5, y: 2.15, w: W - 8.5 - M, h: 4.3, size: 13.5, gap: 10 });
}

// 16 · guide
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Guide", title: "Which classifier when?", pageNo: ++pn });
  L.compTable(s, pres, {
    x: M, y: 2.05, w: W - 2 * M, colW: [4.0, 2.9, 2.5, 2.7], fontSize: 13, rowH: 0.55,
    rows: [
      ["situation", "start with", "strength", "watch out"],
      ["Baseline / speed / text", "GaussianNB", "instant", "independence lie"],
      ["Explanation: audit trail", "Logistic / small tree", "readable", "linear-ish"],
      ["Small-medium, clean", "SVM (RBF)", "top accuracy", "scaling + scale-up"],
      ["Tabular default", "RandomForest", "robust, no scaling", "big memory"],
      ["Max tabular accuracy", "HistGB / XGBoost", "Kaggle kings", "tuning (S07)"],
      ["squeeze out the last %", "Voting / Stacking", "diversity pays", "complexity"],
    ],
  });
  s.addText("And remember: the winner varies per dataset — the S04 comparison protocol is the real skill.",
    { x: M, y: 6.2, w: W - 2 * M, h: 0.45, fontSize: 13, fontFace: FONT, color: C.MUTED, margin: 0 });
}

// 17 · Lab
L.labSlide(pres, {
  sessionTag: TAG, pageNo: ++pn, num: "06",
  title: "ประกวดโมเดลจัดหมวดมะเร็งเต้านม — รวมถึง ensembles",
  goal: "Run today's full zoo on breast cancer with stratified CV, read real trees and importances, and prove the ensemble effect yourself.",
  tasks: [
    "เทียบ Dummy / LogisticRegression / GaussianNB / SVM / KNN / DecisionTree ด้วย StratifiedKFold (acc + ROC-AUC)",
    "โชว์กฎของ DecisionTree(max_depth=3) ด้วย export_text แล้วอ่านออกเสียงเป็นประโยคไทย",
    "พิสูจน์ ensemble effect: tree เดี่ยว vs RandomForest vs HistGradientBoosting",
    "ดู feature_importances_ ของ RandomForest — ฟีเจอร์ไหนสำคัญที่สุด ตรงกับความรู้ทางการแพทย์ไหม",
    "โจทย์ชวนคิด: สร้าง VotingClassifier ของตัวเอง (เลือกสมาชิกให้หลากหลาย) แล้วดูว่าชนะสมาชิกตัวไหนไหม",
  ],
  vibe: "ลองถาม AI: “อธิบายความต่างระหว่าง bagging กับ boosting เหมือนสอนเด็ก 12 ขวบ” แล้วเขียนคำอธิบาย 3 บรรทัดเป็นภาษาไทยใน markdown cell — เช็กว่าตรงกับสไลด์ไหม",
});

// 18 · Takeaways
L.takeaways(pres, {
  sessionTag: TAG, pageNo: ++pn,
  items: [
    "Classifiers differ in the boundaries they draw: lines (logistic/SVM), rectangles (trees), neighborhoods (KNN).",
    "Logistic turns evidence into probability; small trees turn it into rules you can audit.",
    "A free tree memorizes (CV 0.910, worst of the day) — restriction or aggregation fixes it.",
    "Bagging averages deep trees (RandomForest 0.956); boosting chains shallow ones (HistGB 0.967); voting mixes species (0.972).",
    "No universal winner — the S04 protocol (same folds, right metric, Dummy anchor) is the real skill.",
  ],
  nextTag: "Session 07", nextTitle: "Unsupervised Learning + Hyperparameter Tuning — structure, and squeezing",
});

L.save(pres, "D:/Repositories/AI_course_MasterDegree/slides/06 Classification and Ensembles.pptx").then(() => console.log("06 done"));
