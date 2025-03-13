import { updateCartNum } from "./cart_management.js";

export function checkUserLogin() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        document.getElementById("auth-buttons").classList.add("d-none");
        document.getElementById("user-info").classList.remove("d-none");
        document.getElementById("username").innerText = `${user.firstName} ${user.lastName}`;
        updateCartNum();
    }
}

export function logout() {
    const logoutModal = new bootstrap.Modal(document.getElementById('logoutConfirmModal'));
    logoutModal.show();

    document.getElementById("confirmLogoutBtn").addEventListener("click", function () {
        localStorage.removeItem("user");
        document.getElementById("auth-buttons").classList.remove("d-none");
        document.getElementById("user-info").classList.add("d-none");

        if (!JSON.parse(localStorage.getItem("user"))) {
            updateCartNum();
        }

        // Close the modal after logout
        logoutModal.hide();
    });
}


// Function to handle user login
export function handleLogin(event) {
    event.preventDefault();

    const emailInput = document.getElementById("usernameInput");
    const passwordInput = document.getElementById("passInput");

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(user => user.email.toLowerCase() === email.toLowerCase() && user.password === password);

    if (!existingUser) {
        alert("Invalid email or password. Please try again.");
        return;
    }

    if (!existingUser.cart) {
        existingUser.cart = [];
    }

    localStorage.setItem("user", JSON.stringify(existingUser));
    checkUserLogin();

    emailInput.value = "";
    passwordInput.value = "";

    const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    if (loginModal) {
        loginModal.hide();
    }

    document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.remove());

    if (!document.querySelector('.modal.show')) {
        document.body.style.overflow = "";
    }
}

// Function to handle user signup
export function handleSignup(event) {
    event.preventDefault();

    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const emailInput = document.getElementById("SUusernameInput");
    const passwordInput = document.getElementById("SUpassInput");
    const confirmPasswordInput = document.getElementById("confirmPassword");

    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());

    if (existingUser) {
        alert("Email already registered. Please use another email.");
        return;
    }

    const newUser = { firstName, lastName, email, password, cart: [] };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("user", JSON.stringify(newUser));
    checkUserLogin();

    firstNameInput.value = "";
    lastNameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
    confirmPasswordInput.value = "";

    const signupModal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
    if (signupModal) {
        signupModal.hide();
    }

    document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.remove());

    if (!document.querySelector('.modal.show')) {
        document.body.style.overflow = "";
    }
}



// export function showSignup() {
//     let user = prompt("Enter new username:");
//     if (user) {
//         localStorage.setItem("user", user);
//         checkUserLogin();
//     }
// }
