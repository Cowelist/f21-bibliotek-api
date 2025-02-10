import config from "./config.js";
console.log("Blir kalt på")
document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent form from reloading the page

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(`${config.API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }) // Send username & password as JSON
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById("message").innerText = "Logget inn!";
            localStorage.setItem("token", data.token); // Store JWT token
            localStorage.setItem("role", data.role);   // Store user role
            setTimeout(() => { window.location.href = "dashboard.html"; }, 1000);
        } else {
            document.getElementById("message").innerText = "Fungerte ikke " + data.error;
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("message").innerText = "Server Error";
    }
});