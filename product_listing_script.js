document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    checkUserLogin();
    setupEventListeners();
    setupCategoryFilters();
});

const shoes = [
    { id: 1, name: "Nike Air Max", price: 120, img: "https://i.pinimg.com/474x/96/17/00/961700f5ed426fdcd03061dd1290da08.jpg", category: "Running Shoes" },
    { id: 2, name: "Adidas Ultraboost", price: 150, img: "https://i.pinimg.com/736x/88/6c/26/886c26d87c5fd4e89a8f229b332bc48d.jpg", category: "Running Shoes" },
    { id: 3, name: "Puma RS-X", price: 110, img: "https://w0.peakpx.com/wallpaper/399/564/HD-wallpaper-dog-shoe-footwear-heel-shoe-fun-funny-dog.jpg", category: "Sneakers" },
    { id: 4, name: "New Balance 574", price: 100, img: "https://i.pinimg.com/474x/a0/79/12/a07912fdbcb87a1819b451f9f4c2f9e5.jpg", category: "Sneakers" },
    { id: 5, name: "Clarks Oxford", price: 130, img: "https://m.media-amazon.com/images/I/71Uel2ChJvL.jpg", category: "Formal Shoes" },
    { id: 6, name: "Timberland Boots", price: 180, img: "https://static.boredpanda.com/blog/wp-content/uploads/2018/07/BCfRNzuRcNj-png__700.jpg", category: "Boots" }
];

function loadProducts(category = "All Shoes") {
    const productList = document.getElementById("product-list");
    let filteredShoes = category === "All Shoes" ? shoes : shoes.filter(shoe => shoe.category === category);
    let activeCategory = document.getElementById("filtered-category")
    
    productList.innerHTML = "";
    filteredShoes.forEach(shoe => {
        let shoeCard = document.createElement("li");
        shoeCard.classList.add("col-lg-4", "col-md-6", "col-sm-12", "mb-4");
        shoeCard.innerHTML = `
                <a href="product-details.html?id=${shoe.id}" class="product-card"> 
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
