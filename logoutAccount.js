        document.addEventListener('DOMContentLoaded', () => {
            const cancelBtn = document.getElementById('cancelBtn');
            const logoutBtn = document.getElementById('logoutBtn');

            // Action when user selects Cancel 
            cancelBtn.addEventListener('click', () => {
                window.location.href = '/dashboard'; 
            });

            // Action when user authenticates structural sign-out
            logoutBtn.addEventListener('click', () => {
                // Clear state contexts
                localStorage.removeItem('authToken');
                sessionStorage.clear();

                // Clear structural cookie identifiers
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

                // Route back to base system landing page
                window.location.href = '/login.html';
            });
        });