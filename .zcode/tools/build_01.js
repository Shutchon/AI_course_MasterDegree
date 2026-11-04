// Deck 01 — Introduction to Machine Learning
const L = require("./deck_lib");
const { C, FONT, MONO, W, H, M } = L;

const TAG = "SESSION 01";
const pres = L.deckInit("01 Introduction to Machine Learning");
let pn = 1;

// 1 · Title
L.titleSlide(pres, {
  num: "01",
  title: "Introduction to\nMachine Learning",
  subtitle: "What ML is, how it differs from classic programming, and your first model in five lines of scikit-learn.",
});
pn++;

// 2 · Agenda
L.agendaSlide(pres, {
  sessionTag: TAG, pageNo: ++pn,
  items: [
    { t: "Why machine learning?", d: "Problems rules can't solve" },
    { t: "ML vs classic programming", d: "A different deal with the machine" },
    { t: "AI vs ML vs Deep Learning", d: "The map of the territory" },
    { t: "Three families of ML", d: "supervised · unsupervised · reinforcement" },
    { t: "The ML workflow", d: "From question to deployed model" },
    { t: "scikit-learn & the estimator API", d: "fit / predict / transform" },
    { t: "First model in 5 lines", d: "iris + KNeighborsClassifier" },
    { t: "Vibe coding for ML", d: "prompting AI assistants well" },
  ],
});

// 3 · Why ML
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Motivation", title: "Why machine learning?", pageNo: ++pn });
  s.addText("Some problems are easy for humans, hopeless for hand-written rules.",
    { x: M, y: 1.95, w: W - 2 * M, h: 0.6, fontSize: 19, fontFace: FONT, color: C.TEXT, margin: 0 });
  const y = 2.75, w = (W - 2 * M - 0.8) / 3, h = 2.5;
  L.card(s, pres, { x: M, y, w, h, title: "Spam filter", body: "Write rules for every scam email? Scammers adapt overnight. Gmail learns from millions of labeled examples instead.", bodySize: 13.5 });
  L.card(s, pres, { x: M + w + 0.4, y, w, h, title: "Will this customer churn?", body: "Hundreds of interacting signals — tenure, contract, complaints, charges. No human can write that rule book.", bodySize: 13.5 });
  L.card(s, pres, { x: M + 2 * (w + 0.4), y, w, h, title: "Cat or dog?", body: "You recognize them instantly, but can you write down how? This is the classic 'Polanyi's paradox'.", bodySize: 13.5 });
  s.addText("Common thread: we can't specify the rules — but we have many examples of the answers.",
    { x: M, y: 5.65, w: W - 2 * M, h: 0.5, fontSize: 16, fontFace: FONT, bold: true, color: C.PRIMARY_DARK, margin: 0 });
}

// 4 · ML vs classic programming
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "The core idea", title: "Classic programming vs machine learning", pageNo: ++pn });
  // left: classic
  s.addText("CLASSIC PROGRAMMING", { x: M, y: 2.0, w: 5.8, h: 0.35, fontSize: 13, fontFace: FONT, bold: true, color: C.MUTED, charSpacing: 2, margin: 0 });
  L.pipelineDiagram(s, pres, { x: M, y: 2.45, w: 5.9, stages: [{ t: "Rules", d: "written by you" }, { t: "+ Data", d: "" }, { t: "= Answers", d: "" }] });
  // right: ML
  s.addText("MACHINE LEARNING", { x: 7.0, y: 2.0, w: 5.8, h: 0.35, fontSize: 13, fontFace: FONT, bold: true, color: C.PRIMARY, charSpacing: 2, margin: 0 });
  L.pipelineDiagram(s, pres, { x: 7.0, y: 2.45, w: 5.78, stages: [{ t: "Data", d: "" }, { t: "+ Answers", d: "labels" }, { t: "= Rules", d: "the model" }] });
  L.card(s, pres, { x: M, y: 3.9, w: W - 2 * M, h: 1.85,
    title: "We flip the arrow: instead of writing rules, we learn them from examples",
    body: "A spam filter trained on 1M emails labeled “spam / not spam” produces a model — a compressed form of the rules. New email arrives → model predicts. You never wrote a single rule.", bodySize: 15 });
}

