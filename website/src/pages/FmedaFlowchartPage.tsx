/*
 * FMEDA Flowchart Page
 * Shows the FMEDA process flow and fault classification decision tree
 */

import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { useState } from "react";
import { Workflow, ArrowDown, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const fmedaProcessSteps = [
  { id: 1, title: "元件識別", desc: "從 BlockList 識別所有需要分析的硬體元件", color: "bg-blue-500" },
  { id: 2, title: "失效率計算", desc: "使用 IEC TR 62380 模型計算 IC 總失效率", color: "bg-blue-500" },
  { id: 3, title: "失效率分配", desc: "按面積比例將總失效率分配到各子系統", color: "bg-emerald-500" },
  { id: 4, title: "失效模式識別", desc: "為每個元件識別所有可能的失效模式", color: "bg-emerald-500" },
  { id: 5, title: "安全機制映射", desc: "識別每個失效模式對應的內部/外部安全機制", color: "bg-amber-500" },
  { id: 6, title: "診斷覆蓋率評估", desc: "評估每個安全機制的診斷覆蓋率（DC%）", color: "bg-amber-500" },
  { id: 7, title: "故障分類", desc: "根據 DC% 將每個失效分類為 Safe/SPF/RF/MPF-D/MPF-L", color: "bg-rose-500" },
  { id: 8, title: "CCF 分析", desc: "計算共因故障 β 因子（晶片內冗餘 + 邏輯子系統）", color: "bg-rose-500" },
  { id: 9, title: "安全度量計算", desc: "計算 SPFM、LFM、PMHF 三個安全度量", color: "bg-indigo-500" },
  { id: 10, title: "達標評估", desc: "與 ISO 26262-5 Table 6/7/8 的目標值比較", color: "bg-indigo-500" },
];

const faultClassificationSteps = [
  { id: "B1", question: "該失效模式是否與安全目標相關？", yes: "繼續 B2", no: "分類為 Safe Fault", yesNext: "B2", noResult: "safe" },
  { id: "B2", question: "是否存在安全機制覆蓋此失效？", yes: "繼續 B3", no: "分類為 Single Point Fault", yesNext: "B3", noResult: "spf" },
  { id: "B3", question: "安全機制的診斷覆蓋率 DC ≥ 99%？", yes: "分類為 Safe Fault（被充分覆蓋）", no: "繼續 B4", yesResult: "safe", noNext: "B4" },
  { id: "B4", question: "安全機制的診斷覆蓋率 DC ≥ 90%？", yes: "分類為 Residual Fault", no: "繼續 B5", yesResult: "rf", noNext: "B5" },
  { id: "B5", question: "安全機制的診斷覆蓋率 DC > 0%？", yes: "分類為 Multi-Point Fault (Detected)", no: "分類為 Multi-Point Fault (Latent)", yesResult: "mpf-d", noResult: "mpf-l" },
];

const resultColors: Record<string, { bg: string; text: string; label: string }> = {
  "safe": { bg: "bg-emerald-100", text: "text-emerald-700", label: "Safe Fault" },
  "spf": { bg: "bg-red-100", text: "text-red-700", label: "Single Point Fault" },
  "rf": { bg: "bg-amber-100", text: "text-amber-700", label: "Residual Fault" },
  "mpf-d": { bg: "bg-blue-100", text: "text-blue-700", label: "MPF (Detected)" },
  "mpf-l": { bg: "bg-purple-100", text: "text-purple-700", label: "MPF (Latent)" },
};

export default function FmedaFlowchartPage() {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  return (
    <Layout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Workflow size={20} className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">FMEDA 計算流程</h1>
              <p className="text-xs text-muted-foreground mt-0.5">從元件識別到安全度量的完整流程</p>
            </div>
          </div>
        </div>

        {/* FMEDA Process Flow */}
        <Card className="mb-8">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">FMEDA 執行流程（10 步）</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="absolute left-[15px] top-4 bottom-4 w-px bg-slate-200" />
              <div className="space-y-4">
                {fmedaProcessSteps.map((step) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: step.id * 0.05 }}
                    className="flex items-start gap-4 relative"
                  >
                    <div className={`w-8 h-8 rounded-full ${step.color} flex items-center justify-center shrink-0 z-10`}>
                      <span className="text-xs font-bold text-white">{step.id}</span>
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-sm font-semibold text-foreground">{step.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fault Classification Decision Tree */}
        <Card className="mb-8 border-l-4 border-l-rose-400">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-rose-700">
              故障分類決策樹（ISO 26262-5 Annex C）
            </CardTitle>
            <p className="text-xs text-muted-foreground">點擊每個步驟查看詳情</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {faultClassificationSteps.map((step) => (
                <div key={step.id}>
                  <button
                    onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      activeStep === step.id ? "border-rose-300 bg-rose-50/30 shadow-sm" : "border-border/40 hover:border-rose-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Badge className="bg-rose-100 text-rose-700 text-xs shrink-0">{step.id}</Badge>
                      <p className="text-sm text-foreground">{step.question}</p>
                    </div>
                  </button>
                  {activeStep === step.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="ml-10 mt-2 grid grid-cols-2 gap-3"
                    >
                      <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/30">
                        <div className="flex items-center gap-1.5 mb-1">
                          <CheckCircle2 size={13} className="text-emerald-600" />
                          <p className="text-xs font-semibold text-emerald-700">YES</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{step.yes}</p>
                        {(step as any).yesResult && (
                          <Badge className={`mt-2 text-[10px] ${resultColors[(step as any).yesResult].bg} ${resultColors[(step as any).yesResult].text}`}>
                            {resultColors[(step as any).yesResult].label}
                          </Badge>
                        )}
                      </div>
                      <div className="p-3 rounded-lg border border-red-200 bg-red-50/30">
                        <div className="flex items-center gap-1.5 mb-1">
                          <XCircle size={13} className="text-red-600" />
                          <p className="text-xs font-semibold text-red-700">NO</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{step.no}</p>
                        {(step as any).noResult && (
                          <Badge className={`mt-2 text-[10px] ${resultColors[(step as any).noResult].bg} ${resultColors[(step as any).noResult].text}`}>
                            {resultColors[(step as any).noResult].label}
                          </Badge>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-rose-50/20 border border-slate-200/60">
          <h3 className="text-sm font-bold text-foreground mb-3">故障分類結果說明</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {Object.entries(resultColors).map(([key, val]) => (
              <div key={key} className={`p-2 rounded-lg ${val.bg}`}>
                <p className={`text-xs font-semibold ${val.text}`}>{val.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
