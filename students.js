 if(localStorage.getItem('loggedIn') !== 'true') {
    window.location.href = 'login.html'; // if not logged in, kick to login
}
 // 1. Load existing students or start empty
let students = JSON.parse(localStorage.getItem('students')) || [];

// 2. Register new student
function registerStudent() {
    let student = {
        id: document.getElementById('studentId').value,
        name: document.getElementById('studentName').value,
        age: document.getElementById('studentAge').value,
        gender: document.getElementById('studentGender').value,
        class: document.getElementById('studentClass').value
    }

    if(student.name === "" || student.id === "") {
        document.getElementById('message').innerHTML = "❌ Please fill Student ID and Name";
        document.getElementById('message').style.color = "red";
        return;
    }

    // Check for duplicate ID
    if(students.some(s => s.id === student.id)) {
        document.getElementById('message').innerHTML = "❌ Student ID already exists";
        document.getElementById('message').style.color = "red";
        return;
    }

    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));

    // Show success message
    document.getElementById('message').innerHTML = "✅ Student Registered Successfully!";
    document.getElementById('message').style.color = "green";
    setTimeout(() => document.getElementById('message').innerHTML = "", 2000);
    
    // Clear form
    document.getElementById('studentId').value = "";
    document.getElementById('studentName').value = "";
    document.getElementById('studentAge').value = "";
    document.getElementById('studentGender').value = "";
    document.getElementById('studentClass').value = "";

    showAllStudents(); // refresh table
}

// 3. Show all students in table + Delete button
function showAllStudents() {
    let table = document.getElementById('studentTable');

    table.innerHTML = `
        <tr>
            <th>ID</th><th>Name</th><th>Age</th><th>Gender</th><th>Class</th><th>Action</th>
        </tr>
    `;

    students.forEach((student, index) => {
        table.innerHTML += `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.gender}</td>
            <td>${student.class}</td>
            <td><button onclick="deleteStudent(${index})" style="background:red; color:white;">Delete</button></td>
        </tr>
        `;
    });
}

// 4. Delete student
function deleteStudent(index) {
    if(confirm("Delete this student?")) {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        showAllStudents();
    }
}

// Run when page loads
window.onload = showAllStudents;
