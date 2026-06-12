const resendBtn = document.getElementById("resendBtn");
const resendText = document.getElementById("resendText");
const verifyBtn = document.getElementById("verifyBtn")
const inputs = document.querySelectorAll(".otp");
const user_email = document.getElementById("email")
const resendOtpUrl = window.APP_CONFIG?.AUTH?.RESEND_OTP || "https://medhirely-backend.onrender.com/api/auth/resend-email-otp"
 const verifyEmailUrl = window.APP_CONFIG?.AUTH?.OTP || "https://medhirely-backend.onrender.com/api/auth/verify-email";

    inputs.forEach((input, index) => {

      input.addEventListener("input", () => {

        if (input.value.length === 1 &&
            index < inputs.length - 1) {

          inputs[index + 1].focus();
        }
      });

      input.addEventListener("keydown", (e) => {

        if (
          e.key === "Backspace" &&
          input.value === "" &&
          index > 0
        ) {
          inputs[index - 1].focus();
        }
      });
    });

    const email = localStorage.getItem("userEmail");
    user_email.innerText = `${email}`;

    verifyBtn.addEventListener("click", async () => {
  const otp = [...document.querySelectorAll(".otp")]
    .map(input => input.value)
    .join("");

    const email = localStorage.getItem("userEmail");
    user_email.innerText = `${email}`;


    try {
        verifyBtn.innerText = "Verifing Email...";
        verifyBtn.disabled = true;

        // Send OTP to backend here
        const response = await fetch(verifyEmailUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email : `${email}`,
      otp : `${otp}`
    })
  }
);

const data = await response.json();

    if (response.ok) {
      alert(data.message || "🎉Email verified successfully!");

    
      window.location.href = "login.html";
    } else {
      alert(data.message);
    }

      } catch (error) {
        alert("Unable to connect to the server. Please try again.")
    }
});

      
        


resendBtn.addEventListener("click", async () => {

  try {

    const response = await fetch(resendOtpUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: `${email}`
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to resend OTP"
      );
    } else{
         alert(data.message || "OTP sent successfully")
    }
    startCountdown();

  } catch (error) {


    alert(error.message);
  }

});

function startCountdown() {

  let seconds = 30;

  resendBtn.disabled = true;

  resendBtn.textContent = `Resend in ${seconds}s`;
 resendBtn.classList.add("text-gray-400", "cursor-not-allowed");
  const timer = setInterval(() => {

    seconds--;

    resendBtn.textContent =
      `Resend in ${seconds}s`;

    if (seconds <= 0) {

      clearInterval(timer);

      resendBtn.disabled = false;

      resendBtn.textContent = "Resend";
    }

  }, 1000);
}

