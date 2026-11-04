# Build Lab 03 + Lab 04 (exercise + solution pairs, Thai)
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from nb_lib import make_notebook, md, code, save

ROOT = r"D:/Repositories/AI_course_MasterDegree"
EX = f"{ROOT}/excercises"
SOL = f"{ROOT}/excercises/solutions"

# ================= LAB 03 : exercise =================
cells = []
cells.append(md("""
# Lab 03 — สร้าง Pipeline กันโปร่งใส (Titanic, Leak-free)

**Machine Learning with scikit-learn — Session 03**

## 🎯 วัตถุประสงค์
1. สร้าง `ColumnTransformer + Pipeline` ฉบับของตัวเอง
2. พิสูจน์ด้วยตัวเลขว่า scaling สำคัญกับ KNN แค่ไหน
3. วัดผล feature engineering อย่างซื่อสัตย์ (5-fold CV)
4. สัมผัส "ความรู้สึกเมื่อ score บวมจาก leakage" แล้วรู้จักตัวมัน

## 📝 คำแนะนำ
- กฎเหล็กของ lab นี้: **แบ่ง train/test ก่อน แล้วค่อยทำอย่างอื่น**
- ใช้ demo 03 เป็นแผนที่ได้ แต่พิมพ์เองจะจำได้แรงกว่า copy
"""))

cells.append(md("## ⚙️ Setup — แบ่งข้อมูลก่อนทำอย่างอื่น"))
cells.append(code("""
import numpy as np
import pandas as pd
import seaborn as sns
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

df = sns.load_dataset("titanic")[["survived", "pclass", "sex", "age",
                                  "sibsp", "parch", "fare", "embarked"]].drop_duplicates()

X = df.drop(columns="survived")
y = df["survived"]

# TODO: แบ่ง train/test สัดส่วน 80:20 (stratify=y, random_state=42)


num_cols = ["age", "fare", "sibsp", "parch", "pclass"]
cat_cols = ["sex", "embarked"]
"""))

cells.append(md("""
## โจทย์ 1 — สร้าง Pipeline เต็มรูปแบบ

เติมโค้ดให้ครบ: `num_pipe` (median impute + scale) · `cat_pipe` (most_frequent + one-hot)
· `pre` (ColumnTransformer) · `clf` (Pipeline ต่อ KNN) แล้ว fit + พิมพ์คะแนน test
"""))
cells.append(code("""
# TODO: สร้าง num_pipe, cat_pipe, pre, clf แล้ว fit กับ train และพิมพ์ test score


"""))

cells.append(md("""
## โจทย์ 2 — พิสูจน์ว่า scaling สำคัญ

สร้าง pipeline แบบ**ไม่มี** StandardScaler แล้วเทียบคะแนนกับข้อ 1

**เขียนตอบ:** ต่างกันกี่คะแนน? แล้วทำไมโมเดล tree-based อย่าง RandomForest ถึงไม่สน scale?
"""))
cells.append(code("""
# TODO: pipeline แบบไม่ scale + เทียบผล


"""))

cells.append(md("""
## โจทย์ 3 — Feature engineering แล้ววัดผล

เพิ่ม `family_size = sibsp + parch + 1` และ `is_child = age < 12` แล้ววัดด้วย 5-fold CV
ว่าตัวเลขขยับหรือเปล่า (เทียบกับชุดฟีเจอร์เดิมด้วย CV เดียวกัน)

**ช่วยเหลือ:** สร้าง X2 = X.copy() ก่อน แล้วใช้ cross_val_score(pipe, X2, y, cv=5)
"""))
cells.append(code("""
from sklearn.model_selection import cross_val_score

# TODO: สร้างฟีเจอร์ใหม่ แล้วเทียบ CV ของชุดเดิม vs ชุดใหม่


"""))

cells.append(md("""
## โจทย์ 4 (โจทย์ชวนคิด) — ทำ leakage ด้วยมือตัวเอง

สร้างคอลัมน์ `lucky_ticket` = y ที่ถูกพลิกคำตอบสุ่ม 15% (เหมือน demo)
เติมเข้าไปในฟีเจอร์ แล้วดูคะแนนว่าบวมแค่ไหน — **จากนั้นลบทิ้งและเขียนสรุปเป็นภาษาไทย 3 บรรทัด** ว่า leakage คืออะไร และเจอได้จากไหนบ้างในงานจริง
"""))
cells.append(code("""
# TODO: สร้าง lucky_ticket, วัดคะแนนที่บวมขึ้น, ลบทิ้ง, เขียนสรุป


"""))

