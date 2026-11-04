// Deck 07 — Unsupervised Learning + Hyperparameter Tuning
const L = require("./deck_lib");
const { C, FONT, MONO, W, H, M } = L;

const TAG = "SESSION 07";
const pres = L.deckInit("07 Unsupervised Learning and Hyperparameter Tuning");
let pn = 1;

// 1 · Title
L.titleSlide(pres, {
  num: "07",
  title: "Unsupervised Learning\n+ Hyperparameter Tuning",
  subtitle: "Find structure nobody labeled — clusters, compressed views — then squeeze your best model with Grid & Randomized search.",
});
pn++;

// 2 · Agenda
L.agendaSlide(pres, {
  sessionTag: TAG, pageNo: ++pn,
  items: [
    { t: "Unsupervised: no labels", d: "what can we still learn?" },
    { t: "KMeans", d: "centroids & the assign-update loop" },
    { t: "Choosing k", d: "elbow & silhouette" },
    { t: "Blind experiment", d: "wine: rediscover 3 cultivars" },
    { t: "DBSCAN", d: "density, noise, weird shapes" },
    { t: "PCA", d: "compress 13 features → 2D picture" },
    { t: "Grid & Randomized search", d: "tuning without self-deception" },
    { t: "Learning curves", d: "more data or more model?" },
  ],
});

// 3 · unsupervised intro
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "New world", title: "What if nobody gives you y?", pageNo: ++pn });
  const w = (W - 2 * M - 0.8) / 3, y = 2.05, h = 3.3;
  L.card(s, pres, { x: M, y, w, h, title: "Clustering", body: "Group similar rows.\n\nCustomer segments · patient phenotypes ·\ndocument topics\n\n→ KMeans, DBSCAN", bodySize: 14.5 });
  L.card(s, pres, { x: M + w + 0.4, y, w, h, title: "Dimensionality reduction", body: "Compress many columns into few.\n\nVisualize 13-D data · de-noise ·\nspeed up downstream models\n\n→ PCA", bodySize: 14.5 });
  L.card(s, pres, { x: M + 2 * (w + 0.4), y, w, h, title: "Anomaly detection", body: "Find the weird ones.\n\nFraud probes · sensor faults ·\nDBSCAN noise points\n\n(comes free with clustering)", bodySize: 14.5 });
  L.bullets(s, [
    { t: "No score without y — evaluation becomes:", b: true },
    "internal (silhouette) · stability · human judgment · proxy tasks",
  ], { x: M, y: 5.65, w: W - 2 * M, h: 0.9, size: 15, gap: 8 });
}

// 4 · kmeans mechanics
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Clustering", title: "KMeans: plant flags, regroup, repeat", pageNo: ++pn });
  L.flowRow(s, pres, { x: M, y: 2.05, w: W - 2 * M, h: 1.5, steps: [
    { t: "① pick k centroids", d: "random start" },
    { t: "② assign", d: "each point → nearest centroid" },
    { t: "③ update", d: "centroid → mean of its group" },
    { t: "④ repeat ②③", d: "until stable" },
  ]});
  L.codeBlock(s, pres, { x: M, y: 3.85, w: 7.5, h: 1.5, size: 13, lines: [
    { t: "from sklearn.cluster import KMeans" },
    { t: "km = KMeans(n_clusters=3, n_init=10, random_state=42)" },
    { t: "labels = km.fit_predict(X_scaled)      # X has NO y" },
  ]});
  L.bullets(s, [
    { t: "inertia_ = total squared distance to centroids (lower = tighter) · labels_ = cluster id per row (0,1,2…)", b: true },
    { t: "Scaling FIRST — distances again (S03!)", b: true, c: "9F1239" },
  ], { x: M, y: 5.55, w: 7.5, h: 0.95, size: 13, gap: 6 });
  L.card(s, pres, { x: 8.3, y: 3.85, w: W - 8.3 - M, h: 2.6, title: "Assumes", body: "round-ish, similar-size clusters.\nStruggles on moons, rings, unequal blobs.\nn_init=10 = retry 10 starts, keep best (sklearn ≥1.4 default).", bodySize: 14 });
}

