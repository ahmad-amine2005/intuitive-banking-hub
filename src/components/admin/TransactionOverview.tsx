
import React, { useState } from "react";
import { useBankingStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils/formatters";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const TransactionOverview = () => {
  const { getAllTransactions, accounts } = useBankingStore();
  const [transactions] = useState<Transaction[]>(getAllTransactions());

  // Helper function to get account number from account ID
  const getAccountNumber = (accountId?: string) => {
    if (!accountId) return 'External';
    const account = accounts.find(acc => acc.id === accountId);
    return account ? account.accountNumber : 'Unknown';
  };

  // Calculate transaction stats
  const totalDeposits = transactions
    .filter(tx => tx.type === "deposit" && tx.status === "completed")
    .reduce((sum, tx) => sum + tx.amount, 0);
    
  const totalWithdrawals = transactions
    .filter(tx => tx.type === "withdrawal" && tx.status === "completed")
    .reduce((sum, tx) => sum + tx.amount, 0);
    
  const totalTransfers = transactions
    .filter(tx => tx.type === "transfer" && tx.status === "completed")
    .reduce((sum, tx) => sum + tx.amount, 0);

  // Data for transaction type distribution
  const transactionTypeData = [
    { name: "Deposits", value: transactions.filter(tx => tx.type === "deposit").length },
    { name: "Withdrawals", value: transactions.filter(tx => tx.type === "withdrawal").length },
    { name: "Transfers", value: transactions.filter(tx => tx.type === "transfer").length }
  ];

  const COLORS = ["#10B981", "#EF4444", "#F97316"];

  // Data for transaction amount by type
  const transactionAmountData = [
    { name: "Deposits", amount: totalDeposits },
    { name: "Withdrawals", amount: totalWithdrawals },
    { name: "Transfers", amount: totalTransfers }
  ];

  // Get recent transactions
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Transaction Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <p className="text-muted-foreground mb-1 text-sm">Total Deposits</p>
              <p className="text-2xl font-bold text-banking-success">{formatCurrency(totalDeposits)}</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground mb-1 text-sm">Total Withdrawals</p>
              <p className="text-2xl font-bold text-banking-danger">{formatCurrency(totalWithdrawals)}</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground mb-1 text-sm">Total Transfers</p>
              <p className="text-2xl font-bold text-banking-warning">{formatCurrency(totalTransfers)}</p>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={transactionTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {transactionTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction Amounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[320px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={transactionAmountData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis 
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  formatter={(value) => [`$${value}`, "Amount"]}
                />
                <Bar dataKey="amount" fill="#9b87f5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <div className="grid grid-cols-12 gap-2 p-4 border-b bg-muted/40 text-sm font-medium text-muted-foreground">
              <div className="col-span-2">Date</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-3">Description</div>
              <div className="col-span-2">From</div>
              <div className="col-span-2">To</div>
              <div className="col-span-1 text-right">Amount</div>
            </div>
            <div className="divide-y">
              {recentTransactions.map((tx) => (
                <div key={tx.id} className="grid grid-cols-12 gap-2 p-4 items-center text-sm">
                  <div className="col-span-2">{formatDate(tx.createdAt)}</div>
                  <div className="col-span-2 capitalize">{tx.type}</div>
                  <div className="col-span-3 truncate">{tx.description}</div>
                  <div className="col-span-2 truncate">
                    {tx.fromAccountId ? getAccountNumber(tx.fromAccountId).slice(-4) : '-'}
                  </div>
                  <div className="col-span-2 truncate">
                    {tx.toAccountId ? getAccountNumber(tx.toAccountId).slice(-4) : '-'}
                  </div>
                  <div className="col-span-1 text-right font-medium">
                    {formatCurrency(tx.amount)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionOverview;
