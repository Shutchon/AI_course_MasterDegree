# Build Lab 07 + Lab 08 (exercise + solution pairs, Thai)
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from nb_lib import make_notebook, md, code, save

ROOT = r"D:/Repositories/AI_course_MasterDegree"
EX = f"{ROOT}/excercises"
SOL = f"{ROOT}/excercises/solutions"

# ================= LAB 07 : exercise =================
cells = []
cells.append(md("""
# Lab 07 — ค้นพบกลุ่มที่ซ่อนอยู่ + ปรับแต่งโมเดล (Wine & Tuning)

**Machine Learning with scikit-learn — Session 07**

## 🎯 วัตถุประสงค์
1. ทำ unsupervised ครบวงจร: เลือก k → เฉลย blind → ตั้งชื่อกลุ่ม
2. ใช้ PCA วาดภาพ 13 มิติเป็น 2 มิติ
3. ปรับแต่ง RandomForest ด้วย RandomizedSearchCV อย่างมีวินัย (CV เท่านั้น แตะ test ครั้งเดียว)

## 📝 คำแนะนำ
- จำกัดเวลาไว้ ~60 นาที
- clustering ต้อง **scale ก่อนเสมอ** (เป็นเรื่องระยะทาง เหมือน KNN)
"""))

cells.append(md("## ⚙️ Setup"))
cells.append(code("""
import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.datasets import load_wine
from sklearn.decomposition import PCA
from sklearn.metrics import adjusted_rand_score, silhouette_score
from sklearn.preprocessing import StandardScaler

X, y = load_wine(return_X_y=True)
feature_names = load_wine().feature_names

# TODO: scale ข้อมูลเป็น Xs


print(X.shape, Xs.shape)
"""))

cells.append(md("""
## โจทย์ 1 — เลือก k ด้วย elbow + silhouette

รัน KMeans k=2..8 เก็บ `inertia_` และ `silhouette_score` แล้วสร้างตาราง/กราฟ
**ตอบ:** k เท่าไหร่ดีที่สุด และสองเครื่องมือเห็นตรงกันไหม?
"""))
cells.append(code("""
# TODO: loop k=2..8 เก็บ inertia + silhouette


"""))

cells.append(md("""
## โจทย์ 2 — เฉลยที่ซ่อนไว้ (blind validation)

ใช้ k ที่ดีที่สุด fit แล้วเทียบ labels กับ `y` จริงด้วย `adjusted_rand_score`
**เขียนคอมเมนต์:** unsupervised ค้นพบสายพันธุ์องุ่น 3 สายพันธุ์ได้แค่ไหน โดยไม่เคยเห็น label เลย?
"""))
cells.append(code("""
# TODO: fit k ที่ดีที่สุด + ARI vs y


"""))

cells.append(md("""
## โจทย์ 3 — ภาพ PCA 2 มิติ

แปลง Xs ด้วย PCA(n_components=2) แล้ว scatter plot ระบายสีตาม cluster (ไม่ใช่ y!)
ระบุด้วยว่า 2 แกนอธิบาย variance ได้กี่ % รวมกัน
"""))
cells.append(code("""
import matplotlib.pyplot as plt

# TODO: PCA + scatter ระบายด้วย cluster


"""))

cells.append(md("""
## โจทย์ 4 — ตั้งชื่อกลุ่ม (segment naming)

`groupby("cluster")` หาค่าเฉลี่ยของ `alcohol`, `flavanoids`, `proline`
แล้ว**ตั้งชื่อกลุ่มภาษาไทย**ให้มีความหมายทางการตลาด เช่น "กลุ่มไวน์เข้มรสจัด"
"""))
cells.append(code("""
# TODO: profile + ตั้งชื่อกลุ่ม


"""))

cells.append(md("""
## โจทย์ 5 — Tune RandomForest อย่างมีวินัย

บน breast cancer: split ก่อน → RandomizedSearchCV (n_iter=20, cv=5) บน **train**
→ พิมพ์ best CV → วัด **test ครั้งเดียว** — แล้วเขียนเทียบ CV vs test

**กริดตัวอย่าง:** n_estimators=randint(50,500), max_depth=[None,4,6,8,12], min_samples_leaf=[1,2,4]
"""))
cells.append(code("""
from scipy.stats import randint
from sklearn.datasets import load_breast_cancer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import RandomizedSearchCV, train_test_split

# TODO: tune บน train + วัด test ครั้งเดียว


"""))

