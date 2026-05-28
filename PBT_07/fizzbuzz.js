// Version 1: Classic

for (let i = 1; i <= 100; i++) {

    let result = "";

    if (i % 3 === 0) {
        result += "Fizz";
    }

    if (i % 5 === 0) {
        result += "Buzz";
    }

    console.log(result || i);
}

console.log("\n--- Custom FizzBuzz ---");

// Version 2: Custom

function customFizzBuzz(n, rules) {

    for (let i = 1; i <= n; i++) {

        let result = "";

        for (let j = 0; j < rules.length; j++) {

            if (i % rules[j].divisor === 0) {
                result += rules[j].word;
            }
        }

        console.log(result || i);
    }
}

// Test
customFizzBuzz(30, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);