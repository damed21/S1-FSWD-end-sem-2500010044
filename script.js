const API_URL = "http://localhost:5000/api";


// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const email =
            document.getElementById("email").value;

        const password =
            document.getElementById("password").value;


        try {

            const response = await fetch(
                `${API_URL}/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                document.getElementById("message").innerText =
                    data.message;

                return;

            }


            localStorage.setItem(
                "token",
                data.token
            );


            localStorage.setItem(
                "studentName",
                data.user.name
            );


            window.location.href =
                "dashboard.html";


        } catch (error) {

            document.getElementById("message").innerText =
                "Server error";

        }

    });

}


// DASHBOARD

if (window.location.pathname.includes("dashboard.html")) {

    loadStudent();

}


async function loadStudent() {

    const token =
        localStorage.getItem("token");


    if (!token) {

        window.location.href = "index.html";

        return;

    }


    try {

        const response = await fetch(
            `${API_URL}/students/my-profile`,
            {
                headers: {
                    "Authorization":
                        `Bearer ${token}`
                }
            }
        );


        const student =
            await response.json();


        if (!response.ok) {

            alert(student.message);

            return;

        }


        document.getElementById("studentName")
            .innerText = student.name;

        document.getElementById("studentId")
            .innerText = student.studentId;

        document.getElementById("studentEmail")
            .innerText = student.email;

        document.getElementById("studentPhone")
            .innerText = student.phone;

        document.getElementById("department")
            .innerText = student.department;

        document.getElementById("year")
            .innerText = student.year;

        document.getElementById("semester")
            .innerText = student.semester;

        document.getElementById("cgpa")
            .innerText = student.cgpa;


        const table =
            document.getElementById("coursesTable");


        student.courses.forEach(course => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>${course.name}</td>

                <td>${course.marks}</td>

                <td>${course.attendance}%</td>

            `;


            table.appendChild(row);

        });


    } catch (error) {

        console.log(error);

    }

}


// LOGOUT

function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("studentName");

    window.location.href =
        "index.html";

}