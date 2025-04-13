
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

interface SecurityAlert {
  id: number;
  type: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
}

interface SecurityAlertsProps {
  alerts: SecurityAlert[];
}

const SecurityAlerts = ({ alerts }: SecurityAlertsProps) => {
  return (
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
          {alerts.map((alert) => (
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
  );
};

export default SecurityAlerts;
