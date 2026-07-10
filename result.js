 if(localStorage.getItem('loggedIn') !== 'true') {
    window.location.href = 'login.html';
}

function calculateResult() {
    let student = document.getElementById("student").value.trim();
    let ca = Number(document.getElementById("ca").value);
    let exam = Number(document.getElementById("exam").value);
    let resultDiv = document.getElementById("result");

    if(student === "" || isNaN(ca) || isNaN(exam)) {
        resultDiv.style.color = "red";
        resultDiv.innerHTML = "Please fill all fields";
        return;
    }

    let total = ca + exam;
    let grade = total >= 70 ? "A" : total >= 60 ? "B" : total >= 50 ? "C" : total >= 45 ? "D" : total >= 40 ? "E" : "F";

    // Save this result
    localStorage.setItem('lastResult', JSON.stringify({ studentName: student, total: total, grade: grade, ca: ca, exam: exam }));

    resultDiv.style.color = "green";
    resultDiv.innerHTML = "Student: " + student + "<br>Total: " + total + "/100<br>Grade: " + grade;
}

function sendResultToParent() {
    let lastResult = JSON.parse(localStorage.getItem('lastResult'));
    
    if(!lastResult) {
        alert("Please calculate result first");
        return;
    }

    const parents = JSON.parse(localStorage.getItem('parents')) || [];
    const parent = parents.find(p => p.studentName.toLowerCase() === lastResult.studentName.toLowerCase());

    if(!parent) {
        alert("No parent found for " + lastResult.studentName + ". Please add them in Parents page first.");
        return;
    }

    const message = "*SCHOOLEASE RESULT*\n\nStudent: " + lastResult.studentName + "\nCA: " + lastResult.ca + "/40\nExam: " + lastResult.exam + "/60\nTotal: " + lastResult.total + "/100\nGrade: " + lastResult.grade;
    let phone = parent.phone.replace(/\D/g, ''); 
    if(phone.startsWith('0')) { phone = '234' + phone.substring(1); }

    window.open("https://wa.me/" + phone + "?text=" + encodeURIComponent(message), '_blank');
}
