// Deck 04 — Model Evaluation & Cross-Validation (the honest-numbers session)
const L = require("./deck_lib");
const { C, FONT, MONO, W, H, M } = L;

const TAG = "SESSION 04";
const pres = L.deckInit("04 Model Evaluation & Cross-Validation");
let pn = 1;

// 1 · Title
L.titleSlide(pres, {
  num: "04",
  title: "Model Evaluation &\nCross-Validation",
  subtitle: "Your model says 95%. Is that skill or self-deception? Learn to measure honestly — before you learn more models.",
});
pn++;

// 2 · Agenda
L.agendaSlide(pres, {
  sessionTag: TAG, pageNo: ++pn,
  items: [
    { t: "Why train/test split exists", d: "the exam analogy, made brutal" },
    { t: "Overfitting & underfitting", d: "watch a tree memorize" },
    { t: "Holdout is a lottery", d: "diabetes R² 0.36 → 0.59" },
    { t: "k-Fold cross-validation", d: "every point gets a turn" },
    { t: "Regression metrics", d: "MAE · RMSE · R²" },
    { t: "Classification metrics", d: "confusion · precision · recall · ROC" },
    { t: "When accuracy lies", d: "imbalanced data & fixes" },
    { t: "Comparing models properly", d: "baseline · same folds · mean ± std" },
  ],
});

// 3 · why this session
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Before the models", title: "First: learn to measure. Then: measure models.", pageNo: ++pn });
  s.addText("A score you can't trust is worse than no score — it drives every decision you'll make as a data scientist.",
    { x: M, y: 2.0, w: W - 2 * M, h: 0.7, fontSize: 19, fontFace: FONT, color: C.TEXT, margin: 0 });
  const w = (W - 2 * M - 0.8) / 3, y = 3.0, h = 2.7;
  L.card(s, pres, { x: M, y, w, h, title: "Today's models are black boxes", body: "KNN you know (S01).\nDecisionTree, LinearRegression, RandomForest arrive in S05–06.\nToday they're prediction machines — that's all we need.", bodySize: 13.5 });
  L.card(s, pres, { x: M + w + 0.4, y, w, h, title: "What stays constant", body: "No matter the model, the questions are the same:\nDid it memorize? Is the number stable?\nGood at what, bad at what?", bodySize: 13.5 });
  L.card(s, pres, { x: M + 2 * (w + 0.4), y, w, h, title: "Why before models", body: "From S05 on, you'll meet a new model every week.\nEach one hands you a number.\nThis session teaches you to interrogate it.", bodySize: 13.5, tint: C.ACCENT_TINT, titleColor: "92400E" });
}

// 4 · exam analogy
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Recap + sharpen", title: "Why we split: you can't grade a student on the exam it saw", pageNo: ++pn });
  const bx = M, by = 2.2, bw = 11.5, bh = 0.85;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx, y: by, w: bw * 0.75 - 0.06, h: bh, rectRadius: 0.06, fill: { color: C.PRIMARY }, line: { color: "FFFFFF", width: 0 } });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx + bw * 0.75 + 0.06, y: by, w: bw * 0.25 - 0.06, h: bh, rectRadius: 0.06, fill: { color: C.ACCENT }, line: { color: "FFFFFF", width: 0 } });
  s.addText("TRAIN — study material", { x: bx, y: by, w: bw * 0.75 - 0.06, h: bh, fontSize: 15, fontFace: FONT, bold: true, color: "FFFFFF", align: "center", valign: "middle", margin: 0 });
  s.addText("TEST — exam", { x: bx + bw * 0.75 + 0.06, y: by, w: bw * 0.25 - 0.06, h: bh, fontSize: 15, fontFace: FONT, bold: true, color: "7C2D12", align: "center", valign: "middle", margin: 0 });
  L.codeBlock(s, pres, { x: M, y: 3.5, w: 7.3, h: 1.75, size: 12.5, lines: [
    { t: "knn1 = KNeighborsClassifier(n_neighbors=1).fit(X_train, y_train)" },
    { t: "print(knn1.score(X_train, y_train), knn1.score(X_test, y_test))" },
  ]});
  L.outputBlock(s, pres, { x: M, y: 5.35, w: 7.3, h: 0.65, lines: ["1.0    0.937"] });
  L.bullets(s, [
    { t: "k=1: every point's closest neighbor is itself", b: true },
    "train accuracy 100% = pure memorization",
    "test 93.7% = what it really knows",
    { t: "the gap between them is the lie", b: true, c: "9F1239" },
  ], { x: 8.3, y: 3.6, w: W - 8.3 - M, h: 2.3, size: 14, gap: 10 });
}

