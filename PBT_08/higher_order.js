// 1. PIPE
function pipe(...fns) {
    return function (value) {
        return fns.reduce(
            (result, fn) => fn(result),
            value
        );
    };
}

const process = pipe(
    x => x * 2,
    x => x + 10,
    x => x.toString(),
    x => "Kết quả: " + x
);

console.log(process(5));


// 2. MEMOIZE
function memoize(fn) {
    const cache = {};

    return function (...args) {

        const key = JSON.stringify(args);

        if (cache[key] !== undefined) {
            return cache[key];
        }

        const result = fn(...args);

        cache[key] = result;

        return result;
    };
}

const expensiveCalc = memoize((n) => {

    console.log("Đang tính...");

    let result = 0;

    for (let i = 0; i < n; i++) {
        result += i;
    }

    return result;
});

console.log(expensiveCalc(1000000));
console.log(expensiveCalc(1000000));


// 3. DEBOUNCE
function debounce(fn, delay) {

    let timer;

    return function (...args) {

        clearTimeout(timer);

        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);


// 4. RETRY
async function retry(fn, maxAttempts = 3) {

    let attempts = 0;

    while (attempts < maxAttempts) {

        try {
            return await fn();
        }
        catch (error) {

            attempts++;

            if (attempts === maxAttempts) {
                throw error;
            }

            console.log(
                `Thử lại lần ${attempts + 1}`
            );
        }
    }
}


// ===== TEST RETRY =====

let count = 0;

retry(async () => {

    count++;

    console.log(
        `Lần thử ${count}`
    );

    if (count < 3) {
        throw new Error("Thất bại");
    }

    return "Thành công";

})
.then(result => console.log(result))
.catch(error => console.log(error.message));search