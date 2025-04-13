
import { User, Account, Transaction } from "./types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "user1",
    name: "John Doe",
    email: "john@example.com",
    role: "customer",
    phone: "555-123-4567",
    createdAt: "2023-01-15",
    isActive: true,
  },
  {
    id: "user2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "customer",
    phone: "555-987-6543",
    createdAt: "2023-02-20",
    isActive: true,
  },
  {
    id: "admin1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    phone: "555-555-5555",
    createdAt: "2022-12-01",
    isActive: true,
  },
];

// Mock Accounts
export const mockAccounts: Account[] = [
  {
    id: "account1",
    userId: "user1",
    accountNumber: "1234567890",
    accountType: "checking",
    balance: 5420.50,
    createdAt: "2023-01-15",
    isActive: true,
  },
  {
    id: "account2",
    userId: "user1",
    accountNumber: "2345678901",
    accountType: "savings",
    balance: 12500.75,
    createdAt: "2023-01-20",
    isActive: true,
  },
  {
    id: "account3",
    userId: "user2",
    accountNumber: "3456789012",
    accountType: "checking",
    balance: 3200.25,
    createdAt: "2023-02-20",
    isActive: true,
  },
];

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: "tx1",
    fromAccountId: "account1",
    toAccountId: "account3",
    amount: 250.00,
    type: "transfer",
    description: "Rent payment",
    createdAt: "2023-04-01T10:30:00",
    status: "completed",
  },
  {
    id: "tx2",
    toAccountId: "account1",
    amount: 1500.00,
    type: "deposit",
    description: "Salary deposit",
    createdAt: "2023-03-28T09:15:00",
    status: "completed",
  },
  {
    id: "tx3",
    fromAccountId: "account1",
    amount: 80.50,
    type: "withdrawal",
    description: "ATM withdrawal",
    createdAt: "2023-03-25T16:45:00",
    status: "completed",
  },
  {
    id: "tx4",
    fromAccountId: "account1",
    toAccountId: "account2",
    amount: 1000.00,
    type: "transfer",
    description: "Savings transfer",
    createdAt: "2023-03-20T14:20:00",
    status: "completed",
  },
  {
    id: "tx5",
    toAccountId: "account1",
    amount: 520.75,
    type: "deposit",
    description: "Refund",
    createdAt: "2023-03-15T11:10:00",
    status: "completed",
  },
  {
    id: "tx6",
    fromAccountId: "account1",
    amount: 125.40,
    type: "withdrawal",
    description: "Shopping",
    createdAt: "2023-03-12T15:30:00",
    status: "completed",
  },
];
