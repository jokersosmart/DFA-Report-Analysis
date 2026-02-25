# RD-03-009-01 ADFA/DFA 報告深度解析總報告

**文件編號**: RD-03-009-01  
**分析對象**: ADFA報告DFAReport.xlsx  
**分析者**: Joker  
**日期**: 2025-02-25  

---

## 第一章：文件總覽與柏拉圖式思考

### 1.1 文件的「理型」(Ideal Form)

這份 Excel 的本質並非一個試算表，而是**一個「可審計的理性思維過程」(An Auditable Process of Reason)**。它的存在是為了將一個複雜、抽象的功能安全分析過程——相依故障分析（Dependent Failure Analysis, DFA）——轉化為一個結構化、可追溯、可驗證的具體形式。它是一個思維的容器，其最終目的是為了**證明**一個半導體產品在面對相依故障時是足夠安全的，並讓第三方（如稽核員、認證機構）能夠毫無歧義地理解並認同這個證明的過程與結論。

運用「4! 分析法」的框架，我們從「一體、兩面、三階段、四元素」來審視這份文件：

| 視角 | 過去 (Past) | 現在 (Present) | 未來 (Future) |
| :--- | :--- | :--- | :--- |
| **創作者** (工程師) | **Input**: 遵循過往的模板與標準要求。**Library**: 累積的 DFA 分析經驗。 | **Control**: 選擇適當的分析方法（Block-based, Cut Set-based），填寫數據，執行計算。**Output**: 完成一份符合當前專案需求的 DFA 報告。 | **Library**: 本次分析的經驗成為未來專案的資產。**Output**: 報告歸檔，作為未來產品迭代或新專案的參考基礎。 |
| **審計者** (品質/認證) | **Input**: 依據過去對標準的理解與稽核經驗。 | **Control**: 檢查報告的完整性、數據的合理性、公式的正確性、流程是否符合標準。**Output**: 提出問題或批准報告，確認產品符合安全要求。 | **Output**: 稽核記錄歸檔，作為未來持續監督的依據。 |

### 1.2 文件結構概覽

本 Excel 共包含 **15 個工作表**，可歸類為四大功能層：

| 功能層 | Sheet 名稱 | 柏拉圖式理型 | 核心功能 |
|:------|:----------|:-----------|:--------|
| **基礎框架** | Cover, Revision History (Template), Revision History (DFA) | 身份與權威 | 文件身份、版本控制、簽核 |
| **知識基礎** | References, Abbreviations, Definitions | 共同語言 | 標準引用、術語統一、概念定義 |
| **方法論** | Methodology, Flowchart, ISO 26262-9 CH.7 | 法律與地圖 | 法規依據、分析方法、流程指引 |
| **分析與計算** | Block-Diagram, Block based Analysis, Cut Set based Analysis, DFI examples, CCF Calc. On-Chip Red., CCF Calc. Logic | 審判台與砝碼 | 定性分析、定量分析、β因子計算 |

---

## 第二章：逐頁深度解析

### 2.1 Revision History for Template（模板修訂歷史）

**存在意義**：記錄 DFA 報告模板本身的演進歷史，確保模板的版本可追溯。這是品質管理系統（QMS）的基本要求，區分「模板的改版」與「報告內容的改版」。

**內容摘要**：目前僅有一筆記錄——版本 A，生效日期 2025-10-18，由 Mike Rao 撰寫，標記為「New added」。表格預留了 10 行空白行供未來版本記錄。頁面頂部嵌入了 SiliconMotion 慧榮科技的公司 Logo。

### 2.2 Cover（封面）

**存在意義**：作為文件的「身份證」，提供專案識別資訊、參與者資訊和品質保證簽核。這是 ISO 26262 要求的文件管理基本要素。

**內容摘要**：

| 欄位 | 內容 |
|:-----|:-----|
| 文件編號 | RD-03-009-01 |
| 文件標題 | DFA 報告 / DFA Report |
| 專案名稱 | [待填] |
| 產品名稱 | [待填] |
| ASIL 等級 | [待填] |
| 撰寫者 | Mike Rao |
| 審查者 | [待填] |
| 批准者 | [待填] |

