if(localStorage.getItem('loggedIn') !== 'true') {
    window.location.href = 'login.html'; // if not logged in, kick to login
}
 function markAttendance() {

    let student = document.getElementById("student").value;
    let status = document.getElementById("status").value;

    if (student === "") {
        alert("Please enter the student's name.");
        return;
    }

    document.getElementById("message").innerHTML =
        "Attendance saved successfully.<br><br>" +
        "Student: " + student +
        "<br>Status: " + status;

    document.getElementById("student").value = "";
}