// 4b · kmeans in pictures
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Clustering", title: "KMeans in pictures — assign & update", pageNo: ++pn });
  s.addImage({ path: "D:/Repositories/AI_course_MasterDegree/assets/figures/img_kmeans_fit.png", x: M, y: 2.0, w: 12.23, h: 3.9 });
  L.bullets(s, [
    { t: "Real fit on wine (PCA-2D view): random centroids → assign every point to its nearest → move each centroid to its group's mean → repeat until stable", b: true },
    { t: "Always converges — but only to a LOCAL optimum. That's exactly why n_init=10 retries ten different starts and keeps the best.", c: C.PRIMARY_DARK, b: true },
  ], { x: M, y: 6.05, w: W - 2 * M, h: 0.9, size: 13.5, gap: 6 });
}

// 5 · choosing k
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Choosing k", title: "Elbow & silhouette (wine, 13 features, scaled)", pageNo: ++pn });
  s.addChart(pres.charts.LINE, [
    { name: "inertia (tightness)", labels: ["2", "3", "4", "5", "6", "7", "8"], values: [1658.8, 1277.9, 1175.4, 1109.5, 1046.0, 981.6, 935.2] },
  ], {
    x: M, y: 2.05, w: 5.9, h: 3.9,
    chartColors: [C.PRIMARY], lineSize: 3, lineDataSymbol: "circle", lineDataSymbolSize: 8,
    catAxisTitle: "k (number of clusters)", showCatAxisTitle: true, catAxisTitleColor: C.MUTED, catAxisTitleFontSize: 11,
    valAxisLabelColor: C.MUTED, catAxisLabelColor: C.MUTED,
    valGridLine: { color: "E2E8F0", size: 0.5 }, catGridLine: { style: "none" },
    showLegend: false, chartArea: { fill: { color: "FFFFFF" } },
  });
  s.addChart(pres.charts.BAR, [
    { name: "silhouette", labels: ["2", "3", "4", "5", "6", "7", "8"], values: [0.259, 0.285, 0.260, 0.202, 0.237, 0.204, 0.157] },
  ], {
    x: 6.85, y: 2.05, w: 5.9, h: 3.9, barDir: "col",
    chartColors: [C.ACCENT], varyColors: false,
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.MUTED, dataLabelFontSize: 9, dataLabelFormatCode: "0.000",
    catAxisTitle: "k", showCatAxisTitle: true, catAxisTitleColor: C.MUTED, catAxisTitleFontSize: 11,
    valAxisLabelColor: C.MUTED, catAxisLabelColor: C.MUTED,
    valGridLine: { color: "E2E8F0", size: 0.5 }, catGridLine: { style: "none" },
    showLegend: false, chartArea: { fill: { color: "FFFFFF" } },
  });
  L.bullets(s, [
    { t: "Elbow: inertia always falls — look for the bend (≈3)", b: true },
    { t: "Silhouette = cohesion vs separation, −1…1; peaks at k=3 (0.285)", b: true, c: C.PRIMARY_DARK },
    "Both are guides, not verdicts — finally a HUMAN judges if segments make business sense",
  ], { x: M, y: 6.15, w: W - 2 * M, h: 0.75, size: 13.5, gap: 7 });
}

