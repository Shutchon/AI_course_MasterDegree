// Deck 03 — Feature Engineering & Pipelines
const L = require("./deck_lib");
const { C, FONT, MONO, W, H, M } = L;

const TAG = "SESSION 03";
const pres = L.deckInit("03 Feature Engineering & Pipelines");
let pn = 1;

// 1 · Title
L.titleSlide(pres, {
  num: "03",
  title: "Feature Engineering\n& Pipelines",
  subtitle: "Turn clean columns into model-ready numbers — and chain everything into leak-proof scikit-learn Pipelines.",
});
pn++;

// 2 · Agenda
L.agendaSlide(pres, {
  sessionTag: TAG, pageNo: ++pn,
  items: [
    { t: "Why models need numbers & scales", d: "the fare-vs-age problem" },
    { t: "Scaling", d: "Standard · MinMax · Robust" },
    { t: "Encoding categories", d: "OneHot vs Ordinal" },
    { t: "Feature engineering recipes", d: "bin, log, combine — then MEASURE" },
    { t: "Pipeline", d: "chain preprocessing + model" },
    { t: "ColumnTransformer", d: "different steps per column type" },
    { t: "Data leakage", d: "the silent score killer" },
  ],
});

// 3 · bridge
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "From last session", title: "Clean data is not model food (yet)", pageNo: ++pn });
  L.pipelineDiagram(s, pres, { x: M, y: 2.1, w: W - 2 * M, stages: [
    { t: "raw data", d: "S02 arrival" },
    { t: "clean data", d: "no missing, no dupes" },
    { t: "transformed", d: "numbers, sane scales — TODAY" },
    { t: "model-ready", d: "inside one Pipeline" },
  ]});
  const w = (W - 2 * M - 0.8) / 3, y = 3.9, h = 1.9;
  L.card(s, pres, { x: M, y, w, h, title: "Still text", body: "sex = \"female\"\nembarked = \"S\"\nModels: TypeError.", bodySize: 13.5 });
  L.card(s, pres, { x: M + w + 0.4, y, w, h, title: "Wildly different scales", body: "age 0–80 vs fare 0–512\nDistance-based models quietly break.", bodySize: 13.5 });
  L.card(s, pres, { x: M + 2 * (w + 0.4), y, w, h, title: "Manual transforms", body: "Applying them by hand, twice (train/test),\ninvites leakage. Enter Pipelines.", bodySize: 13.5, tint: C.ACCENT_TINT, titleColor: "92400E" });
}

// 4 · the scale problem
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Why scaling", title: "KNN is blind when one column shouts", pageNo: ++pn });
  // before/after numbers
  L.bigStat(s, { x: M + 0.6, y: 2.3, w: 3.6, value: "0.67", label: "KNN accuracy\nfare & age unscaled", size: 66, color: "E11D48" });
  L.bigStat(s, { x: M + 5.2, y: 2.3, w: 3.6, value: "0.82", label: "same KNN, same data\nafter StandardScaler", size: 66, color: C.PRIMARY });
  L.bullets(s, [
    { t: "Why: KNN measures distance", b: true },
    "Δfare can be 500 · Δage at most 80",
    "fare drowns every other signal",
    "Same story for SVM, K-Means, PCA",
    { t: "+15 points for free — just rescaling", b: true, c: C.PRIMARY_DARK },
  ], { x: 9.6, y: 2.4, w: W - 9.6 - M, h: 3.2, size: 14.5, gap: 10 });
  s.addText("Trees (DecisionTree, RandomForest) split one feature at a time — scaling changes nothing for them.",
    { x: M, y: 5.55, w: W - 2 * M, h: 0.45, fontSize: 14, fontFace: FONT, color: C.MUTED, margin: 0 });
}

// 4b · scaling, visually
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Why scaling", title: "Scaling, visually — before & after", pageNo: ++pn });
  s.addImage({ path: "D:/Repositories/AI_course_MasterDegree/assets/figures/img_scaling.png", x: M, y: 2.05, w: 8.4, h: 4.3 });
  L.bullets(s, [
    { t: "Left: raw Titanic age × fare", b: true },
    "fare's 0–512 range crushes the picture",
    { t: "Right: after StandardScaler", b: true },
    "both features: mean 0, spread ±2 — equal footing",
    { t: "Same data, same KNN: 0.67 → 0.82", c: C.PRIMARY_DARK, b: true },
  ], { x: 9.15, y: 2.3, w: W - 9.15 - M, h: 3.6, size: 13.5, gap: 10 });
}

