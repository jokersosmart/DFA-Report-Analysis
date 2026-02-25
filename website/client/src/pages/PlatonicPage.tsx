/*
 * Platonic Analysis Page — 柏拉圖式思考 + 4! 分析法
 * Deep philosophical analysis of the DFA report's existence and meaning
 */

import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { ArrowLeft, Layers, Eye, Scale, Sparkles, Target, Compass, Zap } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PlatonicIdeal {
  name: string;
  icon: typeof Layers;
  sheets: string[];
  ideal: string;
  reality: string;
  gap: string;
  color: string;
}

const ideals: PlatonicIdeal[] = [
  {
    name: "身份與權威",
    icon: Eye,
    sheets: ["Revision History for Template", "Cover", "Revision History of DFA"],
    ideal: "一份完美的文件應該擁有不可質疑的身份、完整的血統記錄、以及明確的權威來源。",
    reality: "Cover 頁面的專案名稱、ASIL 等級、審查者和批准者均為空白。文件目前處於「模板」狀態，尚未被賦予具體的專案身份。",
    gap: "模板已建立了身份的「形式」，但尚未填入「實質」。這就像一個空白的護照——格式完美，但沒有持有者。",
    color: "border-l-slate-400"
  },
  {
    name: "共同語言",
    icon: Compass,
    sheets: ["References", "Abbreviations", "Definitions"],
    ideal: "所有參與者（工程師、審計者、管理者）應該對每一個術語、概念和方法有完全一致的理解。",
    reality: "References 引用了 8 份國際標準，Abbreviations 定義了核心縮寫，Definitions 提供了 3 張關鍵圖示。這三個 sheet 共同建立了一套完整的「語言系統」。",
    gap: "語言系統已相當完備，但 Definitions 頁面的圖片依賴視覺理解，對於純文字審計可能存在資訊損失。",
    color: "border-l-blue-500"
  },
  {
    name: "法律與地圖",
    icon: Scale,
    sheets: ["ISO 26262-9 CH.7", "Methodology", "Flowchart"],
    ideal: "分析過程應該有明確的法規依據、清晰的方法論、以及可視化的路線圖，讓任何人都能重現相同的分析過程。",
    reality: "ISO 26262-9 CH.7 完整收錄了標準原文，Methodology 將法規轉化為具體方法，Flowchart 將整個過程視覺化為 B1-B12 工作流程。",
    gap: "三層結構（法規→方法→地圖）邏輯完整。但 Flowchart 的 Figure 23 以圖片形式嵌入，無法直接從文字中搜索或引用。",
    color: "border-l-emerald-500"
  },
  {
    name: "審判台與砝碼",
    icon: Target,
    sheets: ["Block-Diagram", "Block based Analysis", "Cut Set based Analysis", "DFI examples", "CCF Calc. On-Chip Red.", "CCF Calc. Logic"],
    ideal: "每一個安全聲明都應該有定性和定量的雙重證據支持。定性分析提供「審判台」（判斷框架），定量分析提供「砝碼」（精確數字）。",
    reality: "Block based Analysis 提供定性審判台，Cut Set based Analysis 和兩個 CCF Calc. sheets 提供定量砝碼。DFI examples 確保分析的完備性。",
    gap: "Block-Diagram 和 Block based Analysis 目前為空白模板。定量工具（CCCI 公式、β 因子計算器）已就緒但尚未填入數據。系統處於「工具齊備、數據待填」的狀態。",
    color: "border-l-amber-500"
  }
];

const fourStepAnalysis = [
  {
    step: "第一步：直覺反應",
    icon: Zap,
    content: "這份 Excel 不是一份普通的報告，而是一個「可審計的理性思維過程」。它的 15 個 sheet 構成了一個完整的論證結構，從定義語言到量化證明，每一步都有其不可替代的作用。",
    color: "bg-blue-50 text-blue-700"
  },
  {
    step: "第二步：逆向思考",
    icon: Sparkles,
    content: "如果移除任何一個 sheet，整個論證鏈就會斷裂。沒有 Definitions，團隊可能對「共因故障」有不同理解；沒有 CCF Calc.，安全指標就無法計算；沒有 Flowchart，審計者無法驗證分析過程的完整性。",
    color: "bg-amber-50 text-amber-700"
  },
  {
    step: "第三步：系統性分析",
    icon: Layers,
    content: "15 個 sheet 形成四層結構：基礎框架（3 個）→ 知識基礎（3 個）→ 方法論（3 個）→ 分析與計算（6 個）。這四層對應了柏拉圖式的四個理型：身份與權威、共同語言、法律與地圖、審判台與砝碼。",
    color: "bg-emerald-50 text-emerald-700"
  },
  {
    step: "第四步：行動建議",
    icon: Target,
    content: "當前最大的差距是「工具齊備但數據未填」。建議：(1) 先填入 Cover 頁面的專案資訊；(2) 完成 Block-Diagram 的功能區塊圖；(3) 進行 Block based Analysis 的定性分析；(4) 填入 Cut Set based Analysis 的切割集數據；(5) 啟用 CCF Calc. 中的適用措施。",
    color: "bg-indigo-50 text-indigo-700"
  }
];

