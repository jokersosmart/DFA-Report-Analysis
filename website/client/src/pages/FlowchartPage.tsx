/*
 * Flowchart Page — Interactive DFA Workflow B1-B12
 */

import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowDown, RotateCcw } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const FLOWCHART_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/9iEmXFVdGKCt3fujdX0Nc4/sandbox/yEO7KPFjkqJa1h3wfPMM8D-img-2_1771992753000_na1fn_Zmxvd2NoYXJ0LXZpc3VhbA.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOWlFbVhGVmRHS0N0M2Z1amRYME5jNC9zYW5kYm94L3lFTzdLUEZqa3FKYTFoM3dmUE1NOEQtaW1nLTJfMTc3MTk5Mjc1MzAwMF9uYTFmbl9abXh2ZDJOb1lYSjBMWFpwYzNWaGJBLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=JK2fMbHTBWX6G9iWvyoGHP-4p2piGfM8v2J7vTdbEYVWJRYI48O2~ik4TESo~GfvO0VzxPzefaKwnqfrwfwVBMKeB7YYWXMfvCfvgK0lHrho6VGGCnY0m~uSS3~3JxjBxHnVupEaY9CsMpUq1U9QHedMY7Vrpkb0bQX9Zkyqx2ereNlgDh~EWM65sDpkbW~09BsLgZFTmnPWB3tEwHJsNC7LcEkjXbk206M4St~X6gHNa8KxMIsIMZDyNVaUeZK7ZMgzrk-hrbGrlI5uHQg6NE9N7nvkNFgC6pGukvgApcRpoUFr6FB-3YBkkrl2pgCyhpBygLajuu91dszzM-qrdA__";

interface FlowStep {
  id: string;
  label: string;
  description: string;
  details: string;
  type: "process" | "decision" | "start" | "end";
  loop: "dfi" | "safety" | "eval" | "none";
  outputs?: string[];
}

const flowSteps: FlowStep[] = [
  { id: "start", label: "Start", description: "DFA 分析啟動", details: "在架構設計階段啟動 DFA 分析，確保早期識別相依故障風險。", type: "start", loop: "none" },
  { id: "B1", label: "B1: DFA Decision", description: "識別 HW 和 SW 元件", details: "決定 DFA 的範圍，識別需要分析的硬體和軟體元件。這是整個分析的起點，決定了後續所有步驟的分析對象。", type: "process", loop: "dfi" },
  { id: "B2", label: "B2: Identify DFI", description: "識別相依故障啟動因子", details: "系統性地識別所有可能的 DFI（Dependent Failure Initiator），包括共享資源、物理根因、環境因素等 7 大類。參考 DFI examples sheet 的清單確保完備性。", type: "process", loop: "dfi", outputs: ["Link to quant. analysis"] },
  { id: "B3", label: "B3: Insight sufficient?", description: "洞察是否充分？", details: "評估目前對 DFI 的理解是否足夠。如果資訊不足，需要回到 B4 改進資訊後重新迭代。", type: "decision", loop: "dfi" },
  { id: "B4", label: "B4: Improve info", description: "改進資訊", details: "當 B3 判斷洞察不足時，需要收集更多資訊、進行更深入的分析或諮詢專家意見。", type: "process", loop: "dfi" },
  { id: "B5", label: "B5: Consolidate DFI List", description: "整合相關 DFI 清單", details: "將所有已識別的 DFI 整合為一份完整清單，作為後續安全措施定義的基礎。此清單會影響 SPFM、LFM、PMHF 的計算。", type: "process", loop: "safety", outputs: ["→ SPFM, LFM, PMHF"] },
  { id: "B6", label: "B6: Identify Safety Measures", description: "識別必要的安全措施", details: "針對每個 DFI，定義相應的安全措施（Safety Measure）。安全措施可以是硬體冗餘、軟體監控、診斷功能等。", type: "process", loop: "safety", outputs: ["Link to quant. analysis"] },
  { id: "B7", label: "B7: Insight sufficient?", description: "洞察是否充分？", details: "評估安全措施的定義是否完整和適當。如果不足，回到 B8 改進。", type: "decision", loop: "safety" },
  { id: "B8", label: "B8: Improve info", description: "改進資訊", details: "當 B7 判斷不足時，需要重新評估安全措施的有效性或定義額外的措施。", type: "process", loop: "safety" },
  { id: "B9", label: "B9: Consolidate Safety Measures", description: "整合安全措施清單", details: "將所有安全措施整合為一份完整清單，並確認每個 DFI 都有對應的緩解措施。此清單會影響 SPFM、LFM、PMHF 的計算。", type: "process", loop: "eval", outputs: ["→ SPFM, LFM, PMHF"] },
  { id: "B10", label: "B10: Evaluate Effectiveness", description: "評估有效性", details: "使用定量方法（如 CCCI 評分、β 因子計算）評估安全措施的有效性。這是 Cut Set based Analysis 和 CCF Calc. sheets 的核心工作。", type: "process", loop: "eval" },
  { id: "B11", label: "B11: Sufficient risk reduction?", description: "風險降低是否充分？", details: "最終判斷：安全措施是否將風險降低到可接受的水平？如果不充分，回到 B12 改進措施。", type: "decision", loop: "eval" },
  { id: "B12", label: "B12: Improve measures", description: "改進措施", details: "當 B11 判斷風險降低不足時，需要增加或強化安全措施，然後重新評估。", type: "process", loop: "eval" },
  { id: "end", label: "End", description: "DFA 分析完成", details: "所有 DFI 已識別、安全措施已定義且有效性已驗證。DFA 報告可以提交審核。", type: "end", loop: "none" },
];

