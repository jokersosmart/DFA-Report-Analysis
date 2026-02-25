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

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/sheet/:id" component={SheetDetail} />
      <Route path="/formulas" component={FormulaExplorer} />
      <Route path="/flowchart" component={FlowchartPage} />
      <Route path="/references" component={ReferencesPage} />
      <Route path="/platonic" component={PlatonicPage} />
      <Route path="/dataflow" component={DataFlowPage} />
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
