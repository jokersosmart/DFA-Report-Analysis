/*
 * DFA Report Data Model
 * Contains all structured data from the 00_MASTER_REPORT analysis
 */

export interface SheetInfo {
  id: string;
  name: string;
  category: string;
  categoryColor: string;
  platonicIdeal: string;
  purpose: string;
  content: string;
  formulas?: FormulaInfo[];
  images?: ImageInfo[];
  isHidden?: boolean;
  isEmpty?: boolean;
}

export interface FormulaInfo {
  formula: string;
  location: string;
  standard: string;
  section: string;
  physicalMeaning: string;
  variables?: { name: string; meaning: string; range?: string }[];
}

export interface ImageInfo {
  name: string;
  description: string;
  purpose: string;
}

export interface ReferenceDoc {
  id: number;
  name: string;
  version: string;
  role: string;
  details: string;
}

export interface DFICategory {
  id: number;
  name: string;
  nameCn: string;
  description: string;
  examples: string;
}

export interface BetaFactor {
  measure: string;
  delta: string;
  meaning: string;
  type: 'increase' | 'decrease';
}

// ─── Sheet Data ───

export const sheets: SheetInfo[] = [
  {
    id: "revision-history-template",
    name: "Revision History for Template",
    category: "基礎框架",
    categoryColor: "bg-slate-500",
    platonicIdeal: "身份與權威",
    purpose: "記錄 DFA 報告模板本身的演進歷史，確保模板的版本可追溯。這是品質管理系統（QMS）的基本要求，區分「模板的改版」與「報告內容的改版」。",
    content: "目前僅有一筆記錄——版本 A，生效日期 2025-10-18，由 Mike Rao 撰寫，標記為「New added」。表格預留了 10 行空白行供未來版本記錄。頁面頂部嵌入了 SiliconMotion 慧榮科技的公司 Logo。",
    images: [{ name: "SiliconMotion Logo", description: "慧榮科技公司 Logo", purpose: "品牌識別與文件歸屬" }]
  },
  {
    id: "cover",
    name: "Cover",
    category: "基礎框架",
    categoryColor: "bg-slate-500",
    platonicIdeal: "身份與權威",
    purpose: "作為文件的「身份證」，提供專案識別資訊、參與者資訊和品質保證簽核。這是 ISO 26262 要求的文件管理基本要素。",
    content: "文件編號 RD-03-009-01，文件標題 DFA 報告 / DFA Report，撰寫者 Mike Rao。專案名稱、產品名稱、ASIL 等級、審查者、批准者均為待填狀態。",
    isHidden: true,
    images: [{ name: "SiliconMotion Logo", description: "慧榮科技公司 Logo", purpose: "品牌識別" }]
  },
  {
    id: "revision-history-dfa",
    name: "Revision History of DFA",
    category: "基礎框架",
    categoryColor: "bg-slate-500",
    platonicIdeal: "身份與權威",
    purpose: "記錄 DFA 報告內容本身的改版歷史，與模板修訂歷史分開管理，確保報告內容的每次變更都有據可查。",
    content: "目前僅有一筆記錄——版本 A，生效日期 2025-10-18，由 Mike Rao 撰寫，標記為「New added」。"
  },
  {
    id: "references",
    name: "References",
    category: "知識基礎",
    categoryColor: "bg-blue-500",
    platonicIdeal: "共同語言",
    purpose: "建立整份報告的法規基礎與知識來源，確保所有分析方法和判斷標準都有權威依據。這是 ISO 26262 審計中最先被檢查的項目之一。",
    content: "引用了 8 份國際標準文件，涵蓋 ISO 26262 系列（Part 1, 5, 9, 10, 11）、IEC 61508、IEC TR 62380 和 IEC 60812。"
  },
  {
    id: "abbreviations",
    name: "Abbreviations",
    category: "知識基礎",
    categoryColor: "bg-blue-500",
    platonicIdeal: "共同語言",
    purpose: "統一所有技術術語的縮寫，消除溝通歧義。在跨國團隊和第三方審計中尤為重要。",
    content: "包含 ASIL、CCF、DFA、DFI、FTTI、LFM、PMHF、SM、SPFM 等核心縮寫的全稱與定義。"
  },
  {
    id: "definitions",
    name: "Definitions",
    category: "知識基礎",
    categoryColor: "bg-blue-500",
    platonicIdeal: "共同語言",
    purpose: "提供 DFA 分析中所有核心概念的精確定義與圖示說明，確保所有參與者對「相依故障」、「級聯故障」、「共因故障」等概念有一致的理解。",
    content: "包含 3 張關鍵圖片：ISO 26262 故障時間軸圖（Figure 5）、級聯故障示意圖、共因故障示意圖。",
    images: [
      { name: "故障時間軸圖 (Figure 5)", description: "展示三種場景的時間軸——無安全機制、有安全機制、有緊急操作模式", purpose: "定義 FTTI（故障容忍時間間隔）概念" },
      { name: "級聯故障示意圖", description: "Element A 的 Fault 1 → Failure A → Element B 的 Fault 2 → Failure B", purpose: "說明級聯故障威脅「免於干擾」的要求" },
      { name: "共因故障示意圖", description: "單一 Root Cause 同時影響 Element A 和 Element B", purpose: "說明 CCF 威脅「獨立性」的要求" }
    ]
  },
  {
    id: "iso-26262-9-ch7",
    name: "ISO 26262-9 CH.7",
    category: "方法論",
    categoryColor: "bg-emerald-500",
    platonicIdeal: "法律與地圖",
    purpose: "完整收錄 ISO 26262-9:2018 第 7 章「相依故障分析」的原文，作為整份報告的法規基礎。直接嵌入標準原文確保了分析的權威性與不可挑戰性。",
    content: "第 7 章定義了 DFA 的目標（確認所需的獨立性或免干擾性不被相依故障違反）、一般要求（在架構設計階段進行 DFA）、以及具體方法（§7.4.2.3）。"
  },
  {
    id: "methodology",
    name: "Methodology",
    category: "方法論",
    categoryColor: "bg-emerald-500",
    platonicIdeal: "法律與地圖",
    purpose: "將抽象的法規條文轉化為具體的分析方法論，定義本次 DFA 分析的範圍、方法和工具。它是連接「標準要求」與「實際分析」的橋樑。",
    content: "引用 ISO 26262-9:2011 §7.4.2.3 作為方法論基礎，定義了兩種分析方法——Block-based Analysis（定性分析）和 Cut Set-based Analysis（定量分析）。"
  },
  {
    id: "flowchart",
    name: "Flowchart",
    category: "方法論",
    categoryColor: "bg-emerald-500",
    platonicIdeal: "法律與地圖",
    purpose: "將整個 DFA 過程視覺化為一張地圖，讓創作者和審計者都能一目了然地知道「我們現在在哪裡」以及「下一步要去哪裡」。",
    content: "包含 10 張圖片，最重要的是 Figure 23 — DFA Workflow，定義了 B1 到 B12 的完整工作流程。分為三個主要迴圈：DFI 識別迴圈（B1-B4）、安全措施定義迴圈（B5-B8）、有效性評估迴圈（B9-B12）。",
    images: [
      { name: "Figure 23 — DFA Workflow", description: "B1-B12 完整工作流程圖", purpose: "DFA 分析的主要路線圖" }
    ]
  },
  {
    id: "block-diagram",
    name: "Block-Diagram",
    category: "分析與計算",
    categoryColor: "bg-amber-500",
    platonicIdeal: "審判台與砝碼",
    purpose: "提供系統架構的視覺化表示，作為 Block based Analysis 的輸入基礎。",
    content: "目前此 sheet 為空白模板狀態，等待填入具體專案的功能區塊圖。",
    isEmpty: true
  },
  {
    id: "block-based-analysis",
    name: "Block based Analysis",
    category: "分析與計算",
    categoryColor: "bg-amber-500",
    platonicIdeal: "審判台與砝碼",
    purpose: "作為 DFA 的定性審判台，從架構的宏觀層面識別潛在的相依故障風險。基於功能區塊的視角，對每個 DFI 進行分類和評估。",
    content: "包含 Block Name、DFI Category、DFI Description、Affected Elements、Safety Measure、Evaluation 等欄位。DFI 分類直接引用 DFI examples sheet 的 7 大類。目前為空白模板狀態。",
    isEmpty: true
  },
  {
    id: "cut-set-based-analysis",
    name: "Cut Set based Analysis",
    category: "分析與計算",
    categoryColor: "bg-amber-500",
    platonicIdeal: "審判台與砝碼",
    purpose: "作為 DFA 的定量審判台，從故障組合的微觀層面量化共因故障的潛在嚴重性。",
    content: "核心公式 CCCI = G + I + K + M + O，計算五個評分維度的加總。共 86 個公式（P15 至 P100），每行對應一個切割集的 CCCI 評分。",
    formulas: [{
      formula: "CCCI = G + I + K + M + O",
      location: "Cut Set based Analysis!P15:P100",
      standard: "ISO 26262-10",
      section: "Annex A.3.6",
      physicalMeaning: "量化切割集元件間的共因故障潛力，CCCI 值越高表示共因故障風險越大",
      variables: [
        { name: "G", meaning: "Spatial resolution（空間解析度）", range: "0-3" },
        { name: "I", meaning: "Sharing of common resources（共享資源）", range: "0-3" },
        { name: "K", meaning: "Conducting same information（傳導相同資訊）", range: "0-3" },
        { name: "M", meaning: "Same function and technology（相同功能與技術）", range: "0-3" },
        { name: "O", meaning: "Components in same package（同封裝元件）", range: "0-3" }
      ]
    }]
  },
  {
    id: "dfi-examples",
    name: "DFI examples",
    category: "分析與計算",
    categoryColor: "bg-amber-500",
    platonicIdeal: "審判台與砝碼",
    purpose: "作為已知危險的百科全書，收錄了 ISO 26262-11 §4.7.5.1 定義的 7 類 DFI 範例，確保分析的完備性，防止分析者遺漏已知的常見故障模式。",
    content: "包含 7 大類 DFI：共享資源故障、單一物理根因、環境故障、開發故障、製造故障、安裝故障、操作與維護故障。"
  },
  {
    id: "ccf-calc-on-chip",
    name: "CCF Calc. On-Chip Red.",
    category: "分析與計算",
    categoryColor: "bg-amber-500",
    platonicIdeal: "審判台與砝碼",
    purpose: "量化晶片內部冗餘設計對共因故障的抵抗能力，回答「我們對晶片內冗餘設計的信心有多大？」這個核心問題。",
    content: "核心公式 βIC = βB-IC + Σ(增加因子) - Σ(降低因子)，其中 βB-IC = 33% 是基礎 β 因子。包含 4 項增加因子和 11 項降低因子。目前所有措施均未啟用，βIC = 33%。",
    formulas: [{
      formula: "βIC = βB-IC + Σ(增加因子) - Σ(降低因子)",
      location: "CCF Calc. On-Chip Red.",
      standard: "IEC 61508 Ed. 2",
      section: "Annex D (延伸)",
      physicalMeaning: "量化晶片內冗餘的共因故障比例。βB-IC = 33% 意味著在沒有任何措施的情況下，33% 的故障被認為是共因故障。",
      variables: [
        { name: "βB-IC", meaning: "晶片內冗餘基礎 β 因子", range: "33%" },
        { name: "增加因子", meaning: "晶片內部耦合因素（4 項）", range: "+2% ~ +5%" },
        { name: "降低因子", meaning: "設計措施（11 項）", range: "-2% ~ -9%" }
      ]
    }]
  },
  {
    id: "ccf-calc-logic",
    name: "CCF Calc. Logic",
    category: "分析與計算",
    categoryColor: "bg-amber-500",
    platonicIdeal: "審判台與砝碼",
    purpose: "依據 IEC 61508 Ed. 2 Annex D 的通用方法，對邏輯子系統的數十個維度進行評分，將「最佳工程實踐」轉化為一個可計算的信心指數。",
    content: "核心公式 Score S = Σx + Σy（不考慮診斷）和 Score SD = Σx × (z + 1) + Σy（考慮診斷）。8 大評估類別，β 值查表。目前所有措施均未啟用，Score S = 0，β = βD = 5%（最高風險等級）。",
    formulas: [
      {
        formula: "S = Σx + Σy",
        location: "CCF Calc. Logic",
        standard: "IEC 61508 Ed. 2",
        section: "Annex D, Table D.1",
        physicalMeaning: "不考慮診斷的基本信心分數",
        variables: [
          { name: "x", meaning: "各評估類別的 X 分數", range: "依項目" },
          { name: "y", meaning: "各評估類別的 Y 分數", range: "依項目" }
        ]
      },
      {
        formula: "SD = Σx × (z + 1) + Σy",
        location: "CCF Calc. Logic",
        standard: "IEC 61508 Ed. 2",
        section: "Annex D, Table D.2-D.4",
        physicalMeaning: "考慮診斷後的調整信心分數",
        variables: [
          { name: "z", meaning: "診斷覆蓋率和測試間隔的調整因子", range: "依 Table D.2/D.3" }
        ]
      },
      {
        formula: "β = f(S)",
        location: "CCF Calc. Logic",
        standard: "IEC 61508 Ed. 2",
        section: "Annex D, Table D.4",
        physicalMeaning: "將信心分數轉換為 β 因子百分比",
        variables: [
          { name: "S < 45", meaning: "β = 5%（最高風險）", range: "" },
          { name: "45 ≤ S < 70", meaning: "β = 2%（中等風險）", range: "" },
          { name: "70 ≤ S < 120", meaning: "β = 1%（低風險）", range: "" },
          { name: "S ≥ 120", meaning: "β = 0.5%（最低風險）", range: "" }
        ]
      }
    ]
  }
];

