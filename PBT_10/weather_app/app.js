// ===== HELPERS =====
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

// ===== STATES =====
function setState(state) {
  document.getElementById("stateLoading").classList.add("hidden");
  document.getElementById("stateError").classList.add("hidden");
  document.getElementById("stateSuccess").classList.add("hidden");

  if (state === "loading") document.getElementById("stateLoading").classList.remove("hidden");
  if (state === "error") document.getElementById("stateError").classList.remove("hidden");
  if (state === "success") document.getElementById("stateSuccess").classList.remove("hidden");
}

function showError(msg) {
  setState("error");
  document.getElementById("errorMsg").textContent = msg;
}

function showSuccess(data, cityName) {
  const w = data.current_weather;
  const { desc, icon } = getWeatherInfo(w.weathercode);

  document.getElementById("cityName").textContent = cityName;
  document.getElementById("desc").textContent = desc;
  document.getElementById("weatherIcon").textContent = icon;
  document.getElementById("temp").textContent = w.temperature + "°C";
  document.getElementById("wind").textContent = w.windspeed + " km/h";

  // Lấy humidity từ hourly (index 0 = giờ đầu tiên)
  const humidity = data.hourly?.relativehumidity_2m?.[0];
  document.getElementById("humidity").textContent = humidity != null ? humidity + "%" : "—";

  const apparent = data.hourly?.apparent_temperature?.[0];
  document.getElementById("feelsLike").textContent = apparent != null ? apparent + "°C" : "—";

  setState("success");
}

// ===== API =====
async function getCoords(city) {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
  );
  const data = await res.json();
  if (!data.results || data.results.length === 0) {
    throw new Error(`Không tìm thấy thành phố "${city}"`);
  }
  return data.results[0];
}

async function getWeather(lat, lon) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current_weather=true&hourly=relativehumidity_2m,apparent_temperature`
  );
  if (!res.ok) throw new Error("Lỗi khi lấy dữ liệu thời tiết");
  return res.json();
}

// ===== SEARCH =====
async function search(cityParam) {
  const city = cityParam || document.getElementById("cityInput").value.trim();
  if (!city) {
    document.getElementById("cityInput").focus();
    return;
  }

  setState("loading");
  try {
    const loc = await getCoords(city);
    const data = await getWeather(loc.latitude, loc.longitude);
    showSuccess(data, loc.name);
    saveHistory(loc.name);
  } catch (err) {
    showError("⚠️ " + err.message);
  }
}

// ===== HISTORY (LocalStorage) =====
function saveHistory(city) {
  let history = JSON.parse(localStorage.getItem("weather_history") || "[]");
  history = history.filter(c => c !== city);
  history.unshift(city);
  history = history.slice(0, 5); // giữ 5 thành phố gần nhất
  localStorage.setItem("weather_history", JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  const history = JSON.parse(localStorage.getItem("weather_history") || "[]");
  const wrap = document.getElementById("historyWrap");
  const list = document.getElementById("historyList");

  if (history.length === 0) {
    wrap.style.display = "none";
    return;
  }

  wrap.style.display = "block";
  list.innerHTML = history
    .map(city => `<span class="tag" onclick="search('${city}')">${city}</span>`)
    .join("");
}

// ===== INIT =====
document.getElementById("cityInput").addEventListener("keydown", e => {
  if (e.key === "Enter") search();
});

renderHistory();