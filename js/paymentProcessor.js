// paymentProcessor.js

document.addEventListener("DOMContentLoaded", () => {
    // 1. Get the shift details out of the address bar parameters
    const urlParams = new URLSearchParams(window.location.search);
    const workerName = urlParams.get('worker');
    const hoursWorked = parseFloat(urlParams.get('hours'));
    const hourlyRate = parseFloat(urlParams.get('rate'));

    // DOM Elements
    const amountEl = document.getElementById('payment-amount');
    const workerEl = document.getElementById('payment-worker-name');
    const txIdEl = document.getElementById('transaction-id');

    if (workerName && hoursWorked && hourlyRate) {
        // 2. Math calculation: Gross Earnings
        const totalEarnings = hoursWorked * hourlyRate;

        // 3. Format currency nicely with commas for Nigerian Naira layout
        if (amountEl) {
            amountEl.textContent = `₦${totalEarnings.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }

        // 4. Update worker name target text string
        if (workerEl) {
            workerEl.textContent = workerName;
        }

        // 5. Generate a fresh unique transaction reference number
        if (txIdEl) {
            const randomRef = Math.floor(100000 + Math.random() * 900000);
            txIdEl.textContent = `#MED${randomRef}`;
        }
    } else {
        // Fallback dummy values if page is accessed directly without clicking a shift
        if (amountEl) amountEl.textContent = "₦173,700.00";
        if (workerEl) workerEl.textContent = "Eseyin Felicia";
    }
});