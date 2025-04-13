
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils/formatters";
import { ArrowUpRight, ArrowDownLeft, ArrowRight, Ban } from "lucide-react";
import { useBankingStore } from "@/lib/store";
import { cn } from "@/lib/utils";

interface RecentTransactionsProps {
  transactions: Transaction[];
  limit?: number;
}

const RecentTransactions = ({ transactions, limit = 5 }: RecentTransactionsProps) => {
  const { accounts } = useBankingStore();
  const displayedTransactions = transactions.slice(0, limit);

  // Helper function to get account number from account ID
  const getAccountNumber = (accountId?: string) => {
    if (!accountId) return '';
    const account = accounts.find(acc => acc.id === accountId);
    return account ? account.accountNumber : '';
  };

  if (!displayedTransactions.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-4">No transactions found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayedTransactions.map((transaction) => {
            // Determine transaction icon and style
            let Icon;
            let iconColorClass;
            let amountPrefix = '';

            if (transaction.status === 'failed') {
              Icon = Ban;
              iconColorClass = 'text-destructive';
            } else if (transaction.type === 'deposit') {
              Icon = ArrowDownLeft;
              iconColorClass = 'text-banking-success';
              amountPrefix = '+';
            } else if (transaction.type === 'withdrawal') {
              Icon = ArrowUpRight;
              iconColorClass = 'text-banking-danger';
              amountPrefix = '-';
            } else {
              // Transfer
              Icon = ArrowRight;
              iconColorClass = 'text-banking-warning';
              // For transfers, we don't show a prefix as it depends on perspective
            }

            return (
              <div key={transaction.id} className="flex items-center space-x-4">
                <div className={cn("p-2 rounded-full bg-muted", iconColorClass)}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(transaction.createdAt)}
                    {transaction.type === 'transfer' && transaction.toAccountId && (
                      <> • To: ...{getAccountNumber(transaction.toAccountId).slice(-4)}</>
                    )}
                  </p>
                </div>
                <div className={cn(
                  "text-sm font-medium",
                  transaction.status === 'failed' ? 'text-destructive' :
                  transaction.type === 'deposit' ? 'text-banking-success' :
                  transaction.type === 'withdrawal' ? 'text-banking-danger' :
                  ''
                )}>
                  {transaction.status === 'failed' ? 'Failed' : `${amountPrefix}${formatCurrency(transaction.amount)}`}
                </div>
              </div>
            );
          })}

          {transactions.length > limit && (
            <a href="/transactions" className="block text-center text-sm text-primary hover:underline mt-4">
              View all transactions
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
