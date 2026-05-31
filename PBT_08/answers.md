# 📋 PHIẾU BÀI TẬP 08
# JAVASCRIPT FUNCTIONS, ARRAYS & OBJECTS

---

# PHẦN A — KIỂM TRA ĐỌC HIỂU

---

# Câu A1 — Function Declaration vs Expression vs Arrow

## Function Declaration

```js
function tinhThueBaoHiem1(luong) {
    let thue = luong > 11000000 ? luong * 0.1 : 0;

    return {
        thue,
        thuc_nhan: luong - thue
    };
}
```

## Function Expression

```js
const tinhThueBaoHiem2 = function (luong) {
    let thue = luong > 11000000 ? luong * 0.1 : 0;

    return {
        thue,
        thuc_nhan: luong - thue
    };
};
```

## Arrow Function

```js
const tinhThueBaoHiem3 = (luong) => {
    let thue = luong > 11000000 ? luong * 0.1 : 0;

    return {
        thue,
        thuc_nhan: luong - thue
    };
};
```

## Hoisting

### Function Declaration

```js
hello();

function hello() {
    console.log("OK");
}
```

→ Chạy được vì declaration được hoist.

---

### Function Expression

```js
test();

const test = function () {
    console.log("Hello");
};
```

→ Lỗi:
```txt
Cannot access 'test' before initialization
```

---

### Arrow Function

```js
run();

const run = () => {
    console.log("Run");
};
```

→ Cũng lỗi tương tự.

---

## Kết luận

| Loại | Hoisting |
|---|---|
| Function Declaration | Có |
| Function Expression | Không |
| Arrow Function | Không |

---

# Câu A2 — Scope & Closure

## Đoạn 1

### Output

```txt
1
2
3
2
2
```

### Giải thích

Biến `count` được closure giữ lại sau khi hàm `counter()` chạy xong.

---

## Đoạn 2

### Output

```txt
var: 3
var: 3
var: 3

let: 0
let: 1
let: 2
```

### Giải thích

### var

`var` dùng chung 1 biến `i`.

Sau vòng lặp:
```js
i = 3
```

Nên tất cả `setTimeout` đều in:
```txt
3
```

---

### let

`let` tạo biến riêng cho mỗi vòng lặp nên in:
```txt
0
1
2
```

---

# Câu A3 — Array Methods

```js
const nums = [1,2,3,4,5,6,7,8,9,10];

// 1
nums.filter(x => x % 2 === 0);

// 2
nums.map(x => x * 3);

// 3
nums.reduce((a, b) => a + b, 0);

// 4
nums.find(x => x > 7);

// 5
nums.some(x => x > 10);

// 6
nums.every(x => x > 0);

// 7
nums.map(x => `Số ${x} là ${x % 2 === 0 ? "chẵn" : "lẻ"}`);

// 8
[...nums].reverse();
```

---

# Câu A4 — Object Destructuring & Spread

## Output

```txt
iPhone 16 25990000 8 Titan
```

---

```js
console.log(specs);
```

→ Lỗi:
```txt
ReferenceError: specs is not defined
```

Vì destructuring chỉ lấy:
```js
ram
color
```

---

```js
console.log(updated.price);
```

→
```txt
23990000
```

---

```js
console.log(updated.sale);
```

→
```txt
true
```

---

```js
console.log(product.price);
```

→
```txt
25990000
```

Object gốc không đổi.

---

```js
console.log(product.specs.ram);
```

→
```txt
16
```

## Giải thích

Spread chỉ shallow copy.

`specs` vẫn tham chiếu cùng object bên trong.

---

# PHẦN C — SUY LUẬN

---

# Câu C1 — Refactor Code

## Code refactor

```js
const processOrders = (orders) =>
    orders
        .filter(o =>
            o.status === "completed" &&
            o.total > 100000
        )
        .map(({ id, customer, total }) => ({
            id,
            customer,
            total,
            discount: total * 0.1,
            finalTotal: total * 0.9
        }))
        .sort((a, b) =>
            b.finalTotal - a.finalTotal
        );
```

---

# Câu C2 — Thiết kế API miniArray

```js
const miniArray = {

    map(arr, fn) {

        let result = [];

        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }

        return result;
    },

    filter(arr, fn) {

        let result = [];

        for (let i = 0; i < arr.length; i++) {

            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }

        return result;
    },

    reduce(arr, fn, initialValue) {

        let acc = initialValue;

        for (let i = 0; i < arr.length; i++) {
            acc = fn(acc, arr[i], i, arr);
        }

        return acc;
    }
};

// TEST

console.log(
    miniArray.map([1,2,3], x => x * 2)
);

console.log(
    miniArray.filter([1,2,3,4], x => x > 2)
);

console.log(
    miniArray.reduce([1,2,3,4], (a,b) => a+b, 0)
);
```