**特殊格式**：此 sheet 為**隱藏狀態**（hidden），可能是因為模板尚未正式啟用或封面資訊尚未完整填寫。

### 2.3 Revision History of DFA（DFA 報告修訂歷史）

**存在意義**：記錄 DFA 報告內容本身的改版歷史，與模板修訂歷史分開管理，確保報告內容的每次變更都有據可查。

**內容摘要**：目前僅有一筆記錄——版本 A，生效日期 2025-10-18，由 Mike Rao 撰寫，標記為「New added」。

### 2.4 References（參考文件）

**存在意義**：建立整份報告的法規基礎與知識來源，確保所有分析方法和判斷標準都有權威依據。這是 ISO 26262 審計中最先被檢查的項目之一。

**引用的 8 份標準文件**：

| 編號 | 文件名稱 | 版本 | 在本報告中的角色 |
|:-----|:--------|:-----|:---------------|
| 1 | ISO 26262-1:2018 | 2nd Ed. | 術語與定義的來源，定義了 DFI（Dependent Failure Initiator）等核心概念 |
| 2 | ISO 26262-5:2018 | 2nd Ed. | 硬體層級產品開發要求，定義了 SPFM、LFM、PMHF 等安全指標的計算方法 |
| 3 | ISO 26262-9:2018 | 2nd Ed. | 相依故障分析的要求（第 7 章完整收錄於本 Excel），是 DFA 的法規基礎 |
| 4 | ISO 26262-10:2018 | 2nd Ed. | DFA 方法論指引，Annex A.3.6 定義了切割集分析方法 |
| 5 | ISO 26262-11:2018 | 1st Ed. | 半導體 DFA 核心指引，定義了 DFA 工作流程 B1-B12（Figure 23） |
| 6 | IEC 61508 Ed. 2 | 2010 | β-factor 計算方法（Annex D），用於 CCF 量化 |
| 7 | IEC TR 62380:2004 | 2004 | 可靠度預測手冊，提供電子元件故障率模型 |
| 8 | DIN EN 60812 / IEC 60812 | 2006/2018 | FMEA 分析方法標準 |

### 2.5 Abbreviations（縮寫對照表）

**存在意義**：統一所有技術術語的縮寫，消除溝通歧義。在跨國團隊和第三方審計中尤為重要。

**關鍵縮寫**：

| 縮寫 | 全稱 | 中文說明 |
|:-----|:-----|:--------|
| ASIL | Automotive Safety Integrity Level | 汽車安全完整性等級 |
| CCF | Common Cause Failure | 共因故障 |
| DFA | Dependent Failure Analysis | 相依故障分析 |
| DFI | Dependent Failure Initiator | 相依故障啟動因子 |
| FTTI | Fault Tolerant Time Interval | 故障容忍時間間隔 |
| LFM | Latent Fault Metric | 潛伏故障指標 |
| PMHF | Probabilistic Metric for random Hardware Failures | 隨機硬體故障概率指標 |
| SM | Safety Mechanism | 安全機制 |
| SPFM | Single-Point Fault Metric | 單點故障指標 |

### 2.6 Definitions（定義）

**存在意義**：提供 DFA 分析中所有核心概念的精確定義與圖示說明，確保所有參與者對「相依故障」、「級聯故障」、「共因故障」等概念有一致的理解。

**包含 3 張關鍵圖片**：

**圖片 1 — ISO 26262 故障時間軸圖 (Figure 5)**：展示三種場景的時間軸——無安全機制時故障直接導致危險事件；有安全機制時故障被偵測並在 FTTI 內轉換到安全狀態；有緊急操作模式時先進入緊急操作再轉換到安全狀態。此圖定義了 **FTTI（故障容忍時間間隔）** 的概念，是功能安全的核心時間概念。

