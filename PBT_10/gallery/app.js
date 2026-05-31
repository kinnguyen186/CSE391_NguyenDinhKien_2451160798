let page = 1;
let loading = false;
let totalLoaded = 0;

// =====================
// DELAY (MOCK NETWORK)
// =====================
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// =====================
// LAZY LOADING IMAGES
// =====================
const lazyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;

      img.onload = () => img.classList.add("loaded");
      img.onerror = () => img.classList.add("loaded");

      lazyObserver.unobserve(img);
    }
  });
}, { rootMargin: "100px" });

// =====================
// INFINITE SCROLL
// =====================
const scrollObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    loadPhotos();
  }
}, { rootMargin: "200px" });

scrollObserver.observe(document.getElementById("load-trigger"));

// =====================
// LOAD PHOTOS (SLOW VERSION)
// =====================
async function loadPhotos() {
  if (loading) return;
  loading = true;

  const loadingEl = document.getElementById("loadingMore");
  loadingEl.style.display = "flex";

  try {
    // ⏱ giả lập mạng chậm (2 giây)
    await delay(2000);

    const res = await fetch(
      `https://picsum.photos/v2/list?page=${page}&limit=20`
    );

    if (!res.ok) throw new Error("Lỗi tải ảnh");

    const photos = await res.json();

    if (!photos.length) {
      scrollObserver.disconnect();
      loadingEl.style.display = "none";
      return;
    }

    renderPhotos(photos);

    page++;
    totalLoaded += photos.length;

    document.getElementById("photoCount").textContent =
      `${totalLoaded} ảnh`;

  } catch (err) {
    console.error(err);
    loadingEl.querySelector("p").textContent =
      "❌ Lỗi tải ảnh. Thử lại sau.";
  } finally {
    loading = false;
    loadingEl.style.display = "none";
  }
}

// =====================
// RENDER PHOTOS
// =====================
function renderPhotos(photos) {
  const grid = document.getElementById("grid");

  photos.forEach(photo => {
    const item = document.createElement("div");
    item.className = "grid-item";

    const img = document.createElement("img");
    img.dataset.src = `https://picsum.photos/id/${photo.id}/400/400`;
    img.alt = photo.author;

    const overlay = document.createElement("div");
    overlay.className = "overlay";

    const author = document.createElement("span");
    author.className = "author";
    author.textContent = photo.author;

    overlay.appendChild(author);
    item.appendChild(img);
    item.appendChild(overlay);

    // click mở lightbox
    item.addEventListener("click", () => openLightbox(photo));

    grid.appendChild(item);

    // lazy load image
    lazyObserver.observe(img);
  });
}

// =====================
// LIGHTBOX
// =====================
function openLightbox(photo) {
  const lb = document.getElementById("lightbox");
  const img = document.getElementById("lightboxImg");
  const author = document.getElementById("lbAuthor");

  img.src = "";
  img.src = `https://picsum.photos/id/${photo.id}/1200/800`;
  author.textContent = `📷 ${photo.author}`;

  lb.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("show");
  document.body.style.overflow = "";
}

// ESC key close
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// =====================
// INIT
// =====================
loadPhotos();