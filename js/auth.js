
// Simple user data store for authentication
const users = [
  {
    id: "user1",
    name: "John Doe",
    email: "user@example.com",
    password: "password123",
    role: "user",
    phone: "555-123-4567",
    createdAt: "2023-01-15",
    isActive: true
  },
  {
    id: "admin1",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    phone: "555-555-5555",
    createdAt: "2022-12-01",
    isActive: true
  }
];

// Auth functions
const auth = {
  currentUser: null,
  isAuthenticated: false,
  
  // Login function
  login(email, password) {
    const user = users.find(u => u.email === email);
    if (user && user.password === password) {
      this.currentUser = { ...user };
      delete this.currentUser.password; // Don't store password in memory
      this.isAuthenticated = true;
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  },
  
  // Register function
  register(name, email, password, phone = "") {
    // Check if email already exists
    if (users.some(u => u.email === email)) {
      return false;
    }
    
    const newUser = {
      id: `user${users.length + 1}`,
      name,
      email,
      password,
      role: "user",
      phone,
      createdAt: new Date().toISOString().split('T')[0],
      isActive: true
    };
    
    users.push(newUser);
    
    // Auto login after registration
    return this.login(email, password);
  },
  
  // Logout function
  logout() {
    this.currentUser = null;
    this.isAuthenticated = false;
    localStorage.removeItem('currentUser');
    localStorage.setItem('isAuthenticated', 'false');
  },
  
  // Check if user is admin
  isAdmin() {
    return this.currentUser && this.currentUser.role === 'admin';
  },
  
  // Initialize auth from localStorage
  init() {
    const storedUser = localStorage.getItem('currentUser');
    const storedAuth = localStorage.getItem('isAuthenticated');
    
    if (storedAuth === 'true' && storedUser) {
      this.currentUser = JSON.parse(storedUser);
      this.isAuthenticated = true;
    }
  }
};

// Initialize auth when script loads
auth.init();
