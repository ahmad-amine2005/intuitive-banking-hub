
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SecurityRecommendations = () => {
  return (
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
  );
};

export default SecurityRecommendations;
