/*
 * FMEDA Report Data Model
 * Contains all structured data from the RD-03-008-01 FMEDA Report analysis
 */

export interface FmedaSheetInfo {
  id: string;
  name: string;
  category: string;
  categoryColor: string;
  dialecticIdeal: string;
  purpose: string;
  content: string;
  formulaCount?: number;
  formulas?: FmedaFormulaInfo[];
  images?: { name: string; description: string; purpose: string }[];
  isHidden?: boolean;
  isEmpty?: boolean;
}

export interface FmedaFormulaInfo {
  formula: string;
  location: string;
  standard: string;
  physicalMeaning: string;
  variables?: { name: string; meaning: string }[];
}

export interface FmedaReferenceDoc {
  id: number;
  name: string;
  version: string;
  role: string;
  details: string;
}

// ─── FMEDA Sheet Data ───

export const fmedaSheets: FmedaSheetInfo[] = [
  {
    id: "fmeda-revision-history",
    name: "Revision History",
    category: "行政管理",
    categoryColor: "bg-slate-500",
    dialecticIdeal: "身份與追溯",
    purpose: "記錄 FMEDA 報告模板的版本演進歷史，確保文件的可追溯性。ISO 26262 Part 8 要求所有安全相關文件必須有完整的變更歷史。",
    content: "版本 A，生效日期 2025-10-18，由 Mike Rao 撰寫，標記為「New added」。頁面頂部嵌入了 SiliconMotion 慧榮科技的公司 Logo。",
    images: [{ name: "SiliconMotion Logo", description: "慧榮科技公司 Logo", purpose: "品牌識別與文件歸屬" }]
  },
  {
    id: "fmeda-cover",
    name: "Cover",
    category: "行政管理",
    categoryColor: "bg-slate-500",
    dialecticIdeal: "身份與追溯",
    purpose: "文件的「身份證」，提供專案識別資訊、參與者資訊和品質保證簽核。文件編號 RD-03-008-01。",
    content: "文件編號 RD-03-008-01，文件標題 FMEDA Report，撰寫者 Mike Rao。專案名稱、產品名稱、ASIL 等級、審查者、批准者均為待填狀態。",
    images: [{ name: "SiliconMotion Logo", description: "慧榮科技公司 Logo（黑底白字版本）", purpose: "品牌識別" }]
  },
  {
    id: "fmeda-process",
    name: "Process",
    category: "定義與方法論",
    categoryColor: "bg-blue-500",
    dialecticIdeal: "方法論基礎",
    purpose: "定義 FMEDA 的執行方法論，描述從元件識別到最終評估的完整流程，確保分析的系統性和可重複性。",
    content: "描述 FMEDA 的執行步驟，引用 ISO 26262-5 和 IEC 61508 的方法論要求。包含一張流程圖圖片。",
    images: [{ name: "FMEDA Process Flow", description: "FMEDA 執行流程圖", purpose: "視覺化分析步驟" }]
  },
  {
    id: "fmeda-references",
    name: "References",
    category: "定義與方法論",
    categoryColor: "bg-blue-500",
    dialecticIdeal: "權威性基礎",
    purpose: "建立整份報告的法規基礎與知識來源，列出 8 份核心參考文件，確保所有分析方法和判斷標準都有權威依據。",
    content: "引用了 IEC TR 62380、IEC 61709、ISO 26262:2011/2018 系列、SN 29500、IEC 61508、N2N90008 工具評估報告等 8 份國際標準文件。"
  },
  {
    id: "fmeda-abbreviations",
    name: "Abbreviations",
    category: "定義與方法論",
    categoryColor: "bg-blue-500",
    dialecticIdeal: "共同語言",
    purpose: "統一所有技術術語的縮寫，消除溝通歧義。定義 SPFM、LFM、PMHF、CCF、DC 等核心縮寫。",
    content: "包含 ASIL、CCF、DC、FMEDA、FTTI、LFM、PMHF、SM、SPFM、SFF、PFH 等核心縮寫的全稱與定義。"
  },
  {
    id: "fmeda-definitions",
    name: "Definitions",
    category: "定義與方法論",
    categoryColor: "bg-blue-500",
    dialecticIdeal: "共同語言",
    purpose: "提供 FMEDA 分析中所有核心概念的精確定義與圖示說明，確保所有參與者對安全度量（SPFM、LFM、PMHF）有一致的理解。",
    content: "包含 3 張關鍵概念圖，分別視覺化了 SPFM、LFM、PMHF 的計算邏輯和失效分類體系。",
    images: [
      { name: "SPFM 概念圖", description: "展示安全相關失效率如何被分解為單點故障和殘餘故障", purpose: "定義 SPFM 計算邏輯" },
      { name: "LFM 概念圖", description: "展示多點故障如何被分為已偵測和潛在兩類", purpose: "定義 LFM 計算邏輯" },
      { name: "PMHF 概念圖", description: "展示所有失效類型如何匯總為每小時的硬體失效機率", purpose: "定義 PMHF 計算邏輯" }
    ]
  },
  {
    id: "fmeda-legend",
    name: "Legend（隱藏）",
    category: "定義與方法論",
    categoryColor: "bg-blue-500",
    dialecticIdeal: "工具操作手冊",
    purpose: "記錄 FMEDA Excel 工具的使用步驟，包括如何填寫 BlockList、如何執行巨集合併、如何分配診斷覆蓋率。被隱藏是因為它是「工具面向」而非「報告面向」的內容。",
    content: "包含 FMEDA 工具的操作指南，定義了顏色編碼、填寫規則和巨集操作步驟。",
    isHidden: true
  },
  {
    id: "fmeda-flowchart",
    name: "FlowChart",
    category: "定義與方法論",
    categoryColor: "bg-blue-500",
    dialecticIdeal: "決策地圖",
    purpose: "視覺化故障分類決策流程，展示 ISO 26262-5 Annex C 的故障分類步驟（B1-B12），以及完整的 DFA 工作流程圖。",
    content: "包含 4 張圖片，展示 FMEDA 的故障分類決策流程和工作流程。",
    images: [
      { name: "故障分類流程圖", description: "B1-B12 故障分類決策步驟", purpose: "視覺化故障分類邏輯" }
    ]
  },
  {
    id: "fmeda-failuremodes",
    name: "FailureModes",
    category: "失效率計算",
    categoryColor: "bg-emerald-500",
    dialecticIdeal: "失效知識庫",
    purpose: "失效模式知識庫，列出所有可能的半導體失效模式（如 stuck-at-0, stuck-at-1, drift, open, short 等），為 FMEDA 主表提供標準化定義。",
    content: "定義了所有半導體元件的失效模式分類，包括永久性故障、暫態故障和間歇性故障。"
  },
  {
    id: "fmeda-blocklist",
    name: "BlockList",
    category: "失效率計算",
    categoryColor: "bg-emerald-500",
    dialecticIdeal: "分析對象資料庫",
    purpose: "列出所有需要分析的硬體元件（Block），包括元件名稱、類型、數量、失效率分配比例等。這是 FMEDA 主表的輸入數據來源。",
    content: "包含所有 IC 功能模組的清單，每個模組都有對應的失效率分配和安全相關性標記。"
  },
  {
    id: "fmeda-sram-tran-fit",
    name: "SRAM Tran FIT",
    category: "失效率計算",
    categoryColor: "bg-emerald-500",
    dialecticIdeal: "專用失效模型",
    purpose: "SRAM 專用失效率模型。由於 SRAM 的失效機制（如 soft error）與邏輯電路不同，需要獨立的失效率計算模型。",
    content: "計算 SRAM 的 Transistor-level FIT rate，考慮 soft error（SEU/SET）和 hard error 兩種機制。"
  },
  {
    id: "fmeda-block-diagram",
    name: "Block-Diagram",
    category: "失效率計算",
    categoryColor: "bg-emerald-500",
    dialecticIdeal: "架構視覺化",
    purpose: "展示 IC 內部各功能模組的連接關係和安全機制的部署位置，作為 FMEDA 分析的架構基礎。",
    content: "系統架構方塊圖，展示各功能模組之間的連接關係。",
    images: [{ name: "Block Diagram", description: "IC 系統架構方塊圖", purpose: "視覺化系統架構" }]
  },
  {
    id: "fmeda-failureratecalc",
    name: "FailureRateCalc",
    category: "失效率計算",
    categoryColor: "bg-emerald-500",
    dialecticIdeal: "失效率預測引擎",
    purpose: "基於 IEC TR 62380 的數學模型，計算整個 IC 的基礎失效率。這是整份 FMEDA 所有量化計算的起點。",
    content: "使用 IEC TR 62380 的半導體失效率預測模型，考慮電晶體數量、使用年限、環境因子等參數。",
    formulaCount: 500,
    formulas: [{
      formula: "λ = (λ_base × N_transistors × EXP(-0.35 × years) + N_sram × λ_sram) × Q_factor",
      location: "FailureRateCalc",
      standard: "IEC TR 62380",
      physicalMeaning: "IC 總失效率預測：基於電晶體數量、使用年限衰減、SRAM 貢獻和品質因子的綜合計算",
      variables: [
        { name: "λ_base", meaning: "基礎失效率（由製程技術決定）" },
        { name: "N_transistors", meaning: "電晶體數量" },
        { name: "years", meaning: "使用年限（指數衰減因子）" },
        { name: "N_sram", meaning: "SRAM 位元數" },
        { name: "λ_sram", meaning: "SRAM 單位失效率" },
        { name: "Q_factor", meaning: "品質因子（封裝、環境等）" }
      ]
    }],
    images: [
      { name: "IEC TR 62380 模型參數", description: "失效率計算的參數表格", purpose: "定義計算輸入" }
    ]
  },
  {
    id: "fmeda-failureratecalcic",
    name: "FailureRateCalcIC",
    category: "失效率計算",
    categoryColor: "bg-emerald-500",
    dialecticIdeal: "失效率分配器",
    purpose: "將 IC 總失效率分配到各子系統。使用面積比例法或功能複雜度法，將 FailureRateCalc 計算的總失效率分配到 BlockList 中的每個元件。",
    content: "根據各模組的面積比例或複雜度，將總失效率分配到每個功能模組。",
    formulaCount: 300,
    formulas: [{
      formula: "λ_block = λ_total × (Area_block / Area_total)",
      location: "FailureRateCalcIC",
      standard: "ISO 26262-11",
      physicalMeaning: "將 IC 總失效率按面積比例分配到各功能模組",
      variables: [
        { name: "λ_total", meaning: "IC 總失效率（來自 FailureRateCalc）" },
        { name: "Area_block", meaning: "該模組的面積" },
        { name: "Area_total", meaning: "IC 總面積" }
      ]
    }]
  },
  {
    id: "fmeda-main",
    name: "FMEDA（核心分析表）",
    category: "核心分析",
    categoryColor: "bg-amber-500",
    dialecticIdeal: "計算引擎核心",
    purpose: "整份報告的計算引擎。1659 行 × 463 列，562,887 個公式。對每個「元件-失效模式」組合進行獨立評估，計算每種失效的安全分類和對安全度量的貢獻。",
    content: "FMEDA 主表是整份報告的核心，每一行代表一個「元件-失效模式」組合，每一列對應一個安全目標或計算維度。公式根據診斷覆蓋率將失效分類為 Safe/SPF/RF/MPF-detected/MPF-latent。",
    formulaCount: 562887,
    formulas: [
      {
        formula: "IF(DC ≥ 99%, \"Safe\", IF(DC ≥ 90%, \"RF\", IF(DC > 0%, \"MPF-D\", \"MPF-L\")))",
        location: "FMEDA 主表各安全目標列",
        standard: "ISO 26262-5 Annex C",
        physicalMeaning: "根據診斷覆蓋率對每種失效模式進行安全分類",
        variables: [
          { name: "DC", meaning: "診斷覆蓋率（Diagnostic Coverage）" },
          { name: "Safe", meaning: "安全故障（不影響安全目標）" },
          { name: "SPF", meaning: "單點故障（無安全機制覆蓋）" },
          { name: "RF", meaning: "殘餘故障（安全機制未完全覆蓋）" },
          { name: "MPF-D", meaning: "多點故障-已偵測" },
          { name: "MPF-L", meaning: "多點故障-潛在" }
        ]
      }
    ]
  },
  {
    id: "fmeda-diagnosis-internal",
    name: "DiagnosisInternal",
    category: "核心分析",
    categoryColor: "bg-amber-500",
    dialecticIdeal: "內部安全機制",
    purpose: "定義 IC 內部的安全機制及其診斷覆蓋率。列出所有內部診斷機制（如 ECC、Parity、Watchdog、BIST 等）及其對各失效模式的覆蓋能力。",
    content: "內部診斷機制清單，每個機制都有對應的覆蓋率百分比和適用的失效模式範圍。"
  },
  {
    id: "fmeda-diagnosis-external",
    name: "DiagnosisExternal",
    category: "核心分析",
    categoryColor: "bg-amber-500",
    dialecticIdeal: "外部安全機制",
    purpose: "定義 IC 外部（系統層級）的安全機制及其診斷覆蓋率。列出所有外部診斷機制（如 End-to-End CRC、Alive Counter、Timeout 等）。",
    content: "外部診斷機制清單，定義系統層級的安全機制如何補充 IC 內部的診斷能力。"
  },
  {
    id: "fmeda-safety-goal-violations",
    name: "SafetyGoalViolations",
    category: "核心分析",
    categoryColor: "bg-amber-500",
    dialecticIdeal: "安全目標映射",
    purpose: "將 FMEDA 的元件級分析結果映射到安全目標級。計算每個安全目標被違反的機率，為 SGVEvaluation 提供輸入。",
    content: "將 FMEDA 主表中每個元件-失效模式的分析結果匯總到安全目標維度，計算每個安全目標的 SPFM、LFM 和 PMHF 貢獻。",
    formulaCount: 15000
  },
  {
    id: "fmeda-ccf-on-chip",
    name: "CCF Calc. On-Chip Red.",
    category: "CCF 分析",
    categoryColor: "bg-rose-500",
    dialecticIdeal: "晶片內冗餘信心",
    purpose: "量化晶片內部冗餘架構的共因失效風險。基於 IEC 61508 Annex D 的評分方法，計算 beta 因子。結果：βIC = 47%。",
    content: "核心公式 βIC = βB-IC + Σ(增加因子) - Σ(降低因子)，其中 βB-IC = 33% 是基礎 β 因子。包含 4 項增加因子和 11 項降低因子。",
    formulaCount: 100,
    formulas: [{
      formula: "βIC = βB-IC + Σ(增加因子) - Σ(降低因子)",
      location: "CCF Calc. On-Chip Red.",
      standard: "IEC 61508 Ed. 2 Annex D（延伸）",
      physicalMeaning: "量化晶片內冗餘的共因故障比例。βB-IC = 33% 意味著在沒有任何措施的情況下，33% 的故障被認為是共因故障。47% 表示增加因子使風險進一步升高。",
      variables: [
        { name: "βB-IC", meaning: "晶片內冗餘基礎 β 因子 = 33%" },
        { name: "增加因子（4 項）", meaning: "晶片內部耦合因素，每項 +2% ~ +5%" },
        { name: "降低因子（11 項）", meaning: "設計措施，每項 -2% ~ -9%" }
      ]
    }]
  },
  {
    id: "fmeda-ccf-logic",
    name: "CCF Calc. Logic",
    category: "CCF 分析",
    categoryColor: "bg-rose-500",
    dialecticIdeal: "邏輯子系統信心",
    purpose: "量化邏輯子系統的共因失效風險。使用 IEC 61508 Table D.2 的 Z 值查表方法，計算 beta 因子。結果：β = 5%（最高風險等級）。",
    content: "核心公式 Score S = Σx + Σy（不考慮診斷）和 Score SD = Σx × (z + 1) + Σy（考慮診斷）。8 大評估類別，β 值查表。",
    formulaCount: 100,
    formulas: [
      {
        formula: "S = Σx + Σy",
        location: "CCF Calc. Logic",
        standard: "IEC 61508 Ed. 2 Annex D, Table D.1",
        physicalMeaning: "不考慮診斷的基本信心分數",
        variables: [
          { name: "x", meaning: "各評估類別的 X 分數" },
          { name: "y", meaning: "各評估類別的 Y 分數" }
        ]
      },
      {
        formula: "β = f(S)：S<45→5%, 45≤S<70→2%, 70≤S<120→1%, S≥120→0.5%",
        location: "CCF Calc. Logic",
        standard: "IEC 61508 Ed. 2 Annex D, Table D.4",
        physicalMeaning: "將信心分數轉換為 β 因子百分比",
        variables: [
          { name: "S", meaning: "信心分數總和" },
          { name: "β", meaning: "共因故障比例" }
        ]
      }
    ]
  },
  {
    id: "fmeda-sgv-evaluation",
    name: "SGVEvaluation",
    category: "評估結果",
    categoryColor: "bg-indigo-500",
    dialecticIdeal: "安全目標級判決",
    purpose: "呈現安全目標級的最終評估結果，計算每個安全目標的 SPFM、LFM 和 PMHF，與 ISO 26262-5 Table 6/7/8 的目標值進行比較。",
    content: "匯總 SafetyGoalViolations 的結果，呈現每個安全目標是否達標。包含圖表視覺化。",
    formulaCount: 150,
    images: [{ name: "SGV 評估圖表", description: "安全目標評估結果視覺化", purpose: "直觀呈現達標狀態" }]
  },
  {
    id: "fmeda-block-evaluation",
    name: "BlockEvaluation",
    category: "評估結果",
    categoryColor: "bg-indigo-500",
    dialecticIdeal: "元件級判決",
    purpose: "呈現元件級的最終評估結果，計算每個功能模組的 SPFM、LFM 和 PMHF 貢獻。",
    content: "匯總 FMEDA 主表的結果到每個 Block 維度，呈現各模組的安全度量貢獻。",
    formulaCount: 200,
    images: [{ name: "Block 評估圖表", description: "元件級評估結果視覺化", purpose: "識別高風險模組" }]
  },
  {
    id: "fmeda-block-eval-iec61508-opt1",
    name: "BlockEval-IEC61508_opt1",
    category: "評估結果",
    categoryColor: "bg-indigo-500",
    dialecticIdeal: "IEC 61508 Option 1 判決",
    purpose: "按照 IEC 61508 Option 1 的方法計算 SFF（Safe Failure Fraction）和 PFH（Probability of Dangerous Failure per Hour）。",
    content: "使用 IEC 61508 的 Route 1H 方法，計算 SFF 和 PFH，與 SIL 等級要求進行比較。",
    formulaCount: 3000
  },
  {
    id: "fmeda-block-eval-iec61508-opt2",
    name: "BlockEval-IEC61508_opt2",
    category: "評估結果",
    categoryColor: "bg-indigo-500",
    dialecticIdeal: "IEC 61508 Option 2 判決",
    purpose: "按照 IEC 61508 Option 2 的方法計算 SFF 和 PFH，考慮不同的診斷測試間隔。",
    content: "使用 IEC 61508 的 Route 2H 方法，考慮不同的 proof test interval。",
    formulaCount: 3000
  },
  {
    id: "fmeda-blocktype-evaluation",
    name: "BlockTypeEvaluation",
    category: "評估結果",
    categoryColor: "bg-indigo-500",
    dialecticIdeal: "元件類型級判決",
    purpose: "將評估結果按元件類型（如 Logic、SRAM、Analog 等）匯總，識別哪種類型的元件對安全度量的影響最大。",
    content: "按元件類型維度匯總 FMEDA 結果，幫助設計團隊聚焦改進方向。",
    formulaCount: 6000,
    images: [{ name: "BlockType 評估圖表", description: "元件類型級評估結果", purpose: "識別高風險元件類型" }]
  },
  {
    id: "fmeda-blocktype-eval-iec61508-opt1",
    name: "BlockTypeEval-IEC61508_opt1",
    category: "評估結果",
    categoryColor: "bg-indigo-500",
    dialecticIdeal: "IEC 61508 類型級 Option 1",
    purpose: "按元件類型維度呈現 IEC 61508 Option 1 的評估結果。",
    content: "按元件類型匯總 IEC 61508 Option 1 的 SFF 和 PFH 計算結果。",
    formulaCount: 3000
  },
  {
    id: "fmeda-blocktype-eval-iec61508-opt2",
    name: "BlockTypeEval-IEC61508_opt2",
    category: "評估結果",
    categoryColor: "bg-indigo-500",
    dialecticIdeal: "IEC 61508 類型級 Option 2",
    purpose: "按元件類型維度呈現 IEC 61508 Option 2 的評估結果。",
    content: "按元件類型匯總 IEC 61508 Option 2 的 SFF 和 PFH 計算結果。",
    formulaCount: 3000
  }
];

