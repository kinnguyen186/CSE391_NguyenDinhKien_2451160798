# TRACK A — Bootstrap 5

# PHẦN A — ĐỌC HIỂU (20đ)

# Câu A1 — Grid System

## HTML đề bài

```html
<div class="container">
    <div class="row">
        <div class="col-12 col-md-6 col-lg-3">Box 1</div>
        <div class="col-12 col-md-6 col-lg-3">Box 2</div>
        <div class="col-12 col-md-6 col-lg-3">Box 3</div>
        <div class="col-12 col-md-6 col-lg-3">Box 4</div>
    </div>
</div>
```

---

## Phân tích Grid Layout

Bootstrap Grid System hoạt động dựa trên hệ thống 12 cột.

Các class:

```html
col-12 col-md-6 col-lg-3
```

nghĩa là:

| Breakpoint | Kích thước | Số cột chiếm |
|---|---|---|
| Mobile | `<768px` | 12/12 |
| Tablet | `≥768px` | 6/12 |
| Desktop | `≥992px` | 3/12 |

---

## Mobile Layout (<768px)

Mỗi box chiếm toàn bộ chiều ngang.

```text
+-----------+
|   Box 1   |
+-----------+
|   Box 2   |
+-----------+
|   Box 3   |
+-----------+
|   Box 4   |
+-----------+
```

### Kết quả

- 1 cột
- 4 hàng
- Các box xếp dọc

---

## Tablet Layout (768px — 991px)

Mỗi box chiếm 6/12 cột = 50%.

```text
+-----------+-----------+
|   Box 1   |   Box 2   |
+-----------+-----------+
|   Box 3   |   Box 4   |
+-----------+-----------+
```

### Kết quả

- 2 cột
- 2 box mỗi hàng

---

## Desktop Layout (≥992px)

Mỗi box chiếm 3/12 cột = 25%.

```text
+-------+-------+-------+-------+
| Box 1 | Box 2 | Box 3 | Box 4 |
+-------+-------+-------+-------+
```

### Kết quả

- 4 cột
- Tất cả nằm trên cùng 1 hàng

---

## col-md-6 nghĩa là gì?

```html
col-md-6
```

### Giải thích

- `md` = breakpoint medium (`≥768px`)
- `6` = chiếm 6 trên tổng 12 cột

→ width = 50%.

Class này chỉ áp dụng từ tablet trở lên.

---

## Tại sao không cần viết col-sm-12?

Bootstrap sử dụng phương pháp Mobile-First.

```html
col-12
```

đã áp dụng mặc định cho mobile.

Khi màn hình lớn hơn, Bootstrap sẽ tự override bằng:

```html
col-md-6
col-lg-3
```

Do đó không cần viết thêm:

```html
col-sm-12
```

vì sẽ bị dư thừa.

---

# Câu A2 — Utilities & Components

# 1. d-none d-md-block

```html
<div class="d-none d-md-block">
```

## Ý nghĩa

| Class | Chức năng |
|---|---|
| d-none | display: none |
| d-md-block | từ md trở lên → display: block |

---

## Kết quả responsive

| Kích thước | Hiển thị |
|---|---|
| Mobile | Ẩn |
| Tablet | Hiện |
| Desktop | Hiện |

---

# 2. Spacing Utilities

Bootstrap cung cấp utility classes cho margin và padding.

Cú pháp:

```text
{property}{side}-{size}
```

Ví dụ:

| Class | Ý nghĩa |
|---|---|
| mt-3 | margin-top |
| mb-4 | margin-bottom |
| ms-2 | margin-left |
| px-4 | padding trái + phải |
| py-5 | padding trên + dưới |

---

## Ví dụ

### mt-3

```html
<div class="mt-3">
```

→ margin-top: 1rem

---

### px-4

```html
<div class="px-4">
```

→ padding-left + padding-right

---

### mb-auto

```html
<div class="mb-auto">
```

→ margin-bottom: auto

thường dùng với Flexbox để đẩy element.

---

# 3. container vs container-fluid vs container-md

## .container

```html
<div class="container">
```

### Đặc điểm

- Có max-width theo breakpoint
- Responsive
- Căn giữa màn hình

### Dùng khi

- Landing page
- Website thông thường

---

## .container-fluid

```html
<div class="container-fluid">
```

### Đặc điểm

- width: 100%
- Full màn hình

### Dùng khi

- Dashboard
- Banner
- Hero section

---

## .container-md

```html
<div class="container-md">
```

### Đặc điểm

- Mobile: full width
- Từ md trở lên: có max-width

### Dùng khi

- Muốn mobile full width nhưng tablet/desktop cố định

---

# PHẦN C — PHÂN TÍCH (20đ)

# Câu C1 — Tùy biến Bootstrap

## Đổi màu primary từ xanh sang #E63946

Bootstrap được viết bằng SCSS.

Màu chính của framework được quản lý bằng variables.

Ví dụ:

```scss
$primary: #E63946;
```

Sau khi thay đổi variable, cần compile lại Bootstrap để tạo file CSS mới.

---

## Quy trình thực hiện

### Bước 1 — Cài Node.js + Sass

```bash
npm install -g sass
```

---

### Bước 2 — Tạo file custom.scss

```scss
$primary: #E63946;

@import "bootstrap";
```

---

### Bước 3 — Compile

```bash
sass custom.scss custom.css
```

---

## Tại sao KHÔNG nên override trực tiếp?

```css
.btn-primary {
    background: red;
}
```

### Nhược điểm

- Chỉ sửa 1 component
- Không đồng bộ toàn framework
- Dễ bị Bootstrap override lại
- Khó maintain khi project lớn

---

## Ưu điểm của SASS variables

```scss
$primary: #E63946;
```

### Lợi ích

- Toàn bộ button, alert, badge, link đổi màu đồng bộ
- Dễ bảo trì
- Dễ mở rộng
- Đúng workflow của Bootstrap

---

# Câu C2 — Bootstrap vs CSS thuần

# Ví dụ CSS thuần

```css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card {
    border-radius: 12px;
    padding: 16px;
}
```

---

# Bootstrap version

```html
<nav class="navbar navbar-expand-lg">
```

```html
<div class="card shadow-sm rounded-3">
```

---

# So sánh

| Tiêu chí | Bootstrap | CSS thuần |
|---|---|---|
| Tốc độ phát triển | Rất nhanh | Chậm hơn |
| Responsive | Có sẵn | Tự viết |
| Số dòng CSS | Ít | Nhiều |
| Tính đồng bộ UI | Cao | Tùy người code |
| Tùy biến giao diện | Trung bình | Rất cao |
| Dễ maintain | Dễ với project vừa | Dễ rối nếu code kém |

---

# Khi NÊN dùng Bootstrap

- Làm trang quản trị (dashboard)
- Làm landing page bán hàng
- Làm website giới thiệu công ty
- Làm prototype/demo nhanh
- Deadline ngắn, cần code nhanh
- Dự án nhỏ hoặc vừa
- Team ít người
- Muốn có responsive sẵn mà không cần viết nhiều CSS
---

# Khi KHÔNG nên dùng Bootstrap

- Website cần thiết kế riêng độc quyền
- Website có animation hoặc hiệu ứng phức tạp
- Dự án cần tối ưu hiệu năng cao
- Muốn kiểm soát toàn bộ giao diện bằng CSS riêng
- Website có phong cách thiết kế quá khác Bootstrap
- Dự án lớn cần design system riêng
---