// ─── Reference Documents ───

export const referenceDocuments: ReferenceDoc[] = [
  { id: 1, name: "ISO 26262-1:2018", version: "2nd Ed.", role: "術語與定義的來源，定義了 DFI（Dependent Failure Initiator）等核心概念", details: "ISO 26262 系列的第 1 部分，提供功能安全領域的標準詞彙表。" },
  { id: 2, name: "ISO 26262-5:2018", version: "2nd Ed.", role: "硬體層級產品開發要求，定義了 SPFM、LFM、PMHF 等安全指標的計算方法", details: "定義了硬體安全指標（SPFM、LFM、PMHF），β 因子直接影響這些指標的計算。" },
  { id: 3, name: "ISO 26262-9:2018", version: "2nd Ed.", role: "相依故障分析的要求（第 7 章完整收錄於本 Excel），是 DFA 的法規基礎", details: "第 7 章定義了 DFA 的目標和一般要求，是整份報告的法規基礎。" },
  { id: 4, name: "ISO 26262-10:2018", version: "2nd Ed.", role: "DFA 方法論指引，Annex A.3.6 定義了切割集分析方法", details: "提供 DFA 的實務指引，Annex A.3.6 定義了 CCCI 評分方法。" },
  { id: 5, name: "ISO 26262-11:2018", version: "1st Ed.", role: "半導體 DFA 核心指引，定義了 DFA 工作流程 B1-B12（Figure 23）", details: "2018 年新增的半導體專用指引，定義了 DFI 特徵化的四個維度和 DFA 工作流程。" },
  { id: 6, name: "IEC 61508 Ed. 2", version: "2010", role: "β-factor 計算方法（Annex D），用於 CCF 量化", details: "所有功能安全標準的「母標準」，Part 6 Annex D 提供了 β-factor 計算方法。" },
  { id: 7, name: "IEC TR 62380:2004", version: "2004", role: "可靠度預測手冊，提供電子元件故障率模型", details: "提供電子元件故障率數據，用於 PMHF 計算。" },
  { id: 8, name: "IEC 60812:2018", version: "2006/2018", role: "FMEA 分析方法標準", details: "定義了 FMEA 分析方法，是 DFA 的前置分析之一。" }
];