// 5 · scalers
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Scaling", title: "Three scalers you'll actually use", pageNo: ++pn });
  L.compTable(s, pres, {
    x: M, y: 2.0, w: 7.7, colW: [1.9, 2.9, 2.9], fontSize: 12.5, rowH: 0.52,
    rows: [
      ["scaler", "formula (idea)", "use when"],
      [{ t: "StandardScaler", b: true }, "center to mean 0, std 1", "default first choice"],
      [{ t: "MinMaxScaler", b: true }, "squash to [0, 1]", "need a bounded range (NN, images)"],
      [{ t: "RobustScaler", b: true }, "center by MEDIAN, scale by IQR", "heavy outliers (fare!)"],
    ],
  });
  L.codeBlock(s, pres, { x: M, y: 4.85, w: 7.7, h: 1.7, size: 13, lines: [
    { t: "from sklearn.preprocessing import StandardScaler" },
    { t: "scaler = StandardScaler()" },
    { t: "X_train_s = scaler.fit_transform(X_train[num])   # learns train stats" },
    { t: "X_test_s  = scaler.transform(X_test[num])       # reuses them" },
  ]});
  L.bullets(s, [
    { t: "fit_transform on TRAIN", b: true, c: C.PRIMARY_DARK },
    { t: "transform on TEST", b: true, c: C.PRIMARY_DARK },
    "never fit on the test set!",
    { t: "(we'll automate this discipline with Pipelines in a few slides)", sub: true },
  ], { x: 8.4, y: 2.2, w: W - 8.4 - M, h: 3.2, size: 14, gap: 10 });
}

// 6 · which models need scaling
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Scaling", title: "Who needs scaling? A field guide", pageNo: ++pn });
  const w = (W - 2 * M - 0.4) / 2;
  L.card(s, pres, { x: M, y: 2.05, w, h: 3.6, title: "Scale-sensitive", body: "KNN — pure distance\nSVM (RBF) — distance in kernel space\nPCA — variance-based\nLinear/Ridge/Lasso — coefficient penalties assume comparable scales\nNeural nets — optimizers behave badly on wild scales\n\n→ always scale these", bodySize: 14 });
  L.card(s, pres, { x: M + w + 0.4, y: 2.05, w, h: 3.6, title: "Scale-indifferent", body: "DecisionTree — thresholds per feature\nRandomForest — many trees\nGradientBoosting — trees inside\n\n→ scaling optional (harmless, but no gain)\n\nPractical rule: put scaling in the Pipeline anyway. It costs nothing and protects the model you swap in later.", bodySize: 14 });
}