cells.append(md("""
## 🤖 ลองถาม AI (vibe coding corner)

> "เขียน sklearn ColumnTransformer ที่คอลัมน์ตัวเลข (age, fare) ใช้ median impute + StandardScaler
> แต่คอลัมน์ category (sex, embarked) ใช้ most_frequent + OneHotEncoder(handle_unknown='ignore')
> แล้วต่อกับ KNeighborsClassifier ใน Pipeline เดียว"

รับโค้ดมาแล้ว**อ่านทุกบรรทัด** — เช็กว่า: imputer/scaler fit ที่ train เท่านั้นไหม? one-hot เผื่อ category ใหม่ไหม?
นี่คือจุดที่ AI มักพลาดเงียบ ๆ ที่สุด
"""))
save(make_notebook(cells), f"{EX}/03.pipeline_exercise.ipynb")

# ================= LAB 03 : solution =================
cells = []
cells.append(md("# เฉลย Lab 03 — Pipeline กันโปร่งใส"))
cells.append(code("""
import numpy as np
import pandas as pd
import seaborn as sns
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

df = sns.load_dataset("titanic")[["survived", "pclass", "sex", "age",
                                  "sibsp", "parch", "fare", "embarked"]].drop_duplicates()
X = df.drop(columns="survived")
y = df["survived"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42)
num_cols = ["age", "fare", "sibsp", "parch", "pclass"]
cat_cols = ["sex", "embarked"]
"""))
cells.append(md("""
### ข้อ 1 — Pipeline เต็มรูปแบบ (template 15 บรรทัด)

ได้ ~0.82 ขึ้นกับรอบ split — จุดสำคัญคือ**โครงสร้าง** ไม่ใช่ตัวเลขทศนิยม
"""))
cells.append(code("""
num_pipe = Pipeline([("imp", SimpleImputer(strategy="median")),
                     ("sc",  StandardScaler())])
cat_pipe = Pipeline([("imp", SimpleImputer(strategy="most_frequent")),
                     ("oh",  OneHotEncoder(handle_unknown="ignore"))])
pre = ColumnTransformer([("num", num_pipe, num_cols),
                         ("cat", cat_pipe, cat_cols)])
clf = Pipeline([("pre", pre), ("model", KNeighborsClassifier())])

clf.fit(X_train, y_train)
print("scaled   test:", round(clf.score(X_test, y_test), 3))
"""))
cells.append(md("""
### ข้อ 2 — ไม่ scale แล้วเกิดอะไรขึ้น
"""))
cells.append(code("""
pre_noscale = ColumnTransformer([
    ("num", SimpleImputer(strategy="median"), num_cols),
    ("cat", cat_pipe, cat_cols)])
clf_noscale = Pipeline([("pre", pre_noscale), ("model", KNeighborsClassifier())])
clf_noscale.fit(X_train, y_train)
print("no scale test:", round(clf_noscale.score(X_test, y_test), 3))
"""))
cells.append(md("""
**ตัวเลขจริง: 0.67 vs 0.82** — ตกลงไป ~15 คะแนน เพราะ `fare` (วิ่ง 0-512) กลบ `age` (0-80) ในสูตรระยะทาง

ส่วน RandomForest ไม่สน scale เพราะแต่ละ split เทียบค่า "ค่าเดียว ทีละฟีเจอร์" ไม่ได้รวมหลายฟีเจอร์เป็นระยะทางเดียว
"""))
cells.append(md("""
### ข้อ 3 — Feature engineering วัดผลด้วย CV
"""))
cells.append(code("""
from sklearn.model_selection import cross_val_score

X2 = X.copy()
X2["family_size"] = X2["sibsp"] + X2["parch"] + 1
X2["is_child"] = (X2["age"] < 12).astype(float).where(X2["age"].notna())

num_cols2 = num_cols + ["family_size", "is_child"]
pre2 = ColumnTransformer([("num", num_pipe, num_cols2),
                          ("cat", cat_pipe, cat_cols)])
clf2 = Pipeline([("pre", pre2), ("model", KNeighborsClassifier())])

base = cross_val_score(clf,  X,  y, cv=5).mean()
eng  = cross_val_score(clf2, X2, y, cv=5).mean()
print(f"CV ฟีเจอร์เดิม   : {base:.3f}")
print(f"CV + family/child: {eng:.3f}")
"""))
cells.append(md("""
เฉลยตรงไปตรงมา: 0.809 → 0.819 — ดีขึ้นแบบ "มี แต่ไม่เด่ะ" (และกับ RandomForest อาจเท่าเดิมเลย)
**บทเรียน:** ฟีเจอร์ทุกตัวต้องผ่านการวัดผลก่อนได้สิทธิ์อยู่ในโมเดล
"""))
cells.append(md("""
### ข้อ 4 — ทำ leakage ด้วยมือตัวเอง
"""))
cells.append(code("""
rng = np.random.RandomState(1)
flip = rng.rand(len(y)) < 0.15
proxy = y.copy()
proxy[flip] = 1 - proxy[flip]          # แอบรู้คำตอบ ~85%

X_leak = X.copy()
X_leak["lucky_ticket"] = proxy.values

pre_leak = ColumnTransformer([
    ("num", num_pipe, num_cols + ["lucky_ticket"]),
    ("cat", cat_pipe, cat_cols)])
leaky = Pipeline([("pre", pre_leak), ("model", KNeighborsClassifier())])

print("CV ปกติ    :", round(cross_val_score(clf, X, y, cv=5).mean(), 3))
print("CV มี leak :", round(cross_val_score(leaky, X_leak, y, cv=5).mean(), 3))
"""))
cells.append(code("""
del X_leak   # ลบทิ้งทันที!
"""))
cells.append(md("""
**สรุป 3 บรรทัด (ตัวอย่างคำตอบ):**

1. leakage คือข้อมูลจาก "นอกชุดเทรน" (โดยเฉพาะจากอนาคตหรือจาก y เอง) หลุดเข้าไปเป็นฟีเจอร์
2. อาการคือคะแนนสวยผิดปกติแต่ตอนใช้จริงพัง — โมเดลไม่ได้เก่ง แค่ "เห็นเฉลย"
3. ในงานจริงมักมากับข้อมูลที่บันทึกหลังเกิดเหตุ (เช่น วันที่คืนเงิน ตอนทำนาย churn) — ต้องถามทุกคอลัมน์เสมอว่า "ค่านี้ถูกรู้เมื่อไหร่?"
"""))
save(make_notebook(cells), f"{SOL}/03.pipeline_solution.ipynb")

