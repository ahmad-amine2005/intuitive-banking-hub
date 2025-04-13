
// Login page specific functionality
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const errorAlert = document.getElementById('errorAlert');
  const errorMessage = document.getElementById('errorMessage');
  
  // Check if user is already logged in, redirect if true
  if (auth.isAuthenticated) {
    window.location.href = "/dashboard.html";
  }
  
  // Handle form submission
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Hide any previous errors
    errorAlert.style.display = 'none';
    
    // Basic validation
    if (!email || !password) {
      errorMessage.textContent = 'Email and password are required';
      errorAlert.style.display = 'block';
      return;
    }
    
    // Attempt to login
    const success = auth.login(email, password);
    
    if (success) {
      toast.show('Login successful', 'Welcome back to SecurBank!');
      
      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = auth.isAdmin() ? "/admin/dashboard.html" : "/dashboard.html";
      }, 1000);
    } else {
      errorMessage.textContent = 'Invalid email or password';
      errorAlert.style.display = 'block';
    }
  });
});
