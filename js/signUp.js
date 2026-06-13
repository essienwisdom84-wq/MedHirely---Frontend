/**
 * MedHirely - Facility Signup Controller
 * Frontend integration script to connect with the backend group's API.
 */

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. DOM ELEMENT SELECTION HOOKS
  // ==========================================
  const signupForm = document.getElementById("signup-form");
  const emailInput = document.getElementById("email-address");
  const roleInput = document.getElementById("role");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const termsCheckbox = document.getElementById("terms-checkbox");
  const submitBtn = document.getElementById("create-account-btn");
  const togglePasswordIcons = document.querySelectorAll(
    ".toggle-password-visibility",
  );

  // ==========================================
  // 2. BACKEND GROUP COUPLING URL
  // ==========================================
  // 🌟 ASK THE BACKEND TEAM FOR THEIR LOCAL URL.
  // Replace 'http://localhost:5000' with whatever port or IP address they are running.
  const BACKEND_SIGNUP_URL =
    "https://medhirely-backend.onrender.com/api/auth/register";

  // ==========================================
  // 3. PASSWORD VISIBILITY TOGGLE ENGINE
  // ==========================================
  togglePasswordIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const targetInput = icon.closest(".relative").querySelector("input");
      if (targetInput) {
        if (targetInput.type === "password") {
          targetInput.type = "text";
          icon.classList.remove("fa-eye-slash");
          icon.classList.add("fa-eye");
        } else {
          targetInput.type = "password";
          icon.classList.remove("fa-eye");
          icon.classList.add("fa-eye-slash");
        }
      }
    });
  });

  // ==========================================
  // 4. FRONTEND FORM VALIDATION
  // ==========================================
  function validateFormInputs() {
    const email = emailInput ? emailInput.value.trim() : "";
    const role = roleInput ? roleInput.value.trim() : "";
    const password = passwordInput ? passwordInput.value : "";
    const confirmPassword = confirmPasswordInput
      ? confirmPasswordInput.value
      : "";
    const isTermsAgreed = termsCheckbox ? termsCheckbox.checked : false;

    if (!email || !role || !password || !confirmPassword) {
      return { valid: false, message: "Please fill in all fields." };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { valid: false, message: "Please enter a valid email address." };
    }

    if (password.length < 6) {
      return {
        valid: false,
        message: "Password must be at least 6 characters long.",
      };
    }

    if (password !== confirmPassword) {
      return { valid: false, message: "Passwords do not match." };
    }

    if (!isTermsAgreed) {
      return {
        valid: false,
        message: "You must agree to the Terms of Service.",
      };
    }

    return { valid: true };
  }

  // Real-time button activation
  if (signupForm && submitBtn) {
    signupForm.addEventListener("input", () => {
      const validation = validateFormInputs();
      if (validation.valid) {
        submitBtn.removeAttribute("disabled");
        submitBtn.classList.remove("opacity-50", "cursor-not-allowed");
      } else {
        submitBtn.setAttribute("disabled", "true");
        submitBtn.classList.add("opacity-50", "cursor-not-allowed");
      }
    });
  }

  // ==========================================
  // 5. DATA TRANSMISSION TO BACKEND GROUP
  // ==========================================
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault(); // Prevents page reload/clear issues!

      const validation = validateFormInputs();
      if (!validation.valid) {
        alert(validation.message);
        return;
      }

      // Payloads built matching the team's router expectation request headers
      const signupPayload = {
        email: emailInput.value.trim().toLowerCase(),
        role: roleInput.value.trim(),
        password: passwordInput.value,
      };

      if (submitBtn) {
        submitBtn.textContent = "Creating Account...";
        submitBtn.setAttribute("disabled", "true");
      }

      try {
        const response = await fetch(BACKEND_SIGNUP_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupPayload),
        });

        const result = await response.json();

        if (response.ok) {
          alert("Registration successful!");

          if (result.token) {
            localStorage.setItem("userToken", result.token);
          }

          // Move forward to dashboard/profile onboarding page view
          window.location.href = "email_verification.html"; // Matches your active dashboard file string name
        } else {
          alert(
            "Registration failed: " +
              (result.message || "Validation error from backend group."),
          );
          resetSubmitButton();
        }
      } catch (error) {
        console.error("API connection failure:", error);
        alert(
          "Could not establish a connection to the backend group local server. Make sure they have started their app and CORS is enabled for your origin!",
        );
        resetSubmitButton();
      }
    });
  }

  function resetSubmitButton() {
    if (submitBtn) {
      submitBtn.textContent = "Create an Account";
      submitBtn.removeAttribute("disabled");
    }
  }
});
