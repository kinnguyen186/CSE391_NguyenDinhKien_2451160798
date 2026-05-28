// Random số từ 1 → 100
const randomNumber =
    Math.floor(Math.random() * 100) + 1;

let attempts = 0;

const maxAttempts = 7;

const guessedNumbers = [];

alert(
    "🎮 GAME ĐOÁN SỐ\n\n" +
    "Bạn có 7 lượt để đoán số từ 1 → 100"
);

while (attempts < maxAttempts) {

    let input = prompt(
        `🔢 Lượt ${attempts + 1}/${maxAttempts}\n\n` +
        "Nhập số từ 1 → 100\n" +
        "(Bấm Cancel để thoát)"
    );

    // Cancel game
    if (input === null) {

        alert("❌ Bạn đã thoát game!");

        break;
    }

    // Xóa khoảng trắng
    input = input.trim();

    // Validate rỗng
    if (input === "") {

        alert("⚠️ Không được để trống!");

        continue;
    }

    const guess = Number(input);

    // Validate số
    if (
        isNaN(guess) ||
        !Number.isInteger(guess)
    ) {

        alert("⚠️ Vui lòng nhập số nguyên!");

        continue;
    }

    // Validate khoảng
    if (
        guess < 1 ||
        guess > 100
    ) {

        alert(
            "⚠️ Chỉ được nhập số từ 1 → 100!"
        );

        continue;
    }

    // Kiểm tra trùng
    if (
        guessedNumbers.includes(guess)
    ) {

        alert(
            `⚠️ Bạn đã đoán số ${guess} rồi!\n` +
            `Các số đã đoán: ${guessedNumbers.join(", ")}`
        );

        continue;
    }

    guessedNumbers.push(guess);

    attempts++;

    // Đoán đúng
    if (guess === randomNumber) {

        alert(
            "🎉 Đúng rồi!\n\n" +
            `Bạn đoán đúng số ${randomNumber}\n` +
            `Sau ${attempts} lần đoán`
        );

        break;
    }

    // Gợi ý
    let hint = "";

    if (guess < randomNumber) {

        hint = "📈 Cao hơn!";
    }

    else {

        hint = "📉 Thấp hơn!";
    }

    // Còn lượt
    if (attempts < maxAttempts) {

        alert(
            `${hint}\n\n` +
            `Bạn còn ${maxAttempts - attempts} lượt`
        );
    }

    // Hết lượt
    else {

        alert(
            "💀 GAME OVER!\n\n" +
            `Bạn đã hết lượt.\n` +
            `Đáp án đúng là: ${randomNumber}`
        );
    }
}

console.log("Đáp án:", randomNumber);