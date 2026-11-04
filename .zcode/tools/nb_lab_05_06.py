# Build Lab 05 + Lab 06 (exercise + solution pairs, Thai)
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from nb_lib import make_notebook, md, code, save

ROOT = r"D:/Repositories/AI_course_MasterDegree"
EX = f"{ROOT}/excercises"
SOL = f"{ROOT}/excercises/solutions"

# ================= LAB 05 : exercise =================
cells = []
cells.append(md("""
# Lab 05 — ทำนายราคาบ้านแคลิฟอร์เนีย (Regression Showdown)

**Machine Learning with scikit-learn — Session 05**

## 🎯 วัตถุประสงค์
1. รันโปรโตคอลคาบ 4 กับโจทย์ regression ครบชุด (baseline → models → test ครั้งเดียว)
2. อ่านสัมประสิทธิ์ LinearRegression ให้เป็น "เรื่องเล่า"
3. อธิบายปรากฏการณ์ tree ท่องจำ (train R² = 1.0)
4. แปล metric เป็นภาษามนุษย์/เงิน

## 📝 คำแนะนำ
- ข้อมูล 20,640 แถว โหลดครั้งแรกใช้เน็ตนิดหน่อย (built-in ของ sklearn)
- ทุกโมเดลใส่ใน `make_pipeline(StandardScaler(), model)` ให้เหมือนกันหมด
"""))

cells.append(md("## ⚙️ Setup"))
cells.append(code("""
from sklearn.datasets import fetch_california_housing
from sklearn.dummy import DummyRegressor
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.metrics import mean_absolute_error, r2_score
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsRegressor
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.tree import DecisionTreeRegressor

X, y = fetch_california_housing(return_X_y=True)

# TODO: split 80/20 (random_state=42)


print(X_train.shape, X_test.shape)
"""))

cells.append(md("""
## โจทย์ 1 — Baseline + Linear Regression

รายงาน **MAE และ R²** ของ (1) DummyRegressor(median) และ (2) LinearRegression บน test set
แล้ว**แปล MAE เป็นเงิน** (หน่วย y = ×$100k)
"""))
cells.append(code("""
# TODO: วัดผล Dummy + LinearRegression + แปลเป็นประโยคภาษาคน


"""))

cells.append(md("""
## โจทย์ 2 — อ่านใจโมเดล (coefficients)

fit LinearRegression (มี scaler ใน pipeline) แล้วเรียงค่าสัมประสิทธิ์จากหนักไปเบา
ตอบ: ฟีเจอร์ไหนผลักราคา "ขึ้น" แรงที่สุด? อันไหน "ลง"? แล้ว intercept ≈ 2.07 แปลว่าอะไร?
"""))
cells.append(code("""
# TODO: เรียง coefficients + ตอบคำถาม


"""))

cells.append(md("""
## โจทย์ 3 — Tree อิสระ vs Tree จำกัด depth

เทรน DecisionTreeRegressor แบบ (1) ไม่จำกัด และ (2) `max_depth=8`
พิมพ์ **train R² และ test R²** ทั้งคู่ — เขียนอธิบายช่องว่างของต้นที่ 1 ด้วยคำว่า "ท่องจำ"
"""))
cells.append(code("""
# TODO: tree สองแบบ + train/test R²


"""))

cells.append(md("""
## โจทย์ 4 — ปิดท้ายด้วย KNN regression

เพิ่ม KNeighborsRegressor(n_neighbors=10) เข้าตาราง แล้วสรุป "ตารางสุดท้ายของ lab นี้"
(4 โมเดล + baseline เรียงจากดีไปแย่ พร้อม MAE, R²)
"""))
cells.append(code("""
# TODO: KNN regression + ตารางสรุป


"""))

cells.append(md("""
## โจทย์ 5 (โจทย์ชวนคิด) — Ridge กับ alpha ต่างกัน

ลอง Ridge กับ alpha ∈ {0.01, 1, 100} — ดูคะแนน test และขนาดสัมประสิทธิ์ (`.coef_`) ว่าเปลี่ยนยังไง
แล้วอธิบายว่าทำไม Lasso(alpha=0.1) บนข้อมูลนี้ถึงแย่กว่า LinearRegression ธรรมดา
"""))
cells.append(code("""
# TODO: Ridge 3 alpha + Lasso + คำอธิบาย


"""))

