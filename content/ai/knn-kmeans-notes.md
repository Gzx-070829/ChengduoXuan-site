---
title: K-Means和KNN
date: 2026-03-16
summary: 关于K-Means和KNN的一次系统实践
---

# 人工智能 学习笔记  
## 聚类与分类：K-Means 与 KNN
 
> 主题包括：**无监督学习中的 K-Means 聚类**、**有监督学习中的 KNN 分类**、**距离度量的作用**、**模型评估与调参**。

---

## 1. 这次实验课讲了什么？

这次实验课主要讲了两类最基础、最经典的机器学习方法：

- **K-Means 聚类**：一种**无监督学习**方法  
  它不需要提前知道样本标签，只根据“样本之间像不像”把数据自动分组。

- **KNN 分类（K-Nearest Neighbors）**：一种**有监督学习**方法  
  它需要已标注的数据，遇到一个新样本时，就看它“附近的邻居”大多数属于哪一类，再把它分到那一类。

这两个实验的共同核心，其实都是一句话：

> **机器学习很多时候是在比较“距离”。谁更近，谁更像。**

---

## 2. 本次实验的目标

根据实验课内容，这次实验主要想让我们理解以下几点：

1. 对比**无监督学习**和**有监督学习**的区别  
2. 理解“**距离**”在聚类和分类中的作用  
3. 使用 `sklearn` 训练简单模型  
4. 使用 `matplotlib` 做数据可视化  
5. 体验模型训练、评估、调参的基本流程  

---

## 3. 实验环境说明

课件中给出的实验环境包括：

- 操作系统：Ubuntu 24.04 LTS
- 编程语言：Python 3.10+
- 编程环境：VSCode、Anaconda
- Python 库：
  - Scikit-Learn
  - Matplotlib
  - PyTorch

### 常见环境命令

```bash
conda create -n py310 python==3.10
conda activate py310
pip install scikit-learn matplotlib
```

---

## 4. 先理解：什么是聚类？什么是分类？

### 4.1 聚类（Clustering）

聚类就是：

> **不给答案，让机器自己把相似的数据分成几堆。**

比如给机器一堆点，它不知道哪些点属于哪一类，但它会根据位置远近，把靠得近的点分为同一组。

这属于**无监督学习**。

### 4.2 分类（Classification）

分类就是：

> **先给机器看带标签的数据，再让它判断新的样本属于哪一类。**

比如我们已经知道一些手写数字图片的标签是 0、1、2、3……  
然后给它一张新图片，让模型判断这张图是几。

这属于**有监督学习**。

---

## 5. 实验一：K-Means 聚类

---

## 5.1 K-Means 的核心思想

K-Means 的目标是：

> 让**同一类内部尽量相似**，让**不同类之间尽量不同**。

更直白地说：

1. 先假设要分成 K 类
2. 随机找 K 个点当“中心”
3. 每个样本都分配给最近的中心
4. 再重新计算每一类的中心
5. 不断重复，直到中心基本不再变化

这就是课件里提到的流程：

- 输入样本数据
- 确定类别数目 K
- 初始化聚类中心
- 样本类别分配
- 更新聚类中心
- 判断是否收敛

---

## 5.2 为什么 K-Means 叫“Means”？

因为每一类的中心，是这一类所有样本的**均值（mean）**。

例如二维平面上，一类里有很多点，新的中心点就是这些点的平均位置。

---

## 5.3 K-Means 中最关键的参数

课件中给出了 `sklearn.cluster.KMeans` 的常见参数，重点要看这几个：

### `n_clusters`
表示要分成几类，也就是 K 的值。

### `init`
聚类中心的初始化方式：

- `random`：随机选初始中心
- `k-means++`：更聪明地选初始中心，通常更稳定

### `n_init`
重复运行多少次，再选最好的结果。  
因为初始中心不同，结果可能不同，所以多跑几次更稳。

### `random_state`
随机种子。  
如果想让结果可重复，就固定它。

---

## 5.4 K-Means 训练后可以看到什么？

训练完成后，常见的重要属性有：

### `cluster_centers_`
每一类的聚类中心

### `labels_`
每个样本最终被分到了哪一类

### `inertia_`
所有样本到最近聚类中心的平方距离和

这个值可以理解为：

> **类内的紧凑程度**

通常越小越好，但也不能只看这个值，因为 K 变大时它通常会自然变小。

### `n_iter_`
算法实际迭代了多少轮

---

## 5.5 一个最基础的 K-Means 示例代码

