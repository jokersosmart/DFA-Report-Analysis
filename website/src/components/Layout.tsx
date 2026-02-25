/*
 * Layout Component — Analytical Dashboard Style
 * Dark sidebar navigation + warm content area
 * Supports both DFA and FMEDA report navigation
 */

import { Link, useLocation } from "wouter";
import { useState, useMemo } from "react";
import {
  FileText, BookOpen, GitBranch, Calculator, Workflow,
  Library, Lightbulb, ChevronLeft, ChevronRight, Menu, X,
  Home, Layers, Shield, Cpu, Database, ArrowLeftRight
} from "lucide-react";
import { sheets } from "@/lib/reportData";
import { fmedaSheets } from "@/lib/fmedaData";

interface LayoutProps {
  children: React.ReactNode;
}

const dfaNavSections = [
  {
    title: "總覽",
    items: [
      { path: "/", label: "首頁總覽", icon: Home },
      { path: "/dataflow", label: "資料流向圖", icon: GitBranch },
      { path: "/platonic", label: "辯證法與蘇格拉底式提問", icon: Lightbulb },
    ]
  },
  {
    title: "深度分析",
    items: [
      { path: "/formulas", label: "公式物理意義", icon: Calculator },
      { path: "/flowchart", label: "DFA 流程圖", icon: Workflow },
      { path: "/references", label: "參考文件", icon: Library },
    ]
  },
  {
    title: "基礎框架",
    items: sheets.filter(s => s.category === "基礎框架").map(s => ({
      path: `/sheet/${s.id}`,
      label: s.name,
      icon: FileText
    }))
  },
  {
    title: "知識基礎",
    items: sheets.filter(s => s.category === "知識基礎").map(s => ({
      path: `/sheet/${s.id}`,
      label: s.name,
      icon: BookOpen
    }))
  },
  {
    title: "方法論",
    items: sheets.filter(s => s.category === "方法論").map(s => ({
      path: `/sheet/${s.id}`,
      label: s.name,
      icon: Layers
    }))
  },
  {
    title: "分析與計算",
    items: sheets.filter(s => s.category === "分析與計算").map(s => ({
      path: `/sheet/${s.id}`,
      label: s.name,
      icon: Shield
    }))
  }
];

