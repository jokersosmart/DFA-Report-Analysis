# 參考文件詳細分析報告

## 一、Excel References Sheet 列出的參考文件清單

根據 Excel 的 References sheet，本 DFA 報告引用了以下 8 份標準文件：

| 編號 | 文件名稱 | 版本/年份 | 在本 Excel 中的角色 |
|------|--------|---------|---------------|
| 1 | ISO 26262-1:2018 | 2nd Ed. | 術語與定義的來源 |
| 2 | ISO 26262-5:2018 | 2nd Ed. | 硬體層級產品開發、SPFM/LFM/PMHF 指標定義 |
| 3 | ISO 26262-9:2018 | 2nd Ed. | 相依故障分析的要求（第7章完整收錄於 Excel） |
| 4 | ISO 26262-10:2018 | 2nd Ed. | DFA 方法論指引（Annex A.3.6 切割集分析） |
| 5 | ISO 26262-11:2018 | 1st Ed. | 半導體 DFA 指引（核心方法論，DFA 流程 B1-B12） |
| 6 | IEC 61508 Ed. 2 | 2010 | β-factor 計算方法（Annex D）用於 CCF 量化 |
| 7 | IEC TR 62380:2004 | 2004 | 可靠度預測手冊（電子元件故障率模型） |
| 8 | DIN EN 60812 / IEC 60812 | 2006/2018 | FMEA 分析方法 |

---

## 二、ISO 26262-11:2018 — 半導體功能安全指引（核心參考）

### 2.1 文件概述
ISO 26262-11 是 ISO 26262 系列的第 11 部分，專門針對半導體元件的功能安全提供指引。這是 2018 年第二版新增的部分，因為半導體（IC）有其獨特的特性，如：無維護需求、無除役需求、晶片內部元件高度耦合等。

### 2.2 第 4.7 節：半導體相依故障分析（Semiconductor DFA）

**4.7.1 DFA 簡介**: DFA 的目標是識別和分析可能的共因故障（CCF）和級聯故障（Cascading Failure），評估其違反安全目標的風險，並定義安全措施來降低風險。DFA 的範圍是矽晶片內部的硬體元件之間、以及硬體與軟體元件之間的相依故障。

**4.7.2 DFA 與安全分析的關係**: DFA 相關的元件可從 ISO 26262-5:2018 第 7.4.3 節的安全分析中識別，包括雙點故障場景（功能及其安全機制、功能冗餘）和單點故障場景（共享基礎設施如時脈生成、內嵌電壓調節器）。

**4.7.3 相依故障場景**: Figure 20 展示了 DFI（Dependent Failure Initiator）的特徵化，包括：
- 耦合機制（Coupling Mechanism）：傳導耦合、近場耦合（電容/電感）、機械耦合、輻射耦合
- 傳播介質（Propagation Medium）：信號線、時脈網路、電源網路、基板、封裝、空氣
- 局部性（Locality）：影響單一元件或多個元件
- 時序（Timing）：傳播延遲、週期性

**4.7.4 級聯故障與共因故障的區別**: 在半導體中，兩者的精確區分並不總是可能或有用的。如果 DFA 的焦點是證明免干擾（freedom from interference），可以用以下方法：識別 Element A 可能影響 Element B 的故障模式 → 評估是否違反安全目標 → 定義安全措施 → 反向重複分析。

**4.7.5 DFI 分類與緩解措施**: DFI 分為 7 類（對應 Excel 的 DFI examples sheet）：
1. 共享資源故障（Failure of shared resources）
2. 單一物理根因（Single physical root cause）
3. 環境故障（Environmental faults）
4. 開發故障（Development faults）
5. 製造故障（Manufacturing faults）
6. 安裝故障（Installation faults）
7. 操作與維護故障（Operation and maintenance faults）

**4.7.6 DFA 工作流程 B1-B12**: 即 Figure 23（已在圖片分析中完整記錄為 ASCII 流程圖）。

### 2.3 與本 Excel 的直接關聯

| Excel Sheet | 對應 ISO 26262-11 章節 | 關聯說明 |
|------------|---------------------|---------|
| Flowchart | §4.7.6 (Figure 23) | 完整收錄 DFA 工作流程 |
| DFI examples | §4.7.5.1 (Table 21-26) | 收錄 7 類 DFI 的範例清單 |
| Block based Analysis | §4.7.6.1-4.7.6.2 | 基於功能區塊的 DFI 識別 |
| Cut Set based Analysis | §4.7.5.2 + ISO 26262-10 A.3.6 | 基於切割集的 CCF 評估 |
| Definitions | §4.7.3-4.7.4 | 收錄相依故障的定義與圖示 |

---

## 三、ISO 26262-9:2018 第 7 章 — 相依故障分析（完整收錄於 Excel）

### 3.1 文件概述
ISO 26262-9 是 ASIL 導向和安全導向分析的要求。第 7 章專門定義了相依故障分析的目標、要求和方法。本 Excel 的 "ISO 26262-9 CH.7" sheet 完整收錄了此章節的原文。

### 3.2 關鍵要求
- **7.1 目標**: 確認所需的獨立性或免干擾性不被相依故障違反
- **7.2 一般要求**: 在架構設計階段進行 DFA，識別可能的 CCF 和級聯故障
- **7.4.2.3 方法**: 本 Excel Methodology sheet 引用此條款，定義了 DFA 的具體方法

### 3.3 與本 Excel 的直接關聯
"ISO 26262-9 CH.7" sheet 完整收錄了此章節，作為 DFA 分析的法規依據。Methodology sheet 引用 §7.4.2.3 作為方法論基礎。

---

## 四、ISO 26262-5:2018 — 硬體層級產品開發

