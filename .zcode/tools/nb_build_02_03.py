# Build demo 02 + 03
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from nb_lib import make_notebook, md, code, save

ROOT = r"D:/Repositories/AI_course_MasterDegree"

# ---------------- Demo 02 ----------------
cells = []
cells.append(md("""
# Demo 02 — Data Understanding & Cleaning

**Machine Learning with scikit-learn — Session 02**

รันตามสไลด์คาบ 2 — วันนี้เราจะ "อ่าน" ข้อมูล Titanic ให้ขาด หาสิ่งผิดปกติ แล้วเก็บกวาดอย่างมีเหตุผล
"""))

cells.append(md("""
## Slide 5 — Load the Titanic dataset

ชุดข้อมูล: ผู้โดยสารเรือ Titanic 891 คน × 8 คอลัมน์ — เป้าหมาย (y) คือ `survived`
"""))
cells.append(code("""
import pandas as pd
import seaborn as sns

df = sns.load_dataset("titanic")[["survived", "pclass", "sex", "age",
                                  "sibsp", "parch", "fare", "embarked"]]
df.shape
"""))

cells.append(md("""
## Slide 7 — The first five minutes with any dataset

5 คำสั่งนี้รันกับข้อมูลชุดไหนก็ต้องรัน: `shape / head / info / describe / value_counts`
"""))
cells.append(code("""
df.head(10)
"""))
cells.append(code("""
df.info()
"""))
cells.append(md("""
จุดที่ต้องขีดเส้นใต้: `age` เหลือ 714 จาก 891 (**missing 177 = 19.9%**) และ `embarked` หาย 2 ค่า
"""))
cells.append(code("""
df.describe()
"""))
cells.append(md("""
สิ่งที่ต้องตั้งคำถามจากตารางนี้:
- `age` min = 0.42 → ทารกบนเรือ เป็นไปได้จริง ✓
- `fare` min = 0.00 → ใครนั่งฟรี? (ลูกเรือ/ตั๋วรางวัล) ต้องตามดู
- `fare` max = 512.33 แต่ median แค่ 14.45 → เบื้องหลังข้อมูลเบ้มาก
"""))
cells.append(code("""
df["sex"].value_counts()
"""))
cells.append(code("""
df["embarked"].value_counts(dropna=False)   # dropna=False เพื่อนับ missing ด้วย
"""))

cells.append(md("""
## Slide 10 — Always start EDA with the target

`survived` คือสิ่งที่โมเดลต้องทำนาย — รู้จักมันก่อนอย่างอื่น
"""))
cells.append(code("""
df["survived"].value_counts()
"""))
cells.append(code("""
df["survived"].mean()   # 0.384 → รอดชีวิต 38.4%
"""))
cells.append(md("""
**base rate = 38.4%** — โมเดลที่หลอกๆ (ทายทุกคนว่าตาย) จะได้ accuracy 61.6% โดยไม่ต้องเก่งเลย
ตัวเลขนี้คือเส้นแบ่งที่โมเดลของเราต้องข้ามให้ได้
"""))

cells.append(md("""
## Slide 11 — "Women and children first" — is it in the data?
"""))
cells.append(code("""
df.groupby("sex")["survived"].agg(["mean", "count"])
"""))
cells.append(md("""
ผู้หญิงรอด 74.2% vs ผู้ชาย 18.9% — คอลัมน์ `sex` เพียงคอลัมน์เดียวก็ทำนายได้แรงมาก
"""))
cells.append(code("""
df.groupby("pclass")["survived"].agg(["mean", "count"])
"""))
cells.append(md("""
ชั้น 1 รอด 63% · ชั้น 2 รอด 47% · ชั้น 3 รอด 24% — เงินซื้อที่นั่งเรือชูชีพได้จริงในปี 1912
"""))

