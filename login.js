 function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const msg = document.getElementById('loginMsg');

    // Your login details
    const correctUsername = "saas";
    const correctPassword = "1234";

    if(username === correctUsername && password === correctPassword) {
        msg.style.color = "green";
        msg.textContent = "Login Successful! Redirecting...";
        
        // FIXED: Must match what dashboard.html checks
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('user', username);
        
        // FIXED: lowercase filename for mobile compatibility
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);
        
    } else {
        msg.style.color = "red";
        msg.textContent = "Wrong Username or Password!";
    }
}
