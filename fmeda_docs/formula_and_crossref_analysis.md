# FMEDA 報告公式深度分析與跨頁關聯

## 1. 公式總覽

本報告包含 27 個 sheet，共約 597,466 個公式。以下依功能分組解析每一組公式的物理意義、跨頁參考關係與計算邏輯。

---

## 2. FailureRateCalc -- 失效率計算引擎（127 個公式）

### 2.1 核心公式：半導體失效率預測模型

```
E23: =IF(B21="Package", FailureRateCalcIC!D129,
         (I21*M21*EXP(-0.35*O21) + (U21*K21)) * R21)
```

**物理意義**：這是整份 FMEDA 的失效率計算核心，基於 IEC 62380 / FIDES 可靠度預測模型。

- `I21` = 基礎失效率 lambda_base（查表自 FailureRateCalcIC 的元件類型對照表）
- `M21` = 電晶體數量（來自 `BlockList!E2`），反映 IC 複雜度
- `EXP(-0.35*O21)` = 技術成熟度衰減因子，O21 = 當前年份 - 1998（製程基準年）
  - **物理意義**：半導體製程每年成熟度提升，失效率以指數衰減，衰減常數 0.35 表示每 2 年失效率約降低 50%
- `U21` = SRAM 電晶體數量（來自 `BlockList!I2`），SRAM 有獨立的失效率模型
- `K21` = SRAM 基礎失效率
- `R21` = 品質因子（來自 `FailureRateCalcIC!B129`），反映是否通過車規認證
- 如果 B21="Package"，則直接引用封裝失效率 `FailureRateCalcIC!D129`

### 2.2 元件類型對照公式

```
I21: =IF($B$21=$AF$2,$AG$2, IF($B$21=$AF$3,$AG$3, ...))
K21: =IF($B$21=$AF$2,$AH$2, IF($B$21=$AF$3,$AH$3, ...))
```

**物理意義**：這是一個巢狀 IF 查表結構，根據 BlockList 中定義的元件類型（如 Si MOS: Digital circuits, High speed SRAM 等），從 AF-AH 欄的參考表中查找對應的基礎失效率。

### 2.3 跨頁參考關係

| 公式位置 | 參考來源 | 取得的資料 |
|----------|----------|-----------|
| B21 | BlockList!B2 | 元件類型名稱 |
| M21 | BlockList!E2 | 電晶體數量 |
| U21 | BlockList!I2 | SRAM 電晶體數量 |
| X21 | BlockList!$T$2 | 製造年份 |
| R21 | FailureRateCalcIC!B129 | 品質因子 |
| O21 | =X21-1998 | 技術成熟年數 |

### 2.4 統計失效率公式

```
AO14: =AVERAGE(220,250,200,160)
AQ14: =AVERAGE(0.68,0.57,0.54,0.65,0.4,0.49,0.54,0.676,0.499,0.525)
AR14: =AVERAGE(111/0.169,341/0.789,283/0.463,...)*1000000/1000000000
```

**物理意義**：這些是從多個可靠度數據來源（如 JEDEC、廠商測試報告）收集的實際失效數據，用 AVERAGE 取平均值作為基礎失效率的校準依據。AR 欄的 `*1000000/1000000000` 是將失效數/元件小時轉換為 FIT 單位（Failures In Time = 10^9 元件小時中的失效次數）。

---

## 3. FailureRateCalcIC -- IC 級失效率計算（111 個公式）

此 sheet 包含 142 行 x 14 列的 IC 子系統級失效率計算，為每個 IC 內部子系統（如 CPU core、SRAM block、Flash controller 等）分配獨立的失效率。

### 3.1 核心邏輯

每個子系統的失效率 = 基礎失效率 x 電晶體比例 x 環境因子

最終在 D129 匯總為整個 IC 的封裝失效率。

---

## 4. BlockList -- 元件清單與屬性（4,848 個公式）

### 4.1 結構

209 行 x 146 列，每行代表一個 IC 子系統（Block），欄位包含：
- 元件名稱、類型、電晶體數量、SRAM 數量
- 階層結構（Structure Level 1, 2）
- 安全相關性標記
- 失效率分配

### 4.2 隱藏列的意義

列 W, X, Y, Z, AB, AE-AH 被隱藏，這些通常包含：
- 中間計算結果
- 內部參考數據
- 不需要對外展示的輔助欄位

### 4.3 跨頁關係

BlockList 是整份 FMEDA 的「元件資料庫」，被以下 sheet 大量引用：
- FailureRateCalc 引用元件類型和電晶體數量
- FMEDA 主表引用元件名稱和屬性
- BlockEvaluation 引用元件清單進行評估

---

## 5. FMEDA 主表 -- 計算引擎（562,887 個公式）

### 5.1 規模