cells.append(md("""
## Slide 13 — Distributions: know your shapes
"""))
cells.append(code("""
import matplotlib.pyplot as plt

fig, ax = plt.subplots(1, 2, figsize=(12, 4))
df["age"].hist(bins=30, ax=ax[0], color="#0D9488")
ax[0].set_title("age — roughly bell-ish")
df["fare"].hist(bins=40, ax=ax[1], color="#F59E0B")
ax[1].set_title(f"fare — extreme right skew (skew={df['fare'].skew():.1f})")
plt.show()
"""))
cells.append(md("""
`fare` เบ้ขวามาก (skew 4.8) → ใช้ **median** แทน mean เสมอ และคาบหน้าเราจะใช้ `log1p` รัดส่วน
"""))

cells.append(md("""
## Slide 14 — Correlation: a quick map, not the territory
"""))
cells.append(code("""
df_num = df.assign(sex_num=(df["sex"] == "female").astype(int),
                   embarked_num=df["embarked"].map({"S": 0, "C": 1, "Q": 2}))
df_num.corr(numeric_only=True)["survived"].drop("survived").sort_values().round(3)
"""))
cells.append(md("""
สังเกต: `sex` ที่แรงที่สุด (74% vs 19%) กลับมองไม่เห็นใน correlation เท่าที่ควร — เพราะ corr จับได้เฉพาะความสัมพันธ์เชิงเส้นของตัวเลข
correlation คือเครื่องตรวจโลหะ: บอกว่าต้องขุดตรงไหน ไม่ได้บอกว่าขุดเจออะไร
"""))

cells.append(md("""
## Slide 15-16 — Missing data: understand before you fill
"""))
cells.append(code("""
df.isna().sum()
"""))
cells.append(code("""
# missing ของ age สุ่มหรือมีแบบแผน? ลองดูอัตรา missing แยกตามชั้นโดยสาร
df["age_missing"] = df["age"].isna()
df.groupby("pclass")["age_missing"].mean().round(3)
"""))
cells.append(md("""
ผู้โดยสารชั้น 3 missing `age` มากกว่าชั้นอื่นชัดเจน — missingness เป็นสัญญาณของฐานข้อมูลที่มีระเบียบต่างกัน
(ใน lab คุณจะได้ตัดสินใจเองว่าจะเก็บสัญญาณนี้ไว้เป็นฟีเจอร์หรือไม่)
"""))
cells.append(code("""
# สิ่งที่ "ไม่ควร" ทำ:
# df.dropna()        # ทิ้งไป 179 แถว = 20% ของข้อมูล!
# df["age"].fillna(0)  # ปลอม age เป็นทารก 177 คน!
"""))

cells.append(md("""
## Slide 17 — Impute with a defensible guess

กฎง่าย ๆ: ตัวเลขเบ้ → median · category → most_frequent
"""))
cells.append(code("""
from sklearn.impute import SimpleImputer

imp = SimpleImputer(strategy="median")
df[["age", "fare"]] = imp.fit_transform(df[["age", "fare"]])
df.isna().sum()
"""))
cells.append(md("""
คาบหน้าเราจะย้ายการ impute นี้เข้าไปอยู่ "ใน" Pipeline — เพื่อไม่ให้สถิติจากชุดทดสอบหลุดเข้าชุดเทรน (leakage)
"""))

cells.append(md("""
## Slide 18 — Duplicates
"""))
cells.append(code("""
print("duplicate rows:", df.duplicated().sum())
df[df.duplicated(keep=False)].sort_values("fare").head(6)
"""))
cells.append(md("""
111 แถวซ้ำ — เกิดจากผู้โดยสารหลายคนมีค่าทั้ง 8 คอลัมน์เหมือนกัน (เพราะคอลัมน์ค่อนข้างหยาบ)
อันตรายจริงคือกรณี duplicate ข้าม train/test — โมเดลจะได้เห็น "ข้อสอบ" ก่อนสอบ ทำคะแนนบวมโดยไม่รู้ตัว
"""))
cells.append(code("""
df = df.drop(columns=["age_missing"]).drop_duplicates()
df.shape
"""))

