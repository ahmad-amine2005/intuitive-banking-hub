
import React, { useState } from "react";
import { useAuthStore, useBankingStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { formatAccountNumber, formatCurrency, formatDate } from "@/lib/utils/formatters";
import { CreditCard, PiggyBank, Calendar, BadgeCheck, ShieldAlert } from "lucide-react";
import { validateEmail } from "@/lib/utils/validators";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/lib/types";

const AccountDetails = () => {
  const { currentUser } = useAuthStore();
  const { getAccountsByUserId, updateUserProfile } = useBankingStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<Partial<User>>({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  // Get user accounts
  const userAccounts = currentUser ? getAccountsByUserId(currentUser.id) : [];

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing
      setIsEditing(false);
      setEditedUser({});
      setError("");
    } else {
      // Start editing with current values
      setIsEditing(true);
      setEditedUser({
        name: currentUser?.name || "",
        email: currentUser?.email || "",
        phone: currentUser?.phone || "",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!currentUser) return;

    // Validate
    if (!editedUser.name || !editedUser.email) {
      setError("Name and email are required");
      return;
    }

    if (!validateEmail(editedUser.email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Try to update profile
    const success = updateUserProfile(currentUser.id, editedUser);
    if (success) {
      setSuccess(true);
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully",
      });
    } else {
      setError("Failed to update profile. Please try again.");
    }
  };

  if (!currentUser) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Profile */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Your personal details</CardDescription>
            </div>
            <Button variant={isEditing ? "outline" : "ghost"} size="sm" onClick={handleEditToggle}>
              {isEditing ? "Cancel" : "Edit"}
            </Button>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {success && (
              <Alert variant="default" className="mb-4 bg-green-50 text-green-800 border-green-200">
                <AlertDescription>Profile updated successfully!</AlertDescription>
              </Alert>
            )}

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={editedUser.name || ""}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={editedUser.email || ""}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={editedUser.phone || ""}
                    onChange={handleInputChange}
                  />
                </div>

                <Button type="submit" className="w-full">Save Changes</Button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-[25px_1fr] items-start gap-2">
                  <BadgeCheck className="h-5 w-5 text-banking-purple" />
                  <div>
                    <p className="text-sm font-medium">Name</p>
                    <p className="text-sm text-muted-foreground">{currentUser.name}</p>
                  </div>
                </div>

                <div className="grid grid-cols-[25px_1fr] items-start gap-2">
                  <BadgeCheck className="h-5 w-5 text-banking-purple" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                  </div>
                </div>

                {currentUser.phone && (
                  <div className="grid grid-cols-[25px_1fr] items-start gap-2">
                    <BadgeCheck className="h-5 w-5 text-banking-purple" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{currentUser.phone}</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-[25px_1fr] items-start gap-2">
                  <Calendar className="h-5 w-5 text-banking-purple" />
                  <div>
                    <p className="text-sm font-medium">Joined</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(currentUser.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-[25px_1fr] items-start gap-2">
                  <ShieldAlert className="h-5 w-5 text-banking-purple" />
                  <div>
                    <p className="text-sm font-medium">Account Type</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {currentUser.role}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Account Details */}
        <div className="space-y-6">
          {userAccounts.map((account) => (
            <Card key={account.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {account.accountType === "checking" ? (
                    <CreditCard className="h-5 w-5" />
                  ) : (
                    <PiggyBank className="h-5 w-5" />
                  )}
                  {account.accountType === "checking" ? "Checking Account" : "Savings Account"}
                </CardTitle>
                <CardDescription>Account details and information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Account Number</p>
                    <p className="text-xl">{account.accountNumber}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Current Balance</p>
                    <p className="text-2xl font-bold text-banking-purple">
                      {formatCurrency(account.balance)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Account Status</p>
                    <p className="inline-flex items-center gap-1">
                      <span className={`h-2 w-2 rounded-full ${account.isActive ? "bg-green-500" : "bg-red-500"}`}></span>
                      <span>{account.isActive ? "Active" : "Inactive"}</span>
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Opened On</p>
                    <p className="text-muted-foreground">
                      {formatDate(account.createdAt)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
