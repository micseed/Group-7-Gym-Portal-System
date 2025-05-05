document.addEventListener('DOMContentLoaded', function () {
    // --- Standard Modal Handling Functions ---
    function showModal(overlayId) {
        const overlay = document.getElementById(overlayId);
        if (overlay) overlay.classList.add('active');
    }
    function hideModal(overlayId) { // We might not need hide for success modal if redirecting
        const overlay = document.getElementById(overlayId);
        if (overlay) overlay.classList.remove('active');
    }
    // Add basic close logic for potentially other modals on the page
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) hideModal(overlay.id);
        });
    });
    document.querySelectorAll('.modal-close').forEach(button => {
         button.addEventListener('click', () => {
             const overlay = button.closest('.modal-overlay');
             if(overlay) hideModal(overlay.id);
         });
     });
     document.querySelectorAll('.modal-button.ok-button, .modal-button.no-button').forEach(button => { // Close on OK/Cancel too
         button.addEventListener('click', () => {
             const overlay = button.closest('.modal-overlay');
             if(overlay) hideModal(overlay.id);
         });
     });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(overlay => hideModal(overlay.id));
        }
    });
    // --- End Standard Modal Handling ---


    // --- Login Logic ---
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');
    const loginSuccessMessage = document.getElementById('loginSuccessMessage'); // Get success message element

    if (loginForm && loginError && loginSuccessMessage) { // Check all elements
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            loginError.textContent = '';
            loginError.style.display = 'none';

            const usernameInput = this.querySelector('#username');
            const passwordInput = this.querySelector('#password');

            if (!usernameInput || !passwordInput) {
                loginError.textContent = 'An unexpected error occurred.';
                loginError.style.display = 'block'; return;
            }

            const username = usernameInput.value.trim();
            const password = passwordInput.value;

            let redirectUrl = null;
            let userType = '';

            // --- Authentication Logic ---
            if (username === 'coach' && password === 'coachpass') {
                redirectUrl = 'coachmain.html';
                userType = 'Coach';
            } else if (username === 'admin' && password === 'adminpass') {
                redirectUrl = 'testadmin.html';
                userType = 'Admin';
            } else if (username === 'guest' && password === 'guestpass') {
                redirectUrl = 'guest.html';
                userType = 'Guest';
            }
            // Simple check for a client email pattern (replace with real validation/API call)
            else if (username.includes('@') && !username.includes('energize.com') && password) {
                 redirectUrl = 'testclient.html';
                 userType = 'Client';
            }

            // --- Handle Result ---
            if (redirectUrl) {
                // Show Success Modal
                loginSuccessMessage.textContent = `Welcome, ${userType}! Redirecting...`; // Customize message
                showModal('loginSuccessModalOverlay');

                // Redirect after a short delay
                setTimeout(() => {
                    window.location.href = redirectUrl;
                }, 1500); // Redirect after 1.5 seconds

            } else {
                // Show Error Message
                loginError.textContent = 'Invalid username or password.';
                loginError.style.color = 'red';
                loginError.style.display = 'block';
                if (passwordInput) {
                    passwordInput.value = ''; // Clear password on failure
                    passwordInput.focus();
                }
            }
        });
    } else {
        console.error("Login form, login error, or login success message element not found!");
    }
});