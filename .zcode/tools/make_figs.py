"""Generate concept figures (real sklearn fits) embedded in the course decks."""
import os
import numpy as np
import matplotlib as mpl
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris, load_breast_cancer, load_wine, fetch_california_housing, make_moons
from sklearn.decomposition import PCA
from sklearn.cluster import DBSCAN, KMeans
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.metrics import r2_score
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier, plot_tree

mpl.rcParams.update({
    "font.size": 11, "figure.facecolor": "white", "axes.facecolor": "white",
    "axes.edgecolor": "#CBD5E1", "axes.labelcolor": "#334155",
    "xtick.color": "#64748B", "ytick.color": "#64748B",
    "axes.titlecolor": "#1E293B", "axes.titlesize": 11.5, "axes.titleweight": "bold",
})
TEAL, TDARK, AMBER, ROSE, SLATE, INK = "#0D9488", "#115E59", "#F59E0B", "#E11D48", "#64748B", "#1E293B"
PAL3 = [TEAL, AMBER, ROSE]
OUT = r"D:/Repositories/AI_course_MasterDegree/assets/figures"
os.makedirs(OUT, exist_ok=True)


def save(fig, name):
    fig.savefig(f"{OUT}/{name}", dpi=200, facecolor="white")
    plt.close(fig)
    print("saved", name)


# ---------- 1 · overfit / good / underfit ----------
rng = np.random.RandomState(5)
X_all = np.sort(rng.rand(40, 1) * 2 - 1, axis=0)
y_all = np.sin(2.5 * np.pi * X_all[:, 0]) * 0.8 + rng.randn(40) * 0.22
Xtr, Xte, ytr, yte = train_test_split(X_all, y_all, test_size=0.35, random_state=1)
grid = np.linspace(-1.08, 1.08, 300).reshape(-1, 1)
fig, axes = plt.subplots(1, 3, figsize=(12.23, 3.67), sharey=True, constrained_layout=True)
for ax, deg, name in zip(axes, [1, 3, 15],
                         ["Underfitting — too simple", "Good fit — captures the trend", "Overfitting — chases every noise point"]):
    m = make_pipeline(PolynomialFeatures(deg), LinearRegression()).fit(Xtr, ytr)
    rtr, rte = m.score(Xtr, ytr), m.score(Xte, yte)
    ax.scatter(Xtr, ytr, s=26, color=SLATE, alpha=0.8, label="train (seen)")
    ax.scatter(Xte, yte, s=46, facecolors="none", edgecolors=SLATE, linewidths=1.5, label="test (held out)")
    ax.plot(grid, m.predict(grid), color=TEAL if deg == 3 else (SLATE if deg == 1 else ROSE), lw=2.4)
    ax.set_title(f"{name}\ndegree {deg}:  train R²={rtr:.2f} · test R²={rte:.2f}", fontsize=10.5,
                 color=ROSE if rte < 0 else INK)
    ax.set_xlabel("x")
axes[0].set_ylabel("y")
axes[1].legend(loc="lower center", bbox_to_anchor=(0.5, -0.32), ncol=2, frameon=False, fontsize=9.5)
save(fig, "img_overfit.png")

# ---------- 2 · KNN decision regions (iris) ----------
iris = load_iris()
Xi = iris.data[:, [2, 3]]
yi = iris.target
clf = KNeighborsClassifier(5).fit(Xi, yi)
x0, x1 = Xi[:, 0].min() - 0.8, Xi[:, 0].max() + 0.8
y0, y1 = Xi[:, 1].min() - 0.6, Xi[:, 1].max() + 0.6
xx, yy = np.meshgrid(np.linspace(x0, x1, 400), np.linspace(y0, y1, 400))
Z = clf.predict(np.c_[xx.ravel(), yy.ravel()]).reshape(xx.shape)
fig, ax = plt.subplots(figsize=(6.2, 4.7), constrained_layout=True)
ax.contourf(xx, yy, Z, levels=[-0.5, 0.5, 1.5, 2.5], colors=["#99F6E4", "#FDE68A", "#FECDD3"], alpha=0.55)
for k, (cname, c) in enumerate(zip(iris.target_names, PAL3)):
    ax.scatter(Xi[yi == k, 0], Xi[yi == k, 1], s=26, color=c, edgecolors="white", linewidths=0.6, label=cname)
ax.set_xlabel("petal length (cm)")
ax.set_ylabel("petal width (cm)")
ax.set_title("decision regions of KNN (k=5) — real fit on iris")
ax.legend(loc="lower right", frameon=True, framealpha=0.9, fontsize=9)
save(fig, "img_knn_boundary.png")

