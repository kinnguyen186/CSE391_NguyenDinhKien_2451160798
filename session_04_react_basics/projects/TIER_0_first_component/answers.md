# Tier 0 - Câu trả lời lý thuyết

## Câu 1: File .jsx khác gì file .js?

### Giống nhau
- Đều chứa mã JavaScript.
- Đều có thể khai báo biến, hàm, vòng lặp, điều kiện,...
- Đều được Vite/Babel xử lý trước khi chạy.

### Khác nhau
- File `.js` thường chứa JavaScript thuần.
- File `.jsx` cho phép viết JSX (JavaScript XML), tức là cú pháp giống HTML bên trong JavaScript.

Ví dụ JSX:

```jsx
function App() {
    return <h1>Xin chào React</h1>;
}
```

JSX giúp code giao diện ngắn gọn và dễ đọc hơn so với JavaScript thuần.

---

## Câu 2: Tại sao phải export default App?

React cần import component từ file khác để sử dụng.

Ví dụ:

```jsx
import App from "./App";
```

Để dòng code trên hoạt động, file `App.jsx` phải export component:

```jsx
export default App;
```

Nếu không export thì component sẽ không thể được sử dụng ở nơi khác.

---

## Câu 3: Thử xóa export default App → chuyện gì xảy ra?

Khi xóa:

```jsx
export default App;
```

thì file `App.jsx` không còn export component nào.

Lúc này React hoặc Vite sẽ báo lỗi khi chạy ứng dụng vì không thể import `App` từ `App.jsx`.

Ví dụ lỗi:

```text
The requested module './App.jsx' does not provide an export named 'default'
```

hoặc

```text
export 'default' was not found in './App'
```

Kết quả:
- Ứng dụng không render được giao diện.
- Trình duyệt hiển thị màn hình lỗi.
- Vite báo lỗi trong terminal hoặc Developer Console.

---

# Kết luận

- `.jsx` là JavaScript có hỗ trợ JSX.
- `export default App` giúp component có thể được import ở file khác.
- Xóa `export default App` sẽ khiến React không import được component và ứng dụng báo lỗi.