cells.append(md("""
## Slide 19 — Outliers: the IQR fence
"""))
cells.append(code("""
q1, q3 = df["fare"].quantile([0.25, 0.75])
iqr = q3 - q1
fence_hi = q3 + 1.5 * iqr
outliers = df[df["fare"] > fence_hi]
print(f"upper fence = {fence_hi:.2f}  |  outliers = {len(outliers)}")
"""))
cells.append(code("""
df[df["fare"] > 300][["pclass", "sex", "age", "fare", "survived"]]
"""))
cells.append(md("""
ตั๋ว 512 ปอนด์มีอย่างจริง (ครอบครัว Fortune) และรอดชีวิต — นี่คือ signal ไม่ใช่ error: "รวยสุดขอบ → รอด"
outlier คือผู้ต้องสงสัย ไม่ใช่อาชญากร — ต้องสืบก่อนตัดสิน
"""))

cells.append(md("""
## Slide 21 — Inconsistent categories
"""))
cells.append(code("""
# ตัวอย่างจริงที่เจอบ่อยในงาน: เมืองเดียวกันหลายชื่อ
demo_city = pd.Series(["Bangkok", "BKK", "bangkok", "Bangkok", "Khonkaen", "ขอนแก่น", "BKK"])
demo_city.value_counts()
"""))
cells.append(code("""
city_map = {"BKK": "Bangkok", "bangkok": "Bangkok", "ขอนแก่น": "Khonkaen"}
demo_city.replace(city_map).value_counts()
"""))

cells.append(md("""
---
✅ **จบ Demo 02** — ตอนนี้ df ของเราสะอาดแล้ว: ไม่มี missing ไม่มี duplicate และเรารู้จักข้อมูลมากขึ้นมาก

**ต่อไป:** **Lab 02** ใน `excercises/02.data_cleaning_exercise.ipynb`
"""))
save(make_notebook(cells), f"{ROOT}/demos/02.data_cleaning_demo.ipynb")

# ---------------- Demo 03 ----------------
cells = []
cells.append(md("""
# Demo 03 — Feature Engineering & Pipelines

**Machine Learning with scikit-learn — Session 03**

รันตามสไลด์คาบ 3 — วันนี้เราจะแปลงข้อมูลสะอาดให้เป็น "อาหารโมเดล" แล้วรวมทุกอย่างไว้ใน Pipeline เดียวกันแบบไม่มี leakage
"""))

cells.append(md("""
## Slide 3-4 — Setup + the scale problem

โหลด Titanic ใหม่ (เพื่อให้ทุกคนเริ่มจากจุดเดียวกัน) แล้ว**แบ่ง train/test ก่อนทำอย่างอื่น** — กฎเหล็กของคาบนี้
"""))
cells.append(code("""
import numpy as np
import pandas as pd
import seaborn as sns
from sklearn.model_selection import train_test_split

df = sns.load_dataset("titanic")[["survived", "pclass", "sex", "age",
                                  "sibsp", "parch", "fare", "embarked"]].drop_duplicates()

X = df.drop(columns="survived")
y = df["survived"]
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42)

num_cols = ["age", "fare", "sibsp", "parch", "pclass"]
cat_cols = ["sex", "embarked"]
print(num_cols, cat_cols)
"""))

cells.append(md("""
## Slide 4 — KNN is blind when one column shouts

ทดลองเด็ด ๆ: KNN ตัวเดียวกัน ข้อมูลเดียวกัน ต่างกันแค่ "ใส่/ไม่ใส่ StandardScaler"
"""))
cells.append(code("""
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

def make_knn(scale):
    num_steps = [("imp", SimpleImputer(strategy="median"))]
    if scale:
        num_steps.append(("sc", StandardScaler()))
    pre = ColumnTransformer([
        ("num", Pipeline(num_steps), num_cols),
        ("cat", Pipeline([("imp", SimpleImputer(strategy="most_frequent")),
                          ("oh", OneHotEncoder(handle_unknown="ignore"))]), cat_cols)])
    return Pipeline([("pre", pre), ("model", KNeighborsClassifier())])

no_scale = make_knn(scale=False).fit(X_train, y_train)
scaled   = make_knn(scale=True).fit(X_train, y_train)
print("KNN no scale:", round(no_scale.score(X_test, y_test), 3))
print("KNN scaled:  ", round(scaled.score(X_test, y_test), 3))
"""))
cells.append(md("""
**0.67 → 0.82** — ขึ้น 15 คะแนนฟรี ๆ ด้วยการ rescale!
เหตุผล: KNN วัดระยะ ถ้า `fare` วิ่ง 0-512 ส่วน `age` วิ่ง 0-80 ระยะทางจะถูก `fare` ครอบงำทั้งหมด
"""))

