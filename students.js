/* ============================================================
   SCHOOLEASE STUDENT REGISTRATION
   ------------------------------------------------------------
   Purpose:
   Collect all information entered by the user and create
   a new student record.

   NOTE:
   The Student ID is generated automatically. The user
   does NOT type the Student ID.
============================================================ */

const student = {

    // Automatically generate a unique Student ID
    id: generateStudentID(),

    // Student Information
    name: document.getElementById("studentName").value.trim(),

    // Date of Birth (Replace Age with DOB in your HTML)
    dob: document.getElementById("studentDOB").value,

    gender: document.getElementById("studentGender").value,

    class: document.getElementById("studentClass").value,

    // Parent Information
    parentName: document.getElementById("parentName").value.trim(),

    parentPhone: document.getElementById("parentPhone").value.trim(),

    parentEmail: document.getElementById("parentEmail").value.trim(),

    // Home Address
    address: document.getElementById("studentAddress").value.trim(),

    // Student Passport (Optional)
    photo: document.getElementById("studentPhoto").value,

    // Registration Date
    dateRegistered: new Date().toLocaleDateString()
}; 