// 5 · Definition
{
  const s = pres.addSlide();
  s.background = { color: C.BG_DARK };
  s.addText("WHAT IS MACHINE LEARNING?", { x: M, y: 1.5, w: W - 2 * M, h: 0.4, fontSize: 14, fontFace: FONT, bold: true, color: C.ACCENT, charSpacing: 3, align: "center", margin: 0 });
  s.addText("“A computer program is said to learn from experience E, if its performance at task T,\nmeasured by performance P, improves with E.”",
    { x: 1.1, y: 2.5, w: W - 2.2, h: 1.8, fontSize: 26, fontFace: FONT, italic: true, color: C.ON_DARK, align: "center", margin: 0 });
  s.addText("— Tom Mitchell, Machine Learning (1997)",
    { x: 1.1, y: 4.4, w: W - 2.2, h: 0.45, fontSize: 15, fontFace: FONT, color: C.MUTED_DARK, align: "center", margin: 0 });
  s.addText("spam filter:   T = classify emails · E = past labeled emails · P = % correctly classified",
    { x: 1.1, y: 5.35, w: W - 2.2, h: 0.5, fontSize: 15, fontFace: MONO, color: "7DD3C0", align: "center", margin: 0 });
  L.footerDark(s, ++pn, TAG);
}

// 6 · AI vs ML vs DL
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "The map", title: "AI ⊃ ML ⊃ Deep Learning", pageNo: ++pn });
  // nested boxes
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: M, y: 2.0, w: 7.9, h: 4.3, rectRadius: 0.12, fill: { color: C.PANEL }, line: { color: "CBD5E1", width: 1 } });
  s.addText("ARTIFICIAL INTELLIGENCE — machines doing “smart” things (1950s→)", { x: M + 0.25, y: 2.2, w: 7.4, h: 0.35, fontSize: 12.5, fontFace: FONT, bold: true, color: C.MUTED, margin: 0 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: M + 0.35, y: 2.75, w: 7.2, h: 3.3, rectRadius: 0.12, fill: { color: C.PRIMARY_TINT }, line: { color: "FFFFFF", width: 0 } });
  s.addText("MACHINE LEARNING — learning rules from data (1980s→)", { x: M + 0.6, y: 2.95, w: 6.6, h: 0.35, fontSize: 12.5, fontFace: FONT, bold: true, color: C.PRIMARY_DARK, margin: 0 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: M + 0.7, y: 3.5, w: 6.5, h: 2.25, rectRadius: 0.12, fill: { color: C.PRIMARY }, line: { color: "FFFFFF", width: 0 } });
  s.addText("DEEP LEARNING — learning with multi-layer neural networks (2012→)", { x: M + 0.95, y: 3.7, w: 6.0, h: 0.35, fontSize: 12.5, fontFace: FONT, bold: true, color: "FFFFFF", margin: 0 });
  s.addText("image & speech recognition · LLMs · self-driving · alpha-fold", { x: M + 0.95, y: 4.1, w: 6.0, h: 0.4, fontSize: 12, fontFace: FONT, color: C.PRIMARY_TINT, margin: 0 });
  s.addText("this course: classical ML —\nsmaller data, tabular data,\ninterpretable, fast, and still\nthe workhorse of industry", { x: M + 0.95, y: 4.55, w: 6.0, h: 1.1, fontSize: 11.5, fontFace: FONT, italic: true, color: "FFFFFF", margin: 0 });
  L.bullets(s, [
    { t: "This course = classical ML", b: true, c: C.PRIMARY_DARK },
    "scikit-learn's home turf",
    "Tabular data: rows × columns",
    "Trains in seconds, not hours",
    "You can explain why it decided",
    { t: "Deep learning → later course (fastai, PyTorch)", sub: true },
  ], { x: 9.0, y: 2.3, w: W - 9.0 - M, h: 3.6, size: 14.5, gap: 10 });
}