// 7 · encoding intro
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Encoding", title: "Categories → numbers: two doors", pageNo: ++pn });
  // one-hot diagram
  s.addText("ONE-HOT — one column per category", { x: M, y: 2.0, w: 6.0, h: 0.35, fontSize: 13, fontFace: FONT, bold: true, color: C.PRIMARY_DARK, margin: 0 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: M, y: 2.45, w: 0.9, h: 0.5, rectRadius: 0.05, fill: { color: C.PRIMARY_TINT }, line: { color: "FFFFFF", width: 0 } });
  s.addText("embarked", { x: M, y: 2.45, w: 0.9, h: 0.5, fontSize: 9, fontFace: FONT, color: C.PRIMARY_DARK, align: "center", valign: "middle", margin: 0 });
  s.addText("→", { x: M + 0.95, y: 2.55, w: 0.4, h: 0.3, fontSize: 14, fontFace: FONT, color: C.MUTED, align: "center", margin: 0 });
  ["S", "C", "Q"].forEach((c, i) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: M + 1.4 + i * 0.75, y: 2.45, w: 0.65, h: 0.5, rectRadius: 0.05, fill: { color: C.PRIMARY }, line: { color: "FFFFFF", width: 0 } });
    s.addText(c, { x: M + 1.4 + i * 0.75, y: 2.45, w: 0.65, h: 0.5, fontSize: 10, fontFace: FONT, bold: true, color: "FFFFFF", align: "center", valign: "middle", margin: 0 });
  });
  s.addText("no fake order invented · grows wide with many categories", { x: M, y: 3.1, w: 6.2, h: 0.35, fontSize: 11.5, fontFace: FONT, color: C.MUTED, margin: 0 });
  // ordinal diagram
  s.addText("ORDINAL — one column, ordered ints", { x: M, y: 3.75, w: 6.0, h: 0.35, fontSize: 13, fontFace: FONT, bold: true, color: "92400E", margin: 0 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: M, y: 4.2, w: 0.9, h: 0.5, rectRadius: 0.05, fill: { color: C.ACCENT_TINT }, line: { color: "FFFFFF", width: 0 } });
  s.addText("size", { x: M, y: 4.2, w: 0.9, h: 0.5, fontSize: 9, fontFace: FONT, color: "92400E", align: "center", valign: "middle", margin: 0 });
  s.addText("→", { x: M + 0.95, y: 4.3, w: 0.4, h: 0.3, fontSize: 14, fontFace: FONT, color: C.MUTED, align: "center", margin: 0 });
  ["small 0", "med 1", "large 2"].forEach((c, i) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: M + 1.4 + i * 0.98, y: 4.2, w: 0.9, h: 0.5, rectRadius: 0.05, fill: { color: C.ACCENT }, line: { color: "FFFFFF", width: 0 } });
    s.addText(c, { x: M + 1.4 + i * 0.98, y: 4.2, w: 0.9, h: 0.5, fontSize: 9, fontFace: FONT, bold: true, color: "7C2D12", align: "center", valign: "middle", margin: 0 });
  });
  s.addText("only when an order truly exists (size, rating, education)", { x: M, y: 4.85, w: 6.2, h: 0.35, fontSize: 11.5, fontFace: FONT, color: C.MUTED, margin: 0 });
  L.bullets(s, [
    { t: "Which door?", b: true },
    "order exists → OrdinalEncoder",
    "no order → OneHotEncoder",
    { t: "sex, embarked → one-hot\npclass → already ordered ints", b: true, c: C.PRIMARY_DARK },
    { t: "Danger: encoding \"female\"=1 \"male\"=0 with a LINEAR model is fine, but \"city\": Bangkok=1, ChiangMai=2, Phuket=3 invents a fake order", c: "9F1239" },
  ], { x: 7.4, y: 2.15, w: W - 7.4 - M, h: 4.2, size: 14, gap: 11 });
}

// 8 · onehot code
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Encoding", title: "OneHotEncoder in action", pageNo: ++pn });
  L.codeBlock(s, pres, { x: M, y: 2.0, w: 7.6, h: 2.6, size: 13, lines: [
    { t: "from sklearn.preprocessing import OneHotEncoder" },
    { t: "oh = OneHotEncoder(handle_unknown=\"ignore\")" },
    { t: "oh.fit_transform(X_train[[\"sex\", \"embarked\"]]).toarray()" },
  ]});
  L.compTable(s, pres, {
    x: M, y: 5.0, w: 7.6, colW: [1.3, 1.3, 1.1, 1.1, 1.1, 1.1], fontSize: 11.5, rowH: 0.4,
    rows: [
      ["sex_F", "sex_M", "emb_S", "emb_C", "emb_Q", "…"],
      ["1", "0", "1", "0", "0", ""],
      ["0", "1", "0", "1", "0", ""],
    ],
  });
  L.bullets(s, [
    { t: "handle_unknown=\"ignore\"", b: true },
    "at deploy time a NEW category appears → all-zeros row, no crash",
    { t: "Sparse output", b: true },
    "fit_transform returns a sparse matrix (mostly zeros) — memory-friendly",
    { t: "1000 categories? 1000 columns. High cardinality needs other tricks (group rare, hashing) — beyond today.", sub: true },
  ], { x: 8.3, y: 2.2, w: W - 8.3 - M, h: 4.0, size: 13.5, gap: 10 });
}

