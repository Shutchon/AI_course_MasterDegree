// Deck 05 — Regression Models
const L = require("./deck_lib");
const { C, FONT, MONO, W, H, M } = L;

const TAG = "SESSION 05";
const pres = L.deckInit("05 Regression Models");
let pn = 1;

// 1 · Title
L.titleSlide(pres, {
  num: "05",
  title: "Regression Models",
  subtitle: "Open the first black boxes: linear models with regularization, trees, and neighbors — predicting numbers honestly.",
});
pn++;

// 2 · Agenda
L.agendaSlide(pres, {
  sessionTag: TAG, pageNo: ++pn,
  items: [
    { t: "Linear regression, intuitively", d: "the best straight line" },
    { t: "Reading coefficients", d: "what the model believes" },
    { t: "California housing", d: "our benchmark today" },
    { t: "Regularization", d: "Ridge & Lasso — keeping weights sane" },
    { t: "Trees & neighbors for regression", d: "non-linear patterns" },
    { t: "Comparing all of them", d: "baseline → winner" },
    { t: "Pitfalls", d: "extrapolation, outliers, log targets" },
  ],
});

// 3 · linear intuition
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Black box #1", title: "Linear regression: draw the best line", pageNo: ++pn });
  // real fit with residuals (California housing)
  s.addImage({ path: "D:/Repositories/AI_course_MasterDegree/assets/figures/img_linfit.png", x: M, y: 2.1, w: 5.8, h: 4.2 });
  L.bullets(s, [
    { t: "One sentence", b: true },
    "choose the line (or plane) that makes the squared misses smallest",
    { t: "Loss = MSE = mean( (y − ŷ)² )", b: true, c: C.PRIMARY_DARK },
    "no hyperparameters — trains in milliseconds",
    "the coefficient story is readable (next slide)",
    { t: "In sklearn: LinearRegression().fit(X, y) — that's it", c: C.PRIMARY_DARK },
  ], { x: 7.0, y: 2.3, w: W - 7.0 - M, h: 3.9, size: 14.5, gap: 10 });
}

// 4 · math light
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Math you need", title: "The whole model in one line", pageNo: ++pn });
  s.addText("ŷ  =  w₁·MedInc  +  w₂·HouseAge  +  …  +  w₈·Longitude  +  b",
    { x: M, y: 2.15, w: W - 2 * M, h: 0.7, fontSize: 22, fontFace: MONO, bold: true, color: C.PRIMARY_DARK, align: "center", margin: 0 });
  const w = (W - 2 * M - 0.8) / 3, y = 3.3, h = 2.6;
  L.card(s, pres, { x: M, y, w, h, title: "w (weights / coefficients)", body: "how much the prediction moves when a feature +1\n\nthe model's \"beliefs\" about each column", bodySize: 14 });
  L.card(s, pres, { x: M + w + 0.4, y, w, h, title: "b (intercept)", body: "prediction when every feature is 0\n\nwith scaled features: ≈ the average house value", bodySize: 14 });
  L.card(s, pres, { x: M + 2 * (w + 0.4), y, w, h, title: "training", body: "pick w, b minimizing MSE\n(closed-form or gradient descent — sklearn handles it)", bodySize: 14 });
  s.addText("No curve-fitting ritual, no epochs to babysit. One fit() call.",
    { x: M, y: 6.15, w: W - 2 * M, h: 0.4, fontSize: 14, fontFace: FONT, color: C.MUTED, margin: 0 });
}