### 4.1 文件概述
ISO 26262-5 定義了硬體層級的產品開發要求，包括硬體安全指標（SPFM、LFM、PMHF）的計算方法。

### 4.2 關鍵概念
- **SPFM（Single-Point Fault Metric）**: 單點故障指標，衡量安全機制對單點故障的覆蓋率
- **LFM（Latent Fault Metric）**: 潛伏故障指標，衡量安全機制對潛伏故障的覆蓋率
- **PMHF（Probabilistic Metric for random Hardware Failures）**: 隨機硬體故障的概率指標

### 4.3 與本 Excel 的直接關聯
CCF Calc. On-Chip Red. 和 CCF Calc. Logic 計算的 β 因子直接影響 SPFM、LFM、PMHF 的計算。DFA 流程圖中的 B5 和 B9 步驟明確指出要將可量化的 DFI 和安全措施納入這些指標的估算中。

---

## 五、ISO 26262-10:2018 — 功能安全指引

### 5.1 文件概述
ISO 26262-10 提供了功能安全分析的指引，包括 FMEA、FTA、ETA 等方法的應用指南。

### 5.2 Annex A.3.6 — 切割集分析
此附錄定義了切割集（Cut Set）分析方法，是 "Cut Set based Analysis" sheet 的方法論基礎。切割集是 FTA 的輸出，代表導致頂事件（安全目標違反）的最小事件組合。

### 5.3 與本 Excel 的直接關聯
Cut Set based Analysis sheet 使用 CCCI（Common Cause Criticality Index）來評估每個切割集的共因故障潛力，此方法源自 ISO 26262-10 Annex A.3.6。

---

## 六、IEC 61508 Ed. 2 (2010) — 功能安全基礎標準

### 6.1 文件概述
IEC 61508 是所有功能安全標準的「母標準」，ISO 26262 即衍生自此標準。Part 6 Annex D 提供了 β-factor 計算方法。

### 6.2 Annex D — β-factor 計算方法
Annex D 定義了一套評分系統來估算共因故障的 β 因子：

**Table D.1**: 評估項目及其 X/Y 分數（8 大類，約 30 個子項目）
- Separation/Segregation（分離/隔離）
- Diversity/Redundancy（多樣性/冗餘）
- Complexity/Design/Application/Maturity/Experience（複雜度等）
- Assessment/Analysis and Feedback（評估/分析）
- Procedures/Human Interface（程序/人機介面）
- Competence/Training/Safety Culture（能力/培訓）
- Environmental Control（環境控制）
- Environmental Testing（環境測試）

**Table D.2**: Z 值（可程式電子元件），基於診斷覆蓋率和測試間隔
**Table D.3**: Z 值（感測器或最終元件），基於診斷覆蓋率和測試間隔
**Table D.4**: Score S/SD 對應的 β/βD 值

**計算公式**:
- Score S = Σx + Σy（基本分數）
- Score SD = Σx × (z+1) + Σy（考慮診斷後的分數）
- β 和 βD 由 Score 查 Table D.4 得出

### 6.3 與本 Excel 的直接關聯

| Excel Sheet | IEC 61508 對應 | 說明 |
|------------|--------------|------|
| CCF Calc. Logic | Annex D Table D.1-D.4 | 完整實現 β-factor 評分系統 |
| CCF Calc. On-Chip Red. | Annex D 延伸（晶片內冗餘） | 針對 IC 內部冗餘的 β 因子調整 |

---

## 七、IEC TR 62380:2004 — 可靠度預測手冊

### 7.1 文件概述
IEC TR 62380 提供了電子元件、PCB 和設備的可靠度預測通用模型。它定義了基於環境條件、溫度、電壓應力等因素的故障率計算方法。

### 7.2 關鍵內容
- 提供各類電子元件（電阻、電容、IC、連接器等）的基礎故障率
- 定義了溫度加速因子、電壓應力因子等修正係數
- 提供了 PCB 和設備層級的故障率預測方法

### 7.3 與本 Excel 的直接關聯
IEC TR 62380 的故障率數據是 DFA 定量分析的輸入之一。β 因子乘以元件故障率即得到共因故障率，用於計算 PMHF 等指標。

---

## 八、DIN EN 60812 / IEC 60812 — FMEA 分析方法

### 8.1 文件概述
IEC 60812 定義了 FMEA（Failure Mode and Effects Analysis，故障模式與影響分析）的系統性方法。

### 8.2 關鍵內容
- 定義了 FMEA 的步驟：系統定義 → 故障模式識別 → 影響分析 → 嚴重度/發生率/偵測度評估 → 風險優先數（RPN）計算
- 提供了 FMEA 表格的標準格式

### 8.3 與本 Excel 的直接關聯
FMEA 是 DFA 的前置分析之一。Cut Set based Analysis 的切割集來自 FTA/FMEA 的輸出。DFA 流程中的 B10 步驟（有效性評估）也可使用 FMEA 作為驗證方法。

---

## 九、SN 29500 — Siemens 故障率標準（Excel 中未直接列出但相關）

### 9.1 文件概述
SN 29500 是 Siemens 制定的元件故障率數據標準，提供了各類電子元件在參考條件下的故障率數據和應力模型。

### 9.2 與本 Excel 的關聯
作為 IEC TR 62380 的替代或補充故障率數據來源，可用於 DFA 的定量分析。

---

## 十、IEC 61709 — 電子元件可靠度參考條件（Excel 中未直接列出但相關）

### 10.1 文件概述
IEC 61709 定義了電子元件可靠度數據的參考條件和應力模型。

### 10.2 與本 Excel 的關聯
提供了將故障率數據從參考條件轉換到實際使用條件的方法，是 β 因子計算中環境因素考量的基礎。