// 6 · wine experiment
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "★ The reveal", title: "Wine: KMeans found the 3 cultivars — blind", pageNo: ++pn });
  s.addText("178 Italian wines · 13 chemical features · labels (3 cultivars) HIDDEN from the algorithm",
    { x: M, y: 1.95, w: W - 2 * M, h: 0.5, fontSize: 15.5, fontFace: FONT, color: C.TEXT, margin: 0 });
  L.bigStat(s, { x: M + 0.5, y: 2.75, w: 3.5, value: "98.3%", label: "agreement with the hidden\ncultivar labels (best mapping)", size: 60 });
  L.bigStat(s, { x: M + 4.5, y: 2.75, w: 3.5, value: "0.90", label: "adjusted Rand index\n(chance-corrected match)", size: 60, color: C.PRIMARY_DARK });
  L.bigStat(s, { x: M + 8.5, y: 2.75, w: 3.5, value: "65/51/62", label: "cluster sizes found\n(truth: 59/71/48)", size: 40, color: "B45309" });
  s.addText("Structure was IN the chemistry. No teacher, no labels — KMeans recovered the taxonomy.\nThat's what \"unsupervised\" buys you.",
    { x: M, y: 5.5, w: W - 2 * M, h: 0.8, fontSize: 16, fontFace: FONT, bold: true, color: C.PRIMARY_DARK, margin: 0 });
}

// 7 · interpreting clusters
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "After clustering", title: "Clusters are only useful if you can NAME them", pageNo: ++pn });
  L.codeBlock(s, pres, { x: M, y: 2.0, w: 7.5, h: 4.3, size: 13.5, lines: [
    { t: "df[\"cluster\"] = labels" },
    { t: "" },
    { t: "# how big is each segment?" },
    { t: "df[\"cluster\"].value_counts().sort_index()" },
    { t: "" },
    { t: "# profile each cluster on original features" },
    { t: "df.groupby(\"cluster\").mean().round(1)" },
    { t: "" },
    { t: "# the segment-naming moment:" },
    { t: "df.groupby(\"cluster\")[[\"alcohol\", \"flavanoids\"]].mean()" },
    { t: "" },
    { t: "# export the segments for the business team" },
    { t: "df.to_csv(\"wine_segments.csv\", index=False)" },
  ]});
  L.bullets(s, [
    { t: "The analyst's job", b: true },
    "read the profiles → invent names:\n\"low-alcohol/high-phenol group\" …",
    { t: "For business data this is where money is made", b: true },
    "\"Segment 2: high income, low spending → target them\"",
    { t: "Anomaly bonus: rows far from any centroid = unusual", sub: true },
  ], { x: 8.2, y: 2.2, w: W - 8.2 - M, h: 4.1, size: 13.5, gap: 10 });
}

// 8 · dbscan
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Clustering #2", title: "DBSCAN: follow the density, flag the weird", pageNo: ++pn });
  // real DBSCAN on moons (core/border/noise + eps circle)
  s.addImage({ path: "D:/Repositories/AI_course_MasterDegree/assets/figures/img_dbscan.png", x: M, y: 2.1, w: 5.7, h: 4.2 });
  L.bullets(s, [
    { t: "How it works", b: true },
    "a cluster = region dense enough (min_samples within eps)",
    "no k to guess — density decides",
    { t: "Superpowers", b: true },
    "arbitrary shapes · automatic outlier flagging (label −1)",
    { t: "Knobs: eps, min_samples — sensitive; use a k-distance plot", c: "92400E", b: true },
    { t: "KMeans = round blobs, fast, scalable · DBSCAN = shapes + noise, fussier", c: C.PRIMARY_DARK, b: true },
  ], { x: 6.9, y: 2.2, w: W - 6.9 - M, h: 4.2, size: 13.5, gap: 9 });
}

