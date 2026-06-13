document.addEventListener("DOMContentLoaded", () => {
    // Select the form element matching your exact HTML id attribute value
    const signupForm = document.getElementById("signup-form");
    const submitBtn = document.getElementById("submitBtn"); 

    // Field selectors mapped to your HTML structure
    const emailInput = document.getElementById("email") || document.querySelector("input[type='email']");
    const passwordInputs = document.querySelectorAll("input[type='password']");
    const passwordInput = document.getElementById("password") || passwordInputs[0];
    const confirmPasswordInput = document.getElementById("confirmPassword") || passwordInputs[1];
    const termsCheckbox = document.getElementById("termsCheckbox") || document.querySelector("input[type='checkbox']");

    // Real-time listener function to track validation states
    function validateForm() {
        const emailValue = emailInput?.value.trim() || "";
        const passwordValue = passwordInput?.value || "";
        const confirmValue = confirmPasswordInput?.value || "";
        const isChecked = termsCheckbox ? termsCheckbox.checked : false;

        // Front-end formatting conditions
        const isEmailValid = emailValue.includes("@") && emailValue.includes(".");
        const isPasswordValid = passwordValue.length >= 6; 
        const passwordsMatch = passwordValue === confirmValue;

        // Visual highlight toggling framework
        if (isEmailValid && isPasswordValid && passwordsMatch && isChecked) {
            if (submitBtn) {
                submitBtn.removeAttribute("disabled");
                submitBtn.classList.remove("opacity-50", "cursor-not-allowed");
                // Applying active design colors dynamically
                submitBtn.style.backgroundColor = "#0284C7"; 
                submitBtn.style.opacity = "1";
                submitBtn.style.cursor = "pointer";
            }
        } else {
            if (submitBtn) {
                submitBtn.setAttribute("disabled", "true");
                submitBtn.style.opacity = "0.5";
                submitBtn.style.cursor = "not-allowed";
                submitBtn.style.backgroundColor = ""; // Resets back to your stylesheet fallback
            }
        }
    }

    // Attach event listeners to input fields
    if (emailInput) emailInput.addEventListener("input", validateForm);
    if (passwordInput) passwordInput.addEventListener("input", validateForm);
    if (confirmPasswordInput) confirmPasswordInput.addEventListener("input", validateForm);
    if (termsCheckbox) termsCheckbox.addEventListener("change", validateForm);

    // Initial validation check invocation on file mount
    validateForm();

    // Form submission processing
    if (signupForm) {
        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            if (submitBtn) {
                submitBtn.textContent = "Creating Account...";
                submitBtn.setAttribute("disabled", "true");
            }

            const signupEmail = emailInput?.value.trim() || "";

            // 🎯 THE SCHEMATIC PAYLOAD: Strictly passing the exact three properties
            const signupPayload = {
                email: signupEmail,
                role: "facility", 
                password: passwordInput?.value || ""
            };

            try {
                const response = await fetch('https://medhirely-backend.onrender.com/api/auth/register', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(signupPayload),
                });

                const result = await response.json();

                if (response.ok) {
                    alert("Registration successful!");

                    // Cache structural session values safely in your browser storage layers
                    if (result.token) {
                        localStorage.setItem("userToken", result.token);
                    }

                    if (signupEmail) {
                        localStorage.setItem('medhirely_signup_email', signupEmail);
                    }

                    // Route navigation frame forward smoothly onto your verification layout screen
                    window.location.href = "email_verification.html";

                } else {
                    // Alert the explicit error string coming from your backend validators if it rejects
                    alert("Registration failed: " + (result.message || "Error during schema validation parsing."));
                    if (submitBtn) {
                        submitBtn.textContent = "Create an Account";
                        validateForm();
                    }
                }
            } catch (error) {
                console.error("Signup network execution crash:", error);
                alert("A network connectivity error occurred. Please try again.");
                if (submitBtn) {
                    submitBtn.textContent = "Create an Account";
                    validateForm();
                }
            }
        });
    }
});