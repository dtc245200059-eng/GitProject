# TechVanguard - Tạp Chí Công Nghệ & Tin Tức Tương Lai Số

Một trang web hiện đại, tối ưu hiệu năng cao và hiệu ứng hoạt ảnh mượt mà 60fps, bao gồm trang chủ (`index.html`) và chuyên trang tin tức (`news.html`), được xây dựng hoàn toàn bằng Semantic HTML5, Vanilla CSS hiện đại và Vanilla JavaScript (không phụ thuộc bất kỳ thư viện cồng kềnh nào).

---

## 🌟 Điểm Nổi Bật & Tính Năng

### 1. Thiết Kế Hiện Đại & Thẩm Mỹ Cao (Rich Aesthetics)
- **Giao diện vị lai (Futuristic Tech)**: Tông màu tối sâu (Deep Slate `#07090e`), phối cùng các dải gradient sống động (Electric Indigo `#6366f1`, Cyber Cyan `#06b6d4`, Neon Violet `#a855f7`).
- **Hiệu ứng Glassmorphism**: Sử dụng `backdrop-filter: blur(20px)` tinh tế trên thanh điều hướng (Sticky Header) và các thẻ bài viết.
- **Ánh sáng môi trường động (Ambient Mesh Glow)**: Các khối ánh sáng gradient mờ ảo phía nền chuyển động hữu cơ liên tục nhờ GPU acceleration (`@keyframes pulseMesh`).
- **Chế độ Sáng / Tối (Dark / Light Theme Toggle)**: Tự động nhận diện thiết lập hệ điều hành, cho phép chuyển đổi 1 chạm và lưu trạng thái vào `localStorage`.

### 2. Tối Ưu Hiệu Năng & Hoạt Ảnh 60fps (High Performance)
- **Zero Heavy Dependencies**: 100% Native HTML/CSS/JS, tải trang tức thì, kích thước gói tài nguyên cực kỳ gọn nhẹ.
- **Hardware-Accelerated Animation**: Chỉ kích hoạt chuyển động trên các thuộc tính `transform` và `opacity`, không gây giật lag hoặc kích hoạt reflow/paint nặng nề.
- **Rendering Virtualization Hint**: Áp dụng thuộc tính CSS hiện đại `content-visibility: auto` và `contain-intrinsic-size` cho các thẻ bài viết nằm ngoài màn hình hiển thị nhằm tối ưu chỉ số INP & LCP.
- **IntersectionObserver Entrance Reveals**: Hiệu ứng cuộn mượt mà; tự động hủy theo dõi phần tử (`unobserve`) ngay sau khi xuất hiện để giải phóng tài nguyên CPU.
- **Throttling cuộn trang**: Sử dụng `requestAnimationFrame` để đồng bộ thanh tiến độ đọc (`reading-progress-bar`) và hiệu ứng header nổi với tần số quét của màn hình.
- **Hỗ trợ Accessibility & Tiết kiệm tài nguyên**: Tự động vô hiệu hóa hoạt ảnh khi người dùng bật chế độ `prefers-reduced-motion: reduce`.

### 3. Cấu Trúc Các Trang

#### `index.html` (Trang chủ)
- **Thanh Tin Nóng (Breaking News Ticker)**: Chạy chữ marquee mượt mà, tự động tạm dừng khi rê chuột (`pause on hover`).
- **Hero Banner Đột Phá**: Tiêu đề gradient ấn tượng, các nút điều hướng Call to Action, số liệu thống kê trực tiếp (Live Stats) và hình ảnh đồ họa mô phỏng phòng lab AI thế hệ mới.
- **Bộ Lọc Nhanh Chủ Đề (Topic Chips)**: Cho phép chuyển nhanh đến các chuyên mục tin tức.
- **Tiêu Điểm Tuần (Spotlight Section)**: Bài phân tích chuyên sâu cỡ lớn với hình ảnh minh họa chất lượng cao.
- **Lưới Tin Mới Nhất**: Thẻ bài viết hiện đại kèm huy hiệu thể loại, thời gian đọc, nút bookmark lưu bài tương tác và hiệu ứng nâng thẻ 3D (`hover lift`).
- **Hộp Đăng Ký Bản Tin**: Kiểm tra tính hợp lệ và hiển thị Toast thông báo tương tác tức thì.

