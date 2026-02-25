# DFA Report Analysis — RD-03-009-01 ADFA 報告深度解析

本專案是對 `RD-03-009-01.ADFA報告DFAReport.xlsx` 的全面深度解析，涵蓋 15 個工作表的結構分析、公式物理意義解讀、圖片 AI 辨識、參考文件研讀，以及柏拉圖式思考分析。所有內容均已轉換為可逆向還原的 Markdown 格式，並建構了一個互動式網站供團隊查閱與稽核。

## 目錄結構

```
DFA_Report_Analysis/
├── README.md                          # 本文件
├── RD-03-009-01.ADFA報告DFAReport.xlsx # 原始 Excel 檔案
├── docs/                              # 分析報告文件
│   ├── 00_MASTER_REPORT.md            # 總報告（整合所有分析）
│   ├── excel_analysis_output.txt      # Excel 結構原始分析輸出
│   ├── formula_and_crossref_analysis.md # 公式與跨頁關聯深度分析
│   ├── image_analysis_complete.md     # 圖片 AI 辨識完整報告
│   ├── platonic_analysis.md           # 柏拉圖式思考分析
│   └── reference_documents_analysis.md # 參考文件詳細解讀
├── images/                            # 從 Excel 提取的所有圖片
│   ├── Cover_img0.png                 # 公司 Logo
│   ├── Definitions_img0.jpg           # DFI 特徵化圖
│   ├── Definitions_img1.jpg           # 物理耦合相依故障圖
│   ├── Definitions_img2.jpg           # 資源共享相依故障圖
│   ├── Flowchart_img0-9.*             # DFA 流程圖相關圖片
│   └── Revision_History_for_Template_img0.jpg # 公司 Logo
├── markdown/                          # 可逆向還原的 Markdown
│   └── DFA_Report_Reversible.md       # 完整的可逆 Markdown 格式
├── scripts/                           # 分析與轉換用的 Python 腳本
│   ├── analyze_excel.py               # Excel 結構分析腳本
│   ├── extract_images.py              # 圖片提取腳本
│   ├── excel_to_reversible_md.py      # Excel → 可逆 Markdown 轉換腳本
│   └── md_to_excel.py                 # Markdown → Excel 逆向還原腳本
├── references/                        # 參考文件（如有下載）
└── website/                           # 互動式網站源碼 (React + Tailwind)
    ├── ideas.md                       # 設計構思文件
    ├── package.json                   # 依賴管理
    ├── tsconfig.json                  # TypeScript 設定
    ├── vite.config.ts                 # Vite 建構設定
    └── client/                        # 前端源碼
        ├── index.html                 # HTML 入口
        └── src/
            ├── App.tsx                # 路由與佈局
            ├── main.tsx               # React 入口
            ├── index.css              # 全域樣式 (Tailwind 4)
            ├── components/
            │   └── Layout.tsx         # 側邊欄導航佈局
            ├── contexts/
            │   └── ThemeContext.tsx    # 主題上下文
            ├── hooks/                 # 自訂 React Hooks
            ├── lib/
            │   ├── reportData.ts      # 15 個 Sheet 的完整資料模型
            │   └── utils.ts           # 工具函式
            └── pages/
                ├── Home.tsx           # 首頁總覽
                ├── SheetDetail.tsx     # 個別 Sheet 詳情頁
                ├── FormulaExplorer.tsx # 公式物理意義探索器
                ├── FlowchartPage.tsx   # DFA B1-B12 互動式流程圖
                ├── DataFlowPage.tsx    # 15 Sheet 資料流向圖
                ├── ReferencesPage.tsx  # 8 份參考文件解讀
                ├── PlatonicPage.tsx    # 柏拉圖式思考分析
                └── NotFound.tsx       # 404 頁面
```

## 互動式網站功能

網站採用 **Analytical Dashboard** 設計風格，提供以下功能：

- **首頁總覽**：Hero 區域 + 統計數據（15 個 Sheet、170 個公式、8 份參考標準、16 張圖片）+ 四層分類卡片
- **Sheet 詳情頁**：每個 Sheet 的存在意義、核心內容、公式清單、跨頁關聯
- **公式物理意義探索器**：170 個公式的物理意義解讀，支援搜尋與分類篩選
- **DFA 流程圖**：B1-B12 互動式工作流程，點擊查看步驟詳情
- **資料流向圖**：15 個 Sheet 之間的 4 層資料流向與依賴關係
- **參考文件解讀**：8 份國際標準的詳細解讀與 Excel 關聯分析
- **柏拉圖式分析**：四大理型分析 + 4! 分析法 + 本質追問
- **互動式 β 因子計算器**：晶片內冗餘 (βIC) 與邏輯子系統 (β) 的即時計算

## Excel 工作表概覽（15 sheets）

| 編號 | Sheet 名稱 | 存在意義 | 核心內容 |
|:-----|:----------|:--------|:--------|
| 1 | Revision History for Template | 模板版本控制 | 模板改版履歷 |
| 2 | Cover | 文件身份與權威 | 報告封面、專案資訊、簽核欄 |
| 3 | Revision History | 報告版本控制 | 報告改版履歷 |
| 4 | References | 法規基礎 | 8 份參考標準文件清單 |
| 5 | Abbreviations | 術語統一 | 縮寫對照表 |
| 6 | Definitions | 概念定義 | DFA 核心概念定義與圖示 |
| 7 | ISO 26262-9 CH.7 | 法典收錄 | 完整收錄 ISO 26262-9 第 7 章 |
| 8 | Methodology | 方法論 | DFA 分析方法與範圍定義 |
| 9 | Flowchart | 流程地圖 | DFA 工作流程 B1-B12 |
| 10 | Block-Diagram | 架構圖 | 系統功能區塊圖 |
| 11 | Block based Analysis | 定性分析 | 基於功能區塊的 DFI 評估 |
| 12 | Cut Set based Analysis | 定量分析 | 基於切割集的 CCCI 評估 |
| 13 | DFI examples | 危險百科 | 7 類 DFI 範例清單 |
| 14 | CCF Calc. On-Chip Red. | β 因子計算（晶片內冗餘） | IEC 61508 β-factor 評分 |
| 15 | CCF Calc. Logic | β 因子計算（邏輯子系統） | IEC 61508 β-factor 評分 |

## 核心公式體系

| 公式 | 物理意義 | 來源 Sheet | 標準依據 |
|:-----|:--------|:----------|:---------|
| CCCI = G+I+K+M+O | 切割集共因故障指標（5 維度評分） | Cut Set based Analysis | ISO 26262-10 Annex A.3.6 |
| βIC = 33% (Score ≤ 175) | 晶片內冗餘共因故障比例 | CCF Calc. On-Chip Red. | IEC 61508-6 Annex D |
| β = 5% (Score ≤ 175) | 邏輯子系統共因故障比例 | CCF Calc. Logic | IEC 61508-6 Annex D |

## 參考標準

本報告引用的核心標準包括：ISO 26262-1/5/9/10/11:2018、IEC 61508 Ed.2、IEC TR 62380:2004、IEC 60812。

## 授權

本專案僅供內部使用，未經授權不得外傳。
