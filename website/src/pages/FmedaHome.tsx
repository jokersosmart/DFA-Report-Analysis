/*
 * FMEDA Home Page — Dashboard Overview
 * Mirrors DFA Home structure but with FMEDA-specific data
 * Analytical Dashboard style: warm gray, rose/indigo accents for FMEDA
 */

import Layout from "@/components/Layout";
import { Link } from "wouter";
import { fmedaSheets, fmedaReferenceDocuments, fmedaStats } from "@/lib/fmedaData";
import { motion } from "framer-motion";
import {
  FileText, BookOpen, Layers, Shield, ArrowRight,
  Eye, EyeOff, AlertTriangle, Calculator,
  GitBranch, Lightbulb, Workflow, Library, Database, Cpu
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const HERO_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/9iEmXFVdGKCt3fujdX0Nc4/sandbox/yEO7KPFjkqJa1h3wfPMM8D-img-4_1771992752000_na1fn_ZGF0YS1mbG93LXZpc3VhbA.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOWlFbVhGVmRHS0N0M2Z1amRYME5jNC9zYW5kYm94L3lFTzdLUEZqa3FKYTFoM3dmUE1NOEQtaW1nLTRfMTc3MTk5Mjc1MjAwMF9uYTFmbl9aR0YwWVMxbWJHOTNMWFpwYzNWaGJBLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Hs4hD6rHEV3BVxXWUGHnmUXmDGLnDlqeqQnUlEFqJPwGYfHHwzIYqUmXqFYHvKi7HGRBLCIhCUj8VqxjQp1NdPwfBVxhZHxjqaWD-zyMbVCcbVFdKfuZBqPLAf3Tz6-0QZLlVkOBVfGRpGWbWQCJQ3Y8Xqf-~f~Nt7fXjfpf3LFBcRWnXpS~y-8xNPzIqVPxfwLLOxTgN3Ql3-4Hf7ygqXQTk5cE~c-4~1pu7Ug5J~ybFLzKHZWWJPqBvnqKOJLJQ-qUmLgVDqvGCXBvdNXkSZLF3Eo0~H7HXNfNjVwqRhwNqy7uJnDwqnEHx1rGCMW-6~KUvPkCXbAWIJpBPHQ__";

const categoryIcons: Record<string, typeof FileText> = {
  "行政管理": FileText,
  "定義與方法論": BookOpen,
  "失效率計算": Cpu,
  "核心分析": Database,
  "CCF 分析": Shield,
  "評估結果": Layers,
};

const categoryColors: Record<string, string> = {
  "行政管理": "border-l-slate-400",
  "定義與方法論": "border-l-blue-500",
  "失效率計算": "border-l-emerald-500",
  "核心分析": "border-l-amber-500",
  "CCF 分析": "border-l-rose-500",
  "評估結果": "border-l-indigo-500",
};

const categoryBadgeColors: Record<string, string> = {
  "行政管理": "bg-slate-100 text-slate-700",
  "定義與方法論": "bg-blue-50 text-blue-700",
  "失效率計算": "bg-emerald-50 text-emerald-700",
  "核心分析": "bg-amber-50 text-amber-700",
  "CCF 分析": "bg-rose-50 text-rose-700",
  "評估結果": "bg-indigo-50 text-indigo-700",
};

const quickLinks = [
  { path: "/fmeda/formulas", label: "公式物理意義", icon: Calculator, desc: "597,466 個公式的深度解析" },
  { path: "/fmeda/flowchart", label: "計算流程鏈", icon: Workflow, desc: "從失效率到安全度量的完整鏈路" },
  { path: "/fmeda/dataflow", label: "資料流向圖", icon: GitBranch, desc: "27 個 Sheet 的關聯地圖" },
  { path: "/fmeda/references", label: "參考文件", icon: Library, desc: "8 份國際標準解讀" },
  { path: "/fmeda/dialectic", label: "辯證法與提問", icon: Lightbulb, desc: "柏拉圖辯證法 + 蘇格拉底式提問" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } }
};

