// js/login.js

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login-submit-btn");

  if (loginBtn) {
    console.log("🔐 Facility Login script detected submission targets!");

    loginBtn.addEventListener("click", async (e) => {
      e.preventDefault(); // Prevents layout asset reloads

      // 1. Gather text field inputs cleanly
      const emailVal =
        document.getElementById("login-email")?.value.trim() || "";
      const passwordVal =
        document.getElementById("login-password")?.value || "";

      // 2. Client-side basic block validation
      if (!emailVal || !passwordVal) {
        alert("Please enter both your email address and password.");
        return;
      }

      const loginPayload = {
        email: emailVal,
        password: passwordVal,
      };

      console.log("📦 Dispatching login credential package...", {
        email: emailVal,
      });

      // 3. Map out the login route pointing to your config.js asset variables
      const loginUrl =
        window.APP_CONFIG?.AUTH?.LOGIN ||
        "https://medhirely-backend.onrender.com/api/auth/login";

      try {
        loginBtn.innerText = "Verifying...";
        loginBtn.disabled = true;

        // 4. Hit the cloud database cluster
        const response = await fetch(loginUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginPayload),
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok) {
          // 🎉 SUCCESS: Save your authentic session token directly into local storage!
          localStorage.setItem("authToken", data.token);

          alert("Login successful! Redirecting...");

          // 5. Safe side-by-side redirect since new-shift.html sits right next to it!
          window.location.href = "create_facility_profile.html";
        } else {
          alert(
            `Login Refused: ${data.message || "The email or password typed is invalid."}`,
          );
        }
      } catch (err) {
        console.error("❌ Gateway handshake failure:", err);
        alert(
          "Could not reach authentication servers. Wait a moment for Render to boot.",
        );
      } finally {
        loginBtn.innerText = "Sign In";
        loginBtn.disabled = false;
      }
    });
  }
});
