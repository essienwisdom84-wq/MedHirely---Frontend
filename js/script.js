

document.addEventListener('DOMContentLoaded', () => {
    // Safely pull the base URL map after DOM contents compile
    const CONFIG = window.APP_CONFIG;
    const API_URL = CONFIG ? CONFIG.BASE_URL : 'https://medhirely-backend.onrender.com/api';
    
    console.log("MedHirely core engine connected to: ", API_URL);
    setupGlobalUI();
});

function setupGlobalUI() {
    // Target the specific HTML id string you gave the sidebar link
    const sidebarLogoutBtn = document.getElementById('logout-trigger-btn');
    
    if (sidebarLogoutBtn) {
        sidebarLogoutBtn.addEventListener('click', (event) => {
            event.preventDefault(); 
            // Send them directly to your team's confirmation page view
            window.location.href = "./logout-account.html";
        });
    }
}