document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form reload

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "admin123") {
        localStorage.setItem("adminToken", "true"); // Store session
        window.location.href = "admin.html"; // Redirect to admin dashboard
    } else {
        alert("Invalid Credentials! Try again.");
    }
});
