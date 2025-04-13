
// Mock banking data
const bankingData = {
  accounts: [
    {
      id: "acc1",
      userId: "user1",
      accountNumber: "1234567890",
      accountType: "Checking",
      balance: 5280.50,
      currency: "USD",
      status: "active",
      createdAt: "2023-01-01",
    },
    {
      id: "acc2",
      userId: "user1",
      accountNumber: "0987654321",
      accountType: "Savings",
      balance: 12750.75,
      currency: "USD",
      status: "active",
      createdAt: "2023-01-15",
    },
    {
      id: "acc3",
      userId: "admin1",
      accountNumber: "5555555555",
      accountType: "Checking",
      balance: 9500.00,
      currency: "USD",
      status: "active",
      createdAt: "2022-12-15",
    },
    {
      id: "acc4",
      userId: "admin1",
      accountNumber: "6666666666",
      accountType: "Savings",
      balance: 25000.00,
      currency: "USD",
      status: "active",
      createdAt: "2022-12-20",
    }
  ],
  transactions: [
    {
      id: "tx1",
      accountId: "acc1",
      type: "debit",
      amount: 150.00,
      description: "Online Purchase - Amazon",
      category: "Shopping",
      status: "completed",
      createdAt: "2023-04-10T15:30:00",
    },
    {
      id: "tx2",
      accountId: "acc1",
      type: "credit",
      amount: 2500.00,
      description: "Salary Deposit",
      category: "Income",
      status: "completed",
      createdAt: "2023-04-05T09:00:00",
    },
    {
      id: "tx3",
      accountId: "acc2",
      type: "debit",
      amount: 50.00,
      description: "Transfer to Checking",
      category: "Transfer",
      status: "completed",
      createdAt: "2023-04-12T11:25:00",
    },
    {
      id: "tx4",
      accountId: "acc1",
      type: "debit",
      amount: 85.75,
      description: "Utility Bill Payment",
      category: "Bills",
      status: "completed",
      createdAt: "2023-04-08T14:15:00",
    },
    {
      id: "tx5",
      accountId: "acc2",
      type: "credit",
      amount: 1000.00,
      description: "Savings Deposit",
      category: "Savings",
      status: "completed",
      createdAt: "2023-04-03T16:45:00",
    },
    {
      id: "tx6",
      accountId: "acc1",
      type: "debit",
      amount: 65.50,
      description: "Restaurant Payment",
      category: "Food",
      status: "completed",
      createdAt: "2023-04-09T20:30:00",
    },
    {
      id: "tx7",
      accountId: "acc1",
      type: "debit",
      amount: 200.00,
      description: "ATM Withdrawal",
      category: "Cash",
      status: "completed",
      createdAt: "2023-04-11T12:00:00",
    },
    {
      id: "tx8",
      accountId: "acc1",
      type: "debit",
      amount: 120.00,
      description: "Online Subscription",
      category: "Entertainment",
      status: "pending",
      createdAt: "2023-04-12T22:15:00",
    }
  ]
};

// Banking functions for UI interaction
const banking = {
  // Get accounts for current user
  getUserAccounts() {
    if (!auth.currentUser) return [];
    return bankingData.accounts.filter(account => account.userId === auth.currentUser.id);
  },
  
  // Get transactions for specific account
  getAccountTransactions(accountId) {
    return bankingData.transactions.filter(tx => tx.accountId === accountId);
  },
  
  // Get all transactions for current user
  getAllUserTransactions() {
    const userAccounts = this.getUserAccounts();
    const accountIds = userAccounts.map(account => account.id);
    return bankingData.transactions.filter(tx => accountIds.includes(tx.accountId));
  },
  
  // Get pending transactions
  getPendingTransactions() {
    const userTransactions = this.getAllUserTransactions();
    return userTransactions.filter(tx => tx.status === 'pending');
  },
  
  // Get recent transactions (within last 7 days)
  getRecentTransactions(days = 7) {
    const userTransactions = this.getAllUserTransactions();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return userTransactions.filter(tx => {
      const txDate = new Date(tx.createdAt);
      return txDate >= cutoffDate;
    });
  },
  
  // Format currency
  formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: currency 
    }).format(amount);
  },
  
  // Format date
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  },
  
  // Transfer money between accounts
  transferMoney(fromAccountId, toAccountId, amount, description = "Transfer") {
    // Find accounts
    const fromAccount = bankingData.accounts.find(acc => acc.id === fromAccountId);
    const toAccount = bankingData.accounts.find(acc => acc.id === toAccountId);
    
    if (!fromAccount || !toAccount) {
      return { success: false, message: "One or both accounts not found" };
    }
    
    if (fromAccount.balance < amount) {
      return { success: false, message: "Insufficient funds" };
    }
    
    // Update balances
    fromAccount.balance -= amount;
    toAccount.balance += amount;
    
    // Create transaction records
    const now = new Date().toISOString();
    const txId1 = `tx${bankingData.transactions.length + 1}`;
    const txId2 = `tx${bankingData.transactions.length + 2}`;
    
    bankingData.transactions.push({
      id: txId1,
      accountId: fromAccountId,
      type: "debit",
      amount: amount,
      description: `Transfer to ${toAccount.accountType} (${toAccount.accountNumber})`,
      category: "Transfer",
      status: "completed",
      createdAt: now
    });
    
    bankingData.transactions.push({
      id: txId2,
      accountId: toAccountId,
      type: "credit",
      amount: amount,
      description: `Transfer from ${fromAccount.accountType} (${fromAccount.accountNumber})`,
      category: "Transfer",
      status: "completed",
      createdAt: now
    });
    
    return { success: true, message: "Transfer successful" };
  },
  
  // Deposit money
  deposit(accountId, amount, description = "Deposit") {
    const account = bankingData.accounts.find(acc => acc.id === accountId);
    
    if (!account) {
      return { success: false, message: "Account not found" };
    }
    
    // Update balance
    account.balance += amount;
    
    // Create transaction record
    const now = new Date().toISOString();
    const txId = `tx${bankingData.transactions.length + 1}`;
    
    bankingData.transactions.push({
      id: txId,
      accountId: accountId,
      type: "credit",
      amount: amount,
      description: description || "Deposit",
      category: "Deposit",
      status: "completed",
      createdAt: now
    });
    
    return { success: true, message: "Deposit successful" };
  },
  
  // Withdraw money
  withdraw(accountId, amount, description = "Withdrawal") {
    const account = bankingData.accounts.find(acc => acc.id === accountId);
    
    if (!account) {
      return { success: false, message: "Account not found" };
    }
    
    if (account.balance < amount) {
      return { success: false, message: "Insufficient funds" };
    }
    
    // Update balance
    account.balance -= amount;
    
    // Create transaction record
    const now = new Date().toISOString();
    const txId = `tx${bankingData.transactions.length + 1}`;
    
    bankingData.transactions.push({
      id: txId,
      accountId: accountId,
      type: "debit",
      amount: amount,
      description: description || "Withdrawal",
      category: "Withdrawal",
      status: "completed",
      createdAt: now
    });
    
    return { success: true, message: "Withdrawal successful" };
  }
};
