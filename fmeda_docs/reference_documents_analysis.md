# FMEDA 報告參考文件詳細分析

## 參考文件清單

FMEDA 報告的 References sheet 列出了 8 份核心參考文件：

| Ref. No | 文件名稱 | 與 FMEDA 的關聯 |
|---------|----------|----------------|
| 1 | IEC TR 62380 (2004, withdrawn) | 失效率預測模型的數學基礎 |
| 2 | DIN EN 61709 (IEC 61709:2011) | 元件失效率參考條件與應力模型 |
| 3 | ISO 26262:2011 | 功能安全標準（舊版） |
| 4 | ISO 26262:2018 | 功能安全標準（現行版） |
| 5 | SN 29500 (2004-2010) | 元件失效率數據 |
| 6 | IEC 61508 Ed. 2.0 (2010) | 電氣/電子安全系統功能安全 |
| 7 | IEC 61709 Ed. 3.0 (2017) | 元件可靠度參考條件（新版） |
| 8 | N2N90008 FMEDA Tool Evaluation Report.pdf | FMEDA 工具驗證報告 |

---

## 1. IEC TR 62380 -- 可靠度數據手冊

### 1.1 文件概述

IEC TR 62380 是一份技術報告（Technical Report），提供了電子元件、PCB 和設備的可靠度預測通用模型。雖然已被撤回（withdrawn），但其數學模型仍被廣泛使用。

### 1.2 與 FMEDA 的關聯

**FailureRateCalc sheet 的核心公式直接基於此文件**：

```
lambda = (lambda_base * N_transistors * EXP(-0.35 * years) + (N_sram * lambda_sram)) * Q_factor
```

此公式的各項參數定義均來自 IEC TR 62380：
- `lambda_base`：基礎失效率，依元件類型查表
- `N_transistors`：電晶體數量，反映 IC 複雜度
- `EXP(-0.35 * years)`：技術成熟度衰減因子
- `Q_factor`：品質因子

### 1.3 為什麼使用已撤回的標準

IEC TR 62380 雖已撤回，但其替代標準 IEC 62380 並未提供完全等效的半導體失效率預測模型。在半導體產業中，此模型仍是最廣泛接受的失效率預測方法之一，特別是在 FMEDA 分析中。

---

## 2. IEC 61709 -- 元件可靠度參考條件

### 2.1 文件概述

IEC 61709 定義了電子元件失效率的參考條件和應力模型轉換方法。FMEDA 報告同時引用了 2011 版（Ref.2）和 2017 版（Ref.7）。

### 2.2 與 FMEDA 的關聯

- **FailureRateCalc sheet**：提供不同環境條件下的失效率轉換公式
- **BlockList sheet**：元件的環境應力因子定義
- **SRAM Tran FIT sheet**：SRAM 記憶體的特殊失效率模型

### 2.3 關鍵概念

IEC 61709 定義了「參考條件」（Reference Conditions），即在標準溫度（40C）、標準電壓下的失效率。當實際使用條件不同時，需要用應力模型進行轉換。

---

## 3. ISO 26262:2011 與 ISO 26262:2018 -- 功能安全標準

### 3.1 文件概述

ISO 26262 是道路車輛功能安全的國際標準，FMEDA 報告同時引用了 2011 版和 2018 版。

### 3.2 與 FMEDA 的關聯

ISO 26262 是整份 FMEDA 報告存在的根本原因。以下是各 Part 與 FMEDA sheet 的對應：

| ISO 26262 Part | 內容 | 對應 FMEDA Sheet |
|----------------|------|-----------------|
| Part 5 - Hardware | 硬體安全度量 SPFM/LFM/PMHF | SGVEvaluation, BlockEvaluation |
| Part 5 - Annex C | 故障分類流程 | FlowChart |
| Part 5 - Annex D | 失效率數據來源 | FailureRateCalc, FailureRateCalcIC |
| Part 9 - CH.7 | 相依故障分析 (DFA) | CCF Calc sheets |
| Part 11 | 半導體 FMEDA 指引 | FMEDA 主表, FailureModes |

### 3.3 關鍵安全度量公式

ISO 26262-5 定義了三大硬體安全度量：

**SPFM（單點故障度量）**：
```
SPFM = 1 - SUM(lambda_SPF + lambda_RF) / SUM(lambda_safety_related)
```
- ASIL B 要求: >= 90%
- ASIL D 要求: >= 99%

**LFM（潛在故障度量）**：
```
LFM = 1 - SUM(lambda_MPF_latent) / (SUM(lambda_safety_related) - SUM(lambda_SPF + lambda_RF))
```
- ASIL B 要求: >= 60%
- ASIL D 要求: >= 90%

**PMHF（硬體失效機率度量）**：
```
PMHF = SUM(lambda_SPF) + SUM(lambda_RF)
```
- ASIL B 要求: < 10^-7 /h
- ASIL D 要求: < 10^-8 /h

---

