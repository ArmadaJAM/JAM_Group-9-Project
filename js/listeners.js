import { logout, showSignup, checkUserLogin } from "./auth.js";
import { loadProducts } from "./product_loading.js";

export function setupEventListeners() {
    document.getElementById("login-btn").addEventListener("click", () => {
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
    });

    document.getElementById("signup-btn").addEventListener("click", () => {
        const signupModal = new bootstrap.Modal(document.getElementById('signupModal'));
        signupModal.show();
    });

    // document.getElementById("signup-btn").addEventListener("click", showSignup);
    document.getElementById("logout-btn").addEventListener("click", logout);

    document.getElementById("loginForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const user = {
            name: document.getElementById("usernameInput").value,
            cart: []
        };

        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            checkUserLogin();
            const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            loginModal.hide();
        }
    });


    document.getElementById("signupForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];
        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            alert("Email already registered. Please use another email.");
            return;
        }

        const newUser = { firstName, lastName, email, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("user", JSON.stringify(newUser));

        checkUserLogin();

        const signupModal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
        signupModal.hide();
    });
}