// 7 · Three families
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Taxonomy", title: "Three families of machine learning", pageNo: ++pn });
  const y = 2.0, w = (W - 2 * M - 0.8) / 3, h = 3.9;
  L.card(s, pres, { x: M, y, w, h, title: "Supervised", body: "Learn from labeled examples: (X → y)\n\n• Will it rain? (yes/no)\n• House price? (number)\n• Spam or not?\n\nMost business ML lives here.", bodySize: 14 });
  L.card(s, pres, { x: M + w + 0.4, y, w, h, title: "Unsupervised", body: "Find structure, no labels given\n\n• Customer segments\n• Unusual transactions\n• Compress 50 features → 2D\n\nSession 07 covers this.", bodySize: 14 });
  L.card(s, pres, { x: M + 2 * (w + 0.4), y, w, h, title: "Reinforcement", body: "Learn by acting & getting rewards\n\n• Game-playing agents\n• Robotics\n• Recommendation loops\n\nOut of scope — but you'll meet it again.", bodySize: 14 });
}

// 8 · supervised: classification vs regression
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Supervised", title: "Classification vs regression — know your y", pageNo: ++pn });
  const w = (W - 2 * M - 0.4) / 2;
  L.card(s, pres, { x: M, y: 2.0, w, h: 3.4, title: "Classification — y is a category", body: "• churn: yes / no\n• disease: benign / malignant\n• email: spam / ham\n• digit: 0–9\n\nOutput: a class label, sometimes with probability (79% spam)", bodySize: 15 });
  L.card(s, pres, { x: M + w + 0.4, y: 2.0, w, h: 3.4, title: "Regression — y is a number", body: "• house price: ฿4.2M\n• demand next week: 1,240 units\n• patient stay: 5.5 days\n\nOutput: a continuous value\n\n(Watch out: “linear regression” is regression; “logistic regression” is classification!)", bodySize: 15 });
  s.addText("Choosing the family = reading your target column y. Everything else in sklearn follows from it.",
    { x: M, y: 5.75, w: W - 2 * M, h: 0.5, fontSize: 15.5, fontFace: FONT, bold: true, color: C.PRIMARY_DARK, margin: 0 });
}

// 9 · workflow
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Workflow", title: "The ML workflow you'll repeat all course", pageNo: ++pn });
  L.flowRow(s, pres, { x: M, y: 2.0, w: W - 2 * M, h: 1.45, steps: [
    { t: "Frame", d: "what is y? what's success?" },
    { t: "Collect & EDA", d: "look at the data first" },
    { t: "Prepare", d: "clean, encode, scale" },
    { t: "Train", d: "fit a first quick model" },
  ]});
  L.flowRow(s, pres, { x: M, y: 3.65, w: W - 2 * M, h: 1.45, startNum: 5, steps: [
    { t: "Evaluate", d: "on data it never saw" },
    { t: "Tune", d: "hyperparameters, features" },
    { t: "Error analysis", d: "where & why it fails" },
    { t: "Communicate", d: "insights, not just scores" },
  ]});
  s.addText("Sessions map 1:1 onto this loop: 02–03 = prepare · 04 = evaluate · 05–07 = train & tune · 08 = all of it.",
    { x: M, y: 5.5, w: W - 2 * M, h: 0.5, fontSize: 14.5, fontFace: FONT, color: C.MUTED, margin: 0 });
}

// 10 · where sklearn fits
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Tooling", title: "scikit-learn — one library, the whole workflow", pageNo: ++pn });
  L.compTable(s, pres, {
    x: M, y: 2.0, w: 7.5, colW: [2.6, 4.9], fontSize: 13.5, rowH: 0.52,
    rows: [
      ["Inside sklearn", "what it gives you"],
      ["Datasets", "iris, wine, breast cancer, …"],
      ["Preprocessing", "impute, encode, scale (S02–03)"],
      ["Models", "linear, trees, ensembles, clustering (S05–07)"],
      ["Model selection", "train/test split, CV, grid search (S04, 07)"],
      ["Metrics", "accuracy, F1, ROC, RMSE, R² (S04)"],
    ],
  });
  L.bullets(s, [
    { t: "Why practitioners love it", b: true },
    "One consistent API for ~everything",
    "Excellent docs & tutorials (scikit-learn.org)",
    "Plays well with pandas",
    { t: "Not for: deep learning, huge data", c: C.MUTED },
    { t: "(this course = classical ML, so perfect fit)", sub: true },
  ], { x: 8.6, y: 2.15, w: W - 8.6 - M, h: 3.6, size: 14.5, gap: 10 });
}

