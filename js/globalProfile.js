// globalProfile.js - Handles dynamic time-of-day greetings and top-bar updates

document.addEventListener("DOMContentLoaded", () => {
  // 1. Grab the saved facility profile from local memory
  const storedProfile = localStorage.getItem("facilityProfile");
  if (!storedProfile) return;

  const data = JSON.parse(storedProfile);

  // UI Elements
  const topBarName = document.getElementById("top-bar-name");
  const topBarImg = document.getElementById("top-bar-img");
  const topBarInitials = document.getElementById("top-bar-initials");
  const dashboardGreeting = document.getElementById(
    "dashboard-welcome-heading",
  );

  // 🌟 2. NEW TIME OF DAY ENGINE:
  if (data.name && dashboardGreeting) {
    const currentHour = new Date().getHours(); // Gets a number between 0 and 23
    let greetingPhrase = "Good Morning"; // Default fallback

    if (currentHour >= 12 && currentHour < 16) {
      greetingPhrase = "Good Afternoon";
    } else if (currentHour >= 16 || currentHour < 4) {
      greetingPhrase = "Good Evening";
    }

    // Apply it directly to your HTML title header hook!
    dashboardGreeting.textContent = `${greetingPhrase}, ${data.name}`;
  }

  // 3. Update Top Bar Display Name Text
  if (data.name && topBarName) {
    topBarName.textContent = data.name;
  }

  // 4. Sync Top Bar Image Avatar or fallback initials layout
  if (data.logo && data.logo.trim() !== "" && topBarImg && topBarInitials) {
    topBarImg.src = data.logo;
    topBarImg.classList.remove("hidden");
    topBarInitials.classList.add("hidden");
  } else if (data.name && topBarInitials && topBarImg) {
    const initials = data.name.substring(0, 2).toUpperCase();
    topBarInitials.textContent = initials;
    topBarImg.classList.add("hidden");
    topBarInitials.classList.remove("hidden");
  }
});
