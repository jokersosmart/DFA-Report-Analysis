/*
 * Formula Explorer — Deep dive into all 170 formulas
 * Shows formula physical meaning, cross-references, and standards
 */

import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const FORMULA_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/9iEmXFVdGKCt3fujdX0Nc4/sandbox/yEO7KPFjkqJa1h3wfPMM8D-img-3_1771992756000_na1fn_Zm9ybXVsYS12aXN1YWw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvOWlFbVhGVmRHS0N0M2Z1amRYME5jNC9zYW5kYm94L3lFTzdLUEZqa3FKYTFoM3dmUE1NOEQtaW1nLTNfMTc3MTk5Mjc1NjAwMF9uYTFmbl9abTl5YlhWc1lTMTJhWE4xWVd3LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=aJ-rZ5S4~cUDEm6xhzLsl5QnOM91LN4WReTXUdALKdZdOs1HtzP4kwkNAICv2EGrP6AH8hWiLdw69~q1y-QBq90XL6PaSXAGEAPKIdSIorZzipbeULJWRKFigEU0W2txh3AowyE4l6jFNTgNUu-TbSh7K~aklSELwFKC2DDSTpW3T8P7ozS55bvhk3yMXlYuofLyS5LRHZQF9n1ie7XP9k5R4kqqYuZpfZBpi9w8UPRaRCwBSUq~brTQMKWg5C8Rjm~DiCwXRuaw0P5ylOkmbI6S6WepJhumHmw3YM6qCYRW5AiBNSuZHPds~vFXay4mAZoHx4Snrtb0Sk-KPHRKLg__";

interface FormulaGroup {
  sheet: string;
  sheetId: string;
  standard: string;
  section: string;
  formulas: {
    formula: string;
    count: number;
    physicalMeaning: string;
    variables: string;
  }[];
}

const formulaGroups: FormulaGroup[] = [
  {
    sheet: "Cut Set based Analysis",
    sheetId: "cut-set-based-analysis",
    standard: "ISO 26262-10",
    section: "Annex A.3.6",
    formulas: [{
      formula: "CCCI = G + I + K + M + O",
      count: 86,
      physicalMeaning: "量化切割集元件間的共因故障潛力。五個維度分別評估空間距離、共享資源、傳導資訊、相同技術、同封裝等耦合因素。CCCI 值越高（最高 15），表示共因故障風險越大，需要更深入的調查或額外的緩解措施。",
      variables: "G（空間解析度 0-3）、I（共享資源 0-3）、K（傳導相同資訊 0-3）、M（相同功能與技術 0-3）、O（同封裝元件 0-3）"
    }]
  },
  {
    sheet: "CCF Calc. On-Chip Red.",
    sheetId: "ccf-calc-on-chip",
    standard: "IEC 61508 Ed. 2",
    section: "Annex D (延伸)",
    formulas: [
      {
        formula: "βIC = βB-IC + Σ(增加因子) - Σ(降低因子)",
        count: 47,
        physicalMeaning: "量化晶片內冗餘的共因故障比例。βB-IC = 33% 是基礎值，代表在沒有任何措施的情況下，33% 的故障被認為是共因故障。4 項增加因子代表晶片內部耦合（如看門狗、交叉連線），11 項降低因子代表設計措施（如多樣性、EMC 測試、電源隔離）。",
        variables: "βB-IC = 33%（基礎值）、增加因子（+2% ~ +5%）、降低因子（-2% ~ -9%）"
      },
      {
        formula: "啟用值 = IF(條件, Δβ, 0)",
        count: 15,
        physicalMeaning: "每個措施的啟用/停用控制。F 欄為 0 表示未啟用，非 0 表示啟用。啟用後對應的 Δβ 值會被加入或減去。",
        variables: "F 欄（啟用控制 0/1）、Δβ（各措施的 β 變化量）"
      }
    ]
  },
  {
    sheet: "CCF Calc. Logic",
    sheetId: "ccf-calc-logic",
    standard: "IEC 61508 Ed. 2",
    section: "Annex D, Table D.1-D.4",
    formulas: [
      {
        formula: "S = Σx + Σy",
        count: 12,
        physicalMeaning: "不考慮診斷的基本信心分數。x 和 y 分別來自 8 大評估類別的評分。Score S 反映了系統在沒有診斷功能的情況下，對共因故障的抵抗能力。",
        variables: "x（各類別 X 分數）、y（各類別 Y 分數）"
      },
      {
        formula: "SD = Σx × (z + 1) + Σy",
        count: 12,
        physicalMeaning: "考慮診斷後的調整信心分數。z 值來自 IEC 61508 Table D.2/D.3，基於診斷覆蓋率和測試間隔。診斷功能越強，z 值越大，SD 越高，β 因子越低。",
        variables: "z（診斷調整因子，依 Table D.2/D.3）"
      },
      {
        formula: "β = f(S) 查表",
        count: 2,
        physicalMeaning: "將信心分數轉換為 β 因子百分比。S < 45 → β = 5%（最高風險）；45-69 → β = 2%；70-119 → β = 1%；≥ 120 → β = 0.5%（最低風險）。",
        variables: "S（信心分數）→ β（共因故障比例）"
      }
    ]
  }
];

