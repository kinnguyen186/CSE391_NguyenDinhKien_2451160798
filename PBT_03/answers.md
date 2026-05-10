# Phần A: Kiểm tra đọc hiểu

## Câu A1 — 3 Cách nhúng CSS

1. Inline CSS

Viết trực tiếp vào thuộc tính `style` của từng thẻ HTML

```html
<h1 style="color: red; font-size: 24px; text-align: center;">Tiêu đề trang</h1>
<p style="color: #555; margin-bottom: 8px;">Đoạn văn bản mô tả</p>
```

Ưu điểm

- Áp dụng ngay, không cần file ngoài
- Ưu tiên cao nhất — ghi đè tất cả CSS khác
- Tiện cho debug nhanh hoặc test một thuộc tính cụ thể

Nhược điểm

- Không thể tái sử dụng — muốn style 10 thẻ `<h1>` phải copy 10 lần
- Trộn lẫn HTML (cấu trúc) và CSS (trình bày) — vi phạm nguyên tắc tách biệt
- Khó bảo trì: thay đổi màu sắc phải sửa từng thẻ một
- Không hỗ trợ pseudo-class như `:hover`, `:focus`

Nên dùng khi

- Debug nhanh để kiểm tra một thuộc tính
- Override tạm thời một style cụ thể
- Email HTML (vì email client thường không hỗ trợ `<style>` hoặc file ngoài)

2. Internal CSS

