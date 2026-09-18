const products = [

    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 2499,
        rating: 4.8,
        icon: "🎧",
        description: "Comfortable wireless headphones with clear sound."
    },

    {
        id: 2,
        name: "Smart Watch",
        category: "electronics",
        price: 3999,
        rating: 4.6,
        icon: "⌚",
        description: "Smart watch with health and activity tracking."
    },

    {
        id: 3,
        name: "Bluetooth Speaker",
        category: "electronics",
        price: 1799,
        rating: 4.4,
        icon: "🔊",
        description: "Portable speaker with powerful audio."
    },

    {
        id: 4,
        name: "Classic Backpack",
        category: "fashion",
        price: 1299,
        rating: 4.5,
        icon: "🎒",
        description: "Durable everyday backpack for work and travel."
    },

    {
        id: 5,
        name: "Running Shoes",
        category: "fashion",
        price: 2499,
        rating: 4.7,
        icon: "👟",
        description: "Lightweight shoes designed for everyday running."
    },

    {
        id: 6,
        name: "Cotton Hoodie",
        category: "fashion",
        price: 999,
        rating: 4.3,
        icon: "👕",
        description: "Soft and comfortable casual hoodie."
    },

    {
        id: 7,
        name: "Desk Lamp",
        category: "home",
        price: 899,
        rating: 4.2,
        icon: "💡",
        description: "Modern desk lamp suitable for study and work."
    },

    {
        id: 8,
        name: "Coffee Maker",
        category: "home",
        price: 3499,
        rating: 4.6,
        icon: "☕",
        description: "Easy-to-use coffee maker for your home."
    },

    {
        id: 9,
        name: "Decorative Plant",
        category: "home",
        price: 599,
        rating: 4.1,
        icon: "🌿",
        description: "Simple decorative plant for your workspace."
    },

    {
        id: 10,
        name: "Sunglasses",
        category: "accessories",
        price: 799,
        rating: 4.5,
        icon: "🕶️",
        description: "Stylish sunglasses for everyday outdoor use."
    },

    {
        id: 11,
        name: "Leather Wallet",
        category: "accessories",
        price: 699,
        rating: 4.4,
        icon: "👛",
        description: "Compact wallet with multiple card slots."
    },

    {
        id: 12,
        name: "Travel Bottle",
        category: "accessories",
        price: 499,
        rating: 4.0,
        icon: "🧴",
        description: "Reusable bottle designed for travel."
    }

];


const productGrid =
    document.getElementById("productGrid");

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const priceRange =
    document.getElementById("priceRange");

const priceValue =
    document.getElementById("priceValue");

const sortSelect =
    document.getElementById("sortSelect");

const resultCount =
    document.getElementById("resultCount");

const noResults =
    document.getElementById("noResults");

const clearFilters =
    document.getElementById("clearFilters");

const cartCount =
    document.getElementById("cartCount");


let cart = 0;


function displayProducts(list) {

    productGrid.innerHTML = "";


    if (list.length === 0) {

        noResults.style.display =
            "block";

        resultCount.textContent =
            "0 products";

        return;

    }


    noResults.style.display =
        "none";


    resultCount.textContent =
        `${list.length} products`;


    list.forEach(function (product) {

        const card =
            document.createElement("article");

        card.className =
            "product-card";


        card.innerHTML = `

            <div class="product-image">
                ${product.icon}
            </div>

            <div class="product-content">

                <span class="category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${product.description}
                </p>

                <div class="product-bottom">

                    <span class="price">
                        ₹${product.price.toLocaleString("en-IN")}
                    </span>

                    <span class="rating">
                        ★ ${product.rating}
                    </span>

                </div>

                <button
                    class="add-button"
                    data-id="${product.id}"
                >
                    Add to Cart
                </button>

            </div>

        `;


        productGrid.appendChild(card);

    });


    document
        .querySelectorAll(".add-button")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    cart++;

                    cartCount.textContent =
                        cart;

                    button.textContent =
                        "Added ✓";

                }
            );

        });

}


function filterAndSortProducts() {

    const search =
        searchInput.value
            .trim()
            .toLowerCase();


    const category =
        categoryFilter.value;


    const maxPrice =
        Number(priceRange.value);


    let filtered =
        products.filter(function (product) {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(search);


            const matchesCategory =
                category === "all" ||
                product.category === category;


            const matchesPrice =
                product.price <= maxPrice;


            return (
                matchesSearch &&
                matchesCategory &&
                matchesPrice
            );

        });


    const sort =
        sortSelect.value;


    if (sort === "price-low") {

        filtered.sort(function (a, b) {

            return a.price - b.price;

        });

    }


    if (sort === "price-high") {

        filtered.sort(function (a, b) {

            return b.price - a.price;

        });

    }


    if (sort === "rating-high") {

        filtered.sort(function (a, b) {

            return b.rating - a.rating;

        });

    }


    if (sort === "name") {

        filtered.sort(function (a, b) {

            return a.name.localeCompare(
                b.name
            );

        });

    }


    displayProducts(filtered);

}


searchInput.addEventListener(
    "input",
    filterAndSortProducts
);


categoryFilter.addEventListener(
    "change",
    filterAndSortProducts
);


priceRange.addEventListener(
    "input",
    function () {

        priceValue.textContent =
            priceRange.value;

        filterAndSortProducts();

    }
);


sortSelect.addEventListener(
    "change",
    filterAndSortProducts
);


clearFilters.addEventListener(
    "click",
    function () {

        searchInput.value = "";

        categoryFilter.value = "all";

        priceRange.value = 1500;

        priceValue.textContent = "1500";

        sortSelect.value = "default";

        filterAndSortProducts();

    }
);


displayProducts(products);