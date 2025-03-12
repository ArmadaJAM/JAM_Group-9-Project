import { logout, showSignup, checkUserLogin } from "./auth.js";
import { loadProducts } from "./product_loading.js";

export function setupEventListeners() {
    document.getElementById("login-btn").addEventListener("click", () => {
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
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
}