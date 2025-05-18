
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import TransactionOverview from "@/components/admin/TransactionOverview";

const AdminAnalyticsPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Analytics</h1>
          <p className="text-muted-foreground">Transaction and user statistics</p>
        </div>

        <TransactionOverview />
      </div>
    </MainLayout>
  );
};

export default AdminAnalyticsPage;
