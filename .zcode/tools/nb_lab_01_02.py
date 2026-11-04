# Build Lab 01 + Lab 02 (exercise + solution pairs, Thai)
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from nb_lib import make_notebook, md, code, save

ROOT = r"D:/Repositories/AI_course_MasterDegree"
EX = f"{ROOT}/excercises"
SOL = f"{ROOT}/excercises/solutions"

# ================= LAB 01 : exercise =================
cells = []
cells.append(md("""
# Lab 01 — โมเดลแรกของคุณ (First Model, Your Hands)

**Machine Learning with scikit-learn — Session 01**

## 🎯 วัตถุประสงค์
1. เทรนโมเดล classification ตัวแรกด้วย scikit-learn ได้เอง
2. ใช้ `train_test_split` และอธิบายได้ว่าทำไมต้องแบ่งข้อมูล
3. สังเกตผลของ hyperparameter `n_neighbors` ต่อคะแนน
4. อ่านความผิดพลาดของโมเดล (actual vs predicted)

## 📝 คำแนะนำ
- เปิดใน Google Colab: `File → Save a copy in Drive` แล้วทำในสำเนาของคุณ
- รัน `Shift+Enter` ทีละ cell ตามลำดับ
- ช่องที่มี `# TODO` คือส่วนที่คุณต้องเติมโค้ดเอง
- ติดต่อ? ลองทำก่อนอย่างน้อย 10 นาทีก่อนเปิดเฉลยนะครับ
"""))

cells.append(md("""
## ⚙️ Setup
"""))
cells.append(code("""
from sklearn.datasets import load_iris, load_wine
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
import pandas as pd

X, y = load_iris(return_X_y=True)
print(X.shape, y.shape)
"""))

cells.append(md("""
## โจทย์ 1 — แบ่งข้อมูล 70:30

เติมโค้ดให้แบ่ง `X, y` เป็น train/test โดย test 30% และ `random_state=42`

**ช่วยเหลือ:** ฟังก์ชันที่ต้องใช้ import มาให้แล้วด้านบน อยากรู้พารามิเตอร์เพิ่ม ลองรัน `?train_test_split`
"""))
cells.append(code("""
# TODO: แบ่งข้อมูลเป็น X_train, X_test, y_train, y_test


print("train:", X_train.shape, "| test:", X_test.shape)
"""))

cells.append(md("""
## โจทย์ 2 — เทรน KNN (k=3) และรายงานคะแนน

สร้างโมเดล → fit ด้วยข้อมูล train → พิมพ์คะแนนบน**ชุดทดสอบ**
"""))
cells.append(code("""
# TODO: สร้างโมเดล, fit และพิมพ์คะแนนบน test set


"""))

cells.append(md("""
## โจทย์ 3 — เปลี่ยน k แล้วดูผล

เขียน loop รัน `k ∈ {1, 3, 5, 15, 50}` ทั้งหมด แล้วพิมพ์คะแนน test ของแต่ละค่า

**คำถามชวนคุย (เขียนคำตอบเป็น markdown ใน cell ถัดไป):** k=50 กับ k=3 คะแนนต่างกันอย่างไร เพราะอะไร?
"""))
cells.append(code("""
# TODO: loop ทดลองค่า k


"""))

cells.append(md("""
## โจทย์ 4 — หาแถวที่โมเดลทายผิด

ใช้โมเดล k=3 (หรือ k ที่ดีที่สุดของคุณ) ทำนาย test set แล้วสร้าง DataFrame เทียบ `actual` กับ `predicted`
แล้วแสดงเฉพาะแถวที่ทายผิด

**ช่วยเหลือ:** เงื่อนไขกรองแถวเช่น `compare[compare["actual"] != compare["predicted"]]`
"""))
cells.append(code("""
# TODO: สร้างตารางเทียบและแสดงเฉพาะที่ทายผิด


"""))

cells.append(md("""
## โจทย์ 5 (โจทย์ชวนคิด) — ทำซ้ำกับ wine dataset

ชุดข้อมูล `load_wine()` (178 ไวน์, 13 ฟีเจอร์เคมี, 3 คลาส) — ทำซ้ำทั้งกระบวนการ (split 70:30, KNN, หาค่า k ที่ดี)
โดย**ไม่ต้องดูเฉลย** ถ้าทำได้ครบ = คุณพร้อมสำหรับคาบหน้าแล้ว
"""))
cells.append(code("""
# TODO: ทำซ้ำทั้งหมดกับ wine dataset


"""))

