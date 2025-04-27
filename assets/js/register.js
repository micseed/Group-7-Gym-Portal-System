document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const ageError = document.getElementById('ageError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault(); 

            let isValid = true;
            const age = parseInt(this.querySelector('#age').value);
            const password = this.querySelector('#password').value;
            const confirmPassword = this.querySelector('#confirm-password').value;

            // age verification (must be 18 or older)
            if (isNaN(age) || age < 18) {
                ageError.textContent = 'You must be 18 years or older to register.';
                isValid = false;
            } else {
                ageError.textContent = '';
            }

            // pw val
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
            if (!passwordRegex.test(password)) {
                passwordError.textContent = 'Password must contain at least 8 characters, including uppercase, lowercase, and a number.';
                isValid = false;
            } else {
                passwordError.textContent = '';
            }

            if (password !== confirmPassword) {
                confirmPasswordError.textContent = 'Passwords do not match.';
                isValid = false;
            } else {
                confirmPasswordError.textContent = '';
            }

            if (isValid) {
                alert('Registration Successful!');
                window.location.href = 'testclient.html';
            }
        });
    }
});