// 5 · over/underfit definitions
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Vocabulary", title: "Overfitting & underfitting — the two diseases", pageNo: ++pn });
  const w = (W - 2 * M - 0.4) / 2;
  L.card(s, pres, { x: M, y: 2.05, w, h: 3.3, title: "Overfitting — memorized the noise", body: "Training score ↑↑, test score ↓\n\nk=1 KNN · a fully-grown tree · too many features\n\nKnows THIS dataset; fails on the next one.\nLike a student who drilled last year's exam answers.", bodySize: 14, tint: "FEE2E2", titleColor: "9F1239" });
  L.card(s, pres, { x: M + w + 0.4, y: 2.05, w, h: 3.3, title: "Underfitting — missed the pattern", body: "Training score ↓, test score ↓\n\nk=200 KNN · depth-1 tree · too-simple model\n\nToo blunt to capture real structure.\nLike a student who only read the chapter titles.", bodySize: 14, tint: C.PANEL, titleColor: C.TEXT });
  s.addText("Diagnosis recipe: always print BOTH scores. Gap large → overfit. Both low → underfit. Both high & close → healthy.",
    { x: M, y: 5.75, w: W - 2 * M, h: 0.55, fontSize: 15.5, fontFace: FONT, bold: true, color: C.PRIMARY_DARK, margin: 0 });
}

// 5b · see it with your eyes
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Watch it happen", title: "Same data, three models — under · right · over", pageNo: ++pn });
  s.addImage({ path: "D:/Repositories/AI_course_MasterDegree/assets/figures/img_overfit.png", x: M, y: 2.0, w: 12.23, h: 3.67 });
  s.addText("Noisy sine data + polynomial fits of degree 1 / 3 / 15 (train = solid dots, test = hollow). The degree-15 line bends through every noise point — its test R² collapses below zero.",
    { x: M, y: 5.9, w: W - 2 * M, h: 0.75, fontSize: 14.5, fontFace: FONT, color: C.TEXT, margin: 0 });
}

// 6 · depth sweep chart
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Watch it happen", title: "Grow a tree, watch the gap open (breast cancer)", pageNo: ++pn });
  s.addChart(pres.charts.LINE, [
    { name: "train accuracy", labels: ["1", "2", "3", "4", "6", "8", "12"], values: [0.923, 0.958, 0.977, 0.988, 0.998, 1.0, 1.0] },
    { name: "test accuracy", labels: ["1", "2", "3", "4", "6", "8", "12"], values: [0.923, 0.909, 0.944, 0.944, 0.937, 0.923, 0.923] },
  ], {
    x: M, y: 2.0, w: 7.6, h: 4.3,
    chartColors: [C.PRIMARY, C.ACCENT], lineSize: 3, lineSmooth: false,
    lineDataSymbol: "circle", lineDataSymbolSize: 7,
    catAxisTitle: "max_depth", catAxisTitleColor: C.MUTED, catAxisTitleFontSize: 11, showCatAxisTitle: true,
    valAxisMinVal: 0.88, valAxisMaxVal: 1.0, valAxisLabelColor: C.MUTED, catAxisLabelColor: C.MUTED,
    valGridLine: { color: "E2E8F0", size: 0.5 }, catGridLine: { style: "none" },
    showLegend: true, legendPos: "b", legendColor: C.MUTED,
    chartArea: { fill: { color: "FFFFFF" } },
  });
  L.bullets(s, [
    { t: "Depth 1–3: both rise — learning", b: true },
    { t: "Depth 3–4: test peaks (0.944) — sweet spot", b: true, c: C.PRIMARY_DARK },
    { t: "Depth 8+: train = 100%, test falls to 0.923", b: true },
    "the tree starts memorizing individual patients",
    { t: "This U-shaped test curve is the bias-variance trade-off you'll tune in S07", sub: true },
  ], { x: 8.6, y: 2.2, w: W - 8.6 - M, h: 4.0, size: 14, gap: 11 });
}

