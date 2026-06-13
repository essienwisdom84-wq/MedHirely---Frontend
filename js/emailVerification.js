document.addEventListener("DOMContentLoaded", () => {
    const emailDisplay = document.getElementById("email");
    const verifyBtn = document.querySelector("button") || document.getElementById("verifyBtn");
    const otpInputs = document.querySelectorAll("input[type='text']");

    // 📧 Pull the email address that was saved during signup
    const savedEmail = localStorage.getItem('medhirely_signup_email') || "jonesprincealexzander@gmail.com";
    if (emailDisplay) {
        emailDisplay.textContent = savedEmail;
    }

    // Automatically shift cursor focus to the next box as you type
    otpInputs.forEach((input, index) => {
        input.addEventListener("input", (e) => {
            if (e.target.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });
        
        input.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" && !e.target.value && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });

    // Handle form submission when clicking the blue button
    if (verifyBtn) {
        verifyBtn.addEventListener("click", async (e) => {
            e.preventDefault();

            // Assemble the 6 digits from the input fields
            let enteredOtp = "";
            otpInputs.forEach(input => enteredOtp += input.value.trim());

            if (enteredOtp.length < 6) {
                alert("Please enter the complete 6-digit verification code.");
                return;
            }

            verifyBtn.textContent = "Verifying Code...";
            verifyBtn.disabled = true;

            // 🎯 NATIVE API CALL: Deliver code straight to your backend auth validator
            try {
                const response = await fetch('https://medhirely-backend.onrender.com/api/auth/verify-email', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: savedEmail,
                        otp: enteredOtp
                    }),
                });

                const result = await response.json();

                if (response.ok) {
                    alert("Email verified successfully!");

                    // 🔑 Crucial: Save the final signed session token to access protected routes later
                    if (result.token) {
                        localStorage.setItem("userToken", result.token);
                    }

                    // Direct user straight to profile creation workspace
                    window.location.href = "login.html";
                } else {
                    alert("Verification failed: " + (result.message || "Invalid OTP code."));
                    verifyBtn.textContent = "Verify Email";
                    verifyBtn.disabled = false;
                }
            } catch (error) {
                console.error("OTP network validation crash:", error);
                alert("A network connection error occurred while validating code.");
                verifyBtn.textContent = "Verify Email";
                verifyBtn.disabled = false;
            }
        });
    }
});