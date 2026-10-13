# Node.js basics reference

These examples use only Node.js built-ins, so no `npm install` is needed.

```bash
node hello.js
node funvtion.js 2 3
node function-arrays.js
node array-functions.js
node classwork.js 1 2 3 4 5
node files.js
node async.js
```

## Array methods in `array-functions.js`

- `map()` transforms every item and returns a new array.
- `filter()` returns only items that pass a condition.
- `reduce()` combines an array into one value.
- `find()` returns the first matching item.
- `forEach()` runs code once for each item.
- `includes()` checks for an exact value.
- `some()` checks whether at least one item matches.
- `every()` checks whether all items match.

## Classwork in `classwork.js`

The complete flow is:

1. Read number arguments with `process.argv`.
2. Convert argument strings to numbers with `map()`.
3. Find even numbers with `filter()`.
4. Calculate their total with `reduce()`.
5. Save the result to `result.txt` using a Promise and `utf8`.
6. Use `resolve()`/`.then()` for success and `reject()`/`.catch()` for failure.

Example:

```bash
node classwork.js 10 3 8 5
```

This creates `result.txt` in the directory where the command is run. The generated file can be deleted and recreated by running the command again.
