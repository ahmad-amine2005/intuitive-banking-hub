
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import TransferForm from "@/components/banking/TransferForm";
import DepositWithdrawForms from "@/components/banking/DepositWithdrawForms";

const TransferPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transfer Funds</h1>
          <p className="text-muted-foreground">Transfer money between accounts</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TransferForm />
          <DepositWithdrawForms />
        </div>
      </div>
    </MainLayout>
  );
};

export default TransferPage;