// 9 · PCA intuition
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Compression", title: "PCA: 13 features → 2 axes that matter most", pageNo: ++pn });
  L.bullets(s, [
    { t: "Idea", b: true },
    "find the directions where the data varies most",
    "keep the top few, drop the rest",
    { t: "Wine result (scaled):", b: true, c: C.PRIMARY_DARK },
    "PC1 explains 36.2% · PC2 19.2%",
    "2 axes = 55.4% of 13 columns' story",
    "10 of 13 needed for 95% — real data is spread out",
    { t: "Uses", b: true },
    "plot 13-D data as a 2-D scatter (next slide)",
    "de-noise / speed up pipelines",
    { t: "Always scale first — PCA hunts VARIANCE, and fare… er, proline has the biggest raw scale", c: "9F1239", b: true },
  ], { x: 7.0, y: 2.1, w: W - 7.0 - M, h: 4.4, size: 14, gap: 9 });
  // variance bar chart
  s.addChart(pres.charts.BAR, [
    { name: "explained variance", labels: ["PC1", "PC2", "PC3", "PC4", "PC5", "PC6"], values: [36.2, 19.2, 11.1, 7.1, 6.6, 4.9] },
  ], {
    x: M, y: 2.1, w: 6.2, h: 4.4, barDir: "col",
    chartColors: [C.PRIMARY, C.PRIMARY, "94A3B8", "94A3B8", "94A3B8", "94A3B8"], varyColors: true,
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.MUTED, dataLabelFontSize: 9,
    catAxisLabelColor: C.MUTED, valAxisLabelColor: C.MUTED, valAxisMaxVal: 40,
    valGridLine: { color: "E2E8F0", size: 0.5 }, catGridLine: { style: "none" },
    showLegend: false, chartArea: { fill: { color: "FFFFFF" } },
    catAxisTitle: "% of variance explained (wine, first 6 of 13)", showCatAxisTitle: true, catAxisTitleColor: C.MUTED, catAxisTitleFontSize: 10,
  });
}

// 10 · pca visualize
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "The picture", title: "PCA 2-D scatter: clusters you can SEE", pageNo: ++pn });
  // real PCA scatter of wine colored by KMeans clusters
  s.addImage({ path: "D:/Repositories/AI_course_MasterDegree/assets/figures/img_pca_real.png", x: M, y: 2.1, w: 6.4, h: 4.3 });
  L.codeBlock(s, pres, { x: 7.4, y: 2.1, w: W - 7.4 - M, h: 2.0, size: 12.5, lines: [
    { t: "Z = PCA(n_components=2).fit_transform(X_scaled)" },
    { t: "sns.scatterplot(x=Z[:,0], y=Z[:,1], hue=labels)" },
  ]});
  L.bullets(s, [
    { t: "3 clouds = 3 cultivars, visible", b: true },
    "plot colored by cluster OR by true label — same picture (ARI 0.90!)",
    { t: "This chart is also your unsupervised sanity check", c: C.PRIMARY_DARK, b: true },
  ], { x: 7.4, y: 4.35, w: W - 7.4 - M, h: 2.0, size: 13.5, gap: 9 });
}

// 11 · transition
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Part 2", title: "Now squeeze: hyperparameter tuning", pageNo: ++pn });
  L.compTable(s, pres, {
    x: M, y: 2.05, w: W - 2 * M, colW: [3.6, 4.4, 3.0], fontSize: 13.5, rowH: 0.55,
    rows: [
      ["model", "hyperparameters (knobs)", "who sets them"],
      ["KNN", "n_neighbors, weights", "YOU — before fit()"],
      ["DecisionTree", "max_depth, min_samples_leaf", "YOU"],
      ["RandomForest", "n_estimators, max_features, …", "YOU"],
      ["Ridge / Lasso", "alpha", "YOU"],
      ["DBSCAN", "eps, min_samples", "YOU"],
      [{ t: "Linear regression", c: C.MUTED }, { t: "(none — parameters w, b are learned)", c: C.MUTED }, "the data"],
    ],
  });
  s.addText("Defaults are good, not optimal. Tuning = search knobs with CV — never with the test set.",
    { x: M, y: 6.1, w: W - 2 * M, h: 0.45, fontSize: 15, fontFace: FONT, bold: true, color: C.PRIMARY_DARK, margin: 0 });
}

