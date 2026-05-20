# PHẦN A — KIỂM TRA ĐỌC HIỂU (20đ)

# Câu A1 — Viewport & Mobile-First

## 1. Thẻ <meta viewport> chuẩn

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

- width=device-width
  → Chiều rộng website bằng chiều rộng thiết bị.

- initial-scale=1.0
  → Mức zoom mặc định ban đầu là 100%.

---

## 2. Nếu thiếu thẻ viewport?

- Trình duyệt mobile sẽ giả lập website desktop (~980px)
- Tự động thu nhỏ trang
- Chữ rất bé
- Responsive bị lỗi
- Người dùng phải zoom để đọc

---

## 3. Mobile-First và Desktop-First

### Mobile-First

- CSS mặc định cho mobile
- Dùng min-width
- Thiết kế từ nhỏ → lớn

```css
/* Mobile */
.container {
    width: 100%;
}

/* Tablet trở lên */
@media (min-width: 768px) {

    .container {
        width: 750px;
    }
}
```

### Desktop-First

- CSS mặc định cho desktop
- Dùng max-width
- Thiết kế từ lớn → nhỏ

```css
/* Desktop */
.container {
    width: 1200px;
}

/* Tablet + Mobile */
@media (max-width: 768px) {

    .container {
        width: 100%;
    }
}
```

### Tại sao Mobile-First được khuyên dùng?

- Mobile là thiết bị phổ biến nhất
- CSS ngắn gọn hơn
- Responsive dễ mở rộng
- Tăng hiệu năng
- Google ưu tiên Mobile-First Indexing

---

# Câu A2 — Breakpoints

- <576px
  - Điện thoại nhỏ
  - Product grid: 1 cột

- ≥576px
  - Điện thoại lớn
  - Product grid: 1–2 cột

- ≥768px
  - Tablet
  - Product grid: 2 cột

- ≥992px
  - Laptop
  - Product grid: 3 cột

- ≥1200px
  - Desktop
  - Product grid: 4 cột

- ≥1400px
  - Màn hình lớn
  - Product grid: 5–6 cột

---

# Câu A3 — Media Queries

## CSS đề bài

```css
.container {
    width: 100%;
    padding: 10px;
}

@media (min-width: 576px) {

    .container {
        width: 540px;
    }
}

@media (min-width: 768px) {

    .container {
        width: 720px;
    }
}

@media (min-width: 992px) {

    .container {
        width: 960px;
    }
}

@media (min-width: 1200px) {

    .container {
        width: 1140px;
    }
}
```

## Kết quả

- 375px (iPhone SE)
  → width = 100%

- 600px
  → width = 540px

- 800px
  → width = 720px

- 1000px
  → width = 960px

- 1400px
  → width = 1140px

---

# Câu A4 — SCSS Basics

## 1. Variables

```scss
$primary-color: #3498db;

button {
    background: $primary-color;
}
```

Variables dùng để lưu giá trị và tái sử dụng nhiều lần trong SCSS.

---

## 2. Nesting

```scss
.navbar {

    background: black;

    ul {
        display: flex;
    }

    li {
        list-style: none;
    }
}
```

Nesting cho phép viết CSS lồng nhau giống cấu trúc HTML.

---

## 3. Mixins

```scss
@mixin flex-center {

    display: flex;
    justify-content: center;
    align-items: center;
}

.box {
    @include flex-center;
}
```

Mixins giúp tái sử dụng nhiều đoạn CSS mà không cần viết lại.

---

## 4. @extend / Inheritance

```scss
.btn {
    padding: 10px;
}

.btn-primary {

    @extend .btn;
    background: blue;
}
```

@extend cho phép class kế thừa CSS từ class khác.

---

## 5. Vì sao trình duyệt không đọc được SCSS?

- SCSS không phải CSS chuẩn
- Trình duyệt chỉ đọc file .css
- Cần compile SCSS → CSS bằng Sass Compiler

## Lệnh compile

```bash
sass style.scss style.css
```
# Phần B: Thực hành code

## Bài B3 — SCSS Refactor

- Lệnh compile SCSS → CSS

```bash
# Cài sass (chưa có)
npm install -g sass

# Compile file style.scss ra style-compiled.css
sass scss/style.scss style-compiled.css

# Hoặc watch (tự compile khi lưu)
sass --watch scss/style.scss style-compiled.css

# Với VS Code: cài extension "Live Sass Compiler" → click "Watch Sass"
```
# PHẦN C — PHÂN TÍCH (20đ)

# Câu C1 — Phân tích website thực

## Website chọn: YouTube

---

## Mobile (375px)

- Navigation:
  - Có hamburger menu ☰
  - Search bar thu nhỏ
  - Bottom navigation xuất hiện

- Content Grid:
  - Video hiển thị 1 cột

- Elements bị ẩn:
  - Sidebar đầy đủ
  - Một số nút chức năng phụ

- Font Size:
  - Font nhỏ hơn desktop

---

## Tablet (768px)

