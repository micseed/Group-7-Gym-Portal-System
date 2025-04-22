document.addEventListener('DOMContentLoaded', function () {
    // login js part
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const usernameInput = this.querySelector('#username');
            const passwordInput = this.querySelector('#password');

            if (usernameInput.value === 'coach@energizecoach.com' && passwordInput.value === 'coachpass') {
                alert('Coach Login Successful!');
                window.location.href = 'coachmain.html';
            } else if (usernameInput.value === 'admin@energizecoach.com' && passwordInput.value === 'adminpass') {
                alert('Admin Login Successful!');
                window.location.href = 'testadmin.html';
            }
            else if (usernameInput.value.includes('energize.com') && !usernameInput.value.includes('energizecouch.com')) {
                alert('Client Login Successful!');
                window.location.href = 'testclient.html';
            } else {
                loginError.textContent = 'Invalid username or password.';
            }
        });
    }
});
