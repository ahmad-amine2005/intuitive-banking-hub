
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import TransactionOverview from "@/components/admin/TransactionOverview";
import AnalyticsOverview from "@/components/admin/AnalyticsOverview";
import { useBankingStore } from "@/lib/store";

const AdminAnalyticsPage = () => {
  const { getAllUsers, accounts, transactions } = useBankingStore();
  
  // Calculate analytics data
  const users = getAllUsers();
  const totalUsers = users.length;
  const activeAccounts = accounts.filter(acc => acc.isActive).length;
  const totalTransactions = transactions.length;
  const totalVolume = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Analytics</h1>
          <p className="text-muted-foreground">Transaction and user statistics</p>
        </div>

        <AnalyticsOverview 
          totalUsers={totalUsers}
          activeAccounts={activeAccounts}
          totalTransactions={totalTransactions}
          totalVolume={totalVolume}
        />

        <TransactionOverview />
      </div>
    </MainLayout>
  );
};

export default AdminAnalyticsPage;
