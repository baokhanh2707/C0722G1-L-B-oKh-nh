// happy coding 👻
let fibonacci = function (number: number): number {
    if (number < 0) {
        return -1;
    } else if (number == 0 || number == 1) {
        return number;
    } else {
        return fibonacci(number - 1) + fibonacci(number - 2);
    }
}
let sum: number = 0;
let arr = [];
for (let i = 0; i < 7; i++) {
    arr.push(fibonacci(i))
}
console.log("các số fibonacci  là: " + arr);

for (let i of arr) {
    sum += i;
}
console.log("tổng các số fibonacci  là: " + sum);