1659 行 x 463 列，是整份報告的核心計算引擎。每一行代表一個「元件-失效模式」組合，每一列代表一個評估維度。

### 5.2 FMEDA 主表公式分類

#### 5.2.1 失效模式分類公式

根據 FlowChart 中定義的決策流程，將每個失效模式分類為：
- **Safe Fault (S)**：安全故障，不影響安全目標
- **Single-Point Fault (SPF)**：單點故障，直接違反安全目標
- **Residual Fault (RF)**：殘餘故障，安全機制覆蓋不完全
- **Detected MPF (MPF-D)**：被偵測到的多點故障
- **Perceived MPF (MPF-P)**：被感知到的多點故障
- **Latent MPF (MPF-L)**：潛在多點故障

#### 5.2.2 失效率分配公式

每個失效模式的失效率 = 元件總失效率 x 失效模式分配比例 x 診斷覆蓋率

#### 5.2.3 安全度量計算

最終匯總為 ISO 26262 要求的三大安全度量：
- **SPFM** (Single-Point Fault Metric) = 1 - (SPF + RF) / (Total Safety-Related)
- **LFM** (Latent Fault Metric) = 1 - Latent MPF / (Total Safety-Related - SPF - RF)
- **PMHF** (Probabilistic Metric for Hardware Failure) = SPF_rate + RF_rate

### 5.3 隱藏列的意義

列 D, N, AH-AM, BS, CD, HR 被隱藏：
- **D 列**：可能包含內部元件 ID
- **N 列**：可能包含診斷機制的內部代碼
- **AH-AM 列**：中間計算欄位（如各安全目標的個別失效率）
- **BS, CD, HR 列**：進階計算或備用欄位

---

## 6. SafetyGoalViolations -- 安全目標違反分析（316 個公式）

### 6.1 核心公式

```
D4: =SUMPRODUCT((FMEDA!$C$4:$C$1653=SafetyGoalViolations!$A4)*(FMEDA!E$3:E$1653))
```

**物理意義**：使用 SUMPRODUCT 從 FMEDA 主表中，按元件名稱（C 欄）篩選，加總特定安全目標的失效率。這是一個樞紐分析（Pivot）操作，將 FMEDA 的逐行資料匯總為按元件的安全目標違反統計。

### 6.2 統計公式

```
R4: =COUNTIF(FMEDA!M4:M1653,"M")  -- 計算標記為 "M" 的失效模式數量
S4: =COUNTIF(FMEDA!M4:M1653,"N")  -- 計算標記為 "N" 的失效模式數量
```

### 6.3 隱藏行的意義

行 5-22 被隱藏，可能包含：
- 個別安全目標的詳細分解
- 不同 ASIL 等級的分別計算
- 中間匯總結果

---

## 7. CCF Calc. On-Chip Red. -- 晶片內冗餘 beta 因子（17 個公式）

### 7.1 計算結構

```
基礎 beta 因子 betaB-IC = 33%（IEC 61508 Ed.2 預設值）

增加 beta 的技術措施（正面）：
  E5: =C5*F5  （Watchdog on-chip: 5% x 1 = 5%）
  E6: =C6*F6  （其他監控元件: 5% x 1 = 5%）
  E8: =C8*F8  （Block 間比較: 4% x 1 = 4%）
  E10: =SUM(E5:E8)  （總增加量 = 14%）

減少 beta 的技術措施（負面）：
  E14-E24: =C_n*F_n  （各項減少措施，全部為 0）
  E26: =SUM(E14:E24)  （總減少量 = 0%）

最終 beta 因子：
  E30: =E28+E10-E26 = 33% + 14% - 0% = 47%
```

**物理意義**：beta 因子量化了「共因失效」的可能性。47% 表示在晶片內冗餘架構中，有 47% 的機率兩個冗餘通道會因為同一個根本原因同時失效。這個值越低越好。

### 7.2 與 DFA 報告的差異

DFA 報告中的 On-Chip beta 因子為 33%（基礎值 + 14% - 14% = 33%），而 FMEDA 報告中為 47%（33% + 14% - 0% = 47%）。這表示 FMEDA 報告的 IC 設計中，減少 beta 的措施尚未實施。

---

## 8. CCF Calc. Logic -- 邏輯子系統 beta 因子（67 個公式）

### 8.1 計算結構

基於 IEC 61508 Ed.2 Table D.2 的評分系統，透過 7 大類問題的 Yes/No 回答計算 beta 因子：

1. **Separation/segregation**（分離/隔離）
2. **Diversity/Redundancy**（多樣性/冗餘）
3. **Complexity/Design/Application**（複雜度/設計/應用）
4. **Assessment/Analysis**（評估/分析）
5. **Competence/Training**（能力/訓練）
6. **Environmental control**（環境控制）
7. **Environmental testing**（環境測試）

### 8.2 Z 值查表

