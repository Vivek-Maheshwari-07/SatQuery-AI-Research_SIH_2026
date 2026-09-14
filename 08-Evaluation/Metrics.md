# Mathematical Evaluation Metrics

This document defines the quantitative evaluation metrics used across SatQuery AI subtasks.

---

## 1. Visual Question Answering (VQA)

### Overall Accuracy (OA) & Average Accuracy (AA)
$$\text{OA} = \frac{\sum_{i=1}^{N} \mathbb{I}(y_i = \hat{y}_i)}{N}$$
$$\text{AA} = \frac{1}{C} \sum_{c=1}^{C} \text{Acc}_c$$
Where $\mathbb{I}(\cdot)$ is the indicator function, $N$ is total test questions, and $C$ is the number of question categories.

---

## 2. Visual Grounding & Object Detection

### Intersection over Union (IoU)
$$\text{IoU}(B_{gt}, B_{pred}) = \frac{\text{Area}(B_{gt} \cap B_{pred})}{\text{Area}(B_{gt} \cup B_{pred})}$$

### Mean Intersection over Union (mIoU) & Precision@0.5
- **mIoU**: Average IoU over all test grounding queries.
- **Precision@0.5**: Percentage of test queries where $\text{IoU}(B_{gt}, B_{pred}) \ge 0.50$.

---

## 3. Bi-Temporal Change Detection

### Precision, Recall, and F1-Score
$$\text{Precision} = \frac{TP}{TP + FP}, \quad \text{Recall} = \frac{TP}{TP + FN}$$
$$\text{F1-Score} = 2 \cdot \frac{\text{Precision} \cdot \text{Recall}}{\text{Precision} + \text{Recall}} = \frac{2 TP}{2 TP + FP + FN}$$

### Change IoU
$$\text{Change IoU} = \frac{TP}{TP + FP + FN}$$

---

## 4. Natural Language Captioning Metrics

- **BLEU-N (Bilingual Evaluation Understudy)**: Modified n-gram precision with brevity penalty.
- **METEOR**: Harmonic mean of precision and recall based on explicit word-to-word matches, stemming, and synonymy.
- **ROUGE-L**: Longest Common Subsequence (LCS) overlap.
- **CIDEr (Consensus-based Image Description Evaluation)**: Measures consensus between candidate sentence and reference sentences using Term Frequency-Inverse Document Frequency (TF-IDF) weighting.
