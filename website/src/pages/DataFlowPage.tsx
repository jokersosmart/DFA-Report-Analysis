/*
 * DataFlow Page — Visual representation of data flow between 15 sheets
 * Shows how data moves from definitions through methodology to calculations
 */

import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowDown } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const DATA_FLOW_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/9iEmXFVdGKCt3fujdX0Nc4/sandbox/yEO7KPFjkqJa1h3wfPMM8D-img-4_1771992759000_na1fn_ZGF0YS1mbG93LXZpc3VhbA.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOWlFbVhGVmRHS0N0M2Z1amRYME5jNC9zYW5kYm94L3lFTzdLUEZqa3FKYTFoM3dmUE1NOEQtaW1nLTRfMTc3MTk5Mjc1OTAwMF9uYTFmbl9aR0YwWVMxbWJHOTNMWFpwYzNWaGJBLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=rwBqz2febojvmpWHNK4gg9~4kZ95b4PChSpmYcUVHRP3sJ9jULifpcXNK0FKAoDIdyoEi5Gzq30nX5Hz7XGeDbIAWUakDuvf~vfdBO5-7C7GqCJ9ds7GTYXcZyAn8HpES2zXrGml06zrlwv1qLXkDp-cWe9fy1L0oPAiU1mGsXjPU3S7bc14-1MWQxRsVs-kNNS21VlwPNwh9PCpq~y8QcIY87c9dH605vEDtTtQyM8C85Pyne0mdsbhevI-HhslqmvECv6fqI~DCdcCgVdScgs7Ho0-v~saN89Edb-mX0EA0AFvRS1vdbMEy5nmuR5-grJNl3y9btkc2ihB7hp4nA__";

interface FlowNode {
  id: string;
  name: string;
  layer: number;
  category: string;
  description: string;
}

interface FlowEdge {
  from: string;
  to: string;
  label: string;
  type: "data" | "reference" | "output";
}

const nodes: FlowNode[] = [
  // Layer 0: Foundation
  { id: "rev-tmpl", name: "Revision History\n(Template)", layer: 0, category: "基礎框架", description: "模板版本管理" },
  { id: "cover", name: "Cover", layer: 0, category: "基礎框架", description: "文件身份證" },
  { id: "rev-dfa", name: "Revision History\n(DFA)", layer: 0, category: "基礎框架", description: "報告版本管理" },

  // Layer 1: Knowledge Base
  { id: "refs", name: "References", layer: 1, category: "知識基礎", description: "8 份國際標準" },
  { id: "abbr", name: "Abbreviations", layer: 1, category: "知識基礎", description: "術語縮寫表" },
  { id: "defs", name: "Definitions", layer: 1, category: "知識基礎", description: "核心概念定義" },

  // Layer 2: Methodology
  { id: "iso9", name: "ISO 26262-9\nCH.7", layer: 2, category: "方法論", description: "法規原文" },
  { id: "method", name: "Methodology", layer: 2, category: "方法論", description: "分析方法論" },
  { id: "flow", name: "Flowchart", layer: 2, category: "方法論", description: "B1-B12 流程" },

  // Layer 3: Analysis
  { id: "block-diag", name: "Block-Diagram", layer: 3, category: "分析與計算", description: "系統架構圖" },
  { id: "block-ana", name: "Block based\nAnalysis", layer: 3, category: "分析與計算", description: "定性分析" },
  { id: "cutset", name: "Cut Set based\nAnalysis", layer: 3, category: "分析與計算", description: "定量分析" },
  { id: "dfi-ex", name: "DFI examples", layer: 3, category: "分析與計算", description: "DFI 百科全書" },
  { id: "ccf-chip", name: "CCF Calc.\nOn-Chip", layer: 3, category: "分析與計算", description: "晶片內 β 因子" },
  { id: "ccf-logic", name: "CCF Calc.\nLogic", layer: 3, category: "分析與計算", description: "邏輯 β 因子" },
];

const edges: FlowEdge[] = [
  // Knowledge → Methodology
  { from: "refs", to: "iso9", label: "標準來源", type: "reference" },
  { from: "refs", to: "method", label: "方法依據", type: "reference" },
  { from: "defs", to: "block-ana", label: "概念定義", type: "reference" },
  { from: "abbr", to: "block-ana", label: "術語統一", type: "reference" },

  // Methodology → Analysis
  { from: "iso9", to: "method", label: "§7.4.2.3", type: "data" },
  { from: "method", to: "block-ana", label: "定性方法", type: "data" },
  { from: "method", to: "cutset", label: "定量方法", type: "data" },
  { from: "flow", to: "block-ana", label: "B1-B4 步驟", type: "data" },
  { from: "flow", to: "cutset", label: "B9-B12 步驟", type: "data" },

  // Analysis internal
  { from: "block-diag", to: "block-ana", label: "架構輸入", type: "data" },
  { from: "dfi-ex", to: "block-ana", label: "DFI 分類", type: "reference" },
  { from: "dfi-ex", to: "cutset", label: "DFI 分類", type: "reference" },

  // Output flows
  { from: "cutset", to: "ccf-chip", label: "CCCI → βIC", type: "output" },
  { from: "cutset", to: "ccf-logic", label: "CCCI → β", type: "output" },
];

const layerColors: Record<string, { bg: string; border: string; text: string; nodeBg: string }> = {
  "基礎框架": { bg: "bg-slate-50", border: "border-slate-300", text: "text-slate-700", nodeBg: "bg-slate-100" },
  "知識基礎": { bg: "bg-blue-50", border: "border-blue-300", text: "text-blue-700", nodeBg: "bg-blue-100" },
  "方法論": { bg: "bg-emerald-50", border: "border-emerald-300", text: "text-emerald-700", nodeBg: "bg-emerald-100" },
  "分析與計算": { bg: "bg-amber-50", border: "border-amber-300", text: "text-amber-700", nodeBg: "bg-amber-100" },
};