**圖片 2 — 級聯故障 (Cascading Failure) 示意圖**：展示 Element A 的 Fault 1 導致 Failure A，進而傳遞到 Element B 觸發 Fault 2 產生 Failure B 的過程。級聯故障威脅了「免於干擾」(freedom from interference) 的要求。

**圖片 3 — 共因故障 (Common Cause Failure) 示意圖**：展示單一 Root Cause 同時影響 Element A 和 Element B，導致 Failure A 和 Failure B 同時發生。CCF 威脅了「獨立性」(independence) 的要求，與級聯故障的區別在於 CCF 的故障是同時發生的。

### 2.7 ISO 26262-9 CH.7（標準原文收錄）

**存在意義**：完整收錄 ISO 26262-9:2018 第 7 章「相依故障分析」的原文，作為整份報告的法規基礎。直接嵌入標準原文確保了分析的權威性與不可挑戰性，審計者可以直接在同一份文件中比對分析過程是否符合標準要求。

**核心內容**：第 7 章定義了 DFA 的目標（確認所需的獨立性或免干擾性不被相依故障違反）、一般要求（在架構設計階段進行 DFA）、以及具體方法（§7.4.2.3，被 Methodology sheet 引用）。

### 2.8 Methodology（方法論）

**存在意義**：將抽象的法規條文轉化為具體的分析方法論，定義本次 DFA 分析的範圍、方法和工具。它是連接「標準要求」與「實際分析」的橋樑。

**關鍵內容**：引用 ISO 26262-9:2011 §7.4.2.3 作為方法論基礎，定義了本次 DFA 使用的兩種分析方法——Block-based Analysis（基於功能區塊的定性分析）和 Cut Set-based Analysis（基於切割集的定量分析）。

### 2.9 Flowchart（流程圖）

**存在意義**：將整個 DFA 過程視覺化為一張地圖，讓創作者和審計者都能一目了然地知道「我們現在在哪裡」以及「下一步要去哪裡」。

**包含 10 張圖片**，其中最重要的是 **Figure 23 — DFA Workflow**，定義了 B1 到 B12 的完整工作流程：

```
                    ┌─────────┐
                    │  Start  │
                    └────┬────┘
                         │
                    ┌────▼─────────────────────┐
              B1    │ DFA Decision              │
                    │ Identify HW and SW        │
                    │ elements                  │
                    └────┬─────────────────────┘
                         │
     Input info.    ┌────▼─────────────────────┐
     Link to ──────►│ B2  Identify dependent   │
     quant. anal.   │     failure initiators    │
                    └────┬─────────────────────┘
                         │
                    ┌────▼────┐    NO    ┌──────────┐
              B3    │ Insight ├─────────►│ B4       │
                    │ suffic? │          │ Improve  │
                    └────┬────┘          │ info     │
                     YES │               └─────┬───┘
                         │◄────────────────────┘
                    ┌────▼─────────────────────┐
              B5    │ Consolidate List of      │──► SPFM, LFM, PMHF
                    │ relevant DFI             │
                    └────┬─────────────────────┘
                         │
     Input info.    ┌────▼─────────────────────┐
     Link to ──────►│ B6  Identify necessary   │
     quant. anal.   │     safety measures      │
                    └────┬─────────────────────┘
                         │
                    ┌────▼────┐    NO    ┌──────────┐
              B7    │ Insight ├─────────►│ B8       │
                    │ suffic? │          │ Improve  │
                    └────┬────┘          │ info     │
                     YES │               └─────┬───┘
                         │◄────────────────────┘
                    ┌────▼─────────────────────┐
              B9    │ Consolidate List of      │──► SPFM, LFM, PMHF
                    │ Safety Measures          │
                    └────┬─────────────────────┘
                         │
                    ┌────▼─────────────────────┐
              B10   │ Evaluate effectiveness   │
                    └────┬─────────────────────┘
                         │
                    ┌────▼────┐    NO    ┌──────────┐
              B11   │ Suffic. ├─────────►│ B12      │
                    │ risk    │          │ Improve  │
                    │ reduct? │          │ measures │
                    └────┬────┘          └─────┬───┘
                     YES │◄────────────────────┘
                    ┌────▼────┐
                    │   End   │
                    └─────────┘
```