// ─── DFI Categories ───

export const dfiCategories: DFICategory[] = [
  { id: 1, name: "Failure of shared resources", nameCn: "共享資源故障", description: "多個安全相關元件共享同一資源時，該資源的故障可能同時影響所有依賴它的元件", examples: "時脈樹、電壓調節器、匯流排仲裁器" },
  { id: 2, name: "Single physical root cause", nameCn: "單一物理根因", description: "單一物理事件同時導致多個元件故障", examples: "ESD 事件、閂鎖效應、電遷移" },
  { id: 3, name: "Environmental faults", nameCn: "環境故障", description: "環境條件超出設計規格，同時影響多個元件", examples: "溫度超限、EMI 干擾、輻射" },
  { id: 4, name: "Development faults", nameCn: "開發故障", description: "開發過程中的系統性錯誤，可能影響多個元件", examples: "設計錯誤、驗證不足、工具缺陷" },
  { id: 5, name: "Manufacturing faults", nameCn: "製造故障", description: "製造過程中的系統性缺陷", examples: "製程偏差、污染、光罩缺陷" },
  { id: 6, name: "Installation faults", nameCn: "安裝故障", description: "安裝或整合過程中的錯誤", examples: "焊接不良、PCB 佈線錯誤" },
  { id: 7, name: "Operation and maintenance faults", nameCn: "操作與維護故障", description: "操作或維護過程中的人為錯誤", examples: "韌體更新錯誤、配置錯誤" }
];

