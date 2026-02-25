/*
 * FMEDA Dialectic & Socratic Questioning Page
 * Plato's Dialectic Method + Socratic Questioning for FMEDA analysis
 */

import Layout from "@/components/Layout";
import { fmedaDialecticRounds } from "@/lib/fmedaData";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Lightbulb, ArrowRight, ChevronDown, MessageCircle,
  ThumbsUp, ThumbsDown, Scale
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } }
};

export default function FmedaDialecticPage() {
  const [expandedRound, setExpandedRound] = useState<number | null>(0);
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});

  const toggleQuestion = (key: string) => {
    setExpandedQuestions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Layout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center">
              <Lightbulb size={20} className="text-rose-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">柏拉圖辯證法與蘇格拉底式提問</h1>
              <p className="text-xs text-muted-foreground mt-0.5">FMEDA 報告 — RD-03-008-01</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
            運用柏拉圖辯證法（正題 → 反題 → 合題）和蘇格拉底式提問法（六大類型追問）對 FMEDA 報告進行哲學層面的深度分析。
            每一輪辯證都從一個核心命題出發，通過正反對立最終達到更高層次的理解。
          </p>
        </div>

        {/* Method Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card className="border-l-4 border-l-rose-400">
            <CardContent className="p-4">
              <h3 className="text-sm font-bold text-rose-700 mb-2">柏拉圖辯證法</h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">正題 Thesis</Badge>
                <ArrowRight size={12} />
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">反題 Antithesis</Badge>
                <ArrowRight size={12} />
                <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">合題 Synthesis</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-2">通過正反對立的辯證過程，達到對事物本質更深層的理解。</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-amber-400">
            <CardContent className="p-4">
              <h3 className="text-sm font-bold text-amber-700 mb-2">蘇格拉底式提問</h3>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {["澄清", "假設探究", "證據追問", "觀點探究", "影響推論", "反思提問"].map(t => (
                  <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">六大類型的追問，層層深入直到觸及問題的根本。</p>
            </CardContent>
          </Card>
        </div>

        {/* Dialectic Rounds */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          {fmedaDialecticRounds.map((round) => (
            <motion.div key={round.id} variants={itemVariants}>
              <Card className={`overflow-hidden transition-all duration-300 ${expandedRound === round.id ? "shadow-lg ring-1 ring-rose-200" : ""}`}>
                <button
                  onClick={() => setExpandedRound(expandedRound === round.id ? null : round.id)}
                  className="w-full text-left"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-sm font-bold text-rose-700">{round.id}</span>
                        </div>
                        <div>
                          <CardTitle className="text-base font-bold text-foreground">{round.topic}</CardTitle>
                        </div>
                      </div>
                      <ChevronDown size={18} className={`text-muted-foreground transition-transform shrink-0 mt-1 ${expandedRound === round.id ? "rotate-180" : ""}`} />
                    </div>
                  </CardHeader>
                </button>

                {expandedRound === round.id && (
                  <CardContent className="pt-0 pb-6">
                    {/* Thesis → Antithesis → Synthesis */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                      {/* Thesis */}
                      <div className="p-4 rounded-lg bg-emerald-50/50 border border-emerald-200/60">
                        <div className="flex items-center gap-2 mb-2">
                          <ThumbsUp size={14} className="text-emerald-600" />
                          <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">正題 Thesis</p>
                        </div>
                        <p className="text-sm font-semibold text-foreground mb-2">{round.thesis.title}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{round.thesis.content}</p>
                      </div>

                      {/* Antithesis */}
                      <div className="p-4 rounded-lg bg-red-50/50 border border-red-200/60">
                        <div className="flex items-center gap-2 mb-2">
                          <ThumbsDown size={14} className="text-red-600" />
                          <p className="text-xs font-bold text-red-700 uppercase tracking-wider">反題 Antithesis</p>
                        </div>
                        <p className="text-sm font-semibold text-foreground mb-2">{round.antithesis.title}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{round.antithesis.content}</p>
                      </div>

                      {/* Synthesis */}
                      <div className="p-4 rounded-lg bg-indigo-50/50 border border-indigo-200/60">
                        <div className="flex items-center gap-2 mb-2">
                          <Scale size={14} className="text-indigo-600" />
                          <p className="text-xs font-bold text-indigo-700 uppercase tracking-wider">合題 Synthesis</p>
                        </div>
                        <p className="text-sm font-semibold text-foreground mb-2">{round.synthesis.title}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{round.synthesis.content}</p>
                      </div>
                    </div>

                    {/* Socratic Questions */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <MessageCircle size={14} className="text-amber-600" />
                        <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">蘇格拉底式追問</p>
                      </div>
                      <div className="space-y-2">
                        {round.socraticQuestions.map((q, qi) => {
                          const qKey = `${round.id}-${qi}`;
                          return (
                            <div key={qi} className="border border-border/40 rounded-lg overflow-hidden">
                              <button
                                onClick={() => toggleQuestion(qKey)}
                                className="w-full flex items-center gap-3 p-3 hover:bg-muted/20 transition-colors text-left"
                              >
                                <Badge variant="secondary" className="text-[10px] shrink-0">{q.type}</Badge>
                                <p className="text-sm text-foreground flex-1">{q.question}</p>
                                <ChevronDown size={14} className={`text-muted-foreground transition-transform shrink-0 ${expandedQuestions[qKey] ? "rotate-180" : ""}`} />
                              </button>
                              {expandedQuestions[qKey] && (
                                <div className="px-3 pb-3 border-t border-border/30 bg-amber-50/30">
                                  <p className="text-sm text-muted-foreground leading-relaxed pt-3">{q.answer}</p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </Layout>
  );
}