// 5 · dataset
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Benchmark", title: "California housing — 20,640 block groups", pageNo: ++pn });
  L.compTable(s, pres, {
    x: M, y: 2.0, w: 7.4, colW: [1.9, 3.3, 2.2], fontSize: 12.5, rowH: 0.5,
    rows: [
      ["column", "meaning", "range"],
      ["MedInc", "median income (×10k)", "0.5 – 15"],
      ["HouseAge", "median house age", "1 – 52"],
      ["AveRooms, AveOccup…", "rooms / occupancy per house", "…"],
      ["Latitude, Longitude", "where in California", "map coords"],
      [{ t: "y: house value", c: "92400E", b: true }, { t: "median price (×100k USD)", c: "92400E" }, "0.15 – 5.0"],
    ],
  });
  s.addText("Task: predict a block's median house value from its census features — classic tabular regression.",
    { x: M, y: 5.05, w: 7.4, h: 0.4, fontSize: 13, fontFace: FONT, color: C.MUTED, margin: 0 });
  L.codeBlock(s, pres, { x: M, y: 5.55, w: 7.4, h: 1.15, size: 12.5, lines: [
    { t: "from sklearn.datasets import fetch_california_housing" },
    { t: "X, y = fetch_california_housing(return_X_y=True)" },
  ]});
  L.bullets(s, [
    { t: "Protocol (from S04)", b: true },
    "split once: 80/20, random_state 42",
    "evaluate on the test set only",
    "baseline first — then models",
    { t: "everything scaled inside a Pipeline", sub: true },
  ], { x: 8.2, y: 2.2, w: W - 8.2 - M, h: 3.6, size: 14, gap: 10 });
}

// 6 · coefficients
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Interpretation", title: "Reading the model's mind (scaled features)", pageNo: ++pn });
  L.compTable(s, pres, {
    x: M, y: 2.05, w: 7.4, colW: [2.6, 1.7, 3.1], fontSize: 13, rowH: 0.5,
    rows: [
      ["feature (standardized)", "weight", "reads as"],
      [{ t: "MedInc", b: true }, { t: "+0.85", c: C.PRIMARY_DARK, b: true }, "richer block → pricier"],
      ["AveOccup", "−0.04", "crowded block → cheaper (slightly)"],
      ["AveRooms", "−0.29", "holds other features fixed (!)"],
      [{ t: "Latitude", b: true }, { t: "−0.90", b: true }, "north → cheaper"],
      [{ t: "Longitude", b: true }, { t: "−0.87", b: true }, "east → cheaper"],
      ["intercept b", "+2.07", "≈ the average value ($207k)"],
    ],
  });
  L.bullets(s, [
    { t: "Why coordinates dominate", b: true },
    "California prices are a geography story (coast!) — linear models combine lat/lon into a tilted plane",
    { t: "Careful:", b: true, c: "9F1239" },
    "weights are PER-STD of the feature",
    "correlation ≠ causation — description, not policy",
    "AveRooms negative once income is fixed: big rooms in poor inland blocks",
  ], { x: 8.2, y: 2.2, w: W - 8.2 - M, h: 4.2, size: 13.5, gap: 10 });
}

// 7 · first results
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Results", title: "Round 1 — baseline vs linear", pageNo: ++pn });
  L.compTable(s, pres, {
    x: M, y: 2.1, w: 7.6, colW: [3.2, 2.2, 2.2], fontSize: 14, rowH: 0.58,
    rows: [
      ["model (test set)", "MAE", "R²"],
      [{ t: "DummyRegressor(median)", c: C.MUTED }, "0.874", { t: "−0.05", c: C.MUTED }],
      [{ t: "LinearRegression", b: true }, { t: "0.533", b: true }, { t: "0.576", b: true }],
    ],
  });
  L.bullets(s, [
    { t: "In plain words:", b: true },
    "average miss shrank from $87k to $53k",
    { t: "\"predict the median\" scores R² < 0", b: true },
    "worse than predicting the mean — the definition of a floor",
    { t: "R² 0.576 from 8 straight lines — strong start", c: C.PRIMARY_DARK, b: true },
  ], { x: M, y: 4.6, w: 7.6, h: 1.9, size: 14.5, gap: 9 });
  L.card(s, pres, { x: 8.4, y: 2.1, w: W - 8.4 - M, h: 2.3, title: "Habit", body: "Every regression table in this course starts with the Dummy row.\n\nIf your fancy model doesn't clearly beat it, the fancy part is decoration.", bodySize: 15 });
  L.card(s, pres, { x: 8.4, y: 4.7, w: W - 8.4 - M, h: 1.9, title: "Why negative R²?", body: "R² compares you to the mean-predictor. Scoring below the mean → below zero. It's a floor, not a bug.", bodySize: 14, tint: C.PANEL, titleColor: C.TEXT });
}

