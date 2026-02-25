/*
 * References Page — 8 reference documents deep analysis
 */

import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, BookOpen } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { referenceDocuments } from "@/lib/reportData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const refDetails: Record<number, { summary: string; keyChapters: string[]; relevance: string }> = {
  1: {
    summary: "ISO 26262 系列的第 1 部分，提供功能安全領域的標準詞彙表。定義了所有核心術語，包括 ASIL、DFI、CCF、Cascading Failure 等。",
    keyChapters: ["§3 Terms and definitions — 定義了 200+ 個功能安全術語"],
    relevance: "Definitions sheet 和 Abbreviations sheet 的術語來源。確保所有參與者使用相同的語言。"
  },
  2: {
    summary: "定義了硬體層級產品開發的要求，包括硬體安全指標的計算方法。SPFM（單點故障指標）、LFM（潛伏故障指標）和 PMHF（隨機硬體故障概率指標）的計算公式都在此標準中定義。",
    keyChapters: [
      "§8 Hardware architectural metrics — SPFM 和 LFM 的計算",
      "§9 Evaluation of safety goal violations — PMHF 的計算",
      "Table 4 — SPFM 和 LFM 的 ASIL 目標值"
    ],
    relevance: "β 因子（來自 CCF Calc. sheets）直接輸入到 SPFM/LFM/PMHF 的計算中。這是 DFA 分析結果最終匯入的目標。"
  },
  3: {
    summary: "定義了 DFA 的目標和一般要求。第 7 章是 DFA 的法規基礎，被完整收錄在 ISO 26262-9 CH.7 sheet 中。",
    keyChapters: [
      "§7.1 Objectives — DFA 的目標：確認獨立性或免干擾性不被相依故障違反",
      "§7.2 General — 在架構設計階段進行 DFA",
      "§7.4.2.3 — 被 Methodology sheet 引用的具體分析方法"
    ],
    relevance: "整份報告的法規基礎。Methodology sheet 直接引用 §7.4.2.3 定義分析方法。"
  },
  4: {
    summary: "提供 DFA 的實務指引，Annex A.3.6 定義了切割集分析方法和 CCCI 評分系統。",
    keyChapters: [
      "Annex A.3.6 — Cut Set-based Analysis 的方法論",
      "CCCI 評分系統的五個維度定義"
    ],
    relevance: "Cut Set based Analysis sheet 的 CCCI 公式（G+I+K+M+O）直接來自此標準。"
  },
  5: {
    summary: "2018 年新增的半導體專用指引。第 4.7 節定義了半導體 DFA 的完整方法論，包括 DFI 特徵化的四個維度和 B1-B12 工作流程。",
    keyChapters: [
      "§4.7.3 DFA 目標 — 識別和分析 CCF 和級聯故障",
      "§4.7.5.1 DFI 分類 — 7 大類 DFI 範例",
      "§4.7.6 Figure 23 — DFA Workflow B1-B12",
      "DFI 特徵化四維度：耦合機制、傳播介質、局部性、時序"
    ],
    relevance: "Flowchart sheet 的 B1-B12 流程圖、DFI examples sheet 的 7 大類分類都來自此標準。這是本 Excel 的核心方法論來源。"
  },
  6: {
    summary: "所有功能安全標準的「母標準」。Part 6 Annex D 提供了 β-factor 計算方法，定義了一套評分系統來估算共因故障的 β 因子。",
    keyChapters: [
      "Annex D — β-factor 計算方法",
      "Table D.1 — 8 大評估類別的評分項目",
      "Table D.2/D.3 — 診斷覆蓋率的 z 值",
      "Table D.4 — Score 到 β 值的查表"
    ],
    relevance: "CCF Calc. Logic 和 CCF Calc. On-Chip Red. 兩個 sheet 完整實現了此方法。47 + 37 = 84 個公式都源自此標準。"
  },
  7: {
    summary: "提供電子元件故障率數據的可靠度預測手冊。包含各種電子元件（電阻、電容、IC 等）在不同環境條件下的故障率模型。",
    keyChapters: ["各類電子元件的故障率模型", "環境因子和應力因子"],
    relevance: "提供 PMHF 計算所需的基礎故障率數據（λ 值）。雖然不直接出現在 DFA 報告中，但是量化分析的數據基礎。"
  },
  8: {
    summary: "定義了 FMEA（故障模式與效應分析）和 FMECA（故障模式、效應與危害度分析）的方法。",
    keyChapters: ["FMEA 分析流程", "嚴重度、發生度、偵測度的評估"],
    relevance: "FMEA 是 DFA 的前置分析之一。DFA 建立在 FMEA 的結果之上，進一步分析故障之間的相依關係。"
  }
};

export default function ReferencesPage() {
  return (
    <Layout>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex items-center gap-2 mb-6">
          <Link href="/"><span className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex items-center gap-1"><ArrowLeft size={12} /> 首頁</span></Link>
          <span className="text-xs text-muted-foreground">/</span>
          <span className="text-xs text-foreground font-medium">參考文件</span>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">參考文件詳細解讀</h1>
        <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
          本 DFA 報告引用了 8 份國際標準文件，涵蓋 ISO 26262 系列（5 份）、IEC 61508、IEC TR 62380 和 IEC 60812。每份標準在報告中扮演不同的角色。
        </p>

        <Accordion type="multiple" className="space-y-3">
          {referenceDocuments.map((doc) => {
            const detail = refDetails[doc.id];
            return (
              <AccordionItem key={doc.id} value={`ref-${doc.id}`} className="border rounded-lg px-0 overflow-hidden">
                <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4 text-left">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">
                      {doc.id}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">{doc.name}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{doc.role}</p>
                    </div>
                    <Badge variant="outline" className="text-[10px] shrink-0 ml-auto mr-2">{doc.version}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5">
                  {detail && (
                    <div className="space-y-4 pt-2">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">概要</p>
                        <p className="text-sm text-foreground leading-relaxed">{detail.summary}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">關鍵章節</p>
                        <div className="space-y-1.5">
                          {detail.keyChapters.map((ch, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm">
                              <BookOpen size={13} className="text-indigo-500 mt-0.5 shrink-0" />
                              <span className="text-foreground">{ch}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-3 bg-amber-50 rounded-lg border border-amber-200/60">
                        <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">與本 Excel 的關聯</p>
                        <p className="text-sm text-amber-900 leading-relaxed">{detail.relevance}</p>
                      </div>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </motion.div>
    </Layout>
  );
}