Viết CSS trong thẻ `<style>` bên trong phần `<head>` của file HTML.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      h1 {
        color: #2563eb;
        font-size: 32px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <h1>Tiêu đề trang</h1>
    <button class="btn">Bấm vào đây</button>
  </body>
</html>
```

Ưu điểm

- Không cần file CSS riêng — gọn gàng cho file HTML đơn lẻ
- Có thể dùng selector, pseudo-class (`:hover`, `:focus`)
- Style tập trung ở một chỗ trong file — dễ đọc hơn inline

Nhược điểm

- Không tái sử dụng được giữa nhiều trang — mỗi trang phải copy lại toàn bộ `<style>`
- File HTML phình to khi CSS nhiều
- Trình duyệt phải tải lại CSS mỗi lần reload trang (không cache được)

Nên dùng khi

- Prototype, demo nhanh một trang đơn lẻ
- Email HTML phức tạp (kết hợp với inline)
- Các trang landing page một-trang không cần chia sẻ style

3. External CSS

Viết CSS trong một file `.css` riêng biệt, sau đó liên kết vào HTML bằng thẻ `<link>`.

File `index.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1>Tiêu đề trang</h1>
    <button class="btn">Bấm vào đây</button>
  </body>
</html>
```

File `styles.css`:

```css
h1 {
  color: #2563eb;
  font-size: 32px;
  text-align: center;
}
```

Ưu điểm

- Tái sử dụng: 100 trang HTML dùng chung 1 file CSS
- Bảo trì dễ: Đổi màu thương hiệu → sửa 1 chỗ, áp dụng toàn bộ website
- Tách biệt rõ ràng: HTML lo cấu trúc, CSS lo trình bày
- Hiệu năng: Trình duyệt cache file CSS — tải trang thứ 2 nhanh hơn nhiều
- Teamwork: Frontend dev và designer có thể làm việc song song

Nhược điểm

- Cần thêm một HTTP request để tải file CSS (nhỏ, không đáng kể)
- Phải quản lý thêm file trong project

Nên dùng khi

- Mọi dự án thực tế — từ website nhỏ đến ứng dụng lớn
- Bất kỳ khi nào có từ 2 trang HTML trở lên

_Inline CSS thắng vì trình duyệt áp dụng thứ tự ưu tiên (cascade) như sau:
!important → Inline → Internal/External (sau ghi đè trước nếu cùng specificity).
Inline có specificity (1,0,0,0) — cao hơn bất kỳ class hay tag selector nào.
Ngoại lệ: nếu internal/external CSS dùng !important, nó sẽ thắng cả inline_

## Câu A2— CSS Selectors — Dự đoán kết quả

1. `h1`

- Chọn: `ShopTLU` nhắm tất cả thẻ `<h1>` trên trang — chỉ có 1 thẻ duy nhất.

2. `.price`

- Chọn: `25.990.000đ` và `45.990.000đ` nhắm tất cả element có `class="price"` — có 2 thẻ `<p class="price">` trong 2 article.

3. `#app header`

- Chọn: Toàn bộ thẻ `<header class="top-bar dark">` (bao gồm "ShopTLU" và nav bên trong) tìm `<header>` nằm ở bất kỳ cấp nào bên trong `#app`.

4. `nav a:first-child`

- Chọn: `Home` `:first-child` chọn thẻ `<a>` đầu tiên trong `<nav>` — là link `href="/"` có text "Home".

5. `.product.featured h2`

- Chọn: `MacBook Pro` element phải có đồng thời cả hai class `.product` và `.featured`. iPhone chỉ có `.product` nên bị loại. Chỉ MacBook thỏa mãn → tìm `<h2>` bên trong → "MacBook Pro".

6. `article > p`

- Chọn: `25.990.000đ`, `Mô tả sản phẩm...` (iPhone), `45.990.000đ`, `Mô tả sản phẩm...` (MacBook) — tổng 4 thẻ `<p>` `>` chỉ chọn `<p>` là con trực tiếp của `<article>`. Mỗi article có 2 thẻ `<p>` trực tiếp.

7. `a[href="/"]`

- Chọn: `Home` chỉ nhắm đúng thẻ `<a>` có `href` bằng chính xác `"/"`. Các link `/products` và `/about` không thỏa mãn.

8. `.top-bar.dark h1`

- Chọn: `ShopTLU` element phải có đồng thời cả class `.top-bar` lẫn `.dark` — header thỏa mãn → tìm `<h1>` bên trong → "ShopTLU".

## Câu A3 — Box Model — Tính toán kích thước

1. Trường hợp 1: content-box (mặc định)

```css
.box-1 {
  width: 400px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
}
```

- Chiều rộng hiển thị = width + padding×2 + border×2 = 400 + (20×2) + (5×2) = 450px
- Không gian chiếm trên trang = chiều rộng hiển thị + margin×2 = 450 + (10×2) = 470px

2. Trường hợp 2: border-box

```css
.box-2 {
  box-sizing: border-box;
  width: 400px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
}
```

- Chiều rộng hiển thị = 400px
- Kích thước content thực tế = width - padding×2 - border×2 = 400 - (20x2) - (5x2) = 350px
- Không gian chiếm trên trang = 400 + (10x2) = 420px

3. Trường hợp 3: Margin collapse

```css
.box-a {
  margin-bottom: 25px;
}
.box-b {
  margin-top: 40px;
}
```

- Khoảng cách giữa box-a và box-b = **40px**
- Không phải 65px vì đây là hiện tượng margin collapse: khi hai block element nằm chồng dọc, margin của chúng không cộng dồn mà gộp làm một, lấy giá trị lớn hơn. CSS lấy max(25, 40) = 40px.

4. Nâng cao: Negative margin

```css
.box-a {
  margin-bottom: -10px;
}
.box-b {
  margin-top: 40px;
}
```

- Khoảng cách = 30px
- Khi có negative margin, quy tắc collapse vẫn áp dụng nhưng theo cách: lấy giá trị dương lớn nhất (40px) rồi cộng với giá trị âm lớn nhất (-10px) = 40 + (-10) = 30px

## Câu A4 — Specificity (Độ ưu tiên)

1. Tính specificity score (a, b, c) cho mỗi rule

- `p` → tag = 1 → (0, 0, 1)
- `.price` → class = 1 → (0, 1, 0)
- `#main-price` → ID = 1 → (1, 0, 0)
- `p.price` → tag(1) + class(1) → (0, 1, 1)

2. Element sẽ có màu gì? Giải thích

- Element sẽ có màu đỏ do Specificity của `#main-price` là cao nhất nên thắng tất cả

3. Nếu thêm `<p class="price" id="main-price" style="color: orange;">`, element có màu gì?

- Element sẽ có màu cam do Specificity của `#style="color: orange` là (1,0,0,0) nên thắng tất cả

4. Nếu Rule A thêm `!important`, element có màu gì? Tại sao?

- Element sẽ có màu đen do `!important` có specificity vô cực — phá vỡ toàn bộ quy tắc thông thường

# Phần B: Thực hành Code

## Bài B1 — Style trang Profile

- 5 loại selector có trong file `style.css`

1. Loại element: `body`, `header`, `table`, `footer`
2. Loại class: `nav a.active`
3. Loại id: `#about_me`, `#contact a`
4. Loại descendant: `nav a`, `thead th`, `tbody td`, `#about_me p`
5. Loại pseudo-class: `nav a:hover`, `tbody tr:nth-child(even)`, `tbody tr:hover`, `#contact a:hover`

## Bài B2 — Box Model Lab

1. Phần 1 — content-box vs border-box

- Hộp 1 (content-box): chiều rộng thực tế = 350px (đo từ DevTools)
- Hộp 2 (border-box): chiều rộng thực tế = 300px (đo từ DevTools)

Giải thích sự khác biệt:

- Hộp 1 dùng content-box (mặc định): width: 300px chỉ tính phần content. Padding và border được cộng thêm ra ngoài → chiều rộng thực tế = 300 + 20×2 + 5×2 = 350px.
- Hộp 2 dùng border-box: width: 300px là tổng kích thước bao gồm cả padding và border. Chúng co vào trong → chiều rộng thực tế luôn đúng 300px.

2. Phần 2 — Layout 3 cột

Trường hợp KHÔNG dùng border-box (content-box):

- Cột trái: 250 + 15×2 = 280px
- Cột giữa: 500 + 20×2 = 540px
- Cột phải: 250 + 15×2 = 280px
- Tổng = 280 + 540 + 280 = 1100px → vượt quá container 1000px → layout vỡ

Trường hợp CÓ dùng border-box:

- Cột trái: đúng 250px
- Cột giữa: đúng 500px
- Cột phải: đúng 250px
- Tổng = 250 + 500 + 250 = 1000px → vừa khít container → layout đúng

## Bài B3 — Specificity Battle

1. Liệt kê 10 rules + specificity score

- `p { color: gray; }` - Specificity: (0, 0, 1)
- `html p { color: sienna; }` - Specificity: (0, 0, 2)
- `.text { color: blue; }` - Specificity: (0, 1, 0)
- `p.text { color: green; }` - Specificity: (0, 1, 1)
- `.text.highlight { color: orange; }` - Specificity: (0, 2, 0)
- `p.text.highlight { color: purple; }` - Specificity: (0, 2, 1)
- `#demo { color: crimson; }` - Specificity: (1, 0, 0)
- `p#demo { color: deeppink; }` - Specificity: (1, 0, 1)
- `#demo.text { color: darkorange; }` - Specificity: (1, 1, 0)
- `p#demo.text.highlight { color: brown; }` - Specificity: (1, 2, 1) ← THẮNG!

2. Element cuối cùng hiển thị màu gì? Tại sao?

Màu: `brown` — do Rule 10 có selector `p#demo.text.highlight` với specificity cao nhất.

Tính theo hệ 3 cột (ID, Class, Tag):

- `p` → tag → cột Tag +1 → (0, 0, 1)
- `#demo` → ID → cột ID +1 → (1, 0, 0)
- `.text` → class → cột Class +1 → (0, 1, 0)
- `.highlight` → class → cột Class +1 → (0, 1, 0)
- Tổng: (1, 2, 1)

So sánh với tất cả rules còn lại từ cột trái sang phải — Rule 10 có cột ID = 1,
trong khi Rules 1–6 có cột ID = 0 nên thua ngay. Rules 7–9 tuy cùng cột ID = 1
nhưng cột Class thấp hơn (tối đa 1, trong khi Rule 10 có 2) → Rule 10 thắng tất cả.

3. Thay đổi thứ tự rules trong CSS — Kết quả có đổi không?

- Không đổi.
- Khi các rules có specificity khác nhau, thứ tự viết trong file CSS không ảnh hưởng. Rule có specificity cao hơn luôn thắng dù viết trước hay sau.
- Thứ tự chỉ quan trọng khi 2 rules có specificity bằng nhau — lúc đó rule viết sau thắng (cascade). Ví dụ nếu có 2 rule cùng specificity 121, rule nào đứng sau trong file CSS sẽ được áp dụng.

# Phần C: Debug & Suy luận

## Câu C1 — Debug CSS Layout

1. Chiều rộng thực tế (content-box)

- Sidebar: 300 + 20×2 + 1×2 = 342px
- Content: 660 + 30×2 + 1×2 = 722px
- Tổng: 342 + 722 = 1064px

2. Tại sao layout bị vỡ?

Container chỉ rộng 960px nhưng tổng 2 cột là 1064px — vượt quá 104px. Vì đang dùng content-box (mặc định), padding và border được cộng thêm ra ngoài width, làm 2 cột phình to hơn dự tính. Không đủ chỗ → content bị đẩy xuống dòng mới.

3. Hai cách sửa

### Cách 1: Dùng border-box

Thêm `box-sizing: border-box` vào cả sidebar và content. Padding và border sẽ co vào trong, width giữ đúng như đặt → tổng = 300 + 660 = 960px, vừa khít container.

```css
.sidebar {
  box-sizing: border-box;
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  float: left;
}

.content {
  box-sizing: border-box;
  width: 660px;
  padding: 30px;
  border: 1px solid #ccc;
  float: left;
}
```

### Cách 2: Tự trừ padding + border khỏi width (không dùng border-box)

Tính ngược lại width cần khai báo để chiều rộng thực tế vừa khít 960px.

- Sidebar muốn chiều rộng thực tế = 300px → width khai báo = 300 - 20×2 - 1×2 = 258px
- Content muốn chiều rộng thực tế = 660px → width khai báo = 660 - 30×2 - 1×2 = 598px
- Kiểm tra: (258 + 40 + 2) + (598 + 60 + 2) = 300 + 660 = 960px ✓

```css
.sidebar {
  width: 258px;
  padding: 20px;
  border: 1px solid #ccc;
  float: left;
}

.content {
  width: 598px;
  padding: 30px;
  border: 1px solid #ccc;
  float: left;
}
```

## Câu C2 — Cascade Puzzle

1. "Sản phẩm A" — h2.title.highlight trong #featured.card

### font-size = 20px

_Các rules liên quan:_

- `body` → font-size: 16px — specificity: (0, 0, 1)
- `.container` → font-size: 14px — specificity: (0, 1, 0)
- `.card .title` → font-size: 20px — specificity: (0, 2, 0) ← THẮNG

_.card .title có specificity cao nhất trong các rules về font-size → font-size = 20px_

### color = green

_Các rules liên quan:_

- `.card` → color: blue — specificity: (0, 1, 0)
- `#featured .title` → color: red — specificity: (1, 1, 0)
- `.highlight` → color: green !important ← THẮNG

_!important phá vỡ mọi quy tắc specificity, kể cả ID selector → color = green_

2. "Mô tả sản phẩm" — p trong #featured.card

### color = blue

_Các rules liên quan:_

- `body` → color: #333 — specificity: (0, 0, 1)
- `.card` → color: blue — specificity: (0, 1, 0)
- `.card p` → color: inherit — specificity: (0, 1, 1) ← THẮNG về specificity

_.card p có specificity cao nhất → áp dụng color: inherit._

3. "Sản phẩm B" — h2.title trong .card thứ 2 (không có id)

### font-size = 20px

_Chỉ có 1 rule liên quan đến font-size:_

- `.card .title` → font-size: 20px — specificity: (0, 2, 0) ← áp dụng

_→ font-size = 20px_

### color = blue

_Các rules liên quan:_

- `.card` → color: blue — specificity: (0, 1, 0) ← THẮNG
- `#featured .title` → color: red — specificity: (1, 1, 0), nhưng rule này chỉ target #featured, h2 này không có id featured nên không áp dụng

_Chỉ còn .card với color: blue → color = blue_

4. "Mô tả sản phẩm B" — p.highlight trong .card thứ 2

### color = green

_Các rules liên quan:_

- `.card` → color: blue — specificity: (0, 1, 0)
- `.card p` → color: inherit — specificity: (0, 1, 1)
- `.highlight` → color: green !important ← THẮNG

_!important thắng tất cả → color = green_