cells.append(md("""
## 🤖 ลองถาม AI (vibe coding corner)

> "ช่วยออกแบบการทดลอง tune RandomForest ให้ครอบคลุมแต่ 'ไม่แพงเกิน' ~20 × 5 fits
> พร้อมอธิบายว่าทำไม RandomizedSearchCV ถึงคุ้มกว่า GridSearchCV ตอน space ใหญ่"

เช็กคำตอบ: มันเสนออะไรที่เกินงบ? มีขั้นตอนไหนที่แอบใช้ test set ไหม? — นี่คือ exercise ฝึก "review แผนของ AI"
"""))
save(make_notebook(cells), f"{EX}/07.clustering_tuning_exercise.ipynb")

# ================= LAB 07 : solution =================
cells = []
cells.append(md("# เฉลย Lab 07 — Wine & Tuning"))
cells.append(code("""
import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.datasets import load_wine
from sklearn.decomposition import PCA
from sklearn.metrics import adjusted_rand_score, silhouette_score
from sklearn.preprocessing import StandardScaler

X, y = load_wine(return_X_y=True)
Xs = StandardScaler().fit_transform(X)
"""))
cells.append(md("""
### ข้อ 1 — silhouette พีคที่ k=3 (0.285); elbow ก้อง ๆ ราว ๆ 3-4 — สองเครื่องมือเห็นพ้อง
"""))
cells.append(code("""
rows = []
for k in range(2, 9):
    km = KMeans(k, n_init=10, random_state=42).fit(Xs)
    rows.append({"k": k, "inertia": round(km.inertia_, 1),
                 "silhouette": round(silhouette_score(Xs, km.labels_), 3)})
pd.DataFrame(rows).set_index("k")
"""))
cells.append(md("""
### ข้อ 2 — blind validation: ARI 0.897 / ตรงกัน ~98%

KMeans ไม่เคยเห็น y เลย แต่แยกสายพันธุ์องุ่นได้เกือบสมบูรณ์ — โครงสร้างมันอยู่ในเคมีจริง ๆ
"""))
cells.append(code("""
km3 = KMeans(3, n_init=10, random_state=42).fit(Xs)
print("cluster sizes:", np.bincount(km3.labels_))
print("ARI vs true labels:", round(adjusted_rand_score(y, km3.labels_), 3))
"""))
cells.append(md("""
### ข้อ 3 — PCA 2 แกน = 55.4% ของเรื่อง (36.2% + 19.2%)
"""))
cells.append(code("""
import matplotlib.pyplot as plt

Z = PCA(n_components=2).fit_transform(Xs)
plt.figure(figsize=(6.5, 5))
plt.scatter(Z[:, 0], Z[:, 1], c=km3.labels_, cmap="viridis", s=45, alpha=0.85)
plt.xlabel("PC1 (36.2%)"); plt.ylabel("PC2 (19.2%)")
plt.title("wine clusters — colored WITHOUT using labels")
plt.colorbar(label="cluster")
plt.show()
"""))
cells.append(md("""
### ข้อ 4 — ตั้งชื่อกลุ่ม (ตัวอย่าง)

cluster 0: แอลกอฮอล์สูงสุด + proline สูงสุด → **"พรีเมียมเข้มข้น"** · cluster 1: กลาง ๆ ทุกค่า → **"สามัญประจำวัน"**
cluster 2: flavanoids สูง + สีเข้ม → **"สายไวน์แดงจัดเต็ม"** (ชื่อจริงขึ้นกับ brand ที่คุณจะขายให้ใคร!)
"""))
cells.append(code("""
df = pd.DataFrame(X, columns=load_wine().feature_names)
df["cluster"] = km3.labels_
df.groupby("cluster")[["alcohol", "flavanoids", "proline"]].mean().round(1)
"""))
cells.append(md("""
### ข้อ 5 — tuning แบบมีวินัย

CV 0.958 → 0.965 แต่ test คงที่ 0.958 — dataset ใกล้เพดานแล้ว
สิ่งที่ถูกต้องคือ "กระบวนการ" (tune บน CV, แตะ test ครั้งเดียว) และการรายงานตรง ๆ ว่า test ไม่ขยับ
"""))
cells.append(code("""
from scipy.stats import randint
from sklearn.datasets import load_breast_cancer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import RandomizedSearchCV, train_test_split

Xc, yc = load_breast_cancer(return_X_y=True)
Xctr, Xcte, yctr, ycte = train_test_split(Xc, yc, test_size=0.25, stratify=yc, random_state=42)

rs = RandomizedSearchCV(
    RandomForestClassifier(random_state=42),
    {"n_estimators": randint(50, 500), "max_depth": [None, 4, 6, 8, 12],
     "min_samples_leaf": [1, 2, 4], "max_features": ["sqrt", "log2", None]},
    n_iter=20, cv=5, random_state=42, n_jobs=-1)
rs.fit(Xctr, yctr)
print("best CV :", round(rs.best_score_, 3), "|", rs.best_params_)
print("test    :", round(rs.score(Xcte, ycte), 3), "← ครั้งเดียวจบ")
"""))
save(make_notebook(cells), f"{SOL}/07.clustering_tuning_solution.ipynb")

