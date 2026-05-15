# Phần A: Kiểm tra đọc hiểu

## Câu A1 — 5 Loại Positioning

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
| ---------- | ------------------------- | ---------------------------------------- | --------------------------------------- | ----------------------------------------- |
| `static` | Có | Theo flow mặc định của tài liệu HTML | Có | Layout thông thường |
| `relative` | Có | So với vị trí gốc của chính nó | Có | Dịch chuyển element nhẹ, làm mốc cho absolute |
| `absolute` | Không | Thẻ cha gần nhất có `position` khác `static` | Có | Badge, tooltip, dropdown |
| `fixed` | Không | Viewport của trình duyệt | Không | Header cố định, nút chat |
| `sticky` | Có | Theo flow cho đến khi đạt ngưỡng `top` | Có → Không khi sticky hoạt động | Sticky menu, sticky sidebar |

### Giải thích thêm

`position: absolute` sẽ tự tìm phần tử cha gần nhất có:
- `position: relative`
- `position: absolute`
- `position: fixed`
- `position: sticky`

để dùng làm gốc tính tọa độ.

Nếu không tìm thấy phần tử phù hợp thì nó sẽ lấy `body` hoặc viewport làm mốc.

**Nearest positioned ancestor** là phần tử cha gần nhất có `position` khác `static`.

---

## Câu A2 — Flexbox vs Grid

### Trường hợp 1

```css
.container {
    display: flex;
}

.item {
    flex: 1;
}

/* 4 items */
```

### Bố cục

```text
| Item 1 | Item 2 | Item 3 | Item 4 |
```

### Giải thích

- `display: flex` mặc định xếp item theo chiều ngang
- `flex: 1` giúp các item chia đều chiều rộng
- 4 items → mỗi item chiếm khoảng 25%

---

### Trường hợp 2

```css
.container {
    display: flex;
    flex-wrap: wrap;
}

.item {
    width: 45%;
    margin: 2.5%;
}

/* 6 items */
```

### Bố cục

```text
| Item 1 | Item 2 |
| Item 3 | Item 4 |
| Item 5 | Item 6 |
```

### Giải thích

- Mỗi item chiếm khoảng 50% chiều ngang tính cả margin
- `flex-wrap: wrap` cho phép item xuống dòng
- 6 items → 3 hàng, mỗi hàng 2 item

---

### Trường hợp 3

```css
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* 3 items */
```

### Bố cục

```text
Item 1                Item 2                Item 3
```

### Giải thích

- `space-between`:
  - item đầu sát trái
  - item cuối sát phải
  - khoảng cách giữa các item bằng nhau

- `align-items: center`
→ căn giữa theo chiều dọc

---

### Trường hợp 4

```css
.container {
    display: grid;
    grid-template-columns: 200px 1fr 200px;
    gap: 20px;
}

/* 3 items */
```

### Bố cục

```text
| Sidebar | Main Content | Ads |
```

### Giải thích

- Cột trái: 200px cố định
- Cột giữa: `1fr` co giãn
- Cột phải: 200px cố định
- `gap: 20px` tạo khoảng cách giữa các cột

---

### Trường hợp 5

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}

/* 7 items */
```

### Bố cục

```text
| 1 | 2 | 3 |
| 4 | 5 | 6 |
| 7 |
```

### Giải thích

- Grid có 3 cột bằng nhau
- 7 items:
  - hàng 1: 1 2 3
  - hàng 2: 4 5 6
  - hàng 3: item 7 nằm ở cột đầu tiên

---

# Phần C: Suy luận

## Câu C1 — Flexbox vs Grid: Khi nào dùng gì?

### 1. Navigation bar ngang (logo + menu + buttons)

- Dùng: **Flexbox**

Navbar là layout theo một chiều ngang nên Flexbox phù hợp nhất.

Có thể dùng:

```css
justify-content: space-between;
align-items: center;
```

để căn ngang và căn dọc dễ dàng.

---

### 2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước)

- Dùng: **Grid**

Đây là layout dạng lưới nhiều hàng nhiều cột.

Ví dụ:

```css
grid-template-columns: repeat(3, 1fr);
```

Grid giúp chia cột đều và tự động xuống hàng thuận tiện hơn.

---

### 3. Layout blog: main content + sidebar

- Dùng: **Grid**

Layout có nhiều vùng rõ ràng:
- content chính
- sidebar

Grid giúp chia cột chính xác và responsive dễ hơn.

---

### 4. Footer với 4 cột thông tin (Về chúng tôi, Liên kết, Hỗ trợ, Liên hệ)

- Dùng: **Grid hoặc Flexbox**

Nếu các cột bằng nhau thì Flexbox là đủ.

Nếu cần kiểm soát kích thước từng cột thì Grid phù hợp hơn.

---

### 5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy)

- Dùng: **Flexbox**

Card là layout theo chiều dọc nên Flexbox rất phù hợp.

Ví dụ:

```css
flex-direction: column;
```

Kết hợp:

```css
margin-top: auto;
```

để đẩy nút xuống đáy card.

---

## Câu C2 — Debug Flexbox

### Lỗi 1: Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống

### Nguyên nhân

Card chưa dùng Flexbox theo chiều dọc nên:
- chiều cao mỗi card khác nhau
- nút không nằm cố định dưới đáy

### Code sửa

```css
.card-container {
    display: flex;
    flex-wrap: wrap;
}

.card {
    width: 30%;
    margin: 1.5%;

    display: flex;
    flex-direction: column;
}

.card .btn {
    padding: 10px;
    margin-top: auto;
}
```

---

### Lỗi 2: Muốn items nằm giữa cả ngang lẫn dọc trong container 100vh, nhưng item vẫn dính góc trái trên

### Nguyên nhân

Container có `display: flex` nhưng chưa có:
- `justify-content`
- `align-items`

nên mặc định item nằm ở góc trên bên trái.

### Code sửa

```css
.hero {
    height: 100vh;
    display: flex;

    justify-content: center;
    align-items: center;
}

.hero-content {
    text-align: center;
}
```

---

### Lỗi 3: Sidebar bị co lại khi content quá dài

### Nguyên nhân

Flexbox mặc định cho phép item co lại:

```css
flex-shrink: 1;
```

nên sidebar bị ép nhỏ khi content quá dài.

### Code sửa

```css
.layout {
    display: flex;
}

.sidebar {
    width: 250px;
    flex-shrink: 0;
}

.content {
    flex: 1;
}
```