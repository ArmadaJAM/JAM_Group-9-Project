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

// const shoes = [
//     {
//         id: 1,
//         name: "New Balance 530 Unisex Sneakers Shoes - White/Mauve",
//         price: 3147.00,
//         originalPrice: 6295.00,
//         img: "PageDetails/img/newbalance1.webp",
//         category: "Sneakers",
//         description: "The original MR530 combined turn-of-the-millennium aesthetics with the reliability of a high-mileage running shoe. The reintroduced 530 applies a contemporary, everyday style outlook to this performance-minded design.",
//         productCode: "0803-NEWMRS530SGC",
//         ratings: "⭐⭐⭐⭐⭐ 36 Ratings",
//         sizes: ["US 8", "US 9", "US 10", "US 11"],
//         imageset: [
//             "img/newbalance1.webp",
//             "img/newbalance2.webp",
//             "img/newbalance3.webp",
//             "img/newbalance4.webp",
//             "img/newbalance6.webp"
//         ]
//     },
//     {
//         id: 2,
//         name: "Nike Air Force 1 Low - White",
//         price: 4495.00,
//         originalPrice: 4995.00,
//         img: "img/nike_air_force_1.jpg",
//         category: "Casual Sneakers",
//         description: "The classic Air Force 1 Low offers timeless style with premium leather and a cushioned sole for all-day comfort.",
//         productCode: "315122-111",
//         ratings: "⭐⭐⭐⭐⭐ 120 Ratings",
//         sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
//         imageset: [
//             "img/newbalance1.webp",
//             "img/newbalance2.webp",
//             "img/newbalance3.webp",
//             "img/newbalance4.webp",
//             "img/newbalance6.webp"
//         ]
//     },
//     {
//         id: 3,
//         name: "Adidas Ultraboost 21 - Core Black",
//         price: 7500.00,
//         originalPrice: 9000.00,
//         img: "img/adidas_ultraboost_21.jpg",
//         category: "Running Shoes",
//         description: "Built for high-performance running, the Adidas Ultraboost 21 features responsive Boost cushioning and a Primeknit upper for a snug fit.",
//         productCode: "FY0377",
//         ratings: "⭐⭐⭐⭐⭐ 200 Ratings",
//         sizes: ["US 6", "US 7", "US 8", "US 9", "US 10"],
//         imageset: [
//             "img/newbalance1.webp",
//             "img/newbalance2.webp",
//             "img/newbalance3.webp",
//             "img/newbalance4.webp",
//             "img/newbalance6.webp"
//         ]
//     },
//     {
//         id: 4,
//         name: "Puma RS-X3 Puzzle - Multicolor",
//         price: 4200.00,
//         originalPrice: 6200.00,
//         img: "img/puma_rs_x3.jpg",
//         category: "Lifestyle Sneakers",
//         description: "A bold and modern sneaker with a mix of mesh and leather, the Puma RS-X3 Puzzle brings retro-futuristic design to your feet.",
//         productCode: "372884-02",
//         ratings: "⭐⭐⭐⭐ 85 Ratings",
//         sizes: ["US 8", "US 9", "US 10", "US 11"],
//         imageset: [
//             "img/newbalance1.webp",
//             "img/newbalance2.webp",
//             "img/newbalance3.webp",
//             "img/newbalance4.webp",
//             "img/newbalance6.webp"
//         ]
//     },
//     {
//         id: 5,
//         name: "Vans Old Skool - Black/White",
//         price: 3200.00,
//         originalPrice: 4000.00,
//         img: "img/vans_old_skool.jpg",
//         category: "Skate Shoes",
//         description: "A classic skate shoe with a durable canvas and suede upper, featuring the signature Vans side stripe and waffle outsole for grip.",
//         productCode: "VN000D3HY28",
//         ratings: "⭐⭐⭐⭐⭐ 95 Ratings",
//         sizes: ["US 6", "US 7", "US 8", "US 9", "US 10", "US 11"],
//         imageset: [
//             "img/newbalance1.webp",
//             "img/newbalance2.webp",
//             "img/newbalance3.webp",
//             "img/newbalance4.webp",
//             "img/newbalance6.webp"
//         ]
//     }
// ];

