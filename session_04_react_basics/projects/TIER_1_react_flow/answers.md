# Tier 1 - Câu trả lời lý thuyết

## Bài 1.1 - Component render lần đầu

### Câu hỏi 1: Tại sao component chỉ render 1 lần?

Khi trang web được tải lần đầu:

1. React gọi function component.
2. Component return JSX.
3. React hiển thị JSX lên màn hình.

Sau khi hoàn thành 3 bước trên, không có dữ liệu nào thay đổi nên React không có lý do để render lại.

Vì vậy component chỉ render một lần khi mount.

---

### Câu hỏi 2: Khi nào component sẽ render lại?

Component sẽ render lại khi:

- State thay đổi (`setState`, `setCount`, ...)
- Props thay đổi
- Component cha render lại
- Context thay đổi

Ví dụ:

```jsx
setCount(count + 1);
```

Khi gọi `setCount`, React sẽ:

1. Cập nhật state.
2. Gọi lại component function.
3. Tạo JSX mới.
4. Cập nhật giao diện.

Quá trình này gọi là **re-render**.

---

## Bài 1.2 - Biến thường và useState

### Chạy BadCounter → nhấn nút → thấy gì?

Khi nhấn nút:

```jsx
count = count + 1;
```

Console hiển thị:

```text
Count: 1
Count: 2
Count: 3
...
```

Nhưng giao diện vẫn hiển thị:

```text
Bộ đếm: 0
```

Lý do:

- React không theo dõi biến thường.
- React không biết dữ liệu đã thay đổi.
- Không có re-render xảy ra.

---

### Chạy GoodCounter → nhấn nút → thấy gì?

Khi nhấn nút:

```jsx
setCount(count + 1);
```

Giao diện thay đổi:

```text
0 → 1 → 2 → 3 → ...
```

Mỗi lần gọi `setCount()`:

1. State được cập nhật.
2. React re-render component.
3. JSX mới được tạo.
4. UI được cập nhật.

---

### Mở Console → thấy log render mấy lần?

Ví dụ:

```jsx
function GoodCounter() {
    console.log("Render!");

    const [count, setCount] = useState(0);

    return (
        <button onClick={() => setCount(count + 1)}>
            {count}
        </button>
    );
}
```

Kết quả:

- Lần đầu mở trang:

```text
Render!
```

- Nhấn nút lần 1:

```text
Render!
```

- Nhấn nút lần 2:

```text
Render!
```

- Nhấn nút lần 3:

```text
Render!
```

Tổng cộng:

```text
1 lần render ban đầu
+
1 lần render cho mỗi lần setCount()
```

---

## Bài 1.3 - Luồng hoạt động của React

### React hoạt động theo luồng nào?

```text
Component được gọi
        ↓
Return JSX
        ↓
React hiển thị giao diện
        ↓
Người dùng tương tác
        ↓
setState(...)
        ↓
React re-render component
        ↓
Return JSX mới
        ↓
React cập nhật giao diện
```

---

### Tại sao phải re-render?

Mục đích của re-render là đồng bộ dữ liệu với giao diện.

Ví dụ:

```jsx
const [count, setCount] = useState(0);
```

Ban đầu:

```text
count = 0
UI = 0
```

Sau khi:

```jsx
setCount(1);
```

React sẽ render lại để:

```text
count = 1
UI = 1
```

Nếu không re-render thì dữ liệu đã đổi nhưng giao diện vẫn hiển thị dữ liệu cũ.

---

# Kết luận

- Component render lần đầu khi được mount.
- Biến thường thay đổi không làm React cập nhật UI.
- useState là state được React theo dõi.
- Gọi setState sẽ kích hoạt re-render.
- Re-render giúp giao diện đồng bộ với dữ liệu.
- Luồng cơ bản:

```text
User Action
    ↓
setState()
    ↓
Re-render
    ↓
JSX mới
    ↓
UI cập nhật
```