// 8 · where linear fails
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Limits", title: "When a straight line isn't enough", pageNo: ++pn });
  const w = (W - 2 * M - 0.4) / 2;
  // left: curved data + line
  const bx = M, by = 2.15, bw = 5.6, bh = 3.3;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx, y: by, w: bw, h: bh, rectRadius: 0.08, fill: { color: C.PANEL }, line: { color: "E2E8F0", width: 1 } });
  const curve = [[0.8,0.9],[1.2,1.5],[1.6,2.0],[2.0,2.35],[2.4,2.55],[2.8,2.65],[3.2,2.6],[3.6,2.45],[4.0,2.2],[4.4,1.9]];
  curve.forEach(([px, py]) => {
    const x = bx + 0.5 + px * 1.1, y = by + bh - 0.5 - py * 0.95;
    s.addShape(pres.shapes.OVAL, { x, y, w: 0.15, h: 0.15, fill: { color: C.PRIMARY, transparency: 15 }, line: { color: "FFFFFF", width: 0 } });
  });
  s.addShape(pres.shapes.LINE, { x: bx + 0.5, y: by + bh - 2.5, w: 4.9, h: 1.7, line: { color: C.ACCENT, width: 3 }, flipV: true });
  s.addText("one straight line can't follow a bend — it averages the curve away", { x: bx + 0.3, y: by + bh + 0.15, w: bw - 0.6, h: 0.35, fontSize: 12, fontFace: FONT, color: C.MUTED, margin: 0 });
  L.bullets(s, [
    { t: "Real prices bend:", b: true },
    "income helps a lot until it saturates",
    "distance-to-coast is not linear",
    { t: "Diagnosis tool: plot residuals (y − ŷ) vs ŷ", b: true },
    "a pattern in residuals = the line missed structure",
    { t: "Three fixes ahead:", b: true, c: C.PRIMARY_DARK },
    "polynomial features · trees · neighbors",
  ], { x: 6.8, y: 2.2, w: W - 6.8 - M, h: 4.2, size: 14, gap: 9 });
}

// 9 · polynomial
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Fix #1", title: "Polynomial features: bend the plane with linear tools", pageNo: ++pn });
  L.codeBlock(s, pres, { x: M, y: 2.0, w: 7.7, h: 3.6, size: 13, lines: [
    { t: "from sklearn.preprocessing import PolynomialFeatures" },
    { t: "poly = PolynomialFeatures(degree=2, include_bias=False)" },
    { t: "X_poly = poly.fit_transform(X)" },
    { t: "print(X.shape, \"->\", X_poly.shape)   # (20640, 8) -> (20640, 44)" },
    { t: "" },
    { t: "pipe = Pipeline([(\"poly\", PolynomialFeatures(degree=2))," },
    { t: "                 (\"sc\",   StandardScaler())," },
    { t: "                 (\"m\",    LinearRegression())])" },
  ]});
  L.bullets(s, [
    { t: "Idea", b: true },
    "invent x², x₁·x₂ … then fit LINEARLY on them",
    "MedInc² captures saturation · Lat×Lon lets the plane curve",
    { t: "Still a linear model — in the NEW features", b: true, c: C.PRIMARY_DARK },
    { t: "Danger", b: true, c: "9F1239" },
    "degree 3 on 8 features → 165 columns; degree 5 → 1287",
    "feature count explodes → overfitting → enter regularization (next)",
  ], { x: 8.5, y: 2.1, w: W - 8.5 - M, h: 4.4, size: 13.5, gap: 10 });
}

