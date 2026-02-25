/*
 * FMEDA Sheet Detail Page
 * Shows detailed info for each FMEDA sheet
 */

import Layout from "@/components/Layout";
import { useParams, Link } from "wouter";
import { fmedaSheets } from "@/lib/fmedaData";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Eye, EyeOff, Calculator,
  Image, FileText, ChevronDown
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function FmedaSheetDetail() {
  const { id } = useParams<{ id: string }>();
  const sheet = fmedaSheets.find(s => s.id === id);
  const currentIndex = fmedaSheets.findIndex(s => s.id === id);
  const prevSheet = currentIndex > 0 ? fmedaSheets[currentIndex - 1] : null;
  const nextSheet = currentIndex < fmedaSheets.length - 1 ? fmedaSheets[currentIndex + 1] : null;
  const [expandedFormula, setExpandedFormula] = useState<number | null>(null);

  if (!sheet) {
    return (
      <Layout>
        <div className="text-center py-20">
          <p className="text-muted-foreground">找不到此工作表</p>
          <Link href="/fmeda"><span className="text-rose-600 hover:underline mt-2 inline-block">返回 FMEDA 總覽</span></Link>
        </div>
      </Layout>
    );
  }

  const categoryColorMap: Record<string, string> = {
    "行政管理": "bg-slate-500",
    "定義與方法論": "bg-blue-500",
    "失效率計算": "bg-emerald-500",
    "核心分析": "bg-amber-500",
    "CCF 分析": "bg-rose-500",
    "評估結果": "bg-indigo-500",
  };

  return (
    <Layout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
          <Link href="/fmeda"><span className="hover:text-rose-600 transition-colors cursor-pointer">FMEDA 總覽</span></Link>
          <span>/</span>
          <span className="text-foreground font-medium">{sheet.name}</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className={`w-2 h-12 rounded-full ${categoryColorMap[sheet.category] || "bg-slate-500"}`} />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-foreground">{sheet.name}</h1>
                {sheet.isHidden && (
                  <Badge variant="outline" className="text-xs gap-1"><EyeOff size={11} /> 隱藏</Badge>
                )}
                {sheet.formulaCount && (
                  <Badge variant="secondary" className="text-xs gap-1 bg-rose-50 text-rose-700">
                    <Calculator size={11} /> {sheet.formulaCount.toLocaleString()} 公式
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge className={`text-[10px] ${categoryColorMap[sheet.category] || "bg-slate-500"} text-white`}>
                  {sheet.category}
                </Badge>
                <span className="text-xs text-muted-foreground">辯證理想：{sheet.dialecticIdeal}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Purpose */}
        <Card className="mb-6 border-l-4 border-l-rose-400">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-rose-700">存在意義</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground leading-relaxed">{sheet.purpose}</p>
          </CardContent>
        </Card>

        {/* Content */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <FileText size={14} /> 內容詳情
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">{sheet.content}</p>
          </CardContent>
        </Card>

        {/* Formulas */}
        {sheet.formulas && sheet.formulas.length > 0 && (
          <Card className="mb-6 border-l-4 border-l-amber-400">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Calculator size={14} className="text-amber-600" /> 核心公式
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {sheet.formulas.map((f, i) => (
                <div key={i} className="border border-border/60 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedFormula(expandedFormula === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
                  >
                    <code className="text-sm font-mono text-rose-700 bg-rose-50 px-3 py-1 rounded">{f.formula}</code>
                    <ChevronDown size={16} className={`text-muted-foreground transition-transform ${expandedFormula === i ? "rotate-180" : ""}`} />
                  </button>
                  {expandedFormula === i && (
                    <div className="px-4 pb-4 border-t border-border/40 bg-muted/10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                        <div>
                          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">位置</p>
                          <p className="text-sm">{f.location}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">標準依據</p>
                          <p className="text-sm">{f.standard}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">物理意義</p>
                        <p className="text-sm text-foreground leading-relaxed">{f.physicalMeaning}</p>
                      </div>
                      {f.variables && f.variables.length > 0 && (
                        <div className="mt-3">
                          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">變數說明</p>
                          <div className="space-y-1.5">
                            {f.variables.map((v, j) => (
                              <div key={j} className="flex items-start gap-2 text-sm">
                                <code className="text-xs font-mono bg-slate-100 px-1.5 py-0.5 rounded shrink-0">{v.name}</code>
                                <span className="text-muted-foreground">{v.meaning}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Images */}
        {sheet.images && sheet.images.length > 0 && (
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Image size={14} className="text-emerald-600" /> 嵌入圖片
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sheet.images.map((img, i) => (
                  <div key={i} className="p-3 bg-muted/20 rounded-lg border border-border/40">
                    <p className="text-sm font-medium text-foreground mb-1">{img.name}</p>
                    <p className="text-xs text-muted-foreground mb-1">{img.description}</p>
                    <p className="text-xs text-rose-600">用途：{img.purpose}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-border/40">
          {prevSheet ? (
            <Link href={`/fmeda/sheet/${prevSheet.id}`}>
              <span className="flex items-center gap-2 text-sm text-muted-foreground hover:text-rose-600 transition-colors cursor-pointer">
                <ArrowLeft size={14} /> {prevSheet.name}
              </span>
            </Link>
          ) : <div />}
          {nextSheet ? (
            <Link href={`/fmeda/sheet/${nextSheet.id}`}>
              <span className="flex items-center gap-2 text-sm text-muted-foreground hover:text-rose-600 transition-colors cursor-pointer">
                {nextSheet.name} <ArrowRight size={14} />
              </span>
            </Link>
          ) : <div />}
        </div>
      </motion.div>
    </Layout>
  );
}
