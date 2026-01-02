// Tạo trái tim rơi
function createFallingHearts() {
    const heartsContainer = document.querySelector(".hearts");
    setInterval(() => {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.textContent = "❤️";
        heart.style.left = Math.random() * 100 + "%";
        heart.style.animationDuration = Math.random() * 3 + 3 + "s";
        heart.style.fontSize = Math.random() * 1 + 1.5 + "rem";
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 6000);
    }, 500);
}

// Load ảnh từ thư mục memories - Single Album
let memoryPhotos = [];
let currentPhotoIndex = 0;

// Danh sách ảnh đã biết trước để tránh request thừa
const KNOWN_PHOTOS = [
    "memories/01.jpg",
    "memories/02.jpg",
    "memories/03.jpg",
    "memories/04.jpg",
    "memories/05.jpg",
    "memories/06.jpg",
    "memories/07.jpg",
    "memories/08.jpg",
    "memories/09.jpg"
];

function loadMemoryPhotos() {
    const albumContainer = document.getElementById("memories-album");
    const memoriesSection = albumContainer.parentElement;
    
    // Sử dụng danh sách ảnh đã biết
    memoryPhotos = KNOWN_PHOTOS;
    currentPhotoIndex = 0;
    
    if (memoryPhotos.length > 0) {
        // Preload ảnh đầu tiên và các ảnh tiếp theo
        preloadImages(memoryPhotos);
        
        // Render album
        const albumSection = createAlbumSection(memoryPhotos);
        albumContainer.appendChild(albumSection);
        memoriesSection.style.display = "block";
    } else {
        memoriesSection.style.display = "none";
    }
}

// Preload ảnh để chuyển ảnh mượt hơn
function preloadImages(photos) {
    photos.forEach((src, index) => {
        const img = new Image();
        // Ưu tiên load 3 ảnh đầu tiên
        if (index < 3) {
            img.loading = "eager";
        }
        img.src = src;
    });
}

function createAlbumSection(photos) {
    const section = document.createElement("div");
    section.className = "album-section";

    // Nếu không có ảnh, ẩn section
    if (photos.length === 0) {
        section.classList.add("hidden");
        return section;
    }

    // Carousel wrapper
    const carouselWrapper = document.createElement("div");
    carouselWrapper.className = "carousel-wrapper";

    // Nút previous
    const prevBtn = document.createElement("button");
    prevBtn.className = "carousel-btn carousel-prev";
    prevBtn.innerHTML = "❮";
    prevBtn.addEventListener("click", () => previousPhoto());

    // Container ảnh
    const carouselContainer = document.createElement("div");
    carouselContainer.className = "carousel-container";

    const carouselImage = document.createElement("img");
    carouselImage.id = "carousel-image";
    carouselImage.className = "carousel-image";
    carouselImage.src = photos[0];
    carouselImage.alt = "Ảnh kỷ niệm";
    carouselImage.loading = "eager"; // Load ảnh đầu tiên ngay lập tức
    carouselImage.decoding = "async"; // Decode không block UI
    carouselImage.addEventListener("click", () => {
        openPhotoModal(photos[currentPhotoIndex]);
    });

    carouselContainer.appendChild(carouselImage);

    // Nút next
    const nextBtn = document.createElement("button");
    nextBtn.className = "carousel-btn carousel-next";
    nextBtn.innerHTML = "❯";
    nextBtn.addEventListener("click", () => nextPhoto());

    // Dots indicator
    const dotsContainer = document.createElement("div");
    dotsContainer.className = "carousel-dots";
    dotsContainer.id = "carousel-dots";

    for (let i = 0; i < photos.length; i++) {
        const dot = document.createElement("button");
        dot.className = "carousel-dot" + (i === 0 ? " active" : "");
        dot.addEventListener("click", () => goToPhoto(i));
        dotsContainer.appendChild(dot);
    }

    carouselWrapper.appendChild(prevBtn);
    carouselWrapper.appendChild(carouselContainer);
    carouselWrapper.appendChild(nextBtn);

    section.appendChild(carouselWrapper);
    section.appendChild(dotsContainer);

    return section;
}

// Điều hướng carousel
function nextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % memoryPhotos.length;
    updateCarousel();
}

function previousPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + memoryPhotos.length) % memoryPhotos.length;
    updateCarousel();
}

function goToPhoto(index) {
    currentPhotoIndex = index;
    updateCarousel();
}

function updateCarousel() {
    const carouselImage = document.getElementById("carousel-image");
    const dots = document.querySelectorAll("#carousel-dots .carousel-dot");

    carouselImage.src = memoryPhotos[currentPhotoIndex];

    dots.forEach((dot, index) => {
        if (index === currentPhotoIndex) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });
}