// 12 · grid concept
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Tuning", title: "GridSearchCV: try every cell of the grid", pageNo: ++pn });
  // grid diagram
  const gx = M, gy = 2.15, cw = 1.05, ch = 0.55, gap = 0.09;
  ["depth=None", "6", "4"].forEach((lab, r) => {
    s.addText(`max_depth=${lab}`, { x: gx, y: gy + 0.35 + r * (ch + gap), w: 1.75, h: ch, fontSize: 11, fontFace: FONT, color: C.MUTED, valign: "middle", margin: 0 });
    ["100", "300"].forEach((n, c) => {
      if (r === 0) s.addText(`trees=${n}`, { x: gx + 1.85 + c * (cw + gap), y: gy, w: cw, h: 0.3, fontSize: 11, fontFace: FONT, color: C.MUTED, margin: 0 });
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: gx + 1.85 + c * (cw + gap), y: gy + 0.35 + r * (ch + gap), w: cw, h: ch, rectRadius: 0.05, fill: { color: r === 1 && c === 0 ? C.ACCENT : C.PRIMARY_TINT }, line: { color: "FFFFFF", width: 0 } });
    });
  });
  s.addText("2 × 3 = 6 candidates × 5 CV folds = 30 fits — sklearn runs them all",
    { x: gx, y: gy + 2.5, w: 4.6, h: 0.6, fontSize: 11.5, fontFace: FONT, color: C.MUTED, margin: 0 });
  L.codeBlock(s, pres, { x: M, y: 5.35, w: 7.3, h: 1.6, size: 12.5, lines: [
    { t: "gs = GridSearchCV(model, {\"n_estimators\": [100, 300]," },
    { t: "                            \"max_depth\": [None, 6, 4]}, cv=5)" },
    { t: "gs.fit(X_train, y_train)   # best_params_, best_score_ inside" },
  ]});
  L.bullets(s, [
    { t: "It's the S04 protocol, automated", b: true },
    "every candidate judged by the same CV",
    { t: "best_score_ = CV score of the winner", b: true },
    { t: "Re-fit on ALL training data happens automatically", sub: true },
  ], { x: 8.0, y: 2.3, w: W - 8.0 - M, h: 3.2, size: 14, gap: 10 });
}

// 13 · randomized
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Tuning", title: "RandomizedSearchCV: when the grid explodes", pageNo: ++pn });
  L.bullets(s, [
    { t: "Grid pain", b: true },
    "6 hyperparameters × 5 values each = 15,625 combos × 5 folds",
    { t: "Random fix", b: true },
    "sample n_iter=30 random points from DISTRIBUTIONS",
    "n_estimators: randint(50, 500) — any integer, not a fixed list",
    { t: "30 good guesses ≈ 15,625 exhaustive ones — usually", b: true, c: C.PRIMARY_DARK },
  ], { x: M, y: 2.1, w: 6.4, h: 4.3, size: 15, gap: 11 });
  L.codeBlock(s, pres, { x: 7.2, y: 2.1, w: W - 7.2 - M, h: 2.9, size: 12, lines: [
    { t: "from scipy.stats import randint" },
    { t: "rs = RandomizedSearchCV(" },
    { t: "    RandomForestClassifier(random_state=42)," },
    { t: "    {\"n_estimators\": randint(50, 500)," },
    { t: "     \"max_depth\": [None, 4, 6, 8, 12]," },
    { t: "     \"min_samples_leaf\": [1, 2, 4]," },
    { t: "     \"max_features\": [\"sqrt\", \"log2\", None]}," },
    { t: "    n_iter=30, cv=5, random_state=42)" },
  ]});
  L.outputBlock(s, pres, { x: 7.2, y: 5.25, w: W - 7.2 - M, h: 1.15, lines: [
    { t: "best CV 0.965: depth 8 · log2 · 97 trees · leaf 1", b: true },
  ]});
}

