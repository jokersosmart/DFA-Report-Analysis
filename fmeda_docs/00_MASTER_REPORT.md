# RD-03-008-01 FMEDA 報告 -- 深度解析總報告

**作者**: Joker
**日期**: 2026-02-25
**原始檔案**: RD-03-008-01FMEDAReport.xlsx

---

## 第一章：文件概述

### 1.1 FMEDA 是什麼

FMEDA（Failure Modes, Effects, and Diagnostic Analysis）是 ISO 26262 要求的硬體安全分析方法。它對每個硬體元件的每種失效模式進行系統性分析，量化安全機制的覆蓋程度，最終計算出三大硬體安全度量：SPFM（單點故障度量）、LFM（潛在故障度量）和 PMHF（硬體失效機率度量）。

### 1.2 Excel 結構概覽

本 Excel 包含 **27 個 sheet**（其中 1 個隱藏），共計 **597,466 個公式**。

| 類別 | Sheet 數量 | 代表 Sheet |
|------|-----------|-----------|
| 行政管理 | 2 | Cover, Revision History |
| 定義與方法論 | 6 | Definitions, Abbreviations, Process, FlowChart, References, Legend(hidden) |
| 失效率計算 | 4 | FailureRateCalc, FailureRateCalcIC, SRAM Tran FIT, BlockList |
| 核心分析 | 5 | FMEDA, FailureModes, DiagnosisInternal, DiagnosisExternal, SafetyGoalViolations |
| CCF 分析 | 2 | CCF Calc. On-Chip Red., CCF Calc. Logic |
| 評估結果 | 7 | SGVEvaluation, BlockEvaluation, BlockEval-IEC61508_opt1/opt2, BlockTypeEvaluation, BlockTypeEval-IEC61508_opt1/opt2 |
| 架構圖 | 1 | Block-Diagram |

### 1.3 圖片清單

共 16 張圖片，分布在 5 個 sheet 中：

| Sheet | 圖片數 | 內容摘要 |
|-------|--------|----------|
| Cover | 1 | 公司 Logo |
| Revision History | 1 | 模板修訂歷史 Logo |
| Definitions | 3 | 安全度量定義圖（SPFM/LFM/PMHF 概念圖） |
| FlowChart | 10 | DFA 流程圖步驟（B1-B12）及完整流程圖 |
| Block-Diagram | 1 | 系統方塊圖（佔位符） |

---

## 第二章：每個 Sheet 的存在意義與內容解析

### 2.1 Cover（封面）

**存在意義**：文件身份識別。記錄文件編號（RD-03-008-01）、版本、日期、作者、審核者和批准者。在 ISO 26262 的文件管理體系中，封面是文件可追溯性的第一道關卡。

### 2.2 Revision History（修訂歷史）

**存在意義**：版本控制與變更追蹤。記錄每次修訂的日期、版本號、變更內容和負責人。ISO 26262 Part 8 要求所有安全相關文件必須有完整的變更歷史。

### 2.3 Process（流程）

**存在意義**：定義 FMEDA 的執行方法論。描述從元件識別到最終評估的完整流程，確保分析的系統性和可重複性。

### 2.4 References（參考文件）

**存在意義**：建立權威性基礎。列出 8 份核心參考文件（IEC TR 62380, IEC 61709, ISO 26262:2011/2018, SN 29500, IEC 61508, N2N90008 工具評估報告），每一份都為 FMEDA 的某個計算環節提供標準依據。

### 2.5 Abbreviations（縮寫表）

**存在意義**：消除溝通歧義。定義所有使用的縮寫（如 SPFM, LFM, PMHF, CCF, DC 等），確保跨團隊的理解一致性。

### 2.6 Definitions（定義）

**存在意義**：建立共同語言。定義所有關鍵術語的精確含義，並通過 3 張概念圖視覺化 SPFM、LFM、PMHF 的計算邏輯。這是整份報告最重要的認識論基礎。

### 2.7 Legend（圖例/操作指南，隱藏）

**存在意義**：工具操作手冊。記錄 FMEDA Excel 工具的使用步驟，包括如何填寫 BlockList、如何執行巨集合併、如何分配診斷覆蓋率。被隱藏是因為它是「工具面向」而非「報告面向」的內容。

### 2.8 FlowChart（流程圖）

**存在意義**：視覺化故障分類決策流程。包含 10 張圖片，展示 ISO 26262-5 Annex C 的故障分類步驟（B1-B12），以及一張完整的 DFA 工作流程圖。

### 2.9 FailureModes（失效模式）

**存在意義**：失效模式知識庫。列出所有可能的半導體失效模式（如 stuck-at-0, stuck-at-1, drift, open, short 等），為 FMEDA 主表提供失效模式的標準化定義。

### 2.10 BlockList（元件清單）

**存在意義**：分析對象資料庫。列出所有需要分析的硬體元件（Block），包括元件名稱、類型、數量、失效率分配比例等。這是 FMEDA 主表的輸入數據來源。

### 2.11 SRAM Tran FIT（SRAM 失效率）

