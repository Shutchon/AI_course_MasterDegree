# แผนสร้างคอร์สสอน "Machine Learning with scikit-learn" (AI Master's course)

## Context
Repository `D:\Repositories\AI_course_MasterDegree` ว่างเปล่า เป็นโปรเจ็คใหม่ทั้งหมด ผู้เรียนมีพื้นฐาน Python บ้างและ vibe code ได้ รูปแบบวัสดุตาม pattern คอร์สก่อนหน้าของคุณ (`BasicPythonProgramming`): สไลด์ภาษาอังกฤษ + โน้ตบุ๊คภาษาไทย + README ภาษาอังกฤษ

**ข้อกำหนดหลัก:** สไลด์ภาษาอังกฤษ intuition-first | แบบฝึกหัดภาษาไทยเปิดใน Colab ได้ทันที | demo notebook รันตามสไลด์ทุกคาบ (หัวข้ออังกฤษตรงกับสไลด์ + คำอธิบายไทย) | 8 คาบ | บท Model Evaluation & CV เป็นคาบ 04 ก่อนเรียนโมเดล | โปรเจ็คท้ายคอร์ส guided capstone | ส่งมอบ .pptx + PDF (best-effort)

## โครงสร้าง Repository
```
AI_course_MasterDegree/
├── README.md              # อังกฤษ: ภาพรวม, ตารางคาบ-ลิงก์ (slides/demos/exercises), วิธีเปิดใน Colab
├── slides/                # 00-08 (.pptx + .pdf)
├── demos/                 # 0N.topic_demo.ipynb × 9 — รันตามสไลด์ระหว่างสอน
└── excercises/            # โจทย์ไทย 0N.topic_exercise.ipynb × 8
    └── solutions/         # เฉลย 0N.topic_solution.ipynb × 8
```

## หลักสูตร 8 คาบ (คาบละ ~2.5-3 ชม.)

**00 Course Overview** (~12 สไลด์): syllabus, เกณฑ์คะแนน, ทบทวน Colab/pandas, นโยบายใช้ AI assistant
Demo 00: warm-up — Colab ทำงานอย่างไร + ทบทวน pandas แบบเร็ว

**01 Introduction to ML**: ML คืออะไร, AI vs ML vs DL, supervised/unsupervised/reinforcement, ML workflow, API ของ sklearn (fit/predict/transform), โมเดลแรกใน 5 บรรทัด, vibe code กับงาน ML อย่างปลอดภัย | Lab: iris + KNN, train_test_split, ทดลอง n_neighbors, ทำซ้ำกับ wine

**02 Data Understanding & Cleaning**: ชนิดข้อมูล, EDA, missing values + SimpleImputer, outliers (IQR/z-score), duplicates, inconsistent categories | Lab: Titanic (seaborn) — สำรวจ เก็บกวาด วิเคราะห์

**03 Feature Engineering & Pipelines**: ทำไมต้อง preprocess, OneHot/OrdinalEncoder, Standard/Minmax/RobustScaler, binning/log/interaction, **ColumnTransformer + Pipeline**, **data leakage** | Lab: pipeline เต็มรูปแบบบน Titanic + "ทดลองรั่วข้อมูล" เห็นคะแนนบวม

**04 ★ Model Evaluation & Cross-Validation** — ใช้โมเดลเป็น **black box** (สไลด์ระบุชัด: "internals in Sessions 05-06"):
- ทำไมต้องแบ่ง train/test: KNN `n_neighbors=1` ทาย train 100% แต่ test แย่ = "สอบข้อที่เคยเห็นแล้ว"
- Overfitting curve: DecisionTree ปรับ `max_depth` (train พุ่ง แต่ test ขึ้นแล้วตก) + KNN ทั้งสองทิศ (k=1 overfit, k ใหญ่ underfit)
- Holdout ไม่พอ: **diabetes dataset (442 แถว)** รัน split หลาย random_state ให้เห็น R² เด้ง → แรงจูงใจของ k-fold
- k-fold / stratified k-fold, cross_val_score / cross_validate
- Baseline: DummyClassifier/DummyRegressor ("ดีกว่าอะไร?")
- Metrics รวมที่เดียว: regression (MAE/RMSE/R² จาก LinearRegression black-box บน diabetes) + classification (confusion matrix, precision/recall/F1, ROC-AUC จาก predict_proba ของ KNN บน breast cancer, ปัญหา accuracy กับข้อมูลเบ้)
| Lab: overfit experiment (KNN+DecisionTree), holdout vs k-fold บน diabetes, เทียบ Dummy vs KNN vs RandomForest ด้วย stratified CV + อ่าน metrics ทุกชนิด บน breast cancer

