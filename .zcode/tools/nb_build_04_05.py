# Build demo 04 + 05
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from nb_lib import make_notebook, md, code, save

ROOT = r"D:/Repositories/AI_course_MasterDegree"

# ---------------- Demo 04 ----------------
cells = []
cells.append(md("""
# Demo 04 — Model Evaluation & Cross-Validation

**Machine Learning with scikit-learn — Session 04**

รันตามสไลด์คาบ 4 — คาบที่สำคัญที่สุดของคอร์ส: เรียนรู้วิธี "วัดคะแนนอย่างซื่อสัตย์"
โมเดลวันนี้เป็น black box ได้ (เปิดกล่องจริงในคาบ 5-6) — วันนี้เราสนใจแค่ตัวเลขที่ออกมา
"""))

cells.append(md("""
## Slide 4 — The exam analogy: watch memorization happen

KNN กับ k=1: จุดที่ใกล้ที่สุดของทุกจุดคือตัวมันเอง → ทาย train ถูก 100% เป็นเนื้อๆ
"""))
cells.append(code("""
from sklearn.datasets import load_breast_cancer, load_diabetes
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier

Xc, yc = load_breast_cancer(return_X_y=True)
Xtr, Xte, ytr, yte = train_test_split(Xc, yc, test_size=0.25, stratify=yc, random_state=42)

knn1 = KNeighborsClassifier(n_neighbors=1).fit(Xtr, ytr)
print(f"k=1 : train={knn1.score(Xtr, ytr):.3f}  test={knn1.score(Xte, yte):.3f}")

knn13 = KNeighborsClassifier(n_neighbors=13).fit(Xtr, ytr)
print(f"k=13: train={knn13.score(Xtr, ytr):.3f}  test={knn13.score(Xte, yte):.3f}")
"""))
cells.append(md("""
ช่องว่าง train กับ test ของ k=1 คือ "คำโกหก" — คะแนนจำ (memorization) ไม่ใช่คะแนนเข้าใจ
"""))

cells.append(md("""
## Slide 6 — Grow a tree, watch the gap open

ปล่อยต้นไม้โตขึ้นเรื่อย ๆ (max_depth 1→12) แล้วดู train กับ test แยกทางกันเมื่อไหร่
"""))
cells.append(code("""
for depth in [1, 2, 3, 4, 6, 8, 12]:
    tree = DecisionTreeClassifier(max_depth=depth, random_state=42).fit(Xtr, ytr)
    print(f"depth={depth:2d}  train={tree.score(Xtr, ytr):.3f}  test={tree.score(Xte, yte):.3f}")
"""))
cells.append(md("""
- depth 1-3: สองคะแนนขึ้นด้วยกัน = กำลังเรียนรู้
- depth 3-4: test ถึงจุดสูงสุด (0.944) = sweet spot
- depth 8+: train พุ่งเป็น 1.000 แต่ test ตก = เริ่มท่องจำผู้ป่วยรายคน (overfitting)
"""))

cells.append(md("""
## Slide 7 — Your holdout score is a lottery ticket

ข้อมูลเล็ก + แบ่งครั้งเดียว = คะแนนขึ้นลงตามดวง: diabetes 442 แถว โมเดลเดิม โค้ดเดิม เปลี่ยนแค่ random_state
"""))
cells.append(code("""
from sklearn.linear_model import LinearRegression

Xd, yd = load_diabetes(return_X_y=True)
for seed in range(10):
    a, b, c, d = train_test_split(Xd, yd, test_size=0.25, random_state=seed)
    print(f"random_state={seed}:  holdout R2 = {LinearRegression().fit(a, c).score(b, d):.3f}")
"""))
cells.append(md("""
R² วิ่งตั้งแต่ 0.36 ถึง 0.59 — ถ้าเจ้านายถามว่าโมเดลดีแค่ไหน คุณจะตอบตัวไหน? 🎲
"""))

cells.append(md("""
## Slide 8-9 — k-fold CV: every point takes a turn
"""))
cells.append(code("""
from sklearn.model_selection import cross_val_score
import numpy as np

scores = cross_val_score(LinearRegression(), Xd, yd, cv=5)
print("fold scores:", scores.round(3))
print(f"mean {scores.mean():.3f} ± {scores.std():.3f}")
"""))
cells.append(md("""
0.482 ± 0.049 — นิ่งและซื่อสัตย์กว่า holdout เด้ง ๆ มาก

ข้อมูลทุกแถวได้เป็นทั้งครู (train) และผู้เข้าสอบ (validation) ครบหนึ่งรอบ
"""))

