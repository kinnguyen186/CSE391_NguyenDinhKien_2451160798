const images = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&h=500&fit=crop",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900&h=500&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&h=500&fit=crop",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900&h=500&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&h=500&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&h=500&fit=crop",
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=900&h=500&fit=crop",
  "https://images.unsplash.com/photo-1443890923422-7819ed4101c0?w=900&h=500&fit=crop",
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=900&h=500&fit=crop"
];

const commands = [
  "Open Gallery",
  "Next Image",
  "Previous Image",
  "Play Slideshow",
  "Stop Slideshow"
];

let currentIndex = 0;
let playing = false;
let timer = null;

// DOM
const image = document.getElementById("galleryImage");
const playBtn = document.getElementById("playBtn");
const palette = document.getElementById("commandPalette");
const input = document.getElementById("commandInput");
const list = document.getElementById("commandList");

// ====== IMAGE ======
function renderImage() {
  image.src = images[currentIndex];
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  renderImage();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  renderImage();
}

// ====== SLIDESHOW ======
function togglePlay() {
  if (playing) {
    clearInterval(timer);
    playing = false;
    playBtn.textContent = "Play";
  } else {
    timer = setInterval(nextImage, 2000);
    playing = true;
    playBtn.textContent = "Pause";
  }
}

// ====== COMMAND PALETTE ======
function renderCommands(keyword = "") {
  list.innerHTML = "";

  const filtered = commands.filter(c =>
    c.toLowerCase().includes(keyword.toLowerCase())
  );

  filtered.forEach(cmd => {
    const li = document.createElement("li");
    li.textContent = cmd;

    li.onclick = () => {
      handleCommand(cmd);
      closePalette();
    };

    list.appendChild(li);
  });
}

function handleCommand(cmd) {
  switch (cmd) {
    case "Next Image":
      nextImage();
      break;
    case "Previous Image":
      prevImage();
      break;
    case "Play Slideshow":
      if (!playing) togglePlay();
      break;
    case "Stop Slideshow":
      if (playing) togglePlay();
      break;
  }
}

function openPalette() {
  palette.classList.remove("hidden");
  input.value = "";
  renderCommands();
  input.focus();
}

function closePalette() {
  palette.classList.add("hidden");
}

// ====== EVENTS ======
document.getElementById("nextBtn").onclick = nextImage;
document.getElementById("prevBtn").onclick = prevImage;
playBtn.onclick = togglePlay;

// Ctrl + K
document.addEventListener("keydown", e => {
  if (e.ctrlKey && e.key.toLowerCase() === "k") {
    e.preventDefault();
    openPalette();
  }

  if (e.key === "Escape") {
    closePalette();
  }

  if (e.key === "ArrowLeft") prevImage();
  if (e.key === "ArrowRight") nextImage();

  if (e.code === "Space") {
    e.preventDefault();
    togglePlay();
  }

  // 1-9
  if (e.key >= "1" && e.key <= "9") {
    const i = Number(e.key) - 1;
    if (i < images.length) {
      currentIndex = i;
      renderImage();
    }
  }
});

// input search
input.addEventListener("input", e => {
  renderCommands(e.target.value);
});

// Enter chọn command đầu
input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const first = list.querySelector("li");
    if (first) first.click();
  }
});

renderImage();