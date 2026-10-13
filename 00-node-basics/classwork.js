// Run with: node classwork.js 1 2 3 4 5
// This example combines process.argv, array methods, a Promise and fs.

import { writeFile } from "node:fs/promises";

const argumentStrings = process.argv.slice(2);

if (argumentStrings.length === 0) {
    console.log("Usage: node classwork.js <number> <number> ...");
    process.exit(1);
}

// 1. process.argv gives us strings. map() converts them to numbers.
const numbers = argumentStrings.map((value) => Number(value));

if (numbers.some((number) => Number.isNaN(number))) {
    console.error("Please provide numbers only.");
    process.exit(1);
}

// 2. filter() finds the even numbers.
const evenNumbers = numbers.filter((number) => number % 2 === 0);

// 3. reduce() calculates the total of the even numbers.
const total = evenNumbers.reduce((sum, number) => sum + number, 0);
const result = [
    `Numbers: ${numbers.join(", ")}`,
    `Even numbers: ${evenNumbers.join(", ")}`,
    `Total of even numbers: ${total}`,
].join("\n") + "\n";

// 4. Resolve when saving succeeds; reject when it fails.
const saveResult = new Promise((resolve, reject) => {
    writeFile("result.txt", result, "utf8")
        .then(() => resolve("Result saved to result.txt"))
        .catch((error) => reject(error));
});

// 5. Display the Promise result using then() and catch().
saveResult
    .then((message) => {
        console.log(message);
        console.log(result);
    })
    .catch((error) => {
        console.error("Could not save result:", error.message);
    });
