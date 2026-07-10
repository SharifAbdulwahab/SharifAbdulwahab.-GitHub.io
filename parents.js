function saveParent() {
    // Get values from inputs
    const studentName = document.getElementById('studentName').value.trim();
    const parentName = document.getElementById('parentName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const msg = document.getElementById('message');

    // Validation
    if(studentName === "" || parentName === "" || phone === "") {
        msg.style.color = "red";
        msg.textContent = "Please fill Student Name, Parent Name and Phone";
        return;
    }

    // Get existing parents from localStorage or create empty array
    let parents = JSON.parse(localStorage.getItem('parents')) || [];

    // Create new parent object
    const newParent = {
        id: Date.now(), // unique ID
        studentName,
        parentName,
        phone,
        email
    };

    // Add to array and save back
    parents.push(newParent);
    localStorage.setItem('parents', JSON.stringify(parents));

    // Success message
    msg.style.color = "green";
    msg.textContent = "Parent Saved Successfully!";

    // Clear form
    document.getElementById('studentName').value = "";
    document.getElementById('parentName').value = "";
    document.getElementById('phone').value = "";
    document.getElementById('email').value = "";
}