# ---------- 3 · scaling before/after (titanic) ----------
import seaborn as sns
df = sns.load_dataset("titanic")[["age", "fare"]].dropna()
std = StandardScaler().fit_transform(df.values)
fig, axes = plt.subplots(1, 2, figsize=(8.4, 4.3), constrained_layout=True)
axes[0].scatter(df["age"], df["fare"], s=22, color=TEAL, alpha=0.5)
axes[0].annotate("fare: £0–512", xy=(60, 480), fontsize=10, color="#B45309")
axes[0].annotate("age: 0–80 years", xy=(62, 40), fontsize=10, color="#0F766E")
axes[0].set_xlabel("age (years)")
axes[0].set_ylabel("fare (£)")
axes[0].set_title("raw scales — fare dwarfs age")
axes[1].scatter(std[:, 0], std[:, 1], s=22, color=TDARK, alpha=0.5)
axes[1].set_xlim(-3.2, 3.2)
axes[1].set_ylim(-3.2, 3.2)
axes[1].axhline(0, color="#CBD5E1", lw=0.8)
axes[1].axvline(0, color="#CBD5E1", lw=0.8)
axes[1].set_xlabel("age, standardized")
axes[1].set_ylabel("fare, standardized")
axes[1].set_title("after StandardScaler — equal footing")
save(fig, "img_scaling.png")

# ---------- 4 · decision boundaries 4-way (breast cancer) ----------
data = load_breast_cancer()
Xb = StandardScaler().fit_transform(data.data)[:, [0, 1]]  # mean radius, mean texture
yb = data.target
Xtr, Xte, ytr, yte = train_test_split(Xb, yb, test_size=0.25, stratify=yb, random_state=42)
models = [
    ("LogisticRegression", LogisticRegression(max_iter=2000)),
    ("DecisionTree (d=3)", DecisionTreeClassifier(max_depth=3, random_state=42)),
    ("KNN (k=5)", KNeighborsClassifier()),
    ("SVM (RBF)", SVC(random_state=42)),
]
bx0, bx1 = Xb[:, 0].min() - 0.6, Xb[:, 0].max() + 0.6
by0, by1 = Xb[:, 1].min() - 0.6, Xb[:, 1].max() + 0.6
xx, yy = np.meshgrid(np.linspace(bx0, bx1, 350), np.linspace(by0, by1, 350))
fig, axes = plt.subplots(1, 4, figsize=(12.23, 3.35), sharex=True, sharey=True, constrained_layout=True)
for ax, (name, m) in zip(axes, models):
    m.fit(Xtr, ytr)
    Z = m.predict(np.c_[xx.ravel(), yy.ravel()]).reshape(xx.shape)
    ax.contourf(xx, yy, Z, levels=[-0.5, 0.5, 1.5], colors=["#FECDD3", "#99F6E4"], alpha=0.5)
    ax.scatter(Xte[yte == 1, 0], Xte[yte == 1, 1], s=12, color=TEAL, edgecolors="white", linewidths=0.3)
    ax.scatter(Xte[yte == 0, 0], Xte[yte == 0, 1], s=12, color=ROSE, edgecolors="white", linewidths=0.3)
    ax.set_title(f"{name} — test acc {m.score(Xte, yte):.2f}", fontsize=10.5)
    ax.set_xlabel("mean radius (std)")
axes[0].set_ylabel("mean texture (std)")
save(fig, "img_boundaries.png")

# ---------- 5 · real depth-3 tree (plot_tree) ----------
Xc, yc = data.data, data.target
Ctr, Cte, yctr, ycte = train_test_split(Xc, yc, test_size=0.25, stratify=yc, random_state=42)
tree3 = DecisionTreeClassifier(max_depth=3, random_state=42).fit(Ctr, yctr)
fig, ax = plt.subplots(figsize=(11, 6), constrained_layout=True)
plot_tree(tree3, feature_names=data.feature_names, class_names=["malignant", "benign"],
          filled=True, rounded=True, impurity=False, fontsize=8, ax=ax)
save(fig, "img_tree.png")

# ---------- 6 · DBSCAN on moons ----------
Xm, _ = make_moons(n_samples=220, noise=0.07, random_state=42)
Xs = StandardScaler().fit_transform(Xm)
db = DBSCAN(eps=0.25, min_samples=5).fit(Xs)
labels = db.labels_
fig, ax = plt.subplots(figsize=(5.7, 4.2), constrained_layout=True)
for lab, c in [(0, TEAL), (1, AMBER)]:
    m = labels == lab
    ax.scatter(Xs[m, 0], Xs[m, 1], s=30, color=c, label=f"cluster {lab}")
noise = labels == -1
ax.scatter(Xs[noise, 0], Xs[noise, 1], s=52, marker="x", color=SLATE, label="noise (label −1)")
ci = db.core_sample_indices_[12]
cx, cy = Xs[ci]
ax.add_patch(plt.Circle((cx, cy), 0.25, fill=False, ls="--", lw=1.6, color=INK))
ax.annotate("eps: ≥5 neighbors inside\n→ core point, cluster grows",
            xy=(cx, cy), xytext=(cx + 0.45, cy - 1.05),
            arrowprops=dict(arrowstyle="->", color=INK), fontsize=9.5, color=INK)
