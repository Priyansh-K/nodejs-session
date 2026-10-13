// import express from "express";
// const app = express();
// const PORT = 3000;

// app.get("/", (req, res) => {
//     res.send("TechleadHers");
// });

// app.get("/api/health", (req, res) => {
//     res.json({ status: "ok", time: new Date().toISOString() })
// })

// app.listen(PORT, () => {
//     console.log(`Server running http://localhost:${PORT}`);
// })

import express from "express";
import cors from "cors";
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
let nextId = 3;
// SSAVR.COM
let transactions = [
    { id: 1, type: "income", amount: 50000, category: "Salary", note: "October salary", date: "2026-10-01" },
    { id: 2, type: "expense", amount: 450, category: "Food", note: "Momo with friends", date: "2026-10-02" },
];

app.get("/api/transactions", (req, res) => {
    const { type } = req.query;
    if (type) {
        return res.json(transactions.filter((t) => t.type === type));
    }
    res.json(transactions);
})

// one transaction
app.get("/api/transactions/:id", (req, res) => {
    const id = Number(req.params.id);
    const transaction = transactions.find((t) => t.id === id);
    if (!transaction) {
        return res.status(404).json({ eroor: "Transaction not found" });
    }
    res.json(transaction);
});

app.post("/api/transactions", (req, res) => {
    const { type, amount, category, note, date } = req.body;

    const transaction = {
        id: nextId++,
        type,
        amount,
        category,
        note,
        date: date ?? new Date().toISOString().slice(0, 10),
    };
    transactions.push(transaction);
    res.status(201).json(transaction);
})
//  PUT REQUEST
app.put("/api/transactions/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = transactions.findIndex((t) => t.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "Transaction not found" });
    }
    const { type, amount, category, note, date } = req.body;
    transactions[index] = { id, type, amount, category, note, date };
    res.json(transactions[index]);
}
)

// PATCH REQUEST
app.patch("/api/transactions/:id", (req, res) => {
    const id = Number(req.params.id);
    const transaction = transactions.find((t) => t.id === id);
    if (!transaction) {
        return res.status(404).json({ eroor: "Transaction not found" });
    }
    Object.assign(transaction, req.body, { id });
    res.json(transaction);
});

app.delete("/api/transactions/:id", (req, res) => {
    const id = Number(req.params.id);
    const before = transactions.length;
    transactions = transactions.filter((t) => t.id !== id);

    if (transaction.length === before) {
        return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(204).send();
});

app.get("api/summary", (req, res) => {
    const income = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0);
    const expense = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0);
    res.json({ income, expense, balance: income - expense });
});

app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
})