const edgeTypeColors: Record<string, string> = {
  data: "text-indigo-600",
  reference: "text-slate-500",
  output: "text-amber-600",
};

export default function DataFlowPage() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const activeEdges = activeNode
    ? edges.filter(e => e.from === activeNode || e.to === activeNode)
    : [];
  const connectedNodes = new Set(activeEdges.flatMap(e => [e.from, e.to]));

  const layers = [
    { id: 0, name: "Layer 0: 基礎框架", category: "基礎框架" },
    { id: 1, name: "Layer 1: 知識基礎", category: "知識基礎" },
    { id: 2, name: "Layer 2: 方法論", category: "方法論" },
    { id: 3, name: "Layer 3: 分析與計算", category: "分析與計算" },
  ];

  return (
    <Layout>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex items-center gap-2 mb-6">
          <Link href="/"><span className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex items-center gap-1"><ArrowLeft size={12} /> 首頁</span></Link>
          <span className="text-xs text-muted-foreground">/</span>
          <span className="text-xs text-foreground font-medium">資料流向圖</span>
        </div>

        {/* Hero */}
        <div className="relative rounded-xl overflow-hidden mb-8">
          <div className="absolute inset-0">
            <img src={DATA_FLOW_IMG} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/75 to-slate-900/50" />
          </div>
          <div className="relative px-8 py-10">
            <h1 className="text-2xl font-bold text-white mb-2">資料流向圖</h1>
            <p className="text-slate-300 text-sm max-w-xl">
              15 個 Sheet 之間的資料流向與依賴關係。點擊任何節點查看其上下游關聯。
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2 text-xs">
            <span className="w-3 h-0.5 bg-indigo-500 inline-block"></span>
            <span className="text-muted-foreground">資料流</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-3 h-0.5 bg-slate-400 inline-block border-t border-dashed"></span>
            <span className="text-muted-foreground">參考引用</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-3 h-0.5 bg-amber-500 inline-block"></span>
            <span className="text-muted-foreground">輸出</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Flow Diagram */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {layers.map((layer, li) => {
                const layerNodes = nodes.filter(n => n.layer === layer.id);
                const colors = layerColors[layer.category];
                return (
                  <div key={layer.id}>
                    <Card className={`${colors.bg} border ${colors.border}`}>
                      <CardContent className="p-4">
                        <p className={`text-[10px] font-semibold uppercase tracking-widest ${colors.text} mb-3`}>
                          {layer.name}
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center">
                          {layerNodes.map((node) => {
                            const isActive = activeNode === node.id;
                            const isConnected = connectedNodes.has(node.id);
                            const dimmed = activeNode && !isActive && !isConnected;

                            return (
                              <motion.button
                                key={node.id}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setActiveNode(isActive ? null : node.id)}
                                className={`
                                  px-4 py-3 rounded-lg border-2 text-left transition-all duration-200 min-w-[130px]
                                  ${isActive
                                    ? `${colors.nodeBg} ${colors.border} ring-2 ring-offset-1 ring-indigo-400 shadow-md`
                                    : isConnected
                                      ? `bg-white ${colors.border} shadow-sm`
                                      : dimmed
                                        ? "bg-white/50 border-slate-200 opacity-40"
                                        : `bg-white ${colors.border} hover:shadow-sm`
                                  }
                                `}
                              >
                                <p className={`text-xs font-semibold whitespace-pre-line ${isActive ? colors.text : "text-foreground"}`}>
                                  {node.name}
                                </p>
                                <p className="text-[10px] text-muted-foreground mt-0.5">{node.description}</p>
                              </motion.button>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                    {li < layers.length - 1 && (
                      <div className="flex justify-center py-1">
                        <ArrowDown size={16} className="text-slate-300" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Output destination */}
            <div className="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-amber-50 rounded-lg border border-indigo-200/60 text-center">
              <p className="text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-1">最終輸出</p>
              <p className="text-lg font-bold font-mono text-foreground">SPFM / LFM / PMHF</p>
              <p className="text-xs text-muted-foreground mt-1">ISO 26262-5 硬體安全指標</p>
            </div>
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <Card className={`transition-all duration-300 ${activeNode ? "border-indigo-200 shadow-md" : ""}`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold">
                    {activeNode ? nodes.find(n => n.id === activeNode)?.name.replace("\n", " ") : "點擊節點查看關聯"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {activeNode ? (
                    <div className="space-y-4">
                      <p className="text-sm text-foreground">
                        {nodes.find(n => n.id === activeNode)?.description}
                      </p>

                      {activeEdges.filter(e => e.to === activeNode).length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">上游輸入</p>
                          <div className="space-y-1.5">
                            {activeEdges.filter(e => e.to === activeNode).map((e, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs p-2 bg-slate-50 rounded">
                                <span className="font-medium text-indigo-700">{nodes.find(n => n.id === e.from)?.name.replace("\n", " ")}</span>
                                <ArrowRight size={10} className={edgeTypeColors[e.type]} />
                                <span className="text-muted-foreground">{e.label}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeEdges.filter(e => e.from === activeNode).length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">下游輸出</p>
                          <div className="space-y-1.5">
                            {activeEdges.filter(e => e.from === activeNode).map((e, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs p-2 bg-slate-50 rounded">
                                <span className="text-muted-foreground">{e.label}</span>
                                <ArrowRight size={10} className={edgeTypeColors[e.type]} />
                                <span className="font-medium text-amber-700">{nodes.find(n => n.id === e.to)?.name.replace("\n", " ")}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      點擊左側圖中的任何節點，即可查看該 Sheet 的上下游資料流向與依賴關係。
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
