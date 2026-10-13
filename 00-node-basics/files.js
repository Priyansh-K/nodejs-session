// node file system

import { writeFile, readFile } from "node:fs/promises";

const data = [{ type: "expense", amount: 450, notes: "Food" }];
await writeFile("transactions.json", JSON.stringify(data, null, 2), "utf8");
console.log("Saved transactions.json");

const text = await readFile("transactions.json", "utf8");
console.log("Read file:", JSON.parse(text));