cells.append(md("""
## 🤖 ลองถาม AI (vibe coding corner)

> "แปลงผล regression ของฉัน (MAE 0.44 ในหน่วย $100k) ให้เป็นสรุป 2 ประโยคสำหรับรายงานผู้บริหาร
> ที่ไม่รู้อะไรเรื่อง ML เลย แล้วบอกด้วยว่าควรระวังตรงไหนก่อนใช้โมเดลนี้ตัดสินใจ"

สังเกตว่า AI แปลภาษาเทคนิค→ธุรกิจเก่งมาก — แต่ตัวเลขและข้อจำกัดต้องมาจากการวัดของคุณเท่านั้น
"""))
save(make_notebook(cells), f"{EX}/05.regression_exercise.ipynb")

# ================= LAB 05 : solution =================
cells = []
cells.append(md("# เฉลย Lab 05 — Regression Showdown"))
cells.append(code("""
from sklearn.datasets import fetch_california_housing
from sklearn.dummy import DummyRegressor
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.metrics import mean_absolute_error, r2_score
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsRegressor
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.tree import DecisionTreeRegressor

X, y = fetch_california_housing(return_X_y=True)
Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.2, random_state=42)
"""))
cells.append(md("""
### ข้อ 1 — baseline + linear + แปลเป็นเงิน

Dummy: MAE 0.874 / R² **−0.05** (ติดลบ = แย่กว่าทายค่าเฉลี่ย) · Linear: MAE 0.533 / R² 0.576
แปลเป็นคน: จากพลาดเฉลี่ย ~$87,000 เหลือ ~$53,000 ต่อการทำนาย
"""))
cells.append(code("""
def report(name, model):
    m = make_pipeline(StandardScaler(), model).fit(Xtr, ytr)
    yp = m.predict(Xte)
    print(f"{name:22s} MAE={mean_absolute_error(yte, yp):6.3f}  R2={r2_score(yte, yp):6.3f}")
    return m

report("Dummy(median)", DummyRegressor(strategy="median"))
lr = report("LinearRegression", LinearRegression())
"""))
cells.append(md("""
### ข้อ 2 — coefficients = ความเชื่อของโมเดล

MedInc +0.85σ แรงสุดด้านบวก · Latitude −0.90 / Longitude −0.87 — แคลิฟอร์เนียคือเรื่องภูมิศาสตร์
intercept 2.07 ≈ ราคาเฉลี่ย ($207k) เพราะฟีเจอร์ถูก standardize แล้ว (ศูนย์ = ค่าเฉลี่ย)
"""))
cells.append(code("""
import pandas as pd
names = fetch_california_housing().feature_names
pd.Series(lr[-1].coef_, index=names).round(2).sort_values(key=abs, ascending=False)
"""))
cells.append(md("""
### ข้อ 3 — tree อิสระ = เครื่องท่องจำ

อิสระ: train 1.000 / test 0.623 (ใบละครอบครัวเดียว = จำรายแถว) · depth=8: test 0.678 ดีกว่า!
"""))
cells.append(code("""
free = DecisionTreeRegressor(random_state=42).fit(Xtr, ytr)
print(f"free tree  : train={free.score(Xtr, ytr):.3f}  test={free.score(Xte, yte):.3f}")
d8 = DecisionTreeRegressor(max_depth=8, random_state=42).fit(Xtr, ytr)
print(f"depth-8    : train={d8.score(Xtr, ytr):.3f}  test={d8.score(Xte, yte):.3f}")
"""))
cells.append(md("""
### ข้อ 4 — ตารางสุดท้าย
"""))
cells.append(code("""
report("Tree(depth 8)", DecisionTreeRegressor(max_depth=8, random_state=42))
report("KNN(k=10)", KNeighborsRegressor(n_neighbors=10))
"""))
cells.append(md("""
อันดับ (test R²): KNN 0.678 ≈ Tree(8) 0.678 > Linear 0.576 ≫ Dummy −0.05
แต่ Linear ชนะเรื่อง "อธิบายได้" — เลือกโมเดลตามสิ่งที่ผู้ฟังต้องการ: prediction หรือ explanation
"""))
cells.append(md("""
### ข้อ 5 — Ridge/Lasso และ alpha

alpha ยิ่งใหญ่ → สัมประสิทธิ์ยิ่งถูกรัดเล็ก แต่บนข้อมูล 8 ฟีเจอร์สะอาด ๆ คะแนนแทบไม่ขยับ (ทั้งสามค่า ≈ 0.576)
ส่วน Lasso(0.1) แย่ลง (R² ~0.48) เพราะ alpha 0.1 สำหรับฟีเจอร์ scaled จำนวนน้อย = ลงโทษหนักเกินจำเป็น
จึง "หั่น" น้ำหนักของฟีเจอร์จริงไปด้วย — alpha คือ hyperparameter ที่ต้อง tune (คาบ 7)
"""))
cells.append(code("""
for a in [0.01, 1.0, 100.0]:
    r = make_pipeline(StandardScaler(), Ridge(alpha=a)).fit(Xtr, ytr)
    print(f"Ridge alpha={a:6}: test R2={r.score(Xte, yte):.3f}  max|coef|={abs(r[-1].coef_).max():.2f}")

las = make_pipeline(StandardScaler(), Lasso(alpha=0.1)).fit(Xtr, ytr)
print(f"Lasso alpha=0.1 : test R2={las.score(Xte, yte):.3f}  (โดนหั่นจนเจ็บตัว)")
"""))
save(make_notebook(cells), f"{SOL}/05.regression_solution.ipynb")

