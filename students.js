function registerStudent(){

    const student={

        id:document.getElementById("studentId").value.trim(),

        name:document.getElementById("studentName").value.trim(),

        age:document.getElementById("studentAge").value,

        gender:document.getElementById("studentGender").value,

        class:document.getElementById("studentClass").value.trim(),

        dateRegistered:new Date().toLocaleDateString(),

        attendance:[]

    };

    if(student.id==="" || student.name===""){

        document.getElementById("message").innerHTML="❌ Student ID and Name are required.";

        document.getElementById("message").style.color="red";

        return;

    }

    if(students.some(s=>s.id===student.id)){

        document.getElementById("message").innerHTML="❌ Student ID already exists.";

        document.getElementById("message").style.color="red";

        return;

    }

    students.push(student);

    localStorage.setItem("students",JSON.stringify(students));

    document.getElementById("message").innerHTML="✅ Student Registered Successfully!";

    document.getElementById("message").style.color="green";

    showAllStudents();

    document.getElementById("studentId").value="";
    document.getElementById("studentName").value="";
    document.getElementById("studentAge").value="";
    document.getElementById("studentGender").value="";
    document.getElementById("studentClass").value="";

} 
