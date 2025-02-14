document.addEventListener("DOMContentLoaded", function () {
    // Check if user is an admin
    const isAdmin = localStorage.getItem("adminLoggedIn");

    // Get the current page URL
    const currentPage = window.location.pathname;

    // If user is NOT an admin and they try to access admin.html, redirect them
    if (!isAdmin && currentPage.includes("admin.html")) {
        alert("Access Denied! Admins only.");
        window.location.href = "/"; // Redirect to homepage or login page
    }
});

document.addEventListener("DOMContentLoaded", function () {
    var form = document.querySelector('form');
    form.addEventListener("submit", function (event) {
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var message = document.getElementById('message').value;

        // Simple validation
        if (name === "" || email === "" || message === "") {
            alert("Please fill in all fields.");
            event.preventDefault(); // Prevent form submission if validation fails
        } else {
            alert("Thank you for your message!");
        }
    });
});
// Check if user is an admin before allowing access

document.addEventListener("DOMContentLoaded", function () {
    var heroSection = document.getElementById("hero");

    // List of background images
    var images = [
        "images/slide1.jpg",
        "images/slide2.jpg",
        "images/slide3.jpg"
    ];

    var index = 0;

    function changeBackground() {
        heroSection.style.backgroundImage = "url('" + images[index] + "')";
        index = (index + 1) % images.length; // Loop back to the first image
    }

    // Set initial background
    changeBackground();

    // Change background every 5 seconds
    setInterval(changeBackground, 5000);
});
document.getElementById("booking-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page refresh

    // Show confirmation message
    document.getElementById("confirmation-message").classList.remove("hidden");

    // Clear form after submission
    setTimeout(() => {
        this.reset();
        document.getElementById("confirmation-message").classList.add("hidden");
    }, 3000);
});
document.addEventListener("DOMContentLoaded", () => {
    const appointments = [
        { name: "John Doe", service: "Surveying", date: "2025-02-15", time: "10:00 AM", status: "Pending" },
        { name: "Jane Smith", service: "Architectural Design", date: "2025-02-16", time: "2:00 PM", status: "Pending" },
    ];

    const tableBody = document.querySelector("#appointments-table tbody");

    function renderAppointments() {
        tableBody.innerHTML = "";
        appointments.forEach((appointment, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${appointment.name}</td>
                <td>${appointment.service}</td>
                <td>${appointment.date}</td>
                <td>${appointment.time}</td>
                <td class="status ${appointment.status.toLowerCase()}">${appointment.status}</td>
                <td>
                    <button class="approve-btn" onclick="updateStatus(${index}, 'Approved')">Approve</button>
                    <button class="reject-btn" onclick="updateStatus(${index}, 'Rejected')">Reject</button>
                </td>
            `;

            tableBody.appendChild(row);
        });
    }

    window.updateStatus = (index, status) => {
        appointments[index].status = status;
        renderAppointments();
    };

    renderAppointments();
});
function checkLogin() {
    const password = document.getElementById("admin-password").value;
    if (password === "admin123") { // Change this to a more secure method later
        document.getElementById("admin-login").style.display = "none";
        document.getElementById("dashboard-content").style.display = "block";
    } else {
        alert("Incorrect Password!");
    }
}

function logout() {
    document.getElementById("admin-login").style.display = "block";
    document.getElementById("dashboard-content").style.display = "none";
}

document.getElementById("booking-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent page refresh

    const appointmentData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        service: document.getElementById("service").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
    };

    const response = await fetch("http://localhost:5000/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentData)
    });

    if (response.ok) {
        alert("✅ Appointment booked successfully!");
        this.reset();
    } else {
        alert("❌ Error booking appointment. Try again.");
    }
});
async function fetchAppointments() {
    const response = await fetch("http://localhost:5000/appointments");
    const appointments = await response.json();
    const tableBody = document.querySelector("#appointments-table tbody");

    tableBody.innerHTML = "";
    appointments.forEach((appointment) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${appointment.name}</td>
            <td>${appointment.service}</td>
            <td>${appointment.date}</td>
            <td>${appointment.time}</td>
            <td class="status ${appointment.status.toLowerCase()}">${appointment.status}</td>
            <td>
                <button class="approve-btn" onclick="updateStatus('${appointment._id}', 'Approved')">Approve</button>
                <button class="reject-btn" onclick="updateStatus('${appointment._id}', 'Rejected')">Reject</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

async function updateStatus(id, status) {
    const response = await fetch(`http://localhost:5000/appointments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
    });

    if (response.ok) fetchAppointments();
}

fetchAppointments();
fetch("https://https://appointments-lx1a.onrender.com/appointments")
function adminLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("https://your-backend-url.com/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem("adminToken", data.token);
            alert("Login successful!");
            window.location.href = "admin.html"; // Redirect to admin panel
        } else {
            alert("Invalid credentials!");
        }
    })
    .catch(error => console.error("Error:", error));
}

