
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import AccountsPage from "./pages/AccountsPage";
import TransferPage from "./pages/TransferPage";
import TransactionsPage from "./pages/TransactionsPage";
import SettingsPage from "./pages/SettingsPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminAnalyticsPage from "./pages/AdminAnalyticsPage";
import AdminSecurityPage from "./pages/AdminSecurityPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import NotFound from "./pages/NotFound";
import RequireAuth from "./components/auth/RequireAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Protected Routes */}
          <Route 
            path="/" 
            element={
              <RequireAuth>
                <DashboardPage />
              </RequireAuth>
            } 
          />
          <Route 
            path="/accounts" 
            element={
              <RequireAuth>
                <AccountsPage />
              </RequireAuth>
            } 
          />
          <Route 
            path="/transfer" 
            element={
              <RequireAuth>
                <TransferPage />
              </RequireAuth>
            } 
          />
          <Route 
            path="/transactions" 
            element={
              <RequireAuth>
                <TransactionsPage />
              </RequireAuth>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <RequireAuth>
                <SettingsPage />
              </RequireAuth>
            } 
          />

          {/* Admin Routes */}
          <Route 
            path="/admin/users" 
            element={
              <RequireAuth requireAdmin={true}>
                <AdminUsersPage />
              </RequireAuth>
            } 
          />
          <Route 
            path="/admin/analytics" 
            element={
              <RequireAuth requireAdmin={true}>
                <AdminAnalyticsPage />
              </RequireAuth>
            } 
          />
          <Route 
            path="/admin/security" 
            element={
              <RequireAuth requireAdmin={true}>
                <AdminSecurityPage />
              </RequireAuth>
            } 
          />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