// 10 · regularization
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Fix #1's bodyguard", title: "Ridge & Lasso: penalize wild weights", pageNo: ++pn });
  const w = (W - 2 * M - 0.4) / 2;
  L.card(s, pres, { x: M, y: 2.05, w, h: 3.15, title: "Ridge (L2) — shrink everything a bit", body: "Loss = MSE + α·Σw²\n\nBig α → all weights pulled toward 0 → smoother model.\nKeeps ALL features, humbles each one.\n\nRidge(alpha=1.0)", bodySize: 14 });
  L.card(s, pres, { x: M + w + 0.4, y: 2.05, w, h: 3.15, title: "Lasso (L1) — cut features to zero", body: "Loss = MSE + α·Σ|w|\n\nBig α → some weights become exactly 0 → built-in feature selection.\n\nLasso(alpha=0.1) on housing: test R² 0.48 — punished TOO hard. α is a hyperparameter (S07 tunes it).", bodySize: 14 });
  L.bullets(s, [
    { t: "On California (8 clean features): Ridge ≈ Linear (R² 0.576) — nothing to fix", b: true },
    "Regularization EARNS its keep with MANY / collinear / polynomial features",
    { t: "α = the dial between underfit (huge α) and overfit (α→0)", b: true, c: C.PRIMARY_DARK },
  ], { x: M, y: 5.4, w: W - 2 * M, h: 1.2, size: 14, gap: 8 });
}

// 11 · tree regression
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Fix #2", title: "Decision tree regression: ask, then average", pageNo: ++pn });
  // step function schematic
  const bx = M, by = 2.15, bw = 5.6, bh = 3.3;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx, y: by, w: bw, h: bh, rectRadius: 0.08, fill: { color: C.PANEL }, line: { color: "E2E8F0", width: 1 } });
  const pts = [[0.9,1.0],[1.3,1.3],[1.7,1.25],[2.1,2.3],[2.5,2.1],[2.9,2.9],[3.3,2.75],[3.7,3.6],[4.1,3.4],[4.5,3.9]];
  pts.forEach(([px, py]) => {
    const x = bx + 0.5 + px * 1.1, y = by + bh - 0.5 - py * 0.72;
    s.addShape(pres.shapes.OVAL, { x, y, w: 0.15, h: 0.15, fill: { color: C.PRIMARY, transparency: 15 }, line: { color: "FFFFFF", width: 0 } });
  });
  // step line
  const steps = [[0.8,1.0],[2.0,1.0],[2.0,2.6],[3.0,2.6],[3.0,3.5],[5.0,3.5]];
  for (let i = 0; i < steps.length - 1; i++) {
    const [x1, y1] = steps[i], [x2, y2] = steps[i + 1];
    const sx = bx + 0.5 + x1 * 1.0, sy = by + bh - 0.5 - y1 * 0.72, ex = bx + 0.5 + x2 * 1.0, ey = by + bh - 0.5 - y2 * 0.72;
    s.addShape(pres.shapes.LINE, { x: sx, y: Math.min(sy, ey), w: ex - sx, h: Math.abs(ey - sy) || 0.001, line: { color: C.ACCENT, width: 3 } });
  }
  s.addText("prediction = average value in each region (steps, not slopes)", { x: bx + 0.3, y: by + bh + 0.15, w: bw - 0.6, h: 0.35, fontSize: 12, fontFace: FONT, color: C.MUTED, margin: 0 });
  L.bullets(s, [
    { t: "\"MedInc < 3.2? → room A : room B\" … then predict the room's average price", b: true },
    "Same tree machinery as classification (full tour in S06)",
    { t: "California results:", b: true },
    { t: "unrestricted: train R² 1.000 (!) · test 0.623", c: "9F1239", b: true },
    { t: "max_depth=8:   test 0.678, MAE 0.448", c: C.PRIMARY_DARK, b: true },
    "the S04 overfitting curve, live on housing data",
  ], { x: 6.8, y: 2.2, w: W - 6.8 - M, h: 4.2, size: 14, gap: 9 });
}