# ================= LAB 06 : exercise =================
cells = []
cells.append(md("""
# Lab 06 — ประกวดโมเดลจัดหมวดมะเร็งเต้านม (รวมถึง Ensembles)

**Machine Learning with scikit-learn — Session 06**

## 🎯 วัตถุประสงค์
1. เทียบ classifier 6 ตระกูลด้วย StratifiedKFold เดียวกัน (acc + ROC-AUC)
2. อ่านต้นไม้จริงด้วย `export_text` แล้วแปลงเป็นภาษาไทย
3. พิสูจน์ ensemble effect ด้วยตัวเลขของตัวเอง
4. อ่าน `feature_importances_` อย่างมีวิจารณญาณ

## 📝 คำแนะนำ
- ทุกการเทียบต้องใช้ `skf` ตัวเดียวกัน (fold เดียวกัน = การเทียบที่ยุติธรรม)
- โมเดลที่ต้องการ scaling (LR, KNN, SVM) ใส่ make_pipeline ให้ครบ
"""))

cells.append(md("## ⚙️ Setup"))
cells.append(code("""
from sklearn.datasets import load_breast_cancer
from sklearn.dummy import DummyClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_auc_score
from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.naive_bayes import GaussianNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier, export_text

X, y = load_breast_cancer(return_X_y=True)
names = list(load_breast_cancer().feature_names)
skf = StratifiedKFold(5, shuffle=True, random_state=42)
"""))

cells.append(md("""
## โจทย์ 1 — สนามประกวด 6 โมเดล

เติม zoo ของคุณให้ครบ: Dummy(most_frequent) · GaussianNB · KNN(5) · LogisticRegression · SVC(RBF) ·
DecisionTree (อิสระ) — วัดด้วย `skf` ทั้ง accuracy และ roc_auc แล้วเรียงอันดับจาก AUC
"""))
cells.append(code("""
# TODO: loop 6 โมเดล พิมพ์ acc + AUC


"""))

cells.append(md("""
## โจทย์ 2 — อ่านต้นไม้ออกเสียงเป็นไทย

fit DecisionTreeClassifier(max_depth=3) บน train split แล้ว `export_text` —
เลือก path เดียวแล้ว**แปลงเป็นประโยคไทย 1-2 ประโยค** (เช่น "ถ้าก้อนเนื้อเล็กและผิวเรียบ มักเป็นเนื้องอกดี")
"""))
cells.append(code("""
from sklearn.model_selection import train_test_split

Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, stratify=y, random_state=42)

# TODO: fit depth-3 tree + export_text + เขียนแปลไทย


"""))

