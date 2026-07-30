 /* ==========================================================
   SCHOOLEASE STUDENT MANAGEMENT SYSTEM
   ----------------------------------------------------------
   MERGED FILE
   - Generate Student ID
   - Register Student
   - Save to Local Storage
   - Load Students
   - Update Summary Cards
   - Load Demo Students
   - Search Students
   - Delete Student
   - Edit Student
========================================================== */

// Storage Key
const STORAGE_KEY = "schoolEaseStudents";

/* ==========================================================
   Generate Automatic Student ID
   Example:
   SE-2026-000001
========================================================== */

function generateStudentID() {

    let lastNumber = Number(localStorage.getItem("lastStudentNumber")) || 0;

    lastNumber++;

    localStorage.setItem("lastStudentNumber", lastNumber);

    const year = new Date().getFullYear();

    return `SE-${year}-${String(lastNumber).padStart(6, "0")}`;
}

/* ==========================================================
   Preview Next Student ID (does NOT increment the counter)
   Used only to display what the next ID will be — the
   counter is only advanced once a student is actually
   registered (see generateStudentID() calls in clearForm()).
========================================================== */

function peekNextStudentID() {

    const lastNumber = Number(localStorage.getItem("lastStudentNumber")) || 0;

    const nextNumber = lastNumber + 1;

    const year = new Date().getFullYear();

    return `SE-${year}-${String(nextNumber).padStart(6, "0")}`;
}

/* ==========================================================
   Display Next Student ID when page loads
   (preview only — does not consume a number)
========================================================== */

document.addEventListener("DOMContentLoaded", function () {

    loadDemoStudents();

    document.getElementById("studentId").value = peekNextStudentID();

    loadStudents();

});


/* ==========================================================
   Register Student
========================================================== */

function registerStudent() {

    let students =
        JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const student = {

        id: document.getElementById("studentId").value,

        photo: document.getElementById("studentPhoto").value,

        name: document.getElementById("studentName").value.trim(),

        age: document.getElementById("studentAge").value,

        gender: document.getElementById("studentGender").value,

        class: document.getElementById("studentClass").value,

        parentName: document.getElementById("parentName").value.trim(),

        parentPhone: document.getElementById("parentPhone").value.trim(),

        parentEmail: document.getElementById("parentEmail").value.trim(),

        address: document.getElementById("studentAddress").value.trim(),

        dateRegistered: new Date().toLocaleDateString()

    };

    // Simple Validation

    if (
        student.name === "" ||
        student.age === "" ||
        student.gender === "" ||
        student.class === ""
    ) {

        document.getElementById("message").innerHTML =
            "Please complete all required fields.";

        return;
    }

    students.push(student);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(students)
    );

    document.getElementById("message").innerHTML =
        "Student Registered Successfully!";

    clearForm();

    loadStudents();

}


/* ==========================================================
   Clear Form
========================================================== */

function clearForm() {

    document.getElementById("studentPhoto").value = "";

    document.getElementById("studentName").value = "";

    document.getElementById("studentAge").value = "";

    document.getElementById("studentGender").value = "";

    document.getElementById("studentClass").value = "";

    document.getElementById("parentName").value = "";

    document.getElementById("parentPhone").value = "";

    document.getElementById("parentEmail").value = "";

    document.getElementById("studentAddress").value = "";

    document.getElementById("studentId").value =
        generateStudentID();

}


/* ==========================================================
   Load Students into Table
========================================================== */

function loadStudents() {

    const students =
        JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const table =
        document.querySelector("#studentTable tbody");

    table.innerHTML = "";

    students.forEach(student => {

        table.innerHTML += `

        <tr>

        <td>📷</td>

        <td>${student.id}</td>

        <td>${student.name}</td>

        <td>${student.age}</td>

        <td>${student.gender}</td>

        <td>${student.class}</td>

        <td>${student.parentName}</td>

        <td>${student.parentPhone}</td>

        <td>
        <button onclick="editStudent('${student.id}')">
        Edit
        </button>
        <button onclick="deleteStudent('${student.id}')">
        Delete
        </button>
        </td>

        </tr>

        `;

    });

    updateSummary();

}


/* ==========================================================
   Update Summary Cards
========================================================== */

function updateSummary() {

    const students =
        JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    document.getElementById("totalStudents").innerHTML =
        students.length;

    document.getElementById("maleStudents").innerHTML =
        students.filter(s => s.gender === "Male").length;

    document.getElementById("femaleStudents").innerHTML =
        students.filter(s => s.gender === "Female").length;

}


/* ==========================================================
   Load Demo Students (Runs Only Once)
========================================================== */

