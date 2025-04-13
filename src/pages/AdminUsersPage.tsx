
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import UserManagement from "@/components/admin/UserManagement";

const AdminUsersPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage user accounts and permissions</p>
        </div>

        <UserManagement />
      </div>
    </MainLayout>
  );
};

export default AdminUsersPage;
