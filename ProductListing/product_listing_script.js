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
        ]
    },
    {
        id: 2,
        name: "Nike Air Force 1 Low - White",
        price: 4495.00,
        originalPrice: 4995.00,
        img: "/PageDetails/img/nikeairforce1.png",
        category: "Casual Sneakers",
        description: "The classic Air Force 1 Low offers timeless style with premium leather and a cushioned sole for all-day comfort.",
        productCode: "315122-111",
        ratings: "⭐⭐⭐⭐⭐ 120 Ratings",
        sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
        imageset: [
            "/PageDetails/img/nikeairforce1.png",
            "/PageDetails/img/nikeairforce2.png",
            "/PageDetails/img/nikeairforce3.png",
            "/PageDetails/img/nikeairforce4.png",
        ]
    },
    {
        id: 3,
        name: "Adidas Ultraboost 21 - Core Black",
        price: 7500.00,
        originalPrice: 9000.00,
        img: "/PageDetails/img/adidasultraboost1.webp",
        category: "Running Shoes",
        description: "Built for high-performance running, the Adidas Ultraboost 21 features responsive Boost cushioning and a Primeknit upper for a snug fit.",
        productCode: "FY0377",
        ratings: "⭐⭐⭐⭐⭐ 200 Ratings",
        sizes: ["US 6", "US 7", "US 8", "US 9", "US 10"],
        imageset: [
            "/PageDetails/img/adidasultraboost1.webp",
            "/PageDetails/img/adidasultraboost2.avif",
            "/PageDetails/img/adidasultraboost3.jfif",
            "/PageDetails/img/adidasultraboost4.jfif",
        ]
    },
    {
        id: 4,
        name: "Puma RS-X3 Puzzle - Multicolor",
        price: 4200.00,
        originalPrice: 6200.00,
        img: "/PageDetails/img/pumars1.jpg",
        category: "Lifestyle Sneakers",
        description: "A bold and modern sneaker with a mix of mesh and leather, the Puma RS-X3 Puzzle brings retro-futuristic design to your feet.",
        productCode: "372884-02",
        ratings: "⭐⭐⭐⭐ 85 Ratings",
        sizes: ["US 8", "US 9", "US 10", "US 11"],
        imageset: [
            "/PageDetails/img/pumars1.jpg",
            "/PageDetails/img/pumars2.jfif",
            "/PageDetails/img/pumars3.png",
            "/PageDetails/img/pumars4.jfif",
        ]
    },
    {
        id: 5,
        name: "Vans Old Skool - Black/White",
        price: 3200.00,
        originalPrice: 4000.00,
        img: "/PageDetails/img/vansoldskool1.jpg",
        category: "Skate Shoes",
        description: "A classic skate shoe with a durable canvas and suede upper, featuring the signature Vans side stripe and waffle outsole for grip.",
        productCode: "VN000D3HY28",
        ratings: "⭐⭐⭐⭐⭐ 95 Ratings",
        sizes: ["US 6", "US 7", "US 8", "US 9", "US 10", "US 11"],
        imageset: [
            "/PageDetails/img/vansoldskool1.jpg",
            "/PageDetails/img/vansoldskool2.jfif",
            "/PageDetails/img/vansoldskool3.jpg",
            "/PageDetails/img/vansoldskool4.jfif",
        ]
    },
    {
        id: 6,
        name: "Clarks Tilden Cap - Black Leather",
        price: 5500.00,
        originalPrice: 7500.00,
        img: "/PageDetails/img/clarks_tilden_cap.jpg",
        category: "Formal Shoes",
        description: "A sophisticated cap-toe Oxford with leather upper, featuring stretch panels for easy wear and an Ortholite footbed for comfort.",
        productCode: "26133222",
        ratings: "⭐⭐⭐⭐⭐ 50 Ratings",
        sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
        imageset: [
            "/PageDetails/img/clarks_tilden1.jpg",
            "/PageDetails/img/clarks_tilden2.jpg",
            "/PageDetails/img/clarks_tilden3.jpg"
        ]
    },
    {
        id: 7,
        name: "Allen Edmonds Park Avenue - Walnut",
        price: 12000.00,
        originalPrice: 15000.00,
        img: "/PageDetails/img/allen_edmonds_park.jpg",
        category: "Formal Shoes",
        description: "A premium leather Oxford dress shoe, handcrafted with a timeless design and Goodyear welt construction for durability.",
        productCode: "5615-000",
        ratings: "⭐⭐⭐⭐⭐ 80 Ratings",
        sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
        imageset: [
            "/PageDetails/img/allen_edmonds1.jpg",
            "/PageDetails/img/allen_edmonds2.jpg",
            "/PageDetails/img/allen_edmonds3.jpg"
        ]
    },
    {
        id: 8,
        name: "ECCO Helsinki Plain Toe Derby - Black",
        price: 7000.00,
        originalPrice: 8500.00,
        img: "/PageDetails/img/ecco_helsinki.jpg",
        category: "Formal Shoes",
        description: "A sleek and comfortable Derby shoe with rich leather construction and ECCO’s signature Comfort Fibre System insole.",
        productCode: "05113401001",
        ratings: "⭐⭐⭐⭐ 65 Ratings",
        sizes: ["US 7", "US 8", "US 9", "US 10"],
        imageset: [
            "/PageDetails/img/ecco_helsinki1.jpg",
            "/PageDetails/img/ecco_helsinki2.jpg",
            "/PageDetails/img/ecco_helsinki3.jpg"
        ]
    },
    // Boots
    {
        id: 9,
        name: "Timberland 6-Inch Premium Waterproof Boots - Wheat",
        price: 8500.00,
        originalPrice: 10000.00,
        img: "/PageDetails/img/timberland_6inch.jpg",
        category: "Boots",
        description: "Iconic and rugged, the Timberland 6-Inch Premium Boot offers waterproof protection and durable leather for long-lasting wear.",
        productCode: "TB010061713",
        ratings: "⭐⭐⭐⭐⭐ 90 Ratings",
        sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
        imageset: [
            "/PageDetails/img/timberland1.jpg",
            "/PageDetails/img/timberland2.jpg",
            "/PageDetails/img/timberland3.jpg"
        ]
    },
    {
        id: 10,
        name: "Dr. Martens 1460 Smooth Leather Boots - Black",
        price: 7800.00,
        originalPrice: 9500.00,
        img: "/PageDetails/img/drmartens_1460.jpg",
        category: "Boots",
        description: "A classic 8-eyelet boot made with smooth leather, air-cushioned sole, and Goodyear welt construction for durability.",
        productCode: "11822006",
        ratings: "⭐⭐⭐⭐⭐ 110 Ratings",
        sizes: ["US 6", "US 7", "US 8", "US 9", "US 10", "US 11"],
        imageset: [
            "/PageDetails/img/drmartens1.jpg",
            "/PageDetails/img/drmartens2.jpg",
            "/PageDetails/img/drmartens3.jpg"
        ]
    },
];