// Mở modal xem ảnh
function openPhotoModal(photoSrc) {
    const modal = document.createElement("div");
    modal.className = "photo-modal";
    modal.innerHTML = `
        <div class="photo-modal-content">
            <button class="photo-modal-close">&times;</button>
            <img src="${photoSrc}" alt="Ảnh kỷ niệm" />
        </div>
    `;

    modal.addEventListener("click", function (e) {
        if (e.target === modal || e.target.className === "photo-modal-close") {
            modal.remove();
        }
    });

    document.body.appendChild(modal);
    createConfetti();
}

// Tạo các sao trên nền
function createStars() {
    const starsContainer = document.querySelector(".stars");
    const starCount = 50;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.width = Math.random() * 3 + "px";
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";
        starsContainer.appendChild(star);
    }
}

// Tạo pháo hoa khi thổi nến
function makeWish() {
    createConfetti();
    createFallingHearts();
    playSound();
    
    // Tắt nến (ẩn flame)
    setTimeout(() => {
        const flames = document.querySelectorAll('.flame');
        flames.forEach(flame => {
            flame.style.display = 'none';
        });
        
        // Đổi text button
        const wishButton = document.querySelector('.birthday-button');
        if (wishButton) {
            wishButton.innerHTML = "🕯️ Đã thổi nến";
            wishButton.style.opacity = "0.6";
            wishButton.disabled = true;
        }
    }, 1000);
    
    showGiftModal(
        "🎉 Điều Ước", 
        "Lấy được điều ước rồi! Hy vọng điều ước của em sẽ thành hiện thực! ✨"
    );
}

// Tạo confetti (mảnh giấy rơi)
function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = Math.random() * window.innerWidth + "px";
        confetti.style.top = "0px";
        confetti.style.background = getRandomColor();
        confetti.style.delay = Math.random() * 0.5 + "s";
        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Lấy màu ngẫu nhiên