// ─── FMEDA Reference Documents ───

export const fmedaReferenceDocuments: FmedaReferenceDoc[] = [
  { id: 1, name: "IEC TR 62380:2004", version: "2004", role: "失效率預測公式和參數的來源，用於 FailureRateCalc", details: "提供電子元件的可靠度預測模型，包括半導體、被動元件和機電元件的失效率計算公式。雖然已被撤回，但其保守性使其在功能安全領域仍然被廣泛使用。" },
  { id: 2, name: "IEC 61709", version: "2017", role: "元件失效率參考條件，補充 IEC TR 62380", details: "定義了電子元件在參考條件下的失效率數據，為失效率計算提供基準值。" },
  { id: 3, name: "ISO 26262-5:2018", version: "2nd Ed.", role: "安全度量定義（SPFM/LFM/PMHF）和目標值", details: "定義了硬體安全度量的計算方法和 ASIL 等級對應的目標值。Table 6/7/8 是 FMEDA 評估的最終判斷標準。" },
  { id: 4, name: "ISO 26262-9:2018", version: "2nd Ed.", role: "相依故障分析方法，CCF 計算的法規基礎", details: "第 7 章定義了相依故障分析的要求，是 CCF 計算 sheet 的法規基礎。" },
  { id: 5, name: "ISO 26262-11:2018", version: "1st Ed.", role: "半導體 FMEDA 核心指引，定義了分析方法和流程", details: "2018 年新增的半導體專用指引，定義了 FMEDA 的具體執行方法。" },
  { id: 6, name: "SN 29500", version: "2010", role: "Siemens 失效率數據手冊，補充 IEC TR 62380", details: "提供額外的元件失效率數據，特別是對於 IEC TR 62380 未涵蓋的元件類型。" },
  { id: 7, name: "IEC 61508 Ed. 2", version: "2010", role: "β-factor 計算方法（Annex D）和 SFF/PFH 計算", details: "Part 6 Annex D 提供了 β-factor 計算方法，Part 2 定義了 SFF 和 PFH 的計算方法。" },
  { id: 8, name: "N2N90008 Tool Qualification Report", version: "—", role: "FMEDA 工具鑑定證據", details: "證明 FMEDA Excel 工具本身的可信度，滿足 ISO 26262-8 對工具鑑定的要求。" }
];