// 11 · estimator API
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "The one API", title: "Every model: fit() → predict()", pageNo: ++pn });
  L.pipelineDiagram(s, pres, { x: M, y: 2.0, w: W - 2 * M, stages: [
    { t: "model = Model(hyperparams)", d: "create — no data yet" },
    { t: "model.fit(X_train, y_train)", d: "learn from examples" },
    { t: "y_pred = model.predict(X_test)", d: "apply to new data" },
  ]});
  L.codeBlock(s, pres, { x: M, y: 3.3, w: 7.6, h: 2.4, size: 14, title: "works for ANY sklearn model", lines: [
    { t: "model = KNeighborsClassifier(n_neighbors=3)" },
    { t: "model = DecisionTreeClassifier(max_depth=4)   # swap the model," },
    { t: "model = RandomForestClassifier()              # keep the rest:" },
    { t: "model.fit(X_train, y_train)                   # same 3 lines" },
    { t: "model.predict(X_test)" },
  ]});
  L.bullets(s, [
    { t: "Transformers too", b: true },
    "scaler.fit(X) → learn the stats",
    "scaler.transform(X) → apply",
    { t: "fit_transform() = both at once", sub: true },
    "Consistency is why sklearn won: learn the API once, use 50+ models.",
  ], { x: 8.6, y: 3.4, w: W - 8.6 - M, h: 2.6, size: 14.5, gap: 9 });
}

// 12 · iris
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Dataset", title: "Meet the iris dataset (1936!)", pageNo: ++pn });
  L.codeBlock(s, pres, { x: M, y: 2.0, w: 6.7, h: 1.5, size: 13, lines: [
    { t: "from sklearn.datasets import load_iris" },
    { t: "X, y = load_iris(return_X_y=True)   # 150 flowers × 4 features" },
  ]});
  L.compTable(s, pres, {
    x: M, y: 3.75, w: 6.7, colW: [1.15, 1.4, 1.4, 1.35, 1.4], fontSize: 11.5, rowH: 0.4,
    rows: [
      ["y", "sepal L", "sepal W", "petal L", "petal W"],
      [{ t: "0", c: C.PRIMARY_DARK, b: true }, "5.1", "3.5", "1.4", "0.2"],
      [{ t: "0", c: C.PRIMARY_DARK, b: true }, "4.9", "3.0", "1.4", "0.2"],
      [{ t: "1", c: C.ACCENT, b: true }, "7.0", "3.2", "4.7", "1.4"],
      [{ t: "2", c: "E11D48", b: true }, "6.3", "3.3", "6.0", "2.5"],
    ],
  });
  s.addText("150 flowers · 3 species (0=setosa, 1=versicolor, 2=virginica) · 4 measurements in cm",
    { x: M, y: 6.15, w: 7.0, h: 0.4, fontSize: 12, fontFace: FONT, color: C.MUTED, margin: 0 });
  L.bullets(s, [
    { t: "X = features (4 columns)", b: true },
    "measurements — the inputs",
    { t: "y = target (1 column)", b: true },
    "species 0/1/2 — the answer",
    { t: "Goal: predict species from measurements → classification", c: C.PRIMARY_DARK, b: true },
  ], { x: 7.9, y: 2.2, w: W - 7.9 - M, h: 3.4, size: 14.5, gap: 10 });
}