**存在意義**：SRAM 專用失效率模型。由於 SRAM 的失效機制（如 soft error）與邏輯電路不同，需要獨立的失效率計算模型。

### 2.12 Block-Diagram（方塊圖）

**存在意義**：系統架構視覺化。展示 IC 內部各功能模組的連接關係和安全機制的部署位置。

### 2.13 FailureRateCalc（失效率計算）

**存在意義**：失效率預測引擎。基於 IEC TR 62380 的數學模型，計算整個 IC 的基礎失效率。核心公式：

```
lambda = (lambda_base * N_transistors * EXP(-0.35 * years) + (N_sram * lambda_sram)) * Q_factor
```

### 2.14 FailureRateCalcIC（IC 失效率分配）

**存在意義**：將 IC 總失效率分配到各子系統。使用面積比例法或功能複雜度法，將 FailureRateCalc 計算的總失效率分配到 BlockList 中的每個元件。

### 2.15 FMEDA（核心分析表）

**存在意義**：整份報告的計算引擎。1659 行 x 463 列，562,887 個公式。對每個「元件-失效模式」組合進行獨立評估，計算每種失效的安全分類（Safe/SPF/RF/MPF-detected/MPF-latent）和對安全度量的貢獻。

### 2.16 DiagnosisInternal（內部診斷）

**存在意義**：定義 IC 內部的安全機制及其診斷覆蓋率。列出所有內部診斷機制（如 ECC、Parity、Watchdog、BIST 等）及其對各失效模式的覆蓋能力。

### 2.17 DiagnosisExternal（外部診斷）

**存在意義**：定義 IC 外部（系統層級）的安全機制及其診斷覆蓋率。列出所有外部診斷機制（如 End-to-End CRC、Alive Counter、Timeout 等）。

### 2.18 SafetyGoalViolations（安全目標違反）

**存在意義**：將 FMEDA 的元件級分析結果映射到安全目標級。計算每個安全目標被違反的機率，為 SGVEvaluation 提供輸入。

### 2.19 CCF Calc. On-Chip Red.（晶片內冗餘 CCF 計算）

**存在意義**：量化晶片內冗餘架構的共因失效風險。基於 IEC 61508 Annex D 的評分方法，計算 beta 因子（結果：47%）。

### 2.20 CCF Calc. Logic（邏輯子系統 CCF 計算）

**存在意義**：量化邏輯子系統的共因失效風險。使用 IEC 61508 Table D.2 的 Z 值查表方法，計算 beta 因子（結果：5%）。

### 2.21-2.27 評估結果 Sheets

**存在意義**：呈現最終評估結果。分為三個維度（安全目標級、元件級、元件類型級）和兩個標準（ISO 26262、IEC 61508 Option 1/2），共 7 個 sheet。

---

## 第三章：公式物理意義與跨頁關聯

### 3.1 公式統計

| Sheet | 公式數量 | 主要公式類型 |
|-------|---------|-------------|
| FMEDA | 562,887 | 失效分類、安全度量貢獻計算 |
| SafetyGoalViolations | ~15,000 | 安全目標映射 |
| FailureRateCalc | ~500 | 失效率預測 |
| FailureRateCalcIC | ~300 | 失效率分配 |
| CCF Calc. On-Chip Red. | ~100 | beta 因子計算 |
| CCF Calc. Logic | ~100 | beta 因子計算 |
| BlockEvaluation | ~200 | SPFM/LFM/PMHF 匯總 |
| SGVEvaluation | ~150 | 安全目標級匯總 |
| 其他評估 sheets | ~18,000 | IEC 61508 SFF/PFH 計算 |

### 3.2 核心公式鏈

整份 FMEDA 的公式構成了一條完整的計算鏈：

```
IEC TR 62380 模型參數
    |
    v
FailureRateCalc: lambda_total = f(transistors, years, SRAM, Q)
    |
    v
FailureRateCalcIC: lambda_block = lambda_total * area_ratio
    |
    v
BlockList: 元件清單 + 失效率分配
    |
    v
FMEDA 主表: 每個元件-失效模式的安全分類
    |                    |
    v                    v
DiagnosisInt/Ext     SafetyGoalViolations
(診斷覆蓋率)         (安全目標映射)
    |                    |
    v                    v
BlockEvaluation      SGVEvaluation
(SPFM/LFM/PMHF)     (安全目標級結果)
    |
    +---> BlockEval-IEC61508_opt1/opt2 (SFF/PFH)
    +---> BlockTypeEvaluation (元件類型級)
```

### 3.3 FMEDA 主表的公式結構

FMEDA 主表的 463 列可分為以下幾個區域：

| 列範圍 | 內容 | 公式類型 |
|--------|------|----------|
| A-H | 元件基本資訊 | 引用 BlockList |
| I-N | 失效模式定義 | 引用 FailureModes |
| O-T | 失效率分配 | 乘法（總失效率 x 分配比例） |
| U-AH | 安全目標 1 分析 | IF/VLOOKUP 條件判斷 |
| AI-AV | 安全目標 2 分析 | 同上 |
| ... | 更多安全目標 | 同上 |
| 最後 20 列 | 匯總計算 | SUM/SUMPRODUCT |