**05 Regression Models** (โฟกัสโมเดล เพราะ metrics รู้แล้ว): Linear/Ridge/Lasso, Polynomial, KNN/DecisionTree regression เทียบ decision surface | Lab: California housing — เทียบ 4 โมเดลด้วย CV

**06 Classification + Ensembles**: decision boundary, Logistic Regression (sigmoid + threshold), KNN, Decision Tree ละเอียด, Naive Bayes/SVM เบา, predict_proba, class_weight, RandomForest, HistGradientBoosting (แนะนำ XGBoost/LightGBM), Voting/Stacking | Lab: Breast cancer — เทียบ single vs ensemble + ROC curves, จำลองข้อมูลเบ้

**07 Unsupervised + Hyperparameter Tuning**: KMeans (elbow/silhouette), DBSCAN, PCA, GridSearchCV/RandomizedSearchCV, bias-variance + learning curves, error analysis, save/load (joblib), checklist กับดักที่พบบ่อย | Lab: Mall customers (embed CSV) — segmentation + PCA + tune โมเดลจาก lab ก่อนหน้า

**08 Final Project — Customer Churn Prediction (guided capstone)**: business framing, ครบวงจร EDA → pipeline → baseline → models → tuning → error analysis → insights, วิธีนำเสนอผลงาน, rubric, เส้นทางต่อยอด | Lab: starter notebook แบ่ง section มี TODO + เฉลยฉบับสมบูรณ์ | dataset: Telco Churn (URL จาก GitHub IBM) พร้อม fallback synthetic

**Datasets ทั้งหมดโหลดอัตโนมัติใน Colab ได้** (sklearn built-ins, seaborn, embedded CSV, URL)

## รูปแบบโน้ตบุ๊ค
- **Demos** (`demos/`): หัวข้อ markdown อังกฤษตรงกับชื่อสไลด์ + คำอธิบายไทยสั้น ๆ + โค้ดรันได้ตรงกับสไลด์ 100%
- **Exercises** (`excercises/`): ไทยทั้งฉบับ — วัตถุประสงค์ → โจทย์เป็นข้อ ๆ มี hint → code cell ว่าง `# TODO` → ปิดท้าย "โจทย์ชวนคิด" + กล่อง "ลองถาม AI"
- ทุกไฟล์ Colab-ready ไม่ต้อง %pip install

## ขั้นตอนการทำงาน
1. Scaffold repo: README.md + โฟลเดอร์ slides/, demos/, excercises/, excercises/solutions/
2. สร้างเป็นรายคาบ: เขียนโค้ด canonical ของคาบนั้น 1 ชุด → ใช้ทั้งในสไลด์และ demo notebook ให้ตรงกันเสมอ — สไลด์ 00-08 ด้วย presentations:pptx skill (template เดียวกัน, deck ละ ~25-35 สไลด์, จบด้วย Key Takeaways)
3. Visual QA ทุก deck: render PNG → presentations:visual-judge → แก้ตาม verdict
4. เขียน exercise + solution 8 คู่ (ไทย)
5. ตรวจรันจริง: เฉลยและ demo ทุกไฟล์ `jupyter nbconvert --execute` ใน venv (sklearn/pandas/seaborn); โจทย์ตรวจ nbformat + โครงสร้างครบ
6. Export PDF (LibreOffice ถ้ามี — ไม่มี则ส่ง .pptx + แจ้งวิธี export เอง)
7. อัปเดต README ลิงก์ครบ

## การตรวจสอบ (Verification)
- สไลด์: visual-judge ผ่านทุก deck
- Demo + เฉลย: execute ผ่าน end-to-end ทุกไฟล์ (รวม Telco fallback)
- โจทย์: nbformat ผ่าน + มี วัตถุประสงค์/โจทย์/TODO ครบ
- PDF: เปิดได้ จำนวนหน้าตรง deck