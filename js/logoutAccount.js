document.addEventListener("DOMContentLoaded", () => {
  const cancelBtn = document.getElementById("cancelBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const sideLogoutBtn = document.getElementById("logout-trigger-btn");

  cancelBtn.addEventListener("click", () => {
    window.location.href = "/dashboard";
  });

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();

    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    window.location.href = "/login.html";
  });

  sideLogoutBtn.addEventListener("click", () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();

    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    window.location.href = "/login.html";
  });
});
