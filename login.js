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
        
        // Save login state so Dashboard knows you're logged in
        localStorage.setItem('isLoggedIn', 'true');
        
        // Go to dashboard after 1 second
        setTimeout(() => {
            window.location.href = "Dashboard.html";
        }, 1000);
        
    } else {
        msg.style.color = "red";
        msg.textContent = "Wrong Username or Password!";
    }
}
