# 📋 PHIẾU BÀI TẬP 10 — ASYNC JAVASCRIPT & API INTEGRATION
---

# PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)

---

## Câu A1 — Sync vs Async

### Thứ tự output đúng:

```
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms
```

---

### Giải thích Event Loop

JavaScript gồm:

- Call Stack: chạy code đồng bộ
- Microtask Queue: Promise.then, queueMicrotask
- Macrotask Queue: setTimeout, setInterval

---

### Luồng chạy:

#### 1. Đồng bộ trước:
```
1 - Start
4 - End
```

---

#### 2. Microtask Queue:
```
3 - Promise
6 - Promise 2
```

Trong Promise 2 có:

```js
setTimeout(() => console.log("7 - Nested timeout"), 0);
```

→ được đưa sang Macrotask Queue

---

#### 3. Macrotask Queue:
```
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms
```

---

## Câu A2 — Fetch API

### await fetch(...) trả về gì?

- Trả về Response object
- fetch luôn trả Promise
- await dùng để chờ Promise resolve

---

### response.ok là gì?

false khi HTTP status ngoài 200–299:

- 404 Not Found
- 500 Server Error
- 403 Forbidden

---

### response.json() vì sao cần await?

- JSON parse là async
- dữ liệu đọc từ stream
- cần await để lấy kết quả

---

### try...catch bắt lỗi gì?

Bắt được:

- Lỗi mạng (network error)
- CORS error
- JSON parse error

Không bắt:

- HTTP 404 / 500 (vì fetch vẫn resolve)

---

## Câu A3 — Promise States

### 3 trạng thái:

```
PENDING → FULFILLED
        → REJECTED
```

---

### Callback Hell:

```js
getUser(id, (user) => {
    getPosts(user.id, (posts) => {
        getComments(posts[0].id, (comments) => {
            getLikes(comments[0].id, (likes) => {
                console.log(likes);
            });
        });
    });
});
```

---

### Async/Await refactor:

```js
async function loadData(id) {
    const user = await getUser(id);
    const posts = await getPosts(user.id);
    const comments = await getComments(posts[0].id);
    const likes = await getLikes(comments[0].id);

    console.log(likes);
}
```

---

# PHẦN C — PHÂN TÍCH (20 điểm)

---

## Câu C1 — Error Handling Strategy

---

### Network error

```js
async function fetchData(url) {
    try {
        const res = await fetch(url);
        return await res.json();
    } catch (err) {
        throw new Error("Network error / No internet connection");
    }
}
```

---

### API errors

```js
async function fetchWithStatus(url) {
    const res = await fetch(url);

    if (res.status === 404) throw new Error("Not Found");
    if (res.status === 500) throw new Error("Server Error");
    if (res.status === 429) throw new Error("Too Many Requests");

    return await res.json();
}
```

---

### Timeout

```js
function fetchWithTimeout(url, ms) {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
        controller.abort();
    }, ms);

    return fetch(url, { signal: controller.signal })
        .finally(() => clearTimeout(timeout));
}
```

---

### Retry logic

```js
async function fetchWithRetry(url, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fetch(url).then(r => r.json());
        } catch (err) {
            if (i === maxRetries - 1) throw err;
        }
    }
}
```

---

## Câu C2 — Promise methods

| Method | Resolve khi | Reject khi | Use case |
|-------|-------------|------------|----------|
| Promise.all | tất cả thành công | 1 fail | cần đủ dữ liệu |
| Promise.allSettled | luôn resolve | không reject | dashboard UI |
| Promise.race | cái nhanh nhất | cái đầu tiên lỗi | timeout / fastest API |
| Promise.any | 1 cái thành công | tất cả fail | backup API |

---

### Promise.all

```js
const data = await Promise.all([
    fetch("/user").then(r => r.json()),
    fetch("/posts").then(r => r.json())
]);
```

---

### Promise.allSettled

```js
const results = await Promise.allSettled([
    fetch("/api1"),
    fetch("/api2"),
    fetch("/api3")
]);
```

---

### Promise.race

```js
const fastest = await Promise.race([
    fetch("/server1"),
    fetch("/server2")
]);
```

---

### Promise.any

```js
const data = await Promise.any([
    fetch("/backup1"),
    fetch("/backup2")
]);
```

---