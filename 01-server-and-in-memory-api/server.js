import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

// Allow a separately served frontend (for example, localhost:5500) to call this API.
app.use(cors());

// Parse JSON request bodies so that POST/PUT/PATCH can use req.body.
app.use(express.json());

// This array is our temporary database. Restarting the server resets the data.
let nextId = 3;
let transactions = [
  { id: 1, type: "income", amount: 50000, category: "Salary", note: "October salary", date: "2026-10-01" },
  { id: 2, type: "expense", amount: 450, category: "Food", note: "Momo with friends", date: "2026-10-02" },
];

// A route is an HTTP method + URL path + handler function.
app.get("/", (req, res) => {
  res.send("Finance Tracker API");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// GET /api/transactions             -> all transactions
// GET /api/transactions?type=income -> query parameter filter
app.get("/api/transactions", (req, res) => {
  const { type } = req.query;
  const result = type ? transactions.filter((transaction) => transaction.type === type) : transactions;
  res.status(200).json(result);
});

// A route parameter identifies one resource: /api/transactions/2.
app.get("/api/transactions/:id", (req, res) => {
  const id = Number(req.params.id);
  const transaction = transactions.find((item) => item.id === id);

  if (!transaction) {
    return res.status(404).json({ error: "Transaction not found" });
  }

  res.json(transaction);
});

// The request body contains the data for a new resource.
app.post("/api/transactions", (req, res) => {
  const { type, amount, category, note, date } = req.body;
  const transaction = {
    id: nextId++,
    type,
    amount: Number(amount),
    category,
    note,
    date: date ?? new Date().toISOString().slice(0, 10),
  };

  transactions.push(transaction);
  res.status(201).json(transaction);
});

// PUT replaces the whole resource.
app.put("/api/transactions/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = transactions.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Transaction not found" });
  }

  const { type, amount, category, note, date } = req.body;
  transactions[index] = { id, type, amount: Number(amount), category, note, date };
  res.json(transactions[index]);
});

// PATCH changes only the fields sent in the request body.
app.patch("/api/transactions/:id", (req, res) => {
  const id = Number(req.params.id);
  const transaction = transactions.find((item) => item.id === id);

  if (!transaction) {
    return res.status(404).json({ error: "Transaction not found" });
  }

  Object.assign(transaction, req.body, { id });
  if ("amount" in req.body) transaction.amount = Number(req.body.amount);
  res.json(transaction);
});

// DELETE removes a resource and returns 204 No Content.
app.delete("/api/transactions/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = transactions.length;
  transactions = transactions.filter((item) => item.id !== id);

  if (transactions.length === before) {
    return res.status(404).json({ error: "Transaction not found" });
  }

  res.status(204).send();
});

// Array methods can implement useful server-side business logic.
app.get("/api/summary", (req, res) => {
  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const expense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  res.json({ income, expense, balance: income - expense });
});

app.listen(PORT, () => {
  console.log(`Express API running at http://localhost:${PORT}`);
});
