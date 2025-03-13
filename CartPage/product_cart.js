document.addEventListener("DOMContentLoaded", loadCart);

// Added event listener to validate and populate checkout items when checkout button is clicked
document.getElementById("checkout-btn").addEventListener("click", validateShippingInfo);

// Added event listener for the "Use same information for Billing" checkbox
document.getElementById("same-as-shipping").addEventListener("change", toggleBillingInfo);

function loadCart() {
    let currentUser = JSON.parse(localStorage.getItem("user"));

    if (!currentUser || !currentUser.cart || currentUser.cart.length === 0) {
        document.getElementById("cart-items").innerHTML = '<li class="list-group-item text-center">Your cart is empty.</li>';
        document.getElementById("cart-count").textContent = "0";
        document.getElementById("cart-total").textContent = "0.00";
        document.getElementById("checkout-btn").disabled = true;
        return;
    }

    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");
    const checkoutBtn = document.getElementById("checkout-btn");

    cartItems.innerHTML = "";  // Clear previous items
    let totalPrice = 0;
    let totalQuantity = 0;

    currentUser.cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

        li.innerHTML = `
            <img src="${item.img}" alt="${item.name}" class="img-thumbnail me-3" style="width: 50px; height: 50px;">
            <span><strong>${item.name}</strong> - $${item.price} x ${item.quantity}</span>
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remove</button>
        `;

        cartItems.appendChild(li);
        totalPrice += item.price * item.quantity;
        totalQuantity += item.quantity;
    });

    cartCount.textContent = totalQuantity;
    cartTotal.textContent = totalPrice.toFixed(2);
    checkoutBtn.disabled = false;

    document.getElementById("total-amount").textContent = (totalPrice + 5).toFixed(2);
}

function removeFromCart(index) {
    let currentUser = JSON.parse(localStorage.getItem("user"));

    if (!currentUser || !currentUser.cart) return;

    currentUser.cart.splice(index, 1);
    localStorage.setItem("user", JSON.stringify(currentUser));

    loadCart();
}

// Function to validate shipping information before proceeding to checkout
function validateShippingInfo() {
    const shippingFirstName = document.getElementById('shipping-first-name').value;
    const shippingLastName = document.getElementById('shipping-last-name').value;
    const shippingAddress1 = document.getElementById('shipping-address-1').value;
    const shippingAddress2 = document.getElementById('shipping-address-2').value;
    const shippingCity = document.getElementById('shipping-city').value;
    const shippingState = document.getElementById('shipping-state').value;
    const shippingZip = document.getElementById('shipping-zip').value;

    if (shippingFirstName && shippingLastName && shippingAddress1 && shippingCity && shippingState && shippingZip) {
        // If all shipping information is filled out, proceed to populate checkout items
        populateCheckoutItems();
        // Show the checkout modal
        const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
        checkoutModal.show();
    } else {
        alert('Please fill in all the shipping information.');
    }
}

// Function to toggle billing information fields based on the checkbox state
function toggleBillingInfo() {
    const useSameAsShipping = document.getElementById('same-as-shipping').checked;
    const billingFields = document.querySelectorAll('#billing-form .form-control');

    billingFields.forEach(field => {
        if (useSameAsShipping) {
            field.disabled = true;
            field.value = '';
        } else {
            field.disabled = false;
        }
    });
}


function populateCheckoutItems() {
    let currentUser = JSON.parse(localStorage.getItem("user"));

    if (!currentUser || !currentUser.cart || currentUser.cart.length === 0) {
        document.getElementById("checkout-modal-total").textContent = "$0.00";
        return;
    }

    const checkoutTotal = document.getElementById("checkout-modal-total");
    let totalPrice = 0;

    currentUser.cart.forEach(item => {
        totalPrice += item.price * item.quantity;
    });

    checkoutTotal.textContent = `$${(totalPrice + 5).toFixed(2)}`;  // Including shipping fee
}


function processPayment() {
    const cardHolder = document.getElementById('card-holder').value;
    const cardNumber = document.getElementById('card-number').value;
    const expirationDate = document.getElementById('expiration-date').value;
    const cvc = document.getElementById('cvc').value;

    
    if (cardHolder && cardNumber && expirationDate && cvc) {
        alert('Payment processed successfully!');
        
        // Clear the cart
        let currentUser = JSON.parse(localStorage.getItem("user"));
        currentUser.cart = [];
        localStorage.setItem("user", JSON.stringify(currentUser));

        
        loadCart();

        // Close the modal
        const checkoutModal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));
        checkoutModal.hide();
        
        // Reload the page after a short delay to ensure the modal is closed
        setTimeout(() => {
            location.reload();
        }, 500);
    } else {
        alert('Please fill in all the fields.');
    }
}
