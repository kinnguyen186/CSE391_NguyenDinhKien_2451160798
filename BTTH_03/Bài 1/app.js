const addBtn = document.getElementById("addBtn");
const closeBtn = document.getElementById("closeBtn");

const modal = document.getElementById("studentModal");

const studentForm =
  document.getElementById("studentForm");

const studentList =
  document.getElementById("studentList");

const totalStudents =
  document.getElementById("totalStudents");

const avgScore =
  document.getElementById("avgScore");

const formTitle =
  document.getElementById("formTitle");

let students = [

  {
    studentId: "SV001",
    fullName: "Nguyễn Văn A",
    birthDate: "2004-05-10",
    className: "CNTT1",
    score: 8.5,
    email: "vana@gmail.com"
  },

  {
    studentId: "SV002",
    fullName: "Trần Thị B",
    birthDate: "2004-08-21",
    className: "CNTT2",
    score: 7.8,
    email: "thib@gmail.com"
  },

  {
    studentId: "SV003",
    fullName: "Lê Văn C",
    birthDate: "2005-01-15",
    className: "CNTT3",
    score: 9.1,
    email: "vanc@gmail.com"
  }

];

function saveStudents() {

  localStorage.setItem(
    "students",
    JSON.stringify(students)
  );
}

function updateStatistics() {

  totalStudents.innerText =
    students.length;

  if (students.length === 0) {

    avgScore.innerText = 0;

    return;
  }

  let total = students.reduce((sum, student) => {

    return sum + Number(student.score);

  }, 0);

  avgScore.innerText =
    (total / students.length).toFixed(2);
}

function renderStudents() {

  studentList.innerHTML = "";

  if (students.length === 0) {

    studentList.innerHTML = `
      <tr>
        <td colspan="7">
          Chưa có dữ liệu
        </td>
      </tr>
    `;

    return;
  }

  students.forEach((student, index) => {

    studentList.innerHTML += `
      <tr>

        <td>${student.studentId}</td>

        <td>${student.fullName}</td>

        <td>${student.birthDate}</td>

        <td>${student.className}</td>

        <td>${student.score}</td>

        <td>${student.email}</td>

        <td>

          <button
            class="edit-btn"
            onclick="editStudent(${index})"
          >
            Sửa
          </button>

          <button
            class="delete-btn"
            onclick="deleteStudent(${index})"
          >
            Xóa
          </button>

        </td>

      </tr>
    `;
  });

  updateStatistics();
}

function resetForm() {

  studentForm.reset();

  document.getElementById("editIndex").value = "";
}

addBtn.addEventListener("click", () => {

  modal.style.display = "flex";

  formTitle.innerText =
    "Thêm Sinh Viên";

  resetForm();
});

closeBtn.addEventListener("click", () => {

  modal.style.display = "none";
});

studentForm.addEventListener("submit", (e) => {

  e.preventDefault();

  const studentId =
    document.getElementById("studentId").value.trim();

  const fullName =
    document.getElementById("fullName").value.trim();

  const birthDate =
    document.getElementById("birthDate").value;

  const className =
    document.getElementById("className").value.trim();

  const score =
    document.getElementById("score").value;

  const email =
    document.getElementById("email").value.trim();

  document.getElementById("studentIdError").innerText = "";
  document.getElementById("fullNameError").innerText = "";
  document.getElementById("birthDateError").innerText = "";
  document.getElementById("classNameError").innerText = "";
  document.getElementById("scoreError").innerText = "";
  document.getElementById("emailError").innerText = "";

  let isValid = true;

  const studentIdRegex = /^SV\d{3}$/;

  if (!studentIdRegex.test(studentId)) {

    document.getElementById(
      "studentIdError"
    ).innerText =
      "Mã SV phải dạng SV001";

    isValid = false;
  }

  if (fullName.length < 5) {

    document.getElementById(
      "fullNameError"
    ).innerText =
      "Họ tên phải từ 5 ký tự";

    isValid = false;
  }

  if (birthDate === "") {

    document.getElementById(
      "birthDateError"
    ).innerText =
      "Vui lòng chọn ngày sinh";

    isValid = false;
  }

  if (className.length < 3) {

    document.getElementById(
      "classNameError"
    ).innerText =
      "Tên lớp không hợp lệ";

    isValid = false;
  }

  if (score < 0 || score > 10) {

    document.getElementById(
      "scoreError"
    ).innerText =
      "Điểm phải từ 0 đến 10";

    isValid = false;
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {

    document.getElementById(
      "emailError"
    ).innerText =
      "Email không hợp lệ";

    isValid = false;
  }

  if (!isValid) return;

  const student = {
    studentId,
    fullName,
    birthDate,
    className,
    score,
    email
  };

  const editIndex =
    document.getElementById("editIndex").value;

  if (editIndex === "") {

    students.push(student);

  } else {

    students[editIndex] = student;
  }

  saveStudents();

  renderStudents();

  modal.style.display = "none";

  resetForm();
});

function editStudent(index) {

  const student = students[index];

  document.getElementById("studentId").value =
    student.studentId;

  document.getElementById("fullName").value =
    student.fullName;

  document.getElementById("birthDate").value =
    student.birthDate;

  document.getElementById("className").value =
    student.className;

  document.getElementById("score").value =
    student.score;

  document.getElementById("email").value =
    student.email;

  document.getElementById("editIndex").value =
    index;

  formTitle.innerText =
    "Cập Nhật Sinh Viên";

  modal.style.display = "flex";
}

function deleteStudent(index) {

  const confirmDelete =
    confirm("Bạn có chắc muốn xóa?");

  if (confirmDelete) {

    students.splice(index, 1);

    saveStudents();

    renderStudents();
  }
}

renderStudents();