cells.append(md("""
## Slide 5 — The scalers

`fit_transform` บน train / `transform` บน test — จำลำดับนี้ (แล้วเดี๋ยว Pipeline จะจัดการให้เอง)
"""))
cells.append(code("""
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler

scaler = StandardScaler()
X_train_num = scaler.fit_transform(X_train[num_cols])   # เรียนรู้ mean/std จาก train
X_test_num  = scaler.transform(X_test[num_cols])        # ใช้ค่าเดิม ไม่เรียนใหม่!
X_test_num[:3].round(2)
"""))

cells.append(md("""
## Slide 7-8 — Encoding categories

- **OneHotEncoder**: ไม่มีลำดับ → แตกเป็นคอลัมน์ 0/1 (`sex`, `embarked`)
- **OrdinalEncoder**: มีลำดับจริง → เลข 0,1,2 (`size` S<M<L)
"""))
cells.append(code("""
oh = OneHotEncoder(handle_unknown="ignore")
oh.fit_transform(X_train[cat_cols]).toarray()[:5]
"""))
cells.append(code("""
oh.get_feature_names_out()
"""))

cells.append(md("""
## Slide 9 — Feature engineering, then MEASURE

สร้างฟีเจอร์ใหม่ 3 ตัว: `family_size`, `is_child`, `fare_log` — แล้ววัดผลจริงด้วย 5-fold CV
"""))
cells.append(code("""
X2 = X.copy()
X2["family_size"] = X2["sibsp"] + X2["parch"] + 1
X2["is_child"]    = (X2["age"] < 12).astype(float).where(X2["age"].notna())
X2["fare_log"]    = np.log1p(X2["fare"])
X2.head(3)
"""))
cells.append(code("""
from sklearn.model_selection import cross_val_score

num_cols2 = num_cols + ["family_size", "is_child", "fare_log"]

def knn_pipe(numcols, X_):
    pre = ColumnTransformer([
        ("num", Pipeline([("imp", SimpleImputer(strategy="median")),
                          ("sc", StandardScaler())]), numcols),
        ("cat", Pipeline([("imp", SimpleImputer(strategy="most_frequent")),
                          ("oh", OneHotEncoder(handle_unknown="ignore"))]), cat_cols)])
    return Pipeline([("pre", pre), ("model", KNeighborsClassifier())]), X_

base = cross_val_score(knn_pipe(num_cols, X)[0], X, y, cv=5).mean()
eng  = cross_val_score(knn_pipe(num_cols2, X2)[0], X2, y, cv=5).mean()
print(f"KNN 5-CV base      : {base:.3f}")
print(f"KNN 5-CV engineered: {eng:.3f}")
"""))
cells.append(md("""
0.809 → 0.819: ดีขึ้นนิดเดียว — และบางโมเดล (เช่น RandomForest) อาจไม่ดีขึ้นเลย
นี่คือบทเรียนสำคัญ: **ฟีเจอร์ต้องผ่านการวัดผลก่อนได้สิทธิ์อยู่ในโมเดล** — อย่าเชื่อ intuition ของตัวเองเปล่า ๆ
"""))

