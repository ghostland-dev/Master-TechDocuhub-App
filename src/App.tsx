
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardPage from "./pages/Dashboard";
import DocumentsPage from "./pages/Documents";
import ProjectsPage from "./pages/Projects";
import TestCasesPage from "./pages/TestCases";
import ReportsPage from "./pages/Reports";
import ArchivesPage from "./pages/Archives";
import SettingsPage from "./pages/Settings";
import HelpPage from "./pages/Help";
import EditorPage from "./pages/Editor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/test-cases" element={<TestCasesPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/archives" element={<ArchivesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/editor/:id" element={<EditorPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
