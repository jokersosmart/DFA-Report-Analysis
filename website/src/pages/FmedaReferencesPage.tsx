/*
 * FMEDA References Page
 * Shows all 8 reference documents and their roles in the FMEDA report
 */

import Layout from "@/components/Layout";
import { fmedaReferenceDocuments } from "@/lib/fmedaData";
import { motion } from "framer-motion";
import { useState } from "react";
import { Library, ChevronDown, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FmedaReferencesPage() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <Layout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
              <Library size={20} className="text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">FMEDA 參考文件解讀</h1>
              <p className="text-xs text-muted-foreground mt-0.5">8 份國際標準的詳細解析</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
            這 8 份參考文件構成了 FMEDA 報告的權威性基礎。每一份都在報告中扮演特定的角色，從失效率預測模型到安全度量定義，再到共因故障分析方法。
          </p>
        </div>

        {/* Reference Cards */}
        <div className="space-y-3">
          {fmedaReferenceDocuments.map((ref) => (
            <motion.div
              key={ref.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ref.id * 0.05 }}
            >
              <Card className={`overflow-hidden transition-all duration-200 ${expanded === ref.id ? "shadow-md ring-1 ring-indigo-200" : ""}`}>
                <button
                  onClick={() => setExpanded(expanded === ref.id ? null : ref.id)}
                  className="w-full text-left"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-indigo-700">{ref.id}</span>
                        </div>
                        <div>
                          <CardTitle className="text-sm font-bold">{ref.name}</CardTitle>
                          <p className="text-xs text-muted-foreground mt-0.5">{ref.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge variant="secondary" className="text-[10px]">{ref.version}</Badge>
                        <ChevronDown size={16} className={`text-muted-foreground transition-transform ${expanded === ref.id ? "rotate-180" : ""}`} />
                      </div>
                    </div>
                  </CardHeader>
                </button>
                {expanded === ref.id && (
                  <CardContent className="pt-0 pb-4 border-t border-border/30">
                    <p className="text-sm text-muted-foreground leading-relaxed mt-3">{ref.details}</p>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Layout>
  );
}