function getRandomColor() {
    const colors = [
        "#ff6b6b",
        "#4ecdc4",
        "#ffd700",
        "#a8e6cf",
        "#ff9999",
        "#f5576c",
        "#667eea",
        "#764ba2",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Phát âm thanh (tùy chọn - nếu muốn thêm âm thanh)
function playSound() {
    // Có thể thêm âm thanh ở đây nếu muốn
    // const audio = new Audio('path-to-sound.mp3');
    // audio.play();
}

// Hiển thị tin nhắn tùy chỉnh
function displayCustomMessage() {
    const nameInput = document.getElementById("nameInput").value;
    const messageInput = document.getElementById("messageInput").value;
    const customMessageDiv = document.getElementById("customMessage");

    if (nameInput.trim() === "" || messageInput.trim() === "") {
        alert("Vui lòng điền đầy đủ tên và tin nhắn!");
        return;
    }

    customMessageDiv.innerHTML = `<strong>${nameInput}</strong><br>${messageInput}`;
    createConfetti();
}

// Tính toán ngày cùng nhau (có thể điều chỉnh ngày bắt đầu)
function updateCountdown() {
    // Thay đổi ngày này thành ngày bạn bắt đầu yêu nhau
    const startDate = new Date("2023-10-03").getTime(); // 3/10/2023
    const now = new Date().getTime();
    const difference = now - startDate;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
}

// Khởi tạo khi trang tải
document.addEventListener("DOMContentLoaded", () => {
    createStars();
    createFallingHearts();
    updateCountdown();
    setupMemoriesAnimation();
    loadMemoryPhotos();

    // Khôi phục trạng thái quà đã mở
    if (openedGiftNumber !== null) {
        const giftBox =
            document.querySelectorAll(".gift-box")[openedGiftNumber - 1];
        giftBox.classList.add("gift-box-opened");

        // Giữ quà đã mở không bị mờ
        giftBox.style.opacity = "1.0";
        giftBox.style.filter = "none";

        // Hiển thị nội dung quà đã mở khi khôi phục
        const giftMessages = [
            "💝 Một điều ước với anh",
            "💝 Một điều ước với anh",
            "💝 Một điều ước với anh",
            "💝 Một điều ước với anh",
        ];
        
        // Icon khớp với từng hộp quà
        const giftEmojis = ["🎁", "🎀", "💝", "💖"];
        
        const giftContent = giftBox.querySelector(".gift-content");
        giftContent.innerHTML = `<div class="gift-message-display">
            <span class="gift-emoji">${giftEmojis[openedGiftNumber - 1]}</span>
            <span class="gift-text">${giftMessages[openedGiftNumber - 1].replace('💝 ', '')}</span>
        </div>`;

        // Thay đổi label thành icon mở cho quà đã mở
        const label = giftBox.querySelector(".gift-label");
        if (label) {
            label.innerHTML = "🎀 Mở rồi";
            label.style.opacity = "0.7";
        }

        giftBox.style.pointerEvents = "none";
        giftBox.style.cursor = "not-allowed";

        // Disable các quà khác (sẽ làm mờ các quà khác, giữ nguyên quà đã mở)
        disableOtherGifts(openedGiftNumber);
    }

    // Cập nhật thống kê mỗi phút
    setInterval(updateCountdown, 60000);

    // Thêm hiệu ứng khi di chuột qua các thẻ tin nhắn
    const messageCards = document.querySelectorAll(".message-card");
    messageCards.forEach((card) => {
        card.addEventListener("click", () => {
            createConfetti();
        });
    });
});

// Thêm hiệu ứng scroll
window.addEventListener("scroll", () => {
    const parallax = document.querySelector(".stars");
    if (parallax) {
        parallax.style.transform = `translateY(${window.scrollY * 0.5}px)`;
    }
});

// Tạo âm thanh click nhẹ (tùy chọn)
function createClickEffect() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
        button.addEventListener("click", function (e) {
            const ripple = document.createElement("span");
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + "px";
            ripple.style.left = x + "px";
            ripple.style.top = y + "px";
            ripple.classList.add("ripple");
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Theo dõi quà đã mở (chỉ 1 quà)
let openedGiftNumber = localStorage.getItem("openedGiftNumber")
    ? parseInt(localStorage.getItem("openedGiftNumber"))
    : null;

// Chức năng mở quà
function openGift(giftNumber) {
    // Kiểm tra xem đã mở quà nào chưa
    if (openedGiftNumber !== null) {
        if (openedGiftNumber === giftNumber) {
            showGiftModal("Thông báo", "Quà này đã mở rồi! 💝");
        } else {
            showGiftModal("Thông báo", "Em chỉ được mở 1 phần quà thôi! 💝");
        }
        return;
    }

    const giftMessages = [
        "💝 Một điều ước với anh",
        "💝 Một điều ước với anh",
        "💝 Một điều ước với anh",
        "💝 Một điều ước với anh",
    ];

    const giftBox = document.querySelectorAll(".gift-box")[giftNumber - 1];
    const giftContent = giftBox.querySelector(".gift-content");

    giftContent.classList.add("gift-opened");

    setTimeout(() => {
        // Hiển thị modal quà trước
        showGiftModal("🎁 Phần Quà", giftMessages[giftNumber - 1]);

        // Icon khớp với từng hộp quà
        const giftEmojis = ["🎁", "🎀", "💝", "💖"];
        
        // Hiển thị nội dung quà trực tiếp trên hộp quà
        giftContent.innerHTML = `<div class="gift-message-display">
            <span class="gift-emoji">${giftEmojis[giftNumber - 1]}</span>
            <span class="gift-text">${giftMessages[giftNumber - 1].replace('💝 ', '')}</span>
        </div>`;

        createConfetti();

        // Đánh dấu quà đã mở và lưu vào localStorage
        openedGiftNumber = giftNumber;
        localStorage.setItem("openedGiftNumber", giftNumber);

        // Thay đổi style để cho thấy quà đã mở
        giftBox.classList.add("gift-box-opened");
        giftContent.classList.remove("gift-opened");

        // Giữ quà đã mở không bị mờ
        giftBox.style.opacity = "1.0";
        giftBox.style.filter = "none";

        // Thay đổi label thành icon mở
        const label = giftBox.querySelector(".gift-label");
        if (label) {
            label.innerHTML = "🎀 Mở rồi";
            label.style.opacity = "0.7";
        }

        giftBox.style.pointerEvents = "none";
        giftBox.style.cursor = "not-allowed";

        // Disable các quà khác
        disableOtherGifts(giftNumber);
    }, 500);
}

// Disable các quà khác
function disableOtherGifts(openedNumber) {
    const giftBoxes = document.querySelectorAll(".gift-box");
    giftBoxes.forEach((box, index) => {
        const giftNum = index + 1;
        if (giftNum !== openedNumber) {
            // Làm mờ các quà khác
            box.style.opacity = "0.4";
            box.style.filter = "grayscale(50%)";

            // Thêm icon "mở rồi"
            const label = box.querySelector(".gift-label");
            if (label) {
                label.innerHTML = "📦 Mở rồi";
                label.style.opacity = "0.7";
            }
            box.style.pointerEvents = "none";
            box.style.cursor = "not-allowed";
        }
    });
}

// Hiển thị modal quà
function showGiftModal(title, message) {
    const modal = document.createElement("div");
    modal.className = "gift-modal";
    modal.innerHTML = `
        <div class="gift-modal-content">
            <button class="gift-modal-close">&times;</button>
            <h2>${title}</h2>
            <p>${message}</p>
        </div>
    `;

    modal.addEventListener("click", function (e) {
        if (e.target === modal || e.target.className === "gift-modal-close") {
            modal.remove();
        }
    });

    document.body.appendChild(modal);
}

// Thêm hiệu ứng hover cho memory items
function setupMemoriesAnimation() {
    const memoryItems = document.querySelectorAll(".memory-item");
    memoryItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            const date = item.querySelector(".memory-date").textContent;
            const text = item.querySelector(".memory-text").textContent;
            alert(
                `📸 ${text}\n🗓️ ${date}\n\nKỷ niệm tuyệt vời của chúng mình!`
            );
            createConfetti();
        });
    });
}

// Gọi hàm tạo click effect
createClickEffect();
