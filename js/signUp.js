// js/signup.js

document.addEventListener("DOMContentLoaded", () => {
  const signupBtn = document.getElementById("signup-submit-btn");

  if (signupBtn) {
    console.log(
      "🚀 Custom Sign-Up script linked and listening for form submission!",
    );

    signupBtn.addEventListener("click", async (e) => {
      e.preventDefault(); // Keeps the page from refreshing layout assets

      // 1. Collect values from your HTML using your exact pre-existing IDs
      const facilityName =
        document.getElementById("regFacilityName")?.value.trim() || "";
      const email = document.getElementById("regEmail")?.value.trim() || "";
      const countryCode = document.getElementById("countryCode")?.value || "";
      const phone = document.getElementById("regContact")?.value.trim() || "";
      const password = document.getElementById("regPassword")?.value || "";
      const confirmPassword =
        document.getElementById("confirmPassword")?.value || "";

      // 2. Client-side validation checks
      if (!facilityName || !email || !password) {
        alert("Please fill out all required fields.");
        return;
      }

      if (password !== confirmPassword) {
        alert("Validation Error: Passwords do not match!");
        return;
      }

      // 3. Saved the email in Local Storage for the Email Verification screen
      localStorage.setItem("userEmail", email);

      // 4. FIX: Split the facility name into firstName and lastName to bypass server schema requirements
      const names = facilityName.split(" ");
      const fName = names[0] || "Facility";
      const lName = names.slice(1).join(" ") || "Admin";

      // 5. Construct the payload package using the new required properties
      const signupPayload = {
        firstName: fName, // Satisfies backend requirements
        lastName: lName, // Satisfies backend requirements
        facilityName: facilityName, // Keeps your business info intact
        email: email,
        phoneNumber: `${countryCode}${phone}`,
        password: password,
      };

      console.log(
        "📦 Transmitting updated registration packet:",
        signupPayload,
      );

      // 6. Pull your target URL from config.js
      const signupUrl =
        window.APP_CONFIG?.AUTH?.SIGNUP ||
        "https://medhirely-backend.onrender.com/api/auth/register";

      try {
        signupBtn.innerText = "Registering Account...";
        signupBtn.disabled = true;

        // 7. Fire off the live network request to the Render server
        const response = await fetch(signupUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupPayload),
        });

        const data = await response.json();

        if (response.ok) {
          alert(
            " Facility registered successfully! Moving on to verification.",
          );
          window.location.href = "verification_page.html";
        } else {
          // This catches any remaining server validation messages
          alert(
            `Registration Rejected: ${data.message || "Check form parameters."}`,
          );
        }
      } catch (err) {
        console.error("❌ Communication failed:", err);
        alert("Could not reach the database. Server might be spinning up.");
      } finally {
        signupBtn.innerText = "Create Account";
        signupBtn.disabled = false;
      }
    });
  }
});