- Navigation:
  - Sidebar thu gọn dạng icon
  - Search bar dài hơn

- Content Grid:
  - Video grid khoảng 2–3 cột

- Elements:
  - Một số menu được hiện lại

---

## Desktop (1440px)

- Navigation:
  - Sidebar đầy đủ
  - Navigation ngang hoàn chỉnh

- Content Grid:
  - Video grid khoảng 4–6 cột

- Font Size:
  - Font lớn hơn mobile

---

## Media Queries tìm được

```css
@media (max-width: 768px)
```

```css
@media (min-width: 1200px)
```

---

# Câu C2 — Responsive Strategy

## Mobile Wireframe

```text
┌──────────────────────────┐
│ ☰ LOGO            📞    │
├──────────────────────────┤
│                          │
│        HERO BANNER       │
│                          │
├──────────────────────────┤
│      [ MON AN 1 ]        │
├──────────────────────────┤
│      [ MON AN 2 ]        │
├──────────────────────────┤
│      [ MON AN 3 ]        │
├──────────────────────────┤
│      [ MON AN 4 ]        │
├──────────────────────────┤
│      [ MON AN 5 ]        │
├──────────────────────────┤
│      [ MON AN 6 ]        │
├──────────────────────────┤
│      THONG TIN DAT BAN   │
│  ----------------------  │
│  Ngay                    │
│  Gio                     │
│  So nguoi                │
│  Ghi chu                 │
│                          │
│   [ GUI YEU CAU ]        │
├──────────────────────────┤
│       GOOGLE MAP         │
├──────────────────────────┤
│         FOOTER           │
└──────────────────────────┘
```
- Navigation thu gọn thành hamburger
- Gallery hiển thị 1 cột
- Form đặt bàn nằm dưới gallery
- Sidebar bị ẩn hoàn toàn
- Chỉ hiện icon điện thoại

---

## Tablet Wireframe

```text
┌──────────────────────────────────┐
│ LOGO              📞 0901234567 │
├──────────────────────────────────┤
│                                  │
│           HERO BANNER            │
│                                  │
├────────────────┬─────────────────┤
│    MON AN 1    │    MON AN 2     │
├────────────────┼─────────────────┤
│    MON AN 3    │    MON AN 4     │
├────────────────┼─────────────────┤
│    MON AN 5    │    MON AN 6     │
├────────────────┴─────────────────┤
│                                  │
│ FORM DAT BAN     |   GOOGLE MAP  │
│                                  │
├──────────────────────────────────┤
│              FOOTER              │
└──────────────────────────────────┘
```

- Gallery chuyển sang 2 cột
- Form và Maps bắt đầu nằm cạnh nhau
- Header mở rộng hơn mobile
- Hiển thị đầy đủ số điện thoại

---

## Desktop Wireframe


```text
┌────────────────────────────────────────────────────────────┐
│ LOGO   HOME   MENU   DAT BAN        📞 0901234567         │
├────────────────────────────────────────────────────────────┤
│                                                            │
│                     HERO BANNER                            │
│                                                            │
├───────────────────────────────────────────────┬────────────┤
│                                               │            │
│   [1]        [2]        [3]                   │ THONG TIN  │
│                                               │ NHA HANG   │
│   [4]        [5]        [6]                   │            │
│                                               │ Gio mo cua │
│                                               │ Danh gia   │
├──────────────────────────────┬────────────────┤            │
│                              │                │            │
│       FORM DAT BAN           │  GOOGLE MAPS   │            │
│                              │                │            │
├──────────────────────────────┴────────────────┴────────────┤
│ Footer | Contact | Facebook | Instagram | ©2025           │
└────────────────────────────────────────────────────────────┘
```

- Navigation hiển thị đầy đủ
- Gallery hiển thị 3 cột
- Sidebar thông tin xuất hiện
- Form và Google Maps nằm ngang
- Footer chia nhiều khu vực

---

## CSS Skeleton

```css
/* MOBILE FIRST */

.container {
    display: grid;
    gap: 20px;
    padding: 16px;
}

/* HEADER */

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* HERO */

.hero {
    width: 100%;
    min-height: 250px;
}

/* FOOD GALLERY */

.gallery {

    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
}

/* BOOKING + MAP */

.booking-section {

    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
}

/* SIDEBAR */

.sidebar {
    display: none;
}

/* FOOTER */

.footer {
    text-align: center;
    padding: 20px;
}

/* TABLET */

@media (min-width: 768px) {

    .gallery {

        grid-template-columns: repeat(2, 1fr);
    }

    .booking-section {

        grid-template-columns: 1fr 1fr;
    }
}

/* DESKTOP */

@media (min-width: 1024px) {

    .main-layout {

        display: grid;
        grid-template-columns: 3fr 1fr;
        gap: 32px;
    }

    .gallery {

        grid-template-columns: repeat(3, 1fr);
    }

    .sidebar {
        display: block;
    }

    .header nav {
        display: flex;
        gap: 24px;
    }

    .booking-form-row {

        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
    }
}
```