# ================= LAB 04 : exercise =================
cells = []
cells.append(md("""
# Lab 04 — วัดให้จริง (Overfit, Lottery และ Metric ที่ถูกต้อง)

**Machine Learning with scikit-learn — Session 04**

## 🎯 วัตถุประสงค์
1. ทำซ้ำการทดลอง overfitting ด้วยมือตัวเอง (KNN + DecisionTree)
2. พิสูจน์ว่า holdout score เด้งตาม random_state แค่ไหน
3. ใช้ `cross_val_score` แทน แล้วอ่านค่า mean ± std
4. เลือก metric ให้เหมาะกับโจทย์ (และอธิบายว่าทำไม accuracy ไม่พอ)

> โมเดลวันนี้เป็น black box ได้ (เปิดกล่องคาบหน้า) — วันนี้เน้น "วิธีวัด" เท่านั้น
"""))

cells.append(md("## ⚙️ Setup"))
cells.append(code("""
import numpy as np
from sklearn.datasets import load_breast_cancer, load_diabetes
from sklearn.dummy import DummyClassifier
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import StratifiedKFold, cross_val_score, train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier

Xc, yc = load_breast_cancer(return_X_y=True)
Xd, yd = load_diabetes(return_X_y=True)
"""))

cells.append(md("""
## โจทย์ 1 — จับการท่องจำจากช่องว่าง train/test

เทรน KNN k=1 และ k=13 บน breast cancer (test 25%, stratify, random_state=42)
พิมพ์**ทั้ง** train และ test accuracy ของทั้งคู่ แล้วอธิบายว่าช่องว่างของ k=1 บอกอะไร
"""))
cells.append(code("""
# TODO: split + เทรน k=1 และ k=13 + พิมพ์ train/test ทั้งคู่


"""))