// 12 · KNN regression
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Fix #3", title: "KNN regression: you cost what your neighbors cost", pageNo: ++pn });
  L.codeBlock(s, pres, { x: M, y: 2.0, w: 7.4, h: 1.7, size: 13.5, lines: [
    { t: "KNeighborsRegressor(n_neighbors=10)" },
    { t: "# prediction = average value of the 10 most similar block groups" },
  ]});
  L.compTable(s, pres, {
    x: M, y: 4.0, w: 7.4, colW: [3.4, 2.0, 2.0], fontSize: 13.5, rowH: 0.45,
    rows: [
      ["model", "MAE", "R²"],
      ["LinearRegression", "0.533", "0.576"],
      ["DecisionTree(depth 8)", "0.448", "0.678"],
      [{ t: "KNN (k=10)", b: true }, { t: "0.440", b: true }, { t: "0.678", b: true }],
    ],
  });
  L.bullets(s, [
    { t: "Neighbors VOTE (classification) or AVERAGE (regression) — same trick as S01", b: true },
    { t: "Local memory beats the straight line (0.576 → 0.678) · needs scaling (S03!)", b: true, c: C.PRIMARY_DARK },
  ], { x: M, y: 5.95, w: 7.4, h: 0.9, size: 12.5, gap: 6 });
  L.card(s, pres, { x: 8.2, y: 2.0, w: W - 8.2 - M, h: 4.6, title: "So which is \"best\"?", body: "Same R² (0.678), different stories:\n\nKNN — \"similar places cost similar\"\nTree — readable if-then rules\nBoth beat Linear, but Linear gives the cleanest EXPLANATION.\n\nPrediction ≠ explanation — decide which one your stakeholder needs.", bodySize: 14.5 });
}

// 13 · full table
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Scoreboard", title: "Everything we ran today (test set)", pageNo: ++pn });
  L.compTable(s, pres, {
    x: M, y: 2.05, w: W - 2 * M, colW: [4.6, 2.2, 2.2, 2.77], fontSize: 14, rowH: 0.5,
    rows: [
      ["model", "MAE", "R²", "note"],
      [{ t: "Dummy(median)", c: C.MUTED }, "0.874", "−0.05", "floor"],
      ["LinearRegression", "0.533", "0.576", "readable weights"],
      ["Ridge(α=1)", "0.533", "0.576", "= linear here: few clean features"],
      ["Lasso(α=0.1)", "0.622", "0.481", "α too harsh — tune it (S07)"],
      ["Tree (unrestricted)", "0.453", "0.624", { t: "train R² 1.000 — memorized", c: "9F1239" }],
      [{ t: "Tree (depth 8)", b: true }, { t: "0.448", b: true }, { t: "0.678", b: true }, "restricted = better"],
      [{ t: "KNN (k=10)", b: true }, { t: "0.440", b: true }, { t: "0.678", b: true }, "needs scaling"],
    ],
  });
  s.addText("MAE in $100k units: 0.44 ≈ \"average miss of $44,000\" — always translate metrics into money/sentence.",
    { x: M, y: 6.35, w: W - 2 * M, h: 0.45, fontSize: 14, fontFace: FONT, bold: true, color: C.PRIMARY_DARK, margin: 0 });
}

// 14 · guide
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Guide", title: "Which regressor when?", pageNo: ++pn });
  L.compTable(s, pres, {
    x: M, y: 2.05, w: W - 2 * M, colW: [4.0, 2.9, 2.5, 2.7], fontSize: 13, rowH: 0.6,
    rows: [
      ["situation", "start with", "strength", "watch out"],
      ["Need explanation / report", "LinearRegression", "weights = story", "only linear patterns"],
      ["Many/collinear/poly features", "Ridge", "tames weights", "pick α (S07)"],
      ["Want feature selection", "Lasso", "zeroes weights", "α sensitive"],
      ["Non-linear, tabular", "Tree (depth-limited)", "steps & rules", "memorizes if free"],
      ["Local similarity matters", "KNN Regressor", "no training at all", "scale + slow deploy"],
    ],
  });
  s.addText("“Need the best tabular accuracy”? That's ensembles — Session 06.",
    { x: M, y: 5.95, w: W - 2 * M, h: 0.45, fontSize: 14.5, fontFace: FONT, bold: true, color: "92400E", margin: 0 });
}