// 9 · FE recipes
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Feature engineering", title: "Recipes that earn their keep", pageNo: ++pn });
  const y = 2.0, h = 1.75, w = (W - 2 * M - 1.2) / 4;
  L.card(s, pres, { x: M, y, w, h, title: "Bin", body: "age → is_child (age<12)\ncontinuous → flag or band\n(\"women and children first\")", bodySize: 12.5 });
  L.card(s, pres, { x: M + (w + 0.4), y, w, h, title: "Log-transform", body: "fare_log = log1p(fare)\ntames skew 4.8 → ~0.5\nhelps linear & distance models", bodySize: 12.5 });
  L.card(s, pres, { x: M + 2 * (w + 0.4), y, w, h, title: "Combine", body: "family_size = sibsp + parch + 1\nlonely traveler vs big family —\nits own survival pattern", bodySize: 12.5 });
  L.card(s, pres, { x: M + 3 * (w + 0.4), y, w, h, title: "Ratio", body: "fare_per_person = fare / family_size\nprices normalized by group size\n(fees, spend per tenure…)", bodySize: 12.5 });
  L.codeBlock(s, pres, { x: M, y: 4.15, w: 7.6, h: 2.15, size: 13, lines: [
    { t: "X = df.drop(columns=\"survived\")" },
    { t: "X[\"family_size\"] = X[\"sibsp\"] + X[\"parch\"] + 1" },
    { t: "X[\"is_child\"]    = (X[\"age\"] < 12).astype(float)" },
    { t: "X[\"fare_log\"]    = np.log1p(X[\"fare\"])" },
  ]});
  L.bullets(s, [
    { t: "Then MEASURE", b: true, c: "92400E" },
    "KNN 5-fold CV: 0.809 → 0.819 ✓ small win",
    "RandomForest: 0.807 → 0.801 ✗ no gain",
    { t: "Features must EARN their place — keep only what measurably helps", b: true, c: C.PRIMARY_DARK },
  ], { x: 8.3, y: 4.25, w: W - 8.3 - M, h: 2.1, size: 13.5, gap: 9 });
}

// 10 · the manual pain
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "The problem", title: "Doing it by hand — the bookkeeping trap", pageNo: ++pn });
  L.codeBlock(s, pres, { x: M, y: 2.0, w: 7.4, h: 3.6, size: 12.5, lines: [
    { t: "# manual way: 9 fiddly steps, every single time" },
    { t: "imp_num = SimpleImputer(...).fit(X_train[num])" },
    { t: "Xtr_num = imp_num.transform(X_train[num])" },
    { t: "Xte_num = imp_num.transform(X_test[num])" },
    { t: "scaler  = StandardScaler().fit(Xtr_num)" },
    { t: "Xtr_num = scaler.transform(Xtr_num)" },
    { t: "Xte_num = scaler.transform(Xte_num)" },
    { t: "oh      = OneHotEncoder(...).fit(X_train[cat])" },
    { t: "Xtr_cat = oh.transform(X_train[cat]).toarray()" },
    { t: "Xte_cat = oh.transform(X_test[cat]).toarray()" },
    { t: "X_train2 = np.hstack([Xtr_num, Xtr_cat])   # never again" },
  ]});
  L.bullets(s, [
    { t: "Three failure modes:", b: true },
    "① forget a transform on test → crash or garbage",
    "② accidentally fit on test → leakage",
    "③ new data at deploy → re-do the whole dance",
    { t: "sklearn's answer: Pipeline + ColumnTransformer — next", b: true, c: C.PRIMARY_DARK },
  ], { x: 8.1, y: 2.2, w: W - 8.1 - M, h: 3.6, size: 14.5, gap: 11 });
}

// 11 · Pipeline concept
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "★ The big idea", title: "Pipeline: one object, all steps", pageNo: ++pn });
  L.pipelineDiagram(s, pres, { x: M, y: 2.05, w: W - 2 * M, stages: [
    { t: "raw columns", d: "mixed types, missing" },
    { t: "imputer", d: "fill missing" },
    { t: "scaler / encoder", d: "make numbers sane" },
    { t: "model", d: "fit + predict" },
  ]});
  L.codeBlock(s, pres, { x: M, y: 3.5, w: 7.6, h: 1.5, size: 13, lines: [
    { t: "from sklearn.pipeline import Pipeline" },
    { t: "pipe = Pipeline([(\"imp\", SimpleImputer())," },
    { t: "                  (\"sc\",  StandardScaler())])" },
  ]});
  L.bullets(s, [
    { t: "pipe.fit(X_train, y_train)", b: true },
    "runs imp.fit_transform → sc.fit_transform in order",
    { t: "pipe.transform(X_test)", b: true },
    "runs imp.transform → sc.transform (learned stats reused)",
    { t: "With a model inside: fit / predict / score — one call each", c: C.PRIMARY_DARK, b: true },
  ], { x: M, y: 5.15, w: W - 2 * M, h: 1.6, size: 14.5, gap: 8 });
}