cells.append(md("""
## โจทย์ 2 — วาด overfitting curve ของ tree

loop `max_depth ∈ {1,2,3,4,6,8,12}` เก็บ train/test accuracy แล้ววาดเส้น 2 เส้น (matplotlib)
แล้วชี้: sweet spot อยู่ตรงไหน และเกิดอะไรขึ้นหลังจากนั้น
"""))
cells.append(code("""
import matplotlib.pyplot as plt

# TODO: loop เก็บคะแนน + วาดกราฟ


"""))

cells.append(md("""
## โจทย์ 3 — holdout คือลอตเตอรี่

บน diabetes: รัน holdout (75/25) 10 ครั้งด้วย `random_state=0..9` เก็บค่า R²
แล้วเปลี่ยนมาใช้ `cross_val_score(..., cv=5)` — เทียบ "ช่วงที่เด้ง" กับ "mean ± std"
"""))
cells.append(code("""
# TODO: holdout 10 seeds แล้วเทียบกับ 5-fold CV


"""))

cells.append(md("""
## โจทย์ 4 — เทียบโมเดลอย่างซื่อสัตย์

ใช้ `StratifiedKFold(5, shuffle=True, random_state=42)` ตัวเดียวกัน เทียบ:
Dummy(most_frequent) · KNN(5) · RandomForest(100) — ทั้ง **accuracy** และ **roc_auc**

**เขียนตอบ:** ถ้าเลือกโมเดลจาก accuracy อย่างเดียว จะพลาดอะไร?
"""))
cells.append(code("""
from sklearn.ensemble import RandomForestClassifier

# TODO: เทียบ 3 โมเดล 2 metric ด้วย fold เดียวกัน


"""))

cells.append(md("""
## โจทย์ 5 (โจทย์ชวนคิด) — ถ้าคุณเป็นหมอ

จาก KNN บน test set: สร้าง `confusion_matrix`, `precision`, `recall`, `f1`, `roc_auc`
แล้วตอบ: ในบริบทคัดกรองมะเร็ง คุณจะ**แลก** precision กับ recall ยังไง และทำไม
(ช่วยเหลือ: precision_score / recall_score มี parameter `zero_division=0` กัน error กรณีพิเศษ)
"""))
cells.append(code("""
from sklearn.metrics import confusion_matrix, precision_score, recall_score, f1_score, roc_auc_score

# TODO: metrics ครบชุด + คำตอบเชิงบริบท


"""))

cells.append(md("""
## 🤖 ลองถาม AI (vibe coding corner)

> "โจทย์ของฉันคือคัดกรองโรคจากข้อมูลที่ positive แค่ 19% — ควรใช้ metric อะไรเป็นตัวตัดสิน
> และเพราะอะไร accuracy ถึงไม่ใช่คำตอบ? ถ้าต้องเลือก threshold จะเลือกยังไง?"

เทียบคำตอบ AI กับ cheat sheet สไลด์ 18 — ถ้ามันตอบ "accuracy" ลอถามต่อว่า "ทำไม recall ถึงสำคัญกว่าตรงนี้?"
"""))
save(make_notebook(cells), f"{EX}/04.evaluation_cv_exercise.ipynb")