export default function FmedaHome() {
  const categories = ["行政管理", "定義與方法論", "失效率計算", "核心分析", "CCF 分析", "評估結果"];

  return (
    <Layout>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-xl overflow-hidden mb-8"
      >
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/40" />
        </div>
        <div className="relative px-8 py-12 lg:py-16">
          <div className="max-w-2xl">
            <p className="text-rose-400 text-xs font-semibold tracking-widest uppercase mb-3">
              RD-03-008-01 &middot; Failure Modes Effects & Diagnostic Analysis
            </p>
            <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
              FMEDA 報告深度解析
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-xl">
              這份 Excel 是一個「以計算為手段的論證系統」，其 27 個工作表和 597,466 個公式構成了從失效率預測到安全度量證明的完整量化論證鏈。
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs">
                <FileText size={12} /> {fmedaStats.totalSheets} 個工作表
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs">
                <Calculator size={12} /> {fmedaStats.totalFormulas.toLocaleString()} 個公式
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs">
                <BookOpen size={12} /> {fmedaStats.totalReferences} 份參考標準
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs">
                <Eye size={12} /> {fmedaStats.totalImages} 張圖片
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Links */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-10"
      >
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <motion.div key={link.path} variants={itemVariants}>
              <Link href={link.path}>
                <Card className="group hover:shadow-md transition-all duration-200 cursor-pointer border-border/60 hover:border-rose-200 h-full">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-rose-50 flex items-center justify-center shrink-0 group-hover:bg-rose-100 transition-colors">
                        <Icon size={16} className="text-rose-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{link.label}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{link.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Sheet Cards by Category */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        {categories.map((cat) => {
          const catSheets = fmedaSheets.filter(s => s.category === cat);
          return (
            <motion.div key={cat} variants={itemVariants} className="mb-8">
              <div className="flex items-center gap-2.5 mb-4">
                <div className={`w-1 h-6 rounded-full ${
                  cat === "行政管理" ? "bg-slate-400" :
                  cat === "定義與方法論" ? "bg-blue-500" :
                  cat === "失效率計算" ? "bg-emerald-500" :
                  cat === "核心分析" ? "bg-amber-500" :
                  cat === "CCF 分析" ? "bg-rose-500" : "bg-indigo-500"
                }`} />
                <h2 className="text-lg font-bold text-foreground">{cat}</h2>
                <span className="text-xs text-muted-foreground ml-1">
                  ({catSheets.length} sheets)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {catSheets.map((sheet) => (
                  <Link key={sheet.id} href={`/fmeda/sheet/${sheet.id}`}>
                    <Card className={`group hover:shadow-md transition-all duration-200 cursor-pointer border-l-4 ${categoryColors[cat]} h-full`}>
                      <CardHeader className="pb-2 pt-4 px-4">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-sm font-semibold text-foreground leading-snug group-hover:text-rose-700 transition-colors">
                            {sheet.name}
                          </CardTitle>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {sheet.isHidden && (
                              <span title="隱藏的 Sheet" className="text-muted-foreground"><EyeOff size={13} /></span>
                            )}
                            {sheet.formulaCount && sheet.formulaCount > 0 && (
                              <span title={`${sheet.formulaCount.toLocaleString()} 個公式`} className="text-rose-500">
                                <Calculator size={13} />
                              </span>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="px-4 pb-4">
                        <p className="text-[12px] text-muted-foreground leading-relaxed line-clamp-3 mb-3">
                          {sheet.purpose}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className={`text-[10px] px-2 py-0.5 ${categoryBadgeColors[cat]}`}>
                            {sheet.dialecticIdeal}
                          </Badge>
                          <ArrowRight size={13} className="text-muted-foreground/40 group-hover:text-rose-500 transition-colors" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 p-6 rounded-xl bg-gradient-to-br from-slate-50 to-rose-50/30 border border-slate-200/60"
      >
        <h3 className="text-base font-bold text-foreground mb-4">核心發現摘要</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-xs font-semibold text-rose-600 uppercase tracking-wider mb-1">FMEDA 主表規模</p>
            <p className="text-2xl font-bold text-foreground font-mono">{fmedaStats.mainTableRows.toLocaleString()} × {fmedaStats.mainTableCols}</p>
            <p className="text-xs text-muted-foreground mt-1">{fmedaStats.mainTableFormulas.toLocaleString()} 個公式</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-rose-600 uppercase tracking-wider mb-1">晶片內冗餘 β 因子</p>
            <p className="text-2xl font-bold text-foreground font-mono">βIC = {fmedaStats.betaOnChip}</p>
            <p className="text-xs text-muted-foreground mt-1">高於 DFA 的 33%，增加因子已啟用</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-1">邏輯子系統 β 因子</p>
            <p className="text-2xl font-bold text-foreground font-mono">β = {fmedaStats.betaLogic}</p>
            <p className="text-xs text-muted-foreground mt-1">最高風險等級（Score S = 0）</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">評估體系</p>
            <p className="text-2xl font-bold text-foreground font-mono">3 套</p>
            <p className="text-xs text-muted-foreground mt-1">ISO 26262 + IEC 61508 Opt1/Opt2</p>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