function displayProductDetails(id) {
    let storedShoes = JSON.parse(localStorage.getItem("shoes")) || []; 
    const product = storedShoes.find(shoe => shoe.id == id);
    if (product) {
        // Update header content
        document.querySelector(".product-details header").innerHTML = `
            <h2>${product.name}</h2>
            <p>Product Code: ${product.productCode}</p>
            <p>${product.ratings}</p>
            <p><strong>₱${product.price.toFixed(2)}</strong> <del>₱${product.originalPrice.toFixed(2)}</del></p>
        `;

        // Update section content
        document.querySelector(".product-details section").innerHTML = `
            <p>${product.description}</p>
            <div class="form-group">
                <label for="size">Size</label>
                <select class="form-control" id="size">
                    ${product.sizes.map(size => `<option>${size}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label for="quantity">Quantity</label>
                <input type="number" class="form-control" id="quantity" value="1">
            </div>
            <button class="btn btn-primary" onclick="buyNow()">Buy Now</button>
            <button class="btn btn-secondary" onclick="addToCart()">Add to Cart</button>
            <a href="#" class="d-block mt-3">Share</a>
        `;
    } else {
        document.querySelector(".product-details header").innerHTML = "<p>Product not found.</p>";
    }
}






// // Get the selected product cliked by the user
// document.addEventListener("DOMContentLoaded", () => {
//     const selectedProductId = localStorage.getItem("selectedProduct");
//     if (selectedProductId) {
//         const product = shoes.find(p => p.id == selectedProductId);
//         if (product) {
//             document.querySelector("h2").innerText = product.name;
//             document.getElementById("mainProductImage").src = product.img;
//         }
//     }
// });

// const thumbnailContainer = document.getElementById("thumbnailContainer");
// productImages.forEach(imgSrc => {
//     const thumb = document.createElement("img");
//     thumb.src = imgSrc;
//     thumb.classList.add("col-3", "img-thumbnail", "m-1");
//     thumb.onclick = () => changeImage(thumb);
//     thumbnailContainer.appendChild(thumb);
// });



// const selectedShoe = shoes.find(shoe => shoe.id === 1);


// Array of image URLs S
// const productImages = [
//     "img/newbalance1.webp",
//     "img/newbalance2.webp",
//     "img/newbalance3.webp",
//     "img/newbalance4.webp",
//     "img/newbalance6.webp"
// ];

// const similarItems = [
//     "img/newbalance1.webp",
//     "img/newbalance1.webp",
//     "img/newbalance1.webp",
//     "img/newbalance1.webp",
//     "img/newbalance1.webp"
// ];

// const profileImageSrc = "img/newbalance1.webp";

// Function to handle adding product to cart
function addToCart() {
    const quantity = document.getElementById('quantity').value;
    const totalAmount = 3147 * quantity;
    alert('Product added to cart!' + '\n' + 'Total Amount: $' + totalAmount.toFixed(2));
}

// Function to handle buying now
function buyNow() {
    const size = document.getElementById("size").value;
    const quantity = document.getElementById("quantity").value;
    alert(`You are buying ${quantity}x size ${size}!`);
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
        figcaption.innerHTML = `
            <p>${selectedShoe.name}</p>
            <p>${selectedShoe.ratings}</p>
            <p>$${selectedShoe.price.toFixed(2)}</p>
        `;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        col.appendChild(figure);
        similarItemsContainer.appendChild(col);
    });
}

// const similarItemsContainer = document.getElementById('similarItemsContainer');
// similarItems.forEach((imageSrc) => {
//     const col = document.createElement('div');
//     col.className = 'col-6 col-md-2';
//     const figure = document.createElement('figure');
//     figure.className = 'figure';
//     const img = document.createElement('img');
//     img.src = imageSrc;
//     img.alt = 'Similar Item';
//     img.className = 'figure-img img-fluid rounded zoom';
//     const figcaption = document.createElement('figcaption');
//     figcaption.className = 'figure-caption';
//     figcaption.innerHTML = `
//         <p>New Balance</p>
//         <p>⭐⭐⭐⭐⭐ 36 Ratings</p>
//         <p>$10</p>
//     `;
//     figure.appendChild(img);
//     figure.appendChild(figcaption);
//     col.appendChild(figure);
//     similarItemsContainer.appendChild(col);
// });
// }

// Initialize the product page when the DOM is fully loaded
// document.addEventListener('DOMContentLoaded', initializeProductPage);

