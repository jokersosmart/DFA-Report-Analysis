import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import SheetDetail from "./pages/SheetDetail";
import FormulaExplorer from "./pages/FormulaExplorer";
import FlowchartPage from "./pages/FlowchartPage";
import ReferencesPage from "./pages/ReferencesPage";
import PlatonicPage from "./pages/PlatonicPage";
import DataFlowPage from "./pages/DataFlowPage";
import FmedaHome from "./pages/FmedaHome";
import FmedaSheetDetail from "./pages/FmedaSheetDetail";
import FmedaDialecticPage from "./pages/FmedaDialecticPage";
import FmedaFormulaPage from "./pages/FmedaFormulaPage";
import FmedaDataFlowPage from "./pages/FmedaDataFlowPage";
import FmedaReferencesPage from "./pages/FmedaReferencesPage";
import FmedaFlowchartPage from "./pages/FmedaFlowchartPage";

function Router() {
  return (
    <Switch>
      {/* DFA Report Routes */}
      <Route path="/" component={Home} />
      <Route path="/sheet/:id" component={SheetDetail} />
      <Route path="/formulas" component={FormulaExplorer} />
      <Route path="/flowchart" component={FlowchartPage} />
      <Route path="/references" component={ReferencesPage} />
      <Route path="/platonic" component={PlatonicPage} />
      <Route path="/dataflow" component={DataFlowPage} />
      {/* FMEDA Report Routes */}
      <Route path="/fmeda" component={FmedaHome} />
      <Route path="/fmeda/sheet/:id" component={FmedaSheetDetail} />
      <Route path="/fmeda/dialectic" component={FmedaDialecticPage} />
      <Route path="/fmeda/formulas" component={FmedaFormulaPage} />
      <Route path="/fmeda/dataflow" component={FmedaDataFlowPage} />
      <Route path="/fmeda/references" component={FmedaReferencesPage} />
      <Route path="/fmeda/flowchart" component={FmedaFlowchartPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
