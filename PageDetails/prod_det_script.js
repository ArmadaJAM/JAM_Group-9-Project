// Array of image URLs S
const productImages = [
    "img/0803-NEWMR530SGC00W010-1.webp",
    "img/0803-NEWMR530SGC00W010-2.webp",
    "img/0803-NEWMR530SGC00W010-3.webp",
    "img/0803-NEWMR530SGC00W010-4.webp",
    "img/0803-NEWMR530SGC00W010-6.webp"
];

const similarItems = [
    "img/0803-NEWMR530SGC00W010-1.webp",
    "img/0803-NEWMR530SGC00W010-1.webp",
    "img/0803-NEWMR530SGC00W010-1.webp",
    "img/0803-NEWMR530SGC00W010-1.webp",
    "img/0803-NEWMR530SGC00W010-1.webp"
];

const profileImageSrc = "img/0803-NEWMR530SGC00W010-1.webp";

// Function to handle adding product to cart
function addToCart() {
    const quantity = document.getElementById('quantity').value;
    const totalAmount = 3147 * quantity;
    alert('Product added to cart!');
}

// Function to handle buying now
function buyNow() {
    alert('Product purchased!');
}

// Function to change the main product image
function changeImage(thumbnail) {
    const mainProductImage = document.getElementById('mainProductImage');
    mainProductImage.src = thumbnail.src;
}

// Function to initialize the product details page
function initializeProductPage() {
    // Set the profile image
    const profileImage = document.getElementById('profileImage');
    profileImage.src = profileImageSrc;
    profileImage.width = 40;
    profileImage.height = 40;

    // Set the main product image
    const mainProductImage = document.getElementById('mainProductImage');
    mainProductImage.src = productImages[0];

    // Set the thumbnail images
    const thumbnailContainer = document.getElementById('thumbnailContainer');
    productImages.forEach((imageSrc, index) => {
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

    // Set the similar items
    const similarItemsContainer = document.getElementById('similarItemsContainer');
    similarItems.forEach((imageSrc) => {
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
            <p>New Balance</p>
            <p>⭐⭐⭐⭐⭐ 36 Ratings</p>
            <p>$10</p>
        `;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        col.appendChild(figure);
        similarItemsContainer.appendChild(col);
    });
}

// Initialize the product page when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeProductPage);