// ─── Beta Factor Data ───

export const onChipBetaIncrease: BetaFactor[] = [
  { measure: "晶片內看門狗作為監控元件", delta: "+5%", meaning: "晶片內看門狗雖提高診斷覆蓋率，但增加共因耦合", type: "increase" },
  { measure: "晶片內其他監控元件", delta: "+5%", meaning: "同上邏輯", type: "increase" },
  { measure: "獨立區塊間無交叉內部連線", delta: "+2%", meaning: "無交叉佈線仍有一定耦合風險", type: "increase" },
  { measure: "獨立區塊間有交叉內部連線", delta: "+4%", meaning: "有交叉佈線顯著增加短路和共因風險", type: "increase" }
];

export const onChipBetaDecrease: BetaFactor[] = [
  { measure: "不同通道的多樣化故障控制", delta: "-4%", meaning: "多樣性降低共因風險", type: "decrease" },
  { measure: "功能多樣性+不同通道故障控制", delta: "-6%", meaning: "更高程度的多樣性", type: "decrease" },
  { measure: "EMC 測試（含額外安全裕度）", delta: "-5%", meaning: "電磁相容性測試降低環境共因", type: "decrease" },
  { measure: "各區塊獨立電源引腳", delta: "-6%", meaning: "電源隔離降低共因", type: "decrease" },
  { measure: "獨立區塊間的接地引腳", delta: "-2%", meaning: "接地隔離", type: "decrease" },
  { measure: "高診斷覆蓋率 DC≥99%", delta: "-7%", meaning: "高 DC 快速偵測故障", type: "decrease" },
  { measure: "區塊間溫度感測器（低效能）", delta: "-2%", meaning: "溫度監控（無診斷）", type: "decrease" },
  { measure: "區塊間溫度感測器（高效能）", delta: "-9%", meaning: "溫度監控（有診斷）", type: "decrease" },
  { measure: "故障影響分析/測試", delta: "-9%", meaning: "系統性分析", type: "decrease" },
  { measure: "監控電路在高溫下仍可運作", delta: "-7%", meaning: "極端條件下的可靠性", type: "decrease" }
];

export const betaLookupTable = [
  { range: "< 45", beta: "5%", risk: "最高風險", color: "text-red-600" },
  { range: "45-69", beta: "2%", risk: "中等風險", color: "text-amber-600" },
  { range: "70-119", beta: "1%", risk: "低風險", color: "text-emerald-600" },
  { range: "≥ 120", beta: "0.5%", risk: "最低風險", color: "text-indigo-600" }
];

export const logicEvalCategories = [
  "Separation / Segregation（通道間物理分離程度）",
  "Diversity / Redundancy（技術多樣性）",
  "Complexity / Design / Maturity（設計成熟度和複雜度）",
  "Assessment / Analysis（分析活動充分性）",
  "Procedures / Human Interface（維護和診斷程序品質）",
  "Competence / Training（人員培訓充分性）",
  "Environmental Control（環境保護措施）",
  "Environmental Testing（環境免疫測試充分性）"
];
