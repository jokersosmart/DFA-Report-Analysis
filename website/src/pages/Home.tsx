/*
 * Home Page — Dashboard Overview
 * Hero section with generated visual + sheet cards grid
 * Analytical Dashboard style: warm gray, amber/indigo accents
 */

import Layout from "@/components/Layout";
import { Link } from "wouter";
import { sheets, referenceDocuments } from "@/lib/reportData";
import { motion } from "framer-motion";
import {
  FileText, BookOpen, Layers, Shield, ArrowRight,
  Eye, EyeOff, AlertTriangle, CheckCircle, Calculator,
  GitBranch, Lightbulb, Workflow, Library
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const HERO_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/9iEmXFVdGKCt3fujdX0Nc4/sandbox/yEO7KPFjkqJa1h3wfPMM8D-img-1_1771992752000_na1fn_aGVyby1iZw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOWlFbVhGVmRHS0N0M2Z1amRYME5jNC9zYW5kYm94L3lFTzdLUEZqa3FKYTFoM3dmUE1NOEQtaW1nLTFfMTc3MTk5Mjc1MjAwMF9uYTFmbl9hR1Z5YnkxaVp3LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=mGXhBXA~4ZnjdOfi0z3TVXTy0EC0wxIlpPx-dvp8bGKuH8uq7sf-7IcIlOQckyLD3XKajZCXEiE7GVHoBR93FpSjDAmMEnhE52nluznphoCKib6sp94gBDn2Katre-jqgak142ObZ7AM7ARPgsUq8QvUNSw8HPvCPNt6mJt7Sfq05cTnw~A~QpOO1iG0nbKOl1ZfzbZaEfYB2~bE05lD~jsWMeiEYPfiIqCkjy9ioyOpHdeVsldQXb-RT6xK4RjyBCzLTpisWP0QN9kjSJ4eS9wPsR2CsBnacZyvVDNHjPjwwkr8dKTxaUXxjJPb4P-q6thE88jZ5ajrukz506lcWw__";

const categoryIcons: Record<string, typeof FileText> = {
  "基礎框架": FileText,
  "知識基礎": BookOpen,
  "方法論": Layers,
  "分析與計算": Shield,
};

const categoryColors: Record<string, string> = {
  "基礎框架": "border-l-slate-400",
  "知識基礎": "border-l-blue-500",
  "方法論": "border-l-emerald-500",
  "分析與計算": "border-l-amber-500",
};

const categoryBadgeColors: Record<string, string> = {
  "基礎框架": "bg-slate-100 text-slate-700",
  "知識基礎": "bg-blue-50 text-blue-700",
  "方法論": "bg-emerald-50 text-emerald-700",
  "分析與計算": "bg-amber-50 text-amber-700",
};

const quickLinks = [
  { path: "/formulas", label: "公式物理意義", icon: Calculator, desc: "170 個公式的深度解析" },
  { path: "/flowchart", label: "DFA 流程圖", icon: Workflow, desc: "B1-B12 互動式工作流程" },
  { path: "/dataflow", label: "資料流向圖", icon: GitBranch, desc: "15 個 Sheet 的關聯地圖" },
  { path: "/references", label: "參考文件", icon: Library, desc: "8 份國際標準解讀" },
  { path: "/platonic", label: "辯證法與提問", icon: Lightbulb, desc: "柏拉圖辯證法 + 蘇格拉底式提問" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } }
};

export default function Home() {
  const categories = ["基礎框架", "知識基礎", "方法論", "分析與計算"];

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
            <p className="text-amber-400 text-xs font-semibold tracking-widest uppercase mb-3">
              RD-03-009-01 &middot; Dependent Failure Analysis
            </p>
            <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
              ADFA 報告深度解析
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-xl">
              這份 Excel 的本質是一個「可審計的理性思維過程」，其 15 個工作表構成了從定義共同語言到用量化砝碼完成安全證明的完整邏輯鏈。
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs">
                <FileText size={12} /> 15 個工作表
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs">
                <Calculator size={12} /> 170 個公式
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs">
                <BookOpen size={12} /> 8 份參考標準
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs">
                <Eye size={12} /> 16 張圖片
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
                <Card className="group hover:shadow-md transition-all duration-200 cursor-pointer border-border/60 hover:border-indigo-200 h-full">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-colors">
                        <Icon size={16} className="text-indigo-600" />
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
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {categories.map((cat) => {
          const catSheets = sheets.filter(s => s.category === cat);
          const Icon = categoryIcons[cat];
          return (
            <motion.div key={cat} variants={itemVariants} className="mb-8">
              <div className="flex items-center gap-2.5 mb-4">
                <div className={`w-1 h-6 rounded-full ${cat === "基礎框架" ? "bg-slate-400" : cat === "知識基礎" ? "bg-blue-500" : cat === "方法論" ? "bg-emerald-500" : "bg-amber-500"}`} />
                <h2 className="text-lg font-bold text-foreground">{cat}</h2>
                <span className="text-xs text-muted-foreground">
                  {catSheets[0]?.platonicIdeal && `— ${catSheets[0].platonicIdeal}`}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {catSheets.map((sheet) => (
                  <Link key={sheet.id} href={`/sheet/${sheet.id}`}>
                    <Card className={`group hover:shadow-md transition-all duration-200 cursor-pointer border-l-4 ${categoryColors[cat]} h-full`}>
                      <CardHeader className="pb-2 pt-4 px-4">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-sm font-semibold text-foreground leading-snug group-hover:text-indigo-700 transition-colors">
                            {sheet.name}
                          </CardTitle>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {sheet.isHidden && (
                              <span title="隱藏的 Sheet" className="text-muted-foreground">
                                <EyeOff size={13} />
                              </span>
                            )}
                            {sheet.isEmpty && (
                              <span title="空白模板" className="text-amber-500">
                                <AlertTriangle size={13} />
                              </span>
                            )}
                            {sheet.formulas && sheet.formulas.length > 0 && (
                              <span title="包含公式" className="text-indigo-500">
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
                            {sheet.platonicIdeal}
                          </Badge>
                          <ArrowRight size={13} className="text-muted-foreground/40 group-hover:text-indigo-500 transition-colors" />
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
        className="mt-8 p-6 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200/60"
      >
        <h3 className="text-base font-bold text-foreground mb-4">核心發現摘要</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">CCCI 公式</p>
            <p className="text-2xl font-bold text-foreground font-mono">G+I+K+M+O</p>
            <p className="text-xs text-muted-foreground mt-1">量化切割集的共因故障潛力，範圍 0-15</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">晶片內冗餘 β 因子</p>
            <p className="text-2xl font-bold text-foreground font-mono">βIC = 33%</p>
            <p className="text-xs text-muted-foreground mt-1">基礎值，所有措施未啟用</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-1">邏輯子系統 β 因子</p>
            <p className="text-2xl font-bold text-foreground font-mono">β = 5%</p>
            <p className="text-xs text-muted-foreground mt-1">最高風險等級（Score S = 0）</p>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
