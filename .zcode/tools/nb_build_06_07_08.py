# Build demo 06 + 07 + 08
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from nb_lib import make_notebook, md, code, save

ROOT = r"D:/Repositories/AI_course_MasterDegree"

# ---------------- Demo 06 ----------------
cells = []
cells.append(md("""
# Demo 06 — Classification & Ensembles

**Machine Learning with scikit-learn — Session 06**

รันตามสไลด์คาบ 6 — เปิด black box ที่เหลือทั้งหมด (logistic, tree, NB, SVM) แล้วปล่อย "คณะกรรมการโมเดล" ลงไปโหวต
"""))

cells.append(md("""
## Setup — breast cancer + stratified CV (โปรโตคอลคาบ 4)
"""))
cells.append(code("""
from sklearn.datasets import load_breast_cancer
from sklearn.dummy import DummyClassifier
from sklearn.ensemble import RandomForestClassifier, HistGradientBoostingClassifier, VotingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedKFold, cross_val_score, train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier, export_text

X, y = load_breast_cancer(return_X_y=True)
names = load_breast_cancer().feature_names
skf = StratifiedKFold(5, shuffle=True, random_state=42)
Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, stratify=y, random_state=42)
"""))

cells.append(md("""
## Slide 4-5 — Logistic regression: a probability pump

z = w·x + b (เหมือน linear) แล้วบีบด้วย sigmoid ให้กลายเป็นความน่าจะเป็น 0-1
"""))
cells.append(code("""
lr = make_pipeline(StandardScaler(), LogisticRegression(max_iter=5000)).fit(Xtr, ytr)
print("proba of first 3 patients (benign, malignant):")
print(lr.predict_proba(Xte[:3]).round(3))
"""))
cells.append(code("""
import pandas as pd
coefs = pd.Series(lr[-1].coef_[0], index=names)
coefs.reindex(coefs.abs().sort_values(ascending=False).index)[:5].round(2)
"""))
cells.append(md("""
weight คือ "น้ำหนักความเชื่อ" ในหน่วย log-odds (ฟีเจอร์ถูก scale แล้ว) — อ่านขนาดเทียบกันได้ว่าหลักฐานไหนหนักกว่า
"""))

cells.append(md("""
## Slide 7 — A real fitted tree, read aloud

ต้นไม้ depth 3 ที่ fit แล้ว — **ตัวโมเดลทั้งชิ้นอ่านเป็นประโยคได้เลย**
"""))
cells.append(code("""
tree3 = DecisionTreeClassifier(max_depth=3, random_state=42).fit(Xtr, ytr)
print(export_text(tree3, feature_names=list(names), max_depth=2))
"""))
cells.append(md("""
"ถ้ารัศมีก้อนเนื้อไม่เกิน 16.8 มม. และ concave points ไม่เกิน 0.14 → แนวโน้มเป็นเนื้องอกดี"
 — นี่คือเหตุผลที่โรงพยาบาลชอบ decision tree: audit ทุกการตัดสินใจได้
"""))

cells.append(md("""
## Slide 8 — Unleashed, a tree memorizes everything

tree อิสระ vs จำกัด depth — ความจำเป็นพิษ (train 1.000 แต่ CV แย่สุดของวัน)
"""))
cells.append(code("""
for name, m in [("free tree", DecisionTreeClassifier(random_state=42)),
                ("depth-3 tree", DecisionTreeClassifier(max_depth=3, random_state=42))]:
    acc = cross_val_score(m, X, y, cv=skf).mean()
    auc = cross_val_score(m, X, y, cv=skf, scoring="roc_auc").mean()
    print(f"{name:12s} CV acc={acc:.3f}  AUC={auc:.3f}")
"""))

cells.append(md("""
## Slide 9 — The 90-second tour: Naive Bayes & SVM
"""))
cells.append(code("""
for name, m in [("GaussianNB", make_pipeline(StandardScaler(), GaussianNB())),
                ("SVM (RBF)",  make_pipeline(StandardScaler(), SVC(random_state=42))),
                ("KNN (5)",    make_pipeline(StandardScaler(), KNeighborsClassifier()))]:
    acc = cross_val_score(m, X, y, cv=skf).mean()
    auc = cross_val_score(m, X, y, cv=skf, scoring="roc_auc").mean()
    print(f"{name:12s} CV acc={acc:.3f}  AUC={auc:.3f}")
"""))

