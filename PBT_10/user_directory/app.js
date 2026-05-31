// ===== DELAY UTILITY =====
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ===== API LAYER =====
const api = {
  baseURL: "https://jsonplaceholder.typicode.com",

  async getUsers() {
    // ⏱ giả lập load chậm (2.5s)
    await delay(2500);

    const res = await fetch(`${this.baseURL}/users`);
    if (!res.ok) throw new Error("Không thể lấy danh sách người dùng");
    return res.json();
  },

  async getUser(id) {
    await delay(800);

    const res = await fetch(`${this.baseURL}/users/${id}`);
    if (!res.ok) throw new Error("Không tìm thấy người dùng");
    return res.json();
  },

  async createUser(data) {
    await delay(1200);

    const res = await fetch(`${this.baseURL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error("Tạo người dùng thất bại");
    return res.json();
  },

  async updateUser(id, data) {
    await delay(1200);

    const res = await fetch(`${this.baseURL}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error("Cập nhật thất bại");
    return res.json();
  },

  async deleteUser(id) {
    await delay(800);

    const res = await fetch(`${this.baseURL}/users/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) throw new Error("Xóa thất bại");
    return true;
  }
};

// ===== UI LAYER =====
const ui = {
  renderUsers(users) {
    const tbody = document.getElementById("tbody");
    document.getElementById("userCount").textContent =
      `${users.length} người dùng`;

    if (users.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align:center;padding:32px;color:#94a3b8">
            Không tìm thấy người dùng nào
          </td>
        </tr>`;
      return;
    }

    tbody.innerHTML = users.map(u => `
      <tr data-id="${u.id}">
        <td><div class="user-name">${u.name}</div></td>
        <td class="user-email">${u.email}</td>
        <td>${u.phone || "—"}</td>
        <td>${u.company?.name || u.company || "—"}</td>
        <td>
          <button class="btn-edit" onclick="editUser(${u.id})">✏ Sửa</button>
          <button class="btn-delete" onclick="deleteUser(${u.id})">🗑 Xóa</button>
        </td>
      </tr>
    `).join("");
  },

  showLoading() {
    document.getElementById("tbody").innerHTML =
      Array(7).fill(`
        <tr class="skeleton">
          <td>████████</td>
          <td>████████████</td>
          <td>███████</td>
          <td>█████████</td>
          <td>███████</td>
        </tr>
      `).join("");

    document.getElementById("userCount").textContent = "Đang tải...";
  },

  hideLoading() {},

  showError(message) {
    showToast("❌ " + message, "#ef4444");
  },

  showSuccess(message) {
    showToast("✅ " + message, "#10b981");
  }
};

// ===== TOAST =====
function showToast(msg, color) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.style.background = color;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}

// ===== STATE =====
let allUsers = [];

// ===== LOAD USERS =====
async function loadUsers() {
  ui.showLoading();

  try {
    allUsers = await api.getUsers();
    ui.renderUsers(allUsers);
  } catch (err) {
    ui.showError(err.message);
  }
}

// ===== SEARCH =====
function filterUsers() {
  const q = document.getElementById("searchBox").value.toLowerCase();

  const filtered = allUsers.filter(u =>
    u.name.toLowerCase().includes(q) ||
    u.email.toLowerCase().includes(q)
  );

  ui.renderUsers(filtered);
}

// ===== CREATE / UPDATE =====
async function submitForm() {
  const id = document.getElementById("editId").value;

  const data = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    company: { name: document.getElementById("company").value.trim() }
  };

  if (!data.name || !data.email) {
    showToast("⚠️ Vui lòng nhập họ tên và email", "#f59e0b");
    return;
  }

  try {
    if (id) {
      await api.updateUser(id, data);

      const idx = allUsers.findIndex(u => u.id == id);
      if (idx !== -1) allUsers[idx] = { ...allUsers[idx], ...data };

      ui.showSuccess("Đã cập nhật người dùng!");
    } else {
      await api.createUser(data);

      allUsers.unshift({
        ...data,
        id: Date.now()
      });

      ui.showSuccess("Đã thêm người dùng mới!");
    }

    ui.renderUsers(allUsers);
    cancelEdit();

  } catch (err) {
    ui.showError(err.message);
  }
}

// ===== EDIT =====
function editUser(id) {
  const user = allUsers.find(u => u.id == id);
  if (!user) return;

  document.getElementById("editId").value = user.id;
  document.getElementById("name").value = user.name;
  document.getElementById("email").value = user.email;
  document.getElementById("phone").value = user.phone || "";
  document.getElementById("company").value = user.company?.name || user.company || "";
  document.getElementById("formTitle").textContent = "Chỉnh sửa người dùng";
}

// ===== CANCEL =====
function cancelEdit() {
  ["editId", "name", "email", "phone", "company"].forEach(id => {
    document.getElementById(id).value = "";
  });
  document.getElementById("formTitle").textContent = "Thêm người dùng";
}

// ===== DELETE =====
async function deleteUser(id) {
  if (!confirm("Bạn chắc chắn muốn xóa người dùng này?")) return;

  try {
    await api.deleteUser(id);

    allUsers = allUsers.filter(u => u.id != id);
    ui.renderUsers(allUsers);

    ui.showSuccess("Đã xóa người dùng!");

  } catch (err) {
    ui.showError(err.message);
  }
}

// ===== INIT =====
loadUsers();