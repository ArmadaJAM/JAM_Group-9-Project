document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("shoes")) {
        localStorage.setItem("shoes", JSON.stringify(shoes));
    }
    loadProducts();
    checkUserLogin();
    setupEventListeners();
    setupCategoryFilters();

});

const shoes = [
    {
        id: 1,
        name: "New Balance 530 Unisex Sneakers Shoes - White/Mauve",
        price: 3147.00,
        originalPrice: 6295.00,
        img: "/PageDetails/img/newbalance1.webp",
        category: "Sneakers",
        description: "The original MR530 combined turn-of-the-millennium aesthetics with the reliability of a high-mileage running shoe. The reintroduced 530 applies a contemporary, everyday style outlook to this performance-minded design.",
        productCode: "0803-NEWMRS530SGC",
        ratings: "⭐⭐⭐⭐⭐ 36 Ratings",
        sizes: ["US 8", "US 9", "US 10", "US 11"],
        imageset: [
            "/PageDetails/img/newbalance1.webp",
            "/PageDetails/img/newbalance3.webp",
            "/PageDetails/img/newbalance4.webp",
            "/PageDetails/img/newbalance6.webp",
            "/PageDetails/img/newbalance2.webp",
        ]
    },
    {
        id: 2,
        name: "Nike Air Force 1 Low - White",
        price: 4495.00,
        originalPrice: 4995.00,
        img: "img/nike_air_force_1.jpg",
        category: "Casual Sneakers",
        description: "The classic Air Force 1 Low offers timeless style with premium leather and a cushioned sole for all-day comfort.",
        productCode: "315122-111",
        ratings: "⭐⭐⭐⭐⭐ 120 Ratings",
        sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
        imageset: [
            "/PageDetails/img/newbalance1.webp",
            "/PageDetails/img/newbalance2.webp",
            "/PageDetails/img/newbalance3.webp",
            "/PageDetails/img/newbalance4.webp",
            "/PageDetails/img/newbalance6.webp"
        ]
    },
    {
        id: 3,
        name: "Adidas Ultraboost 21 - Core Black",
        price: 7500.00,
        originalPrice: 9000.00,
        img: "img/adidas_ultraboost_21.jpg",
        category: "Running Shoes",
        description: "Built for high-performance running, the Adidas Ultraboost 21 features responsive Boost cushioning and a Primeknit upper for a snug fit.",
        productCode: "FY0377",
        ratings: "⭐⭐⭐⭐⭐ 200 Ratings",
        sizes: ["US 6", "US 7", "US 8", "US 9", "US 10"],
        imageset: [
            "/PageDetails/img/newbalance1.webp",
            "/PageDetails/img/newbalance2.webp",
            "/PageDetails/img/newbalance3.webp",
            "/PageDetails/img/newbalance4.webp",
            "/PageDetails/img/newbalance6.webp"
        ]
    },
    {
        id: 4,
        name: "Puma RS-X3 Puzzle - Multicolor",
        price: 4200.00,
        originalPrice: 6200.00,
        img: "img/puma_rs_x3.jpg",
        category: "Lifestyle Sneakers",
        description: "A bold and modern sneaker with a mix of mesh and leather, the Puma RS-X3 Puzzle brings retro-futuristic design to your feet.",
        productCode: "372884-02",
        ratings: "⭐⭐⭐⭐ 85 Ratings",
        sizes: ["US 8", "US 9", "US 10", "US 11"],
        imageset: [
            "/PageDetails/img/newbalance1.webp",
            "/PageDetails/img/newbalance2.webp",
            "/PageDetails/img/newbalance3.webp",
            "/PageDetails/img/newbalance4.webp",
            "/PageDetails/img/newbalance6.webp"
        ]
    },
    {
        id: 5,
        name: "Vans Old Skool - Black/White",
        price: 3200.00,
        originalPrice: 4000.00,
        img: "img/vans_old_skool.jpg",
        category: "Skate Shoes",
        description: "A classic skate shoe with a durable canvas and suede upper, featuring the signature Vans side stripe and waffle outsole for grip.",
        productCode: "VN000D3HY28",
        ratings: "⭐⭐⭐⭐⭐ 95 Ratings",
        sizes: ["US 6", "US 7", "US 8", "US 9", "US 10", "US 11"],
        imageset: [
            "/PageDetails/img/newbalance1.webp",
            "/PageDetails/img/newbalance2.webp",
            "/PageDetails/img/newbalance3.webp",
            "/PageDetails/img/newbalance4.webp",
            "/PageDetails/img/newbalance6.webp"
        ]
    }
];

function loadProducts(category = "All Shoes") {
    const productList = document.getElementById("product-list");
    let storedShoes = JSON.parse(localStorage.getItem("shoes")) || []; // Get stored shoes
    let filteredShoes = category === "All Shoes" ? storedShoes : storedShoes.filter(shoe => shoe.category === category);
    let activeCategory = document.getElementById("filtered-category");
    
    productList.innerHTML = "";
    filteredShoes.forEach(shoe => {
        let shoeCard = document.createElement("li");
        shoeCard.classList.add("col-lg-4", "col-md-6", "col-sm-12", "mb-4");
        shoeCard.innerHTML = `
                <a href="../PageDetails/prod_det.html?id=${shoe.id}" class="product-card"> 
                    <div class="shoe-image-container">
                        <img class="img-fluid w-100" src="${shoe.img}" alt="${shoe.name}" >
                    </div>
                    <div class="d-flex align-items-center justify-content-between py-3 gap-2">
                        <div class="shoe-name-container"> 
                            <h6>${shoe.name}</h6>
                        </div>
                        <div class="shoe-price-container">
                            <p>$${shoe.price}</p>
                        </div>
                    </div>
                </a>
        `;
        productList.appendChild(shoeCard);
    });

    activeCategory.innerText = category;
}


document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".product-card").forEach(link => {
        link.style.color = "inherit";
        link.style.textDecoration = "none";
    });
});

function setupCategoryFilters() {
    document.querySelectorAll(".category-item").forEach(categoryItem => {
        categoryItem.addEventListener("click", (event) => {
            document.querySelectorAll(".category-item").forEach(item => item.classList.remove("active"));
            event.target.classList.add("active");
            loadProducts(event.target.innerText);
        });
    });
}

function setupEventListeners() {
    document.getElementById("login-btn").addEventListener("click", showLogin);
    document.getElementById("signup-btn").addEventListener("click", showSignup);
    document.getElementById("logout-btn").addEventListener("click", logout);
}

function showLogin() {
    let user = prompt("Enter username:");
    if (user) {
        localStorage.setItem("user", user);
        checkUserLogin();
    }
}

function showSignup() {
    let user = prompt("Enter new username:");
    if (user) {
        localStorage.setItem("user", user);
        checkUserLogin();
    }
}

function checkUserLogin() {
    let user = localStorage.getItem("user");
    if (user) {
        document.getElementById("auth-buttons").classList.add("d-none");
        document.getElementById("user-info").classList.remove("d-none");
        document.getElementById("username").innerText = user;
    }
}

function logout() {
    localStorage.removeItem("user");
    document.getElementById("auth-buttons").classList.remove("d-none");
    document.getElementById("user-info").classList.add("d-none");
}


// Passing the Product ID as the user clicks the product to view the details
document.querySelectorAll(".product-card").forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        const productId = this.getAttribute("href").split("=")[1];
        localStorage.setItem("selectedProduct", productId);
        window.location.href = "prod_det.html";
    });
});