// 7 · holdout lottery
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "The next problem", title: "Your holdout score is a lottery ticket", pageNo: ++pn });
  s.addText("Same model, same data, same code — only the random split changes. Ten runs, diabetes dataset:",
    { x: M, y: 1.95, w: W - 2 * M, h: 0.6, fontSize: 16.5, fontFace: FONT, color: C.TEXT, margin: 0 });
  s.addChart(pres.charts.BAR, [{ name: "holdout R²", labels: ["s0", "s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"], values: [0.359, 0.444, 0.443, 0.426, 0.467, 0.531, 0.441, 0.503, 0.459, 0.586] }], {
    x: M, y: 2.7, w: 7.6, h: 3.6, barDir: "col",
    chartColors: [C.PRIMARY], varyColors: false,
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.MUTED, dataLabelFontSize: 8.5, dataLabelFormatCode: "0.00",
    catAxisLabelColor: C.MUTED, valAxisLabelColor: C.MUTED,
    valGridLine: { color: "E2E8F0", size: 0.5 }, catGridLine: { style: "none" },
    showLegend: false, chartArea: { fill: { color: "FFFFFF" } },
  });
  L.bigStat(s, { x: 8.6, y: 2.9, w: 3.8, value: "0.36–0.59", label: "R² range across 10 splits\nA 44% test-set is not information — it's noise", size: 34, color: "B45309" });
  s.addText("442 rows is SMALL — and business data often is. Which number do you report to your boss?",
    { x: 8.6, y: 4.9, w: W - 8.6 - M, h: 0.9, fontSize: 13.5, fontFace: FONT, color: C.MUTED, margin: 0 });
}

// 8 · k-fold concept
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "★ The fix", title: "k-fold CV: every point takes a turn at being the exam", pageNo: ++pn });
  const d = L.kfoldDiagram(s, pres, { x: M, y: 2.55, k: 5, title: "5-fold cross-validation" });
  L.bullets(s, [
    { t: "Split the data into k folds (5 here)", b: true },
    "train on 4 folds, validate on the 1 left out",
    "repeat — each fold is the validation once",
    { t: "Report mean ± std of the 5 scores", b: true, c: C.PRIMARY_DARK },
    "mean = honest skill estimate",
    "std = how much it depends on the split",
    { t: "All 442 rows get used for both training AND validation", sub: true },
  ], { x: 7.6, y: 2.2, w: W - 7.6 - M, h: 4.3, size: 14.5, gap: 9 });
}

// 9 · CV code
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "★ The fix", title: "cross_val_score — one line replaces the lottery", pageNo: ++pn });
  L.codeBlock(s, pres, { x: M, y: 2.0, w: 7.7, h: 1.9, size: 13.5, lines: [
    { t: "from sklearn.model_selection import cross_val_score" },
    { t: "scores = cross_val_score(LinearRegression(), X, y, cv=5)" },
    { t: "print(scores, scores.mean(), scores.std())" },
  ]});
  L.outputBlock(s, pres, { x: M, y: 4.0, w: 7.7, h: 1.15, lines: [
    "[0.430  0.523  0.483  0.426  0.550]",
    { t: "mean 0.482  ±  0.049", b: true },
  ]});
  L.bullets(s, [
    { t: "0.482 ± 0.049 — stable & honest", b: true },
    "compare: holdout swung 0.36 → 0.59",
    { t: "cross_validate() gives multiple metrics + fit time per fold", c: C.PRIMARY_DARK },
    { t: "Cost: trains k times (5× slower) — worth it on small data", sub: true },
  ], { x: M, y: 5.4, w: 7.7, h: 1.3, size: 13.5, gap: 7 });
  L.card(s, pres, { x: 8.4, y: 2.0, w: W - 8.4 - M, h: 2.3, title: "Stratified k-fold", body: "For classification: each fold keeps the class ratio of the whole data.\ncv=StratifiedKFold(5, shuffle=True, random_state=42)\n(Default for classifiers in sklearn — good.)", bodySize: 13.5 });
  L.card(s, pres, { x: 8.4, y: 4.55, w: W - 8.4 - M, h: 2.0, title: "Where does the test set go?", body: "CV runs on the TRAINING data only. The test set still sleeps untouched until the very end.", bodySize: 13.5, tint: C.ACCENT_TINT, titleColor: "92400E" });
}

