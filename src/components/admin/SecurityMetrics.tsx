
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ShieldCheck, ShieldX } from "lucide-react";

interface SecurityMetricsProps {
  securityScore: number;
  failedLogins: number;
  successfulLogins: number;
  activeUsers: number;
}

const SecurityMetrics = ({
  securityScore,
  failedLogins,
  successfulLogins,
  activeUsers,
}: SecurityMetricsProps) => {
  return (
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
                {securityScore}%
              </span>
              {securityScore >= 80 ? (
                <ShieldCheck className="h-5 w-5 text-green-500" />
              ) : (
                <ShieldX className="h-5 w-5 text-amber-500" />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Failed Logins (30 days)</p>
            <p className="text-2xl font-bold">
              {failedLogins}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Successful Logins</p>
            <p className="text-2xl font-bold">
              {successfulLogins}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Active Users</p>
            <p className="text-2xl font-bold">
              {activeUsers}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityMetrics;
