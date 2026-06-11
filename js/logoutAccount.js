

document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('confirm-logout-btn');

    if (logoutBtn) {
        console.log("Logout page confirmation script loaded and armed!");

        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // 1. Clear out the security handshake tokens from browser memory
            localStorage.removeItem('authToken');
            
            // Optional: Clears everything else stored if you want a complete blank slate
            // localStorage.clear(); 

            console.log("🧹 Session token wiped successfully.");

            // 2. Alert the user and bounce them straight back to the login screen
            alert('Logged out successfully. Secure session terminated.');
            
            // Since login.html sits right next to logout-account.html in facility_pages:
            window.location.href = "login.html";
        });
    }
});