// 10 · regression metrics
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Metrics · regression", title: "How wrong is wrong? MAE · RMSE · R²", pageNo: ++pn });
  L.compTable(s, pres, {
    x: M, y: 2.05, w: 7.6, colW: [1.5, 3.3, 2.8], fontSize: 12.5, rowH: 0.55,
    rows: [
      ["metric", "reads as", "report when"],
      [{ t: "MAE", b: true }, "average miss, in target units", "you must explain to humans"],
      [{ t: "RMSE", b: true }, "average miss, punishing big errors", "big misses are extra costly"],
      [{ t: "R²", b: true }, "fraction of variance explained", "comparing across problems"],
    ],
  });
  L.codeBlock(s, pres, { x: M, y: 4.6, w: 7.6, h: 1.6, size: 12.5, lines: [
    { t: "LinearRegression on diabetes (holdout):" },
    { t: "MAE  41.5   RMSE  53.4   R²  0.485" },
    { t: "# target = disease progression, units ≈ points" },
  ]});
  L.bullets(s, [
    { t: "\"We miss by ±41.5 points on average\"", b: true },
    "MAE is the sentence your stakeholder remembers",
    { t: "R² = 0.485 → explains ~49% of the variance", b: true },
    "R² of the dummy (predict-the-mean) = 0",
    { t: "R² can go NEGATIVE — model worse than the mean", c: "9F1239", b: true },
  ], { x: 8.3, y: 2.2, w: W - 8.3 - M, h: 3.8, size: 13.5, gap: 10 });
}

// 11 · confusion matrix
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Metrics · classification", title: "The confusion matrix: four cells of truth", pageNo: ++pn });
  s.addText("KNN on breast cancer (test set, 143 patients · positive class = malignant)",
    { x: M, y: 1.95, w: W - 2 * M, h: 0.45, fontSize: 15, fontFace: FONT, color: C.TEXT, margin: 0 });
  const cell = (x, y, t, v, fill, tcol) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 2.55, h: 1.5, rectRadius: 0.07, fill: { color: fill }, line: { color: "FFFFFF", width: 2 } });
    s.addText([
      { text: t, options: { fontSize: 12, bold: true, color: tcol, breakLine: true } },
      { text: String(v), options: { fontSize: 40, bold: true, color: tcol, breakLine: false } },
    ], { x, y: y + 0.12, w: 2.55, h: 1.3, fontFace: FONT, align: "center", margin: 0 });
  };
  cell(M, 2.6, "TRUE POSITIVE", 86, C.PRIMARY, "FFFFFF");
  cell(M + 2.65, 2.6, "FALSE POSITIVE", 6, "FDE68A", "92400E");
  cell(M, 4.25, "FALSE NEGATIVE", 4, "FECACA", "9F1239");
  cell(M + 2.65, 4.25, "TRUE NEGATIVE", 47, "99F6E4", "134E4A");
  s.addText("← predicted malignant", { x: M, y: 5.95, w: 5.2, h: 0.3, fontSize: 11.5, fontFace: FONT, color: C.MUTED, margin: 0 });
  s.addText("↑ actually malignant", { x: M - 0.15, y: 2.25, w: 3.5, h: 0.3, fontSize: 11.5, fontFace: FONT, color: C.MUTED, margin: 0 });
  L.bullets(s, [
    { t: "6 false positives", b: true },
    "healthy patients sent to biopsy — cost: money & fear",
    { t: "4 false negatives", b: true },
    "cancer told \"you're fine\" — cost: lives",
    { t: "Accuracy hides WHICH mistake you make", b: true, c: "9F1239" },
    { t: "confusion_matrix(y_test, y_pred)", c: C.PRIMARY_DARK },
  ], { x: 6.3, y: 2.6, w: W - 6.3 - M, h: 3.6, size: 14, gap: 10 });
}