// 14 · honest tuning result
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Honesty check", title: "Tuning worked… then didn't (and that's informative)", pageNo: ++pn });
  L.compTable(s, pres, {
    x: M, y: 2.1, w: 7.7, colW: [4.1, 1.8, 1.8], fontSize: 14, rowH: 0.6,
    rows: [
      ["RandomForest (breast cancer)", "CV", "test"],
      ["default knobs", "—", "0.958"],
      [{ t: "after RandomizedSearch (30×5)", b: true }, { t: "0.965", b: true }, { t: "0.958", b: true }],
    ],
  });
  L.bullets(s, [
    { t: "CV improved (+0.7pt), test didn't move", b: true },
    "this dataset is near its ceiling — the signal separates cleanly",
    { t: "Tuning pays big when: the search space is rich · defaults are far off · the problem is harder (S08 churn!)", b: true },
    { t: "The PROCESS is still correct — report both numbers honestly", b: true, c: C.PRIMARY_DARK },
  ], { x: M, y: 4.35, w: 7.7, h: 2.2, size: 13.5, gap: 8 });
  L.card(s, pres, { x: 8.4, y: 2.1, w: W - 8.4 - M, h: 2.4, title: "Reflex to avoid", body: "Tuning until the TEST number finally rises = tuning on the test set. Soft leakage (S04).", bodySize: 15 });
  L.card(s, pres, { x: 8.4, y: 4.75, w: W - 8.4 - M, h: 1.85, title: "Beyond today", body: "HalvingRandomSearchCV — successive halving, smarter budget on big data.", bodySize: 14, tint: C.PANEL, titleColor: C.TEXT });
}

// 15 · learning curves
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Diagnosis", title: "Learning curves: more data or more model?", pageNo: ++pn });
  s.addChart(pres.charts.LINE, [
    { name: "train score", labels: ["45", "113", "227", "341", "455"], values: [1.0, 1.0, 1.0, 1.0, 1.0] },
    { name: "CV score", labels: ["45", "113", "227", "341", "455"], values: [0.726, 0.921, 0.954, 0.961, 0.956] },
  ], {
    x: M, y: 2.0, w: 7.4, h: 4.3,
    chartColors: [C.PRIMARY, C.ACCENT], lineSize: 3, lineDataSymbol: "circle", lineDataSymbolSize: 7,
    catAxisTitle: "training rows used", showCatAxisTitle: true, catAxisTitleColor: C.MUTED, catAxisTitleFontSize: 11,
    valAxisMinVal: 0.7, valAxisMaxVal: 1.0, valAxisLabelColor: C.MUTED, catAxisLabelColor: C.MUTED,
    valGridLine: { color: "E2E8F0", size: 0.5 }, catGridLine: { style: "none" },
    showLegend: true, legendPos: "b", legendColor: C.MUTED, chartArea: { fill: { color: "FFFFFF" } },
  });
  L.bullets(s, [
    { t: "Read it", b: true },
    "CV climbs 0.73 → 0.96 as rows grow: DATA was the bottleneck",
    "train pinned at 1.0: RF memorizes any training set",
    { t: "Converging curves ≈ plateau — more rows won't help much now", b: true, c: C.PRIMARY_DARK },
    { t: "learning_curve(model, X, y, cv=5, train_sizes=…)", c: C.PRIMARY_DARK },
  ], { x: 8.1, y: 2.2, w: W - 8.1 - M, h: 4.0, size: 13.5, gap: 10 });
}

// 16 · action table
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Diagnosis", title: "Symptom → prescription", pageNo: ++pn });
  L.compTable(s, pres, {
    x: M, y: 2.05, w: W - 2 * M, colW: [3.6, 2.5, 4.88], fontSize: 13.5, rowH: 0.62,
    rows: [
      ["symptom", "diagnosis", "prescription"],
      ["train ↑ / test ↓ (gap)", "overfitting", "more regularization, simpler model, more data, fewer features"],
      ["both low, small gap", "underfitting", "richer model, more features, less regularization"],
      ["CV unstable across folds", "high variance", "more data, simpler model, CV with more folds"],
      ["CV ≫ test", "tuned to CV / shift", "trust test; simpler search; check leakage again"],
    ],
  });
}

