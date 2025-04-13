
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Account } from "@/lib/types";
import { formatCurrency, formatAccountNumber } from "@/lib/utils/formatters";
import { PiggyBank, CreditCard } from "lucide-react";

interface AccountSummaryProps {
  accounts: Account[];
}

const AccountSummary = ({ accounts }: AccountSummaryProps) => {
  if (!accounts.length) {
    return (
      <Card className="col-span-full">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">No accounts found.</p>
        </CardContent>
      </Card>
    );
  }

  // Calculate total balance across all accounts
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  return (
    <>
      <Card className="col-span-full banking-card-gradient">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{formatCurrency(totalBalance)}</div>
          <p className="text-sm opacity-80 mt-1">Across {accounts.length} account{accounts.length !== 1 ? 's' : ''}</p>
        </CardContent>
      </Card>

      {accounts.map((account) => (
        <Card key={account.id} className="banking-card">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">
              {account.accountType === "checking" ? "Checking Account" : "Savings Account"}
            </CardTitle>
            {account.accountType === "checking" ? (
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            ) : (
              <PiggyBank className="h-4 w-4 text-muted-foreground" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(account.balance)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Account: {formatAccountNumber(account.accountNumber)}
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default AccountSummary;
