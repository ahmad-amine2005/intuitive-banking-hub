
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Transaction } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils/formatters";
import { ArrowUpRight, ArrowDownLeft, ArrowRight, Ban } from "lucide-react";
import { cn } from "@/lib/utils";

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList = ({ transactions }: TransactionListProps) => {
  const [filterType, setFilterType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Filter transactions
  const filteredTransactions = transactions.filter((tx) => {
    // Filter by type
    if (filterType !== "all" && tx.type !== filterType) {
      return false;
    }

    // Filter by search term (description)
    if (
      searchTerm &&
      !tx.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Filter by date range
    if (startDate) {
      const txDate = new Date(tx.createdAt);
      const filterStart = new Date(startDate);
      if (txDate < filterStart) {
        return false;
      }
    }

    if (endDate) {
      const txDate = new Date(tx.createdAt);
      const filterEnd = new Date(endDate);
      // Add one day to include the end date completely
      filterEnd.setDate(filterEnd.getDate() + 1);
      if (txDate > filterEnd) {
        return false;
      }
    }

    return true;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="grid gap-2">
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Search in descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type">Type</Label>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger id="type">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="deposit">Deposits</SelectItem>
                <SelectItem value="withdrawal">Withdrawals</SelectItem>
                <SelectItem value="transfer">Transfers</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="startDate">From Date</Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="endDate">To Date</Label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        {filteredTransactions.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No transactions found.</p>
        ) : (
          <div className="border rounded-md">
            <div className="grid grid-cols-12 gap-2 p-4 border-b bg-muted/40 text-sm font-medium text-muted-foreground">
              <div className="col-span-3">Date</div>
              <div className="col-span-4">Description</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1 text-right">Amount</div>
            </div>
            <div className="divide-y">
              {filteredTransactions.map((tx) => {
                // Determine transaction icon and style
                let Icon;
                let iconColorClass;
                let amountPrefix = '';
                let typeLabel = tx.type.charAt(0).toUpperCase() + tx.type.slice(1);

                if (tx.status === 'failed') {
                  Icon = Ban;
                  iconColorClass = 'text-destructive';
                } else if (tx.type === 'deposit') {
                  Icon = ArrowDownLeft;
                  iconColorClass = 'text-banking-success';
                  amountPrefix = '+';
                } else if (tx.type === 'withdrawal') {
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
                  <div key={tx.id} className="grid grid-cols-12 gap-2 p-4 items-center">
                    <div className="col-span-3 text-sm">{formatDate(tx.createdAt)}</div>
                    <div className="col-span-4">
                      <div className="font-medium truncate">{tx.description}</div>
                      {tx.type === 'transfer' && (
                        <div className="text-xs text-muted-foreground">
                          {tx.fromAccountId && tx.toAccountId ? 'Account Transfer' : 'External Transfer'}
                        </div>
                      )}
                    </div>
                    <div className="col-span-2 flex items-center gap-1">
                      <div className={cn("p-1 rounded-full", iconColorClass)}>
                        <Icon className="h-3 w-3" />
                      </div>
                      <span>{typeLabel}</span>
                    </div>
                    <div className="col-span-2">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs",
                        tx.status === 'completed' ? 'bg-green-100 text-green-800' : 
                        tx.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      )}>
                        {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                      </span>
                    </div>
                    <div className={cn(
                      "col-span-1 text-right font-medium",
                      tx.status === 'failed' ? 'text-destructive' :
                      tx.type === 'deposit' ? 'text-banking-success' :
                      tx.type === 'withdrawal' ? 'text-banking-danger' :
                      ''
                    )}>
                      {tx.status === 'failed' ? '-' : `${amountPrefix}${formatCurrency(tx.amount)}`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionList;
