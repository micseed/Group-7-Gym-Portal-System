document.addEventListener('DOMContentLoaded', function () {
    // --- Login ---
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const usernameInput = this.querySelector('#username'); // Corrected ID
            const passwordInput = this.querySelector('#password'); // Corrected ID

            if (usernameInput.value === 'webdev@gmail.com' && passwordInput.value === '12345678') {
                alert('Login Successful!');
                window.location.href = 'dashboard.html'; // Example redirection
            } else {
                loginError.textContent = 'Invalid username or password.';
            }
        });
    }

    // --- Registration ---
    const registerForm = document.getElementById('registerForm');
    const ageError = document.getElementById('ageError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            let isValid = true;

            const age = parseInt(this.querySelector('#age').value); // Corrected ID
            const password = this.querySelector('#password').value; // Corrected ID
            const confirmPassword = this.querySelector('#confirm-password').value;

            if (isNaN(age) || age < 18) {
                ageError.textContent = 'You must be 18 years or older to register.';
                isValid = false;
            } else {
                ageError.textContent = '';
            }

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

            if (!isValid) {
                event.preventDefault();
            } else {
                alert('Registration Successful!');
                // In a real scenario, you would likely redirect or perform other actions
            }
        });
    }
});