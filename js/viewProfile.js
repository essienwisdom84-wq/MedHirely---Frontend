document.addEventListener("DOMContentLoaded", async () => {
    // 🔑 1. Grab the golden token from your browser memory
    const token = localStorage.getItem("authToken");

    if (!token) {
        alert("Session expired. Please log in again.");
        window.location.href = "login.html";
        return;
    }

    try {
        // 🎯 2. Send an authorized GET request to pull your profile data row
        const response = await fetch('https://medhirely-backend.onrender.com/api/facilities/', {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            const data = await response.json();
            const profile = data.facility || data; // Handles nested object variations

            // 🛠️ 3. Inject the real data straight into the HTML page fields
            if (document.getElementById("yearsExperience")) {
                document.getElementById("yearsExperience").textContent = `${profile.yearsOfExperience || 0} Years Experience`;
            }
            if (document.getElementById("licenseNumber")) {
                document.getElementById("licenseNumber").textContent = `License: ${profile.licenseNumber || 'N/A'}`;
            }
            if (document.getElementById("facilityBio")) {
                document.getElementById("facilityBio").textContent = profile.facilityBiography || "No biography provided.";
            }
            if (document.getElementById("emailAddress")) {
                document.getElementById("emailAddress").textContent = profile.email || 'N/A';
            }
            if (document.getElementById("phoneNumber")) {
                document.getElementById("phoneNumber").textContent = profile.phoneNumber || 'N/A';
            }
            if (document.getElementById("physicalAddress")) {
                document.getElementById("physicalAddress").textContent = profile.address || 'N/A';
            }

        } else {
            console.error("Failed to sync profile information from server.");
        }
    } catch (error) {
        console.error("Profile synchronization crash:", error);
    }
});