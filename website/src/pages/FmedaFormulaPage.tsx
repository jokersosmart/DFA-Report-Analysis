/*
 * FMEDA Formula Explorer Page
 * Shows formula chain and physical meanings for FMEDA
 */

import Layout from "@/components/Layout";
import { fmedaSheets, fmedaFormulaChain } from "@/lib/fmedaData";
import { motion } from "framer-motion";
import { useState } from "react";
import { Calculator, ArrowDown, ChevronDown, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function FmedaFormulaPage() {
  const [search, setSearch] = useState("");
  const [expandedFormula, setExpandedFormula] = useState<string | null>(null);

  const sheetsWithFormulas = fmedaSheets.filter(s => s.formulas && s.formulas.length > 0);

  const filteredSheets = search
    ? sheetsWithFormulas.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.formulas?.some(f =>
          f.formula.toLowerCase().includes(search.toLowerCase()) ||
          f.physicalMeaning.toLowerCase().includes(search.toLowerCase())
        )
      )
    : sheetsWithFormulas;

  return (
    <Layout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <Calculator size={20} className="text-amber-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">FMEDA 公式物理意義</h1>
              <p className="text-xs text-muted-foreground mt-0.5">597,466 個公式的深度解析</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="搜尋公式、變數或物理意義..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Formula Chain */}
        <Card className="mb-8 border-l-4 border-l-rose-400">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-rose-700">計算鏈：從失效率到安全度量</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {fmedaFormulaChain.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold text-rose-700">{step.step}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm">
                      <code className="text-xs font-mono bg-slate-100 px-1.5 py-0.5 rounded">{step.from}</code>
                      <ArrowDown size={12} className="text-muted-foreground rotate-[-90deg]" />
                      <code className="text-xs font-mono bg-rose-50 px-1.5 py-0.5 rounded text-rose-700">{step.to}</code>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Formulas by Sheet */}
        <div className="space-y-4">
          {filteredSheets.map((sheet) => (
            <Card key={sheet.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold">{sheet.name}</CardTitle>
                  {sheet.formulaCount && (
                    <Badge variant="secondary" className="text-[10px]">
                      {sheet.formulaCount.toLocaleString()} 公式
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {sheet.formulas?.map((f, i) => {
                  const key = `${sheet.id}-${i}`;
                  return (
                    <div key={i} className="border border-border/40 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setExpandedFormula(expandedFormula === key ? null : key)}
                        className="w-full flex items-center justify-between p-3 hover:bg-muted/20 transition-colors"
                      >
                        <code className="text-sm font-mono text-rose-700 bg-rose-50 px-2 py-0.5 rounded text-left">{f.formula}</code>
                        <ChevronDown size={14} className={`text-muted-foreground transition-transform shrink-0 ml-2 ${expandedFormula === key ? "rotate-180" : ""}`} />
                      </button>
                      {expandedFormula === key && (
                        <div className="px-3 pb-3 border-t border-border/30 bg-muted/10">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
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
                            <p className="text-sm leading-relaxed">{f.physicalMeaning}</p>
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
                  );
                })}
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </Layout>
  );
}
