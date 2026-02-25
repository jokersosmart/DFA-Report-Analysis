/*
 * FMEDA Data Flow Page
 * Shows the data flow between 27 sheets in the FMEDA Excel
 */

import Layout from "@/components/Layout";
import { fmedaFormulaChain, fmedaSheets } from "@/lib/fmedaData";
import { motion } from "framer-motion";
import { GitBranch, ArrowDown, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const layers = [
  {
    name: "第 1 層：定義與基礎",
    color: "bg-blue-500",
    borderColor: "border-l-blue-500",
    bgColor: "bg-blue-50/50",
    sheets: ["Revision History", "Cover", "Process", "References", "Abbreviations", "Definitions", "Legend", "FlowChart"],
    description: "建立共同語言、方法論和權威依據。這一層不包含計算，但為所有後續計算提供語境和合法性。"
  },
  {
    name: "第 2 層：失效率計算",
    color: "bg-emerald-500",
    borderColor: "border-l-emerald-500",
    bgColor: "bg-emerald-50/50",
    sheets: ["FailureModes", "BlockList", "SRAM Tran FIT", "Block-Diagram", "FailureRateCalc", "FailureRateCalcIC"],
    description: "從 IEC TR 62380 模型計算 IC 總失效率，然後按面積比例分配到各子系統。這是整份 FMEDA 的量化起點。"
  },
  {
    name: "第 3 層：核心分析引擎",
    color: "bg-amber-500",
    borderColor: "border-l-amber-500",
    bgColor: "bg-amber-50/50",
    sheets: ["FMEDA 主表（562,887 公式）", "DiagnosisInternal", "DiagnosisExternal", "SafetyGoalViolations"],
    description: "FMEDA 主表是計算引擎的核心，1659 行 × 463 列。DiagnosisInternal/External 提供診斷覆蓋率，SafetyGoalViolations 映射到安全目標。"
  },
  {
    name: "第 4 層：CCF 分析",
    color: "bg-rose-500",
    borderColor: "border-l-rose-500",
    bgColor: "bg-rose-50/50",
    sheets: ["CCF Calc. On-Chip Red.（βIC=47%）", "CCF Calc. Logic（β=5%）"],
    description: "量化共因故障風險。βIC = 47% 表示晶片內冗餘的共因故障比例，β = 5% 表示邏輯子系統的共因故障比例。"
  },
  {
    name: "第 5 層：評估結果",
    color: "bg-indigo-500",
    borderColor: "border-l-indigo-500",
    bgColor: "bg-indigo-50/50",
    sheets: ["SGVEvaluation", "BlockEvaluation", "BlockEval-IEC61508 Opt1/2", "BlockTypeEvaluation", "BlockTypeEval-IEC61508 Opt1/2"],
    description: "從三個維度（安全目標級、元件級、元件類型級）和兩個標準（ISO 26262、IEC 61508）呈現最終評估結果。"
  }
];

export default function FmedaDataFlowPage() {
  return (
    <Layout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <GitBranch size={20} className="text-emerald-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">FMEDA 資料流向圖</h1>
              <p className="text-xs text-muted-foreground mt-0.5">27 個 Sheet 的五層架構與資料流動</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
            FMEDA 的 27 個工作表形成了一個五層的金字塔結構，資料從底層的定義和基礎數據，經過失效率計算和核心分析，最終匯聚到頂層的評估結果。
          </p>
        </div>

        {/* 5-Layer Architecture */}
        <div className="space-y-4 mb-10">
          {layers.map((layer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <Card className={`border-l-4 ${layer.borderColor}`}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Badge className={`${layer.color} text-white text-[10px]`}>Layer {i + 1}</Badge>
                    <CardTitle className="text-sm font-bold">{layer.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">{layer.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {layer.sheets.map((s, j) => (
                      <Badge key={j} variant="outline" className={`text-[11px] ${layer.bgColor}`}>{s}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              {i < layers.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowDown size={20} className="text-muted-foreground/40" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Formula Chain */}
        <Card className="mb-8">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Layers size={14} className="text-rose-600" /> 計算鏈：10 步從失效率到安全度量
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="absolute left-[15px] top-4 bottom-4 w-px bg-rose-200" />
              <div className="space-y-4">
                {fmedaFormulaChain.map((step, i) => (
                  <div key={i} className="flex items-start gap-4 relative">
                    <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center shrink-0 z-10">
                      <span className="text-xs font-bold text-rose-700">{step.step}</span>
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="flex items-center gap-2 text-sm flex-wrap">
                        <code className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded">{step.from}</code>
                        <ArrowDown size={12} className="text-rose-400 rotate-[-90deg] shrink-0" />
                        <code className="text-xs font-mono bg-rose-50 px-2 py-0.5 rounded text-rose-700">{step.to}</code>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Insight */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-slate-50 to-rose-50/30 border border-slate-200/60">
          <h3 className="text-base font-bold text-foreground mb-3">核心洞察</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            FMEDA 的資料流向揭示了一個重要的設計原則：<strong className="text-foreground">每一層都只依賴其下層的輸出</strong>。
            這意味著如果底層的失效率計算有誤，錯誤會級聯到所有上層。反之，如果底層的計算是正確的，
            上層的結論就有堅實的基礎。這就是為什麼 FailureRateCalc 使用保守的 IEC TR 62380 模型——
            保守的基礎確保了整個論證鏈的可信度。
          </p>
        </div>
      </motion.div>
    </Layout>
  );
}
