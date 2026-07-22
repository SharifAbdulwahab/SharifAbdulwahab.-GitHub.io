// ===============================
// SchoolEase Student Management
// Part 1
// ===============================
/* ============================================================
   SCHOOLEASE STUDENT ID GENERATOR
   ------------------------------------------------------------
   Purpose:
   Automatically generates a unique Admission Number for every
   newly registered student.

   Example IDs:
   SE-2026-000001
   SE-2026-000002
   SE-2026-000003

   How it works:
   1. Reads the last student number saved in localStorage.
   2. If this is the first student, it starts from 1.
   3. Increments the number by one.
   4. Saves the updated number for the next registration.
   5. Combines:
      - School Prefix (SE)
      - Current Year
      - Six-digit running number
   6. Returns the completed Admission Number.

   NOTE:
   In the future, when SchoolEase uses a real database,
   localStorage will be replaced by MySQL, but the admission
   number format can remain the same.
============================================================ */

function generateStudentID() {

    // Retrieve the last admission number from storage
    let lastNumber = localStorage.getItem("lastStudentNumber");

    // If no student has been registered yet, start from zero
    if (!lastNumber) {
        lastNumber = 0;
    }

    // Increase the counter by one for the new student
    lastNumber = parseInt(lastNumber) + 1;

    // Save the updated counter for the next registration
    localStorage.setItem("lastStudentNumber", lastNumber);

    // Get the current year automatically
    const year = new Date().getFullYear();

    // Return the formatted Admission Number
    return `SE-${year}-${String(lastNumber).padStart(6, "0")}`;
}
// Protect page
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
}

// Load students
let students = JSON.parse(localStorage.getItem("students")) || [];

// Register Student
function registerStudent() {

    const student = {

        id: document.getElementById("studentId").value.trim(),
        name: document.getElementById("studentName").value.trim(),
        age: document.getElementById("studentAge").value,
        gender: document.getElementById("studentGender").value,
        class: document.getElementById("studentClass").value,

        parentName: document.getElementById("parentName").value.trim(),
        parentPhone: document.getElementById("parentPhone").value.trim(),
        parentEmail: document.getElementById("parentEmail").value.trim(),
        address: document.getElementById("studentAddress").value.trim(),

        photo: document.getElementById("studentPhoto").value,

        dateRegistered: new Date().toLocaleDateString()

    };

    // Validation

    if (student.id === "" || student.name === "") {

        document.getElementById("message").innerHTML =
        "❌ Student ID and Name are required.";

        document.getElementById("message").style.color = "red";

        return;

    }

    if (student.class === "") {

        document.getElementById("message").innerHTML =
        "❌ Please select a class.";

        document.getElementById("message").style.color = "red";

        return;

    }

    // Duplicate ID

    if (students.some(s => s.id === student.id)) {

        document.getElementById("message").innerHTML =
        "❌ Student ID already exists.";

        document.getElementById("message").style.color = "red";

        return;

    }

    students.push(student);

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    document.getElementById("message").innerHTML =
    "✅ Student Registered Successfully.";

    document.getElementById("message").style.color = "green";

    clearForm();

    showAllStudents();

    // ===============================
// Part 2
// Display Students & Statistics
// ===============================

function showAllStudents() {

    const table = document.getElementById("studentTable");

    table.innerHTML = "";

    students.forEach((student, index) => {

        table.innerHTML += `

        <tr>

            <td>👤</td>

            <td>${student.id}</td>

            <td>${student.name}</td>

            <td>${student.age}</td>

            <td>${student.gender}</td>

            <td>${student.class}</td>

            <td>${student.parentName}</td>

            <td>${student.parentPhone}</td>

            <td>

                <button onclick="editStudent(${index})">

                Edit

                </button>

                <button onclick="deleteStudent(${index})">

                Delete

                </button>

            </td>

        </tr>

        `;

    });

    updateStatistics();

}

// ===============================
// Student Statistics
// ===============================

function updateStatistics() {

    document.getElementById("totalStudents").textContent =
        students.length;

    document.getElementById("maleStudents").textContent =
        students.filter(s => s.gender === "Male").length;

    document.getElementById("femaleStudents").textContent =
        students.filter(s => s.gender === "Female").length;

}

// ===============================
// Search Student
// ===============================

const searchBox = document.getElementById("searchStudent");

if (searchBox) {

    searchBox.addEventListener("keyup", function () {

        const keyword = this.value.toLowerCase();

        const rows = document.querySelectorAll("#studentTable tr");

        rows.forEach((row, index) => {

            if (index === 0) return;

            if (row.innerText.toLowerCase().includes(keyword)) {

                row.style.display = "";

            } else {

                row.style.display = "none";

            }

        });

    });

    }
}
    // ===============================
// Part 3
// Edit, Update & Delete Students
// ===============================

function editStudent(index) {

    const student = students[index];

    document.getElementById("studentId").value = student.id;
    document.getElementById("studentName").value = student.name;
    document.getElementById("studentAge").value = student.age;
    document.getElementById("studentGender").value = student.gender;
    document.getElementById("studentClass").value = student.class;

    document.getElementById("parentName").value =
        student.parentName || "";

    document.getElementById("parentPhone").value =
        student.parentPhone || "";

    document.getElementById("parentEmail").value =
        student.parentEmail || "";

    document.getElementById("studentAddress").value =
        student.address || "";

    students.splice(index, 1);

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    showAllStudents();

    document.getElementById("message").innerHTML =
        "✏️ Edit the details and click Register Student to save changes.";

    document.getElementById("message").style.color = "blue";

}// ===============================
// Part 4
// Clear Form & Initialize
// ===============================

// Clear Form
function clearForm() {

    document.getElementById("studentId").value = "";
    document.getElementById("studentName").value = "";
    document.getElementById("studentAge").value = "";
    document.getElementById("studentGender").value = "";
    document.getElementById("studentClass").value = "";

    document.getElementById("parentName").value = "";
    document.getElementById("parentPhone").value = "";
    document.getElementById("parentEmail").value = "";
    document.getElementById("studentAddress").value = "";

    const photo = document.getElementById("studentPhoto");
    if (photo) {
        photo.value = "";
    }

}

// Save all students
function saveStudents() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

}

// Initialize page
window.onload = function () {

    showAllStudents();

    updateStatistics();

    const date = document.getElementById("currentDate");

    if (date) {

        date.textContent = new Date().toLocaleDateString(
            "en-GB",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

    }

};

// Refresh statistics after any change
function refreshStudents() {

    saveStudents();

    showAllStudents();

    updateStatistics();

}

// ===============================
// Delete Student
// ===============================

function deleteStudent(index) {

    if (!confirm("Are you sure you want to delete this student?")) {

        return;

    }

    students.splice(index, 1);

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    showAllStudents();

    document.getElementById("message").innerHTML =
        "🗑 Student deleted successfully.";

    document.getElementById("message").style.color = "red";

        }