# ================= LAB 08 : starter =================
cells = []
cells.append(md("""
# 🏁 Lab 08 — โปรเจ็คจบคอร์ส: ทำนายลูกค้าที่จะยกเลิก (Customer Churn)

**Machine Learning with scikit-learn — Session 08 · 40% ของคะแนนวิชา**

## 📋 โจทย์ธุรกิจ
บริษัทโทรคมนาคมอยากรู้ล่วงหน้าว่าลูกค้าคนไหนจะ**ยกเลิกบริการ** เพื่อส่งทีม retention ไปช่วยได้ทัน
คุณมีข้อมูลลูกค้า 7,043 คน × 19 คอลัมน์ — target คือ `Churn` (26.5% Yes)

## ✅ สิ่งที่ต้องส่ง (rubric เต็ม ๆ ในสไลด์คาบ 8)
1. **Notebook นี้** ที่ทำครบทุก section (มีคำอธิบาย markdown ทุกขั้น)
2. **ไฟล์โมเดล** `churn_pipeline.joblib` (pipeline เต็ม ไม่ใช่แค่โมเดล)
3. **สไลด์ 4-6 หน้า** present 5 นาที ตามโครงในสไลด์คาบ 8

## 🗺️ โครงการทำงาน = คอร์สทั้งหมดย่อยเป็น 8 ขั้น
ทำตามลำดับ ห้ามข้าม Step 0 (กัน leakage ตั้งแต่วินาทีแรก)

> 💡 **AI ช่วยได้ทุกขั้น** — แต่ต้องอธิบายได้ทุกบรรทัดที่ส่ง และแนบ prompt ที่ใช้ไว้ท้าย notebook
"""))

cells.append(md("## Step 0 — Setup + โหลดข้อมูล (จับกับดัก dtype ของ TotalCharges)"))
cells.append(code("""
import numpy as np
import pandas as pd

URL = "https://raw.githubusercontent.com/IBM/telco-customer-churn-on-icp4d/master/data/Telco-Customer-Churn.csv"

try:
    df = pd.read_csv(URL)
    print("โหลดจาก URL สำเร็จ:", df.shape)
except Exception as e:
    print("โหลดไม่ได้:", e)
    print("→ ใช้ fallback: generate synthetic churn data สำหรับฝึก")
    from sklearn.datasets import make_classification
    Xs_, ys_ = make_classification(n_samples=3000, n_features=15, n_informative=8,
                                   weights=[0.735, 0.265], random_state=42)
    df = pd.DataFrame(Xs_, columns=[f"feat_{i}" for i in range(15)])
    df["tenure"] = np.abs(Xs_[:, 0] * 20 + 30).round(0)
    df["MonthlyCharges"] = np.abs(Xs_[:, 1] * 30 + 70).round(2)
    df["TotalCharges"] = df["tenure"] * df["MonthlyCharges"]
    df["Contract"] = np.where(Xs_[:, 2] > 0, "Month-to-month", "Two year")
    df["InternetService"] = np.where(Xs_[:, 3] > 0.5, "Fiber optic", "DSL")
    df["Churn"] = np.where(ys_ == 1, "Yes", "No")
    print("synthetic:", df.shape)

# กับดัก: TotalCharges เป็น text และมีช่องว่าง ' ' ซ่อนอยู่ 11 จุด
df["TotalCharges"] = pd.to_numeric(df["TotalCharges"], errors="coerce")
df.head(3)
"""))

