function getWeatherInfo(code) {
  if (code === 0) return { desc: "Trời quang đãng", icon: "☀️" };
  if (code <= 2) return { desc: "Ít mây", icon: "🌤️" };
  if (code === 3) return { desc: "Nhiều mây", icon: "☁️" };
  if (code <= 48) return { desc: "Sương mù", icon: "🌫️" };
  if (code <= 57) return { desc: "Mưa phùn", icon: "🌦️" };
  if (code <= 67) return { desc: "Có mưa", icon: "🌧️" };
  if (code <= 77) return { desc: "Có tuyết", icon: "🌨️" };
  if (code <= 82) return { desc: "Mưa rào", icon: "⛈️" };
  if (code <= 99) return { desc: "Giông bão", icon: "⛈️" };
  return { desc: "Không xác định", icon: "🌡️" };
}

// ===== RENDER từng widget =====
function renderWidget(index, data) {
  const el = document.getElementById(`wb-${index}`);

  if (index === 0) {
    // Users
    const items = data.slice(0, 6).map(u => `
      <div class="user-item">
        <div class="user-avatar">${u.name.charAt(0)}</div>
        <div class="user-info">
          <div class="name">${u.name}</div>
          <div class="email">${u.email}</div>
        </div>
      </div>
    `).join("");
    el.innerHTML = items + `<p class="more-info">+${data.length - 6} người dùng khác</p>`;
  }

  if (index === 1) {
    // Posts
    const items = data.slice(0, 5).map((p, i) => `
      <div class="post-item">
        <div class="post-title">${p.title}</div>
        <div class="post-meta">Bài #${p.id} · User ${p.userId}</div>
      </div>
    `).join("");
    el.innerHTML = items + `<p class="more-info">+${data.length - 5} bài viết khác</p>`;
  }

  if (index === 2) {
    // Weather
    const w = data.current_weather;
    const { desc, icon } = getWeatherInfo(w.weathercode);
    const humidity = data.hourly?.relativehumidity_2m?.[0] ?? "—";
    const apparent = data.hourly?.apparent_temperature?.[0] ?? "—";

    el.innerHTML = `
      <div style="font-size:0.85rem;color:#64748b">Hà Nội, Việt Nam</div>
      <div class="weather-big">${icon} ${w.temperature}°C</div>
      <div class="weather-desc-label">${desc}</div>
      <div class="weather-grid">
        <div class="w-stat">
          <div class="label">Độ ẩm</div>
          <div class="value">${humidity}%</div>
        </div>
        <div class="w-stat">
          <div class="label">Tốc độ gió</div>
          <div class="value">${w.windspeed} km/h</div>
        </div>
        <div class="w-stat">
          <div class="label">Cảm giác</div>
          <div class="value">${apparent}°C</div>
        </div>
        <div class="w-stat">
          <div class="label">Hướng gió</div>
          <div class="value">${w.winddirection}°</div>
        </div>
      </div>
    `;
  }
}

function renderWidgetError(index, message) {
  const el = document.getElementById(`wb-${index}`);
  el.innerHTML = `
    <div class="widget-error">
      <span>⚠️</span>
      <span>Lỗi tải dữ liệu</span>
      <span style="font-size:0.75rem;color:#999">${message}</span>
    </div>
  `;
}

function setWidgetLoading(index) {
  document.getElementById(`wb-${index}`).innerHTML = `<div class="widget-skeleton"></div>`;
}

// ===== LOAD DASHBOARD =====
async function loadDashboard() {
  const startTime = Date.now();
  const btn = document.getElementById("refreshBtn");

  // Show global loading
  document.getElementById("globalLoading").classList.remove("hidden");
  document.getElementById("loadTime").textContent = "";
  btn.disabled = true;

  // Reset từng widget về skeleton
  [0, 1, 2].forEach(i => setWidgetLoading(i));

  // Gọi song song 3 API bằng Promise.allSettled
  // → 1 API lỗi không ảnh hưởng các widget khác
  const results = await Promise.allSettled([
    fetch("https://jsonplaceholder.typicode.com/users").then(r => r.json()),
    fetch("https://jsonplaceholder.typicode.com/posts").then(r => r.json()),
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.85" +
      "&current_weather=true&hourly=relativehumidity_2m,apparent_temperature"
    ).then(r => r.json())
  ]);

  const elapsed = Date.now() - startTime;

  // Render từng widget tùy kết quả
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      renderWidget(index, result.value);
    } else {
      renderWidgetError(index, result.reason.message);
    }
  });

  // Ẩn loading, hiện thời gian
  document.getElementById("globalLoading").classList.add("hidden");
  document.getElementById("loadTime").textContent = `✓ Tải xong trong ${elapsed}ms`;
  btn.disabled = false;

  console.log(`Loaded in ${elapsed}ms`);
}

// ===== INIT =====
loadDashboard();