```python
import matplotlib.pyplot as plt
from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans

# 1. 生成样本点
X, _ = make_blobs(
    n_samples=300,
    centers=4,
    cluster_std=0.8,
    random_state=42
)

# 2. 建立模型
model = KMeans(
    n_clusters=4,
    init="k-means++",
    n_init=10,
    random_state=42
)

# 3. 训练模型
model.fit(X)

# 4. 获取结果
labels = model.labels_
centers = model.cluster_centers_

# 5. 可视化
plt.scatter(X[:, 0], X[:, 1], c=labels)
plt.scatter(centers[:, 0], centers[:, 1], marker="x", s=200)
plt.title("K-Means Clustering")
plt.show()
```

---

## 5.6 这段代码该怎么理解？

### `make_blobs(...)`
用于生成模拟数据点。  
这些点本来就分布在几个团块附近，很适合拿来演示聚类。

### `KMeans(...)`
创建 K-Means 模型对象。

### `fit(X)`
让模型学习数据，完成聚类。

### `model.labels_`
表示每个点被分到了哪一类。

### `model.cluster_centers_`
表示最终找到的聚类中心。

### `plt.scatter(...)`
把样本点和中心点画出来，便于观察结果。

---

## 5.7 K 值不同，会发生什么？

课件专门比较了：

> **不同类别数目 K 的影响**

这非常重要。

### K 太小
本来应该分开的几群数据，可能会被硬挤成一类。  
这会导致分类太粗。

### K 太大
本来属于同一类的数据，可能被强行拆开。  
这会导致分类太碎。

所以 K 不能乱设。  
真实任务里，常常需要多试几个 K，再结合图像结果或者评价指标来选。

---

## 5.8 初始值不同，为什么结果会不一样？

课件中还比较了：

> **不同初始值的影响（random_state=None）**

这是因为 K-Means 一开始要先猜 K 个中心。  
如果一开始猜得不好，后面就可能收敛到一个不太理想的结果。

所以：

- `k-means++` 比 `random` 更稳
- 多设置几次 `n_init` 更稳
- 固定 `random_state` 更方便复现

---

## 5.9 K-Means 的本质理解

K-Means 真正做的事可以概括成一句话：

> **反复让“点”找最近的中心，让“中心”回到这类点的平均位置。**

直到变化很小，算法就停下来。

这也是为什么“距离”是 K-Means 的核心。

---

## 6. 实验二：KNN 分类

---

## 6.1 KNN 的核心思想

KNN（K-Nearest Neighbors，K 近邻）特别直观：

> 看一个新样本周围最近的 K 个邻居是谁，邻居大多数属于哪一类，就把它判成哪一类。

比如：

- 新点附近有 5 个已知样本
- 其中 3 个是红色类，2 个是蓝色类
- 那就把新点判为红色类

这就是“少数服从多数”。

---

## 6.2 KNN 为什么属于有监督学习？

因为它需要提前知道训练数据的标签。  
也就是说，模型不是自己分组，而是根据已有答案去推断新样本的类别。

---

## 6.3 KNN 的工作流程

课件中的逻辑可以整理为：

1. 收集带标签的数据
2. 给定一个测试样本
3. 计算测试样本与所有训练样本的距离
4. 找出最近的 K 个样本
5. 统计这 K 个邻居的类别
6. 采用投票法决定输出类别
7. 在测试集上评估性能

---

## 6.4 KNN 中最重要的参数

课件给出了 `sklearn.neighbors.KNeighborsClassifier`，重点参数如下：

### `n_neighbors`
近邻数 K。  
也就是要看多少个最近邻居。

### `algorithm`
查找近邻的方式，如：

- `auto`
- `brute`
- `kd_tree`
- `ball_tree`

对于初学阶段，可以先不用深究，知道它和“找邻居的效率”有关就行。

### `metric`
距离度量方式。  
默认常见的是 Minkowski 距离。

### `p`
当 `metric='minkowski'` 时，`p` 控制具体是哪一种距离：

- `p = 1`：曼哈顿距离
- `p = 2`：欧氏距离
- `p → ∞`：切比雪夫距离

---

## 6.5 这些距离到底是什么意思？

### 曼哈顿距离（p=1）
像在城市街区里走路，只能横着走、竖着走。

### 欧氏距离（p=2）
就是最常见的“直线距离”。

### 切比雪夫距离（p→∞）
看各个维度上最大的一步差距。

### 为什么距离这么重要？
因为 KNN 的本质就是：

> **谁离测试样本更近，谁就更有发言权。**

如果距离定义变了，“谁更近”这个判断也会变，所以分类结果也会变化。

---

## 6.6 一个基础的 KNN 分类示例

```python
import matplotlib.pyplot as plt
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, classification_report

# 1. 生成分类数据
X, y = make_classification(
    n_samples=300,
    n_features=2,
    n_redundant=0,
    n_informative=2,
    n_clusters_per_class=1,
    random_state=42
)

# 2. 划分训练集和测试集
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 3. 建立模型
model = KNeighborsClassifier(n_neighbors=5, p=2)

# 4. 训练
model.fit(X_train, y_train)

# 5. 预测
y_pred = model.predict(X_test)

# 6. 评估
print("准确率：", accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred))
```

