
import { create } from 'zustand';
import { User, Account, Transaction, UserRole } from './types';
import { mockUsers, mockAccounts, mockTransactions } from './mockData';

interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, password: string, phone?: string) => boolean;
}

interface BankingState {
  accounts: Account[];
  transactions: Transaction[];
  users: User[];
  getAccountsByUserId: (userId: string) => Account[];
  getTransactionsByAccountId: (accountId: string) => Transaction[];
  transferMoney: (fromAccountId: string, toAccountId: string, amount: number, description: string) => boolean;
  depositMoney: (accountId: string, amount: number, description: string) => boolean;
  withdrawMoney: (accountId: string, amount: number, description: string) => boolean;
  updateUserProfile: (userId: string, updatedData: Partial<User>) => boolean;
  // Admin functions
  getAllUsers: () => User[];
  toggleUserActiveStatus: (userId: string) => boolean;
  deleteUser: (userId: string) => boolean;
  getAllTransactions: () => Transaction[];
}

// Auth Store
export const useAuthStore = create<AuthState>((set, get) => ({
  currentUser: null,
  isAuthenticated: false,
  login: (email, password) => {
    // In a real app, this would validate against a server
    const user = mockUsers.find(u => u.email === email);
    
    // For demo purposes, any password works
    if (user) {
      set({ currentUser: user, isAuthenticated: true });
      return true;
    }
    return false;
  },
  logout: () => {
    set({ currentUser: null, isAuthenticated: false });
  },
  register: (name, email, password, phone) => {
    // Check if user already exists
    if (mockUsers.some(u => u.email === email)) {
      return false;
    }

    // Create a new user
    const newUser: User = {
      id: `user${Date.now()}`,
      name,
      email,
      role: 'customer',
      phone,
      createdAt: new Date().toISOString(),
      isActive: true
    };

    // In a real app, this would be a server call
    mockUsers.push(newUser);
    
    // Create a default account for the user
    const newAccount: Account = {
      id: `account${Date.now()}`,
      userId: newUser.id,
      accountNumber: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
      accountType: 'checking',
      balance: 0,
      createdAt: new Date().toISOString(),
      isActive: true
    };
    
    mockAccounts.push(newAccount);

    // Auto-login after registration
    set({ currentUser: newUser, isAuthenticated: true });
    return true;
  }
}));

// Banking Store
export const useBankingStore = create<BankingState>(() => ({
  accounts: mockAccounts,
  transactions: mockTransactions,
  users: mockUsers,
  
  getAccountsByUserId: (userId) => {
    return mockAccounts.filter(account => account.userId === userId && account.isActive);
  },
  
  getTransactionsByAccountId: (accountId) => {
    return mockTransactions.filter(tx => 
      tx.fromAccountId === accountId || tx.toAccountId === accountId
    ).sort((a, b) => {
      // Sort by date in descending order (newest first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  },
  
  transferMoney: (fromAccountId, toAccountId, amount, description) => {
    const fromAccount = mockAccounts.find(acc => acc.id === fromAccountId);
    const toAccount = mockAccounts.find(acc => acc.id === toAccountId);
    
    if (!fromAccount || !toAccount || fromAccount.balance < amount) {
      return false;
    }
    
    // Update balances
    fromAccount.balance -= amount;
    toAccount.balance += amount;
    
    // Create transaction record
    const newTransaction: Transaction = {
      id: `tx${Date.now()}`,
      fromAccountId,
      toAccountId,
      amount,
      type: 'transfer',
      description,
      createdAt: new Date().toISOString(),
      status: 'completed'
    };
    
    mockTransactions.push(newTransaction);
    return true;
  },
  
  depositMoney: (accountId, amount, description) => {
    const account = mockAccounts.find(acc => acc.id === accountId);
    
    if (!account) {
      return false;
    }
    
    // Update balance
    account.balance += amount;
    
    // Create transaction record
    const newTransaction: Transaction = {
      id: `tx${Date.now()}`,
      toAccountId: accountId,
      amount,
      type: 'deposit',
      description,
      createdAt: new Date().toISOString(),
      status: 'completed'
    };
    
    mockTransactions.push(newTransaction);
    return true;
  },
  
  withdrawMoney: (accountId, amount, description) => {
    const account = mockAccounts.find(acc => acc.id === accountId);
    
    if (!account || account.balance < amount) {
      return false;
    }
    
    // Update balance
    account.balance -= amount;
    
    // Create transaction record
    const newTransaction: Transaction = {
      id: `tx${Date.now()}`,
      fromAccountId: accountId,
      amount,
      type: 'withdrawal',
      description,
      createdAt: new Date().toISOString(),
      status: 'completed'
    };
    
    mockTransactions.push(newTransaction);
    return true;
  },
  
  updateUserProfile: (userId, updatedData) => {
    const userIndex = mockUsers.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
      return false;
    }
    
    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      ...updatedData
    };
    
    return true;
  },
  
  // Admin functions
  getAllUsers: () => {
    return [...mockUsers];
  },
  
  toggleUserActiveStatus: (userId) => {
    const userIndex = mockUsers.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
      return false;
    }
    
    mockUsers[userIndex].isActive = !mockUsers[userIndex].isActive;
    
    // If the user is deactivated, also deactivate their accounts
    if (!mockUsers[userIndex].isActive) {
      mockAccounts.forEach(account => {
        if (account.userId === userId) {
          account.isActive = false;
        }
      });
    }
    
    return true;
  },
  
  deleteUser: (userId) => {
    const userIndex = mockUsers.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
      return false;
    }
    
    mockUsers.splice(userIndex, 1);
    
    // Remove the user's accounts
    for (let i = mockAccounts.length - 1; i >= 0; i--) {
      if (mockAccounts[i].userId === userId) {
        mockAccounts.splice(i, 1);
      }
    }
    
    return true;
  },
  
  getAllTransactions: () => {
    return [...mockTransactions];
  }
}));
