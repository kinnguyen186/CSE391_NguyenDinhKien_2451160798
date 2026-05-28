const menu = [
    { name: "Phở bò", price: 65000, quantity: 2 },
    { name: "Trà đá", price: 5000, quantity: 3 },
    { name: "Bún chả", price: 55000, quantity: 1 }
];

const isWednesday = true;
const hasTip = true;

let subtotal = 0;

console.log("╔══════════════════════════════════════╗");
console.log("║           HÓA ĐƠN NHÀ HÀNG          ║");
console.log("╠══════════════════════════════════════╣");

for (let i = 0; i < menu.length; i++) {

    let item = menu[i];

    let itemTotal =
        item.price * item.quantity;

    subtotal += itemTotal;

    console.log(
        `${i + 1}. ${item.name} x${item.quantity} = ${itemTotal.toLocaleString()}đ`
    );
}

console.log("╠══════════════════════════════════════╣");

let discountPercent = 0;

if (subtotal > 1000000) {
    discountPercent = 15;
}
else if (subtotal > 500000) {
    discountPercent = 10;
}

if (isWednesday) {
    discountPercent += 5;
}

let discount =
    subtotal * discountPercent / 100;

let afterDiscount =
    subtotal - discount;

let vat =
    afterDiscount * 0.08;

let tip =
    hasTip
        ? afterDiscount * 0.05
        : 0;

let finalTotal =
    afterDiscount + vat + tip;

console.log(
    `Tổng cộng: ${subtotal.toLocaleString()}đ`
);

console.log(
    `Giảm giá (${discountPercent}%): ${discount.toLocaleString()}đ`
);

console.log(
    `VAT (8%): ${vat.toLocaleString()}đ`
);

console.log(
    `Tip (5%): ${tip.toLocaleString()}đ`
);

console.log("╠══════════════════════════════════════╣");

console.log(
    `THANH TOÁN: ${finalTotal.toLocaleString()}đ`
);

console.log("╚══════════════════════════════════════╝");