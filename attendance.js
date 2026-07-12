// Check login
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}

// Display today's date
const today = new Date();
document.getElementById("currentDate").textContent =
today.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
});

let attendanceRecords = [];

// Load students
document.getElementById("loadBtn").addEventListener("click", loadStudents);

function loadStudents() {

    const className = document.getElementById("classSelect").value;

    if (className === "") {
        alert("Please select a class.");
        return;
    }

    let students = JSON.parse(localStorage.getItem("students")) || [];

    students = students.filter(student => student.class === className);

    const table = document.getElementById("studentTable");

    table.innerHTML = "";

    attendanceRecords = [];

    students.forEach(student => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.class}</td>
            <td>${today.toLocaleDateString()}</td>
            <td id="time-${student.id}">--</td>

            <td>

            <select onchange="updateStatus('${student.id}', this.value)">

                <option value="">Select</option>
                <option value="Present">Present</option>
                <option value="Late">Late</option>
                <option value="Absent">Absent</option>

            </select>

            </td>
        `;

        table.appendChild(row);

    });

    updateSummary();

}

function updateStatus(id, status) {

    const now = new Date();

    const time =
    now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });

    if (status === "Present" || status === "Late") {

        document.getElementById("time-" + id).textContent = time;

    } else {

        document.getElementById("time-" + id).textContent = "--";

    }

    const existing = attendanceRecords.find(r => r.id == id);

    if (existing) {

        existing.status = status;
        existing.time = status === "Absent" ? "--" : time;

    } else {

        attendanceRecords.push({

            id,
            status,
            time: status === "Absent" ? "--" : time

        });

    }

    updateSummary();

}

function updateSummary() {

    let present = 0;
    let late = 0;
    let absent = 0;

    attendanceRecords.forEach(record => {

        if (record.status === "Present") present++;

        if (record.status === "Late") late++;

        if (record.status === "Absent") absent++;

    });

    document.getElementById("presentCount").textContent = present;
    document.getElementById("lateCount").textContent = late;
    document.getElementById("absentCount").textContent = absent;

    document.getElementById("totalStudents").textContent =
    document.getElementById("studentTable").rows.length;

}

// Save Attendance

document.getElementById("saveAttendance").addEventListener("click", function () {

    localStorage.setItem(
        "attendance",
        JSON.stringify(attendanceRecords)
    );

    alert("Attendance saved successfully.");

});

// Print

document.getElementById("printAttendance").addEventListener("click", function () {

    window.print();

}); 
