
document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const errorAlert = document.getElementById('errorAlert');
  const errorMessage = document.getElementById('errorMessage');
  
  // Check if user is already logged in, redirect if true
  if (auth.isAuthenticated) {
    window.location.href = "/dashboard.html";
  }
  
  // Validate password
  function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  }
  
  // Validate email
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  // Handle form submission
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Hide any previous errors
    errorAlert.style.display = 'none';
    
    // Basic validation
    if (!name.trim() || !email.trim() || !password.trim()) {
      errorMessage.textContent = 'Name, email, and password are required';
      errorAlert.style.display = 'block';
      return;
    }
    
    if (!validateEmail(email)) {
      errorMessage.textContent = 'Please enter a valid email address';
      errorAlert.style.display = 'block';
      return;
    }
    
    if (!validatePassword(password)) {
      errorMessage.textContent = 'Password must be at least 8 characters with at least one uppercase letter, one lowercase letter, and one number';
      errorAlert.style.display = 'block';
      return;
    }
    
    if (password !== confirmPassword) {
      errorMessage.textContent = 'Passwords do not match';
      errorAlert.style.display = 'block';
      return;
    }
    
    // Attempt to register
    const success = auth.register(name, email, password, phone);
    
    if (success) {
      toast.show('Registration successful', 'Welcome to SecurBank! Your account has been created.');
      
      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = "/dashboard.html";
      }, 1000);
    } else {
      errorMessage.textContent = 'Email already in use';
      errorAlert.style.display = 'block';
    }
  });
});
