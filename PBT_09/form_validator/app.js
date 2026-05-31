const fullname =
document.getElementById(
"fullname"
);

const email =
document.getElementById(
"email"
);

const password =
document.getElementById(
"password"
);

const confirmPassword =
document.getElementById(
"confirmPassword"
);

const phone =
document.getElementById(
"phone"
);

const submitBtn =
document.getElementById(
"submitBtn"
);

const strengthBar =
document.getElementById(
"strengthBar"
);

function validateName(){

const value =
fullname.value.trim();

const valid =
value.length >= 2 &&
value.length <= 50;

document.getElementById(
"nameError"
).textContent =
valid
? "✅ Hợp lệ"
: "❌ 2-50 ký tự";

return valid;

}

function validateEmail(){

const regex =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const valid =
regex.test(email.value);

document.getElementById(
"emailError"
).textContent =
valid
? "✅ Email hợp lệ"
: "❌ Email không hợp lệ";

return valid;

}

function validatePassword(){

const value =
password.value;

let strength = 0;

if(value.length >= 8)
strength++;

if(
/[A-Za-z]/.test(value) &&
/\d/.test(value)
)
strength++;

if(
/[A-Z]/.test(value) &&
/[a-z]/.test(value) &&
/\d/.test(value) &&
/[^A-Za-z0-9]/.test(value)
)
strength++;

if(strength === 1){

strengthBar.style.width =
"33%";

strengthBar.style.background =
"red";

document.getElementById(
"passwordError"
).textContent =
"Yếu";

}

if(strength === 2){

strengthBar.style.width =
"66%";

strengthBar.style.background =
"orange";

document.getElementById(
"passwordError"
).textContent =
"Trung bình";

}

if(strength === 3){

strengthBar.style.width =
"100%";

strengthBar.style.background =
"green";

document.getElementById(
"passwordError"
).textContent =
"Mạnh";

}

return strength > 0;

}

function validateConfirm(){

const valid =
password.value ===
confirmPassword.value &&
confirmPassword.value !== "";

document.getElementById(
"confirmError"
).textContent =
valid
? "✅ Khớp mật khẩu"
: "❌ Không khớp";

return valid;

}

function validatePhone(){

const digits =
phone.value.replace(
/\D/g,
""
);

const valid =
digits.length === 10;

document.getElementById(
"phoneError"
).textContent =
valid
? "✅ Hợp lệ"
: "❌ Cần 10 số";

return valid;

}

function updateSubmit(){

submitBtn.disabled = !(
validateName() &&
validateEmail() &&
validatePassword() &&
validateConfirm() &&
validatePhone()
);

}

fullname.addEventListener(
"input",
updateSubmit
);

email.addEventListener(
"input",
updateSubmit
);

password.addEventListener(
"input",
updateSubmit
);

confirmPassword
.addEventListener(
"input",
updateSubmit
);

phone.addEventListener(
"input",
e=>{

let value =
e.target.value.replace(
/\D/g,
""
);

if(value.length > 10){

value =
value.slice(0,10);

}

if(value.length > 4){

value =
value.replace(
/(\d{4})(\d+)/,
"$1-$2"
);

}

if(value.length > 9){

value =
value.replace(
/(\d{4})-(\d{3})(\d+)/,
"$1-$2-$3"
);

}

e.target.value = value;

updateSubmit();

}
);

document
.getElementById(
"registerForm"
)
.addEventListener(
"submit",
e=>{

e.preventDefault();

document
.getElementById("modal")
.classList.remove(
"hidden"
);

document
.getElementById(
"userInfo"
)
.innerHTML = `
<p>
Họ tên:
${fullname.value}
</p>

<p>
Email:
${email.value}
</p>

<p>
Điện thoại:
${phone.value}
</p>
`;

}
);

document
.getElementById(
"closeModal"
)
.addEventListener(
"click",
()=>{

document
.getElementById(
"modal"
)
.classList.add(
"hidden"
);

});