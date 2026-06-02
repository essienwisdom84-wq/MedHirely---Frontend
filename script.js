document.addEventListener('DOMContentLoaded', () => {
  const navToggleBtn = document.getElementById('navToggleBtn');
  const signUpSection = document.getElementById('signUpSection');
  const loginSection = document.getElementById('loginSection');

  // Toggle View Between Sign Up and Login
  navToggleBtn.addEventListener('click', () => {
    const isLoginVisible = !loginSection.classList.contains('hidden');

    if (isLoginVisible) {
      // Switch to Sign Up UI
      loginSection.classList.add('hidden');
      signUpSection.classList.remove('hidden');
      navToggleBtn.textContent = 'Log In';
    } else {
      // Switch to Login UI
      signUpSection.classList.add('hidden');
      loginSection.classList.remove('hidden');
      navToggleBtn.textContent = 'Sign Up';
    }
  });

  // Toggle Password Visibility (Eye Icon functionality)
  const toggleIcons = document.querySelectorAll('.toggle-password');
  
  toggleIcons.forEach(icon => {
    icon.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      const passwordInput = document.getElementById(targetId);
      
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        this.classList.remove('fa-eye-slash');
        this.classList.add('fa-eye'); // Changes slash icon to an open eye
      } else {
        passwordInput.type = 'password';
        this.classList.remove('fa-eye');
        this.classList.add('fa-eye-slash');
      }
    });
  });

  // Handle Sign-Up Form Submit
  document.getElementById('signUpForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const pass = document.getElementById('regPassword').value;
    const confirmPass = document.getElementById('confirmPassword').value;

    if (pass !== confirmPass) {
      alert("Passwords do not match!");
      return;
    }
    
    console.log("Sign-up form submitted successfully.");
    // Hook up your authentication API endpoint logic here
  });

  // Handle Login Form Submit
  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("Login form submitted successfully.");
    // Hook up your login authentication logic here
  });
});