// 13 · first model 5 lines
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Moment of truth", title: "Your first model — five lines", pageNo: ++pn });
  L.codeBlock(s, pres, { x: M, y: 2.0, w: 8.0, h: 3.5, size: 14, lines: [
    { t: "from sklearn.model_selection import train_test_split" },
    { t: "from sklearn.neighbors import KNeighborsClassifier" },
    { t: "X_train, X_test, y_train, y_test = train_test_split(" },
    { t: "    X, y, test_size=0.3, random_state=42)      # ① hold out 30%" },
    { t: "model = KNeighborsClassifier(n_neighbors=3)    # ② create" },
    { t: "model.fit(X_train, y_train)                    # ③ learn" },
    { t: "print(model.score(X_test, y_test))             # ④ judge" },
  ]});
  L.outputBlock(s, pres, { x: M, y: 5.7, w: 8.0, h: 0.75, lines: ["1.0"] });
  s.addText([
    { text: "100% right", options: { bold: true, fontSize: 26, color: C.PRIMARY_DARK, breakLine: true } },
    { text: "on flowers it never saw", options: { fontSize: 17, color: C.TEXT, breakLine: true } },
  ], { x: 8.9, y: 2.15, w: W - 8.9 - M, h: 1.2, fontFace: FONT, margin: 0, paraSpaceAfter: 4 });
  L.bullets(s, [
    { t: "score() on the TEST set — the model never trained on it", sub: true },
    { t: "Iris is gently easy. Real data (Titanic, next session) won't hand you 100%.", sub: true },
  ], { x: 8.9, y: 3.6, w: W - 8.9 - M, h: 2.4, size: 14, gap: 10 });
}

// 14 · train/test split diagram
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Key habit", title: "Never grade a student on questions it has seen", pageNo: ++pn });
  // dataset bar
  const bx = M, by = 2.3, bw = 11.5, bh = 0.85;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx, y: by, w: bw * 0.7 - 0.06, h: bh, rectRadius: 0.06, fill: { color: C.PRIMARY }, line: { color: "FFFFFF", width: 0 } });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx + bw * 0.7 + 0.06, y: by, w: bw * 0.3 - 0.06, h: bh, rectRadius: 0.06, fill: { color: C.ACCENT }, line: { color: "FFFFFF", width: 0 } });
  s.addText("TRAINING SET — 70%   ·   model.fit() sees this", { x: bx, y: by, w: bw * 0.7 - 0.06, h: bh, fontSize: 14, fontFace: FONT, bold: true, color: "FFFFFF", align: "center", valign: "middle", margin: 0 });
  s.addText("TEST — 30%", { x: bx + bw * 0.7 + 0.06, y: by, w: bw * 0.3 - 0.06, h: bh, fontSize: 14, fontFace: FONT, bold: true, color: "7C2D12", align: "center", valign: "middle", margin: 0 });
  // arrows down
  s.addText("↓", { x: bx + bw * 0.35 - 0.2, y: by + bh + 0.1, w: 0.4, h: 0.5, fontSize: 22, fontFace: FONT, color: C.PRIMARY, align: "center", margin: 0 });
  s.addText("↓", { x: bx + bw * 0.85 - 0.2, y: by + bh + 0.1, w: 0.4, h: 0.5, fontSize: 22, fontFace: FONT, color: C.ACCENT, align: "center", margin: 0 });
  L.card(s, pres, { x: M, y: 4.0, w: (W - 2 * M - 0.4) / 2, h: 1.8, title: "fit → learn patterns", body: "The model adjusts itself to minimize mistakes on the training set. Like studying with the answer key.", bodySize: 14 });
  L.card(s, pres, { x: M + (W - 2 * M - 0.4) / 2 + 0.4, y: 4.0, w: (W - 2 * M - 0.4) / 2, h: 1.8, title: "score → honest exam", body: "Test questions were never shown. This number estimates real-world performance.", tint: C.ACCENT_TINT, titleColor: "92400E", bodySize: 14 });
  s.addText("random_state=42 makes the split reproducible — same split on every machine. Full story in Session 04.",
    { x: M, y: 6.1, w: W - 2 * M, h: 0.45, fontSize: 13.5, fontFace: FONT, color: C.MUTED, margin: 0 });
}

