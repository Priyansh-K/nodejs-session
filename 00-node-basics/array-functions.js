// Run with: node array-functions.js
// Array methods are useful when working with data returned by an API.

const numbers = [2, 3, 4, 6, 8, 10];

// map: transform every item and return a new array.
const doubled = numbers.map((number) => number * 2);
console.log("map (doubled):", doubled);

// filter: return only items that pass a condition.
const evenNumbers = numbers.filter((number) => number % 2 === 0);
console.log("filter (even):", evenNumbers);

// reduce: combine all items into one value.
const total = numbers.reduce((sum, number) => sum + number, 0);
console.log("reduce (total):", total);

// find: return the first matching item, or undefined.
const firstNumberOverFive = numbers.find((number) => number > 5);
console.log("find (first over 5):", firstNumberOverFive);

// forEach: run a function once for each item; it does not create an array.
console.log("forEach:");
numbers.forEach((number) => console.log(`  number: ${number}`));

// includes: check whether an array contains an exact value.
console.log("includes 3:", numbers.includes(3));

// some: true when at least one item matches.
console.log("some number over 9:", numbers.some((number) => number > 9));

// every: true only when all items match.
console.log("every number is positive:", numbers.every((number) => number > 0));
