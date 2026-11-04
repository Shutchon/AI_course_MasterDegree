# Build demo 00 + demo 01 (run-along notebooks; English headers + Thai notes)
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from nb_lib import make_notebook, md, code, save

ROOT = r"D:/Repositories/AI_course_MasterDegree"

# ---------------- Demo 00 ----------------
cells = []
cells.append(md("""
# Demo 00 — Course Warm-up: Colab & pandas

**Machine Learning with scikit-learn — Session 00**

โน้ตบุ๊คนี้ใช้รันตามสไลด์คาบ 0 ครับ เปิดใน Google Colab แล้วกด `Shift+Enter` รันทีละ cell ไปเรื่อย ๆ
เป้าหมายของคาบนี้: คุ้นกับ Colab + ทบทวน pandas ที่จะใช้ตลอดคอร์ส

> ถ้า cell ไหนรันไม่ผ่าน ให้ลอง `Runtime → Restart runtime` แล้วรันใหม่ตั้งแต่ต้น
"""))

cells.append(md("""
## Slide 7 — Your toolkit

ทุกอย่างด้านล่าง Colab ติดตั้งมาให้แล้ว เราแค่ import — ถ้า cell นี้รันผ่าน แปลว่าเครื่องมือครบแล้วครับ
"""))
cells.append(code("""
import sys
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import sklearn

print("python   ", sys.version.split()[0])
print("pandas   ", pd.__version__)
print("numpy    ", np.__version__)
print("seaborn  ", sns.__version__)
print("sklearn  ", sklearn.__version__)
"""))

cells.append(md("""
## Slide 8 — Colab in 60 seconds

ลองรัน cell แรกของชีวิตในคอร์สนี้ — แล้วลองแก้ข้อความใน `print` แล้วรันใหม่ดู
"""))
cells.append(code("""
print("hello ML")
print("สวัสดี Machine Learning")
"""))

cells.append(md("""
Markdown cell คือกระดาษโน้ตของเรา — เขียนสรุป ถามคำถาม หรือจดไอเดียภาษาไทยก็ได้

**ลองเพิ่ม cell ใหม่:** กดปุ่ม `+ Code` หรือ `+ Text` ด้านบน
"""))

cells.append(md("""
## Slide 9 — The 20% of pandas you'll use 80% of the time

เราจะใช้ชุดข้อมูล Titanic ทดลอง — เป็นตารางผู้โดยสารเรือที่จะกลับมาเป็นตัวเอกอีกครั้งในคาบ 2 และ 3
"""))
cells.append(code("""
df = sns.load_dataset("titanic")[["survived", "pclass", "sex", "age", "sibsp", "parch", "fare", "embarked"]]
df.head()
"""))
cells.append(code("""
df.info()   # ดูชนิดข้อมูล + missing ของแต่ละคอลัมน์
"""))
cells.append(code("""
df.describe()   # สถิติเบื้องต้นของคอลัมน์ตัวเลข
"""))
cells.append(code("""
df["sex"].value_counts()          # นับค่าในคอลัมน์ category
"""))
cells.append(code("""
# คอลัมน์เดียว (Series)
df["age"].head()
"""))
cells.append(code("""
# หลายคอลัมน์
df[["age", "fare"]].head()
"""))
cells.append(code("""
# กรองแถว: เอาเฉพาะคนอายุมากกว่า 30
df[df["age"] > 30].head()
"""))
cells.append(code("""
# group + aggregate: อัตรารอดชีวิตแยกตามเพศ
df.groupby("sex")["survived"].mean()
"""))
cells.append(code("""
# จัดการ missing: ดูจำนวน missing ต่อคอลัมน์
df.isna().sum()
"""))

cells.append(md("""
## X และ y ในภาษาของ Machine Learning

- **feature columns → X** (ข้อมูลนำเข้าที่ใช้ทำนาย)
- **target column → y** (สิ่งที่เราอยากทำนาย)

ใน Titanic: `y = survived` ส่วนคอลัมน์ที่เหลือคือ `X` — คาบหน้าเราจะสร้างโมเดลตัวแรกด้วยชุดข้อมูลใหม่ครับ
"""))

cells.append(md("""
---
✅ **จบ Demo 00** — ถ้าทุก cell รันผ่าน คุณพร้อมสำหรับคาบ 01 แล้ว

**ถัดไป:** [Demo 01 — Introduction to Machine Learning](`01.ml_intro_demo.ipynb`)
"""))
save(make_notebook(cells), f"{ROOT}/demos/00.course_warmup_demo.ipynb")

# ---------------- Demo 01 ----------------
cells = []
cells.append(md("""
# Demo 01 — Introduction to Machine Learning

**Machine Learning with scikit-learn — Session 01**

โน้ตบุ๊ครันตามสไลด์คาบ 1 — ทุก cell คือโค้ดตัวเดียวกับที่อยู่บนสไลด์ เรียงตามหมายเลขสไลด์
วิธีใช้: เปิดสไลด์คู่กัน แล้วรัน `Shift+Enter` ตามที่อาจารย์ไปถึงหน้าไหน
"""))

cells.append(md("""
## Slide 12 — Meet the iris dataset (1936!)

ข้อมูลดอกไม้ 150 ดอก × 4 คุณลักษณะ (เซนติเมตร) — เป้าหมาย: ทำนายสายพันธุ์ (0/1/2)
"""))
cells.append(code("""
from sklearn.datasets import load_iris
import pandas as pd

X, y = load_iris(return_X_y=True)
print(X.shape, y.shape)   # (150, 4) และ (150,)
pd.DataFrame(X, columns=load_iris().feature_names).head()
"""))