### 3.4 beta 因子計算的物理意義

**晶片內冗餘 beta 因子（47%）**：

```
betaIC = betaB-IC + SUM(增加措施) - SUM(減少措施)
       = 33% + 14% - 0%
       = 47%
```

物理意義：在晶片內部的冗餘架構中，有 47% 的機率兩個冗餘通道會因為同一個根本原因（如製程缺陷、溫度過高、電壓波動）同時失效。

**邏輯子系統 beta 因子（5%）**：

物理意義：在邏輯子系統層級，有 5% 的機率兩個獨立的邏輯模組會因為共同原因同時失效。這個值較低，反映了邏輯子系統之間的獨立性較高。

---

## 第四章：圖片辨識與解讀

### 4.1 Definitions 頁面的 3 張概念圖

這三張圖分別視覺化了 SPFM、LFM、PMHF 的計算邏輯：

**圖 1 - SPFM 概念圖**：展示了「安全相關失效率」如何被分解為「單點故障」和「殘餘故障」，以及 SPFM 的計算公式。

**圖 2 - LFM 概念圖**：展示了「多點故障」如何被分為「已偵測」和「潛在」兩類，以及 LFM 的計算公式。

**圖 3 - PMHF 概念圖**：展示了所有失效類型如何匯總為每小時的硬體失效機率。

### 4.2 FlowChart 頁面的流程圖

10 張圖片構成了完整的 DFA 工作流程（B1-B12 步驟）：

```
B1: 識別安全相關元素
    |
B2: 確定失效模式
    |
B3: 評估失效效果
    |
B4: 是否為安全相關失效？ --No--> Safe Fault
    |Yes
B5: 是否有安全機制？ --No--> Single Point Fault
    |Yes
B6: 安全機制是否偵測到？ --No--> Residual Fault
    |Yes
B7: 診斷覆蓋率是否足夠？
    |
B8-B12: 多點故障分類（detected/perceived/latent）
```

---

## 第五章：柏拉圖辯證法與蘇格拉底式提問

### 5.1 方法論

本章採用柏拉圖辯證法（正題 -> 反題 -> 合題）和蘇格拉底式提問法（六大類型追問）對 FMEDA 報告進行哲學層面的深度分析。完整的 7 輪辯證分析請參見 `dialectic_socratic_analysis.md`。

### 5.2 核心辯證結論

**第一輪**：FMEDA 的本質不是「計算機」，而是「可審計的量化論證系統」。27 個 sheet 構成了完整的論證鏈。

**第二輪**：562,887 個公式的複雜度是「分析粒度」和「Excel 工具限制」共同決定的。Excel 的透明性是其最大優勢。

**第三輪**：隱藏的 Legend sheet 揭示了 FMEDA 的雙重性質：既是報告也是工具。

**第四輪**：47% 的 beta 因子是「保守但誠實」的數字，明確指出了改進方向。

**第五輪**：IEC TR 62380 的失效率模型雖已撤回，但其保守性使其在功能安全領域仍然有效。

**第六輪**：三套評估體系（ISO 26262 + IEC 61508 opt1/opt2）的並存反映了標準演進的歷史。

**第七輪**：FMEDA 與 DFA 的 beta 因子不一致（47% vs 33%）需要被識別和解決。

---

## 第六章：參考文件解讀

### 6.1 參考文件與 FMEDA 的對應關係

| 參考文件 | 在 FMEDA 中的引用位置 | 提供的內容 |
|----------|---------------------|-----------|
| IEC TR 62380 | FailureRateCalc | 失效率預測公式和參數 |
| IEC 61709 | FailureRateCalc | 元件失效率參考條件 |
| ISO 26262-5 | FlowChart, Evaluation sheets | 安全度量定義和目標值 |
| ISO 26262-9 | CCF Calc sheets | 相依故障分析方法 |
| ISO 26262-11 | FMEDA 主表, FailureModes | 半導體 FMEDA 指引 |
| SN 29500 | FailureRateCalc | 元件失效率數據 |
| IEC 61508 | CCF Calc, BlockEval-IEC61508 | beta 因子和 SFF/PFH 計算 |
| N2N90008 | 整份 FMEDA | 工具鑑定證據 |

完整的參考文件分析請參見 `reference_documents_analysis.md`。

---

## 附錄

### A. 檔案清單

| 檔案 | 說明 |
|------|------|
| 00_MASTER_REPORT.md | 本總報告 |
| formula_and_crossref_analysis.md | 公式深度分析 |
| reference_documents_analysis.md | 參考文件解讀 |
| dialectic_socratic_analysis.md | 柏拉圖辯證法與蘇格拉底式提問分析 |
| image_analysis.md | 圖片 AI 辨識報告 |
| FMEDA_Report_Reversible.md | 可逆向還原的完整 Markdown |
| fmeda_to_reversible_md.py | Excel -> Markdown 轉換腳本 |
