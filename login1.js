// ===============================
// SchoolEase Multi-Role Login
// login1.js
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    // Principal Login
    const principalForm = document.getElementById("principalLoginForm");
    if (principalForm) {
        principalForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const staffId = document.getElementById("staffId").value.trim();
            const password = document.getElementById("password").value.trim();

            if (staffId === "PRIN-001" && password === "principal123") {
                alert("Welcome Principal!");
                window.location.href = "dashboard.html";
            } else {
                alert("Invalid Staff ID or Password.");
            }
        });
    }

    // Teacher Login
    const teacherForm = document.getElementById("teacherLoginForm");
    if (teacherForm) {
        teacherForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const teacherId = document.getElementById("teacherId").value.trim();
            const password = document.getElementById("password").value.trim();

            if (teacherId === "TCH-001" && password === "teacher123") {
                alert("Welcome Teacher!");
                window.location.href = "teacher-dashboard.html";
            } else {
                alert("Invalid Staff ID or Password.");
            }
        });
    }

    // Student Login
    const studentForm = document.getElementById("studentLoginForm");
    if (studentForm) {
        studentForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const studentId = document.getElementById("studentId").value.trim();
            const password = document.getElementById("password").value.trim();

            if (studentId === "STU-001" && password === "student123") {
                alert("Welcome Student!");
                window.location.href = "student-dashboard.html";
            } else {
                alert("Invalid Student ID or Password.");
            }
        });
    }

    // Parent Login
    const parentForm = document.getElementById("parentLoginForm");
    if (parentForm) {
        parentForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const parentId = document.getElementById("parentId").value.trim();
            const password = document.getElementById("password").value.trim();

            if (parentId === "PAR-001" && password === "parent123") {
                alert("Welcome Parent!");
                window.location.href = "parent-dashboard.html";
            } else {
                alert("Invalid Parent ID or Password.");
            }
        });
    }

    // Forgot Password
    const forgotForm = document.getElementById("forgotPasswordForm");
    if (forgotForm) {
        forgotForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const role = document.getElementById("role").value;
            const userId = document.getElementById("userId").value.trim();
            const email = document.getElementById("email").value.trim();

            if (role === "" || userId === "" || email === "") {
                alert("Please complete all fields.");
                return;
            }

            alert("A password reset link has been sent to " + email);
            window.location.href = "index1.html";
        });
    }

}); 