cells.append(md("""
## 🤖 ลองถาม AI (vibe coding corner)

ลอง copy prompt นี้ไปถาม AI ที่คุณชอบ แล้ว**เทียบคำตอบกับสิ่งที่คุณสังเกตเจอเองในโจทย์ 3:**

> "อธิบายว่าทำไม KNeighborsClassifier ที่ n_neighbors=1 มักได้ train accuracy 100% แต่ test ต่ำกว่า
> และทำไม k ที่ใหญ่เกินไป (เช่น 50) ถึงแย่ลง — ตอบแบบสอนนักศึกษาป.โทที่เพิ่งเริ่มเรียน ML"

AI อธิบายเหตุผลได้ดี แต่**คุณ**ต้องเป็นคนตัดสินว่าเชื่อได้แค่ไหน — นี่คือนิสัยที่คอร์สนี้ปลูกให้ตั้งแต่วันแรก
"""))
save(make_notebook(cells), f"{EX}/01.ml_intro_exercise.ipynb")

# ================= LAB 01 : solution =================
cells = []
cells.append(md("""
# เฉลย Lab 01 — โมเดลแรกของคุณ

> คำแนะนำการใช้เฉลย: ลองพยายามทำเองก่อน แล้วค่อยเปิดเทียบทีละข้อ
> ถ้าผลลัพธ์ตัวเลขไม่เหมือนกัน ให้เช็ก `random_state` ก่อนอย่างอื่น
"""))
cells.append(code("""
from sklearn.datasets import load_iris, load_wine
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
import pandas as pd

X, y = load_iris(return_X_y=True)
"""))
cells.append(md("""
### ข้อ 1 — แบ่ง 70:30

`test_size=0.3` คือสัดส่วนชุดทดสอบ · `random_state=42` ทำให้การแบ่งทำซ้ำได้ (ทุกคนได้ split เดียวกัน)
"""))
cells.append(code("""
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42)
print("train:", X_train.shape, "| test:", X_test.shape)
"""))
cells.append(md("""
### ข้อ 2 — เทรน + คะแนน
"""))
cells.append(code("""
model = KNeighborsClassifier(n_neighbors=3)
model.fit(X_train, y_train)
print("test accuracy:", model.score(X_test, y_test))
"""))
cells.append(md("""
ได้ 1.0 — iris ง่ายใจดี อย่าคาดหวังเลขสวยขนาดนี้กับข้อมูลจริงนะครับ (Titanic รออยู่คาบหน้า)
"""))
cells.append(md("""
### ข้อ 3 — loop ทดลองค่า k
"""))
cells.append(code("""
for k in [1, 3, 5, 15, 50]:
    m = KNeighborsClassifier(n_neighbors=k)
    m.fit(X_train, y_train)
    print(f"k={k:2d}  accuracy={m.score(X_test, y_test):.3f}")
"""))
cells.append(md("""
**คำตอบชวนคุย:** k ตั้งแต่ 1-15 ได้ 1.000 หมด (ข้อมูลง่ายมาก) แต่ k=50 ตกเหลือ 0.956
เพราะเวลาโหวต เพื่อนบ้าน 50 ตัว "กว้างเกินไป" — เสียงจากดอกไม้สายพันธุ์อื่นเข้ามาปน จนครอบรูปแบบเฉพาะถิ่น (underfitting)
ในทางกลับกัน k=1 อ่อนไหวต่อ noise มาก (overfitting) — แค่ข้อมูล iris ง่ายเกินจึงมองไม่เห็น
"""))
cells.append(md("""
### ข้อ 4 — แถวที่ทายผิด

ใช้ k=50 เพื่อให้มีข้อผิดพลาดให้ดู (k เล็กพลาด 0 แถว)
"""))
cells.append(code("""
model50 = KNeighborsClassifier(n_neighbors=50).fit(X_train, y_train)
y_pred = model50.predict(X_test)

compare = pd.DataFrame({"actual": y_test, "predicted": y_pred})
compare[compare["actual"] != compare["predicted"]]
"""))
cells.append(md("""
พลาด 2 แถว และพลาดทางเดียวกัน: ทาย virginica (2) เป็น versicolor (1) — สองสายพันธุ์นี้ซ้อนกันในเชิงขนาด
"""))
cells.append(md("""
### ข้อ 5 — wine dataset
"""))
cells.append(code("""
Xw, yw = load_wine(return_X_y=True)
Xw_tr, Xw_te, yw_tr, yw_te = train_test_split(Xw, yw, test_size=0.3, random_state=42)

for k in [1, 3, 5, 15]:
    m = KNeighborsClassifier(n_neighbors=k).fit(Xw_tr, yw_tr)
    print(f"wine k={k:2d}  accuracy={m.score(Xw_te, yw_te):.3f}")
"""))
cells.append(md("""
wine ยากกว่า iris เล็กน้อย (ฟีเจอร์ 13 ตัว scale ต่างกันมาก เช่น proline ~1000 vs hue ~1)
ถ้าคะแนนแปลก ๆ — นั่นแหละคือ "ปัญหา scale" ที่คาบ 3 เราจะแก้ด้วย StandardScaler!
"""))
save(make_notebook(cells), f"{SOL}/01.ml_intro_solution.ipynb")