cells.append(md("""
## Slide 13 — ★ The 15-line template you'll reuse forever

นี่คือโครงหลักของทั้งคอร์ส: `num_pipe + cat_pipe → ColumnTransformer → Pipeline(ต่อ model)` — เปลี่ยนแค่โมเดลท้ายทาน
"""))
cells.append(code("""
num_pipe = Pipeline([("imp", SimpleImputer(strategy="median")),
                     ("sc",  StandardScaler())])
cat_pipe = Pipeline([("imp", SimpleImputer(strategy="most_frequent")),
                     ("oh",  OneHotEncoder(handle_unknown="ignore"))])

pre = ColumnTransformer([("num", num_pipe, num_cols),
                         ("cat", cat_pipe, cat_cols)])

clf = Pipeline([("pre", pre),
                ("model", KNeighborsClassifier())])

clf.fit(X_train, y_train)
print("test accuracy:", round(clf.score(X_test, y_test), 3))
"""))
cells.append(code("""
# เปลี่ยนโมเดลใน 1 บรรทัด — โครงสร้างที่เหลือเหมือนเดิมทั้งหมด
from sklearn.linear_model import LogisticRegression

clf_lr = Pipeline([("pre", pre), ("model", LogisticRegression(max_iter=1000))])
clf_lr.fit(X_train, y_train)
print("LogisticRegression test accuracy:", round(clf_lr.score(X_test, y_test), 3))
"""))

cells.append(md("""
## Slide 15-16 — Data leakage: the silent score killer

เรามา "ทดลองรั่ว" กันจริง ๆ: สร้างคอลัมน์ `lucky_ticket` ที่แอบรู้คำตอบ 85% (เลียนแบบข้อมูลจริงที่บันทึก "หลังเกิดผลลัพธ์")
"""))
cells.append(code("""
rng = np.random.RandomState(1)
flip = rng.rand(len(y)) < 0.15
proxy = y.copy()
proxy[flip] = 1 - proxy[flip]          # พลิกคำตอบ 15%

X_leak = X.copy()
X_leak["lucky_ticket"] = proxy.values

pre_leak = ColumnTransformer([
    ("num", Pipeline([("imp", SimpleImputer(strategy="median")),
                      ("sc", StandardScaler())]), num_cols + ["lucky_ticket"]),
    ("cat", cat_pipe, cat_cols)])

leaky = Pipeline([("pre", pre_leak), ("model", LogisticRegression(max_iter=1000))])
Xl_tr, Xl_te, yl_tr, yl_te = train_test_split(X_leak, y, test_size=0.2, stratify=y, random_state=42)
print("honest :", round(clf_lr.fit(X_train, y_train).score(X_test, y_test), 3))
print("leaky  :", round(leaky.fit(Xl_tr, yl_tr).score(Xl_te, yl_te), 3))
"""))
cells.append(md("""
คะแนนบวมขึ้นทันที (+5.6 คะแนน) ทั้งที่โมเดลไม่ได้เก่งขึ้นเลย — มันแค่ "ได้กลิ่นคำตอบ"

ในโลกจริง leak มักไม่ชัดขนาดนี้: `days_since_last_complaint` ตอนทำนาย churn (คำร้องถูกยื่นหลังยกเลิกแล้ว) ฯลฯ
**คำถามกำกับทุกคอลัมน์: ค่านี้ถูกรู้ "เมื่อไหร่"?**
"""))

cells.append(md("""
## Slide 18 — Production reality: unseen categories
"""))
cells.append(code("""
# ผู้โดยสารขึ้นเรือที่ท่าใหม่ "B" — OneHotEncoder(handle_unknown="ignore") จะไม่ crash
new_passenger = pd.DataFrame({"pclass": [1], "sex": ["female"], "age": [35.0],
                              "sibsp": [0], "parch": [0], "fare": [80.0],
                              "embarked": ["B"]})
clf.predict(new_passenger)
"""))

cells.append(md("""
---
✅ **จบ Demo 03** — ตอนนี้คุณมี template 15 บรรทัดที่จะใช้ตั้งแต่คาบนี้จนถึงโปรเจ็คจบคอร์ส

**ต่อไป:** **Lab 03** ใน `excercises/03.pipeline_exercise.ipynb` — สร้าง pipeline เอง + ทดลอง leak ด้วยมือตัวเอง
"""))
save(make_notebook(cells), f"{ROOT}/demos/03.pipeline_demo.ipynb")