---

## 6.7 这段代码该怎么理解？

### `make_classification(...)`
生成一个适合分类演示的数据集。

### `train_test_split(...)`
把数据分成训练集和测试集。  
训练集用于学习，测试集用于检查模型效果。

### `KNeighborsClassifier(...)`
建立 KNN 分类器。

### `fit(X_train, y_train)`
让模型记住训练数据。

注意：  
KNN 并不像一些模型那样真正“学出一个复杂公式”，它更像是：

> **把训练样本存起来，预测时再去查最近邻。**

### `predict(X_test)`
对测试集做分类预测。

### `accuracy_score(...)`
计算准确率。

### `classification_report(...)`
输出更详细的分类指标。

---

## 6.8 混淆矩阵是什么？

课件中给出了一个 2×2 的混淆矩阵，并计算了 Accuracy、Precision、Recall、F1。

混淆矩阵本质上是在统计：

- 真实是正类，预测也是正类：**TP**
- 真实是负类，预测成正类：**FP**
- 真实是负类，预测也是负类：**TN**
- 真实是正类，预测成负类：**FN**

它能帮助我们更细致地看模型哪里分对了，哪里分错了。

---

## 6.9 常见评价指标解释

### 1）Accuracy（准确率）

```text
Accuracy = (TP + TN) / (TP + TN + FP + FN)
```

表示：

> **总共预测对了多少比例**

适合类别比较均衡时看整体效果。

---

### 2）Precision（查准率）

```text
Precision = TP / (TP + FP)
```

表示：

> **被模型判为正类的样本里，真正是正类的比例**

如果你很在意“别误报太多”，这个指标很重要。

---

### 3）Recall（召回率）

```text
Recall = TP / (TP + FN)
```

表示：

> **真实的正类里，被成功找出来的比例**

如果你很在意“别漏掉重要样本”，召回率就很重要。

---

### 4）F1-Score

```text
F1 = 2 * Precision * Recall / (Precision + Recall)
```

它综合考虑 Precision 和 Recall。

---

## 6.10 交叉验证是什么？

课件中还介绍了：

> **Cross Validation（交叉验证）**

比如 5 折交叉验证（KFold(5)）：

1. 把训练数据分成 5 份
2. 每次拿 1 份做验证，另外 4 份做训练
3. 共重复 5 次
4. 最后看平均表现

这样做的好处是：

- 评估更稳定
- 不容易因为某一次划分太巧合而误判模型好坏

---

## 6.11 K 值太小和太大分别会怎样？

课件强调：

> **K 过小容易过拟合，K 过大容易欠拟合**

### K 太小
模型会非常敏感，容易被局部噪声影响。  
比如 K=1 时，附近一个异常点就可能把结果带偏。

### K 太大
模型会太“迟钝”，把原本清晰的边界抹平。  
不同类别之间容易被混在一起。

所以 K 的选择非常关键。

---

## 6.12 决策边界是什么？

课件里展示了“不同 K 值对应的决策边界”。

所谓**决策边界**，就是：

> 模型把平面切成不同区域，每个区域都预测为某一类。

如果 K 很小，边界会很曲折，很复杂；  
如果 K 很大，边界会更平滑。

这正好体现了过拟合和欠拟合的区别。

---

## 7. 本次上机实验任务：手写数字 KNN 分类

课件最后给出的上机任务是：

1. 使用 `sklearn.datasets.load_digits()` 加载手写数字数据集
2. 了解数据集特点
3. 按 **8:2** 划分训练集和测试集
4. 在训练集上使用 `GridSearchCV`
5. 通过 **3 折交叉验证**搜索最优参数
6. 搜索范围：
   - `K: [1, 10]`
   - `p: [1, 3]`
7. 用最优参数在测试集上评估结果并输出

---

## 8. 为什么这道上机题很重要？

因为它把前面学到的知识串起来了：

- **数据集加载**
- **训练集 / 测试集划分**
- **KNN 建模**
- **参数调优**
- **交叉验证**
- **最终评估**

它已经很像一个完整的小型机器学习任务了。

---

## 9. 上机实验参考代码（含注释）

下面这份代码，就是这次实验任务的一个标准实现版本，并且我加上了适合理解的注释。