// 12 · ColumnTransformer
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "★ The big idea", title: "ColumnTransformer: different food per column", pageNo: ++pn });
  // diagram: two branches merging
  const bx = M, bw = 7.6;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx, y: 2.1, w: 1.5, h: 0.85, rectRadius: 0.07, fill: { color: C.PRIMARY_TINT }, line: { color: "FFFFFF", width: 0 } });
  s.addText("numeric\ncolumns", { x: bx, y: 2.1, w: 1.5, h: 0.85, fontSize: 12, fontFace: FONT, bold: true, color: C.PRIMARY_DARK, align: "center", valign: "middle", margin: 0 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx, y: 3.55, w: 1.5, h: 0.85, rectRadius: 0.07, fill: { color: C.ACCENT_TINT }, line: { color: "FFFFFF", width: 0 } });
  s.addText("categorical\ncolumns", { x: bx, y: 3.55, w: 1.5, h: 0.85, fontSize: 12, fontFace: FONT, bold: true, color: "92400E", align: "center", valign: "middle", margin: 0 });
  s.addText("→", { x: bx + 1.55, y: 2.4, w: 0.4, h: 0.3, fontSize: 16, fontFace: FONT, color: C.MUTED, align: "center", margin: 0 });
  s.addText("→", { x: bx + 1.55, y: 3.85, w: 0.4, h: 0.3, fontSize: 16, fontFace: FONT, color: C.MUTED, align: "center", margin: 0 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx + 2.0, y: 2.1, w: 2.6, h: 0.85, rectRadius: 0.07, fill: { color: C.PRIMARY }, line: { color: "FFFFFF", width: 0 } });
  s.addText("median impute\n+ StandardScaler", { x: bx + 2.0, y: 2.1, w: 2.6, h: 0.85, fontSize: 12, fontFace: FONT, color: "FFFFFF", align: "center", valign: "middle", margin: 0 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx + 2.0, y: 3.55, w: 2.6, h: 0.85, rectRadius: 0.07, fill: { color: C.ACCENT }, line: { color: "FFFFFF", width: 0 } });
  s.addText("mode impute\n+ OneHotEncoder", { x: bx + 2.0, y: 3.55, w: 2.6, h: 0.85, fontSize: 12, fontFace: FONT, color: "7C2D12", align: "center", valign: "middle", margin: 0 });
  s.addText("→", { x: bx + 4.65, y: 2.4, w: 0.4, h: 0.3, fontSize: 16, fontFace: FONT, color: C.MUTED, align: "center", margin: 0 });
  s.addText("→", { x: bx + 4.65, y: 3.85, w: 0.4, h: 0.3, fontSize: 16, fontFace: FONT, color: C.MUTED, align: "center", margin: 0 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx + 5.1, y: 2.8, w: 2.3, h: 0.9, rectRadius: 0.07, fill: { color: C.PRIMARY_DARK }, line: { color: "FFFFFF", width: 0 } });
  s.addText("concat →\nmodel-ready matrix", { x: bx + 5.1, y: 2.8, w: 2.3, h: 0.9, fontSize: 12, fontFace: FONT, bold: true, color: "FFFFFF", align: "center", valign: "middle", margin: 0 });
  L.codeBlock(s, pres, { x: M, y: 4.75, w: 7.6, h: 1.7, size: 12.5, lines: [
    { t: "pre = ColumnTransformer([" },
    { t: "    (\"num\", num_pipe,        [\"age\",\"fare\",\"sibsp\",\"parch\",\"pclass\"])," },
    { t: "    (\"cat\", cat_pipe,        [\"sex\",\"embarked\"])])" },
  ]});
  L.bullets(s, [
    { t: "Columns not listed? By default they pass through untouched (or set remainder=\"drop\")", sub: true },
    { t: "This one object replaces ALL the manual bookkeeping", b: true, c: C.PRIMARY_DARK },
  ], { x: 8.3, y: 2.3, w: W - 8.3 - M, h: 3.6, size: 14, gap: 12 });
}

