
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/lib/store";
import {
  ChevronLeftCircle,
  ChevronRightCircle,
  LogOut,
  UserCircle,
  Settings,
  Home,
  CreditCard,
  Send,
  History,
  BarChart3,
  Users,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const navigate = useNavigate();
  const { currentUser, logout } = useAuthStore();
  const isAdmin = currentUser?.role === "admin";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: CreditCard, label: "Accounts", path: "/accounts" },
    { icon: Send, label: "Transfer", path: "/transfer" },
    { icon: History, label: "Transactions", path: "/transactions" },
  ];

  const adminMenuItems = [
    { icon: Users, label: "User Management", path: "/admin/users" },
    { icon: BarChart3, label: "System Analytics", path: "/admin/analytics" },
    { icon: ShieldCheck, label: "Security", path: "/admin/security" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-card border-r border-border transition-all duration-300 flex flex-col",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        {/* Logo */}
        <div className="p-4 border-b border-border flex justify-center items-center h-16">
          <div className={cn("font-bold text-xl", sidebarOpen ? "block" : "hidden")}>
            SecurBank
          </div>
          <div className={cn("font-bold text-2xl", sidebarOpen ? "hidden" : "block")}>SB</div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <TooltipProvider key={item.path} delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full flex justify-start items-center gap-3",
                        !sidebarOpen && "justify-center px-2"
                      )}
                      onClick={() => navigate(item.path)}
                    >
                      <item.icon className="h-5 w-5" />
                      {sidebarOpen && <span>{item.label}</span>}
                    </Button>
                  </TooltipTrigger>
                  {!sidebarOpen && (
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>

          {isAdmin && (
            <>
              <div className="mt-6 mb-2 px-3">
                {sidebarOpen && (
                  <h3 className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
                    Admin
                  </h3>
                )}
                {!sidebarOpen && <hr className="border-t border-border my-2" />}
              </div>
              <div className="space-y-1">
                {adminMenuItems.map((item) => (
                  <TooltipProvider key={item.path} delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full flex justify-start items-center gap-3",
                            !sidebarOpen && "justify-center px-2"
                          )}
                          onClick={() => navigate(item.path)}
                        >
                          <item.icon className="h-5 w-5" />
                          {sidebarOpen && <span>{item.label}</span>}
                        </Button>
                      </TooltipTrigger>
                      {!sidebarOpen && (
                        <TooltipContent side="right">{item.label}</TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </>
          )}
        </nav>

        {/* User & Settings */}
        <div className="border-t border-border p-4">
          {sidebarOpen && (
            <div className="flex items-center gap-3 mb-4">
              <UserCircle className="h-10 w-10 text-primary" />
              <div>
                <p className="font-medium text-sm">{currentUser?.name}</p>
                <p className="text-muted-foreground text-xs">{currentUser?.email}</p>
              </div>
            </div>
          )}
          <div className="flex items-center justify-between">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate("/settings")}
                  >
                    <Settings className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Settings</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Logout</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <ChevronLeftCircle className="h-5 w-5" />
              ) : (
                <ChevronRightCircle className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col max-h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
