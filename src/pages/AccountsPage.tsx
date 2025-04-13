
import React from "react";
import { useAuthStore, useBankingStore } from "@/lib/store";
import MainLayout from "@/components/layout/MainLayout";
import AccountDetails from "@/components/banking/AccountDetails";

const AccountsPage = () => {
  const { currentUser } = useAuthStore();
  const { getAccountsByUserId } = useBankingStore();
  
  // Get user accounts
  const userAccounts = currentUser ? getAccountsByUserId(currentUser.id) : [];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Accounts</h1>
            <p className="text-muted-foreground">View and manage your accounts</p>
          </div>
        </div>

        <AccountDetails />
      </div>
    </MainLayout>
  );
};

export default AccountsPage;