// 15 · predictions vs truth
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Inspect", title: "Look at what it got wrong", pageNo: ++pn });
  L.codeBlock(s, pres, { x: M, y: 2.0, w: 7.4, h: 2.2, size: 13.5, lines: [
    { t: "model50 = KNeighborsClassifier(n_neighbors=50).fit(X_train, y_train)" },
    { t: "y_pred = model50.predict(X_test)" },
    { t: "compare = pd.DataFrame({\"actual\": y_test, \"predicted\": y_pred})" },
    { t: "compare[compare.actual != compare.predicted]      # only the misses" },
  ]});
  L.compTable(s, pres, {
    x: M, y: 4.5, w: 4.2, colW: [2.1, 2.1], fontSize: 12.5, rowH: 0.42,
    rows: [
      ["actual", "predicted"],
      [{ t: "2", b: true }, { t: "1", c: "E11D48", b: true }],
      [{ t: "2", b: true }, { t: "1", c: "E11D48", b: true }],
    ],
  });
  L.bullets(s, [
    { t: "k=50 → 2 misses out of 45: virginica (2) predicted as versicolor (1)", b: true },
    "These two species overlap in measurements — even humans misjudge them",
    "Error analysis (S07) = reading these misses systematically",
    { t: "predict() returns labels; predict_proba() returns probabilities", c: C.PRIMARY_DARK },
  ], { x: 5.3, y: 4.6, w: W - 5.3 - M, h: 2.2, size: 14, gap: 8 });
}

// 16 · KNN intuition
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Under the hood", title: "KNN in 30 seconds — “you are like your neighbors”", pageNo: ++pn });
  // scatter-ish schematic with dots
  const zones = [
    { x: 2.2, y: 2.75, label: "setosa", color: C.PRIMARY, n: 8, ly: -0.8 },
    { x: 4.6, y: 2.55, label: "versicolor", color: C.ACCENT, n: 8, ly: -0.8 },
    { x: 3.4, y: 4.35, label: "virginica", color: "E11D48", n: 8, ly: 1.02 },
  ];
  zones.forEach((z) => {
    s.addText(z.label, { x: z.x - 0.9, y: z.y + z.ly, w: 1.8, h: 0.3, fontSize: 12, fontFace: FONT, bold: true, color: z.color, align: "center", margin: 0 });
    for (let i = 0; i < z.n; i++) {
      const ang = (i / z.n) * 2 * Math.PI, r = 0.26 + (i % 3) * 0.17;
      s.addShape(pres.shapes.OVAL, { x: z.x + Math.cos(ang) * r * 1.6, y: z.y + Math.sin(ang) * r, w: 0.17, h: 0.17, fill: { color: z.color, transparency: 20 }, line: { color: "FFFFFF", width: 0 } });
    }
  });
  // mystery point + circle k=3
  const mx = 4.15, my = 3.68;
  s.addShape(pres.shapes.OVAL, { x: mx - 0.72, y: my - 0.72, w: 1.44, h: 1.44, fill: { color: C.PRIMARY, transparency: 100 }, line: { color: C.TEXT, width: 1.5, dashType: "dash" } });
  s.addText("?", { x: mx - 0.15, y: my - 0.22, w: 0.44, h: 0.44, fontSize: 20, fontFace: FONT, bold: true, color: C.TEXT, align: "center", valign: "middle", fill: { color: "FFFFFF" }, margin: 0 });
  s.addText("←  new flower", { x: mx + 0.85, y: my - 0.16, w: 1.7, h: 0.32, fontSize: 11.5, fontFace: FONT, color: C.MUTED, align: "left", margin: 0 });
  L.bullets(s, [
    { t: "To classify a new point:", b: true },
    "① find its k nearest training flowers",
    "② let them vote on the species",
    { t: "k=3 here → 2× versicolor wins", b: true, c: C.PRIMARY_DARK },
    { t: "k is a hyperparameter — YOUR choice before training", c: "92400E", b: true },
    "small k: flexible, noisy · large k: stable, bland",
  ], { x: 7.3, y: 2.15, w: W - 7.3 - M, h: 4.0, size: 15, gap: 10 });
}

// 16b · decision regions (the real thing)
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Under the hood", title: "What KNN actually learns — decision regions", pageNo: ++pn });
  s.addImage({ path: "D:/Repositories/AI_course_MasterDegree/assets/figures/img_knn_boundary.png", x: M, y: 2.0, w: 6.2, h: 4.7 });
  L.bullets(s, [
    { t: "The model IS this map", b: true },
    "every point in the plane inherits its neighbors' vote",
    "the wiggly border = KNN's local, memory-based nature",
    { t: "k small → wigglier · k large → smoother (S04 measures it)", c: "92400E", b: true },
    "real fit: iris, petal length × width, k=5",
    "in 30 features it's the same idea — we just can't draw it",
  ], { x: 7.1, y: 2.3, w: W - 7.1 - M, h: 4.0, size: 14.5, gap: 11 });
}