// ─── FMEDA Formula Chain ───

export const fmedaFormulaChain = [
  { step: 1, from: "IEC TR 62380 模型參數", to: "FailureRateCalc", description: "使用標準模型計算 IC 總失效率" },
  { step: 2, from: "FailureRateCalc", to: "FailureRateCalcIC", description: "按面積比例分配到各子系統" },
  { step: 3, from: "FailureRateCalcIC", to: "BlockList", description: "建立元件清單 + 失效率分配" },
  { step: 4, from: "BlockList + FailureModes", to: "FMEDA 主表", description: "對每個元件-失效模式組合進行分析" },
  { step: 5, from: "DiagnosisInt/Ext", to: "FMEDA 主表", description: "提供診斷覆蓋率數據" },
  { step: 6, from: "FMEDA 主表", to: "SafetyGoalViolations", description: "映射到安全目標級" },
  { step: 7, from: "FMEDA 主表", to: "BlockEvaluation", description: "匯總到元件級（SPFM/LFM/PMHF）" },
  { step: 8, from: "BlockEvaluation", to: "BlockEval-IEC61508", description: "計算 IEC 61508 的 SFF/PFH" },
  { step: 9, from: "BlockEvaluation", to: "BlockTypeEvaluation", description: "按元件類型匯總" },
  { step: 10, from: "CCF Calc sheets", to: "Evaluation sheets", description: "β 因子修正安全度量" }
];