```
N5-Q10: IEC 61508 Table D.2 的 Z 值查表
  - 依據診斷覆蓋率（99%/90%/60%）和測試間隔（<1min / 1-5min / >5min）
  - 查出對應的 Z 值
```

### 8.3 最終 beta 計算

```
beta = MAX(betaB-IC * (sum_of_scores / max_possible_score), minimum_beta)
```

---

## 9. SGVEvaluation -- 安全目標違反評估（1,034 個公式）

### 9.1 結構

33 行 x 57 列，每行代表一個安全目標，每列代表一個評估維度（permanent/transient 的各種失效率分類）。

### 9.2 核心公式

從 FMEDA 主表匯總，計算每個安全目標的：
- 總失效率（permanent + transient）
- 安全相關失效率
- 各類故障（SPF, RF, MPF-D, MPF-L）的失效率
- SPFM 和 LFM

---

## 10. BlockEvaluation -- 元件級評估（12,600 個公式）

### 10.1 結構

211 行 x 63 列，每行代表一個 Block（元件），匯總該元件所有失效模式的評估結果。

### 10.2 三個變體

| Sheet | 標準 | 差異 |
|-------|------|------|
| BlockEvaluation | ISO 26262 | 主要評估，使用 SPFM/LFM/PMHF |
| BlockEval-IEC61508_opt1 | IEC 61508 Option 1 | 使用 SFF (Safe Failure Fraction) |
| BlockEval-IEC61508_opt2 | IEC 61508 Option 2 | 使用 PFH (Probability of Failure per Hour) |

---

## 11. BlockTypeEvaluation -- 元件類型級評估（366 個公式）

### 11.1 結構

17 行 x 61 列，按元件類型（如 Si MOS: Digital circuits, High speed SRAM, ROM, Linear circuits 等）匯總。

### 11.2 三個變體

同 BlockEvaluation，也有 ISO 26262 和 IEC 61508 opt1/opt2 三個版本。

---

## 12. SRAM Tran FIT -- SRAM 電晶體失效率（231 個公式）

### 12.1 物理意義

專門計算 SRAM 記憶體的電晶體級失效率，因為 SRAM 的失效模式（如 soft error、stuck-at）與邏輯電路不同，需要獨立的失效率模型。

### 12.2 考量因素

- 製程節點（feature size）
- 電壓
- 溫度
- 宇宙射線引起的軟錯誤（Soft Error Rate, SER）

---

## 13. 跨頁資料流向總圖

```
BlockList (元件資料庫)
    |
    v
FailureRateCalc (失效率計算) <--- FailureRateCalcIC (IC級失效率)
    |                                    ^
    |                                    |
    v                              SRAM Tran FIT (SRAM失效率)
FMEDA 主表 (562,887 公式)
    |
    +---> SafetyGoalViolations (安全目標違反)
    |
    +---> SGVEvaluation (安全目標評估) ---> 最終 SPFM/LFM/PMHF
    |
    +---> BlockEvaluation (元件級評估)
    |         +---> BlockEval-IEC61508_opt1
    |         +---> BlockEval-IEC61508_opt2
    |
    +---> BlockTypeEvaluation (類型級評估)
              +---> BlockTypeEval-IEC61508_opt1
              +---> BlockTypeEval-IEC61508_opt2

CCF Calc. On-Chip Red. (beta因子) ---> 修正 FMEDA 的共因失效
CCF Calc. Logic (beta因子) -----------> 修正 FMEDA 的共因失效

DiagnosisInternal (內部診斷) ---> FMEDA 的診斷覆蓋率
DiagnosisExternal (外部診斷) ---> FMEDA 的診斷覆蓋率
```

---

## 14. 公式物理意義總結

| 公式類別 | 物理意義 | 所在 Sheet |
|----------|----------|-----------|
| 失效率預測 | 基於 IEC 62380 的半導體失效率模型 | FailureRateCalc |
| 技術成熟度衰減 | EXP(-0.35*年數)，製程每2年失效率降50% | FailureRateCalc |
| FIT 單位轉換 | *1E6/1E9，將失效數/元件時轉為 FIT | FailureRateCalc |
| 失效模式分配 | 總失效率 x 分配比例 x 診斷覆蓋率 | FMEDA |
| SPFM 計算 | 1 - (SPF+RF)/Total_Safety_Related | SGVEvaluation |
| LFM 計算 | 1 - Latent/(Total-SPF-RF) | SGVEvaluation |
| PMHF 計算 | SPF_rate + RF_rate | SGVEvaluation |
| beta 因子 | 共因失效機率，基於 IEC 61508 評分 | CCF Calc sheets |
| SUMPRODUCT 樞紐 | 從 FMEDA 匯總到各評估 sheet | SafetyGoalViolations |
| SFF 計算 | (Safe + Detected) / Total | BlockEval-IEC61508 |
