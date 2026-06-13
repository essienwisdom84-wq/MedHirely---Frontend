const API_URL = "https://medhirely-backend.onrender.com/api/facilities";

const logoPreview = document.getElementById("logo-preview");
const fileInput = document.getElementById("logo-file-input");
const headerAvatar = document.getElementById("header-avatar");

// Profile Photo Persistence Handler
if (logoPreview && fileInput) {
  logoPreview.parentElement.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const base64Image = e.target.result;
        logoPreview.src = base64Image;
        if (headerAvatar) headerAvatar.src = base64Image;
        localStorage.setItem("medhirely_facility_logo", base64Image);
      };
      reader.readAsDataURL(file);
    }
  });
}

// Fetch and pre-populate your specific layout inputs
async function fetchCurrentData() {
  const savedLogo = localStorage.getItem("medhirely_facility_logo");
  if (savedLogo) {
    if (logoPreview) logoPreview.src = savedLogo;
    if (headerAvatar) headerAvatar.src = savedLogo;
  }

  try {
    const res = await fetch(
      "https://medhirely-backend.onrender.com/api/facilities",
    );
    if (!res.ok) throw new Error("Backend failed to respond");
    const data = await res.json();

    const profile = Array.isArray(data) ? data[0] : data;
    if (profile) {
      if (document.getElementById("top-bar-name"))
        document.getElementById("top-bar-name").textContent =
          profile.FacilityName || "Petros";

      // Map strictly to your UI fields from image 1000496678.jpg
      if (document.getElementById("input-FacilityName"))
        document.getElementById("input-facilityName").value =
          profile.facilityName || "";
      if (document.getElementById("input-FacilityType"))
        document.getElementById("input-FacilityType").value =
          profile.facilityType || "Hospital";
      if (document.getElementById("input-licenseNumber"))
        document.getElementById("input-licenseNumber").value =
          profile.input - licenseNumber || "";
      if (document.getElementById("input-TaxId"))
        document.getElementById("input-TaxId").value = profile.taxId || "";
      if (document.getElementById("input-email"))
        document.getElementById("input-email").value = profile.email || "";
      if (document.getElementById("input-phoneNumber"))
        document.getElementById("input-phoneNumber").value =
          profile.phoneNumber || "";
      if (document.getElementById("input-SecondaryPhone"))
        document.getElementById("input-SecondaryPhone").value =
          profile.secondaryPhoneNumber || "";
      if (document.getElementById("input-Country"))
        document.getElementById("input-Country").value =
          profile.country || "Nigeria";
      if (document.getElementById("input-City"))
        document.getElementById("input-City").value = profile.city || "Lagos";
      if (document.getElementById("input-PostalCode"))
        document.getElementById("input-PostalCode").value =
          profile.postalCode || "";
      if (document.getElementById("input-address"))
        document.getElementById("input-address").value = profile.address || "";
    }
  } catch (err) {
    console.warn("Could not retrieve profile fields. Server spinning up.", err);
  }
}

// Full form submission matching your exact layout payload properties
async function submitProfileForm(event) {
  event.preventDefault();

  const saveBtn = document.getElementById("save-btn");
  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.textContent = "Connecting to Render...";
  }

  const token = localStorage.getItem("authToken");

  // Build payload matching image 1000496678.jpg properties
  const payload = {
    facilityName: document.getElementById("input-facilityName")?.value || "",
    facilityType:
      document.getElementById("input-FacilityType")?.value || "Hospital",
    licenseNumber: document.getElementById("input-licenseNumber")?.value || "",
    taxId: document.getElementById("input-TaxId")?.value || "",
    email: document.getElementById("input-email")?.value || "",
    phoneNumber: document.getElementById("input-phoneNumber")?.value || "",
    secondaryPhoneNumber:
      document.getElementById("input-SecondaryPhone")?.value || "",
    country: document.getElementById("input-Country")?.value || "Nigeria",
    city: document.getElementById("input-City")?.value || "Lagos",
    postalCode: document.getElementById("input-PostalCode")?.value || "",
    address: document.getElementById("input-address")?.value || "",
  };

  try {
    const response = await fetch(
      "https://medhirely-backend.onrender.com/api/facilities",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Clears 401 Unauthorized
        },
        body: JSON.stringify(payload),
      },
    );

    if (response.status === 401) {
      throw new Error(
        "Your session is unauthorized. Please sign up or log in again.",
      );
    }

    if (!response.ok)
      throw new Error(`Server returned error status: ${response.status}`);

    window.location.href = "document-verification.html";
  } catch (error) {
    console.error(error);
    alert(
      error.message ||
        "Failed to save profile. Please wait a moment and try clicking Save again.",
    );
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.textContent = "Save Facility Profile";
    }
  }
}

document.addEventListener("DOMContentLoaded", fetchCurrentData);