// ─── FMEDA Dialectic Analysis ───

export interface DialecticRound {
  id: number;
  topic: string;
  thesis: { title: string; content: string };
  antithesis: { title: string; content: string };
  synthesis: { title: string; content: string };
  socraticQuestions: { type: string; question: string; answer: string }[];
}

export const fmedaDialecticRounds: DialecticRound[] = [
  {
    id: 1,
    topic: "FMEDA 的本質：計算工具還是論證系統？",
    thesis: {
      title: "FMEDA 是一個精密的計算工具",
      content: "562,887 個公式構成了一個龐大的計算引擎，從失效率預測到安全度量計算，每一步都是數學運算。它的價值在於計算的精確性和完整性。"
    },
    antithesis: {
      title: "FMEDA 不僅是計算，更是一個可審計的論證系統",
      content: "如果只是計算，用一個 Python 腳本就能完成。27 個 sheet 的存在是為了構建一個「論證鏈」——從定義共同語言到提供權威依據，再到量化證明，最終得出結論。每個 sheet 都是論證的一個環節。"
    },
    synthesis: {
      title: "FMEDA 是「以計算為手段的論證系統」",
      content: "計算是手段，論證是目的。562,887 個公式的存在不是為了「算出一個數字」，而是為了「用可驗證的方式證明安全性」。這就是為什麼 Excel 而非專用軟體被選擇——因為 Excel 的透明性使每一步計算都可被審計。"
    },
    socraticQuestions: [
      { type: "澄清", question: "當我們說 FMEDA 是一個「論證系統」時，我們具體指的是什麼？", answer: "指的是它不僅產出數字結果，更重要的是它構建了一條從「前提」到「結論」的完整邏輯鏈，每一步都有明確的依據和可驗證的計算過程。" },
      { type: "假設探究", question: "如果 FMEDA 只是一個計算工具，那為什麼需要 Definitions、References、Process 這些非計算性的 sheet？", answer: "因為計算本身沒有意義，只有在明確的定義框架和權威標準的支撐下，計算結果才能被接受為「證據」。這些 sheet 構建了計算的「語境」。" },
      { type: "證據追問", question: "有什麼證據支持 FMEDA 是一個論證系統而非僅僅是計算工具？", answer: "最直接的證據是 7 個評估結果 sheet 的存在——它們從三個維度（安全目標級、元件級、元件類型級）和兩個標準（ISO 26262、IEC 61508）呈現同一組數據。如果只是計算，一個結果表就夠了。" }
    ]
  },
  {
    id: 2,
    topic: "562,887 個公式：必要的複雜度還是過度工程？",
    thesis: {
      title: "562,887 個公式是分析粒度的必然結果",
      content: "1659 行（元件-失效模式組合）× 463 列（安全目標和計算維度）= 必然產生大量公式。每個公式都有明確的物理意義——它計算的是某個特定元件的某個特定失效模式對某個特定安全目標的影響。"
    },
    antithesis: {
      title: "這種複雜度暴露了 Excel 作為工具的局限性",
      content: "562,887 個公式意味著任何一個公式的錯誤都可能導致整份報告的結論失效。Excel 沒有內建的公式驗證機制，也沒有版本控制。這不是「必要的複雜度」，而是「工具選擇帶來的風險」。"
    },
    synthesis: {
      title: "複雜度是必要的，但需要工具鑑定來管理風險",
      content: "分析粒度決定了公式數量是不可避免的。但 Excel 的風險通過 N2N90008 工具鑑定報告來管理——這正是為什麼 References 中包含這份報告。工具的透明性（每個公式都可見）是其最大的安全優勢。"
    },
    socraticQuestions: [
      { type: "觀點探究", question: "從審計者的角度來看，562,887 個公式的透明性是優勢還是劣勢？", answer: "是雙刃劍。透明性意味著每個公式都可以被檢查，但數量之大使得全面審計在實踐中幾乎不可能。這就是為什麼需要工具鑑定——它證明公式生成過程是可信的。" },
      { type: "影響推論", question: "如果其中一個公式有錯誤，會產生什麼連鎖影響？", answer: "取決於錯誤的位置。如果在 FailureRateCalc 中，影響會級聯到所有下游 sheet。如果在 FMEDA 主表的某一行，只影響該元件-失效模式的評估。這就是為什麼公式鏈的理解至關重要。" }
    ]
  },
  {
    id: 3,
    topic: "隱藏的 Legend sheet：工具的雙重性質",
    thesis: {
      title: "Legend 被隱藏是合理的——它是工具指南，不是報告內容",
      content: "FMEDA 報告的受眾是安全審計者，他們關心的是分析結果和方法論，而不是「如何操作 Excel 工具」。隱藏 Legend 是為了保持報告的專業性和簡潔性。"
    },
    antithesis: {
      title: "隱藏 Legend 可能導致知識流失和操作風險",
      content: "如果 Legend 中記錄了關鍵的操作步驟（如巨集合併、顏色編碼規則），隱藏它意味著新的分析者可能無法正確使用工具。這違反了 ISO 26262 對知識管理的要求。"
    },
    synthesis: {
      title: "Legend 應該被分離為獨立的工具操作手冊",
      content: "正確的做法是將 Legend 的內容提取為一份獨立的「FMEDA 工具操作手冊」，而不是隱藏在 Excel 中。這樣既保持了報告的簡潔性，又確保了操作知識的可傳承性。"
    },
    socraticQuestions: [
      { type: "澄清", question: "Legend 中具體包含了哪些操作知識？", answer: "包括顏色編碼規則（綠色=安全、紅色=危險）、BlockList 的填寫步驟、巨集合併的操作方法、診斷覆蓋率的分配規則等。這些都是正確使用工具的關鍵知識。" },
      { type: "假設探究", question: "如果 Legend 不被隱藏而是公開，會對報告的可讀性產生什麼影響？", answer: "會增加報告的「噪音」——審計者不需要知道如何操作工具，他們只需要知道工具產出的結果是否正確。但對於工具的維護者和未來的分析者，這些資訊是不可或缺的。" }
    ]
  },
  {
    id: 4,
    topic: "β 因子 47%：保守的智慧還是設計的警訊？",
    thesis: {
      title: "47% 的 β 因子是保守但合理的評估",
      content: "βIC = 33%（基礎值）+ 14%（增加因子）- 0%（無降低措施）= 47%。基礎值 33% 來自 IEC 61508 的保守假設，增加因子反映了晶片內冗餘的固有耦合。這個值雖高，但誠實地反映了當前設計的狀態。"
    },
    antithesis: {
      title: "47% 意味著近半數的故障可能是共因故障，這是設計缺陷的信號",
      content: "如果 47% 的故障是共因故障，那麼冗餘架構的有效性大打折扣。這不是「保守」，而是「不夠好」。降低因子全部為零意味著沒有採取任何有效的 CCF 緩解措施。"
    },
    synthesis: {
      title: "47% 既是誠實的評估，也是明確的改進方向",
      content: "47% 的價值不在於它是否「好」或「壞」，而在於它精確地指出了改進空間。11 項降低因子中的每一項都是一個具體的設計改進方向。FMEDA 的真正價值不是證明「已經安全」，而是指出「如何更安全」。"
    },
    socraticQuestions: [
      { type: "證據追問", question: "47% 這個數字的可信度有多高？它的計算依據是什麼？", answer: "基礎值 33% 來自 IEC 61508 Annex D 對晶片內冗餘的特定假設。增加因子 14% 來自對晶片內部耦合因素的評估。可信度取決於評估者對晶片設計的理解深度。" },
      { type: "影響推論", question: "如果實施所有 11 項降低措施，β 因子最低可以降到多少？", answer: "理論上，11 項降低措施的總和為 -57%。但不是所有措施都可以同時實施，且有些措施之間存在互斥關係。實際可達到的最低值大約在 10-15% 左右。" }
    ]
  },
  {
    id: 5,
    topic: "三套評估體系的並存：冗餘還是必要？",
    thesis: {
      title: "三套評估體系是標準合規的必要要求",
      content: "ISO 26262 和 IEC 61508 是兩套不同的標準，各有不同的度量方法。ISO 26262 使用 SPFM/LFM/PMHF，IEC 61508 使用 SFF/PFH。兩套 IEC 61508 選項（Option 1/2）對應不同的診斷測試間隔假設。"
    },
    antithesis: {
      title: "三套體系增加了複雜度和不一致的風險",
      content: "如果三套體系給出不同的結論（例如 ISO 26262 達標但 IEC 61508 不達標），應該以哪個為準？這種不一致可能導致混淆和錯誤的安全決策。"
    },
    synthesis: {
      title: "三套體系提供了多角度的安全驗證，但需要統一的決策框架",
      content: "三套體系的並存反映了功能安全標準的演進歷史。ISO 26262 是汽車行業的專用標準，IEC 61508 是通用標準。兩者的並存確保了產品既滿足行業特定要求，也滿足通用安全要求。關鍵是建立明確的決策規則：以 ISO 26262 為主，IEC 61508 為輔。"
    },
    socraticQuestions: [
      { type: "觀點探究", question: "從客戶的角度來看，他們更關心哪套評估結果？", answer: "汽車 OEM 客戶主要關心 ISO 26262 的 SPFM/LFM/PMHF 結果。但如果產品也用於工業領域，IEC 61508 的 SFF/PFH 結果同樣重要。三套體系的存在是為了滿足不同市場的需求。" },
      { type: "假設探究", question: "如果只保留一套評估體系，應該保留哪一套？為什麼？", answer: "應該保留 ISO 26262 的體系，因為它是汽車行業的強制要求，且其度量方法（SPFM/LFM/PMHF）比 IEC 61508 的 SFF 更精細。但這意味著放棄了與工業安全標準的兼容性。" }
    ]
  }
];

// ─── FMEDA Statistics ───

export const fmedaStats = {
  totalSheets: 27,
  hiddenSheets: 1,
  totalFormulas: 597466,
  totalImages: 16,
  totalReferences: 8,
  mainTableRows: 1659,
  mainTableCols: 463,
  mainTableFormulas: 562887,
  betaOnChip: "47%",
  betaLogic: "5%"
};