cells.append(md("""
## Step 1 — EDA: พาดหัวข่าว 3 ข้อ

สำรวจแล้วเขียน **3 พาดหัวข่าว** (markdown) ที่ผู้บริหารอ่านแล้วเข้าใจทันที
แนวทาง: churn rate รวม · แยกตาม Contract / InternetService · tenure & MonthlyCharges ของคนที่ยกเลิก vs อยู่ต่อ
"""))
cells.append(code("""
# TODO: EDA + 3 พาดหัวข่าว


"""))

cells.append(md("""
## Step 2 — แบ่งข้อมูลก่อน + Pipeline กันโปร่งใส

**แบ่ง 80:20 (stratify=y, random_state=42) ก่อนทำอย่างอื่น** แล้วสร้าง ColumnTransformer + Pipeline
(num: median impute + scale | cat: most_frequent + one-hot) — อย่าลืม drop `customerID`
"""))
cells.append(code("""
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.model_selection import train_test_split

# TODO: เตรียม X, y แล้ว split ก่อน + สร้าง preprocessor


"""))

cells.append(md("""
## Step 3 — Baseline + เลือก metric ให้เหมาะกับธุรกิจ

Dummy ก่อนเสมอ — แล้ว**เขียนว่าคุณเลือก metric อะไรเป็นตัวตัดสิน เพราะอะไร**
(คำใบ้: 26.5% positive + บริบท retention ทำให้ accuracy ไม่ใช่คำตอบ)
"""))
cells.append(code("""
from sklearn.dummy import DummyClassifier
from sklearn.model_selection import StratifiedKFold, cross_val_score

# TODO: baseline + เหตุผลการเลือก metric


"""))

cells.append(md("""
## Step 4 — Model zoo: เทียบอย่างน้อย 3 โมเดล (CV, ยังไม่แตะ test)

แนะนำ: LogisticRegression · RandomForest · HistGradientBoosting (อยากท้าใจ: XGBoost/LightGBM ได้ bonus)
ใช้ StratifiedKFold เดียวกัน วัดทั้ง accuracy และ **roc_auc**
"""))
cells.append(code("""
# TODO: เทียบ >= 3 โมเดลด้วย CV เดียวกัน


"""))

cells.append(md("""
## Step 5 — Tune โมเดลที่ดีที่สุด (RandomizedSearchCV บน train เท่านั้น)

n_iter=20-30, cv=5 — แล้ว fit final บน train ทั้งหมด
"""))
cells.append(code("""
# TODO: RandomizedSearchCV + final fit


"""))

cells.append(md("""
## Step 6 — Threshold เป็นการตัดสินใจเชิงธุรกิจ

ลอง threshold 0.35 / 0.50 / 0.65 — เขียนประโยค "decision-ready" 1 ประโยค
(เช่น "งบพอโทร 100 คน → เรียงลำดับด้วย predict_proba แล้วเลือก top 100")
"""))
cells.append(code("""
# TODO: threshold analysis + ประโยค decision-ready


"""))

cells.append(md("""
## Step 7 — Error analysis + สิ่งที่ขับเคลื่อน churn

ดู top drivers (สัมประสิทธิ์ หรือ feature importances) + ส่อง top misses
แล้วเขียน **insight ที่ทีม retention ใช้ทำงานได้จริง** (เช่น "โทรลูกค้า fiber รายเดือนอายุ 1-6 เดือนในเดือนที่ 3")
"""))
cells.append(code("""
# TODO: drivers + misses + insight


"""))