此流程分為三個主要迴圈：DFI 識別迴圈（B1-B4）、安全措施定義迴圈（B5-B8）、有效性評估迴圈（B9-B12）。每個迴圈都有「洞察是否充分」的決策點，不充分則改進資訊後重新迭代。

### 2.10 Block-Diagram（功能區塊圖）

**存在意義**：提供系統架構的視覺化表示，作為 Block based Analysis 的輸入基礎。目前此 sheet 為空白模板狀態，等待填入具體專案的功能區塊圖。

### 2.11 Block based Analysis（基於功能區塊的分析）

**存在意義**：作為 DFA 的**定性審判台**，從架構的宏觀層面識別潛在的相依故障風險。它基於功能區塊的視角，對每個 DFI 進行分類和評估。

**表格結構**：包含 Block Name、DFI Category、DFI Description、Affected Elements、Safety Measure、Evaluation 等欄位。DFI 分類直接引用 DFI examples sheet 的 7 大類。目前為空白模板狀態。

### 2.12 Cut Set based Analysis（基於切割集的分析）

**存在意義**：作為 DFA 的**定量審判台**，從故障組合的微觀層面量化共因故障的潛在嚴重性。

**核心公式 — CCCI（Common Cause Criticality Index）**：

> **CCCI = G + I + K + M + O**

此公式計算的是五個評分維度的加總，每個維度的評分範圍為 0-3，CCCI 總分範圍為 0-15：

| 欄位 | 維度 | 物理意義 |
|:-----|:-----|:--------|
| G | Spatial resolution（空間解析度） | 切割集元件之間的物理距離，距離越近共因故障風險越高 |
| I | Sharing of common resources（共享資源） | 切割集元件是否共享電源、時脈等資源 |
| K | Conducting same information（傳導相同資訊） | 切割集元件是否傳導相同的訊號 |
| M | Same function and technology（相同功能與技術） | 切割集元件是否使用相同的功能/技術/製程 |
| O | Components in same package（同封裝元件） | 切割集元件是否位於同一封裝內 |

CCCI 值越高，表示切割集元件之間的共因故障潛力越大，需要更深入的調查或額外的緩解措施。此方法源自 ISO 26262-10 Annex A.3.6。共 86 個公式（P15 至 P100），每行對應一個切割集的 CCCI 評分。

### 2.13 DFI examples（DFI 範例清單）

**存在意義**：作為**已知危險的百科全書**，收錄了 ISO 26262-11 §4.7.5.1 定義的 7 類 DFI 範例，確保分析的完備性，防止分析者遺漏已知的常見故障模式。

**7 大類 DFI**：

| 類別 | 名稱 | 說明 | 典型範例 |
|:-----|:-----|:-----|:--------|
| 1 | Failure of shared resources | 共享資源故障 | 時脈樹、電壓調節器、匯流排仲裁器 |
| 2 | Single physical root cause | 單一物理根因 | ESD 事件、閂鎖效應、電遷移 |
| 3 | Environmental faults | 環境故障 | 溫度超限、EMI 干擾、輻射 |
| 4 | Development faults | 開發故障 | 設計錯誤、驗證不足、工具缺陷 |
| 5 | Manufacturing faults | 製造故障 | 製程偏差、污染、光罩缺陷 |
| 6 | Installation faults | 安裝故障 | 焊接不良、PCB 佈線錯誤 |
| 7 | Operation and maintenance faults | 操作與維護故障 | 韌體更新錯誤、配置錯誤 |

### 2.14 CCF Calc. On-Chip Red.（晶片內冗餘 β 因子計算）

**存在意義**：量化晶片內部冗餘設計對共因故障的抵抗能力，回答「我們對晶片內冗餘設計的信心有多大？」這個核心問題。

**核心公式**：

> **βIC = βB-IC + Σ(增加因子) - Σ(降低因子)**