cells.append(md("""
## Slide 10 — Regression metrics: MAE · RMSE · R²
"""))
cells.append(code("""
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

a, b, c, d = train_test_split(Xd, yd, test_size=0.25, random_state=42)
lr = LinearRegression().fit(a, c)
yp = lr.predict(b)
print(f"MAE  = {mean_absolute_error(d, yp):.1f}   # พลาดเฉลี่ย ±41.5 คะแนนโรค")
print(f"RMSE = {np.sqrt(mean_squared_error(d, yp)):.1f}   # ลงโทษความพลาดใหญ่หนักกว่า")
print(f"R2   = {r2_score(d, yp):.3f}   # อธิบาย variance ได้ ~49%")
"""))

cells.append(md("""
## Slide 11 — The confusion matrix: four cells of truth

กลับไป breast cancer — KNN บน test set 143 คน (positive = malignant เป็นเนื้อร้าย)
"""))
cells.append(code("""
from sklearn.metrics import confusion_matrix

knn = KNeighborsClassifier().fit(Xtr, ytr)
yp = knn.predict(Xte)
cm = confusion_matrix(yte, yp)
print(cm)
"""))
cells.append(code("""
from sklearn.metrics import precision_score, recall_score, f1_score, roc_auc_score

print(f"accuracy  = {(yte == yp).mean():.3f}")
print(f"precision = {precision_score(yte, yp):.3f}   # ของกล้องเตือนที่ดัง 86 ครั้ง จริงกี่ครั้ง")
print(f"recall    = {recall_score(yte, yp):.3f}   # ของผู้ป่วยจริง 90 คน จับได้กี่คน")
print(f"f1        = {f1_score(yte, yp):.3f}")
print(f"roc-auc   = {roc_auc_score(yte, knn.predict_proba(Xte)[:, 1]):.3f}")
"""))
cells.append(md("""
- **6 false positives**: คนสุขภาพดีถูกส่งตรวจซ้ำ = เสียเงิน เสียความกลัว
- **4 false negatives**: ผู้ป่วยมะเร็งถูกบอกว่า "ปกติ" = เสียชีวิต

accuracy เพียงตัวเดียวบอกเราไม่ได้เลยว่าพลาด "แบบไหน"
"""))

cells.append(md("""
## Slide 13 — ROC curve: judgment across ALL thresholds
"""))
cells.append(code("""
from sklearn.metrics import roc_curve
import matplotlib.pyplot as plt

proba = knn.predict_proba(Xte)[:, 1]
fpr, tpr, _ = roc_curve(yte, proba)

plt.figure(figsize=(5, 4.5))
plt.plot(fpr, tpr, color="#0D9488", lw=2.5, label=f"KNN (AUC={roc_auc_score(yte, proba):.3f})")
plt.plot([0, 1], [0, 1], "--", color="gray", label="random (AUC=0.5)")
plt.xlabel("false positive rate"); plt.ylabel("true positive rate")
plt.legend(); plt.show()
"""))

cells.append(md("""
## Slide 14 — When accuracy lies: imbalanced data

จำลองข้อมูลเบ้: คงผู้ป่วย malignant ไว้หมด แต่เหลือ benign แค่ 14% → positive rate ~19% (เหมือน fraud/churn)
"""))
cells.append(code("""
from sklearn.dummy import DummyClassifier
from sklearn.ensemble import RandomForestClassifier

rng = np.random.RandomState(7)
malign = np.where(yc == 0)[0]
benign = np.where(yc == 1)[0]
keep = np.concatenate([malign, rng.choice(benign, size=int(len(benign) * 0.14), replace=False)])
Xi, yi = Xc[keep], yc[keep]

Xi_tr, Xi_te, yi_tr, yi_te = train_test_split(Xi, yi, test_size=0.3, stratify=yi, random_state=42)

dumb = DummyClassifier(strategy="most_frequent").fit(Xi_tr, yi_tr)
p_dumb = dumb.predict(Xi_te)
print(f"Dummy (nobody is sick): acc={(p_dumb == yi_te).mean():.3f}  recall={recall_score(yi_te, p_dumb):.3f}")

knnb = KNeighborsClassifier().fit(Xi_tr, yi_tr)
p_knn = knnb.predict(Xi_te)
print(f"KNN                  : acc={(p_knn == yi_te).mean():.3f}  recall={recall_score(yi_te, p_knn):.3f}  f1={f1_score(yi_te, p_knn):.3f}")

rfw = RandomForestClassifier(random_state=42, class_weight="balanced").fit(Xi_tr, yi_tr)
p_rf = rfw.predict(Xi_te)
print(f"RF class_weight      : acc={(p_rf == yi_te).mean():.3f}  recall={recall_score(yi_te, p_rf):.3f}  f1={f1_score(yi_te, p_rf):.3f}")
"""))
cells.append(md("""
Dummy ได้ accuracy 81% ทั้งที่จับผู้ป่วยได้ **0 คน** — accuracy โกหกกับข้อมูลเบนเสมอ
ทางแก้: เลือก metric ให้ถูก (recall/F1) · `class_weight="balanced"` · ขยับ threshold
"""))

