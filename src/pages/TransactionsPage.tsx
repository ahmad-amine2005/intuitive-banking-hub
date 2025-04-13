
import React from "react";
import { useAuthStore, useBankingStore } from "@/lib/store";
import MainLayout from "@/components/layout/MainLayout";
import TransactionList from "@/components/banking/TransactionList";

const TransactionsPage = () => {
  const { currentUser } = useAuthStore();
  const { getAccountsByUserId, getTransactionsByAccountId } = useBankingStore();
  
  // Get user accounts
  const userAccounts = currentUser ? getAccountsByUserId(currentUser.id) : [];
  
  // Combine transactions from all accounts
  const allTransactions = userAccounts.flatMap(account => 
    getTransactionsByAccountId(account.id)
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transaction History</h1>
          <p className="text-muted-foreground">View all your past transactions</p>
        </div>

        <TransactionList transactions={allTransactions} />
      </div>
    </MainLayout>
  );
};

export default TransactionsPage;
