// =========================
// SIDEBAR MENU ACTIVE STATE
// =========================

const menuItems = document.querySelectorAll(".menu-item");

if (menuItems.length) {
  menuItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();

      menuItems.forEach((i) => {
        if (i.getAttribute("data-tab") === "logout") {
          i.className =
            "menu-item flex items-center px-4 py-2 text-sm font-bold text-gray-900 rounded-md hover:bg-red-50 hover:text-red-600 transition-all pl-[38px]";
        } else {
          i.className =
            "menu-item flex items-center px-4 py-2 text-sm font-bold text-gray-900 rounded-md hover:bg-gray-100/80 transition-all pl-[38px]";
        }
      });

      if (item.getAttribute("data-tab") !== "logout") {
        item.className =
          "menu-item flex items-center gap-3.5 bg-[#e8f0fe] text-[#2f74fa] border border-[#2f74fa] px-4 py-2.5 rounded-md font-bold text-sm transition shadow-sm";
      }
    });
  });
}


// =========================
// STAR RATING
// =========================

const starButtons = document.querySelectorAll(".star-btn");

if (starButtons.length) {
  starButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetIndex = parseInt(
        button.getAttribute("data-index"),
        10
      );

      starButtons.forEach((btn) => {
        const btnIndex = parseInt(
          btn.getAttribute("data-index"),
          10
        );

        const svg = btn.querySelector("svg");

        if (!svg) return;

        if (btnIndex <= targetIndex) {
          svg.style.fill = "currentColor";
        } else {
          svg.style.fill = "none";
        }
      });
    });
  });
}


// =========================
// CHARACTER COUNTER
// =========================

const reviewInput = document.getElementById("reviewInput");
const charCounter = document.getElementById("charCounter");

if (reviewInput && charCounter) {
  const updateCounter = () => {
    const length = reviewInput.value.length;
    charCounter.innerText = `${length}/500`;
  };

  reviewInput.addEventListener("input", updateCounter);

  updateCounter();
}


// =========================
// SUBMIT REVIEW
// =========================

const submitBtn = document.getElementById("submitReviewBtn");

if (submitBtn) {
  submitBtn.addEventListener("click", () => {
    submitBtn.innerText = "Review Submitted";

    submitBtn.className =
      "w-full bg-emerald-600 text-white font-bold text-sm py-2.5 rounded-lg shadow-md transition pointer-events-none";

    setTimeout(() => {
      submitBtn.innerText = "Submit Review";

      submitBtn.className =
        "w-full bg-[#2f74fa] text-white font-bold text-sm py-2.5 rounded-lg border border-transparent shadow-md hover:bg-blue-600 transition active:scale-[0.99] focus:outline-none";
    }, 3000);
  });
}


// =========================
// APPROVE PAYMENT
// =========================

function approvePayment() {
  window.location.href = "payment-success.html";
}


// =========================
// MOBILE SIDEBAR
// =========================

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

if (menuBtn && sidebar && overlay) {

  function openSidebar() {
    sidebar.classList.remove("-translate-x-full");
    overlay.classList.remove("hidden");
  }

  function closeSidebar() {
    sidebar.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
  }

  menuBtn.addEventListener("click", () => {
    if (sidebar.classList.contains("-translate-x-full")) {
      openSidebar();
    } else {
      closeSidebar();
    }
  });

  overlay.addEventListener("click", closeSidebar);

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      overlay.classList.add("hidden");
      sidebar.classList.remove("-translate-x-full");
    } else {
      sidebar.classList.add("-translate-x-full");
    }
  });
}