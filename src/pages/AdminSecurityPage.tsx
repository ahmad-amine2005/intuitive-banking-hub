
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import SecurityMetrics from "@/components/admin/SecurityMetrics";
import SecurityAlerts from "@/components/admin/SecurityAlerts";
import SecurityRecommendations from "@/components/admin/SecurityRecommendations";

const AdminSecurityPage = () => {
  // Mock security data
  const securityMetrics = {
    securityScore: 85,
    failedLogins: 12,
    successfulLogins: 248,
    activeUsers: 172,
  };

  const securityAlerts = [
    { id: 1, type: "warning" as const, message: "Multiple failed login attempts detected", timestamp: "2023-04-12T10:15:00" },
    { id: 2, type: "critical" as const, message: "Unusual login location detected", timestamp: "2023-04-10T14:30:00" },
    { id: 3, type: "info" as const, message: "System security patches applied", timestamp: "2023-04-05T08:45:00" },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Security Center</h1>
          <p className="text-muted-foreground">Monitor system security and alerts</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SecurityMetrics {...securityMetrics} />
          <SecurityAlerts alerts={securityAlerts} />
        </div>

        <SecurityRecommendations />
      </div>
    </MainLayout>
  );
};

export default AdminSecurityPage;