// 12 · precision recall
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Metrics · classification", title: "Precision & recall — which error do you fear?", pageNo: ++pn });
  const w = (W - 2 * M - 0.4) / 2;
  L.card(s, pres, { x: M, y: 2.0, w, h: 2.6, title: "Precision — of my alarms, how many were real?", body: "TP / (TP + FP)  =  86/92  =  0.935\n\nHigh precision = trust the alarm when it rings.\nSpam filter: don't bury real mail.", bodySize: 14 });
  L.card(s, pres, { x: M + w + 0.4, y: 2.0, w, h: 2.6, title: "Recall — of the real cases, how many did I catch?", body: "TP / (TP + FN)  =  86/90  =  0.956\n\nHigh recall = few misses.\nCancer screening: catch them all.", bodySize: 14 });
  L.compTable(s, pres, {
    x: M, y: 4.9, w: W - 2 * M, colW: [4.4, 3.0, 3.0], fontSize: 13, rowH: 0.5,
    rows: [
      ["business question", "protect", "metric"],
      ["Cancer / fraud / safety misses", "FN (misses)", { t: "RECALL", b: true, c: C.PRIMARY_DARK }],
      ["Spam / arrests / wasted call-centre", "FP (false alarms)", { t: "PRECISION", b: true, c: C.PRIMARY_DARK }],
    ],
  });
  s.addText("F1 = 2·P·R/(P+R) = 0.945 — one number when both matter.",
    { x: M, y: 6.5, w: W - 2 * M, h: 0.4, fontSize: 13.5, fontFace: FONT, color: C.MUTED, margin: 0 });
}

// 13 · ROC
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Metrics · classification", title: "ROC-AUC: judgment across ALL thresholds", pageNo: ++pn });
  s.addChart(pres.charts.SCATTER, [
    { name: "fpr", values: [0, 0.057, 0.075, 0.113, 0.113, 0.208, 1.0] },
    { name: "KNN (AUC 0.962)", values: [0, 0.833, 0.922, 0.956, 0.989, 1.0, 1.0] },
    { name: "random (AUC 0.5)", values: [0, 0.057, 0.075, 0.113, 0.113, 0.208, 1.0] },
  ], {
    x: M, y: 2.0, w: 6.9, h: 4.3,
    chartColors: [C.PRIMARY, "CBD5E1"], lineSize: 3, lineSmooth: true,
    lineDataSymbol: "none",
    catAxisTitle: "false positive rate", showCatAxisTitle: true, catAxisTitleColor: C.MUTED, catAxisTitleFontSize: 11,
    valAxisTitle: "true positive rate", showValAxisTitle: true, valAxisTitleColor: C.MUTED, valAxisTitleFontSize: 11,
    valAxisMinVal: 0, valAxisMaxVal: 1, valAxisLabelColor: C.MUTED, catAxisLabelColor: C.MUTED,
    catAxisMinVal: 0, catAxisMaxVal: 1,
    valGridLine: { color: "E2E8F0", size: 0.5 }, catGridLine: { style: "none" },
    showLegend: true, legendPos: "b", legendColor: C.MUTED,
    chartArea: { fill: { color: "FFFFFF" } },
  });
  L.bullets(s, [
    { t: "predict_proba gives scores, not labels", b: true },
    "threshold 0.5 is ONE operating point on this curve",
    "move the threshold → trade precision for recall",
    { t: "AUC = area under the curve", b: true },
    "1.0 = perfect ranking · 0.5 = coin flip",
    { t: "AUC is threshold-free — great for comparing models", b: true, c: C.PRIMARY_DARK },
  ], { x: 8.0, y: 2.2, w: W - 8.0 - M, h: 4.0, size: 14, gap: 11 });
}

// 14 · accuracy lies
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "The trap", title: "When accuracy lies: imbalanced data", pageNo: ++pn });
  s.addText("Breast cancer, malignant down-sampled to 19% (like fraud, churn, defects…). Test set is 81% benign.",
    { x: M, y: 1.95, w: W - 2 * M, h: 0.55, fontSize: 15.5, fontFace: FONT, color: C.TEXT, margin: 0 });
  L.compTable(s, pres, {
    x: M, y: 2.7, w: W - 2 * M, colW: [4.2, 2.6, 2.6, 2.63], fontSize: 14, rowH: 0.58,
    rows: [
      ["model", "accuracy", "recall (malignant)", "F1"],
      [{ t: "\"nobody is sick\" (Dummy most_frequent)", c: "9F1239" }, { t: "0.810", c: "9F1239", b: true }, { t: "0.000", c: "9F1239", b: true }, { t: "0.000", c: "9F1239", b: true }],
      ["KNN", "0.911", "0.867", "0.788"],
      [{ t: "RandomForest(class_weight=\"balanced\")", b: true }, { t: "0.937", b: true }, { t: "0.867", b: true }, { t: "0.839", b: true }],
    ],
  });
  L.bullets(s, [
    { t: "\"81% accurate\" while catching ZERO cancers", b: true, c: "9F1239" },
    "Accuracy answers the wrong question on imbalanced data",
    { t: "Fixes: right metric (recall/F1) · class_weight=\"balanced\" · move the threshold", b: true },
    { t: "AI assistants default to accuracy — YOU must ask for the right metric", c: "92400E", b: true },
  ], { x: M, y: 5.3, w: W - 2 * M, h: 1.35, size: 13.5, gap: 7 });
}

