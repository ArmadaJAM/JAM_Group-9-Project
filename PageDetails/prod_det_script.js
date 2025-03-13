import { checkUserLogin, logout, handleLogin } from "../js/auth.js";
import { getSelectedProduct, selectedShoe, displayProductDetails } from "../js/product_loading.js";
import { setupEventListeners } from "../js/listeners.js";
import { updateCartNum } from "../js/cart_management.js";
document.addEventListener("DOMContentLoaded", () => {
    checkUserLogin();
    setupEventListeners();
    getSelectedProduct();
    updateCartNum();
});

// function setupEventListeners() {
//     document.getElementById("login-btn").addEventListener("click", () => {
//         const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
//         loginModal.show();
//     });

//     // document.getElementById("signup-btn").addEventListener("click", showSignup);
//     document.getElementById("logout-btn").addEventListener("click", logout);

//     document.getElementById("loginForm").addEventListener("submit", handleLogin);
// }
