// js/newShift.js

document.addEventListener("DOMContentLoaded", () => {
  const postShiftBtn = document.getElementById("post-shift-btn");

  if (postShiftBtn) {
    postShiftBtn.addEventListener("click", async (e) => {
      e.preventDefault();

      // 1. Gather inputs - checking multiple possible IDs for each
      const title =
        document.getElementById("shift-title")?.value || "General Shift";

      // Getting dates (Checking for both 'start-date' and 'shift-date')
      const date =
        document.getElementById("start-date")?.value ||
        document.getElementById("shift-date")?.value ||
        "";
      const endDate = document.getElementById("end-date")?.value || "";

      // Getting times
      const startTime = document.getElementById("start-time")?.value || "08:00";
      const endTime = document.getElementById("end-time")?.value || "17:00";

      const role = document.getElementById("shift-role")?.value || "RN";
      const staff =
        parseInt(document.getElementById("staff-count")?.value) || 1;
      const salary =
        parseFloat(document.getElementById("pay-rate")?.value) || 0;
      const location =
        document.getElementById("shift-location")?.value || "Main Facility";

      // 2. Validate essential data
      if (!date) {
        alert("Please select a date in the Start Date field!");
        return;
      }

      // 3. Package payload
      const payload = {
        title: title,
        shiftType:
          document.getElementById("shift-type")?.value.toLowerCase() ||
          "morning",
        workersNeeded: staff,
        salary: salary,
        location: location,
        shiftDate: date,
        endDate: endDate,
        startTime: startTime,
        endTime: endTime,
        status: "open",
        facilityId:
          localStorage.getItem("facilityId") || "650c1a2b3c4d5e6f7a8b9c0d",
      };

      console.log("🚀 Sending this to server:", payload);

      // 4. Send
      const endpoint =
        window.APP_CONFIG?.SHIFTS?.CREATE ||
        "https://medhirely-backend.onrender.com/api/shifts/createShift";

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          alert("Shift posted successfully!");
          window.location.href = "shift-progress.html";
        } else {
          const errorData = await response.json();
          alert("Error: " + JSON.stringify(errorData));
        }
      } catch (err) {
        alert("Network error: " + err.message);
      }
    });
  }
});
