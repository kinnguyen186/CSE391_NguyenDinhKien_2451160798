const products = [
    {
        id: 1,
        name: "iPhone 16",
        price: 25990000,
        category: "phone",
        image: "https://picsum.photos/200?1",
        rating: 4.5
    },
    {
        id: 2,
        name: "Samsung S24",
        price: 22990000,
        category: "phone",
        image: "https://picsum.photos/200?2",
        rating: 4.4
    },
    {
        id: 3,
        name: "Pixel 9",
        price: 19990000,
        category: "phone",
        image: "https://picsum.photos/200?3",
        rating: 4.6
    },
    {
        id: 4,
        name: "MacBook Pro",
        price: 45990000,
        category: "laptop",
        image: "https://picsum.photos/200?4",
        rating: 4.8
    },
    {
        id: 5,
        name: "Dell XPS 15",
        price: 35990000,
        category: "laptop",
        image: "https://picsum.photos/200?5",
        rating: 4.7
    },
    {
        id: 6,
        name: "ThinkPad X1",
        price: 32990000,
        category: "laptop",
        image: "https://picsum.photos/200?6",
        rating: 4.5
    },
    {
        id: 7,
        name: "iPad Air",
        price: 16990000,
        category: "tablet",
        image: "https://picsum.photos/200?7",
        rating: 4.6
    },
    {
        id: 8,
        name: "Xiaomi Pad 6",
        price: 7990000,
        category: "tablet",
        image: "https://picsum.photos/200?8",
        rating: 4.2
    },
    {
        id: 9,
        name: "Galaxy Tab",
        price: 9990000,
        category: "tablet",
        image: "https://picsum.photos/200?9",
        rating: 4.3
    },
    {
        id: 10,
        name: "AirPods Pro",
        price: 6990000,
        category: "accessory",
        image: "https://picsum.photos/200?10",
        rating: 4.3
    },
    {
        id: 11,
        name: "Galaxy Buds",
        price: 3490000,
        category: "accessory",
        image: "https://picsum.photos/200?11",
        rating: 4.1
    },
    {
        id: 12,
        name: "Magic Mouse",
        price: 2490000,
        category: "accessory",
        image: "https://picsum.photos/200?12",
        rating: 4.0
    }
];

const app =
    document.getElementById("app");

let cartCount = 0;
let currentCategory = "all";
let keyword = "";
let sortType = "";

app.innerHTML = `
<div class="cart">
    🛒 <span class="badge">0</span>
</div>

<div class="header">

    <input
        id="search"
        placeholder="Tìm kiếm sản phẩm..."
    >

    <select id="sort">

        <option value="">
            Sắp xếp
        </option>

        <option value="priceAsc">
            Giá tăng dần
        </option>

        <option value="priceDesc">
            Giá giảm dần
        </option>

        <option value="name">
            Tên A-Z
        </option>

        <option value="rating">
            Đánh giá cao nhất
        </option>

    </select>

    <button data-category="all">
        Tất cả
    </button>

    <button data-category="phone">
        Điện thoại
    </button>

    <button data-category="laptop">
        Laptop
    </button>

    <button data-category="tablet">
        Máy tính bảng
    </button>

    <button data-category="accessory">
        Phụ kiện
    </button>

</div>

<div class="products"></div>

<div class="modal hidden">

    <div class="modal-content">

        <h2 id="modalTitle"></h2>

        <p id="modalPrice"></p>

        <p id="modalCategory"></p>

        <button id="closeModal">
            Đóng
        </button>

    </div>

</div>
`;

const productContainer =
    document.querySelector(".products");

function renderProducts() {

    let result = [...products];

    if (currentCategory !== "all") {

        result = result.filter(
            p =>
                p.category ===
                currentCategory
        );
    }

    if (keyword) {

        result = result.filter(
            p =>
                p.name
                    .toLowerCase()
                    .includes(
                        keyword.toLowerCase()
                    )
        );
    }

    if (sortType === "priceAsc") {

        result.sort(
            (a, b) =>
                a.price - b.price
        );
    }

    if (sortType === "priceDesc") {

        result.sort(
            (a, b) =>
                b.price - a.price
        );
    }

    if (sortType === "name") {

        result.sort(
            (a, b) =>
                a.name.localeCompare(
                    b.name
                )
        );
    }

    if (sortType === "rating") {

        result.sort(
            (a, b) =>
                b.rating - a.rating
        );
    }

    productContainer.innerHTML = "";

    result.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "card";

        const img =
            document.createElement("img");

        img.src = product.image;

        const body =
            document.createElement("div");

        body.className =
            "card-body";

        const name =
            document.createElement("h3");

        name.textContent =
            product.name;

        const price =
            document.createElement("p");

        price.textContent =
            "Giá: " +
            product.price.toLocaleString("vi-VN") +
            "đ";

        const rating =
            document.createElement("p");

        rating.textContent =
            "⭐ " + product.rating;

        const btn =
            document.createElement("button");

        btn.textContent =
            "🛒 Thêm vào giỏ";

   btn.addEventListener(
    "click",
    e => {

        e.stopPropagation();

        cartCount++;

        document
            .querySelector(".badge")
            .textContent =
            cartCount;

        btn.textContent =
            "✓ Đã thêm";

        btn.style.background =
            "#28a745";

        btn.disabled = true;
    }
);

        body.append(
            name,
            price,
            rating,
            btn
        );

        card.append(
            img,
            body
        );

        card.addEventListener(
            "click",
            () => {
                showModal(product);
            }
        );

        productContainer.append(
            card
        );
    });
}

function showModal(product) {

    document
        .querySelector(".modal")
        .classList.remove(
            "hidden"
        );

    document
        .getElementById(
            "modalTitle"
        )
        .textContent =
        product.name;

    document
        .getElementById(
            "modalPrice"
        )
        .textContent =
        "Giá: " +
        product.price.toLocaleString("vi-VN") +
        "đ";

    document
        .getElementById(
            "modalCategory"
        )
        .textContent =
        "Danh mục: " +
        product.category;
}

document
    .getElementById("search")
    .addEventListener(
        "input",
        e => {

            keyword =
                e.target.value;

            renderProducts();
        }
    );

document
    .getElementById("sort")
    .addEventListener(
        "change",
        e => {

            sortType =
                e.target.value;

            renderProducts();
        }
    );

document
    .querySelectorAll(
        "[data-category]"
    )
    .forEach(btn => {

        btn.addEventListener(
            "click",
            () => {

                currentCategory =
                    btn.dataset.category;

                renderProducts();
            }
        );
    });

document
    .getElementById("themeBtn")
    .addEventListener(
        "click",
        () => {

            document.body
                .classList.toggle(
                    "dark-mode"
                );

            const btn =
                document.getElementById(
                    "themeBtn"
                );

            btn.textContent =
                document.body.classList.contains(
                    "dark-mode"
                )
                    ? "☀️ Chế độ sáng"
                    : "🌙 Chế độ tối";
        }
    );

document.addEventListener(
    "click",
    e => {

        if (
            e.target.id ===
            "closeModal"
        ) {

            document
                .querySelector(".modal")
                .classList.add(
                    "hidden"
                );
        }
    }
);

renderProducts();