function loadDemoStudents() {

    let students = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    if (students.length > 0) return;

    students = [

        {
            id:"SE-2026-000001",
            name:"Abdullahi Muhammad",
            age:10,
            gender:"Male",
            class:"PRIMARY4",
            parentName:"Muhammad Musa",
            parentPhone:"08030000001",
            parentEmail:"abdullahi@example.com",
            address:"Bauchi",
            photo:""
        },

        {
            id:"SE-2026-000002",
            name:"Usman Ibrahim",
            age:11,
            gender:"Male",
            class:"PRIMARY4",
            parentName:"Ibrahim Bello",
            parentPhone:"08030000002",
            parentEmail:"usman@example.com",
            address:"Bauchi",
            photo:""
        },

        {
            id:"SE-2026-000003",
            name:"Amina Sani",
            age:10,
            gender:"Female",
            class:"PRIMARY3A",
            parentName:"Sani Adamu",
            parentPhone:"08030000003",
            parentEmail:"amina@example.com",
            address:"Bauchi",
            photo:""
        },

        {
            id:"SE-2026-000004",
            name:"Fatima Yusuf",
            age:12,
            gender:"Female",
            class:"JSS1A",
            parentName:"Yusuf Garba",
            parentPhone:"08030000004",
            parentEmail:"fatima@example.com",
            address:"Bauchi",
            photo:""
        },

        {
            id:"SE-2026-000005",
            name:"Muhammad Bashir",
            age:11,
            gender:"Male",
            class:"PRIMARY4",
            parentName:"Bashir Kabiru",
            parentPhone:"08030000005",
            parentEmail:"muhammad@example.com",
            address:"Bauchi",
            photo:""
        },

        {
            id:"SE-2026-000006",
            name:"Zainab Aliyu",
            age:13,
            gender:"Female",
            class:"JSS2A",
            parentName:"Aliyu Haruna",
            parentPhone:"08030000006",
            parentEmail:"zainab@example.com",
            address:"Bauchi",
            photo:""
        },

        {
            id:"SE-2026-000007",
            name:"Ali Hassan",
            age:14,
            gender:"Male",
            class:"JSS3A",
            parentName:"Hassan Sule",
            parentPhone:"08030000007",
            parentEmail:"ali@example.com",
            address:"Bauchi",
            photo:""
        },

        {
            id:"SE-2026-000008",
            name:"Khadija Abdullahi",
            age:12,
            gender:"Female",
            class:"JSS1B",
            parentName:"Abdullahi Umar",
            parentPhone:"08030000008",
            parentEmail:"khadija@example.com",
            address:"Bauchi",
            photo:""
        },

        {
            id:"SE-2026-000009",
            name:"Sadiq Isma'il",
            age:13,
            gender:"Male",
            class:"JSS2B",
            parentName:"Isma'il Musa",
            parentPhone:"08030000009",
            parentEmail:"sadiq@example.com",
            address:"Bauchi",
            photo:""
        },

        {
            id:"SE-2026-000010",
            name:"Maryam Abubakar",
            age:14,
            gender:"Female",
            class:"JSS3B",
            parentName:"Abubakar Bello",
            parentPhone:"08030000010",
            parentEmail:"maryam@example.com",
            address:"Bauchi",
            photo:""
        },

        {
            id:"SE-2026-000011",
            name:"Ibrahim Yakubu",
            age:15,
            gender:"Male",
            class:"SS1A",
            parentName:"Yakubu Musa",
            parentPhone:"08030000011",
            parentEmail:"ibrahim@example.com",
            address:"Bauchi",
            photo:""
        },

        {
            id:"SE-2026-000012",
            name:"Hauwa Suleiman",
            age:15,
            gender:"Female",
            class:"SS1B",
            parentName:"Suleiman Adamu",
            parentPhone:"08030000012",
            parentEmail:"hauwa@example.com",
            address:"Bauchi",
            photo:""
        }

    ];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));

    localStorage.setItem("lastStudentNumber", 12);

}

/* ==========================================================
   Search Students
========================================================== */

document.getElementById("searchStudent").addEventListener("keyup", function () {

    const search = this.value.toLowerCase();

    const rows = document.querySelectorAll("#studentTable tbody tr");

    rows.forEach(row => {

        row.style.display =
            row.innerText.toLowerCase().includes(search)
            ? ""
            : "none";

    });

});

/* ==========================================================
   Delete Student
========================================================== */

function deleteStudent(id){

    let students = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    students = students.filter(student => student.id !== id);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));

    loadStudents();

}

/* ==========================================================
   Edit Student
   (This will be upgraded later)
========================================================== */

function editStudent(id){

    alert("Edit Student: " + id);

}
 
