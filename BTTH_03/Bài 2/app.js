const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const taskModal = document.getElementById("taskModal");
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const modalTitle = document.getElementById("modalTitle");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const taskDesc = document.getElementById("taskDesc");

/* DATA */

let tasks = [
  {
    title: "Làm bài tập JS",
    desc: "Hoàn thành CRUD",
    deadline: "2026-05-25",
    priority: "Cao",
    completed: false
  },

  {
    title: "Học Bootstrap",
    desc: "Responsive layout",
    deadline: "2026-05-28",
    priority: "Trung bình",
    completed: true
  }
];

/* SUMMARY */

function updateTaskSummary() {

  totalTasks.innerText = tasks.length;

  const completed =
    tasks.filter(task => task.completed).length;

  completedTasks.innerText = completed;

  pendingTasks.innerText =
    tasks.length - completed;
}

/* RENDER */

function renderTasks() {

  if (tasks.length === 0) {

    taskList.innerHTML = `
      <tr>
        <td colspan="6">
          Chưa có công việc nào
        </td>
      </tr>
    `;

    updateTaskSummary();
    return;
  }

  taskList.innerHTML = tasks.map((task, index) => `

    <tr>

      <td>${task.title}</td>

      <td>
        ${task.desc || "Không có mô tả"}
      </td>

      <td>${task.deadline}</td>

      <td>${task.priority}</td>

      <td>
        ${
          task.completed
            ? "Hoàn thành"
            : "Chưa hoàn thành"
        }
      </td>

      <td class="action-box">

        <label class="status-toggle">

          <input
            type="checkbox"
            ${
              task.completed
                ? "checked"
                : ""
            }
            onchange="toggleTaskStatus(${index})"
          >

          ${
            task.completed
              ? "Hoàn thành"
              : "Chưa hoàn thành"
          }

        </label>

        <button
          class="edit-btn"
          onclick="editTask(${index})"
        >
          Sửa
        </button>

        <button
          class="delete-btn"
          onclick="deleteTask(${index})"
        >
          Xóa
        </button>

      </td>

    </tr>

  `).join("");

  updateTaskSummary();
}

/* RESET FORM */

function resetTaskForm() {

  taskForm.reset();

  document.getElementById("editTaskIndex").value = "";

  document.getElementById("taskTitleError").innerText = "";
  document.getElementById("taskDeadlineError").innerText = "";
  document.getElementById("taskPriorityError").innerText = "";
  document.getElementById("taskStatusError").innerText = "";
}

/* OPEN MODAL */

openModalBtn.addEventListener("click", () => {

  taskModal.style.display = "flex";

  modalTitle.innerText = "Thêm Công Việc";

  resetTaskForm();
});

/* CLOSE MODAL */

closeModalBtn.addEventListener("click", () => {

  taskModal.style.display = "none";
});

/* SUBMIT */

taskForm.addEventListener("submit", (e) => {

  e.preventDefault();

  const titleEl =
    document.getElementById("taskTitle");

  const deadlineEl =
    document.getElementById("taskDeadline");

  const priorityEl =
    document.getElementById("taskPriority");

  const statusEl =
    document.getElementById("taskStatus");

  const titleErr =
    document.getElementById("taskTitleError");

  const deadlineErr =
    document.getElementById("taskDeadlineError");

  const priorityErr =
    document.getElementById("taskPriorityError");

  const statusErr =
    document.getElementById("taskStatusError");

  titleErr.innerText = "";
  deadlineErr.innerText = "";
  priorityErr.innerText = "";
  statusErr.innerText = "";

  let isValid = true;

  const titleValue =
    titleEl.value.trim();

  if (titleValue === "") {

    titleErr.innerText =
      "Vui lòng nhập tên công việc";

    isValid = false;

  } else if (titleValue.length < 3) {

    titleErr.innerText =
      "Tên công việc phải từ 3 ký tự";

    isValid = false;

  } else if (
    !/[a-zA-ZÀ-ỹ]/.test(titleValue)
  ) {

    titleErr.innerText =
      "Tên công việc phải có chữ";

    isValid = false;
  }

  if (deadlineEl.value === "") {

    deadlineErr.innerText =
      "Vui lòng chọn hạn hoàn thành";

    isValid = false;
  }

  if (priorityEl.value === "") {

    priorityErr.innerText =
      "Vui lòng chọn mức ưu tiên";

    isValid = false;
  }

  if (statusEl.value === "") {

    statusErr.innerText =
      "Vui lòng chọn trạng thái";

    isValid = false;
  }

  if (!isValid) return;

  const task = {

    title: titleValue,

    desc: taskDesc.value.trim(),

    deadline: deadlineEl.value,

    priority: priorityEl.value,

    completed:
      statusEl.value === "Hoàn thành"
  };

  const editIndex =
    document.getElementById("editTaskIndex").value;

  if (editIndex === "") {

    tasks.push(task);

  } else {

    tasks[editIndex] = task;
  }

  renderTasks();

  taskModal.style.display = "none";

  resetTaskForm();
});

/* EDIT */

function editTask(index) {

  const task = tasks[index];

  document.getElementById("taskTitle").value =
    task.title;

  taskDesc.value =
    task.desc;

  document.getElementById("taskDeadline").value =
    task.deadline;

  document.getElementById("taskPriority").value =
    task.priority;

  document.getElementById("taskStatus").value =
    task.completed
      ? "Hoàn thành"
      : "Chưa hoàn thành";

  document.getElementById("editTaskIndex").value =
    index;

  modalTitle.innerText =
    "Cập Nhật Công Việc";

  taskModal.style.display = "flex";
}

/* DELETE */

function deleteTask(index) {

  if (confirm("Bạn có chắc muốn xóa?")) {

    tasks.splice(index, 1);

    renderTasks();
  }
}

/* TOGGLE STATUS */

function toggleTaskStatus(index) {

  tasks[index].completed =
    !tasks[index].completed;

  renderTasks();
}

/* INIT */

renderTasks();