# DFA Report Viewer — 設計構思

## 目標
將 DFA 深度解析報告轉為互動式網站，供工程團隊查閱與稽核使用。需要兼顧專業感、資訊密度、以及清晰的導航結構。

---

<response>
<text>

## 構想一：「Technical Blueprint」— 工程藍圖風格

**Design Movement**: 受工程藍圖（Blueprint）與技術文件排版啟發的設計風格

**Core Principles**:
1. 精密感：每個元素都像工程圖紙上的標注，精確且有目的
2. 層次分明：透過線條、間距和色調區分資訊層級
3. 功能優先：所有裝飾都服務於資訊傳達

**Color Philosophy**: 以深藍（#0F172A）為底，搭配青藍色（#38BDF8）作為強調色，白色/淺灰用於文字。模擬工程藍圖的深色背景配亮色線條的視覺語言，傳達精密與專業。

**Layout Paradigm**: 左側固定側邊欄（章節導航）+ 右側主內容區域，內容區域使用網格系統排列卡片與表格。

**Signature Elements**: 
- 虛線邊框和標注線（如藍圖上的尺寸標注）
- 等寬字體用於公式和代碼
- 微妙的網格背景紋理

**Interaction Philosophy**: 精確的 hover 效果，展開/收合面板，公式區塊可點擊查看詳細解釋

**Animation**: 元素以淡入方式出現，側邊欄切換時內容平滑過渡

**Typography System**: JetBrains Mono 用於公式/代碼，Inter 用於正文，粗細對比明顯

</text>
<probability>0.06</probability>
</response>

<response>
<text>

## 構想二：「Analytical Dashboard」— 分析儀表板風格

**Design Movement**: 受資料分析儀表板與科學論文排版啟發，融合 Swiss Design 的理性與秩序

**Core Principles**:
1. 資訊密度：在不犧牲可讀性的前提下最大化資訊展示
2. 視覺層次：透過字體大小、粗細和色彩建立清晰的閱讀路徑
3. 互動探索：讓使用者能主動深入探索每個分析維度

**Color Philosophy**: 暖灰色基底（#FAFAF9）配深炭色文字（#1C1917），以琥珀色（#D97706）和靛藍色（#4F46E5）作為雙強調色。琥珀色標記「警告/風險」，靛藍色標記「安全/通過」，建立直覺的安全語意色彩系統。

**Layout Paradigm**: 頂部導航列 + 麵包屑路徑。主內容區採用非對稱雙欄：左側 2/3 為主要內容，右側 1/3 為上下文面板（顯示相關公式、參考文件、術語解釋）。

**Signature Elements**: 
- 浮動的上下文面板（sticky sidebar），隨滾動顯示當前段落的相關資訊
- 公式卡片帶有「物理意義」展開區
- 風險等級的色彩編碼系統（紅/橙/黃/綠）

**Interaction Philosophy**: 滾動驅動的漸進式揭露，hover 顯示術語定義，點擊公式展開完整解釋

**Animation**: 平滑的滾動動畫，卡片的微妙浮動效果，頁面切換的交叉淡入

**Typography System**: Source Serif 4 用於標題（傳達學術權威），DM Sans 用於正文（清晰現代），Fira Code 用於公式

</text>
<probability>0.08</probability>
</response>

<response>
<text>

## 構想三：「Modular Dossier」— 模組化檔案夾風格

**Design Movement**: 受實體文件夾（Dossier）與卡片式 UI 啟發，融合 Material Design 3 的分層概念

**Core Principles**:
1. 模組化：每個分析單元都是一個獨立的「文件卡片」，可展開、收合、重新排列
2. 觸覺感：UI 元素有明確的邊界和深度，像實體文件一樣可以「翻閱」
3. 上下文感知：當前閱讀位置的相關資訊自動浮現

**Color Philosophy**: 純白底（#FFFFFF）配深石板色文字（#334155），以翠綠色（#059669）作為主強調色，珊瑚紅（#DC2626）作為警告色。翠綠色傳達「安全/通過」，珊瑚紅傳達「風險/注意」，與功能安全的語意完美契合。

**Layout Paradigm**: 頂部固定導航 + 標籤頁系統。每個章節是一個標籤頁，內容區使用卡片堆疊佈局，重要卡片有陰影提升效果。

**Signature Elements**: 
- 帶有色彩邊條的卡片（左側色條表示類別）
- 可展開的「檔案夾」式區塊
- 浮動的迷你地圖（顯示當前在整體報告中的位置）

**Interaction Philosophy**: 點擊展開/收合，拖拽重排，雙擊進入詳細模式

**Animation**: 卡片展開時的彈性動畫，頁面切換的滑動過渡，滾動時的視差效果

**Typography System**: Space Grotesk 用於標題（幾何感強，現代），Nunito Sans 用於正文（友善可讀），IBM Plex Mono 用於公式

</text>
<probability>0.07</probability>
</response>

---

## 選定方案：構想二「Analytical Dashboard」

選擇理由：此方案最適合 DFA 報告的使用場景——工程團隊需要在大量技術資訊中快速定位和理解內容，而非對稱雙欄佈局配合浮動上下文面板，能讓使用者在閱讀主內容的同時看到相關的公式解釋、術語定義和參考文件，大幅提升稽核效率。琥珀色/靛藍色的雙強調色系統也與功能安全的風險語意完美契合。
