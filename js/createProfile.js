// Setup initial user state simulator
const loggedInUserEmail = "admin@stlukeshospital.org";
let profileLogoBase64 = "";

// Inside createProfile.js

document.addEventListener("DOMContentLoaded", () => {
  // Put current logged in user email under image box
  if (document.getElementById("loggedInEmail")) {
    document.getElementById("loggedInEmail").textContent = loggedInUserEmail;
  }

  // 1. Hydrate existing profile data from localStorage if saved before
  loadProfileData();

  // 2. NEW MAGIC: Check if the user came from another page via "View Facility Profile"
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("view") === "true") {
    switchTab("view"); // Instantly flips over to the view panel layout!
  }
});

// 1. Image Preview Engine
function previewImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profileLogoBase64 = e.target.result;
      displayLogo(profileLogoBase64);
    };
    reader.readAsDataURL(file);
  }
}

function displayLogo(base64Uri) {
  const preview = document.getElementById("logoPreview");
  const placeholder = document.getElementById("uploadPlaceholder");
  preview.src = base64Uri;
  preview.classList.remove("hidden");
  placeholder.classList.add("hidden");
}

// 2. Tab Navigation System
function switchTab(tab) {
  const editSection = document.getElementById("edit-profile-section");
  const viewSection = document.getElementById("view-profile-section");
  const editBtn = document.getElementById("tab-edit-btn");
  const viewBtn = document.getElementById("tab-view-btn");

  if (!editSection || !viewSection) {
    console.error("Profile sections are missing from this page layout.");
    return;
  }

  if (tab === "edit") {
    // Toggle Visibility Panels
    editSection.classList.remove("hidden");
    viewSection.classList.add("hidden");

    // 🌟 SAFETY CHECK: Only update sidebar buttons if they actually exist on this page
    if (editBtn && viewBtn) {
      editBtn.className =
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-cyan-50 text-cyan-600 font-medium transition";
      viewBtn.className =
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:bg-slate-50 transition";
    }
  } else {
    // Toggle Visibility Panels
    editSection.classList.add("hidden");
    viewSection.classList.remove("hidden");

    // 🌟 SAFETY CHECK: Only update sidebar buttons if they actually exist on this page
    if (editBtn && viewBtn) {
      viewBtn.className =
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-cyan-50 text-cyan-600 font-medium transition";
      editBtn.className =
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:bg-slate-50 transition";
    }

    // Refresh the text readout values from memory storage
    populateViewProfile();
  }
}

// 3. Save Form Logic
function saveProfile(event) {
  event.preventDefault();

  const profileData = {
    logo: profileLogoBase64,
    name: document.getElementById("facilityName").value,
    type: document.getElementById("facilityType").value,
    regNumber: document.getElementById("regNumber").value,
    taxId: document.getElementById("taxId").value,
    email: document.getElementById("contactEmail").value,
    phone: document.getElementById("phoneNumber").value,
    secPhone: document.getElementById("secondaryPhone").value,
    country: document.getElementById("country").value,
    city: document.getElementById("city").value,
    postalCode: document.getElementById("postalCode").value,
    address: document.getElementById("address").value,
  };

  // Save to LocalStorage browser cache
  localStorage.setItem("facilityProfile", JSON.stringify(profileData));

  // Sync Top Bar Profile UI info
  updateTopBar(profileData);

  // Pop Alert & Auto route to View profile
  alert("Facility Profile Saved Successfully!");
  switchTab("view");
}

// 4. Load & Populate Layer
function loadProfileData() {
  const stored = localStorage.getItem("facilityProfile");
  if (stored) {
    const data = JSON.parse(stored);

    if (data.logo) {
      profileLogoBase64 = data.logo;
      displayLogo(data.logo);
    }
    document.getElementById("facilityName").value = data.name || "";
    document.getElementById("facilityType").value = data.type || "";
    document.getElementById("regNumber").value = data.regNumber || "";
    document.getElementById("taxId").value = data.taxId || "";
    document.getElementById("contactEmail").value = data.email || "";
    document.getElementById("phoneNumber").value = data.phone || "";
    document.getElementById("secondaryPhone").value = data.secPhone || "";
    document.getElementById("country").value = data.country || "";
    document.getElementById("city").value = data.city || "";
    document.getElementById("postalCode").value = data.postalCode || "";
    document.getElementById("address").value = data.address || "";

    updateTopBar(data);
  }
}

function populateViewProfile() {
  const stored = localStorage.getItem("facilityProfile");

  const imgEl = document.getElementById("view-logo");
  const placeholderEl = document.getElementById("view-logo-placeholder");

  if (stored) {
    const data = JSON.parse(stored);

    if (data.logo) {
      imgEl.src = data.logo;
      imgEl.classList.remove("hidden");
      placeholderEl.classList.add("hidden");
    } else {
      imgEl.classList.add("hidden");
      placeholderEl.classList.remove("hidden");
    }

    document.getElementById("view-title").textContent =
      data.name || "Unnamed Facility";
    document.getElementById("view-badge").textContent =
      data.type || "Not Specified";
    document.getElementById("view-reg").textContent = data.regNumber || "--";
    document.getElementById("view-tax").textContent = data.taxId || "--";
    document.getElementById("view-email").textContent = data.email || "--";
    document.getElementById("view-phone").textContent = data.phone || "--";
    document.getElementById("view-sec-phone").textContent =
      data.secPhone || "--";
    document.getElementById("view-country").textContent = data.country || "--";
    document.getElementById("view-city").textContent = data.city || "--";
    document.getElementById("view-postal").textContent =
      data.postalCode || "--";
    document.getElementById("view-address").textContent = data.address || "--";
  }
}

function updateTopBar(profileData) {
  if (!profileData) return;

  const topBarName = document.getElementById("top-bar-name");
  const topBarImg = document.getElementById("top-bar-img");
  const topBarInitials = document.getElementById("top-bar-initials");

  // 1. Sync Text Display Name String
  if (topBarName && profileData.name) {
    topBarName.textContent = profileData.name;
  }

  // 2. Check if a Base64 logo data string exists in storage
  if (
    profileData.logo &&
    profileData.logo.trim() !== "" &&
    topBarImg &&
    topBarInitials
  ) {
    topBarImg.src = profileData.logo;
    topBarImg.classList.remove("hidden"); // Show the uploaded image
    topBarInitials.classList.add("hidden"); // Hide the hardcoded initials text
  } else if (profileData.name && topBarInitials && topBarImg) {
    // Fallback: Use name text initials if no picture is uploaded
    const initials = profileData.name.substring(0, 2).toUpperCase();
    topBarInitials.textContent = initials;
    topBarImg.classList.add("hidden");
    topBarInitials.remove("hidden");
  }
}

// Keep it exposed to global scope at the absolute bottom of the file
window.updateTopBar = updateTopBar;

// Add this at the very end of createProfile.js
window.saveProfile = saveProfile;
window.switchTab = switchTab;
window.populateViewProfile = populateViewProfile;