cells.append(md("""
## Slide 12 — RandomForest: bagging + a random twist

tree ลึก 100 ต้น แต่ละต้นเห็นข้อมูล/ฟีเจอร์คนละส่วน → โหวต → variance หายไป
"""))
cells.append(code("""
rf = RandomForestClassifier(random_state=42)
acc = cross_val_score(rf, X, y, cv=skf).mean()
auc = cross_val_score(rf, X, y, cv=skf, scoring="roc_auc").mean()
print(f"RandomForest(100)  CV acc={acc:.3f}  AUC={auc:.3f}")
"""))
cells.append(code("""
rf_fit = RandomForestClassifier(random_state=42).fit(Xtr, ytr)
imp = pd.Series(rf_fit.feature_importances_, index=names)
imp.sort_values(ascending=False)[:5].round(3)
"""))
cells.append(md("""
importance บอกว่า "ป่า" ใช้คอลัมน์ไหนจริง ๆ — แต่ระวัง: ฟีเจอร์ที่สัมพันธ์กันเองจะแบ่งเครดิตกัน อ่านเป็นแนวทาง ไม่ใช่คำพิพากษา
"""))

cells.append(md("""
## Slide 13 — Boosting: each tree fixes the last one's mistakes

HistGradientBoosting = sklearn's fast boosting (รองรับ NaN ในตัว!) — พี่น้องกับ XGBoost/LightGBM
"""))
cells.append(code("""
hgb = HistGradientBoostingClassifier(random_state=42)
acc = cross_val_score(hgb, X, y, cv=skf).mean()
auc = cross_val_score(hgb, X, y, cv=skf, scoring="roc_auc").mean()
print(f"HistGradientBoosting  CV acc={acc:.3f}  AUC={auc:.3f}")
"""))

cells.append(md("""
## Slide 14 — Voting: mix different species

สมาชิกควร "ไม่เห็นด้วยกัน" บ้าง (diversity) — logistic + forest + KNN
"""))
cells.append(code("""
vote = VotingClassifier([
    ("lr",  make_pipeline(StandardScaler(), LogisticRegression(max_iter=5000))),
    ("rf",  RandomForestClassifier(random_state=42)),
    ("knn", make_pipeline(StandardScaler(), KNeighborsClassifier())),
], voting="soft")   # ใช้ probability เฉลี่ย (ดีกว่าโหวตแบบ label)

acc = cross_val_score(vote, X, y, cv=skf).mean()
auc = cross_val_score(vote, X, y, cv=skf, scoring="roc_auc").mean()
print(f"Voting(LR+RF+KNN)  CV acc={acc:.3f}  AUC={auc:.3f}")
"""))
cells.append(md("""
สรุปสไลด์ 15: บนข้อมูลง่ายแบบนี้ SVM (0.977) ชนะเฉียด ๆ — **ไม่มีโมเดลชนะทุกที่** วิธีเทียบของคาบ 4 ต่างหากคือทักษะที่แท้จริง
"""))

cells.append(md("""
---
✅ **จบ Demo 06** — **Lab 06**: `excercises/06.classification_ensembles_exercise.ipynb`
"""))
save(make_notebook(cells), f"{ROOT}/demos/06.classification_ensembles_demo.ipynb")

# ---------------- Demo 07 ----------------
cells = []
cells.append(md("""
# Demo 07 — Unsupervised Learning + Hyperparameter Tuning

**Machine Learning with scikit-learn — Session 07**

รันตามสไลด์คาบ 7 — หาโครงสร้างที่ไม่มีใครติดป้ายให้ (clustering, PCA) แล้วเรียน tuning โมเดลอย่างมีวินัย
"""))

cells.append(md("""
## Setup — wine dataset: 178 ไวน์ × 13 สารเคมี (ซ่อนสายพันธุ์องุ่น 3 สายพันธุ์ไว้)

**สำคัญ: วันนี้ไม่มี y** — KMeans เห็นแค่ X ส่วน y จะใช้ "ตรวจคำตอบ" ตอนท้ายเท่านั้น
"""))
cells.append(code("""
import numpy as np
from sklearn.cluster import KMeans
from sklearn.datasets import load_wine
from sklearn.decomposition import PCA
from sklearn.metrics import adjusted_rand_score, silhouette_score
from sklearn.preprocessing import StandardScaler

X, y = load_wine(return_X_y=True)
Xs = StandardScaler().fit_transform(X)   # clustering ก็เป็นเรื่อง "ระยะทาง" → scale ก่อนเสมอ!
print(X.shape)
"""))

