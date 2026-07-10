// Load saved settings when page opens
window.onload = function() {
    document.getElementById('schoolName').value = localStorage.getItem('schoolName') || 'NUHU WABI NURSERY AND PRIMARY SCHOOL';
    document.getElementById('principal').value = localStorage.getItem('principal') || '';
    document.getElementById('email').value = localStorage.getItem('email') || '';
    document.getElementById('session').value = localStorage.getItem('session') || '2026/2027';
}

// Save settings function
function saveSettings() {
    let schoolName = document.getElementById('schoolName').value;
    let principal = document.getElementById('principal').value;
    let email = document.getElementById('email').value;
    let session = document.getElementById('session').value;

    if(schoolName === "") {
        document.getElementById('message').innerText = "School Name is required";
        document.getElementById('message').style.color = "red";
        return;
    }

    localStorage.setItem('schoolName', schoolName);
    localStorage.setItem('principal', principal);
    localStorage.setItem('email', email);
    localStorage.setItem('session', session);

    document.getElementById('message').innerText = "Settings Saved Successfully!";
    document.getElementById('message').style.color = "green";
}