cells.append(md("""
## Step 8 — คำพิพากษาสุดท้าย (test ครั้งเดียว) + ส่งมอบ

วัด test set ครั้งเดียว: AUC, recall, f1, accuracy — เทียบกับ CV แล้ว**เขียนว่า gap บอกอะไร**
จากนั้น dump pipeline เป็น `churn_pipeline.joblib`
"""))
cells.append(code("""
import joblib
from sklearn.metrics import roc_auc_score, recall_score, f1_score

# TODO: final test (ครั้งเดียว!) + joblib.dump


"""))

cells.append(md("""
## 🎤 สไลด์ 5 นาที (template จากคาบ 8)

0:00 Problem · 0:30 Data & method (1 กราฟ EDA + pipeline) · 1:30 Results (CV vs test + baseline)
· 2:30 Insight (drivers + ประโยค decision-ready) · 3:30 Limits & next · 4:30 Ask

### ✍️ เช็กลิสต์ก่อนส่ง
- [ ] รัน Runtime → Run all ได้ตั้งแต่ต้นจนจุดไม่มี error
- [ ] ทุกการตัดสินใจมี markdown อธิบายเหตุผล
- [ ] มี Dummy baseline ตลอด และเทียบ test แค่ครั้งเดียว
- [ ] joblib โหลดกลับมา + predict แถวใหม่ได้
- [ ] สไลด์ไม่มี code screenshot เลยแม้แต่ภาพเดียว

## 🤖 ลองถาม AI (vibe coding corner — ใช้เป็น code reviewer)

> "ช่วยรีวิวโค้ดโปรเจ็ค churn ของฉันเหมือน senior data scientist:
> หา leakage, metric ที่ผิดบริบท, จุดที่ควรทำ error analysis เพิ่ม และข้อจำกัดของโมเดลที่ควรพูดตอน present"

แนบ prompt และคำตอบที่มีประโยชน์ไว้ท้าย notebook ด้วย — ความโปร่งใสได้คะแนน
"""))
save(make_notebook(cells), f"{EX}/08.final_project_starter.ipynb")