const fmedaNavSections = [
  {
    title: "總覽",
    items: [
      { path: "/fmeda", label: "FMEDA 首頁", icon: Home },
      { path: "/fmeda/dataflow", label: "資料流向圖", icon: GitBranch },
      { path: "/fmeda/dialectic", label: "辯證法與蘇格拉底式提問", icon: Lightbulb },
    ]
  },
  {
    title: "深度分析",
    items: [
      { path: "/fmeda/formulas", label: "公式物理意義", icon: Calculator },
      { path: "/fmeda/flowchart", label: "計算流程", icon: Workflow },
      { path: "/fmeda/references", label: "參考文件", icon: Library },
    ]
  },
  {
    title: "行政管理",
    items: fmedaSheets.filter(s => s.category === "行政管理").map(s => ({
      path: `/fmeda/sheet/${s.id}`,
      label: s.name,
      icon: FileText
    }))
  },
  {
    title: "定義與方法論",
    items: fmedaSheets.filter(s => s.category === "定義與方法論").map(s => ({
      path: `/fmeda/sheet/${s.id}`,
      label: s.name,
      icon: BookOpen
    }))
  },
  {
    title: "失效率計算",
    items: fmedaSheets.filter(s => s.category === "失效率計算").map(s => ({
      path: `/fmeda/sheet/${s.id}`,
      label: s.name,
      icon: Cpu
    }))
  },
  {
    title: "核心分析",
    items: fmedaSheets.filter(s => s.category === "核心分析").map(s => ({
      path: `/fmeda/sheet/${s.id}`,
      label: s.name,
      icon: Database
    }))
  },
  {
    title: "CCF 分析",
    items: fmedaSheets.filter(s => s.category === "CCF 分析").map(s => ({
      path: `/fmeda/sheet/${s.id}`,
      label: s.name,
      icon: Shield
    }))
  },
  {
    title: "評估結果",
    items: fmedaSheets.filter(s => s.category === "評估結果").map(s => ({
      path: `/fmeda/sheet/${s.id}`,
      label: s.name,
      icon: Layers
    }))
  }
];

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isFmeda = location.startsWith("/fmeda");
  const navSections = isFmeda ? fmedaNavSections : dfaNavSections;
  const reportLabel = isFmeda ? "FMEDA Report" : "DFA Report";
  const reportCode = isFmeda ? "RD-03-008-01" : "RD-03-009-01";
  const switchPath = isFmeda ? "/" : "/fmeda";
  const switchLabel = isFmeda ? "切換到 DFA" : "切換到 FMEDA";
  const accentColor = isFmeda ? "text-rose-400" : "text-sidebar-primary";

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative z-50 h-full
          bg-sidebar text-sidebar-foreground
          transition-all duration-300 ease-in-out
          ${collapsed ? "w-16" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col
        `}
      >
        {/* Sidebar Header */}
        <div className={`flex items-center gap-3 px-4 py-5 border-b border-sidebar-border ${collapsed ? "justify-center" : ""}`}>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <h1 className={`text-sm font-bold tracking-wide truncate ${accentColor}`}>
                {reportLabel}
              </h1>
              <p className="text-[10px] text-sidebar-foreground/60 mt-0.5 truncate">
                {reportCode}
              </p>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-md hover:bg-sidebar-accent transition-colors"
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden flex items-center justify-center w-7 h-7 rounded-md hover:bg-sidebar-accent transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Report Switcher */}
        {!collapsed && (
          <div className="px-3 pt-3 pb-1">
            <Link href={switchPath} onClick={() => setMobileOpen(false)}>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-sidebar-accent/60 hover:bg-sidebar-accent transition-colors cursor-pointer">
                <ArrowLeftRight size={13} className="text-sidebar-foreground/60" />
                <span className="text-[11px] text-sidebar-foreground/80 font-medium">{switchLabel}</span>
              </div>
            </Link>
          </div>
        )}
        {collapsed && (
          <div className="px-2 pt-3 pb-1">
            <Link href={switchPath}>
              <div className="flex items-center justify-center w-full py-2 rounded-lg bg-sidebar-accent/60 hover:bg-sidebar-accent transition-colors cursor-pointer" title={switchLabel}>
                <ArrowLeftRight size={14} className="text-sidebar-foreground/60" />
              </div>
            </Link>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto sidebar-scroll py-3">
          {navSections.map((section) => (
            <div key={section.title} className="mb-4">
              {!collapsed && (
                <p className="px-4 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
                  {section.title}
                </p>
              )}
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setMobileOpen(false)}
                  >
                    <div
                      className={`
                        flex items-center gap-2.5 mx-2 px-2.5 py-2 rounded-md text-[13px] transition-all duration-150
                        ${isActive
                          ? "bg-sidebar-accent text-sidebar-primary font-medium"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                        }
                        ${collapsed ? "justify-center px-0" : ""}
                      `}
                    >
                      <Icon size={15} className={`shrink-0 ${isActive ? "text-sidebar-primary" : ""}`} />
                      {!collapsed && (
                        <span className="truncate">{item.label}</span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        {!collapsed && (
          <div className="px-4 py-3 border-t border-sidebar-border">
            <p className="text-[10px] text-sidebar-foreground/40">
              SiliconMotion {isFmeda ? "FMEDA" : "ADFA"} Report
            </p>
            <p className="text-[10px] text-sidebar-foreground/30 mt-0.5">
              Analysis by Manus AI
            </p>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-background">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-border bg-card sticky top-0 z-30">
          <button
            onClick={() => setMobileOpen(true)}
            className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-accent transition-colors"
          >
            <Menu size={18} />
          </button>
          <h1 className="text-sm font-bold text-foreground">{reportLabel} Viewer</h1>
        </div>

        <div className="p-6 lg:p-8 max-w-[1200px]">
          {children}
        </div>
      </main>
    </div>
  );
}