其中 **βB-IC = 33%** 是 IEC 61508 定義的晶片內冗餘基礎 β 因子，意味著在沒有任何措施的情況下，33% 的故障被認為是共因故障。

**增加 β 因子的因素**（4 項，代表晶片內部耦合）：

| 措施 | Δβ(%) | 物理意義 |
|:-----|:------|:--------|
| 晶片內看門狗作為監控元件 | +5 | 晶片內看門狗雖提高診斷覆蓋率，但增加共因耦合 |
| 晶片內其他監控元件 | +5 | 同上邏輯 |
| 獨立區塊間無交叉內部連線 | +2 | 無交叉佈線仍有一定耦合風險 |
| 獨立區塊間有交叉內部連線 | +4 | 有交叉佈線顯著增加短路和共因風險 |

**降低 β 因子的因素**（11 項，代表設計措施）：

| 措施 | Δβ(%) | 物理意義 |
|:-----|:------|:--------|
| 不同通道的多樣化故障控制 | -4 | 多樣性降低共因風險 |
| 功能多樣性+不同通道故障控制 | -6 | 更高程度的多樣性 |
| EMC 測試（含額外安全裕度） | -5 | 電磁相容性測試降低環境共因 |
| 各區塊獨立電源引腳 | -6 | 電源隔離降低共因 |
| 獨立區塊間的接地引腳 | -2 | 接地隔離 |
| 高診斷覆蓋率 DC≥99% | -7 | 高 DC 快速偵測故障 |
| 區塊間溫度感測器（低效能） | -2 | 溫度監控（無診斷） |
| 區塊間溫度感測器（高效能） | -9 | 溫度監控（有診斷） |
| 故障影響分析/測試 | -9 | 系統性分析 |
| 監控電路在高溫下仍可運作 | -7 | 極端條件下的可靠性 |

目前所有措施的啟用欄（F 欄）均為 0，因此 βIC = 33 + 0 - 0 = **33%**。

### 2.15 CCF Calc. Logic（邏輯子系統 β 因子計算）

**存在意義**：依據 IEC 61508 Ed. 2 Annex D 的通用方法，對邏輯子系統的數十個維度進行評分，將「最佳工程實踐」轉化為一個可計算的信心指數。

**核心公式**：

> **Score S = Σx + Σy**（不考慮診斷的基本分數）  
> **Score SD = Σx × (z + 1) + Σy**（考慮診斷後的調整分數）

其中 x 和 y 分別來自 8 大評估類別的評分，z 值來自 IEC 61508 Table D.2/D.3（基於診斷覆蓋率和測試間隔）。

**8 大評估類別**：

| 類別 | 評估內容 | XLS 最大分 | YLS 最大分 |
|:-----|:--------|:----------|:----------|
| 1. Separation/Segregation | 通道間物理分離程度 | 依項目 | 依項目 |
| 2. Diversity/Redundancy | 技術多樣性 | 依項目 | 依項目 |
| 3. Complexity/Design/Maturity | 設計成熟度和複雜度 | 依項目 | 依項目 |
| 4. Assessment/Analysis | 分析活動充分性 | 依項目 | 依項目 |
| 5. Procedures/Human Interface | 維護和診斷程序品質 | 依項目 | 依項目 |
| 6. Competence/Training | 人員培訓充分性 | 依項目 | 依項目 |
| 7. Environmental Control | 環境保護措施 | 依項目 | 依項目 |
| 8. Environmental Testing | 環境免疫測試充分性 | 依項目 | 依項目 |

**β 值查表**（IEC 61508 Table D.4）：

| Score 範圍 | β 或 βD 值 (%) | 風險等級 |
|:----------|:--------------|:--------|
| < 45 | 5% | 最高風險 |
| 45-69 | 2% | 中等風險 |
| 70-119 | 1% | 低風險 |
| ≥ 120 | 0.5% | 最低風險 |

目前所有措施均未啟用（H=0），Score S = 0，因此 β = βD = **5%**（最高風險等級）。

---

