export function checkUserLogin() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        document.getElementById("auth-buttons").classList.add("d-none");
        document.getElementById("user-info").classList.remove("d-none");
        document.getElementById("username").innerText = user.name;
    }
}

export function logout() {
    localStorage.removeItem("user");
    document.getElementById("auth-buttons").classList.remove("d-none");
    document.getElementById("user-info").classList.add("d-none");
    
}

export function handleLogin(event) {
    event.preventDefault();
    const user = {
        name: document.getElementById("usernameInput").value,
        cart: []
    };
    localStorage.setItem("user", JSON.stringify(user));
    checkUserLogin();
    const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    loginModal.hide();
}

export function showSignup() {
    let user = prompt("Enter new username:");
    if (user) {
        localStorage.setItem("user", user);
        checkUserLogin();
    }
}