cells.append(md("""
## โจทย์ 3 — Ensemble effect

เทียบ 3 ตัว (ใช้ skf เดิม): DecisionTree อิสระ · RandomForest(100) · VotingClassifier ของคุณเอง
(สมาชิกอย่างน้อย 3 ตัวที่ "หลากหลาย" เช่น LR + RF + KNN, voting="soft")

**เขียนตอบ:** ensemble ช่วย tree ได้แค่ไหน? แล้ว Voting ของคุณชนะสมาชิกตัวไหนบ้างไหม?
"""))
cells.append(code("""
from sklearn.ensemble import VotingClassifier

# TODO: tree vs RF vs Voting


"""))

cells.append(md("""
## โจทย์ 4 — feature importances + วิจารณญาณ

fit RandomForest บน train แล้วดู 5 อันดับ `feature_importances_`
ตอบ: top-5 ของคุณ "สอดคล้องกับความรู้ทางการแพทย์" ไหม? และเหตุผลใดที่ importance ไม่ควรอ่านเป็น "สาเหตุของโรค"?
"""))
cells.append(code("""
# TODO: top-5 importances + ความเห็น


"""))

cells.append(md("""
## โจทย์ 5 (โจทย์ชวนคิด) — ออกแบบ ensemble ของคุณเอง

สร้าง VotingClassifier ที่มีสมาชิก "ต่างสายพันธุ์" ที่สุด (เช่น NB + SVM + RF)
ลองเปลี่ยน voting="hard" vs "soft" แล้วอธิบายว่า soft ทำงานยังไง ทำไมมักดีกว่า
"""))
cells.append(code("""
# TODO: ensemble แบบหลากหลาย + hard vs soft


"""))

cells.append(md("""
## 🤖 ลองถาม AI (vibe coding corner)

> "อธิบายความต่างระหว่าง bagging กับ boosting เหมือนสอนเด็ก 12 ขวบ — แล้วสรุปให้ฉันฟังด้วยว่า
> RandomForest กับ HistGradientBoosting เหมาะกับสถานการณ์ไหนต่างกันยังไง"

แล้วเขียนคำอธิบาย **3 บรรทัดเป็นภาษาไทย** ใน markdown cell ด้วยคำของคุณเอง — เช็กกับสไลด์ 11-13 ว่าตรงกันไหม
"""))
save(make_notebook(cells), f"{EX}/06.classification_ensembles_exercise.ipynb")