// 15 · baselines
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Reference point", title: "Always know the number to beat", pageNo: ++pn });
  L.compTable(s, pres, {
    x: M, y: 2.05, w: 7.6, colW: [3.4, 2.1, 2.1], fontSize: 13.5, rowH: 0.58,
    rows: [
      ["model (5-fold CV, breast cancer)", "accuracy", "ROC-AUC"],
      [{ t: "DummyClassifier (stratified)", c: C.MUTED }, "0.576", "0.536"],
      [{ t: "DummyClassifier (most_frequent)", c: C.MUTED }, "0.627", "0.500"],
      ["KNN (k=5)", "0.935", "0.966"],
      [{ t: "RandomForest", b: true }, { t: "0.956", b: true }, { t: "0.989", b: true }],
    ],
  });
  L.bullets(s, [
    { t: "Dummy = the stupidest model", b: true },
    "guessing at random, or always predicting the majority",
    "takes 2 lines, answers \"is my model even learning?\"",
    { t: "\"0.93 accuracy\" alone means nothing — 0.63 is free without any model", b: true, c: "9F1239" },
    { t: "Report every score next to its baseline", b: true, c: C.PRIMARY_DARK },
  ], { x: M, y: 5.35, w: 7.6, h: 1.4, size: 13.5, gap: 7 });
  L.card(s, pres, { x: 8.4, y: 2.05, w: W - 8.4 - M, h: 4.7, title: "The rule", body: "A model is only as good as its margin over a baseline.\n\nBaseline → simple model → tuned model.\nEach step must EARN its complexity.\n\n(Same philosophy as features in S03: measure, always.)", bodySize: 14.5 });
}

// 16 · comparing properly
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Method", title: "Comparing models the honest way", pageNo: ++pn });
  L.codeBlock(s, pres, { x: M, y: 2.0, w: 7.7, h: 3.2, size: 12.5, lines: [
    { t: "cv = StratifiedKFold(5, shuffle=True, random_state=42)" },
    { t: "" },
    { t: "for name, model in [(\"dummy\", DummyClassifier())," },
    { t: "                     (\"knn\",  KNeighborsClassifier())," },
    { t: "                     (\"rf\",   RandomForestClassifier())]:" },
    { t: "    acc = cross_val_score(model, X, y, cv=cv)" },
    { t: "    auc = cross_val_score(model, X, y, cv=cv," },
    { t: "                          scoring=\"roc_auc\")" },
    { t: "    print(name, acc.mean(), auc.mean())" },
  ]});
  L.bullets(s, [
    { t: "Three rules baked in:", b: true },
    "① same folds for every model (shared cv object) — fair fight",
    "② multiple metrics — accuracy AND AUC",
    "③ mean ± std over folds — report uncertainty",
    { t: "Bonus: keep the winning pipeline for S07 tuning", sub: true },
  ], { x: 8.4, y: 2.2, w: W - 8.4 - M, h: 3.4, size: 14, gap: 10 });
}