// 17 · save/load + checklist
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Shipping", title: "Save the winner — and the reproducibility kit", pageNo: ++pn });
  L.codeBlock(s, pres, { x: M, y: 2.0, w: 7.4, h: 2.6, size: 13, lines: [
    { t: "import joblib" },
    { t: "joblib.dump(best_pipeline, \"churn_model.joblib\")" },
    { t: "" },
    { t: "clf = joblib.load(\"churn_model.joblib\")   # anywhere" },
    { t: "clf.predict(new_raw_rows)                 # transforms inside" },
  ]});
  L.bullets(s, [
    { t: "Dump the PIPELINE, not just the model", b: true, c: "9F1239" },
    "preprocessor + model travel together",
    { t: "Reproducibility kit", b: true },
    "random_state everywhere · library versions ·\nthe exact CV object · who ran what, when",
    { t: "S08 project deliverable = exactly this kit", c: C.PRIMARY_DARK, b: true },
  ], { x: 8.1, y: 2.2, w: W - 8.1 - M, h: 3.4, size: 14, gap: 10 });
  L.card(s, pres, { x: M, y: 4.9, w: 7.4, h: 1.7, title: "Final pitfall checklist", body: "split first · transform inside · WHEN known? · duplicates? · same folds for comparisons · right metric · Dummy anchor · test ONCE", bodySize: 14 });
}

// 18 · Lab
L.labSlide(pres, {
  sessionTag: TAG, pageNo: ++pn, num: "07",
  title: "ค้นพบกลุ่มที่ซ่อนอยู่ + ปรับแต่งโมเดล — wine & tuning",
  goal: "Unsupervised discovery on wine (elbow/silhouette, blind validation, PCA picture) plus a full tune of your best classifier.",
  tasks: [
    "โหลด wine (13 features) แล้ว scale — รัน KMeans k=2..8 เก็บ inertia และ silhouette — k เท่าไหร่ดีที่สุด?",
    "เฉลย: เทียบ labels ที่ได้กับ y จริงด้วย adjusted_rand_score — คอมเมนต์ผล",
    "วาด PCA 2 แกน ระบายสีด้วย cluster — เห็น 3 กลุ่มไหม อธิบาย explained variance",
    "profile แต่ละ cluster ด้วย groupby().mean() แล้วตั้งชื่อกลุ่มเป็นภาษาไทย",
    "ปรับแต่ง: RandomizedSearchCV บน RandomForest ของ breast cancer — เทียบ CV ก่อน/หลัง และ test ครั้งเดียว",
  ],
  vibe: "ลองถาม AI: “ช่วยออกแบบการทดลอง tune RandomForest ให้ครอบคลุมแต่ไม่แพงเกิน 30 fits” แล้วเช็กว่ามันเสนออะไรเกินจำเป็น/ผิดหลัก leakage ไหม",
});

// 19 · Takeaways
L.takeaways(pres, {
  sessionTag: TAG, pageNo: ++pn,
  items: [
    "Unsupervised finds structure without labels — KMeans on wine recovered the 3 cultivars at 98% agreement.",
    "Choose k with elbow + silhouette, then make clusters useful by NAMING them (profile → segment story).",
    "DBSCAN for shapes + noise; PCA to compress & visualize (13 features → 2 axes = 55% of wine's story).",
    "Tune with Grid/RandomizedSearchCV on CV — 30 random guesses often match a huge grid.",
    "Honesty: CV 0.965 → test 0.958 happens; report both. Dump the whole pipeline with joblib.",
  ],
  nextTag: "Session 08", nextTitle: "Final Project — Customer Churn Prediction, end to end",
});

L.save(pres, "D:/Repositories/AI_course_MasterDegree/slides/07 Unsupervised Learning and Hyperparameter Tuning.pptx").then(() => console.log("07 done"));