# ================= LAB 06 : solution =================
cells = []
cells.append(md("# เฉลย Lab 06 — ประกวดโมเดลจัดหมวดมะเร็งเต้านม"))
cells.append(code("""
from sklearn.datasets import load_breast_cancer
from sklearn.dummy import DummyClassifier
from sklearn.ensemble import RandomForestClassifier, VotingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedKFold, cross_val_score, train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier, export_text

X, y = load_breast_cancer(return_X_y=True)
names = list(load_breast_cancer().feature_names)
skf = StratifiedKFold(5, shuffle=True, random_state=42)
"""))
cells.append(md("""
### ข้อ 1 — สนามประกวด (CV เดียวกัน 2 metric)

ตัวเลขอ้างอิงจากเครื่องของอาจารย์ (random_state เดียวกันควรได้เท่ากัน):
SVM 0.977/0.995 · LR 0.974/0.995 · KNN 0.963/0.985 · NB 0.930/0.986 · Tree อิสระ 0.910/0.900 · Dummy 0.627/0.500
"""))
cells.append(code("""
zoo = [
    ("Dummy", DummyClassifier(strategy="most_frequent")),
    ("GaussianNB", make_pipeline(StandardScaler(), GaussianNB())),
    ("KNN(5)", make_pipeline(StandardScaler(), KNeighborsClassifier())),
    ("LogisticRegression", make_pipeline(StandardScaler(), LogisticRegression(max_iter=5000))),
    ("SVM(RBF)", make_pipeline(StandardScaler(), SVC(random_state=42))),
    ("Tree(free)", DecisionTreeClassifier(random_state=42)),
]
results = []
for name, m in zoo:
    acc = cross_val_score(m, X, y, cv=skf).mean()
    auc = cross_val_score(m, X, y, cv=skf, scoring="roc_auc").mean()
    results.append((auc, acc, name))
for auc, acc, name in sorted(results, reverse=True):
    print(f"{name:20s} acc={acc:.3f}  AUC={auc:.3f}")
"""))
cells.append(md("""
### ข้อ 2 — ต้นไม้เป็นภาษาไทย

path ตัวอย่างจากต้นไม้จริง (depth 3):
"ถ้า worst radius ≤ 16.8 และ worst concave points ≤ 0.14 และ area error ≤ 91.6 → class 1 (เนื้องอกดี)"
= ก้อนเนื้อเล็ก ผิวเรียบ ไม่มีการเปลี่ยนแปลงขนาดมาก → มักเป็นเนื้องอกดี
"""))
cells.append(code("""
Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, stratify=y, random_state=42)
tree3 = DecisionTreeClassifier(max_depth=3, random_state=42).fit(Xtr, ytr)
print(export_text(tree3, feature_names=names, max_depth=2))
print("test accuracy:", round(tree3.score(Xte, yte), 3))
"""))
cells.append(md("""
### ข้อ 3 — ensemble effect

tree เดี่ยว 0.910 → RandomForest 0.956 → Voting(LR+RF+KNN) 0.972
ensemble "ยก" tree ขึ้นมาก แต่บนข้อมูลง่ายแบบนี้ single ที่ดี (SVM 0.977) ก็แซงได้ — ไม่มีใครชนะทุกที่
"""))
cells.append(code("""
vote = VotingClassifier([
    ("lr",  make_pipeline(StandardScaler(), LogisticRegression(max_iter=5000))),
    ("rf",  RandomForestClassifier(random_state=42)),
    ("knn", make_pipeline(StandardScaler(), KNeighborsClassifier())),
], voting="soft")

for name, m in [("Tree(free)", DecisionTreeClassifier(random_state=42)),
                ("RandomForest", RandomForestClassifier(random_state=42)),
                ("Voting", vote)]:
    acc = cross_val_score(m, X, y, cv=skf).mean()
    auc = cross_val_score(m, X, y, cv=skf, scoring="roc_auc").mean()
    print(f"{name:14s} acc={acc:.3f}  AUC={auc:.3f}")
"""))
cells.append(md("""
### ข้อ 4 — importances

top-5: worst area 0.15 · worst concave points 0.13 · mean concave points 0.11 · worst radius 0.09 · worst perimeter 0.08
สอดคล้องการแพทย์ (ขนาด + ความหยักของขอบก้อนเนื้อ) แต่ "สำคัญต่อการแยกกลุ่มใน dataset นี้" ≠ "สาเหตุของโรค"
ฟีเจอร์ที่สัมพันธ์กันเอง (area/radius/perimeter!) ยังแบ่งกันกิน importance ด้วย
"""))
cells.append(code("""
import pandas as pd
rf = RandomForestClassifier(random_state=42).fit(Xtr, ytr)
pd.Series(rf.feature_importances_, index=names).sort_values(ascending=False).head(5).round(3)
"""))
cells.append(md("""
### ข้อ 5 — hard vs soft

hard = นับเสียง label · **soft = เฉลี่ย probability แล้วตัดสิน** — soft ดีกว่าเพราะ "ความมั่นใจ" ของแต่ละโมเดลมีค่า
โมเดลที่ 90% มั่นใจควรมีน้ำหนักมากกว่าโมเดลที่เดา ๆ 51%
"""))
cells.append(code("""
vote_hard = VotingClassifier([
    ("nb", make_pipeline(StandardScaler(), GaussianNB())),
    ("svm", make_pipeline(StandardScaler(), SVC(random_state=42))),
    ("rf", RandomForestClassifier(random_state=42))], voting="hard")
vote_soft = VotingClassifier([
    ("nb", make_pipeline(StandardScaler(), GaussianNB())),
    ("svm", make_pipeline(StandardScaler(), SVC(probability=True, random_state=42))),
    ("rf", RandomForestClassifier(random_state=42))], voting="soft")

for name, m in [("hard", vote_hard), ("soft", vote_soft)]:
    acc = cross_val_score(m, X, y, cv=skf).mean()
    print(f"{name}: acc={acc:.3f}")
"""))
save(make_notebook(cells), f"{SOL}/06.classification_ensembles_solution.ipynb")