```python
import matplotlib.pyplot as plt
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import classification_report, accuracy_score

def show_samples(digits, labels):
    plt.figure(figsize=(8, 4))
    for i in range(8):
        plt.subplot(2, 4, i + 1)
        plt.imshow(digits[i], cmap="gray")
        plt.title(f"Label: {labels[i]}")
        plt.axis("off")
    plt.suptitle("Digits Dataset Samples")
    plt.tight_layout()
    plt.show()

def main():
    # 1. 加载数据集
    digits = load_digits()
    X = digits.data      # 每张图片拉平成一个向量
    y = digits.target    # 每张图片对应的数字标签

    print("数据集形状：", X.shape)
    print("标签形状：", y.shape)

    # 2. 可视化部分样本
    show_samples(digits.images, y)

    # 3. 划分训练集和测试集（8:2）
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # 4. 定义参数搜索范围
    param_grid = {
        "n_neighbors": list(range(1, 11)),
        "p": [1, 2, 3]
    }

    # 5. 建立 KNN 模型
    knn = KNeighborsClassifier()

    # 6. 使用 3 折交叉验证进行网格搜索
    grid = GridSearchCV(knn, param_grid, cv=3)
    grid.fit(X_train, y_train)

    print("最佳参数：", grid.best_params_)

    # 7. 取出最佳模型
    best_model = grid.best_estimator_

    # 8. 在测试集上预测
    y_pred = best_model.predict(X_test)

    # 9. 输出评估结果
    print("测试集准确率：", accuracy_score(y_test, y_pred))
    print("分类报告：")
    print(classification_report(y_test, y_pred))

if __name__ == "__main__":
    main()
```

---

## 10. 这份代码每一步在干什么？

### `load_digits()`
加载 sklearn 自带的手写数字数据集。  
这个数据集里的每张图片都比较小，适合入门实验。

### `digits.data`
把每张图像拉平成一维向量。  
因为很多机器学习模型输入的是“特征向量”，不是直接输入图片对象。

### `digits.target`
存放每张图片真实对应的数字标签。

### `train_test_split(...)`
把数据拆成训练集和测试集。  
训练集负责“学”，测试集负责“验收”。

### `param_grid`
指定要搜索的参数组合：

- `n_neighbors` 从 1 到 10
- `p` 从 1 到 3

也就是说模型会尝试很多种 K 和距离定义。

### `GridSearchCV(...)`
自动枚举所有参数组合，并且用交叉验证比较哪组更好。

### `grid.best_params_`
输出效果最好的参数组合。

### `grid.best_estimator_`
拿到最佳模型。

### `classification_report(...)`
输出每个类别的 precision、recall、f1-score。

---

## 11. 这个实验背后的真正收获

这次实验表面上是在学两个模型，但更重要的是理解了下面这些机器学习思想：

### 1）无监督 vs 有监督
- K-Means：没有标签，自己分组
- KNN：有标签，按邻居投票分类

### 2）距离很重要
无论聚类还是 KNN，本质都离不开“谁离谁近”。

### 3）参数会显著影响结果
- K-Means 的 K 值、初始化方式
- KNN 的近邻数 K、距离度量方式

### 4）不能只训练，还要评估
模型不是跑出来就完事，还要通过：
- 测试集
- 混淆矩阵
- 准确率
- 召回率
- F1
来判断模型到底靠不靠谱。

### 5）调参是机器学习的重要步骤
不是随便设个参数就结束，而是要系统地搜索和比较。

---

## 12. 我对这次实验的个人理解

如果让我用自己的话总结这次实验，我会这样说：

> 这次实验让我第一次比较完整地接触了“机器学习怎么处理数据”。  
> K-Means 告诉我，在没有标签时，机器也可以根据相似性自动把数据分组；  
> KNN 告诉我，在有标签时，机器可以根据邻居的分布来判断新样本属于哪一类。  
> 这两个方法虽然简单，但都让我清楚感受到：  
> **机器学习并不是神秘地“懂了”，而是通过数据之间的关系，尤其是距离关系，做出判断。**


## 13. 最后总结

这次实验并不追求复杂模型，而是想让我们真正理解：

- 什么是聚类，什么是分类
- 什么是无监督学习，什么是有监督学习
- 为什么“距离”会成为模型判断的依据
- 为什么参数不同，结果会不同
- 为什么模型需要评估和调优

对于机器学习初学者来说，这其实是非常关键的一课。  
因为后面很多更复杂的算法，底层思路都和这些基础概念有关。

---

## 14. 后续可以继续深入什么？

学完这一课后，可以继续深入：

1. 学会自己画 **K-Means 聚类图**
2. 学会画 **KNN 决策边界**
3. 学会读 **混淆矩阵**
4. 理解 **过拟合 / 欠拟合**
5. 尝试用别的数据集重复这个流程
6. 进一步学习逻辑回归、决策树、SVM、神经网络

---
* 文案撰稿采取了部分AI辅助和自我的一些心得的纳入（若有补充，欢迎feedback，我将会根据学习情况更新往日内容） 