const loopColors: Record<string, { bg: string; border: string; text: string; label: string }> = {
  dfi: { bg: "bg-blue-50", border: "border-blue-300", text: "text-blue-700", label: "DFI 識別迴圈" },
  safety: { bg: "bg-emerald-50", border: "border-emerald-300", text: "text-emerald-700", label: "安全措施定義迴圈" },
  eval: { bg: "bg-amber-50", border: "border-amber-300", text: "text-amber-700", label: "有效性評估迴圈" },
  none: { bg: "bg-slate-50", border: "border-slate-300", text: "text-slate-700", label: "" },
};

export default function FlowchartPage() {
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const activeData = flowSteps.find(s => s.id === activeStep);

  return (
    <Layout>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex items-center gap-2 mb-6">
          <Link href="/"><span className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex items-center gap-1"><ArrowLeft size={12} /> 首頁</span></Link>
          <span className="text-xs text-muted-foreground">/</span>
          <span className="text-xs text-foreground font-medium">DFA 流程圖</span>
        </div>

        {/* Hero */}
        <div className="relative rounded-xl overflow-hidden mb-8">
          <div className="absolute inset-0">
            <img src={FLOWCHART_IMG} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/75 to-slate-900/50" />
          </div>
          <div className="relative px-8 py-10">
            <h1 className="text-2xl font-bold text-white mb-2">DFA 工作流程 (Figure 23)</h1>
            <p className="text-slate-300 text-sm max-w-xl">
              ISO 26262-11 §4.7.6 定義的 B1-B12 完整工作流程。點擊每個步驟查看詳細說明。
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-6">
          {Object.entries(loopColors).filter(([k]) => k !== "none").map(([key, val]) => (
            <div key={key} className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${val.bg} ${val.border} border`}>
              <RotateCcw size={12} className={val.text} />
              <span className={`text-xs font-medium ${val.text}`}>{val.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Flowchart */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center gap-1">
                  {flowSteps.map((step, i) => {
                    const colors = loopColors[step.loop];
                    const isActive = activeStep === step.id;
                    const isDecision = step.type === "decision";
                    const isStartEnd = step.type === "start" || step.type === "end";

                    return (
                      <div key={step.id} className="flex flex-col items-center w-full max-w-md">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setActiveStep(isActive ? null : step.id)}
                          className={`
                            w-full px-4 py-3 text-left transition-all duration-200
                            ${isStartEnd ? "rounded-full text-center max-w-[160px]" : isDecision ? "rounded-lg rotate-0" : "rounded-lg"}
                            ${isActive ? `ring-2 ring-offset-2 ring-indigo-400 ${colors.bg} ${colors.border} border-2` : `${colors.bg} border ${colors.border} hover:shadow-md`}
                          `}
                        >
                          <div className="flex items-center gap-2">
                            {!isStartEnd && (
                              <span className={`text-[10px] font-bold ${colors.text} shrink-0`}>{step.id}</span>
                            )}
                            <div className="min-w-0">
                              <p className={`text-sm font-semibold ${isActive ? "text-foreground" : colors.text} ${isStartEnd ? "text-center" : ""}`}>
                                {isStartEnd ? step.label : step.description}
                              </p>
                              {!isStartEnd && (
                                <p className="text-[11px] text-muted-foreground truncate">{step.details.slice(0, 60)}...</p>
                              )}
                            </div>
                            {isDecision && (
                              <Badge variant="outline" className="text-[9px] shrink-0 ml-auto">決策</Badge>
                            )}
                          </div>
                          {step.outputs && (
                            <div className="flex gap-1 mt-1.5">
                              {step.outputs.map((o, oi) => (
                                <span key={oi} className="text-[9px] px-1.5 py-0.5 bg-white/60 rounded text-muted-foreground">{o}</span>
                              ))}
                            </div>
                          )}
                        </motion.button>

                        {/* Arrow */}
                        {i < flowSteps.length - 1 && (
                          <div className="flex items-center justify-center h-6">
                            <ArrowDown size={14} className="text-slate-300" />
                          </div>
                        )}

                        {/* Loop back indicator */}
                        {(step.id === "B4" || step.id === "B8" || step.id === "B12") && (
                          <div className={`flex items-center gap-1 text-[10px] ${colors.text} mb-1`}>
                            <RotateCcw size={10} /> 回到 {step.id === "B4" ? "B2" : step.id === "B8" ? "B6" : "B10"}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <Card className={`transition-all duration-300 ${activeData ? "border-indigo-200 shadow-md" : ""}`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold">
                    {activeData ? `${activeData.id}: ${activeData.description}` : "點擊步驟查看詳情"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {activeData ? (
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">類型</p>
                        <Badge variant="secondary" className={`text-[11px] ${loopColors[activeData.loop].bg} ${loopColors[activeData.loop].text}`}>
                          {activeData.type === "decision" ? "決策點" : activeData.type === "process" ? "處理步驟" : activeData.type === "start" ? "起始" : "結束"}
                        </Badge>
                        {activeData.loop !== "none" && (
                          <Badge variant="outline" className={`text-[11px] ml-2 ${loopColors[activeData.loop].text}`}>
                            {loopColors[activeData.loop].label}
                          </Badge>
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">詳細說明</p>
                        <p className="text-sm text-foreground leading-relaxed">{activeData.details}</p>
                      </div>
                      {activeData.outputs && (
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">輸出</p>
                          {activeData.outputs.map((o, i) => (
                            <span key={i} className="inline-block text-xs px-2 py-1 bg-amber-50 text-amber-700 rounded mr-2">{o}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      點擊左側流程圖中的任何步驟，即可在此處查看該步驟的詳細說明、所屬迴圈和輸出資訊。
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
