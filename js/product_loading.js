import { shoes } from "./productData.js";
import { createPaginationButtons } from "./pagination.js";
import { addToCart, buyNow } from "../js/cart_management.js";

export let currentPage = 1;
const itemsPerPage = 6;

export function setCurrentPage(page) {
    currentPage = page;
}

export function loadProducts(category = "All Shoes", page = 1) {
    const productList = document.getElementById("product-list");
    let storedShoes = JSON.parse(localStorage.getItem("shoes")) || [];
    let filteredShoes = category === "All Shoes" ? storedShoes : storedShoes.filter(shoe => shoe.category === category);
    let activeCategory = document.getElementById("filtered-category");

    productList.innerHTML = "";

    let start = (page - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let paginatedShoes = filteredShoes.slice(start, end);

    paginatedShoes.forEach(shoe => {
        let shoeCard = document.createElement("li");
        shoeCard.classList.add("col-lg-4", "col-md-6", "col-sm-12", "mb-4");

        let link = document.createElement("a");
        link.href = `/PageDetails/prod_det.html?id=${shoe.id}`;
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
        price.textContent = `₱${shoe.price}`;

        priceContainer.appendChild(price);
        priceContainer.classList.add("price");

        let ratingsContainer = document.createElement("div");
        ratingsContainer.classList.add("shoe-ratings-container");

        let ratings = document.createElement("p");
        ratings.innerHTML = shoe.ratings; 

        ratingsContainer.appendChild(ratings);

        infoContainer.appendChild(nameContainer);
        infoContainer.appendChild(priceContainer);

        link.appendChild(imgContainer);
        link.appendChild(infoContainer);
        link.appendChild(ratingsContainer); 
        shoeCard.appendChild(link);
        productList.appendChild(shoeCard);
    });

    activeCategory.innerText = category;
    createPaginationButtons(filteredShoes.length, category);
}

export let selectedShoe = 0;

export function getSelectedProduct() {
    let storedShoes = JSON.parse(localStorage.getItem("shoes")) || [];
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get("id"));

    if (!productId) {
        console.error("Product ID not found in URL.");
        return;
    }

    selectedShoe = storedShoes.find(shoe => shoe.id === productId);

    if (!selectedShoe) {
        console.error("Selected shoe is undefined.");
        return;
    }

    displayProductDetails(selectedShoe.id);
    initializeProductPage(); 
}

export function displayProductDetails(id) {
    let storedShoes = JSON.parse(localStorage.getItem("shoes")) || [];
    const product = storedShoes.find(shoe => shoe.id == id);

    const header = document.querySelector(".product-details header");
    const section = document.querySelector(".product-details section");

    header.innerHTML = "";
    section.innerHTML = "";

    if (product) {
        header.innerHTML = `
            <h2>${product.name}</h2>
            <p>Product Code: ${product.productCode}</p>
            <p>${product.ratings}</p>
            <p><strong>₱${product.price.toFixed(2)}</strong> 
                <del>₱${product.originalPrice.toFixed(2)}</del>
            </p>
        `;

        section.innerHTML = `
            <p>${product.description}</p>
            <div class="form-group">
                <label for="size">Size</label>
                <select class="form-control" id="size">
                    ${product.sizes.map(size => `<option>${size}</option>`).join("")}
                </select>
            </div>
            <div class="form-group">
                <label for="quantity">Quantity</label>
                <input class="form-control" id="quantity" type="number" value="1">
            </div>
            <button id="buyNowBtn" class="btn btn-primary">Buy Now</button>
            <button id="addToCartBtn" class="btn btn-secondary">Add to Cart</button>
            <a href="#" class="d-block mt-3">Share</a>
        `;

        document.getElementById("buyNowBtn").addEventListener("click", () => buyNow(selectedShoe));
    document.getElementById("addToCartBtn").addEventListener("click", () => addToCart(selectedShoe));
    } else {
        header.innerHTML = `<p>Product not found.</p>`;
    }
}

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
        img.onmouseover = () => changeImage(img);
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