cells.append(md("""
## Slide 15-16 — Baselines + comparing models the honest way
"""))
cells.append(code("""
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import StratifiedKFold

skf = StratifiedKFold(5, shuffle=True, random_state=42)
models = [
    ("Dummy(stratified)", DummyClassifier(strategy="stratified", random_state=42)),
    ("Dummy(most_freq)",  DummyClassifier(strategy="most_frequent")),
    ("KNN(k=5)",          KNeighborsClassifier()),
    ("RandomForest(100)", RandomForestClassifier(random_state=42)),
]
for name, m in models:
    acc = cross_val_score(m, Xc, yc, cv=skf).mean()
    auc = cross_val_score(m, Xc, yc, cv=skf, scoring="roc_auc").mean()
    print(f"{name:20s} CV acc={acc:.3f}  CV AUC={auc:.3f}")
"""))
cells.append(md("""
กติกา 3 ข้อที่ฝังอยู่ใน cell เดียวกันนี้: **fold เดียวกันทุกโมเดล** (skf) · **หลาย metric** · **มี Dummy เป็นตัวเทียบ**
"""))

cells.append(md("""
## Slide 17 — The protocol for the rest of the course

- **CV ใช้ตัดสินใจ** (โมเดลไหน? k เท่าไหร่? ฟีเจอร์ชุดไหน?) — ทำบน train เท่านั้น
- **test ใช้ตอบคำถามสุดท้าย** ครั้งเดียว ตอนจบโปรเจ็ค
"""))

cells.append(md("""
---
✅ **จบ Demo 04** — ต่อไป: **Lab 04** ใน `excercises/04.evaluation_cv_exercise.ipynb` (ทำซ้ำทุกการทดลองของวันนี้ด้วยมือตัวเอง)
"""))
save(make_notebook(cells), f"{ROOT}/demos/04.evaluation_cv_demo.ipynb")

# ---------------- Demo 05 ----------------
cells = []
cells.append(md("""
# Demo 05 — Regression Models

**Machine Learning with scikit-learn — Session 05**

รันตามสไลด์คาบ 5 — เปิด black box: Linear / Ridge / Lasso / Tree / KNN regression บนข้อมูลราคาบ้านแคลิฟอร์เนีย
"""))

cells.append(md("""
## Slide 5 — California housing: 20,640 block groups

y = มูลค่าบ้านมัธยฐานของย่าน (หน่วย ×100k USD) — เราจะใช้โปรโตคอลคาบ 4: split ก่อน + baseline + test ครั้งเดียว
"""))
cells.append(code("""
from sklearn.datasets import fetch_california_housing
from sklearn.dummy import DummyRegressor
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsRegressor
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.tree import DecisionTreeRegressor
from sklearn.metrics import mean_absolute_error, r2_score

X, y = fetch_california_housing(return_X_y=True)
Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.2, random_state=42)
print(X.shape, "| target mean:", round(y.mean(), 2), "× $100k")
"""))

cells.append(md("""
## Slide 7 — Round 1: baseline vs linear
"""))
cells.append(code("""
def report(name, model):
    m = make_pipeline(StandardScaler(), model).fit(Xtr, ytr)
    yp = m.predict(Xte)
    print(f"{name:26s} MAE={mean_absolute_error(yte, yp):7.3f}  R2={r2_score(yte, yp):6.3f}")

report("Dummy(median)", DummyRegressor(strategy="median"))
report("LinearRegression", LinearRegression())
"""))
cells.append(md("""
Dummy ได้ R² **ติดลบ** (-0.05) = แย่กว่าทายค่าเฉลี่ยธรรมดา — นี่คือพื้นบ้านของโมเดลทุกตัว
"""))