// 13 · full template
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "★ The template", title: "The 15-line template you'll reuse forever", pageNo: ++pn });
  L.codeBlock(s, pres, { x: M, y: 1.95, w: 8.2, h: 4.0, size: 12.5, lines: [
    { t: "num_pipe = Pipeline([(\"imp\", SimpleImputer(strategy=\"median\"))," },
    { t: "                     (\"sc\",  StandardScaler())])" },
    { t: "cat_pipe = Pipeline([(\"imp\", SimpleImputer(strategy=\"most_frequent\"))," },
    { t: "                     (\"oh\",  OneHotEncoder(handle_unknown=\"ignore\"))])" },
    { t: "pre = ColumnTransformer([(\"num\", num_pipe, num_cols)," },
    { t: "                         (\"cat\", cat_pipe, cat_cols)])" },
    { t: "" },
    { t: "clf = Pipeline([(\"pre\", pre)," },
    { t: "                (\"model\", KNeighborsClassifier())])" },
    { t: "" },
    { t: "clf.fit(X_train, y_train)" },
    { t: "clf.score(X_test, y_test)          # 0.816 — everything inside" },
  ]});
  L.bullets(s, [
    { t: "Swap the model", b: true },
    "KNeighborsClassifier() →\nLogisticRegression() →\nRandomForestClassifier()",
    { t: "…the 15 lines don't change", b: true, c: C.PRIMARY_DARK },
    { t: "Save clf with joblib → load in production → feed raw rows. Same result.", sub: true },
  ], { x: 9.0, y: 2.15, w: W - 9.0 - M, h: 3.8, size: 14, gap: 11 });
}

// 14 · fit on train only
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Guarantee", title: "Inside clf.fit(): train-only discipline for free", pageNo: ++pn });
  L.pipelineDiagram(s, pres, { x: M, y: 2.1, w: W - 2 * M, stages: [
    { t: "clf.fit(X_train, y_train)", d: "the only fit() you call" },
    { t: "pre fits on TRAIN only", d: "median, std, categories" },
    { t: "model learns", d: "on transformed train" },
  ]});
  L.pipelineDiagram(s, pres, { x: M, y: 3.4, w: W - 2 * M, stages: [
    { t: "clf.predict(X_new)", d: "raw new data" },
    { t: "pre.transform()", d: "reuses TRAIN stats" },
    { t: "model.predict()", d: "done" },
  ]});
  L.card(s, pres, { x: M, y: 4.8, w: W - 2 * M, h: 1.6, title: "Why this matters", body: "Every statistic (imputation values, scaling mean/std, one-hot columns) is learned from TRAINING data only, then merely applied to test/future data. That discipline is exactly what the manual way keeps getting wrong.", bodySize: 14.5 });
}

// 15 · leakage definition
{
  const s = pres.addSlide();
  s.background = { color: C.BG_DARK };
  s.addText("DATA LEAKAGE", { x: M, y: 1.3, w: W - 2 * M, h: 0.4, fontSize: 14, fontFace: FONT, bold: true, color: C.ACCENT, charSpacing: 3, align: "center", margin: 0 });
  s.addText("When information from OUTSIDE the training set\n— usually from the future or from the target itself —\n sneaks into your model.",
    { x: 1.1, y: 2.1, w: W - 2.2, h: 1.9, fontSize: 25, fontFace: FONT, italic: true, color: C.ON_DARK, align: "center", margin: 0 });
  s.addText("The score looks amazing. The deployed model is useless.",
    { x: 1.1, y: 4.35, w: W - 2.2, h: 0.5, fontSize: 17, fontFace: FONT, bold: true, color: "FCD34D", align: "center", margin: 0 });
  s.addText("It is the #1 silent killer of real-world ML projects — and AI assistants generate it happily.",
    { x: 1.1, y: 5.15, w: W - 2.2, h: 0.5, fontSize: 14, fontFace: FONT, color: C.MUTED_DARK, align: "center", margin: 0 });
  L.footerDark(s, ++pn, TAG);
}