cells.append(md("""
## Slide 4 — KMeans: plant flags, regroup, repeat
"""))
cells.append(code("""
km = KMeans(n_clusters=3, n_init=10, random_state=42)
labels = km.fit_predict(Xs)          # ไม่มี y ในคำสั่งนี้เลย
labels[:20]
"""))

cells.append(md("""
## Slide 5 — Choosing k: elbow & silhouette
"""))
cells.append(code("""
for k in range(2, 9):
    km = KMeans(k, n_init=10, random_state=42).fit(Xs)
    print(f"k={k}  inertia={km.inertia_:7.1f}  silhouette={silhouette_score(Xs, km.labels_):.3f}")
"""))
cells.append(md("""
- elbow: มองหา "หักศอก" ของ inertia (ชะลอตัวราว k=3)
- silhouette (วัด -1..1): **พีคที่ k=3 (0.285)** ✓ — สองเครื่องมือชี้ไปทางเดียวกัน
"""))

cells.append(md("""
## Slide 6 — ★ The reveal: KMeans found the 3 cultivars — blind
"""))
cells.append(code("""
km3 = KMeans(3, n_init=10, random_state=42).fit(Xs)
print("cluster sizes:", np.bincount(km3.labels_))
print("adjusted Rand index vs hidden labels:", round(adjusted_rand_score(y, km3.labels_), 3))
"""))
cells.append(md("""
**0.897** — อัลกอริทึมไม่เคยเห็น label เลย แต่ค้นพบสายพันธุ์องุ่น 3 กลุ่มที่นักกีตาร์...ตี๋...ขอโทษ นักพันธุ์ศาสตร์ใช้เวลาหลายสิบปีจัดให้ 🍷
"""))

cells.append(md("""
## Slide 7 — Clusters are only useful if you can NAME them
"""))
cells.append(code("""
import pandas as pd
df = pd.DataFrame(X, columns=load_wine().feature_names)
df["cluster"] = km3.labels_
df.groupby("cluster")[["alcohol", "flavanoids", "proline"]].mean().round(1)
"""))
cells.append(md("""
ลองตั้งชื่อกลุ่มจากตารางนี้ — เช่น cluster ที่แอลกอฮอล์สูง/proline สูง = "กลุ่มไวน์เข้ม"
ในเชิงธุรกิจ นี่คือขั้น "ตั้งชื่อ segment" ที่ทำให้ผล clustering มีค่า
"""))

cells.append(md("""
## Slide 9-10 — PCA: 13 features → 2 axes that matter most
"""))
cells.append(code("""
pca2 = PCA(n_components=2)
Z = pca2.fit_transform(Xs)
print("explained variance:", pca2.explained_variance_ratio_.round(3), "=", pca2.explained_variance_ratio_.sum().round(3))
"""))
cells.append(code("""
import matplotlib.pyplot as plt

plt.figure(figsize=(6.5, 5))
plt.scatter(Z[:, 0], Z[:, 1], c=km3.labels_, cmap="viridis", s=40, alpha=0.8)
plt.xlabel("PC1 (36.2%)"); plt.ylabel("PC2 (19.2%)")
plt.title("wine in 2D — colored by cluster (not by true label!)")
plt.colorbar(label="cluster")
plt.show()
"""))
cells.append(md("""
3 กลุ่มแยกกันชัดในภาพ 2 มิติ — ทั้งที่โมเดลทำงานใน 13 มิติ (และไม่เคยเห็น label)
"""))