function loadProducts(category = "All Shoes") {
    const productList = document.getElementById("product-list");
    let storedShoes = JSON.parse(localStorage.getItem("shoes")) || [];
    let filteredShoes = category === "All Shoes" ? storedShoes : storedShoes.filter(shoe => shoe.category === category);
    let activeCategory = document.getElementById("filtered-category");

    productList.innerHTML = "";

    filteredShoes.forEach(shoe => {
        let shoeCard = document.createElement("li");
        shoeCard.classList.add("col-lg-4", "col-md-6", "col-sm-12", "mb-4");

        let link = document.createElement("a");
        link.href = `../PageDetails/prod_det.html?id=${shoe.id}`;
        link.classList.add("product-card");

        let imgContainer = document.createElement("div");
        imgContainer.classList.add("shoe-image-container");

        let img = document.createElement("img");
        img.classList.add("img-fluid", "w-100");
        img.src = shoe.img;
        img.alt = shoe.name;

        imgContainer.appendChild(img);

        let infoContainer = document.createElement("div");
        infoContainer.classList.add("d-flex", "align-items-center", "justify-content-between", "py-3", "gap-2");

        let nameContainer = document.createElement("div");
        nameContainer.classList.add("shoe-name-container");

        let name = document.createElement("h6");
        name.textContent = shoe.name;

        nameContainer.appendChild(name);

        let priceContainer = document.createElement("div");
        priceContainer.classList.add("shoe-price-container");

        let price = document.createElement("p");
        price.textContent = `$${shoe.price}`;

        priceContainer.appendChild(price);

        infoContainer.appendChild(nameContainer);
        infoContainer.appendChild(priceContainer);

        link.appendChild(imgContainer);
        link.appendChild(infoContainer);
        shoeCard.appendChild(link);
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

function checkUserLogin() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        document.getElementById("auth-buttons").classList.add("d-none");
        document.getElementById("user-info").classList.remove("d-none");
        document.getElementById("username").innerText = user.name;
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