cells.append(md("""
## Slide 6 — Reading the model's mind (coefficients)
"""))
cells.append(code("""
import pandas as pd
lr = make_pipeline(StandardScaler(), LinearRegression()).fit(Xtr, ytr)
names = fetch_california_housing().feature_names
pd.Series(lr[-1].coef_, index=names).round(2).sort_values(key=abs, ascending=False)
"""))
cells.append(md("""
- `MedInc +0.85σ` รายได้สูง → บ้านแพง
- `Latitude/Longitude` หนักมาก — แคลิฟอร์เนียคือเรื่องของภูมิศาสตร์ (ชายฝั่ง!)
- intercept ≈ 2.07 = ราคาเฉลี่ย ($207k) เมื่อทุกฟีเจอร์อยู่ที่ค่าเฉลี่ย
- ระวัง: นี่คือ *คำอธิบาย* ไม่ใช่ *ตัวกำหนดเหตุผล* (correlation ≠ causation)
"""))

cells.append(md("""
## Slide 10 — Regularization: Ridge & Lasso
"""))
cells.append(code("""
report("Ridge(alpha=1)", Ridge(alpha=1.0))
report("Lasso(alpha=0.1)", Lasso(alpha=0.1))
"""))
cells.append(md("""
- Ridge ≈ Linear เปี๊ยบ (0.576) — ข้อมูลนี้มีแค่ 8 ฟีเจอร์สะอาด ๆ ไม่มีอะไรให้ "งด"
- Lasso(0.1) แย่ลง (0.481) — ลงโทษหนักเกินไป: **alpha คือ hyperparameter ที่ต้อง tune** (คาบ 7)

regularization จะมีค่าตอบแทนเมื่อฟีเจอร์เยอะ/สัมพันธ์กันเอง/ใช้ polynomial features
"""))

cells.append(md("""
## Slide 11 — Trees: prediction = average of the room

tree ที่ปล่อยอิสระ vs จำกัด max_depth=8 — นี่คือบทเรียน overfitting จากคาบ 4 อีกครั้ง
"""))
cells.append(code("""
free_tree = DecisionTreeRegressor(random_state=42).fit(Xtr, ytr)
print(f"free tree : train R2={free_tree.score(Xtr, ytr):.3f}  test R2={free_tree.score(Xte, yte):.3f}  ← ท่องจำหมดแล้ว")

report("Tree(depth=8)", DecisionTreeRegressor(max_depth=8, random_state=42))
"""))

cells.append(md("""
## Slide 12 — KNN regression: neighbors average their values

โมเดลเดียวกับคาบ 1 แต่ผลลัพธ์เป็น "ค่าเฉลี่ยของเพื่อนบ้าน" แทน "เสียงโหวต"
"""))
cells.append(code("""
report("KNN(k=10)", KNeighborsRegressor(n_neighbors=10))
"""))

cells.append(md("""
## Slide 13 — Scoreboard + human translation
"""))
cells.append(code("""
print("พื้นบ้าน (Dummy) MAE 0.874 → KNN 0.440")
print("0.440 × $100k = พลาดเฉลี่ย ~$44,000 ต่อการทำนาย 1 ครั้ง")
"""))
cells.append(md("""
ตารางสุดท้าย (จากสไลด์): Dummy −0.05 · Linear 0.576 · Ridge 0.576 · Lasso(0.1) 0.481 · Tree ฟรี 0.623 (train 1.000!) · Tree(8) 0.678 · KNN 0.678

โมเดลเลขเดียวกัน แต่ "เรื่องเล่า" ต่างกัน: Linear อ่านสัมประสิทธิ์ได้ / Tree ให้กฎ / KNN ให้ logic ย่านเดียวกันราคาใกล้กัน —
เลือกตามสิ่งที่ stakeholder ต้องการ: **prediction หรือ explanation**
"""))

cells.append(md("""
---
✅ **จบ Demo 05** — **Lab 05**: `excercises/05.regression_exercise.ipynb`
"""))
save(make_notebook(cells), f"{ROOT}/demos/05.regression_demo.ipynb")
