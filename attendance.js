alert("attendance.js loaded");
/* ==========================================================
   SCHOOLEASE ATTENDANCE MANAGEMENT SYSTEM
   ----------------------------------------------------------
   PART 1
   - Login Check
   - Display Current Date
   - Load Students
   - Display Passport
   - Filter By Class
========================================================== */

// ==========================================================
// Login Check
// ==========================================================

if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}

// ==========================================================
// Current Date
// ==========================================================

const today = new Date();

document.getElementById("currentDate").textContent =
today.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
});

// ==========================================================
// Attendance Records
// ==========================================================

let attendanceRecords = [];

// ==========================================================
// Load Students Button
// ==========================================================

document.getElementById("loadBtn")
.addEventListener("click", loadStudents);

// ==========================================================
// Load Students
// ==========================================================

function loadStudents() {

    const className =
    document.getElementById("classSelect").value;

    if (className === "") {

        alert("Please select a class.");

        return;

    }

    // Read Registered Students

    let students =
    JSON.parse(
        localStorage.getItem("schoolEaseStudents")
    ) || [];

    // Filter by Class

    students =
    students.filter(student =>
        student.class === className
    );

    const table =
    document.getElementById("studentTable");

    table.innerHTML = "";

    attendanceRecords = [];

    students.forEach(student => {

        const row =
        document.createElement("tr");

        row.innerHTML = `

        <td>

        ${
            student.photo

            ?

            `<img
                src="${student.photo}"
                width="45"
                height="45"
                style="
                border-radius:50%;
                object-fit:cover;
                border:2px solid #198754;
                ">`

            :

            `<div style="
                width:45px;
                height:45px;
                border-radius:50%;
                background:#ddd;
                display:flex;
                align-items:center;
                justify-content:center;
                font-size:20px;">
                👤
            </div>`
        }

        </td>

        <td>${student.id}</td>

        <td>${student.name}</td>

        <td>${student.class}</td>

        <td>${today.toLocaleDateString()}</td>

        <td id="time-${student.id}">
        --
        </td>

        <td>

        <select
        onchange="updateStatus('${student.id}',this.value)">

        <option value="">Select</option>

        <option value="Present">
        Present
        </option>

        <option value="Late">
        Late
        </option>

        <option value="Absent">
        Absent
        </option>

        </select>

        </td>

        `;

        table.appendChild(row);

    });

    updateSummary();

}/* ==========================================================
   UPDATE ATTENDANCE STATUS
========================================================== */

function updateStatus(id, status) {

    const now = new Date();

    const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    const timeCell = document.getElementById("time-" + id);

    if (status === "Present" || status === "Late") {

        timeCell.textContent = time;

    } else {

        timeCell.textContent = "--";

    }

    const existingRecord = attendanceRecords.find(record => record.id === id);

    if (existingRecord) {

        existingRecord.status = status;
        existingRecord.time = status === "Absent" ? "--" : time;

    } else {

        attendanceRecords.push({

            id: id,
            status: status,
            time: status === "Absent" ? "--" : time,
            date: today.toLocaleDateString()

        });

    }

    updateSummary();

}

/* ==========================================================
   UPDATE SUMMARY CARDS
========================================================== */

function updateSummary() {

    let present = 0;
    let late = 0;
    let absent = 0;

    attendanceRecords.forEach(record => {

        if (record.status === "Present") {

            present++;

        } else if (record.status === "Late") {

            late++;

        } else if (record.status === "Absent") {

            absent++;

        }

    });

    document.getElementById("totalStudents").textContent =
        document.getElementById("studentTable").rows.length;

    document.getElementById("presentCount").textContent = present;

    document.getElementById("lateCount").textContent = late;

    document.getElementById("absentCount").textContent = absent;

}

/* ==========================================================
   SAVE ATTENDANCE
========================================================== */

document.getElementById("saveAttendance")
.addEventListener("click", saveAttendance);

function saveAttendance() {

    localStorage.setItem(
        "attendanceRecords",
        JSON.stringify(attendanceRecords)
    );

    alert("Attendance saved successfully.");

}

/* ==========================================================
   PRINT ATTENDANCE
========================================================== */

document.getElementById("printAttendance")
.addEventListener("click", function () {

    window.print();

});

/* ==========================================================
   AUTO LOAD SUMMARY
========================================================== */

updateSummary();
