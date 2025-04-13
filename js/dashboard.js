
document.addEventListener('DOMContentLoaded', () => {
  // Check if user is logged in
  if (!auth.isAuthenticated) {
    window.location.href = "/";
    return;
  }
  
  // Setup logout button
  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.addEventListener('click', () => {
    auth.logout();
    toast.show('Logged out', 'You have been successfully logged out.');
    window.location.href = "/";
  });
  
  // Setup user info
  const userGreeting = document.getElementById('userGreeting');
  const userInitials = document.getElementById('userInitials');
  
  if (auth.currentUser) {
    userGreeting.textContent = `Welcome back, ${auth.currentUser.name}!`;
    
    // Get initials for avatar
    const nameParts = auth.currentUser.name.split(' ');
    let initials = '';
    if (nameParts.length >= 2) {
      initials = nameParts[0][0] + nameParts[1][0];
    } else {
      initials = nameParts[0].substring(0, 2);
    }
    userInitials.textContent = initials.toUpperCase();
  }
  
  // Load account summary
  const accountSummary = document.getElementById('accountSummary');
  const accounts = banking.getUserAccounts();
  
  if (accounts.length > 0) {
    accountSummary.innerHTML = accounts.map(account => `
      <div class="account-card">
        <div class="account-card-header">
          <span class="account-type">${account.accountType}</span>
          <span class="account-number">•••• ${account.accountNumber.slice(-4)}</span>
        </div>
        <div class="account-balance">${banking.formatCurrency(account.balance)}</div>
        <div class="account-status">
          <span>${account.status === 'active' ? 'Active' : 'Inactive'}</span>
          <span>•</span>
          <span>Since ${banking.formatDate(account.createdAt)}</span>
        </div>
      </div>
    `).join('');
  } else {
    accountSummary.innerHTML = '<p>No accounts found.</p>';
  }
  
  // Load stats
  const pendingTransactions = document.getElementById('pendingTransactions');
  const recentActivity = document.getElementById('recentActivity');
  
  const pendingTxs = banking.getPendingTransactions();
  const recentTxs = banking.getRecentTransactions(7);
  
  pendingTransactions.textContent = pendingTxs.length;
  recentActivity.textContent = recentTxs.length;
  
  // Load recent transactions
  const recentTransactionsEl = document.getElementById('recentTransactions');
  const transactions = banking.getAllUserTransactions()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);
  
  if (transactions.length > 0) {
    recentTransactionsEl.innerHTML = transactions.map(tx => {
      const account = banking.getUserAccounts().find(a => a.id === tx.accountId);
      const accountName = account ? account.accountType : 'Unknown Account';
      
      let icon;
      if (tx.type === 'credit') {
        icon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>';
      } else {
        icon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>';
      }
      
      return `
        <div class="transaction-item">
          <div class="transaction-icon">${icon}</div>
          <div class="transaction-details">
            <div class="transaction-title">${tx.description}</div>
            <div class="transaction-date">${new Date(tx.createdAt).toLocaleDateString()} • ${accountName}</div>
          </div>
          <div class="transaction-amount ${tx.type === 'credit' ? 'credit' : 'debit'}">
            ${tx.type === 'credit' ? '+' : '-'} ${banking.formatCurrency(tx.amount)}
          </div>
        </div>
      `;
    }).join('');
  } else {
    recentTransactionsEl.innerHTML = '<p>No transactions found.</p>';
  }
  
  // Add responsive menu toggle for mobile
  const body = document.body;
  const sidebar = document.querySelector('.sidebar');
  
  // Only add mobile menu toggle if window width is small
  if (window.innerWidth < 768) {
    // Create menu toggle button
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    `;
    body.appendChild(menuToggle);
    
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
      if (!sidebar.contains(e.target) && !menuToggle.contains(e.target) && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
      }
    });
  }
});