cells.append(md("""
## Slide 13 — Your first model, five lines

นี่คือ "สวัสดีชาว Machine Learning" — จำลำดับให้ขึ้นใจ: **แบ่งข้อมูล → สร้างโมเดล → fit → ตรวจคะแนน**
"""))
cells.append(code("""
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42)          # ① hold out 30%

model = KNeighborsClassifier(n_neighbors=3)        # ② create
model.fit(X_train, y_train)                        # ③ learn
print(model.score(X_test, y_test))                 # ④ judge
"""))
cells.append(md("""
ได้ **1.0** — ทายถูก 100% บนดอกไม้ 45 ดอกที่โมเดล **ไม่เคยเห็นมาก่อน**

อย่าเคยชินกับเลขสวยขนาดนี้นะครับ iris เป็นข้อมูลฝึกที่ "ง่ายแบบใจดี" — ข้อมูลจริง (Titanic คาบหน้า) จะโหดกว่านี้มาก
"""))

cells.append(md("""
## Slide 14 — Never grade a student on questions it has seen

train/test split คือหัวใจของการประเมินโมเดล:
- `fit` เรียนรู้จาก training set อย่างเดียว
- `score` วัดผลบน test set ที่โมเดลไม่เคยเห็น = "ข้อสอบจริง"
- `random_state=42` ทำให้ผลลัพธ์ทำซ้ำได้ทุกเครื่อง
"""))
cells.append(code("""
print("train size:", len(X_train), "| test size:", len(X_test))
print("train accuracy:", round(model.score(X_train, y_train), 3))
print("test  accuracy:", round(model.score(X_test, y_test), 3))
"""))

cells.append(md("""
## Slide 15 — Look at what it got wrong

โมเดลก็พลาดได้ — นัก data science ที่ดีต้อง "อ่าน" ความผิดพลาด ไม่ใช่แค่ดูคะแนน
เราขยับ k ไปที่ 50 เพื่อให้เห็นว่าโมเดลพลาดหน้าตาเป็นอย่างไร
"""))
cells.append(code("""
model50 = KNeighborsClassifier(n_neighbors=50).fit(X_train, y_train)
y_pred = model50.predict(X_test)

compare = pd.DataFrame({"actual": y_test, "predicted": y_pred})
compare[compare.actual != compare.predicted]     # แสดงเฉพาะแถวที่ทายผิด
"""))
cells.append(md("""
พลาด 2 จาก 45 ดอก — และพลาดเป็นทางเดียวกันหมด: ทาย virginica (2) ว่าเป็น versicolor (1)
เพราะสองสายพันธุ์นี้ซ้อนทับกันในเชิงขนาดดอก มนุษย์ก็งงนะครับ
"""))

cells.append(md("""
## Slide 16 — KNN in 30 seconds

กลไกข้างในของ KNN สั้นมาก: หาเพื่อนบ้าน k ตัวที่ใกล้ที่สุด → ให้เพื่อนบ้านโหวต
"""))
cells.append(code("""
# ดู probability ที่โมเดลคิด (ไม่ใช่แค่คำตอบสุดท้าย)
model.predict_proba(X_test[:3]).round(3)
"""))

cells.append(md("""
## Slide 17 — Turn one knob, watch the score move

`n_neighbors` (k) คือ **hyperparameter** — ค่าที่ "เรา" เลือกก่อนเทรน
ลองบิด k แล้วดูคะแนน: ต่ำไป? สูงไป? เหมือนกันหมด?
"""))
cells.append(code("""
for k in [1, 3, 5, 15, 50]:
    m = KNeighborsClassifier(n_neighbors=k)
    m.fit(X_train, y_train)
    print(f"k={k:2d}  accuracy={m.score(X_test, y_test):.3f}")
"""))
cells.append(md("""
iris ง่ายมากจนแทบทุก k ก็สมบูรณ์แบบ — จนกระทั่ง k=50 ห่างเกินไป คะแนนตกลง (underfitting)

ในข้อมูลที่ยากกว่านี้ การเลือก k จะสำคัญมาก — และวิธีเลือกอย่างถูกต้องชื่อ **cross-validation** เราจะเรียนในคาบ 4
"""))

cells.append(md("""
## Slide 19 — Prompting AI for ML code that actually works

สูตร prompt ที่ดีสำหรับงาน ML: **CONTEXT + GOAL + CONSTRAINT + VERIFY** — ลองเล่นจริงกับ cell นี้
(ใน Colab ลองกดปุ่ม Generate code / ถาม AI ที่คุณชอบก็ได้)
"""))
cells.append(md("""
```
I have a pandas DataFrame `df` with columns tenure(float), contract(object),
monthly_charges(float), churn(0/1 int). Using scikit-learn only:
1) build a ColumnTransformer that imputes+one-hot-encodes contract
   and scales the numeric columns,
2) chain it with LogisticRegression in a Pipeline,
3) evaluate with 5-fold stratified CV — mean ROC-AUC.
Random-state 42. Do NOT touch a holdout test set.
```

แล้วอย่าลืมขั้นสุดท้าย: **VERIFY** — เช็กว่า API มีจริง พารามิเตอร์ไม่ตาย และไม่มี leakage ซ่อนอยู่
"""))

cells.append(md("""
---
✅ **จบ Demo 01** — คุณเพิ่งเทรนโมเดล ML ตัวแรกของชีวิต อ่านความผิดพลาด และบิด hyperparameter เป็นแล้ว

**ต่อไป:** ไปทำ **Lab 01** ใน `excercises/01.ml_intro_exercise.ipynb` — โจทย์ภาษาไทย ลองทำเองก่อนดูเฉลยนะครับ
"""))
save(make_notebook(cells), f"{ROOT}/demos/01.ml_intro_demo.ipynb")
