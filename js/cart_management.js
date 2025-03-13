export function addToCart(selectedShoe) {
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
        currentUser.cart[existingItemIndex].quantity += newItem.quantity;
        currentUser.cart[existingItemIndex].totalAmount += newItem.totalAmount;
    } else {
        currentUser.cart.push(newItem);
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = users.map(user => user.email === currentUser.email ? currentUser : user);
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("user", JSON.stringify(currentUser));

    alert("Item added to cart successfully!");
    updateCartNum();
}

export function buyNow(selectedShoe) {
    if (!localStorage.getItem("user")) {
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
        return;
    }

    const size = document.getElementById("size").value;
    const quantity = document.getElementById("quantity").value;
    alert(`You are buying ${quantity}x size ${size}!`);
}

export function updateCartNum() {
    let currentUser = JSON.parse(localStorage.getItem("user"));

    if (currentUser && currentUser.cart) {
        // const totalItems = currentUser.cart.reduce((total, item) => total + item.quantity, 0);
        console.log(currentUser.cart.length);
        document.getElementById('cart-num').innerText = currentUser.cart.length;
    } else {
        document.getElementById('cart-num').innerText = 0;
    }

}