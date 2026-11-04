# Machine Learning with scikit-learn

**Instructor:** Shutchon Premchaisawatt

A hands-on master's degree course that takes students from "some Python basics" to shipping an
end-to-end machine learning project — using one consistent toolkit: **Google Colab + scikit-learn**.

- **Slides:** English (intuition-first, light on derivations)
- **Demo notebooks:** run-along with the slides (English section headers + Thai explanations)
- **Exercise notebooks:** Thai, Google Colab-ready, with AI-assistant ("vibe coding") prompts
- **Prerequisites:** basic Python (variables, loops, functions, some pandas). No math degree required.

## Course map — 8 sessions + project

| # | Session (slides) | Demo notebook | Lab (Thai) | Solution |
|---|---|---|---|---|
| 00 | [Course Overview](slides/00%20Course%20Overview.pdf) | [warm-up: Colab + pandas](demos/00.course_warmup_demo.ipynb) | — | — |
| 01 | [Introduction to ML](slides/01%20Introduction%20to%20Machine%20Learning.pdf) | [first model in 5 lines](demos/01.ml_intro_demo.ipynb) | [Lab 01](excercises/01.ml_intro_exercise.ipynb) | [✅](excercises/solutions/01.ml_intro_solution.ipynb) |
| 02 | [Data Understanding & Cleaning](slides/02%20Data%20Understanding%20and%20Cleaning.pdf) | [EDA + cleaning on Titanic](demos/02.data_cleaning_demo.ipynb) | [Lab 02](excercises/02.data_cleaning_exercise.ipynb) | [✅](excercises/solutions/02.data_cleaning_solution.ipynb) |
| 03 | [Feature Engineering & Pipelines](slides/03%20Feature%20Engineering%20and%20Pipelines.pdf) | [the 15-line leak-free template](demos/03.pipeline_demo.ipynb) | [Lab 03](excercises/03.pipeline_exercise.ipynb) | [✅](excercises/solutions/03.pipeline_solution.ipynb) |
| 04 | [Model Evaluation & Cross-Validation](slides/04%20Model%20Evaluation%20and%20Cross-Validation.pdf) | [overfit, holdout lottery, metrics](demos/04.evaluation_cv_demo.ipynb) | [Lab 04](excercises/04.evaluation_cv_exercise.ipynb) | [✅](excercises/solutions/04.evaluation_cv_solution.ipynb) |
| 05 | [Regression Models](slides/05%20Regression%20Models.pdf) | [California housing shootout](demos/05.regression_demo.ipynb) | [Lab 05](excercises/05.regression_exercise.ipynb) | [✅](excercises/solutions/05.regression_solution.ipynb) |
| 06 | [Classification & Ensembles](slides/06%20Classification%20and%20Ensembles.pdf) | [logistic → trees → committees](demos/06.classification_ensembles_demo.ipynb) | [Lab 06](excercises/06.classification_ensembles_exercise.ipynb) | [✅](excercises/solutions/06.classification_ensembles_solution.ipynb) |
| 07 | [Unsupervised + Tuning](slides/07%20Unsupervised%20Learning%20and%20Hyperparameter%20Tuning.pdf) | [wine clusters + PCA + search](demos/07.clustering_tuning_demo.ipynb) | [Lab 07](excercises/07.clustering_tuning_exercise.ipynb) | [✅](excercises/solutions/07.clustering_tuning_solution.ipynb) |
| 08 | [Final Project: Churn](slides/08%20Final%20Project%20Customer%20Churn%20Prediction.pdf) | [instructor walkthrough](demos/08.final_project_demo.ipynb) | [🚀 starter](excercises/08.final_project_starter.ipynb) | [✅](excercises/solutions/08.final_project_solution.ipynb) |

Editable `.pptx` sources for every deck live in [`slides/`](slides/) next to the PDFs.

## How each session works (~2.5–3 h)

1. **Slides (~60 min)** — concepts in English, every number on them computed from real runs
2. **Demo notebook** — the exact slide code, runnable; section headers match slide numbers
3. **Lab (~60 min)** — Thai exercises in Colab: `# TODO` cells, hints, a challenge problem,
   and a "vibe coding corner" showing how to prompt AI assistants *and* verify their output

## Using the notebooks in Google Colab

1. Download the `.ipynb` file (or clone this repository)
2. Go to [colab.research.google.com](https://colab.research.google.com) → **File → Upload notebook**
3. **File → Save a copy in Drive** so your work is kept
4. Run cells top-to-bottom with `Shift+Enter`

Everything needed (`scikit-learn`, `pandas`, `seaborn`, `matplotlib`) is pre-installed in Colab —
no `pip install` required. All datasets load automatically (sklearn built-ins, seaborn, or a public URL).

## Datasets

| Dataset | Used in | Loads via |
|---|---|---|
| Iris, Wine, Breast Cancer, Diabetes | S01, S04, S06, S07 | `sklearn.datasets` (offline) |
| California Housing | S05 | `sklearn.datasets` (auto-download) |
| Titanic | S02, S03 | `seaborn.load_dataset` |
| Telco Customer Churn (7,043 × 19) | S08 project | public IBM GitHub URL (starter has a synthetic fallback) |

## The evaluation-first curriculum

Most courses teach models first and evaluation last. This course deliberately teaches
**how to measure honestly (Session 04) before opening the model zoo (Sessions 05–06)** —
students compare every model against a `DummyClassifier` baseline, on the same stratified folds,
with the metric that matches the business question, and touch the test set exactly once.

## AI-assistant ("vibe coding") policy

AI assistants are allowed **everywhere** — labs and the final project included — with two rules:

1. You must be able to explain every line you submit
2. Attach the prompts you used at the end of your notebook

Every lab ends with a *vibe coding corner*: a ready-to-use prompt plus the specific way an AI
assistant tends to fail on that topic (invented APIs, silent leakage, accuracy-worship on
imbalanced data).

## Assessment

| Component | Weight | Notes |
|---|---|---|
| Labs (8) | 40% | completion + honest attempts, not max scores |
| Final project | 40% | clean pipeline · honest evaluation · insight · 5-min talk (rubric in S08) |
| Participation | 20% | running demos along, asking questions |

## Repository layout

```
├── slides/            00–08 as .pptx (editable) + .pdf (distribute)
├── demos/             run-along notebooks for lecture use
├── assets/figures/    matplotlib concept figures embedded in the decks
│                      (overfitting, decision regions, KMeans, DBSCAN, PCA, …)
└── excercises/        Thai lab notebooks (students)
    └── solutions/     worked solutions (instructor)
```

## License

MIT — use, adapt, and redistribute freely for teaching.