ax.set_title("DBSCAN walks the density — KMeans would cut these moons in half", fontsize=10.5)
ax.legend(loc="upper center", bbox_to_anchor=(0.5, -0.09), ncol=3, frameon=False, fontsize=9)
save(fig, "img_dbscan.png")

# ---------- 7 · KMeans iteration in pictures (wine PCA-2D) ----------
Xw = StandardScaler().fit_transform(load_wine().data)
Z = PCA(n_components=2, random_state=42).fit_transform(Xw)
rng = np.random.RandomState(0)
c = Z[rng.choice(len(Z), 3, replace=False)]
path = [c.copy()]
for _ in range(10):
    lab = ((Z[:, None, :] - c[None]) ** 2).sum(-1).argmin(1)
    c = np.array([Z[lab == k].mean(0) for k in range(3)])
    path.append(c.copy())
path = np.array(path)
km = KMeans(3, n_init=10, random_state=42).fit(Z)
fig, axes = plt.subplots(1, 3, figsize=(12.23, 3.9), sharex=True, sharey=True, constrained_layout=True)
axes[0].scatter(Z[:, 0], Z[:, 1], s=20, color=SLATE, alpha=0.55)
axes[0].scatter(path[0][:, 0], path[0][:, 1], s=210, marker="X", color=ROSE, edgecolors=INK, linewidths=1.2)
axes[0].set_title("① random centroids (n_init = 10 tries)")
lab1 = ((Z[:, None, :] - path[0][None]) ** 2).sum(-1).argmin(1)
for k in range(3):
    axes[1].scatter(Z[lab1 == k, 0], Z[lab1 == k, 1], s=20, color=PAL3[k], alpha=0.7)
axes[1].scatter(path[0][:, 0], path[0][:, 1], s=210, marker="X", color=INK)
axes[1].set_title("② assign each point to nearest centroid")
for k in range(3):
    axes[2].scatter(Z[km.labels_ == k, 0], Z[km.labels_ == k, 1], s=20, color=PAL3[k], alpha=0.7)
for k in range(3):
    axes[2].plot(path[:, k, 0], path[:, k, 1], "-", color="#94A3B8", lw=1.1, alpha=0.8)
axes[2].scatter(km.cluster_centers_[:, 0], km.cluster_centers_[:, 1], s=210, marker="X", color=INK)
axes[2].set_title("③ update centroids → repeat until stable")
for ax in axes:
    ax.set_xlabel("PC1")
axes[0].set_ylabel("PC2")
save(fig, "img_kmeans_fit.png")

# ---------- 8 · PCA real scatter (wine, colored by cluster) ----------
fig, ax = plt.subplots(figsize=(6.4, 4.3), constrained_layout=True)
for k in range(3):
    ax.scatter(Z[km.labels_ == k, 0], Z[km.labels_ == k, 1], s=32, color=PAL3[k], alpha=0.8,
               edgecolors="white", linewidths=0.5, label=f"cluster {k}")
ax.scatter(km.cluster_centers_[:, 0], km.cluster_centers_[:, 1], s=200, marker="X", color=INK, label="centroid")
ax.set_xlabel("PC1 — 36.2% of variance")
ax.set_ylabel("PC2 — 19.2% of variance")
ax.set_title("wine in 2-D — colored by KMeans (true labels never used)")
ax.legend(loc="lower right", frameon=True, framealpha=0.9, fontsize=9)
save(fig, "img_pca_real.png")

# ---------- 9 · linear regression fit + residuals (california) ----------
d = fetch_california_housing()
Xf, yf = d.data[:, 0:1], d.target
lin = LinearRegression().fit(Xf, yf)
rng = np.random.RandomState(3)
idx = rng.choice(len(Xf), 400, replace=False)
fig, ax = plt.subplots(figsize=(5.8, 4.2), constrained_layout=True)
ax.scatter(Xf[idx, 0], yf[idx], s=20, color=TEAL, alpha=0.45)
xg = np.linspace(0, 13, 50).reshape(-1, 1)
ax.plot(xg, lin.predict(xg), color=AMBER, lw=2.6)
for i in idx[:8]:
    yhat = lin.predict(Xf[[i]])[0]
    ax.plot([Xf[i, 0]] * 2, [yf[i], yhat], ls="--", lw=1.2, color=SLATE)
res_i = idx[3]
ax.annotate("residual = the miss\n(training minimizes Σ miss²)",
            xy=(Xf[res_i, 0], yf[res_i]), xytext=(2.2, 4.35),
            arrowprops=dict(arrowstyle="->", color=INK), fontsize=9.5, color=INK)
ax.set_xlabel("median income (×$10k)")
ax.set_ylabel("house value (×$100k)")
ax.set_title("LinearRegression: draw the line that misses least")
save(fig, "img_linfit.png")

print("ALL FIGURES DONE")
