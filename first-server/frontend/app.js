const API_URL = "http://localhost:3000/api";

const list = document.querySelector("#list");
const form = document.querySelector("#tx-form");
const errorBox = document.querySelector("#error");

// Never put raw user text into innerHTML — it could contain <script>.
const esc = (text) => String(text ?? "").replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

// READ: ask the backend for data, then draw it
async function loadTransactions() {
    const res = await fetch(`${API_URL}/transactions`);
    const transactions = await res.json();

    list.innerHTML = "";
    for (const t of transactions) {
        const li = document.createElement("li");
        li.innerHTML = `
      <span>${esc(t.date)} · ${esc(t.category)} · ${esc(t.note)}</span>
      <span>
        <strong class="${t.type}">${t.type === "expense" ? "-" : "+"}${esc(t.amount)}</strong>
        <button class="link" data-id="${t.id}">delete</button>
      </span>`;
        list.append(li);
    }
}

async function loadSummary() {
    const res = await fetch(`${API_URL}/summary`);
    const summary = await res.json();
    document.querySelector("#income").textContent = summary.income;
    document.querySelector("#expense").textContent = summary.expense;
    document.querySelector("#balance").textContent = summary.balance;
}

async function refresh() {
    try {
        errorBox.textContent = "";
        await Promise.all([loadTransactions(), loadSummary()]);
    } catch (err) {
        errorBox.textContent = "Could not reach the API. Is the server running?";
        console.error(err);
    }
}

// CREATE: send data to the backend
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    data.amount = Number(data.amount);
    if (!data.date) delete data.date; // empty date → let the server use today

    const res = await fetch(`${API_URL}/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const body = await res.json();
        errorBox.textContent = body.error ?? "Something went wrong";
        return;
    }

    form.reset();
    refresh();
});

// DELETE
list.addEventListener("click", async (event) => {
    const id = event.target.dataset.id;
    if (!id) return;
    await fetch(`${API_URL}/transactions/${id}`, { method: "DELETE" });
    refresh();
});

refresh();