// 16 · leakage demo
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Leakage", title: "Watch a leak happen — \"lucky_ticket\"", pageNo: ++pn });
  s.addText("We invent a column that secretly knows the answer (85% of the time) — like using next month's refund record to predict this month's churn.",
    { x: M, y: 1.95, w: W - 2 * M, h: 0.75, fontSize: 15.5, fontFace: FONT, color: C.TEXT, margin: 0 });
  L.bigStat(s, { x: M + 0.6, y: 3.0, w: 3.6, value: "0.804", label: "LogisticRegression\nhonest features", size: 60 });
  L.bigStat(s, { x: M + 5.0, y: 3.0, w: 3.6, value: "0.860", label: "same model + lucky_ticket\n+5.6 pts of pure illusion", size: 60, color: "E11D48" });
  L.bullets(s, [
    { t: "In real projects the leak is rarely this obvious", b: true },
    "\"days_since_last_complaint\" for churn — filed AFTER cancelling?",
    "\"total_billed\" including the refund after churn",
    { t: "Ask of every column: WHEN was this value known?", c: "9F1239", b: true },
  ], { x: 9.7, y: 3.1, w: W - 9.7 - M, h: 2.8, size: 13, gap: 9 });
}

// 17 · leakage gallery
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Leakage", title: "The five usual suspects", pageNo: ++pn });
  const y0 = 2.0, rh = 0.92;
  const rows = [
    ["Scaler / imputer fit on ALL rows", "test statistics bleed into training", "Pipeline (fit inside)"],
    ["Target-derived feature", "lucky_ticket, post-outcome fields", "ask WHEN the value existed"],
    ["Duplicates across the split", "model examined the exam in advance", "drop_duplicates first"],
    ["Group-aware splits", "same patient/user in train AND test", "GroupSplit (advanced)"],
    ["Tuning on the test set", "repeated peeking = soft memorization", "CV for tuning, test ONCE (S04)"],
  ];
  L.compTable(s, pres, {
    x: M, y: y0, w: W - 2 * M, colW: [3.7, 4.0, 3.93], fontSize: 13, rowH: rh * 0.55,
    rows: [["suspect", "how it leaks", "defense"], ...rows],
  });
  s.addText("Defense in one line: split FIRST, transform INSIDE a Pipeline, touch the test set exactly once.",
    { x: M, y: 6.2, w: W - 2 * M, h: 0.45, fontSize: 15, fontFace: FONT, bold: true, color: C.PRIMARY_DARK, margin: 0 });
}

// 18 · unseen categories
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Production reality", title: "Monday morning: a category you never trained on", pageNo: ++pn });
  L.codeBlock(s, pres, { x: M, y: 2.0, w: 7.6, h: 2.6, size: 12.5, lines: [
    { t: "# training data had embarked: S, C, Q" },
    { t: "# ...then a passenger boards at \"B\" (new port)" },
    { t: "clf.predict(pd.DataFrame({\"embarked\": [\"B\"], ...}))" },
    { t: "" },
    { t: "# OneHotEncoder(handle_unknown=\"ignore\")  -> all-zero row, no crash" },
    { t: "# default (error)                          -> ValueError 💥" },
  ]});
  L.bullets(s, [
    { t: "Models meet data you never saw", b: true },
    "new category, new range, new missing column",
    { t: "handle_unknown=\"ignore\" is your seatbelt", b: true, c: C.PRIMARY_DARK },
    "Also from S02: SimpleImputer learned on train fills future NaNs",
    { t: "Everything is consistent because it all lives in ONE fitted object", sub: true },
  ], { x: 8.3, y: 2.2, w: W - 8.3 - M, h: 3.8, size: 14, gap: 10 });
}