// 17 · vary k
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Experiment", title: "Turn one knob, watch the score move", pageNo: ++pn });
  L.codeBlock(s, pres, { x: M, y: 2.0, w: 6.9, h: 2.7, size: 13, lines: [
    { t: "for k in [1, 3, 5, 15, 50]:" },
    { t: "    m = KNeighborsClassifier(n_neighbors=k)" },
    { t: "    m.fit(X_train, y_train)" },
    { t: "    print(f\"k={k:2d}  accuracy={m.score(X_test, y_test):.3f}\")" },
  ]});
  L.outputBlock(s, pres, { x: M, y: 4.9, w: 6.9, h: 1.55, lines: [
    "k= 1  accuracy=1.000",
    "k= 3  accuracy=1.000",
    "k= 5  accuracy=1.000",
    "k=15  accuracy=1.000",
    "k=50  accuracy=0.956",
  ]});
  L.bullets(s, [
    { t: "Iris is easy — every sane k is perfect", b: true },
    "so we crank k until it breaks:",
    { t: "k=50 → too blunt", b: true },
    "votes drown the local pattern (underfitting)",
    { t: "On messier data the right k matters a lot — picking it properly = cross-validation, Session 04", c: "92400E", b: true },
  ], { x: 7.9, y: 2.2, w: W - 7.9 - M, h: 3.6, size: 14.5, gap: 10 });
}

// 18 · which model when (simplified map)
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Cheat sheet", title: "Which model when? (simplified sklearn map)", pageNo: ++pn });
  L.compTable(s, pres, {
    x: M, y: 2.0, w: W - 2 * M, colW: [3.3, 3.3, 3.3, 2.32], fontSize: 13, rowH: 0.55,
    rows: [
      ["Situation", "Start with", "Then try", "Session"],
      ["Few rows, need explainability", "Linear / Logistic Regression", "Decision Tree", "05 / 06"],
      ["Tabular, want best accuracy", "RandomForest / HistGradientBoosting", "XGBoost, LightGBM", "06"],
      ["Small clean data, smooth boundaries", "KNN", "SVM (RBF)", "06"],
      ["No labels — find groups", "KMeans", "DBSCAN, PCA", "07"],
      ["Text features", "TfifVectorizer + LogisticRegression", "naive_bayes", "—"],
    ],
  });
  s.addText("Full interactive map: scikit-learn.org → “choosing the right estimator”.",
    { x: M, y: 5.85, w: W - 2 * M, h: 0.4, fontSize: 12.5, fontFace: FONT, color: C.MUTED, margin: 0 });
}

// 19 · vibe coding — prompt anatomy
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Vibe coding", title: "Prompting AI for ML code that actually works", pageNo: ++pn });
  L.pipelineDiagram(s, pres, { x: M, y: 2.0, w: W - 2 * M, stages: [
    { t: "CONTEXT", d: "pandas df, columns, dtypes" },
    { t: "GOAL", d: "what you want to predict" },
    { t: "CONSTRAINT", d: "sklearn, no leakage, reproducible" },
    { t: "VERIFY", d: "check vs docs / run it" },
  ]});
  L.codeBlock(s, pres, { x: M, y: 3.55, w: 7.6, h: 2.9, size: 12.5, title: "a prompt that works", lines: [
    { t: "I have a pandas DataFrame `df` with columns" },
    { t: "tenure(float), contract(object), monthly_charges(float)," },
    { t: "churn(0/1 int). Using scikit-learn only:" },
    { t: "1) build a ColumnTransformer that imputes+one-hot-encodes" },
    { t: "   contract and scales the numeric columns," },
    { t: "2) chain it with LogisticRegression in a Pipeline," },
    { t: "3) evaluate with 5-fold stratified CV — mean ROC-AUC." },
    { t: "Random-state 42. Do NOT touch a holdout test set." },
  ]});
  L.bullets(s, [
    { t: "Why this works:", b: true },
    "names dtypes → encoder choice is right",
    "“Pipeline” → leakage-safe by design",
    "“CV” → honest estimate, no test leakage",
    { t: "Then verify: imports real? params real?", c: "92400E", b: true },
  ], { x: 8.7, y: 3.7, w: W - 8.7 - M, h: 2.8, size: 13.5, gap: 9 });
}

