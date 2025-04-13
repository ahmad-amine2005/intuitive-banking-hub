
import React, { useState } from "react";
import { useBankingStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils/formatters";
import { User } from "@/lib/types";
import { CheckCircle, XCircle, Trash2, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const UserManagement = () => {
  const { getAllUsers, toggleUserActiveStatus, deleteUser } = useBankingStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>(getAllUsers());
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleStatus = (userId: string) => {
    const success = toggleUserActiveStatus(userId);
    if (success) {
      setUsers(getAllUsers());
      toast({
        title: "Status updated",
        description: "User status has been updated successfully",
      });
    }
  };

  const handleDeleteUser = () => {
    if (!userToDelete) return;
    
    const success = deleteUser(userToDelete);
    if (success) {
      setUsers(getAllUsers());
      setUserToDelete(null);
      toast({
        title: "User deleted",
        description: "User has been deleted successfully",
      });
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 relative">
            <Input
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>

          <div className="border rounded-md">
            <div className="grid grid-cols-12 gap-2 p-4 border-b bg-muted/40 text-sm font-medium text-muted-foreground">
              <div className="col-span-3">Name</div>
              <div className="col-span-3">Email</div>
              <div className="col-span-2">Role</div>
              <div className="col-span-2">Joined</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1">Actions</div>
            </div>

            <div className="divide-y">
              {filteredUsers.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  No users found.
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="grid grid-cols-12 gap-2 p-4 items-center"
                  >
                    <div className="col-span-3 font-medium truncate">
                      {user.name}
                    </div>
                    <div className="col-span-3 truncate">{user.email}</div>
                    <div className="col-span-2">
                      <Badge
                        variant={user.role === "admin" ? "default" : "outline"}
                        className={user.role === "admin" ? "bg-banking-purple" : ""}
                      >
                        {user.role === "admin" ? "Admin" : "Customer"}
                      </Badge>
                    </div>
                    <div className="col-span-2 text-sm">
                      {formatDate(user.createdAt)}
                    </div>
                    <div className="col-span-1">
                      <Badge
                        variant={user.isActive ? "default" : "destructive"}
                        className={
                          user.isActive
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : ""
                        }
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="col-span-1 flex space-x-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => handleToggleStatus(user.id)}
                      >
                        {user.isActive ? (
                          <XCircle className="h-4 w-4" />
                        ) : (
                          <CheckCircle className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        onClick={() => setUserToDelete(user.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently delete the user and all associated accounts and transactions.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDeleteUser}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserManagement;
