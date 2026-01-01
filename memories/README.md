# 📸 Thư mục Ảnh Kỷ Niệm

Đặt các ảnh kỷ niệm của bạn vào các thư mục con trong thư mục này. Mỗi thư mục con là một **Album** riêng biệt sẽ hiển thị với carousel ảnh.

## 🖼️ Hướng dẫn Tổ Chức:

### 1. **Cách Đặt Tên Thư Mục Con** (Rất Quan Trọng!)

Mỗi album **PHẢI** tuân theo pattern này:

```
{số}-{tên-album}/
```

**Ví dụ:**

-   `01-ngay-gap-dau/` → Hiển thị "Ngay Gap Dau"
-   `02-chu-ky-1-nam/` → Hiển thị "Chu Ky 1 Nam"
-   `03-chuyen-di-du-lich/` → Hiển thị "Chuyen Di Du Lich"
-   `04-ngoai-tro/` → Hiển thị "Ngoai Tro"
-   `05-ky-niem-dac-biet/` → Hiển thị "Ky Niem Dac Biet"

⚠️ **Lưu ý:** Số ở đầu (01, 02, 03...) quyết định thứ tự hiển thị!

### 2. **Đặt Ảnh Vào Thư Mục**

Sau khi tạo thư mục con, hãy copy ảnh vào:

```
memories/
├── 01-ngay-gap-dau/
│   ├── 01.jpg
│   ├── 02.jpg
│   ├── 03.jpg
│   └── 04.jpg
├── 02-chu-ky-1-nam/
│   ├── 01.jpg
│   ├── 02.jpg
│   └── 03.jpg
├── 03-chuyen-di-du-lich/
│   ├── 01.jpg
│   ├── 02.jpg
│   ├── 03.jpg
│   └── 04.jpg
└── README.md
```

### 3. **Định Dạng Ảnh Được Hỗ Trợ:**

-   JPG/JPEG ✅
-   PNG ✅
-   WebP ✅

### 4. **Cách Đặt Tên Ảnh Bên Trong Thư Mục:**

-   `01.jpg`, `02.jpg`, `03.jpg` (khuyến khích - dễ sắp xếp)
-   Hoặc tên bất kỳ, miễn sao có định dạng ảnh được hỗ trợ

## 💡 Lưu Ý Quan Trọng:

✅ **Những gì trang sẽ làm:**

-   Tự động quét các thư mục `01-`, `02-`, `03-`, v.v.
-   Load ảnh từ mỗi thư mục
-   Tạo carousel ảnh cho mỗi album
-   Hiển thị tên album là title của section

❌ **Những gì sẽ BỊ LOẠI BỎ:**

-   Thư mục không theo pattern `{số}-{tên}/` sẽ bị bỏ qua
-   Thư mục không có ảnh sẽ KHÔNG hiển thị (ẩn tự động)
-   File không phải ảnh sẽ bị bỏ qua

## 🎨 Gợi Ý Thiết Kế:

-   **Kích thước ảnh:** Tối thiểu 300x300px (càng lớn càng tốt)
-   **Tỷ lệ ảnh:** Vuông (1:1) sẽ hiển thị đẹp nhất
-   **Số lượng ảnh mỗi album:** 3-8 ảnh là lý tưởng
-   **Kích thước file:** Nên optimize ảnh để tải nhanh

## 📝 Ví Dụ Hoàn Chỉnh:

```
memories/
├── 01-ngay-gap-dau/
│   ├── 01.jpg (ngày đầu tiên gặp nhau)
│   ├── 02.jpg (tại quán cà phê)
│   └── 03.jpg (lần chụp chung đầu tiên)
├── 02-chu-ky-1-nam/
│   ├── 01.jpg (đi ăn cơm)
│   ├── 02.jpg (quà kỷ niệm)
│   └── 03.jpg (chúc mừng)
├── 03-chuyen-di-da-lat/
│   ├── 01.jpg (lên núi)
│   ├── 02.jpg (tại chợ đêm)
│   └── 03.jpg (hoàng hôn)
└── README.md (file này)
```

✨ **Trang sẽ tự động:**

1. Phát hiện 3 album (01, 02, 03)
2. Load ảnh từ mỗi album
3. Hiển thị 3 section carousel, mỗi cái là một album
4. Giấu bất kỳ thư mục nào không có ảnh

---

**Bắt đầu tạo thư mục con và thêm ảnh để xem kỷ niệm của bạn hiển thị trên trang nhé! 💕**
