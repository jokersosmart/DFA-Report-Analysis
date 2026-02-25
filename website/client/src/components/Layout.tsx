/*
 * Layout Component — Analytical Dashboard Style
 * Dark sidebar navigation + warm content area
 * Source Serif 4 headings, DM Sans body
 */

import { Link, useLocation } from "wouter";
import { useState } from "react";
import {
  FileText, BookOpen, GitBranch, Calculator, Workflow,
  Library, Lightbulb, ChevronLeft, ChevronRight, Menu, X,
  Home, Layers, Shield
} from "lucide-react";
import { sheets } from "@/lib/reportData";

interface LayoutProps {
  children: React.ReactNode;
}

const navSections = [
  {
    title: "總覽",
    items: [
      { path: "/", label: "首頁總覽", icon: Home },
      { path: "/dataflow", label: "資料流向圖", icon: GitBranch },
      { path: "/platonic", label: "柏拉圖式分析", icon: Lightbulb },
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

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
              <h1 className="text-sm font-bold text-sidebar-primary tracking-wide truncate">
                DFA Report
              </h1>
              <p className="text-[10px] text-sidebar-foreground/60 mt-0.5 truncate">
                RD-03-009-01
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
              SiliconMotion ADFA Report
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
          <h1 className="text-sm font-bold text-foreground">DFA Report Viewer</h1>
        </div>

        <div className="p-6 lg:p-8 max-w-[1200px]">
          {children}
        </div>
      </main>
    </div>
  );
}
