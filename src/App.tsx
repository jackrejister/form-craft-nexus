
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import AppLayout from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Forms from "@/pages/Forms";
import FormCreate from "@/pages/FormCreate";
import FormEdit from "@/pages/FormEdit";
import FormResponses from "@/pages/FormResponses";
import FormPreview from "@/pages/FormPreview";
import Integrations from "@/pages/Integrations";
import Templates from "@/pages/Templates";
import Analytics from "@/pages/Analytics";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import Profile from "@/pages/Profile";
import Responses from "@/pages/Responses";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="dark">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/forms" element={<Forms />} />
              <Route path="/create" element={<FormCreate />} />
              <Route path="/forms/:formId/edit" element={<FormEdit />} />
              <Route path="/forms/:formId/responses" element={<FormResponses />} />
              <Route path="/forms/:formId/preview" element={<FormPreview />} />
              <Route path="/responses" element={<Responses />} />
              <Route path="/integrations" element={<Integrations />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