## 第三章：跨頁資料關聯與公式物理意義

### 3.1 資料流向圖

```
References ──────────────────────────────────────────────────────────────┐
  │ 提供標準文件依據                                                      │
  ▼                                                                      │
Definitions ──► 定義所有技術術語（引用 ISO 26262 定義）                    │
  │                                                                      │
  ▼                                                                      │
Methodology ──► 定義 DFA 方法論（引用 ISO 26262-9 §7.4.2.3）            │
  │                                                                      │
  ▼                                                                      │
Flowchart ────► DFA 工作流程（引用 ISO 26262-11 §4.7.6）                 │
  │                                                                      │
  ├──► Cut Set based Analysis ──► CCCI 公式評估切割集                     │
  │         │                                                            │
  │         └──► 輸入來自 FTA/ETA 的切割集                                │
  │                                                                      │
  ├──► Block based Analysis ──► DFI 分類評估功能區塊                      │
  │         │                                                            │
  │         └──► DFI 分類來自 DFI examples sheet                          │
  │                                                                      │
  ├──► CCF Calc. On-Chip Red. ──► β因子計算（晶片內冗餘）                 │
  │                                                                      │
  └──► CCF Calc. Logic ──► β因子計算（邏輯子系統）                        │
                                                                         │
ISO 26262-9 CH.7 ──► 完整收錄標準原文第7章◄──────────────────────────────┘
```

### 3.2 公式與標準的對應關係

| 公式/計算 | 所在 Sheet | 依據標準 | 標準章節 | 物理意義 |
|:---------|:----------|:--------|:--------|:--------|
| CCCI = G+I+K+M+O | Cut Set based Analysis | ISO 26262-10 | Annex A.3.6 | 量化切割集元件間的共因故障潛力 |
| βIC = βB-IC + Σ增 - Σ減 | CCF Calc. On-Chip Red. | IEC 61508 Ed. 2 | Annex D (延伸) | 量化晶片內冗餘的共因故障比例 |
| S = Σx + Σy | CCF Calc. Logic | IEC 61508 Ed. 2 | Annex D, Table D.1 | 不考慮診斷的基本信心分數 |
| SD = Σx×(z+1) + Σy | CCF Calc. Logic | IEC 61508 Ed. 2 | Annex D, Table D.2-D.4 | 考慮診斷後的調整信心分數 |
| β = f(S) | CCF Calc. Logic | IEC 61508 Ed. 2 | Annex D, Table D.4 | 將信心分數轉換為 β 因子百分比 |

---

## 第四章：參考文件詳細解讀

### 4.1 ISO 26262-11:2018 — 半導體功能安全指引（核心參考）

ISO 26262-11 是 ISO 26262 系列的第 11 部分，專門針對半導體元件的功能安全提供指引。這是 2018 年第二版新增的部分，因為半導體（IC）有其獨特的特性——無維護需求、無除役需求、晶片內部元件高度耦合。

第 4.7 節「半導體相依故障分析」是本 Excel 的核心方法論來源。DFA 的目標是識別和分析可能的共因故障（CCF）和級聯故障（Cascading Failure），評估其違反安全目標的風險，並定義安全措施來降低風險。DFA 的範圍涵蓋矽晶片內部的硬體元件之間、以及硬體與軟體元件之間的相依故障。

DFI 的特徵化包括四個維度：耦合機制（傳導耦合、近場耦合、機械耦合、輻射耦合）、傳播介質（信號線、時脈網路、電源網路、基板、封裝、空氣）、局部性（影響單一或多個元件）、時序（傳播延遲、週期性）。

### 4.2 IEC 61508 Ed. 2 — β-factor 計算方法

IEC 61508 是所有功能安全標準的「母標準」，ISO 26262 即衍生自此標準。Part 6 Annex D 提供了 β-factor 計算方法，定義了一套評分系統來估算共因故障的 β 因子。此方法被 CCF Calc. Logic 和 CCF Calc. On-Chip Red. 兩個 sheet 完整實現。

