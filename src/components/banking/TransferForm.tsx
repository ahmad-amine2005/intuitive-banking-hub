
import React, { useState } from "react";
import { useAuthStore, useBankingStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { validateAccountNumber, validateAmount } from "@/lib/utils/validators";
import { formatCurrency, formatAccountNumber } from "@/lib/utils/formatters";
import { useToast } from "@/components/ui/use-toast";

const TransferForm = () => {
  const { currentUser } = useAuthStore();
  const { getAccountsByUserId, transferMoney } = useBankingStore();
  
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  // Get user accounts
  const userAccounts = currentUser ? getAccountsByUserId(currentUser.id) : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Basic validation
    if (!fromAccount || !toAccount) {
      setError("Please select both source and destination accounts");
      return;
    }

    if (fromAccount === toAccount) {
      setError("Source and destination accounts cannot be the same");
      return;
    }

    if (!amount || !validateAmount(amount)) {
      setError("Please enter a valid amount");
      return;
    }

    if (!description.trim()) {
      setError("Please enter a description for this transfer");
      return;
    }

    // Parse amount
    const amountValue = parseFloat(amount);
    
    // Try to make the transfer
    const success = transferMoney(fromAccount, toAccount, amountValue, description);
    
    if (success) {
      setSuccess(true);
      setAmount("");
      setDescription("");
      toast({
        title: "Transfer successful",
        description: `You have successfully transferred ${formatCurrency(amountValue)}`,
      });
    } else {
      setError("Transfer failed. Please check your account balance and try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Transfer Money</CardTitle>
          <CardDescription>
            Transfer money between your accounts or to other accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {success && (
              <Alert variant="default" className="bg-green-50 text-green-800 border-green-200">
                <AlertDescription>Transfer completed successfully!</AlertDescription>
              </Alert>
            )}

            <div className="grid gap-2">
              <Label htmlFor="fromAccount">From Account</Label>
              <Select value={fromAccount} onValueChange={setFromAccount}>
                <SelectTrigger id="fromAccount">
                  <SelectValue placeholder="Select source account" />
                </SelectTrigger>
                <SelectContent>
                  {userAccounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.accountType === "checking" ? "Checking" : "Savings"} - {formatAccountNumber(account.accountNumber)} - {formatCurrency(account.balance)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="toAccount">To Account</Label>
              <Input
                id="toAccount"
                placeholder="Enter account ID"
                value={toAccount}
                onChange={(e) => setToAccount(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Enter the recipient's account ID
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Rent payment, gift, etc."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Transfer Funds</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default TransferForm;