// 15 · pitfalls
{
  const s = L.content(pres, { sessionTag: TAG, kicker: "Pitfalls", title: "Four ways regression fools you", pageNo: ++pn });
  const w = (W - 2 * M - 1.2) / 4, y = 2.05, h = 3.7;
  L.card(s, pres, { x: M, y, w, h, title: "Extrapolation", body: "Trained on incomes up to $150k — asked about $500k.\nLinear happily predicts outside reality. Trees can't even (they clamp).\nKnow the data's borders.", bodySize: 12.5 });
  L.card(s, pres, { x: M + w + 0.4, y, w, h, title: "Outliers & RMSE", body: "One $5M mansion drags squared error.\nRMSE punishes it; MAE shrugs.\nChoose which behavior you WANT (S04).", bodySize: 12.5 });
  L.card(s, pres, { x: M + 2 * (w + 0.4), y, w, h, title: "Log targets", body: "Prices span 0.15–5.0 × $100k — skewed.\nnp.log1p(y) at train, np.expm1 at predict → relative errors, saner model.", bodySize: 12.5 });
  L.card(s, pres, { x: M + 3 * (w + 0.4), y, w, h, title: "R² worship", body: "R² 0.99 on train, 0.62 on test = decoration.\nAnd R² compares to the mean-baseline only —\nalways pair with MAE in units.", bodySize: 12.5 });
}

// 16 · Lab
L.labSlide(pres, {
  sessionTag: TAG, pageNo: ++pn, num: "05",
  title: "ทำนายราคาบ้านแคลิฟอร์เนีย — Regression showdown",
  goal: "Run the full model zoo on California housing with the S04 protocol: baseline, pipeline, honest comparison, human-readable takeaway.",
  tasks: [
    "โหลด California housing แล้วแบ่ง 80/20 (random_state=42) — ใส่ทุกโมเดลใน Pipeline ที่มี StandardScaler",
    "เริ่มด้วย DummyRegressor แล้ว LinearRegression — รายงาน MAE และ R²",
    "ตีความสัมประสิทธิ์ของ LinearRegression: ฟีเจอร์ไหนผลักดันราคาขึ้น/ลงมากที่สุด?",
    "เทียบ DecisionTree (ไม่จำกัด vs max_depth=8) — ช่องว่าง train/test บอกอะไร?",
    "โจทย์ชวนคิด: ลอง Ridge กับ alpha หลายค่า (0.01, 1, 100) — สัมประสิทธิ์เปลี่ยนยังไง และอธิบายว่าทำไม Lasso(alpha=0.1) ถึงแย่กว่า Linear",
  ],
  vibe: "ลองถาม AI: “แปลง MAE 0.44 ในหน่วย $100k ให้เป็นประโยคภาษาคนสำหรับรายงานผู้บริหาร” — แล้วเขียนสรุป 2 บรรทัดของตัวเองว่าโมเดลไหนควรใช้เพราะอะไร",
});

// 17 · Takeaways
L.takeaways(pres, {
  sessionTag: TAG, pageNo: ++pn,
  items: [
    "Linear regression = one weighted sum; weights are the model's beliefs (income +0.85σ, latitude −0.90σ).",
    "Ridge shrinks all weights (L2); Lasso zeroes some (L1) — they matter when features are many or engineered.",
    "Trees and KNN capture bends (0.576 → 0.678 on housing) but an unrestricted tree memorizes (train R² 1.0).",
    "Always anchor to Dummy (MAE 0.874 / R² −0.05) and translate metrics: 0.44 ≈ $44k average miss.",
    "Prediction ≠ explanation: pick the model your decision needs.",
  ],
  nextTag: "Session 06", nextTitle: "Classification & Ensembles — trees, and committees of trees",
});

L.save(pres, "D:/Repositories/AI_course_MasterDegree/slides/05 Regression Models.pptx").then(() => console.log("05 done"));
