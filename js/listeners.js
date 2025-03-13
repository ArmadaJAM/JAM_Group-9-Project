import { logout, handleLogin, handleSignup } from "./auth.js";
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
    document.getElementById("loginForm").addEventListener("submit", handleLogin);
    document.getElementById("signupForm").addEventListener("submit", handleSignup);
}