const essenceAnalysis = [
  {
    question: "這份 Excel 的本質是什麼？",
    answer: "它是一個「可審計的理性思維過程」——不是結論的陳述，而是推理過程的完整記錄。每一個 sheet 都是論證鏈中的一個環節。"
  },
  {
    question: "為什麼需要 15 個 sheet？",
    answer: "因為 ISO 26262 的審計要求不僅要看結論，還要看推理過程。15 個 sheet 從「定義語言」到「量化證明」，構成了一條不可斷裂的邏輯鏈。"
  },
  {
    question: "三組核心公式的關係是什麼？",
    answer: "CCCI（切割集評分）識別風險 → βIC（晶片內 β 因子）量化晶片內冗餘信心 → β（邏輯 β 因子）量化系統級信心。三者最終都匯入 SPFM/LFM/PMHF 安全指標。"
  },
  {
    question: "如果只能保留一個 sheet，應該保留哪個？",
    answer: "Methodology。因為它是連接「標準要求」與「實際分析」的橋樑。沒有方法論，其他所有分析都失去了依據。但這也說明了為什麼需要所有 15 個 sheet——每一個都是不可替代的。"
  }
];

export default function PlatonicPage() {
  return (
    <Layout>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex items-center gap-2 mb-6">
          <Link href="/"><span className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex items-center gap-1"><ArrowLeft size={12} /> 首頁</span></Link>
          <span className="text-xs text-muted-foreground">/</span>
          <span className="text-xs text-foreground font-medium">柏拉圖式分析</span>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">柏拉圖式思考分析</h1>
        <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
          運用柏拉圖的「理型論」與「4! 分析法」，從本質上探討這份 Excel 每一個 sheet 存在的意義與必要性。
        </p>

        {/* Four Platonic Ideals */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-foreground mb-4">四大柏拉圖式理型</h2>
          <div className="space-y-4">
            {ideals.map((ideal) => {
              const Icon = ideal.icon;
              return (
                <Card key={ideal.name} className={`${ideal.color} border-l-4`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <Icon size={18} />
                      {ideal.name}
                    </CardTitle>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {ideal.sheets.map(s => (
                        <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-3 bg-indigo-50/50 rounded-lg">
                        <p className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wider mb-1">理想狀態</p>
                        <p className="text-xs text-foreground leading-relaxed">{ideal.ideal}</p>
                      </div>
                      <div className="p-3 bg-emerald-50/50 rounded-lg">
                        <p className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider mb-1">現實狀態</p>
                        <p className="text-xs text-foreground leading-relaxed">{ideal.reality}</p>
                      </div>
                      <div className="p-3 bg-amber-50/50 rounded-lg">
                        <p className="text-[10px] font-semibold text-amber-600 uppercase tracking-wider mb-1">差距分析</p>
                        <p className="text-xs text-foreground leading-relaxed">{ideal.gap}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* 4! Analysis */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-foreground mb-4">4! 分析法</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fourStepAnalysis.map((step) => {
              const Icon = step.icon;
              return (
                <Card key={step.step}>
                  <CardContent className="p-5">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${step.color} text-xs font-semibold mb-3`}>
                      <Icon size={13} />
                      {step.step}
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{step.content}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Essence Q&A */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-foreground mb-4">本質追問</h2>
          <div className="space-y-3">
            {essenceAnalysis.map((qa, i) => (
              <Card key={i} className="border-l-4 border-l-indigo-300">
                <CardContent className="p-5">
                  <p className="text-sm font-semibold text-indigo-700 mb-2">{qa.question}</p>
                  <p className="text-sm text-foreground leading-relaxed">{qa.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
