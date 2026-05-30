document.addEventListener('DOMContentLoaded', () => {
    const genderButtons = document.querySelectorAll('.btn-gender');
    const form = document.getElementById('registrationForm');

    // Handle Gender Button Toggles
    genderButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active status from all sibling buttons
            genderButtons.forEach(btn => btn.classList.remove('active'));
            // Add active status to clicked button
            button.classList.add('active');
        });
    });

    // Form submission interceptor                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Gather active gender value
        const activeGender = document.querySelector('.btn-gender.active').textContent;
        // Gather selected phone type
        const selectedPhoneType = document.querySelector('input[name="phoneType"]:checked')?.value;

        // Construct Data payload
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            preferredName: document.getElementById('preferredName').value,
            dob: document.getElementById('dob').value,
            referredBy: document.getElementById('referredBy').value,
            gender: activeGender,
            phoneNumber: document.getElementById('phoneNumber').value,
            phoneType: selectedPhoneType
        };

        console.log('Proceeding to Next Step with Data:', formData);
        });
});