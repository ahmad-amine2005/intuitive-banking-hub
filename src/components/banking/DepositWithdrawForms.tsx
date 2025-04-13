
import React, { useState } from "react";
import { useAuthStore, useBankingStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { validateAmount } from "@/lib/utils/validators";
import { formatCurrency, formatAccountNumber } from "@/lib/utils/formatters";
import { useToast } from "@/components/ui/use-toast";

const DepositWithdrawForms = () => {
  const { currentUser } = useAuthStore();
  const { getAccountsByUserId, depositMoney, withdrawMoney } = useBankingStore();
  const [activeTab, setActiveTab] = useState("deposit");
  const [accountId, setAccountId] = useState("");
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
    if (!accountId) {
      setError("Please select an account");
      return;
    }

    if (!amount || !validateAmount(amount)) {
      setError("Please enter a valid amount");
      return;
    }

    if (!description.trim()) {
      setError("Please enter a description");
      return;
    }

    // Parse amount
    const amountValue = parseFloat(amount);
    
    // Try to make the deposit or withdrawal
    let success;
    if (activeTab === "deposit") {
      success = depositMoney(accountId, amountValue, description);
      if (success) {
        toast({
          title: "Deposit successful",
          description: `You have successfully deposited ${formatCurrency(amountValue)}`,
        });
      }
    } else {
      success = withdrawMoney(accountId, amountValue, description);
      if (success) {
        toast({
          title: "Withdrawal successful",
          description: `You have successfully withdrawn ${formatCurrency(amountValue)}`,
        });
      } else {
        setError("Insufficient funds for withdrawal");
        return;
      }
    }
    
    if (success) {
      setSuccess(true);
      setAmount("");
      setDescription("");
    } else {
      setError(`${activeTab === "deposit" ? "Deposit" : "Withdrawal"} failed. Please try again later.`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Manage Funds</CardTitle>
          <CardDescription>
            Deposit or withdraw funds from your accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="deposit">Deposit</TabsTrigger>
              <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
            </TabsList>
            
            <div className="grid gap-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {success && (
                <Alert variant="default" className="bg-green-50 text-green-800 border-green-200">
                  <AlertDescription>{activeTab === "deposit" ? "Deposit" : "Withdrawal"} completed successfully!</AlertDescription>
                </Alert>
              )}

              <div className="grid gap-2">
                <Label htmlFor="account">Account</Label>
                <Select value={accountId} onValueChange={setAccountId}>
                  <SelectTrigger id="account">
                    <SelectValue placeholder="Select account" />
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
                  placeholder={activeTab === "deposit" ? "Salary, gift, etc." : "Bills, shopping, etc."}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            {activeTab === "deposit" ? "Deposit Funds" : "Withdraw Funds"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default DepositWithdrawForms;
