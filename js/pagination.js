import { loadProducts, setCurrentPage, currentPage } from "./product_loading.js";

export function createPaginationButtons(totalItems, category) {
    let paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";
    let totalPages = Math.ceil(totalItems / 6);

    for (let i = 1; i <= totalPages; i++) {
        let pageButton = document.createElement("button");
        pageButton.classList.add("btn", "btn-light", "mx-1");
        pageButton.textContent = i;
        if (i === currentPage) pageButton.classList.add("btn-primary");

        pageButton.addEventListener("click", () => {
            setCurrentPage(i)
            loadProducts(category, currentPage);
        });

        paginationContainer.appendChild(pageButton);
    }
}