### 4.3 ISO 26262-9:2018 第 7 章 — 相依故障分析要求

ISO 26262-9 第 7 章定義了 DFA 的目標（確認所需的獨立性或免干擾性不被相依故障違反）和一般要求（在架構設計階段進行 DFA，識別可能的 CCF 和級聯故障）。本 Excel 的 "ISO 26262-9 CH.7" sheet 完整收錄了此章節的原文。

### 4.4 其他參考文件

ISO 26262-5:2018 定義了硬體安全指標（SPFM、LFM、PMHF），β 因子直接影響這些指標的計算。ISO 26262-10:2018 Annex A.3.6 定義了切割集分析方法。IEC TR 62380:2004 提供了電子元件故障率數據。IEC 60812 定義了 FMEA 分析方法，是 DFA 的前置分析之一。

---

## 第五章：可逆向 Markdown 格式說明

### 5.1 設計原則

本次轉換產出的 `DFA_Report_Reversible.md` 採用了特殊的結構化 Markdown 格式，保留了原始 Excel 的所有關鍵資訊，包括每個儲存格的值、公式、樣式（字體、顏色、邊框、對齊）、合併儲存格範圍、行高列寬、隱藏狀態和圖片錨點位置。

### 5.2 逆向還原方法

配套的 `scripts/md_to_excel.py` 腳本可以讀取可逆 Markdown 檔案並重建 Excel 工作簿。使用方法：

```bash
python3 scripts/md_to_excel.py markdown/DFA_Report_Reversible.md output_reconstructed.xlsx
```

### 5.3 格式結構

每個 sheet 在 Markdown 中的結構如下：

```markdown
## Sheet: {sheet_name}
- **State**: `{visible|hidden}`
- **Merged Cells**: `{A1:D2, ...}`

### Column Dimensions
```json
{"A": {"width": "8.80", "hidden": false}, ...}
```

### Row Dimensions
```json
{"1": {"height": "18.65", "hidden": false}, ...}
```

### Cell Data, Formulas, and Styles
| Cell | Value (Displayed) | Formula | Style (JSON) |
|:-----|:------------------|:--------|:-------------|
| A1   | 文字內容           | `=SUM(...)` | `{...}` |
```

---

## 第六章：GitHub 備份

所有分析結果已備份至私人 GitHub 儲存庫：

**Repository**: [https://github.com/jokersosmart/DFA-Report-Analysis](https://github.com/jokersosmart/DFA-Report-Analysis)

| 目錄 | 內容 |
|:-----|:-----|
| `/` | 原始 Excel 檔案、README |
| `/docs/` | 所有分析報告（本報告、公式分析、圖片分析、參考文件分析、柏拉圖式分析） |
| `/images/` | 從 Excel 提取的所有 16 張圖片 |
| `/markdown/` | 可逆向還原的 Markdown 格式（14,349 行） |
| `/scripts/` | Python 分析與轉換腳本（Excel→MD、MD→Excel、結構分析、圖片提取） |

---

## 參考文獻

[1]: ISO 26262-1:2018, "Road vehicles — Functional safety — Part 1: Vocabulary"
[2]: ISO 26262-5:2018, "Road vehicles — Functional safety — Part 5: Product development at the hardware level"
[3]: ISO 26262-9:2018, "Road vehicles — Functional safety — Part 9: Automotive Safety Integrity Level (ASIL)-oriented and safety-oriented analyses"
[4]: ISO 26262-10:2018, "Road vehicles — Functional safety — Part 10: Guidelines on ISO 26262"
[5]: ISO 26262-11:2018, "Road vehicles — Functional safety — Part 11: Guidelines on application of ISO 26262 to semiconductors"
[6]: IEC 61508 Ed. 2 (2010), "Functional safety of electrical/electronic/programmable electronic safety-related systems"
[7]: IEC TR 62380:2004, "Reliability data handbook — Universal model for reliability prediction of electronics components, PCBs and equipment"
[8]: IEC 60812:2018, "Failure modes and effects analysis (FMEA and FMECA)"
