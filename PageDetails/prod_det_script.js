var selectedShoe = 0;

document.addEventListener("DOMContentLoaded", () => {
    checkUserLogin();
    setupEventListeners();
    getSelectedProduct();
    if (selectedShoe) {
        initializeProductPage();
    }
});

function setupEventListeners() {
    document.getElementById("login-btn").addEventListener("click", () => {
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
    });
    document.getElementById("signup-btn").addEventListener("click", showSignup);
    document.getElementById("logout-btn").addEventListener("click", logout);
    /* Added login form */
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
        document.getElementById("username").innerText = JSON.parse(user).name;
    }
}

function logout() {
    localStorage.removeItem("user");
    document.getElementById("auth-buttons").classList.remove("d-none");
    document.getElementById("user-info").classList.add("d-none");
}

function getSelectedProduct() {
    let storedShoes = JSON.parse(localStorage.getItem("shoes")) || [];
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get("id"));
    console.log(productId);

    if (!productId) {
        console.error("Product ID not found in URL.");
        return;
    }

    selectedShoe = storedShoes.find(shoe => shoe.id === productId);

    console.log("This is selected shoe " + selectedShoe.id)
    if (!selectedShoe) {
        console.error("Selected shoe is undefined.");
        return;
    }

    displayProductDetails(selectedShoe.id);
}


function displayProductDetails(id) {
    let storedShoes = JSON.parse(localStorage.getItem("shoes")) || [];
    const product = storedShoes.find(shoe => shoe.id == id);

    const header = document.querySelector(".product-details header");
    const section = document.querySelector(".product-details section");

    // Clear previous content
    header.innerHTML = "";
    section.innerHTML = "";

    if (product) {
        // Create header elements
        const title = document.createElement("h2");
        title.textContent = product.name;

        const productCode = document.createElement("p");
        productCode.textContent = `Product Code: ${product.productCode}`;

        const ratings = document.createElement("p");
        ratings.textContent = product.ratings;

        const price = document.createElement("p");
        const strongPrice = document.createElement("strong");
        strongPrice.textContent = `₱${product.price.toFixed(2)}`;
        const delPrice = document.createElement("del");
        delPrice.textContent = ` ₱${product.originalPrice.toFixed(2)}`;

        price.appendChild(strongPrice);
        price.appendChild(delPrice);

        // Append header elements
        header.appendChild(title);
        header.appendChild(productCode);
        header.appendChild(ratings);
        header.appendChild(price);

        // Create section elements
        const description = document.createElement("p");
        description.textContent = product.description;

        // Size dropdown
        const sizeGroup = document.createElement("div");
        sizeGroup.classList.add("form-group");

        const sizeLabel = document.createElement("label");
        sizeLabel.setAttribute("for", "size");
        sizeLabel.textContent = "Size";

        const sizeSelect = document.createElement("select");
        sizeSelect.classList.add("form-control");
        sizeSelect.id = "size";

        product.sizes.forEach(size => {
            const option = document.createElement("option");
            option.textContent = size;
            sizeSelect.appendChild(option);
        });

        sizeGroup.appendChild(sizeLabel);
        sizeGroup.appendChild(sizeSelect);

        // Quantity input
        const quantityGroup = document.createElement("div");
        quantityGroup.classList.add("form-group");

        const quantityLabel = document.createElement("label");
        quantityLabel.setAttribute("for", "quantity");
        quantityLabel.textContent = "Quantity";

        const quantityInput = document.createElement("input");
        quantityInput.classList.add("form-control");
        quantityInput.id = "quantity";
        quantityInput.type = "number";
        quantityInput.value = 1;

        quantityGroup.appendChild(quantityLabel);
        quantityGroup.appendChild(quantityInput);

        // Buttons
        const buyNowBtn = document.createElement("button");
        buyNowBtn.classList.add("btn", "btn-primary");
        buyNowBtn.textContent = "Buy Now";
        buyNowBtn.onclick = () => buyNow();

        const addToCartBtn = document.createElement("button");
        addToCartBtn.classList.add("btn", "btn-secondary");
        addToCartBtn.textContent = "Add to Cart";
        addToCartBtn.onclick = () => addToCart();

        // Share link
        const shareLink = document.createElement("a");
        shareLink.href = "#";
        shareLink.classList.add("d-block", "mt-3");
        shareLink.textContent = "Share";

        // Append section elements
        section.appendChild(description);
        section.appendChild(sizeGroup);
        section.appendChild(quantityGroup);
        section.appendChild(buyNowBtn);
        section.appendChild(addToCartBtn);
        section.appendChild(shareLink);
    } else {
        const notFound = document.createElement("p");
        notFound.textContent = "Product not found.";
        header.appendChild(notFound);
    }
}