const crossRefMap = [
  { from: "Cut Set based Analysis", to: "FTA/ETA 外部輸入", desc: "切割集來自故障樹分析或事件樹分析的結果" },
  { from: "Cut Set based Analysis", to: "DFI examples", desc: "DFI 分類引用 7 大類範例" },
  { from: "CCF Calc. On-Chip Red.", to: "ISO 26262-5 SPFM/LFM/PMHF", desc: "βIC 值輸入到安全指標計算" },
  { from: "CCF Calc. Logic", to: "ISO 26262-5 SPFM/LFM/PMHF", desc: "β 值輸入到安全指標計算" },
  { from: "Block based Analysis", to: "DFI examples", desc: "DFI 分類直接引用 7 大類" },
  { from: "Methodology", to: "ISO 26262-9 CH.7", desc: "方法論引用標準第 7 章" },
];

export default function FormulaExplorer() {
  const [filter, setFilter] = useState("");

  const filtered = formulaGroups.filter(g =>
    !filter || g.sheet.toLowerCase().includes(filter.toLowerCase()) ||
    g.formulas.some(f => f.formula.toLowerCase().includes(filter.toLowerCase()))
  );

  const totalFormulas = formulaGroups.reduce((sum, g) => sum + g.formulas.reduce((s, f) => s + f.count, 0), 0);

  return (
    <Layout>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex items-center gap-2 mb-6">
          <Link href="/"><span className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex items-center gap-1"><ArrowLeft size={12} /> 首頁</span></Link>
          <span className="text-xs text-muted-foreground">/</span>
          <span className="text-xs text-foreground font-medium">公式物理意義</span>
        </div>

        {/* Hero */}
        <div className="relative rounded-xl overflow-hidden mb-8">
          <div className="absolute inset-0">
            <img src={FORMULA_IMG} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/75 to-slate-900/50" />
          </div>
          <div className="relative px-8 py-10">
            <h1 className="text-2xl font-bold text-white mb-2">公式物理意義深度解析</h1>
            <p className="text-slate-300 text-sm max-w-xl">
              本 Excel 共包含 {totalFormulas}+ 個公式，分布在 3 個核心計算 sheet 中。每個公式都有其物理意義與標準依據。
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="搜尋公式或 Sheet 名稱..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition-all"
          />
        </div>

        {/* Formula Groups */}
        {filtered.map((group) => (
          <Card key={group.sheet} className="mb-6 border-l-4 border-l-amber-400">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Link href={`/sheet/${group.sheetId}`}>
                  <CardTitle className="text-base font-bold hover:text-indigo-600 transition-colors cursor-pointer">
                    {group.sheet}
                  </CardTitle>
                </Link>
                <Badge variant="secondary" className="text-[10px] bg-amber-50 text-amber-700">
                  {group.standard} {group.section}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {group.formulas.map((f, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <code className="font-mono text-sm bg-white px-3 py-1 rounded border border-slate-200 font-semibold">
                        {f.formula}
                      </code>
                      <Badge variant="outline" className="text-[10px] shrink-0">
                        {f.count} 個實例
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed mb-2">{f.physicalMeaning}</p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-semibold">變數：</span>{f.variables}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Cross-Reference Map */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold">跨頁資料參考關係</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {crossRefMap.map((ref, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg text-sm">
                  <span className="font-medium text-indigo-700 shrink-0 min-w-[180px]">{ref.from}</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="font-medium text-amber-700 shrink-0 min-w-[180px]">{ref.to}</span>
                  <span className="text-xs text-muted-foreground">{ref.desc}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Layout>
  );
}