cells.append(md("""
## Part 2 — Tuning: Grid & Randomized search

### Slide 12-13 — หลักการ

GridSearchCV = ลองทุกชุดค่าในกริด × 5 folds · RandomizedSearchCV = สุ่ม n_iter จุดจาก distribution (ถูกกว่ามากเมื่อกริดใหญ่)
ทุกอย่างวัดด้วย **CV บน train เท่านั้น** — test ยังนอนเก็บตัวอยู่
"""))
cells.append(code("""
from scipy.stats import randint
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import RandomizedSearchCV, train_test_split
from sklearn.datasets import load_breast_cancer

Xc, yc = load_breast_cancer(return_X_y=True)
Xctr, Xcte, yctr, ycte = train_test_split(Xc, yc, test_size=0.25, stratify=yc, random_state=42)

rf_default = RandomForestClassifier(random_state=42).fit(Xctr, yctr)
print("RF default test:", round(rf_default.score(Xcte, ycte), 3))
"""))
cells.append(code("""
param_dist = {
    "n_estimators": randint(50, 500),
    "max_depth": [None, 4, 6, 8, 12],
    "min_samples_leaf": [1, 2, 4],
    "max_features": ["sqrt", "log2", None],
}
rs = RandomizedSearchCV(RandomForestClassifier(random_state=42), param_dist,
                        n_iter=30, cv=5, random_state=42, n_jobs=-1)
rs.fit(Xctr, yctr)
print("best CV:", round(rs.best_score_, 3), "| params:", rs.best_params_)
print("tuned test:", round(rs.score(Xcte, ycte), 3))
"""))
cells.append(md("""
ผลแบบตรงไปตรงมา: CV ดีขึ้น 0.958 → 0.965 แต่ **test อยู่ที่ 0.958 เท่าเดิม** — ข้อมูลนี้ใกล้เพดานแล้ว
กระบวนการถูกต้องอยู่ดี และเรารายงานทั้งสองตัวเลขตามตรง (เรื่องนี้จะเจออีกครั้งตอนทำโปรเจ็ค)
"""))

cells.append(md("""
## Slide 15 — Learning curves: more data or more model?
"""))
cells.append(code("""
import numpy as np
from sklearn.model_selection import learning_curve

sizes, tr_scores, va_scores = learning_curve(
    RandomForestClassifier(random_state=42, n_jobs=-1), Xc, yc, cv=5,
    train_sizes=np.array([0.1, 0.25, 0.5, 0.75, 1.0]))
print("sizes     :", sizes)
print("train     :", tr_scores.mean(1).round(3), "← ท่องจำที่ขนาดไหนก็ 1.0")
print("validation:", va_scores.mean(1).round(3), "← ยิ่งมี data ยิ่งดีขึ้น")
"""))

cells.append(md("""
## Slide 17 — Save the winner (the WHOLE pipeline) with joblib
"""))
cells.append(code("""
import joblib
joblib.dump(rs.best_estimator_, "best_rf.joblib")

loaded = joblib.load("best_rf.joblib")
loaded.predict(Xcte[:3])
"""))

cells.append(md("""
---
✅ **จบ Demo 07** — **Lab 07**: `excercises/07.clustering_tuning_exercise.ipynb`
"""))
save(make_notebook(cells), f"{ROOT}/demos/07.clustering_tuning_demo.ipynb")

# ---------------- Demo 08 ----------------
cells = []
cells.append(md("""
# Demo 08 — Final Project Walkthrough: Customer Churn

**Machine Learning with scikit-learn — Session 08**

โน้ตบุ๊คนี้คือ "ฉบับอาจารย์" ของโปรเจ็คจบคอร์ส — เดินครบทั้ง 8 ขั้นตอนด้วยความเร็วสไลด์
ตัวคุณเองจะทำฉบับเต็ม (พร้อม EDA/error analysis ของตัวเอง) ใน **Lab 08**
"""))

cells.append(md("""
## Step 0 — Load + the TotalCharges trap
"""))
cells.append(code("""
import pandas as pd
import numpy as np

url = "https://raw.githubusercontent.com/IBM/telco-customer-churn-on-icp4d/master/data/Telco-Customer-Churn.csv"
df = pd.read_csv(url)
df["TotalCharges"] = pd.to_numeric(df["TotalCharges"], errors="coerce")   # ' ' → NaN 11 จุด
df.shape
"""))

cells.append(md("""
## Step 1 — EDA highlights (ของจริง 3 ข้อ)
"""))
cells.append(code("""
churn = (df["Churn"] == "Yes").astype(int)
print("churn rate:", round(churn.mean(), 3))
df.assign(churn=churn).groupby("Contract")["churn"].agg(["mean", "count"]).round(3)
"""))
cells.append(md("""
Month-to-month 42.7% vs Two-year 2.8% — ประเภทสัญญาคือพระเอกของเรื่องนี้
"""))
cells.append(code("""
df.assign(churn=churn).groupby("InternetService")["churn"].mean().round(3)
"""))
cells.append(code("""
df.assign(churn=churn).groupby("churn")[["tenure", "MonthlyCharges"]].mean().round(1)
"""))