// 19 · recap rules
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Recap", title: "The four golden rules of preparation", pageNo: ++pn });
  const y = 2.05, h = 2.35, w = (W - 2 * M - 1.2) / 4;
  L.card(s, pres, { x: M, y, w, h, title: "1 · Split FIRST", body: "Before any statistic touches any column.\n\nfit() must never see test rows — not even one.", bodySize: 13.5, tint: C.ACCENT_TINT, titleColor: "92400E", titleSize: 17 });
  L.card(s, pres, { x: M + (w + 0.4), y, w, h, title: "2 · Transform INSIDE", body: "Imputers, scalers, encoders live in the Pipeline — fitted on train, applied everywhere.", bodySize: 13.5, tint: C.ACCENT_TINT, titleColor: "92400E", titleSize: 17 });
  L.card(s, pres, { x: M + 2 * (w + 0.4), y, w, h, title: "3 · Ask WHEN", body: "Every feature must be knowable at prediction time.\n\nPost-outcome data = leak.", bodySize: 13.5, tint: C.ACCENT_TINT, titleColor: "92400E", titleSize: 17 });
  L.card(s, pres, { x: M + 3 * (w + 0.4), y, w, h, title: "4 · MEASURE", body: "New feature or transform? Compare scores.\n\nKeep only what earns its place.", bodySize: 13.5, tint: C.ACCENT_TINT, titleColor: "92400E", titleSize: 17 });
  // mantra band
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: M, y: 4.85, w: W - 2 * M, h: 1.25, rectRadius: 0.1, fill: { color: C.BG_DARK }, line: { color: C.BG_DARK, width: 0 } });
  s.addText("Split first.  Transform inside.  Ask WHEN.  Measure.", { x: M, y: 4.85, w: W - 2 * M, h: 1.25, fontSize: 26, fontFace: FONT, bold: true, color: C.ON_DARK, align: "center", valign: "middle", margin: 0 });
  s.addText("Tape these four to your monitor — they prevent 90% of real-world ML accidents.", { x: M, y: 6.3, w: W - 2 * M, h: 0.4, fontSize: 13, fontFace: FONT, italic: true, color: C.MUTED, align: "center", margin: 0 });
}

// 20 · Lab
L.labSlide(pres, {
  sessionTag: TAG, pageNo: ++pn, num: "03",
  title: "สร้าง Pipeline กันโปร่งใส — Titanic, leak-free",
  goal: "Build the full ColumnTransformer + Pipeline stack on Titanic, prove scaling matters, and feel a leakage illusion first-hand.",
  tasks: [
    "แบ่ง train/test 80:20 (stratify=y, random_state=42) ก่อนทำอะไรอื่น",
    "สร้าง num_pipe + cat_pipe + ColumnTransformer + KNN ใน Pipeline เดียว",
    "เทียบคะแนนแบบใส่/ไม่ใส่ StandardScaler — ต่างกันเท่าไหร่?",
    "เพิ่ม family_size และ is_child แล้ววัดว่าดีขึ้นจริงไหม",
    "โจทย์ชวนคิด: สร้างคอลัมน์ lucky_ticket (ทอยเหรียญแฟน target) แล้วดูคะแนนบวม จากนั้นลบทิ้งและอธิบายว่าทำไม",
  ],
  vibe: "ลองถาม AI: “เขียน ColumnTransformer ที่คอลัมน์ตัวเลขใช้ median+StandardScaler แต่คอลัมน์ category ใช้ most_frequent+OneHot” แล้วเช็กว่ามัน fit บน train เท่านั้นจริงไหม — นี่คือจุดที่ AI มักพลาด",
});

// 21 · Takeaways
L.takeaways(pres, {
  sessionTag: TAG, pageNo: ++pn,
  items: [
    "Scale-sensitive models (KNN, SVM, PCA) need comparable feature ranges — Titanic KNN jumped 0.67 → 0.82.",
    "Encode categories honestly: one-hot when unordered, ordinal only when order truly exists.",
    "Engineer features (bin, log, combine) — then MEASURE; they must earn their place.",
    "ColumnTransformer + Pipeline = one object, train-only statistics, model-swappable, deploy-ready.",
    "Leakage = future/target information in features. Split first, transform inside, ask WHEN each value existed.",
  ],
  nextTag: "Session 04", nextTitle: "Model Evaluation & Cross-Validation — can you trust that number?",
});

L.save(pres, "D:/Repositories/AI_course_MasterDegree/slides/03 Feature Engineering and Pipelines.pptx").then(() => console.log("03 done"));