#### `news.html` (Chuyên trang Tin tức & Phân tích)
- **Thanh Tìm Kiếm Trực Tiếp (Live Search Bar)**: Lọc bài viết ngay khi gõ từ khóa (có xử lý debounce chống giật).
- **Tab Lọc Chuyên Mục Tương Tác**: Lọc theo *Tất cả*, *Trí tuệ nhân tạo (AI)*, *Phần cứng & Chip*, *An ninh mạng*, *Lập trình & Dev* mà không cần tải lại trang. Hỗ trợ liên kết trực tiếp qua URL parameter (ví dụ: `news.html?cat=ai`).
- **Nút Lưu Bài Viết (Interactive Bookmark)**: Chuyển đổi trạng thái lưu và bật thông báo Toast trực quan.
- **Thanh Bên Tương Tác (Sidebar)**:
  - Danh sách Top 5 bài viết đọc nhiều nhất trong tuần xếp hạng 01 - 05.
  - Thăm dò ý kiến độc giả (Interactive Reader Poll): Bấm bình chọn để xem hoạt ảnh thanh phần trăm chạy mượt mà theo thời gian thực.
  - Đám mây từ khóa (Tags Cloud) thịnh hành.
  - Widget đăng ký nhanh bản tin tuần.

---

## 📁 Cấu Trúc Thư Mục Dự Án

```
d:\GitProject/
├── index.html              # Trang chủ TechVanguard
├── news.html               # Chuyên trang tin tức và phân tích chuyên sâu
├── css/
│   └── style.css           # Toàn bộ Design System, Tokens, Animations & Media Queries
├── js/
│   └── main.js             # Logic xử lý Theme, Filter, Search, Poll, Bookmarks & Toast
├── assets/
│   └── images/
│       ├── hero.jpg        # Đồ họa mô phỏng AI & Neural Network tương lai
│       ├── news-ai.jpg     # Ảnh phân tích Robot hình người và AI Agents
│       ├── news-cyber.jpg  # Ảnh chuyên đề an ninh mạng & mã hóa
│       └── news-quantum.jpg# Ảnh chip bán dẫn & vi mạch lượng tử
└── README.md               # Tài liệu hướng dẫn dự án
```

---

## 🚀 Hướng Dẫn Chạy Trang Web Trên Máy Cục Bộ

Trang web là thuần tĩnh (Static Web), bạn có thể mở và trải nghiệm bằng bất kỳ cách nào dưới đây:

### Cách 1: Mở trực tiếp trong trình duyệt
Chỉ cần nhấp đúp chuột vào file `index.html` hoặc `news.html` trên máy tính để mở trực tiếp trong Chrome, Edge, Firefox, v.v.

### Cách 2: Chạy qua Local HTTP Server (Được khuyến nghị)
Sử dụng Python có sẵn trên máy:
```bash
python -m http.server 8080
```
Sau đó truy cập trên trình duyệt theo địa chỉ:
- Trang chủ: [http://localhost:8080/index.html](http://localhost:8080/index.html)
- Trang tin tức: [http://localhost:8080/news.html](http://localhost:8080/news.html)
- Lọc trực tiếp chuyên mục AI: [http://localhost:8080/news.html?cat=ai](http://localhost:8080/news.html?cat=ai)

---

## 🎨 Chuẩn SEO & Trợ Năng (Accessibility)
- Đầy đủ thẻ Meta Title, Meta Description, Thẻ OpenGraph cho mạng xã hội.
- Cấu trúc tiêu đề ngữ nghĩa chuẩn: một thẻ `<h1>` duy nhất trên mỗi trang, phân cấp `<h2>` và `<h3>` rõ ràng.
- Liên kết bỏ qua nhanh (`Skip to content`) dành cho người dùng dùng phím hoặc bộ đọc màn hình.
- Độ tương phản màu đạt chuẩn WCAG AA trên cả hai giao diện Sáng và Tối.