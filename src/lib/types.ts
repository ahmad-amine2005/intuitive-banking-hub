
export type UserRole = "customer" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  createdAt: Date | string;
  isActive: boolean;
}

export interface Account {
  id: string;
  userId: string;
  accountNumber: string;
  accountType: "checking" | "savings";
  balance: number;
  createdAt: Date | string;
  isActive: boolean;
}

export interface Transaction {
  id: string;
  fromAccountId?: string;
  toAccountId?: string;
  amount: number;
  type: "transfer" | "deposit" | "withdrawal";
  description: string;
  createdAt: Date | string;
  status: "completed" | "pending" | "failed";
}

export interface TransferFormData {
  toAccountId: string;
  amount: number;
  description: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
}
