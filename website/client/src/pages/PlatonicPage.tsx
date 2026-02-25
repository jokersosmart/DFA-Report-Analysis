/*
 * Platonic Dialectic & Socratic Questioning Page
 * 柏拉圖辯證法（正題→反題→合題）+ 蘇格拉底式提問法（六大類型）
 * Deep philosophical analysis of the DFA report
 */

import Layout from "@/components/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, MessageCircleQuestion, Scale, Lightbulb, Layers, Eye, Compass, Target, Zap, Sparkles, ChevronDown, ChevronUp, BookOpen, HelpCircle, Shield, Search, GitBranch, Brain } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

// ─── Dialectic Round Data ───

interface DialecticRound {
  id: number;
  title: string;
  subject: string;
  thesis: { label: string; content: string };
  antithesis: { label: string; content: string };
  synthesis: { label: string; content: string };
  socraticQuestions: { type: string; typeIcon: string; question: string; answer: string }[];
  color: string;
  accentColor: string;
}

const dialecticRounds: DialecticRound[] = [
  {
    id: 0,
    title: "整份 Excel 的本質",
    subject: "15 個 Sheet 的統一體",
    thesis: {
      label: "正題：這是一份工程報告",
      content: "這份 Excel 是一份標準的 DFA 報告，其目的是記錄分析結果，滿足 ISO 26262 的合規要求。它是一個「文件」，其價值在於被填寫完成後提交給審計者。"
    },
    antithesis: {
      label: "反題：這是一個思維框架",
      content: "如果這只是一份「報告」，為什麼它有 15 個工作表？為什麼要嵌入完整的 ISO 26262-9 第 7 章原文？為什麼要包含互動式的 β 因子計算器？一份「報告」記錄的是結論，但這份 Excel 記錄的是推理過程本身。它的 15 個 sheet 不是 15 個獨立的表格，而是一條從「定義語言」到「量化證明」的完整邏輯鏈。"
    },
    synthesis: {
      label: "合題：可審計的理性思維過程",
      content: "這份 Excel 的本質既不是單純的報告，也不是抽象的思維框架，而是兩者的融合——一個被固化在電子試算表中的、可被第三方驗證的理性推理過程。它的每一個 sheet 都是這個推理過程中不可或缺的一個步驟，其最終目的是為了在複雜的半導體設計中，建立一種關於「安全」的、可被信任的共識。"
    },
    socraticQuestions: [
      { type: "澄清性問題", typeIcon: "🔍", question: "當我們說「可審計的理性思維過程」時，我們到底是什麼意思？", answer: "這份 Excel 的結構本身就是一個三段論：大前提（References、ISO 26262-9 CH.7 提供法規依據）、小前提（Block based Analysis、Cut Set based Analysis 提供事實數據）、結論（CCF Calc. 計算出的 β 因子證明安全性）。15 個 sheet 的排列順序不是隨意的，而是一個論證的邏輯順序。" },
      { type: "探究假設", typeIcon: "⚡", question: "我們假設 15 個 sheet 都是必要的。如果移除其中一個，會發生什麼？", answer: "如果移除 Definitions sheet，團隊可能對「級聯故障」和「共因故障」有不同理解。如果移除 Methodology sheet，審計者無法確認方法是否合規。如果移除 DFI examples，分析者可能遺漏已知故障模式。每一個 sheet 的移除都會在論證鏈中留下無法彌補的缺口。" }
    ],
    color: "from-indigo-500 to-violet-600",
    accentColor: "indigo"
  },
  {
    id: 1,
    title: "基礎框架層",
    subject: "Cover、Revision History（×2）",
    thesis: {
      label: "正題：只是行政性的表頭",
      content: "Cover 和兩個 Revision History sheet 只是行政管理的需要，它們不包含任何技術內容，對 DFA 分析本身沒有實質貢獻。"
    },
    antithesis: {
      label: "反題：沒有身份的文件不具法律效力",
      content: "在 ISO 26262 的審計框架中，一份沒有明確身份的技術文件，無論內容多精確，都不具備法律效力。Cover 的簽核欄是「責任歸屬」的法律聲明。Revision History 是「變更可追溯性」的證據——如果產品出問題，需要追溯到底是哪個版本的分析、由誰做出的判斷。"
    },
    synthesis: {
      label: "合題：論證的合法性基礎",
      content: "這三個 sheet 的本質是為整份報告提供合法性（legitimacy）。正如法庭證詞需要宣誓和簽名才具法律效力，DFA 報告需要明確的身份、版本和簽核才能被審計者接受。它們不參與技術推理，但它們是技術推理被「承認」的前提條件。"
    },
    socraticQuestions: [
      { type: "探究理由與證據", typeIcon: "📊", question: "為什麼要將「模板的修訂歷史」和「報告的修訂歷史」分開？", answer: "模板的改版（如新增評估欄位）和報告內容的改版（如更新 CCCI 評分）是完全不同性質的變更。分開管理使得變更的原因和影響都能被精確追溯。" },
      { type: "觀點與視角", typeIcon: "👁️", question: "從審計者的角度，這些 sheet 意味著什麼？", answer: "這些 sheet 是審計者開始審查的第一站。如果 Cover 的專案名稱、ASIL 等級都是空白的，審計者會立即質疑報告的正式性。這些「行政性」的 sheet 實際上是審計者對報告建立信任的第一道門檻。" },
      { type: "影響與後果", typeIcon: "🔗", question: "目前 Cover 頁面的關鍵欄位都是空白的，這意味著什麼？", answer: "這意味著 Excel 目前處於「模板」狀態，尚未被賦予具體的專案身份。它就像一個空白的護照——格式完美，但沒有持有者。在被填入具體專案資訊之前，它不能作為正式的 DFA 報告提交。" }
    ],
    color: "from-slate-500 to-gray-600",
    accentColor: "slate"
  },
  {
    id: 2,
    title: "知識基礎層",
    subject: "References、Abbreviations、Definitions",
    thesis: {
      label: "正題：這些是常識，不需要專門列出",
      content: "任何功能安全工程師都知道 ISO 26262 是什麼，都知道 ASIL、CCF、DFI 這些縮寫代表什麼。專門用三個 sheet 來列出這些「常識」是浪費空間。"
    },
    antithesis: {
      label: "反題：「常識」是最危險的假設",
      content: "蘇格拉底說：「我唯一知道的是我什麼都不知道。」ISO 26262-1 定義的 DFI 和 ISO 26262-11 定義的 DFI 在細微之處有所不同。如果團隊中有人使用 IEC 61508 的定義，有人使用 ISO 26262 的定義，分析結果可能完全不同。Definitions 中的三張圖片不是裝飾，而是確保所有人有完全相同的視覺理解。"
    },
    synthesis: {
      label: "合題：共同語言的契約",
      content: "這三個 sheet 的本質是一份語言契約（linguistic contract）。在開始任何技術討論之前，所有參與者必須先「簽署」這份契約——即同意使用相同的術語、定義和參考標準。沒有這份契約，後續所有分析都可能建立在「巴別塔」式的語言混亂之上。"
    },
    socraticQuestions: [
      { type: "澄清性問題", typeIcon: "🔍", question: "8 份參考標準之間是什麼關係？為什麼是這 8 份？", answer: "ISO 26262-1 提供詞彙，-9 提供法規要求，-10 和 -11 提供方法論指引，-5 定義安全指標，IEC 61508 提供 β 因子計算，IEC TR 62380 提供故障率數據，IEC 60812 提供 FMEA 方法。每一份都有不可替代的角色。" },
      { type: "探究假設", typeIcon: "⚡", question: "如果有人只能看到純文字版本，Definitions 的圖片還有用嗎？", answer: "這是有效的挑戰。目前三張圖片依賴視覺理解，對純文字審計可能存在資訊損失。這也是為什麼 Markdown 轉換中特別用 ASCII 流程圖和文字描述來重現這些圖片——確保無圖環境下概念仍可完整傳達。" },
      { type: "關於問題本身", typeIcon: "🧠", question: "為什麼我們要問「這些是不是常識」？這揭示了什麼？", answer: "這揭示了專家盲點（expert blind spot）。越資深的工程師越容易認為某些知識是「常識」，從而忽略明確定義的重要性。ISO 26262 要求明確列出參考文件和定義，正是為了對抗這種偏差。" }
    ],
    color: "from-blue-500 to-cyan-600",
    accentColor: "blue"
  },
  {
    id: 3,
    title: "方法論層",
    subject: "ISO 26262-9 CH.7、Methodology、Flowchart",
    thesis: {
      label: "正題：直接做分析就好，何必花三個 sheet 講方法？",
      content: "工程師的時間很寶貴。與其花三個 sheet 來解釋「我們要怎麼做」，不如直接開始做分析。方法論應該在工程師的腦中，而不是在 Excel 裡。"
    },
    antithesis: {
      label: "反題：沒有記錄的方法論無法被驗證",
      content: "蘇格拉底的辯證法之所以有力，正是因為每一步推理都是公開的、可被質疑的。如果方法論只在工程師腦中，審計者如何驗證？工程師離職後，下一位如何知道前任用了什麼方法？ISO 26262-9 §7.4.2.3 提供了多種方法，Methodology 記錄了「為什麼選這個方法」的決策過程。"
    },
    synthesis: {
      label: "合題：從法規到實踐的三層翻譯器",
      content: "ISO 26262-9 CH.7 是原始法規（法律語言），Methodology 是工程翻譯（工程語言），Flowchart 是視覺翻譯（可操作的流程圖）。每一層翻譯都降低了理解門檻，使不同背景的參與者都能理解並遵循同一個分析過程。"
    },
    socraticQuestions: [
      { type: "澄清性問題", typeIcon: "🔍", question: "為什麼要完整收錄標準原文，而不是只引用章節號？", answer: "ISO 標準是付費文件，不是所有參與者都有權限查閱。嵌入原文確保即使沒有標準文件，審計者也能直接核對。這也避免了版本混淆問題。" },
      { type: "探究理由與證據", typeIcon: "📊", question: "B1-B12 工作流程來自哪裡？權威性如何？", answer: "來自 ISO 26262-11:2018 §4.7.6 的 Figure 23。這是 ISO 標準中明確定義的半導體 DFA 工作流程，具有最高的權威性。" },
      { type: "影響與後果", typeIcon: "🔗", question: "如果 Methodology 選擇了不同的分析方法，後續會有什麼變化？", answer: "如果只做定性分析而不做定量分析，Cut Set based Analysis 和兩個 CCF Calc. sheet 就不需要存在。方法論的選擇決定了後續所有分析 sheet 的存在與否——它是一個「分叉點」。" }
    ],
    color: "from-emerald-500 to-teal-600",
    accentColor: "emerald"
  },
  {
    id: 4,
    title: "分析與計算層",
    subject: "Block/Cut Set Analysis、CCF Calc.（×2）、DFI examples",
    thesis: {
      label: "正題：定性分析就夠了，為什麼還要定量？",
      content: "Block based Analysis 已經從架構層面識別了所有的 DFI，並為每個 DFI 定義了安全措施。這不就夠了嗎？為什麼還要用 Cut Set based Analysis 做定量評分，再用 CCF Calc. 計算 β 因子？"
    },
    antithesis: {
      label: "反題：定性分析無法回答「多安全才算安全」",
      content: "定性分析可以告訴我們「這裡有風險」，但無法告訴我們「風險有多大」。ISO 26262-5 要求 ASIL B 的 SPFM ≥ 90%、LFM ≥ 60%，這些是數字，不是「高/中/低」的定性判斷。更深層地說，定性分析容易受到「確認偏差」影響——分析者可能傾向於認為自己設計的安全措施是有效的。定量分析提供了客觀的、不受主觀偏見影響的評估框架。"
    },
    synthesis: {
      label: "合題：定性發現 + 定量證明 = 完整論證",
      content: "定性分析是「發現問題」的工具，定量分析是「證明解決方案有效」的工具。兩者缺一不可：沒有定性分析，我們不知道要量化什麼；沒有定量分析，我們無法證明定性判斷是正確的。"
    },
    socraticQuestions: [
      { type: "澄清性問題", typeIcon: "🔍", question: "CCCI 公式的五個維度分別代表什麼？為什麼是這五個？", answer: "G（空間解析度）、I（共享資源）、K（傳導相同資訊）、M（相同功能與技術）、O（同封裝元件）。來自 ISO 26262-10 Annex A.3.6，共同覆蓋了共因故障的所有主要耦合機制——物理、資源、資訊、技術和環境耦合。" },
      { type: "探究假設", typeIcon: "⚡", question: "β 因子的初始值（33% 和 5%）依據是什麼？如果假設錯了呢？", answer: "33% 來自 IEC 61508 對晶片內冗餘的保守估計，5% 來自 Annex D Table D.4 最高風險等級。這些是保守假設，故意高估風險。即使假設有誤，結論仍偏向安全側。" },
      { type: "觀點與視角", typeIcon: "👁️", question: "CCF Calc. On-Chip Red. 和 CCF Calc. Logic 有什麼不同意義？", answer: "On-Chip Red. 關注晶片內部冗餘（如同一 SoC 上的兩個 CPU 核心），共因風險天然較高（βB-IC = 33%）。Logic 關注系統級冗餘（如兩個獨立 ECU），共因風險較低（β = 5%）。這反映了半導體 DFA 的核心挑戰：晶片內冗餘的共因故障風險遠高於系統級。" },
      { type: "影響與後果", typeIcon: "🔗", question: "如果所有安全措施都不啟用，β 因子會是多少？意味著什麼？", answer: "βIC = 33%，β = 5%。這些數值會直接降低 SPFM 和 LFM 的計算結果，可能導致產品無法達到目標 ASIL 等級。這也是為什麼啟用安全措施（降低 β 因子）是至關重要的。" }
    ],
    color: "from-amber-500 to-orange-600",
    accentColor: "amber"
  },
  {
    id: 5,
    title: "DFI examples 的存在意義",
    subject: "已知危險的百科全書",
    thesis: {
      label: "正題：這只是參考清單，可以放在附錄裡",
      content: "DFI examples 只是列出了一些故障範例，不包含任何計算或分析。把它放在附錄裡就好了，不需要佔用一個獨立的 sheet。"
    },
    antithesis: {
      label: "反題：這是防止「未知的未知」的最後防線",
      content: "蘇格拉底說：「未經審視的人生不值得過。」同樣，未經完備性檢查的 DFA 不值得信任。DFI examples 的 7 大類、數十個具體範例，代表的是整個行業在相依故障領域數十年經驗的結晶。它的存在是為了強制分析者逐一檢查每一類 DFI 是否已被考慮。"
    },
    synthesis: {
      label: "合題：結構化的經驗庫",
      content: "它既不是可有可無的附錄，也不是萬能的保險，而是一個結構化的經驗庫。它的價值在於將分散在各個標準和行業經驗中的知識，整合為一份可直接用於分析的檢查清單。它是 Block based Analysis 的「彈藥庫」——沒有它，定性分析就像在黑暗中射擊。"
    },
    socraticQuestions: [
      { type: "關於問題本身", typeIcon: "🧠", question: "為什麼我們要問「DFI examples 是否必要」？這揭示了什麼？", answer: "這揭示了一種常見的工程思維陷阱：重計算、輕完備性。工程師往往更重視公式和數字，而低估了「確保沒有遺漏」的價值。但遺漏一個已知故障模式比計算錯誤更危險——因為計算錯誤可以被修正，但遺漏的故障模式可能直到事故發生才被發現。" }
    ],
    color: "from-rose-500 to-pink-600",
    accentColor: "rose"
  },
  {
    id: 6,
    title: "15 個 Sheet 的整體結構",
    subject: "蘇格拉底式終極追問",
    thesis: {
      label: "正題：15 個 sheet 太多了，應該精簡",
      content: "15 個 sheet 讓報告顯得臃腫。很多內容可以合併——例如 References 和 Abbreviations 可以合併，兩個 CCF Calc. 可以合併。"
    },
    antithesis: {
      label: "反題：每一個都是論證鏈中不可替代的環節",
      content: "如果合併 References 和 Abbreviations，審計者在查找術語時需要在混雜的 sheet 中搜索。如果合併兩個 CCF Calc.，晶片內冗餘（βB-IC = 33%）和邏輯子系統（β = 5%）完全不同的基礎假設會被混在一起，增加出錯風險。15 個 sheet 的結構是關注點分離（Separation of Concerns）的體現。"
    },
    synthesis: {
      label: "合題：四層結構是一個完整的論證體系",
      content: "15 個 sheet 形成四層結構：基礎框架（3 個，合法性基礎）→ 知識基礎（3 個，語言契約）→ 方法論（3 個，翻譯器）→ 分析與計算（6 個，定性發現 + 定量證明）。這四層對應了柏拉圖辯證法的上升過程：從「感官世界」逐步上升到「理性世界」，最終達到對「安全」這個理型的逼近。"
    },
    socraticQuestions: [
      { type: "終極追問", typeIcon: "💎", question: "如果只能保留一個 Sheet，應該保留哪個？", answer: "這個問題本身就是辯證法的練習。它迫使我們思考每個 sheet 的不可替代性。從工程師角度可能選 CCF Calc.（有結果），從審計者角度可能選 Methodology（證明合規性）。但真正的答案是：每一個都不可替代——這正是 15 個 sheet 結構存在的根本理由。" }
    ],
    color: "from-purple-500 to-indigo-600",
    accentColor: "purple"
  }
];