// 20 · LLM traps
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Vibe coding", title: "Four ways an AI assistant will lie to you", pageNo: ++pn });
  const w = (W - 2 * M - 0.9) / 4, y = 2.05, h = 3.5;
  L.card(s, pres, { x: M, y, w, h, title: "Invented API", body: "sklearn.magic.AutoML(...) doesn't exist. LLMs interpolate plausible names. Paste into an editor and it fails — trust only what runs.", bodySize: 12.5, tint: "FEE2E2", titleColor: "9F1239" });
  L.card(s, pres, { x: M + w + 0.3, y, w, h, title: "Silent leakage", body: "“I improved your accuracy!” — by fitting the scaler on ALL data or scoring on the training set. Always ask: what did fit() see?", bodySize: 12.5, tint: "FEE2E2", titleColor: "9F1239" });
  L.card(s, pres, { x: M + 2 * (w + 0.3), y, w, h, title: "Deprecated args", body: "train_test_split(train_size=0.7, test_size=0.7)? graphviz syntax changed? APIs move. Check the version in the docs.", bodySize: 12.5, tint: "FEE2E2", titleColor: "9F1239" });
  L.card(s, pres, { x: M + 3 * (w + 0.3), y, w, h, title: "Metric confusion", body: "accuracy on a 99%-negative problem looks like 99%. LLMs rarely warn you. Session 04 gives you the questions to ask.", bodySize: 12.5, tint: "FEE2E2", titleColor: "9F1239" });
  s.addText("Defense: run it, read it line by line, and check anything unfamiliar against scikit-learn.org.",
    { x: M, y: 5.9, w: W - 2 * M, h: 0.5, fontSize: 15.5, fontFace: FONT, bold: true, color: C.PRIMARY_DARK, margin: 0 });
}

// 21 · Lab
L.labSlide(pres, {
  sessionTag: TAG, pageNo: ++pn, num: "01",
  title: "โมเดลแรกของคุณ — First model, your hands",
  goal: "Train, score and inspect your own KNN model on real data — and transfer the pattern to a new dataset.",
  tasks: [
    "โหลด iris แล้วแบ่ง train/test 70:30 (random_state=42)",
    "เทรน KNeighborsClassifier (k=3) และรายงานคะแนนบนชุดทดสอบ",
    "รันเปลี่ยน k ∈ {1,3,5,15,50} — ผลลัพธ์เปลี่ยนอย่างไร?",
    "สร้างตารางเทียบ actual vs predicted แล้วหาแถวที่ทายผิด",
    "โจทย์ชวนคิด: ทำซ้ำทั้งหมดกับ wine dataset (load_wine) โดยไม่ดูเฉลย",
  ],
  vibe: "ลองถาม AI: “อธิบายว่าทำไม k=50 ให้คะแนนแย่กว่า k=3” แล้วตรวจสอบคำตอบกับสไลด์หน้า 17 — AI อธิบายเหตุผลได้ดี แต่คุณต้องเป็นคนตัดสินว่าเชื่อไหม",
});

// 22 · Takeaways
L.takeaways(pres, {
  sessionTag: TAG, pageNo: ++pn,
  items: [
    "ML learns rules from (data + answers) — for problems you can't hand-code.",
    "Supervised = learn X→y; classification (category) vs regression (number).",
    "sklearn's one API: create → fit() → predict() — same 3 lines for every model.",
    "Always split train/test: score on data the model never saw.",
    "AI assistants accelerate you — verify APIs, watch for leakage, explain every line.",
  ],
  nextTag: "Session 02", nextTitle: "Data Understanding & Cleaning — real data is messy",
});

L.save(pres, "D:/Repositories/AI_course_MasterDegree/slides/01 Introduction to Machine Learning.pptx").then(() => console.log("01 done"));