// Function to handle adding product to cart
function addToCart() {
    let currentUser = JSON.parse(localStorage.getItem("user"));
    
    if (!currentUser) {
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
        return;
    }

    const quantity = parseInt(document.getElementById('quantity').value);
    const price = selectedShoe.price;
    const totalAmount = price * quantity;

    let newItem = {
        id: selectedShoe.id,
        name: selectedShoe.name,
        img: selectedShoe.img,
        price: price,
        quantity: quantity,
        totalAmount: totalAmount
    };

    let existingItemIndex = currentUser.cart.findIndex(item => item.id === newItem.id);

    if (existingItemIndex !== -1) {
        // Update existing item
        currentUser.cart[existingItemIndex].quantity += newItem.quantity;
        currentUser.cart[existingItemIndex].totalAmount += newItem.totalAmount;
    } else {
        // Add new item to cart
        currentUser.cart.push(newItem);
    }

    localStorage.setItem("user", JSON.stringify(currentUser));
    alert("Item added to cart successfully!");
}

// Function to handle buying now
function buyNow() {
    console.log(!localStorage.getItem("user"));
    if (!localStorage.getItem("user")) {
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
        return;
    }
    else {
        const size = document.getElementById("size").value;
        const quantity = document.getElementById("quantity").value;
        alert(`You are buying ${quantity}x size ${size}!`);

    }
}

// Function to change the main product image
function changeImage(thumbnail) {
    const mainProductImage = document.getElementById('mainProductImage');
    mainProductImage.src = thumbnail.src;
}

// const mainProductImage = document.getElementById('mainProductImage');
// mainProductImage.src = selectedShoe.imageset[0];

// Function to initialize the product details page
function initializeProductPage() {
    if (!selectedShoe) {
        console.error("Selected shoe is undefined.");
        document.getElementById("product-details").innerHTML = "<p>Product not found.</p>";
        return;
    }

    const mainProductImage = document.getElementById('mainProductImage');
    mainProductImage.src = selectedShoe.imageset[0];

    const thumbnailContainer = document.getElementById('thumbnailContainer');
    thumbnailContainer.innerHTML = ""; // Clear previous thumbnails

    selectedShoe.imageset.forEach((imageSrc) => {
        const figure = document.createElement('figure');
        figure.className = 'col-3';
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = 'Thumbnail Image';
        img.className = 'thumbnail-image img-fluid rounded';
        img.onclick = () => changeImage(img);
        figure.appendChild(img);
        thumbnailContainer.appendChild(figure);
    });


    const similarItemsContainer = document.getElementById('similarItemsContainer');
    similarItemsContainer.innerHTML = ""; // Clear previous items

    selectedShoe.imageset.forEach((imageSrc) => {
        const col = document.createElement('div');
        col.className = 'col-6 col-md-2';
        const figure = document.createElement('figure');
        figure.className = 'figure';
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = 'Similar Item';
        img.className = 'figure-img img-fluid rounded zoom';
        const figcaption = document.createElement('figcaption');
        figcaption.className = 'figure-caption';
        figcaption.innerHTML = "";

        const namePara = document.createElement("p");
        namePara.textContent = selectedShoe.name;

        const ratingsPara = document.createElement("p");
        ratingsPara.textContent = selectedShoe.ratings;

        const pricePara = document.createElement("p");
        pricePara.textContent = `$${selectedShoe.price.toFixed(2)}`;

        figcaption.appendChild(namePara);
        figcaption.appendChild(ratingsPara);
        figcaption.appendChild(pricePara);
        figure.appendChild(img);
        figure.appendChild(figcaption);
        col.appendChild(figure);
        similarItemsContainer.appendChild(col);
    });
}