// ─── Socratic Question Type Icons ───

const socraticTypes = [
  { name: "澄清性問題", icon: Search, description: "你為什麼這麼說？這跟討論有什麼關係？" },
  { name: "探究假設", icon: Zap, description: "我們可以做什麼替代假設？如何驗證？" },
  { name: "探究理由與證據", icon: BookOpen, description: "能舉個例子嗎？什麼原因導致這個結果？" },
  { name: "觀點與視角", icon: Eye, description: "有什麼替代方案？反對的論點是什麼？" },
  { name: "影響與後果", icon: GitBranch, description: "這個假設的後果是什麼？如何影響其他部分？" },
  { name: "關於問題本身", icon: Brain, description: "這個問題的重點是什麼？為什麼要問這個？" }
];

// ─── Components ───

function DialecticCard({ round }: { round: DialecticRound }) {
  const [expanded, setExpanded] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: round.id * 0.05 }}
    >
      <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
        {/* Header with gradient */}
        <div className={`bg-gradient-to-r ${round.color} px-5 py-4`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-[10px] font-medium uppercase tracking-widest mb-0.5">
                第 {round.id + 1} 輪辯證
              </p>
              <h3 className="text-white text-lg font-bold">{round.title}</h3>
              <p className="text-white/80 text-xs mt-0.5">{round.subject}</p>
            </div>
            <Scale className="text-white/30" size={32} />
          </div>
        </div>

        <CardContent className="p-0">
          {/* Thesis → Antithesis → Synthesis */}
          <div className="divide-y divide-border">
            {/* Thesis */}
            <div className="p-5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-sm font-bold">正</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-blue-700 mb-1.5">{round.thesis.label}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">"{round.thesis.content}"</p>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center py-1 bg-muted/30">
              <ArrowRight size={14} className="text-muted-foreground rotate-90" />
            </div>

            {/* Antithesis */}
            <div className="p-5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-sm font-bold">反</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-red-700 mb-1.5">{round.antithesis.label}</p>
                  <p className="text-sm text-foreground leading-relaxed">{round.antithesis.content}</p>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center py-1 bg-muted/30">
              <ArrowRight size={14} className="text-muted-foreground rotate-90" />
            </div>

            {/* Synthesis */}
            <div className="p-5 bg-emerald-50/50">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-sm font-bold">合</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-emerald-700 mb-1.5">{round.synthesis.label}</p>
                  <p className="text-sm text-foreground leading-relaxed font-medium">{round.synthesis.content}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Socratic Questions Toggle */}
          <div className="border-t border-border">
            <button
              onClick={() => setShowQuestions(!showQuestions)}
              className="w-full px-5 py-3 flex items-center justify-between text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
            >
              <span className="flex items-center gap-2">
                <MessageCircleQuestion size={15} className="text-amber-600" />
                蘇格拉底式追問（{round.socraticQuestions.length} 個）
              </span>
              {showQuestions ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            <AnimatePresence>
              {showQuestions && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 space-y-3">
                    {round.socraticQuestions.map((q, i) => (
                      <SocraticQuestionCard key={i} q={q} index={i} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function SocraticQuestionCard({ q, index }: { q: { type: string; typeIcon: string; question: string; answer: string }; index: number }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50/50 overflow-hidden">
      <button
        onClick={() => setShowAnswer(!showAnswer)}
        className="w-full px-4 py-3 text-left hover:bg-amber-100/50 transition-colors"
      >
        <div className="flex items-start gap-2">
          <span className="text-base shrink-0">{q.typeIcon}</span>
          <div className="flex-1">
            <Badge variant="outline" className="text-[9px] mb-1.5 border-amber-300 text-amber-700">{q.type}</Badge>
            <p className="text-sm font-medium text-foreground">{q.question}</p>
          </div>
          <HelpCircle size={14} className={`shrink-0 mt-1 transition-colors ${showAnswer ? 'text-amber-600' : 'text-muted-foreground'}`} />
        </div>
      </button>
      <AnimatePresence>
        {showAnswer && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3 pt-0 ml-7">
              <div className="p-3 bg-white rounded-md border border-amber-100">
                <p className="text-sm text-foreground leading-relaxed">{q.answer}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Page ───

export default function PlatonicPage() {
  return (
    <Layout>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link href="/"><span className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex items-center gap-1"><ArrowLeft size={12} /> 首頁</span></Link>
          <span className="text-xs text-muted-foreground">/</span>
          <span className="text-xs text-foreground font-medium">柏拉圖辯證法與蘇格拉底式提問</span>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">柏拉圖辯證法與蘇格拉底式提問</h1>
          <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">
            運用柏拉圖辯證法的「正題 → 反題 → 合題」三段式推進，以及蘇格拉底式提問法的六大類型追問，
            對 DFA 報告的每一個層次進行深度哲學分析。真理不是被「宣告」的，而是通過對立觀點的碰撞與融合而「浮現」的。
          </p>
        </div>

        {/* Methodology Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <Card className="border-l-4 border-l-indigo-500">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Scale size={18} className="text-indigo-600" />
                <h3 className="text-sm font-bold text-foreground">柏拉圖辯證法</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                Platonic Dialectic Method — 通過「正題（Thesis）→ 反題（Antithesis）→ 合題（Synthesis）」的三段式推進，
                從表象（doxa）逼近本質（episteme）。每一輪辯證都將我們帶向更深層的理解。
              </p>
              <div className="flex gap-2">
                <Badge className="bg-blue-100 text-blue-700 text-[10px]">正題</Badge>
                <ArrowRight size={12} className="text-muted-foreground mt-0.5" />
                <Badge className="bg-red-100 text-red-700 text-[10px]">反題</Badge>
                <ArrowRight size={12} className="text-muted-foreground mt-0.5" />
                <Badge className="bg-emerald-100 text-emerald-700 text-[10px]">合題</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <MessageCircleQuestion size={18} className="text-amber-600" />
                <h3 className="text-sm font-bold text-foreground">蘇格拉底式提問法</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                Socratic Questioning — 依據 R.W. Paul 的六大類型，通過層層追問剝離偏見與假設，逼近事物的真相。
                智慧的起點是承認自己的無知。
              </p>
              <div className="flex flex-wrap gap-1.5">
                {socraticTypes.map(t => (
                  <Badge key={t.name} variant="outline" className="text-[9px] border-amber-200 text-amber-700">{t.name}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Six Socratic Question Types */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-foreground mb-4">蘇格拉底式提問的六大類型</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {socraticTypes.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.name} className="p-3 rounded-lg border border-border bg-card hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon size={14} className="text-amber-600" />
                    <span className="text-xs font-semibold text-foreground">{t.name}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{t.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dialectic Rounds */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-foreground mb-2">七輪辯證分析</h2>
          <p className="text-xs text-muted-foreground mb-6">
            每一輪辯證針對一個層次或主題，通過正題→反題→合題的推進，揭示其存在的本質意義。點擊「蘇格拉底式追問」展開深層追問。
          </p>
          <div className="space-y-6">
            {dialecticRounds.map(round => (
              <DialecticCard key={round.id} round={round} />
            ))}
          </div>
        </div>

        {/* Four-Layer Structure Summary */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-foreground mb-4">辯證結論：四層結構的論證體系</h2>
          <Card>
            <CardContent className="p-5">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground">層次</th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground">Sheet 數量</th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground">角色</th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground">辯證法類比</th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground">蘇格拉底洞見</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="py-2.5 px-3"><Badge className="bg-slate-100 text-slate-700 text-[10px]">基礎框架</Badge></td>
                      <td className="py-2.5 px-3 text-xs">3 個</td>
                      <td className="py-2.5 px-3 text-xs">合法性基礎</td>
                      <td className="py-2.5 px-3 text-xs">法庭的宣誓與身份確認</td>
                      <td className="py-2.5 px-3 text-xs text-muted-foreground">空白護照有格式但無持有者</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2.5 px-3"><Badge className="bg-blue-100 text-blue-700 text-[10px]">知識基礎</Badge></td>
                      <td className="py-2.5 px-3 text-xs">3 個</td>
                      <td className="py-2.5 px-3 text-xs">語言契約</td>
                      <td className="py-2.5 px-3 text-xs">辯論前的術語定義</td>
                      <td className="py-2.5 px-3 text-xs text-muted-foreground">對抗「專家盲點」的系統性工具</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2.5 px-3"><Badge className="bg-emerald-100 text-emerald-700 text-[10px]">方法論</Badge></td>
                      <td className="py-2.5 px-3 text-xs">3 個</td>
                      <td className="py-2.5 px-3 text-xs">三層翻譯器</td>
                      <td className="py-2.5 px-3 text-xs">辯論的規則與程序</td>
                      <td className="py-2.5 px-3 text-xs text-muted-foreground">方法論選擇是決定後續結構的「分叉點」</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3"><Badge className="bg-amber-100 text-amber-700 text-[10px]">分析與計算</Badge></td>
                      <td className="py-2.5 px-3 text-xs">6 個</td>
                      <td className="py-2.5 px-3 text-xs">定性 + 定量證明</td>
                      <td className="py-2.5 px-3 text-xs">舉證與裁決</td>
                      <td className="py-2.5 px-3 text-xs text-muted-foreground">遺漏比計算錯誤更危險</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Final Insight */}
        <Card className="border-0 bg-gradient-to-br from-indigo-50 to-violet-50 mb-6">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Lightbulb size={20} className="text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-bold text-foreground mb-2">辯證法的終極洞見</h3>
                <p className="text-sm text-foreground leading-relaxed">
                  柏拉圖相信，真理存在於「理型」的世界中，我們只能通過辯證法逐步逼近它。同樣，「安全」是一個理型——我們永遠無法完全達到它，
                  但通過這份 Excel 中 15 個 sheet 的層層推理，我們可以無限逼近對它的理解與證明。
                  每一個 sheet 都經受了「正題→反題→合題」的辯證考驗，證明了其存在的必要性。
                  蘇格拉底式的六類追問則揭示了每個 sheet 背後更深層的設計意圖——它們不僅是技術文件的組成部分，
                  更是一種「對抗人類認知偏差」的系統性工具。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Layout>
  );
}