# ================= LAB 04 : solution =================
cells = []
cells.append(md("# เฉลย Lab 04 — วัดให้จริง"))
cells.append(code("""
import numpy as np
from sklearn.datasets import load_breast_cancer, load_diabetes
from sklearn.dummy import DummyClassifier
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import StratifiedKFold, cross_val_score, train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier

Xc, yc = load_breast_cancer(return_X_y=True)
Xd, yd = load_diabetes(return_X_y=True)
"""))
cells.append(md("""
### ข้อ 1 — ช่องว่าง train/test ของ k=1 คือ "คำโกหก"

k=1: train 1.000 vs test 0.937 — จำข้อสอบได้หมด (จุดที่ใกล้สุดของมันคือตัวมันเอง)
k=13: train 0.939 vs test 0.944 — เรียบ สุภาพ และ test ดีกว่าซะด้วยซ้ำ
"""))
cells.append(code("""
Xtr, Xte, ytr, yte = train_test_split(Xc, yc, test_size=0.25, stratify=yc, random_state=42)
for k in [1, 13]:
    m = KNeighborsClassifier(n_neighbors=k).fit(Xtr, ytr)
    print(f"k={k:2d}: train={m.score(Xtr, ytr):.3f}  test={m.score(Xte, yte):.3f}")
"""))
cells.append(md("""
### ข้อ 2 — overfitting curve

sweet spot ~depth 3-4 (test 0.944) · หลังจากนั้น train พุ่งไป 1.000 แต่ test ค่อย ๆ ตก = เริ่มท่องจำรายคน
"""))
cells.append(code("""
import matplotlib.pyplot as plt

depths = [1, 2, 3, 4, 6, 8, 12]
tr, te = [], []
for d in depths:
    t = DecisionTreeClassifier(max_depth=d, random_state=42).fit(Xtr, ytr)
    tr.append(t.score(Xtr, ytr)); te.append(t.score(Xte, yte))

plt.figure(figsize=(6.5, 4.5))
plt.plot(depths, tr, "o-", label="train")
plt.plot(depths, te, "s-", label="test")
plt.xlabel("max_depth"); plt.ylabel("accuracy"); plt.legend(); plt.show()
"""))
cells.append(md("""
### ข้อ 3 — holdout vs CV

holdout 10 seeds: R² วิ่ง 0.359 → 0.586 (เกือบ 2 เท่าตัว!) · CV: 0.482 ± 0.049 — นิ่งกว่ามาก
"""))
cells.append(code("""
vals = []
for seed in range(10):
    a, b, c, d = train_test_split(Xd, yd, test_size=0.25, random_state=seed)
    vals.append(LinearRegression().fit(a, c).score(b, d))
print(f"holdout 10 seeds: min={min(vals):.3f} max={max(vals):.3f}")

cv = cross_val_score(LinearRegression(), Xd, yd, cv=5)
print(f"5-fold CV        : mean={cv.mean():.3f} ± {cv.std():.3f}")
"""))
cells.append(md("""
### ข้อ 4 — เทียบโมเดล fold เดียวกัน

accuracy ของ KNN (0.935) กับ RF (0.956) ใกล้กัน แต่ AUC ห่าง 0.966 vs 0.989 —
ถ้าดู accuracy อย่างเดียวจะประเมิน "ความสามารถจัดอันดับความเสี่ยง" ต่ำเกินจริง
(และ Dummy most_frequent ได้ acc 0.627 ฟรี ๆ — ไม่มี baseline ก็ไม่รู้ว่า 0.93 เยี่ยมแค่ไหน)
"""))
cells.append(code("""
from sklearn.ensemble import RandomForestClassifier

skf = StratifiedKFold(5, shuffle=True, random_state=42)
for name, m in [("Dummy(most_freq)", DummyClassifier(strategy="most_frequent")),
                ("KNN(5)",          KNeighborsClassifier()),
                ("RandomForest",    RandomForestClassifier(random_state=42))]:
    acc = cross_val_score(m, Xc, yc, cv=skf).mean()
    auc = cross_val_score(m, Xc, yc, cv=skf, scoring="roc_auc").mean()
    print(f"{name:18s} acc={acc:.3f}  AUC={auc:.3f}")
"""))
cells.append(md("""
### ข้อ 5 — ถ้าคุณเป็นหมอ

confusion matrix: [[47, 6], [4, 86]] — FP 6 คน (ตรวจซ้ำเปล่า) / FN 4 คน (มะเร็งหลุด!)
"""))
cells.append(code("""
from sklearn.metrics import confusion_matrix, f1_score, precision_score, recall_score, roc_auc_score

knn = KNeighborsClassifier().fit(Xtr, ytr)
yp = knn.predict(Xte)
proba = knn.predict_proba(Xte)[:, 1]
print(confusion_matrix(yte, yp))
print(f"precision={precision_score(yte, yp):.3f}  recall={recall_score(yte, yp):.3f}  "
      f"f1={f1_score(yte, yp):.3f}  auc={roc_auc_score(yte, proba):.3f}")
"""))
cells.append(md("""
**คำตอบตัวอย่าง:** คัดกรองมะเร็ง = FN แพงกว่า FP มาก (มะเร็งที่หลุดอาจตาย / ตรวจซ้ำแค่เสียเงิน+เวลา)
→ เลือก **recall สูง** แม้ precision ลด โดยขยับ threshold ลงต่ำกว่า 0.5 แล้วยอมให้ส่งตรวจคนมากขึ้น
"""))
save(make_notebook(cells), f"{SOL}/04.evaluation_cv_solution.ipynb")
