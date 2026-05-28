# 📋 PHIẾU BÀI TẬP 07 — JAVASCRIPT BASICS

---

# PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1 — var / let / const

### Đoạn 1
```js
console.log(x);
var x = 5;
```
KQ: `undefined`  
→ `var` được hoisting và gán mặc định `undefined`.

---

### Đoạn 2
```js
console.log(y);
let y = 10;
```
KQ: `ReferenceError`  
→ `let` có TDZ nên không dùng trước khai báo.

---

### Đoạn 3
```js
const z = 15;
z = 20;
```
KQ: `TypeError`  
→ `const` không cho gán lại.

---

### Đoạn 4
```js
const arr = [1,2,3];
arr.push(4);
console.log(arr);
```
KQ:
```js
[1,2,3,4]
```
→ `const` không đổi tham chiếu nhưng sửa được nội dung array/object.

---

### Đoạn 5
```js
let a = 1;

{
    let a = 2;
    console.log(a);
}

console.log(a);
```
KQ:
```js
2
1
```
→ `let` có block scope.

---

# Câu A2 — Data Types & Coercion

```js
typeof null
```
→ `"object"`

```js
typeof undefined
```
→ `"undefined"`

```js
typeof NaN
```
→ `"number"`

```js
"5" + 3
```
→ `"53"`

```js
"5" - 3
```
→ `2`

```js
"5" * "3"
```
→ `15`

```js
true + true
```
→ `2`

```js
[] + []
```
→ `""`

```js
[] + {}
```
→ `"[object Object]"`

```js
{} + []
```
→ `0`

### Giải thích

- `"5" + 3` → nối chuỗi.
- `"5" - 3` → ép kiểu sang number để tính toán.

---

# Câu A3 — == vs ===

```js
5 == "5"              // true
5 === "5"             // false
null == undefined     // true
null === undefined    // false
NaN == NaN            // false
0 == false            // true
0 === false           // false
"" == false           // true
```

## Nên dùng
```js
===
```

→ So sánh cả giá trị và kiểu dữ liệu, tránh lỗi ép kiểu ngầm.

---

# Câu A4 — Truthy & Falsy

## Falsy values
```js
false
0
-0
0n
""
null
undefined
NaN
```

---

```js
if ("0") console.log("A"); // In
if ("") console.log("B"); // Không
if ([]) console.log("C"); // In
if ({}) console.log("D"); // In
if (null) console.log("E"); // Không
if (0) console.log("F"); // Không
if (-1) console.log("G"); // In
if (" ") console.log("H"); // In
```

→ `" "` là chuỗi có ký tự space nên truthy.

---

# Câu A5 — Template Literals

```js
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;
```

```js
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;
```

```js
var html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
`;
```

---

# PHẦN C — SUY LUẬN

# Câu C1 — Debug JavaScript

## Code đã sửa

```js
function tinhGiaGiamGia(giaBan, phanTramGiam) {

    if (typeof giaBan !== "number" || typeof phanTramGiam !== "number") {
        return "Input phải là số";
    }

    if (phanTramGiam < 0 || phanTramGiam > 100) {
        return "Phần trăm giảm không hợp lệ";
    }

    let giamGia = giaBan * phanTramGiam / 100;
    let giaSauGiam = giaBan - giamGia;

    if (giaSauGiam === 0) {
        console.log("Sản phẩm miễn phí!");
    }

    return giaSauGiam;
}

const gia = tinhGiaGiamGia(100000, 20);
console.log(gia);

const gia2 = tinhGiaGiamGia(50000, 110);
console.log(gia2);

for (let i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log("Item " + i);
    }, 1000);
}
```

---

## Các lỗi

### 1. Không kiểm tra kiểu dữ liệu
```js
"100000"
```
→ Là string, cần kiểm tra `typeof`.

---

### 2. Thiếu dấu `;`

```js
return "...";
```

---

### 3. Dùng `var`
```js
var giamGia
```
→ Nên dùng `let`.

---

### 4. Dùng `=` thay vì `===`
Sai:
```js
if (giaSauGiam = 0)
```

Đúng:
```js
if (giaSauGiam === 0)
```

---

### 5. Phần trăm giảm không hợp lệ
```js
110%
```
→ Phải nằm trong `0-100`.

---

### 6. Lỗi `var` trong loop

Sai:
```js
for (var i = 0; i < 5; i++)
```

KQ:
```js
Item 5
Item 5
Item 5
Item 5
Item 5
```

→ `var` không có block scope.

Sửa:
```js
for (let i = 0; i < 5; i++)
```

KQ:
```js
Item 0
Item 1
Item 2
Item 3
Item 4
```

---

