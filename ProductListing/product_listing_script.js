import { shoes } from "../js/productData.js";
import { setupEventListeners } from "../js/listeners.js";
import { checkUserLogin } from "../js/auth.js";
import { loadProducts } from "../js/product_loading.js";

document.addEventListener("DOMContentLoaded", () => {
    // Store shoe data in localStorage if not already present
    if (!localStorage.getItem("shoes")) {
        localStorage.setItem("shoes", JSON.stringify(shoes));
    
    }

    loadProducts();
    setupEventListeners();
    setupCategoryFilters();
    checkUserLogin();
    initializeProductPage();
    setupSearchFunctionality();

    // Ensure product card links have consistent styling
    document.querySelectorAll(".product-card").forEach(link => {
        link.style.color = "inherit";
        link.style.textDecoration = "none";
    });

    // Attach click event to product cards to pass Product ID
    document.querySelectorAll(".product-card").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const productId = this.getAttribute("href").split("=")[1];
            localStorage.setItem("selectedProduct", productId);
            window.location.href = `/PageDetails/prod_det.html?id=${productId}`;
        });
    });
});

function setupCategoryFilters() {
    document.querySelectorAll(".category-item").forEach(categoryItem => {
        categoryItem.addEventListener("click", (event) => {
            // Remove active class from all categories
            document.querySelectorAll(".category-item").forEach(item => item.classList.remove("active"));
            
            // Add active class to the clicked category
            event.target.classList.add("active");

            // Load products based on selected category
            loadProducts(event.target.innerText);
        });
    });
}


// Function of search 
function setupSearchFunctionality() {
    const searchInput = document.getElementById('search');
    const searchButton = document.getElementById('search-button');

    function performSearch() {
        const query = searchInput.value.toLowerCase();
        const products = document.querySelectorAll('.product-card');
        products.forEach(product => {
            const name = product.querySelector('h6').innerText.toLowerCase();
            if (name.includes(query)) {
                product.closest('li').style.display = 'block';
            } else {
                product.closest('li').style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', performSearch);
    searchButton.addEventListener('click', performSearch);
}


function initializeProductPage() {
    loadProducts();
    checkUserLogin();
    setupEventListeners();
    setupCategoryFilters();
}
