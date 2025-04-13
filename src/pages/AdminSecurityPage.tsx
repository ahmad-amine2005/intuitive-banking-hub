
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Shield, ShieldCheck, ShieldX, AlertTriangle } from "lucide-react";

const AdminSecurityPage = () => {
  // Mock security data
  const securityAlerts = [
    { id: 1, type: "warning", message: "Multiple failed login attempts detected", timestamp: "2023-04-12T10:15:00" },
    { id: 2, type: "critical", message: "Unusual login location detected", timestamp: "2023-04-10T14:30:00" },
    { id: 3, type: "info", message: "System security patches applied", timestamp: "2023-04-05T08:45:00" },
  ];

  const securityMetrics = {
    securityScore: 85,
    failedLogins: 12,
    successfulLogins: 248,
    activeUsers: 172,
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Security Center</h1>
          <p className="text-muted-foreground">Monitor system security and alerts</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Metrics
              </CardTitle>
              <CardDescription>Overview of system security status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Security Score</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-banking-purple">
                      {securityMetrics.securityScore}%
                    </span>
                    {securityMetrics.securityScore >= 80 ? (
                      <ShieldCheck className="h-5 w-5 text-green-500" />
                    ) : (
                      <ShieldX className="h-5 w-5 text-amber-500" />
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Failed Logins (30 days)</p>
                  <p className="text-2xl font-bold">
                    {securityMetrics.failedLogins}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Successful Logins</p>
                  <p className="text-2xl font-bold">
                    {securityMetrics.successfulLogins}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold">
                    {securityMetrics.activeUsers}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Security Alerts
              </CardTitle>
              <CardDescription>Recent security notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityAlerts.map((alert) => (
                  <Alert
                    key={alert.id}
                    variant={alert.type === "critical" ? "destructive" : "default"}
                    className={
                      alert.type === "warning" 
                        ? "border-amber-500 text-amber-800 bg-amber-50" 
                        : alert.type === "info" 
                          ? "border-blue-500 text-blue-800 bg-blue-50" 
                          : undefined
                    }
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <AlertTitle>
                          {alert.type === "critical" 
                            ? "Critical Alert" 
                            : alert.type === "warning" 
                              ? "Warning" 
                              : "Information"
                          }
                        </AlertTitle>
                        <AlertDescription>{alert.message}</AlertDescription>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          alert.type === "critical" 
                            ? "bg-red-100 text-red-800 border-red-200" 
                            : alert.type === "warning" 
                              ? "bg-amber-100 text-amber-800 border-amber-200" 
                              : "bg-blue-100 text-blue-800 border-blue-200"
                        }
                      >
                        {new Date(alert.timestamp).toLocaleDateString()}
                      </Badge>
                    </div>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>System Security Recommendations</CardTitle>
            <CardDescription>Suggested actions to improve system security</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Enable Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Require two-factor authentication for all administrative accounts to add an additional layer of security.
                </p>
              </div>

              <div>
                <h3 className="font-medium">Regular Security Audits</h3>
                <p className="text-sm text-muted-foreground">
                  Schedule regular security audits to identify potential vulnerabilities and address them promptly.
                </p>
              </div>

              <div>
                <h3 className="font-medium">User Activity Monitoring</h3>
                <p className="text-sm text-muted-foreground">
                  Implement more comprehensive monitoring of user activity to detect unusual patterns or potential security threats.
                </p>
              </div>

              <div>
                <h3 className="font-medium">Encryption Updates</h3>
                <p className="text-sm text-muted-foreground">
                  Ensure all sensitive data is encrypted using the latest encryption standards both in transit and at rest.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AdminSecurityPage;
