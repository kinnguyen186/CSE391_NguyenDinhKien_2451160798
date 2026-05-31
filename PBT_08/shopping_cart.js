function createCart() {

    let items = [];

    let discount = 0;

    return {

        addItem(
            product,
            quantity = 1
        ) {

            let existing =
                items.find(
                    item =>
                        item.id === product.id
                );

            if (existing) {

                existing.quantity += quantity;
            }

            else {

                items.push({
                    ...product,
                    quantity
                });
            }
        },

        removeItem(productId) {

            items = items.filter(
                item =>
                    item.id !== productId
            );
        },

        updateQuantity(
            productId,
            newQuantity
        ) {

            let item =
                items.find(
                    item =>
                        item.id === productId
                );

            if (item) {
                item.quantity =
                    newQuantity;
            }
        },

        getTotal() {

            let total =
                items.reduce(
                    (sum, item) =>

                        sum +
                        item.price *
                        item.quantity,

                    0
                );

            return total - discount;
        },

        applyDiscount(code) {

            let total =
                items.reduce(
                    (sum, item) =>

                        sum +
                        item.price *
                        item.quantity,

                    0
                );

            if (code === "SALE10") {

                discount = total * 0.1;
            }

            else if (
                code === "SALE20"
            ) {

                discount = total * 0.2;
            }

            else if (
                code === "FREESHIP"
            ) {

                discount = 30000;
            }

            else {

                discount = 0;
            }
        },

        printCart() {

            console.log(
                "┌────────────────────────────┐"
            );

            items.forEach(
                (item, index) => {

                    console.log(

                        `${index + 1}. ${item.name} | SL: ${item.quantity} | ${(item.price * item.quantity).toLocaleString()}đ`
                    );
                }
            );

            console.log(
                "├────────────────────────────┤"
            );

            console.log(

                `Tổng: ${this.getTotal().toLocaleString()}đ`
            );

            console.log(
                "└────────────────────────────┘"
            );
        },

        getItemCount() {

            return items.reduce(
                (sum, item) =>

                    sum + item.quantity,

                0
            );
        },

        clearCart() {

            items = [];
            discount = 0;
        }
    };
}

// TEST

const cart = createCart();

cart.addItem(
    {
        id: 1,
        name: "iPhone 16",
        price: 25990000
    },
    1
);

cart.addItem(
    {
        id: 3,
        name: "AirPods Pro",
        price: 6990000
    },
    2
);

cart.addItem(
    {
        id: 1,
        name: "iPhone 16",
        price: 25990000
    },
    1
);

cart.printCart();

cart.applyDiscount("SALE10");

cart.printCart();

console.log(
    "Số SP:",
    cart.getItemCount()
);

cart.removeItem(3);

console.log(
    "Sau xóa:",
    cart.getItemCount()
);