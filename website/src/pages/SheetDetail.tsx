/*
 * Sheet Detail Page — Individual sheet deep-dive
 * Shows purpose, content, formulas, images for each sheet
 */

import Layout from "@/components/Layout";
import { useParams, Link } from "wouter";
import { sheets, dfiCategories, onChipBetaIncrease, onChipBetaDecrease, betaLookupTable, logicEvalCategories } from "@/lib/reportData";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, AlertTriangle, Calculator, Image, ChevronDown, ChevronUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const categoryBadgeColors: Record<string, string> = {
  "基礎框架": "bg-slate-100 text-slate-700",
  "知識基礎": "bg-blue-50 text-blue-700",
  "方法論": "bg-emerald-50 text-emerald-700",
  "分析與計算": "bg-amber-50 text-amber-700",
};

export default function SheetDetail() {
  const { id } = useParams<{ id: string }>();
  const sheet = sheets.find(s => s.id === id);

  if (!sheet) {
    return (
      <Layout>
        <div className="text-center py-20">
          <p className="text-muted-foreground">找不到此工作表</p>
          <Link href="/">
            <span className="text-indigo-600 text-sm mt-2 inline-block hover:underline">返回首頁</span>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link href="/">
            <span className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex items-center gap-1">
              <ArrowLeft size={12} /> 首頁
            </span>
          </Link>
          <span className="text-xs text-muted-foreground">/</span>
          <span className="text-xs text-foreground font-medium">{sheet.name}</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Badge variant="secondary" className={`text-[11px] ${categoryBadgeColors[sheet.category]}`}>
              {sheet.category}
            </Badge>
            {sheet.isHidden && (
              <Badge variant="outline" className="text-[11px] gap-1">
                <EyeOff size={11} /> 隱藏
              </Badge>
            )}
            {sheet.isEmpty && (
              <Badge variant="outline" className="text-[11px] gap-1 text-amber-600 border-amber-200">
                <AlertTriangle size={11} /> 空白模板
              </Badge>
            )}
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">{sheet.name}</h1>
          <p className="text-sm text-muted-foreground italic">
            柏拉圖式理型：{sheet.platonicIdeal}
          </p>
        </div>

        {/* Purpose */}
        <Card className="mb-6 border-l-4 border-l-indigo-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-indigo-700">存在意義</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground leading-relaxed">{sheet.purpose}</p>
          </CardContent>
        </Card>

        {/* Content */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">內容摘要</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground leading-relaxed">{sheet.content}</p>
          </CardContent>
        </Card>

        {/* Formulas */}
        {sheet.formulas && sheet.formulas.length > 0 && (
          <Card className="mb-6 border-l-4 border-l-amber-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-amber-700 flex items-center gap-2">
                <Calculator size={15} /> 公式與物理意義
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" className="w-full">
                {sheet.formulas.map((f, i) => (
                  <AccordionItem key={i} value={`formula-${i}`}>
                    <AccordionTrigger className="text-sm hover:no-underline">
                      <code className="font-mono text-sm bg-slate-100 px-2 py-0.5 rounded">{f.formula}</code>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pt-2">
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">物理意義</p>
                          <p className="text-sm text-foreground">{f.physicalMeaning}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">位置</p>
                            <p className="text-sm font-mono text-foreground">{f.location}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">依據標準</p>
                            <p className="text-sm text-foreground">{f.standard} {f.section}</p>
                          </div>
                        </div>
                        {f.variables && f.variables.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">變數說明</p>
                            <div className="bg-slate-50 rounded-lg p-3">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="text-left text-xs text-muted-foreground">
                                    <th className="pb-2 pr-4">變數</th>
                                    <th className="pb-2 pr-4">意義</th>
                                    <th className="pb-2">範圍</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {f.variables.map((v, vi) => (
                                    <tr key={vi} className="border-t border-slate-200">
                                      <td className="py-1.5 pr-4 font-mono font-medium">{v.name}</td>
                                      <td className="py-1.5 pr-4">{v.meaning}</td>
                                      <td className="py-1.5 font-mono text-xs">{v.range}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        )}

        {/* Images */}
        {sheet.images && sheet.images.length > 0 && (
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Image size={15} /> 嵌入圖片
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sheet.images.map((img, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-200/60">
                    <p className="text-sm font-semibold text-foreground mb-1">{img.name}</p>
                    <p className="text-xs text-muted-foreground mb-1">{img.description}</p>
                    <p className="text-xs text-indigo-600">作用：{img.purpose}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Special: DFI Categories for dfi-examples sheet */}
        {sheet.id === "dfi-examples" && (
          <Card className="mb-6 border-l-4 border-l-emerald-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-emerald-700">7 大類 DFI 詳細清單</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dfiCategories.map((dfi) => (
                  <div key={dfi.id} className="p-4 bg-white rounded-lg border border-slate-200/60 hover:border-emerald-200 transition-colors">
                    <div className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0">
                        {dfi.id}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{dfi.name}</p>
                        <p className="text-xs text-muted-foreground mb-1">{dfi.nameCn}</p>
                        <p className="text-xs text-foreground leading-relaxed">{dfi.description}</p>
                        <p className="text-xs text-indigo-600 mt-1">典型範例：{dfi.examples}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Special: On-Chip Beta Factor Calculator */}
        {sheet.id === "ccf-calc-on-chip" && <OnChipBetaCalculator />}

        {/* Special: Logic Beta Factor Calculator */}
        {sheet.id === "ccf-calc-logic" && <LogicBetaCalculator />}
      </motion.div>
    </Layout>
  );
}

function OnChipBetaCalculator() {
  const [increases, setIncreases] = useState<boolean[]>(new Array(onChipBetaIncrease.length).fill(false));
  const [decreases, setDecreases] = useState<boolean[]>(new Array(onChipBetaDecrease.length).fill(false));

  const baseBeta = 33;
  const totalIncrease = increases.reduce((sum, on, i) => sum + (on ? parseFloat(onChipBetaIncrease[i].delta) : 0), 0);
  const totalDecrease = decreases.reduce((sum, on, i) => sum + (on ? parseFloat(onChipBetaDecrease[i].delta) : 0), 0);
  const finalBeta = Math.max(0, baseBeta + totalIncrease + totalDecrease);

  return (
    <Card className="mb-6 border-l-4 border-l-amber-500">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-amber-700 flex items-center gap-2">
          <Calculator size={15} /> 互動式 βIC 計算器
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-indigo-50 rounded-lg text-center">
          <p className="text-xs text-muted-foreground mb-1">βIC = βB-IC + Σ增加 - Σ降低</p>
          <p className="text-3xl font-bold font-mono text-foreground">
            βIC = <span className={finalBeta > 20 ? "text-red-600" : finalBeta > 10 ? "text-amber-600" : "text-emerald-600"}>{finalBeta.toFixed(0)}%</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {baseBeta}% + ({totalIncrease > 0 ? "+" : ""}{totalIncrease}%) + ({totalDecrease}%)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-3 flex items-center gap-1">
              <ArrowUpRight size={12} /> 增加 β 因子
            </p>
            {onChipBetaIncrease.map((item, i) => (
              <label key={i} className="flex items-start gap-2.5 mb-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={increases[i]}
                  onChange={() => {
                    const next = [...increases];
                    next[i] = !next[i];
                    setIncreases(next);
                  }}
                  className="mt-0.5 accent-red-500"
                />
                <div>
                  <p className="text-xs font-medium text-foreground group-hover:text-red-600 transition-colors">
                    {item.measure} <span className="font-mono text-red-500">{item.delta}</span>
                  </p>
                  <p className="text-[11px] text-muted-foreground">{item.meaning}</p>
                </div>
              </label>
            ))}
          </div>
          <div>
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-3 flex items-center gap-1">
              <ArrowDownRight size={12} /> 降低 β 因子
            </p>
            {onChipBetaDecrease.map((item, i) => (
              <label key={i} className="flex items-start gap-2.5 mb-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={decreases[i]}
                  onChange={() => {
                    const next = [...decreases];
                    next[i] = !next[i];
                    setDecreases(next);
                  }}
                  className="mt-0.5 accent-emerald-500"
                />
                <div>
                  <p className="text-xs font-medium text-foreground group-hover:text-emerald-600 transition-colors">
                    {item.measure} <span className="font-mono text-emerald-500">{item.delta}</span>
                  </p>
                  <p className="text-[11px] text-muted-foreground">{item.meaning}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LogicBetaCalculator() {
  const [score, setScore] = useState(0);

  const getBeta = (s: number) => {
    if (s < 45) return { beta: "5%", risk: "最高風險", color: "text-red-600", bg: "bg-red-50" };
    if (s < 70) return { beta: "2%", risk: "中等風險", color: "text-amber-600", bg: "bg-amber-50" };
    if (s < 120) return { beta: "1%", risk: "低風險", color: "text-emerald-600", bg: "bg-emerald-50" };
    return { beta: "0.5%", risk: "最低風險", color: "text-indigo-600", bg: "bg-indigo-50" };
  };

  const result = getBeta(score);

  return (
    <Card className="mb-6 border-l-4 border-l-indigo-500">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-indigo-700 flex items-center gap-2">
          <Calculator size={15} /> 互動式邏輯 β 因子查表
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
            Score S 值（拖動滑桿）
          </label>
          <input
            type="range"
            min={0}
            max={150}
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
            className="w-full accent-indigo-600"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
            <span>0</span><span>45</span><span>70</span><span>120</span><span>150</span>
          </div>
        </div>

        <div className={`p-4 rounded-lg ${result.bg} text-center mb-4`}>
          <p className="text-xs text-muted-foreground mb-1">Score S = {score}</p>
          <p className={`text-3xl font-bold font-mono ${result.color}`}>β = {result.beta}</p>
          <p className={`text-xs mt-1 ${result.color}`}>{result.risk}</p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">β 值查表（IEC 61508 Table D.4）</p>
          {betaLookupTable.map((row, i) => (
            <div key={i} className={`flex items-center justify-between p-2.5 rounded-lg border ${score >= 0 && ((i === 0 && score < 45) || (i === 1 && score >= 45 && score < 70) || (i === 2 && score >= 70 && score < 120) || (i === 3 && score >= 120)) ? "border-indigo-300 bg-indigo-50" : "border-slate-200 bg-white"}`}>
              <span className="text-xs font-mono">{row.range}</span>
              <span className={`text-sm font-bold font-mono ${row.color}`}>{row.beta}</span>
              <span className="text-xs text-muted-foreground">{row.risk}</span>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">8 大評估類別</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {logicEvalCategories.map((cat, i) => (
              <div key={i} className="flex items-center gap-2 p-2 bg-slate-50 rounded text-xs text-foreground">
                <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                  {i + 1}
                </span>
                {cat}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