// 17 · the full protocol
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "The protocol", title: "Where every split lives (the rest of the course)", pageNo: ++pn });
  L.pipelineDiagram(s, pres, { x: M, y: 2.15, w: W - 2 * M, stages: [
    { t: "ALL DATA", d: "split ONCE, first thing" },
    { t: "TRAIN ~80%", d: "CV lives here: compare & tune" },
    { t: "TEST ~20%", d: "locked. touched ONCE at the end" },
  ]});
  L.card(s, pres, { x: M, y: 3.7, w: (W - 2 * M - 0.4) / 2, h: 2.5, title: "CV for decisions", body: "Which model? Which k? Which features? Which threshold?\n→ decide on CV scores over the training data.", bodySize: 14.5 });
  L.card(s, pres, { x: M + (W - 2 * M - 0.4) / 2 + 0.4, y: 3.7, w: (W - 2 * M - 0.4) / 2, h: 2.5, title: "Test for the final word", body: "After every decision is made: fit on train, score on test ONCE, report it.\nPeek twice and it's a training set in disguise.", bodySize: 14.5, tint: C.ACCENT_TINT, titleColor: "92400E" });
}

// 18 · cheat sheet
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Cheat sheet", title: "Which metric, one slide", pageNo: ++pn });
  L.compTable(s, pres, {
    x: M, y: 2.05, w: W - 2 * M, colW: [3.8, 2.85, 2.85, 2.7], fontSize: 13, rowH: 0.6,
    rows: [
      ["situation", "primary metric", "watch out", "in sklearn"],
      ["Balanced classification", "accuracy", "—", "accuracy_score"],
      ["Rare positive (fraud, churn, disease)", "recall / F1 / PR-AUC", { t: "accuracy lies", c: "9F1239" }, "recall_score, f1_score"],
      ["Alarms must be trustworthy", "precision", "recall may sink", "precision_score"],
      ["Ranking / scoring models", "ROC-AUC", "still check threshold", "roc_auc_score"],
      ["Regression, explainable", "MAE", "outliers unpunished", "mean_absolute_error"],
      ["Regression, big misses costly", "RMSE", "sensitive to outliers", "mean_squared_error"],
    ],
  });
  s.addText("classification_report(y_test, y_pred) prints precision · recall · F1 per class in one call.",
    { x: M, y: 6.35, w: W - 2 * M, h: 0.4, fontSize: 13, fontFace: FONT, color: C.MUTED, margin: 0 });
}

// 19 · Lab
L.labSlide(pres, {
  sessionTag: TAG, pageNo: ++pn, num: "04",
  title: "วัดให้จริง — Overfit, lottery และ metric ที่ถูกต้อง",
  goal: "Reproduce every experiment of today on real data: overfit curves, holdout instability, cross-validation, and the full metric toolbox.",
  tasks: [
    "breast cancer: เทรน KNN k=1 — เทียบ train vs test accuracy และอธิบายช่องว่าง",
    "วาดกราฟ train/test accuracy ของ DecisionTree ที่ max_depth 1,2,3,4,6,8,12 — หา sweet spot",
    "diabetes: รัน holdout 10 random_state ต่างกัน — ช่วง R² กว้างแค่ไหน? แล้วแก้ด้วย cross_val_score (report mean±std)",
    "เทียบ Dummy vs KNN vs RandomForest ด้วย StratifiedKFold เดียวกัน — accuracy + ROC-AUC",
    "อ่าน confusion matrix + precision/recall/F1/AUC ของ KNN แล้วตอบ: ถ้าเป็นหมอ ควรแลก precision กับ recall ยังไง",
  ],
  vibe: "ลองถาม AI: “โจทย์ของฉันคือตรวจมะเร็งจากข้อมูลที่ positive แค่ 19% — ควรใช้ metric อะไร และเพราะอะไร accuracy ถึงไม่ใช่คำตอบ” แล้วเทียบคำตอบกับ cheat sheet หน้าสุดท้าย",
});

// 20 · Takeaways
L.takeaways(pres, {
  sessionTag: TAG, pageNo: ++pn,
  items: [
    "Print train AND test scores: a big gap means memorization (KNN k=1: 1.00 train / 0.94 test).",
    "A single holdout score is noise — diabetes R² swung 0.36→0.59 across splits.",
    "k-fold CV turns noise into mean ± std; use StratifiedKFold for classification.",
    "Read the confusion matrix: precision guards false alarms, recall guards misses; imbalanced data makes accuracy a lie.",
    "Always compare against a Dummy baseline, on the same folds, with the metric that matches the business question.",
  ],
  nextTag: "Session 05", nextTitle: "Regression Models — opening the first black boxes",
});

L.save(pres, "D:/Repositories/AI_course_MasterDegree/slides/04 Model Evaluation and Cross-Validation.pptx").then(() => console.log("04 done"));