# ================= LAB 02 : exercise =================
cells = []
cells.append(md("""
# Lab 02 — ทำความรู้จักกับ Titanic (Clean it like a pro)

**Machine Learning with scikit-learn — Session 02**

## 🎯 วัตถุประสงค์
1. รัน "cleaning checklist" ครบชุดกับข้อมูลจริง
2. ตัดสินใจเรื่อง missing ได้โดยมีเหตุผลประกอบ
3. ตรวจ duplicates และ outliers แล้วเขียนว่า "ทำอะไรกับมัน เพราะอะไร"
4. ใช้ groupby/pivot ตอบคำถามเชิงธุรกิจ

## 📝 คำแนะนำ
- ทุกคำตอบที่เป็น "การตัดสินใจ" ต้องเขียนเหตุผลตามใน markdown cell — คะแนนให้ที่เหตุผล ไม่ใช่ที่ตัวเลข
"""))

cells.append(md("## ⚙️ Setup"))
cells.append(code("""
import pandas as pd
import seaborn as sns

df = sns.load_dataset("titanic")[["survived", "pclass", "sex", "age",
                                  "sibsp", "parch", "fare", "embarked"]]
df.shape
"""))

cells.append(md("""
## โจทย์ 1 — สำรวจข้อมูล (5 คำสั่งแรก)

รัน `shape / head / info / describe / value_counts` ให้ครบ แล้วตอบ:
1. ข้อมูลกี่แถวกี่คอลัมน์? แต่ละแถวคืออะไร?
2. คอลัมน์ไหนมี missing มากที่สุด กี่ค่า?
3. เจออะไรผิดปกติใน `describe()` บ้าง? (เขียนอย่างน้อย 2 อย่าง)
"""))
cells.append(code("""
# TODO: รันคำสั่งสำรวจทั้ง 5


"""))

cells.append(md("""
## โจทย์ 2 — จัดการ missing

เขียนโค้ดจัดการ missing ของ `age` และ `embarked` พร้อม**เหตุผล**ว่าเลือกวิธีนั้นเพราะอะไร
(ตัวเลือก: median / most_frequent / drop แถว / เก็บ was_missing เป็นฟีเจอร์)
"""))
cells.append(code("""
# TODO: จัดการ missing + เขียนเหตุผล


"""))

cells.append(md("""
## โจทย์ 3 — สำรวจ target

1. อัตรารอดชีวิตรวมเท่าไหร่? (base rate)
2. แยกตาม `sex` และ `pclass` — กลุ่มไหนรอดมากที่สุด/น้อยที่สุด?
3. ถ้าสร้างโมเดลโง่ ๆ ที่ทายทุกคนว่าตาย จะได้ accuracy เท่าไหร่?
"""))
cells.append(code("""
# TODO: ตอบคำถาม 3 ข้อด้วยโค้ด


"""))

cells.append(md("""
## โจทย์ 4 — duplicates & outliers

1. มี duplicate กี่แถว? คุณจะทำอะไรกับมัน เพราะอะไร?
2. หา outliers ของ `fare` ด้วย IQR (Q3 + 1.5×IQR) — เจอกี่แถว?
3. ดูแถวที่ `fare > 300` — outlier เหล่านี้ควรตัดทิ้งไหม? เพราะอะไร?
"""))
cells.append(code("""
# TODO: duplicates + outliers


"""))

cells.append(md("""
## โจทย์ 5 (โจทย์ชวนคิด) — ผู้หญิงชั้น 3 vs ผู้ชายชั้น 1

ใครรอดมากกว่ากัน? ใช้ `pivot_table(index=..., columns=..., values="survived")` ตอบ
แล้วคิดต่อ: ถ้าเกิดซ้ำในปี 2026 (เช่น เหตุฉุกเฉินในอาคาร) ผลจะเหมือนเดิมไหม?
"""))
cells.append(code("""
# TODO: pivot_table ตอบคำถาม


"""))

cells.append(md("""
## 🤖 ลองถาม AI (vibe coding corner)

> "ฉันกำลัง clean ข้อมูล Titanic คอลัมน์ age มี missing 19.9% — ช่วยเขียนโค้ด visualise ว่า missing
> กระจายสุ่มหรือมีแบบแผนกับ pclass/sex และให้ 3 ทางเลือกในการจัดการพร้อมข้อดีข้อเสีย"

แล้ว**เลือกเอง**ว่าจะทำอย่างไร พร้อมเหตุผล — AI เสนอทางเลือก การตัดสินใจต้องเป็นของคุณ
"""))
save(make_notebook(cells), f"{EX}/02.data_cleaning_exercise.ipynb")