# ================= LAB 08 : solution =================
cells = []
cells.append(md("""
# เฉลย Lab 08 — Customer Churn Prediction (ฉบับสมบูรณ์)

> นี่คือ "ฉบับอาจารย์" — ฉบับของนักศึกษาต้องมี EDA/error analysis/สไลด์ของตัวเอง
> โครงและตัวเลขอ้างอิงสามารถเทียบได้เมื่อใช้ random_state เดียวกัน
"""))
cells.append(code("""
import numpy as np
import pandas as pd

URL = "https://raw.githubusercontent.com/IBM/telco-customer-churn-on-icp4d/master/data/Telco-Customer-Churn.csv"
try:
    df = pd.read_csv(URL)
    print("loaded from URL:", df.shape)
except Exception as e:
    print("URL failed:", e, "→ synthetic fallback (see starter notebook)")
    from sklearn.datasets import make_classification
    Xs_, ys_ = make_classification(n_samples=3000, n_features=15, n_informative=8,
                                   weights=[0.735, 0.265], random_state=42)
    df = pd.DataFrame(Xs_, columns=[f"feat_{i}" for i in range(15)])
    df["tenure"] = np.abs(Xs_[:, 0] * 20 + 30).round(0)
    df["MonthlyCharges"] = np.abs(Xs_[:, 1] * 30 + 70).round(2)
    df["TotalCharges"] = df["tenure"] * df["MonthlyCharges"]
    df["Contract"] = np.where(Xs_[:, 2] > 0, "Month-to-month", "Two year")
    df["InternetService"] = np.where(Xs_[:, 3] > 0.5, "Fiber optic", "DSL")
    df["Churn"] = np.where(ys_ == 1, "Yes", "No")

df["TotalCharges"] = pd.to_numeric(df["TotalCharges"], errors="coerce")  # ' ' → NaN (11 จุด)
"""))
cells.append(md("""
## Step 1 — EDA: 3 พาดหัวข่าว

1. **"เดือนต่อเดือนคือเขตอันตราย: ยกเลิก 42.7% เทียบสัญญา 2 ปีที่แค่ 2.8%"**
2. **"ลูกค้า fiber ยกเลิกมากผิดปกติ (41.9%) แพ้เฉพาะ..." (DSL 19.0%)**
3. **"คนที่ยกเลิกคือมือใหม่: อายุสมาชิกเฉลี่ย 18 เดือน vs อยู่ต่อ 38 เดือน — แถมจ่ายแพงกว่า ($74 vs $61)"**
"""))
cells.append(code("""
churn = (df["Churn"] == "Yes").astype(int)
print("churn rate:", round(churn.mean(), 3))
print(df.assign(churn=churn).groupby("Contract")["churn"].agg(["mean", "count"]).round(3))
print(df.assign(churn=churn).groupby("InternetService")["churn"].mean().round(3))
print(df.assign(churn=churn).groupby("churn")[["tenure", "MonthlyCharges"]].mean().round(1))
"""))
cells.append(md("""
## Step 2 — split ก่อน + pipeline
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
print("cat cols:", len(cat_cols), "| ok")
"""))
cells.append(md("""
## Step 3 — baseline + metric

เลือก **ROC-AUC เป็นตัวตัดสินหลัก** (threshold-free เหมาะกับการจัดอันดับความเสี่ยง)
และดู **recall** เป็นรอง (บริบท retention: พลาดลูกค้าที่กำลังจะยกเลิก = เสียรายได้)
accuracy โกหกเพราะ 73.5% ของลูกค้าอยู่ต่อ — ทายว่า "ไม่มีใครยกเลิก" ก็ได้ 73.5% ฟรี
"""))
cells.append(code("""
from sklearn.dummy import DummyClassifier

skf = StratifiedKFold(5, shuffle=True, random_state=42)
dummy = Pipeline([("pre", pre), ("m", DummyClassifier(strategy="most_frequent"))])
print("Dummy CV acc:", round(cross_val_score(dummy, Xtr, ytr, cv=skf).mean(), 3),
      "| AUC:", round(cross_val_score(dummy, Xtr, ytr, cv=skf, scoring="roc_auc").mean(), 3))
"""))
cells.append(md("""
## Step 4 — model zoo (CV, ยังไม่แตะ test)

ผลอ้างอิง: Dummy 0.500 · RF 0.818 · HistGB 0.838 · **LR 0.846** — Linear ธรรมดาชนะ!
(เหตุผล: ฟีเจอร์ categorical สะอาด + ความสัมพันธ์ส่วนใหญ่เป็นเชิงเส้น/monotone)
"""))
cells.append(code("""
from sklearn.ensemble import HistGradientBoostingClassifier, RandomForestClassifier

zoo = [
    ("RandomForest", RandomForestClassifier(random_state=42, n_jobs=-1)),
    ("HistGradBoost", HistGradientBoostingClassifier(random_state=42)),
    ("LogisticRegression", LogisticRegression(max_iter=2000)),
]
for name, m in zoo:
    pipe = Pipeline([("pre", pre), ("m", m)])
    auc = cross_val_score(pipe, Xtr, ytr, cv=skf, scoring="roc_auc").mean()
    acc = cross_val_score(pipe, Xtr, ytr, cv=skf).mean()
    print(f"{name:20s} CV acc={acc:.3f}  CV AUC={auc:.3f}")
"""))
cells.append(md("""
## Step 5 — tune LogisticRegression เบา ๆ

C คือ "ความกล้า" ของโมเดล (คู่ผกผันของแรง regularization) — ลองสุ่มหาค่าที่ดี
"""))
cells.append(code("""
from scipy.stats import loguniform
from sklearn.model_selection import RandomizedSearchCV

rs = RandomizedSearchCV(
    Pipeline([("pre", pre), ("m", LogisticRegression(max_iter=2000))]),
    {"m__C": loguniform(0.01, 100)},
    n_iter=20, cv=skf, scoring="roc_auc", random_state=42)
rs.fit(Xtr, ytr)
print("best CV AUC:", round(rs.best_score_, 3), "| C:", round(rs.best_params_["m__C"], 3))

best = rs.best_estimator_
"""))
cells.append(md("""
## Step 6 — threshold คือเรื่องงบประมาณ
"""))
cells.append(code("""
from sklearn.metrics import precision_score, recall_score

proba_tr = best.predict_proba(Xtr)[:, 1]
for th in [0.35, 0.50, 0.65]:
    yp = (proba_tr >= th).astype(int)
    print(f"th={th:.2f}: recall={recall_score(ytr, yp):.2f}  precision={precision_score(ytr, yp):.2f}")

# ประโยค decision-ready (ตัวอย่าง):
print()
print('เกณฑ์ 0.5: จับ churner ได้ ~56% โทรถูกคน ~66% | หลั่งเป็น 0.35: จับได้ ~71% แต่โทรเปล่าเกือบครึ่ง')
print('งบพอโทร 100 คน/เดือน → เรียง predict_proba แล้วโทร top-100 ก่อนเสมอ')
"""))
cells.append(md("""
## Step 7 — drivers + top misses

tenure −1.23σ (อายุสมาชิกยิ่งนานยิ่งเกาะติด) · Contract_Two year −0.76 · Fiber +0.64 ·
Contract_Month-to-month +0.59 — ตรงเป๊ะกับ EDA ข้อ 1-2 (โมเดลกับตาเห็นตรงกัน = สัญญาณที่ดี)
"""))
cells.append(code("""
import pandas as pd

feature_names = best[:-1].get_feature_names_out()
coefs = pd.Series(best[-1].coef_[0], index=[n.split("__")[1] for n in feature_names])
coefs.reindex(coefs.abs().sort_values(ascending=False).index).head(8).round(2)
"""))
cells.append(code("""
# top misses บน train (churner ที่โมเดลมั่นใจว่าปลอดภัยที่สุด — กลุ่มอันตรายที่สุดที่หลุดไป)
train_miss = pd.DataFrame({"proba": proba_tr, "y": ytr.values})
train_miss[(train_miss.y == 1)].nsmallest(5, "proba")
"""))
cells.append(md("""
**Insight สำหรับทีม retention (ตัวอย่าง):**
"ลูกค้า fiber แบบรายเดือนที่อายุสมาชิก < 12 เดือนคือกลุ่มเสี่ยงสูงสุด — โทรหาในเดือนที่ 3 (ก่อนหมดสัญญาปีแรก)
พร้อมเสนอส่วนลดหรือเปลี่ยนสัญญา 1 ปี โดยเรียงลำดับการโทรจาก predict_proba"
"""))
cells.append(md("""
## Step 8 — คำพิพากษา (test ครั้งเดียว) + ส่งมอบ
"""))
cells.append(code("""
import joblib
from sklearn.metrics import f1_score, roc_auc_score

proba = best.predict_proba(Xte)[:, 1]
yp = (proba >= 0.5).astype(int)
print(f"CV AUC 0.846 → test AUC {roc_auc_score(yte, proba):.3f}   ← gap จิ๋ว ๆ = ซื่อสัตย์")
print(f"recall {recall_score(yte, yp):.2f} | f1 {f1_score(yte, yp):.3f} | accuracy {(yte == yp).mean():.3f}")

joblib.dump(best, "churn_pipeline.joblib")

# พิสูจน์ว่าโหลดกลับมาใช้กับข้อมูลดิบได้
loaded = joblib.load("churn_pipeline.joblib")
loaded.predict(Xte[:3])
"""))
cells.append(md("""
## สรุปฉบับ present 5 นาที (โครงจริง)

- **Problem:** churn 26.5% × รายได้ต่อราย — retention ถูกกว่าหาลูกค้าใหม่ 5-25 เท่า
- **Method:** split-first pipeline (19 คอลัมน์ → one-hot + scale อัตโนมัติ)
- **Results:** baseline 0.500 → **LR test AUC 0.842** (CV 0.846 gap น้อย) — ชนะ forest/boosting เสียด้วยซ้ำ
- **Insight:** tenure + ประเภทสัญญา + fiber คือ 3 แรงหลัก → นโยบาย "โทรเดือนที่ 3"
- **Limits:** ข้อมูล snapshot ครั้งเดียว (ไม่มี time-series) · อาจมี leak จากฟีเจอร์ที่บันทึกหลังยกเลิก · ต้อง retrain ทุกไตรมาส
"""))
save(make_notebook(cells), f"{SOL}/08.final_project_solution.ipynb")
