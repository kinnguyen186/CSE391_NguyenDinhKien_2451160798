# 📋 PHIẾU BÀI TẬP 09
# DOM MANIPULATION & EVENTS

---

# PHẦN A — KIỂM TRA ĐỌC HIỂU

---

# Câu A1 — DOM Tree

## DOM Tree

```txt
div#app
├── header
│   ├── h1
│   └── nav
│       ├── a.active
│       ├── a
│       └── a
└── main
    ├── form#todoForm
    └── ul#todoList
        ├── li.todo-item
        └── li.todo-item.completed
```

## querySelector

```js
document.querySelector("h1");
document.querySelector("#todoForm input");
document.querySelectorAll(".todo-item");
document.querySelector("nav .active");
document.querySelector("#todoList li:first-child");
document.querySelectorAll("nav a");
```

---

# Câu A2 — innerHTML vs textContent

| innerHTML | textContent |
|------------|------------|
| Đọc/ghi HTML | Đọc/ghi text |
| Parse HTML | Không parse |
| Có thể gây XSS | An toàn hơn |

Ví dụ:

```js
app.innerHTML = "<h1>Hello</h1>";
app.textContent = "<h1>Hello</h1>";
```

### XSS

```js
const userInput =
    document.querySelector("#search").value;

document.querySelector("#result").innerHTML =
    userInput;
```

Sửa:

```js
document.querySelector("#result").textContent =
    userInput;
```

---

# Câu A3 — Event Bubbling

Không dùng:

```txt
BUTTON
INNER
OUTER
```

Có:

```js
e.stopPropagation();
```

```txt
BUTTON
```

Event đi theo:

```txt
button → inner → outer
```

---

# PHẦN C — DEBUG & PHÂN TÍCH

---

# Câu C1 — Debug DOM Code

## Lỗi 1

Sai:

```js
addEventListener("onclick")
```

Sửa:

```js
addEventListener("click")
```

---

## Lỗi 2

Sai:

```js
countDisplay = count;
```

Sửa:

```js
countDisplay.textContent = count;
```

---

## Lỗi 3

Sai:

```js
historyList.innerHTML = null;
```

Sửa:

```js
historyList.innerHTML = "";
```

---

## Lỗi 4

Sai:

```js
item.remove;
```

Sửa:

```js
item.remove();
```

---

## Lỗi 5

Sai:

```js
count = localStorage.getItem("count");
```

Sửa:

```js
count = Number(
    localStorage.getItem("count")
) || 0;
```

---

## Lỗi 6

Thiếu khôi phục history từ localStorage:

```js
historyList.innerHTML =
    localStorage.getItem("history") || "";
```

---

## Lỗi 7

Sai:

```js
countDisplay.innerHTML = count;
```

Sửa:

```js
countDisplay.textContent = count;
```
---

# Câu C2 — Performance

## Vì sao bind 1000 listeners là BAD PRACTICE?

- Tốn RAM
- Giảm hiệu năng
- Khó quản lý

## Event Delegation

```js
document.querySelector("#list")
.addEventListener("click", e => {

    if (e.target.matches("li")) {
        console.log(e.target);
    }

});
```

## DocumentFragment

```js
const fragment =
    document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {

    const div =
        document.createElement("div");

    div.textContent = `Item ${i}`;

    fragment.appendChild(div);
}

document.body.appendChild(fragment);
```

Nhanh hơn vì chỉ reflow/repaint 1 lần.