cells.append(md("""
## Step 2 — Split FIRST + pipeline (ไม่มี leakage แม้แต่บรรทัดเดียว)
"""))
cells.append(code("""
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedKFold, cross_val_score, train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

X = df.drop(columns=["customerID", "Churn"])
y = churn
num_cols = ["tenure", "MonthlyCharges", "TotalCharges"]
cat_cols = [c for c in X.columns if c not in num_cols]

Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

pre = ColumnTransformer([
    ("num", Pipeline([("imp", SimpleImputer(strategy="median")),
                      ("sc", StandardScaler())]), num_cols),
    ("cat", Pipeline([("imp", SimpleImputer(strategy="most_frequent")),
                      ("oh", OneHotEncoder(handle_unknown="ignore"))]), cat_cols)])
"""))

cells.append(md("""
## Step 3-5 — Baseline → model zoo → (CV, ไม่แตะ test)
"""))
cells.append(code("""
from sklearn.dummy import DummyClassifier
from sklearn.ensemble import RandomForestClassifier, HistGradientBoostingClassifier

skf = StratifiedKFold(5, shuffle=True, random_state=42)
zoo = [
    ("Dummy", DummyClassifier(strategy="most_frequent")),
    ("RandomForest", RandomForestClassifier(random_state=42, n_jobs=-1)),
    ("HistGradBoost", HistGradientBoostingClassifier(random_state=42)),
    ("LogisticRegression", LogisticRegression(max_iter=2000)),
]
for name, m in zoo:
    pipe = Pipeline([("pre", pre), ("m", m)])
    auc = cross_val_score(pipe, Xtr, ytr, cv=skf, scoring="roc_auc").mean()
    print(f"{name:20s} CV AUC={auc:.3f}")
"""))
cells.append(md("""
LogisticRegression ธรรมดา ๆ ชนะ (0.846) — ฟีเจอร์สะอาด + linear separable พอดี แถมอ่านสัมประสิทธิ์ได้
"""))

cells.append(md("""
## Step 6 — Threshold is a BUSINESS decision
"""))
cells.append(code("""
from sklearn.metrics import precision_score, recall_score, f1_score, roc_auc_score

pipe = Pipeline([("pre", pre), ("m", LogisticRegression(max_iter=2000))]).fit(Xtr, ytr)
proba = pipe.predict_proba(Xte)[:, 1]
print("test AUC:", round(roc_auc_score(yte, proba), 3))
print()
for th in [0.35, 0.50, 0.65]:
    yp = (proba >= th).astype(int)
    print(f"threshold {th:.2f}: recall={recall_score(yte, yp):.2f}  precision={precision_score(yte, yp):.2f}")
"""))

cells.append(md("""
## Step 7 — Error analysis: what drives churn
"""))
cells.append(code("""
feature_names = pipe[:-1].get_feature_names_out()
coefs = pd.Series(pipe[-1].coef_[0], index=[n.split("__")[1] for n in feature_names])
coefs.reindex(coefs.abs().sort_values(ascending=False).index)[:8].round(2)
"""))
cells.append(md("""
อ่านเป็นประโยคธุรกิจได้เลย:
"tenure ยิ่งสั้นยิ่งเสี่ยง · month-to-month เสี่ยงกว่าสัญญาปี · ลูกค้า fiber เสี่ยงผิดปกติสูง"
"""))

cells.append(md("""
## Step 8 — Final word: test ONCE
"""))
cells.append(code("""
yp = (proba >= 0.5).astype(int)
print(f"CV AUC 0.846 → test AUC {roc_auc_score(yte, proba):.3f}  (gap จิ๋วๆ — ซื่อสัตย์ดี)")
print(f"recall {recall_score(yte, yp):.2f} | f1 {f1_score(yte, yp):.3f} | accuracy {(yte == yp).mean():.3f}")
"""))

cells.append(md("""
---
✅ **จบ Demo 08** — ต่อไปคือฉบับของคุณเอง: **Lab 08** ใน `excercises/08.final_project_starter.ipynb`
เชลย์ฉบับเต็มอยู่ที่ `excercises/solutions/08.final_project_solution.ipynb` (อย่าแอบดูก่อนทำนะครับ 😄)
"""))
save(make_notebook(cells), f"{ROOT}/demos/08.final_project_demo.ipynb")