## 4. SN 29500 -- 元件失效率數據

### 4.1 文件概述

SN 29500 是 Siemens 制定的元件失效率數據標準，提供了各類電子元件在不同條件下的失效率數據。

### 4.2 與 FMEDA 的關聯

- **FailureRateCalc sheet**：AR 欄中的統計失效率數據（AVERAGE 公式）部分來自 SN 29500
- **FailureRateCalcIC sheet**：IC 子系統的基礎失效率分配

### 4.3 與 IEC 62380 的關係

SN 29500 和 IEC TR 62380 提供了互補的失效率數據。SN 29500 更偏向實際測試數據，而 IEC TR 62380 更偏向理論模型。FMEDA 報告同時使用兩者，取 AVERAGE 作為最終值。

---

## 5. IEC 61508 Ed. 2.0 -- 功能安全基礎標準

### 5.1 文件概述

IEC 61508 是電氣/電子/可程式電子安全相關系統的功能安全國際標準，是 ISO 26262 的「母標準」。

### 5.2 與 FMEDA 的關聯

**CCF Calc. On-Chip Red. sheet**：
- 基礎 beta 因子 betaB-IC = 33% 來自 IEC 61508 的預設值
- 增減 beta 因子的技術措施評分表來自 IEC 61508 Annex D

**CCF Calc. Logic sheet**：
- Table D.2 的 Z 值查表直接來自 IEC 61508 Ed. 2
- 7 大類評估問題的結構來自 IEC 61508 Annex D

**BlockEval-IEC61508_opt1/opt2 sheets**：
- Option 1: 使用 SFF（Safe Failure Fraction）作為安全度量
- Option 2: 使用 PFH（Probability of Failure per Hour）作為安全度量
- 這兩個選項直接對應 IEC 61508 的兩種硬體安全評估方法

### 5.3 beta 因子計算方法

IEC 61508 Annex D 定義了 beta 因子的計算方法：

```
beta = betaB + SUM(增加措施) - SUM(減少措施)
```

其中 betaB 是基礎 beta 因子（33% for on-chip, 由 Table D.1 定義），增減措施各有對應的百分比分數。

---

## 6. N2N90008 FMEDA Tool Evaluation Report

### 6.1 文件概述

這是一份 FMEDA 工具驗證報告，用於證明本 Excel 工具的計算結果是正確且可靠的。

### 6.2 與 FMEDA 的關聯

此文件是 ISO 26262 Part 8（支援過程）要求的工具鑑定（Tool Qualification）的一部分。ISO 26262 要求用於安全分析的工具必須經過驗證，以確保其輸出結果的正確性。

### 6.3 工具鑑定的意義

根據 ISO 26262-8 Clause 11，軟體工具的使用需要：
1. 確定工具信心等級（TCL）
2. 執行工具鑑定方法
3. 驗證工具輸出的正確性

N2N90008 報告正是完成這些要求的證據文件。

---

## 7. 參考文件之間的關係圖

```
IEC 61508 (母標準)
    |
    +---> ISO 26262 (車用功能安全)
    |         |
    |         +---> Part 5: 硬體安全度量 (SPFM/LFM/PMHF)
    |         +---> Part 9: 相依故障分析 (DFA/CCF)
    |         +---> Part 11: 半導體指引 (FMEDA)
    |         +---> Part 8: 工具鑑定
    |
    +---> CCF beta 因子計算方法 (Annex D)
    +---> SFF/PFH 評估方法

IEC TR 62380 + SN 29500 + IEC 61709
    |
    +---> 失效率預測模型
    +---> 元件失效率數據
    +---> 環境應力轉換

N2N90008 Tool Evaluation Report
    |
    +---> 驗證 FMEDA Excel 工具的正確性
```

---

## 8. 每個參考文件在 FMEDA 中的具體引用位置

| 參考文件 | 引用位置 | 引用內容 |
|----------|----------|----------|
| IEC TR 62380 | FailureRateCalc E23 | 失效率預測公式 |
| IEC TR 62380 | FailureRateCalc AO-AR | 統計失效率數據 |
| IEC 61709 | FailureRateCalc I21, K21 | 元件類型基礎失效率 |
| ISO 26262-5 | FlowChart | 故障分類決策流程 |
| ISO 26262-5 | SGVEvaluation | SPFM/LFM/PMHF 計算 |
| ISO 26262-9 | CCF Calc sheets | beta 因子評估 |
| ISO 26262-11 | FMEDA 主表 | 失效模式定義 |
| ISO 26262-11 | FailureModes | 半導體失效模式清單 |
| IEC 61508 | CCF Calc. On-Chip Red. | betaB-IC = 33% |
| IEC 61508 | CCF Calc. Logic | Table D.2 Z 值 |
| IEC 61508 | BlockEval-IEC61508 | SFF/PFH 計算 |
| SN 29500 | FailureRateCalc | 元件失效率數據 |
| N2N90008 | 整份 FMEDA | 工具鑑定證據 |
