import { checkUserLogin } from "./js/auth.js";
import { setupEventListeners } from "./js/listeners.js";
document.addEventListener("DOMContentLoaded", () => {
    checkUserLogin();
    setupEventListeners();

});