# ================= LAB 02 : solution =================
cells = []
cells.append(md("""
# เฉลย Lab 02 — ทำความรู้จักกับ Titanic
"""))
cells.append(code("""
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = sns.load_dataset("titanic")[["survived", "pclass", "sex", "age",
                                  "sibsp", "parch", "fare", "embarked"]]
"""))
cells.append(md("""
### ข้อ 1 — สำรวจ

891 แถว × 8 คอลัมน์ แต่ละแถว = ผู้โดยสาร 1 คน · missing มากสุด: age 177 ค่า (19.9%)
"""))
cells.append(code("""
print(df.shape)
df.info()
"""))
cells.append(code("""
df.describe()
"""))
cells.append(md("""
สิ่งผิดปกติที่เจอ (ตอบได้หลายอย่าง):
- `fare` min = 0 → ใครนั่งฟรี? (ต้องตามดู)
- `fare` max 512 vs median 14.45 → เบ้มาก mean หลอกตา
- `age` min 0.42 → ทารก 4 เดือน เป็นไปได้จริง
"""))
cells.append(code("""
df["embarked"].value_counts(dropna=False)
"""))
cells.append(md("""
### ข้อ 2 — missing

เหตุผลของเรา: age เบ้ → ใช้ **median** (28) · embarked หายแค่ 2 แถว → ใช้ **most_frequent** (S)
และเก็บ `age_missing` เป็นฟีเจอร์เพิ่ม เพราะ missing สัมพันธ์กับชั้นโดยสาร (ชั้น 3 หายมากกว่า) = มีสัญญาณ
"""))
cells.append(code("""
df["age_missing"] = df["age"].isna().astype(int)
print(df.groupby("pclass")["age_missing"].mean().round(3))   # ยืนยันว่า missing มีแบบแผน

df["age"] = df["age"].fillna(df["age"].median())
df["embarked"] = df["embarked"].fillna(df["embarked"].mode()[0])
df.isna().sum()
"""))
cells.append(md("""
### ข้อ 3 — target

base rate 38.4% · โมเดลที่ทายทุกคนว่าตายได้ accuracy = 61.6% (61.6% ของผู้โดยสารเสียชีวิตจริง)
"""))
cells.append(code("""
print("survival rate:", round(df["survived"].mean(), 3))
print(df.groupby("sex")["survived"].mean().round(3))
print(df.groupby("pclass")["survived"].mean().round(3))
"""))
cells.append(md("""
ผู้หญิง 74.2% vs ผู้ชาย 18.9% · ชั้น 1: 63% / ชั้น 2: 47% / ชั้น 3: 24%
"""))
cells.append(md("""
### ข้อ 4 — duplicates & outliers

duplicate 111 แถว (ผู้โดยสารคนละคนที่ค่า 8 คอลัมน์ซ้ำกัน) → เรา drop เพื่อกันโอกาส duplicate
ข้าม split แล้วทำคะแนนบวม · outlier fare 116 แถวตาม IQR แต่ fare>300 คือตั๋วจริงของครอบครัวรวย (รอดสูง) → **เก็บไว้**
"""))
cells.append(code("""
print("duplicates:", df.duplicated().sum())
df = df.drop_duplicates()

q1, q3 = df["fare"].quantile([0.25, 0.75])
fence = q3 + 1.5 * (q3 - q1)
print("outliers (IQR):", (df["fare"] > fence).sum())
df[df["fare"] > 300][["pclass", "sex", "fare", "survived"]]
"""))
cells.append(md("""
### ข้อ 5 — ผู้หญิงชั้น 3 vs ผู้ชายชั้น 1
"""))
cells.append(code("""
pd.pivot_table(df, index="pclass", columns="sex", values="survived").round(3)
"""))
cells.append(md("""
เฉลย: **ผู้หญิงชั้น 3 (~50%) รอดมากกว่าผู้ชายชั้น 1 (~37%)** — เพศดันสำคัญกว่าชั้น!

"women and children first" ถูกบังคับใช้จริงในปี 1912 — แต่ถ้าเกิดซ้ำวันนี้กฎอาจต่างไป
ประเด็นสำคัญทาง ML: โมเดลเรียนรู้จากอดีต ถ้าโลกเปลี่ยน โมเดลก็ต้องเรียนใหม่
"""))
save(make_notebook(cells), f"{SOL}/02.data_cleaning_solution.ipynb")
