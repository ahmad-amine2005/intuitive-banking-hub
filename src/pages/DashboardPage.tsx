
import React, { useEffect } from "react";
import { useAuthStore, useBankingStore } from "@/lib/store";
import MainLayout from "@/components/layout/MainLayout";
import AccountSummary from "@/components/dashboard/AccountSummary";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, DollarSign, LineChart, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const { currentUser } = useAuthStore();
  const { getAccountsByUserId, getTransactionsByAccountId } = useBankingStore();
  const navigate = useNavigate();
  
  // Get user accounts
  const userAccounts = currentUser ? getAccountsByUserId(currentUser.id) : [];
  
  // Combine transactions from all accounts
  const allTransactions = userAccounts.flatMap(account => 
    getTransactionsByAccountId(account.id)
  ).sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Calculate stats
  const totalBalance = userAccounts.reduce((sum, account) => sum + account.balance, 0);
  const pendingTransactions = allTransactions.filter(tx => tx.status === "pending").length;
  const recentActivityCount = allTransactions.filter(tx => {
    const txDate = new Date(tx.createdAt);
    const today = new Date();
    const timeDiff = today.getTime() - txDate.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    return daysDiff <= 7; // Within last 7 days
  }).length;

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back{currentUser?.name ? `, ${currentUser.name}` : ""}!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Account Summary Cards */}
          <AccountSummary accounts={userAccounts} />
          
          {/* Quick Stats */}
          <Card className="banking-card">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Pending Transactions</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingTransactions}</div>
              <Button 
                variant="link" 
                className="p-0 h-auto text-xs text-primary flex items-center"
                onClick={() => navigate("/transactions")}
              >
                View All <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </CardContent>
          </Card>
          
          <Card className="banking-card">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recentActivityCount}</div>
              <p className="text-xs text-muted-foreground">transactions in the last 7 days</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Recent Transactions */}
          <div className="md:col-span-3">
            <RecentTransactions transactions={allTransactions} limit={8} />
          </div>

          {/* Quick Actions */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common banking operations</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Button className="w-full flex justify-between items-center" onClick={() => navigate("/transfer")}>
                  Transfer Money
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button className="w-full flex justify-between items-center" variant="outline" onClick={() => navigate("/accounts")}>
                  View Accounts
                  <Wallet className="ml-2 h-4 w-4" />
                </Button>
                <Button className="w-full flex justify-between items-center" variant="outline" onClick={() => navigate("/transactions")}>
                  Transaction History
                  <LineChart className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
