const API_URL = "http://localhost:3000/api";
const form = document.querySelector("#transaction-form");
const list = document.querySelector("#transactions");
const errorBox = document.querySelector("#error");

// Escape user text before putting it into innerHTML.
const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => `&#${character.charCodeAt(0)};`);

async function loadTransactions() {
  const response = await fetch(`${API_URL}/transactions`);
  if (!response.ok) throw new Error("Could not load transactions");
  const transactions = await response.json();

  list.innerHTML = transactions.map((transaction) => `
    <li>
      <span>${escapeHtml(transaction.date)} · ${escapeHtml(transaction.category)} · ${escapeHtml(transaction.note)}</span>
      <span>
        <strong class="${escapeHtml(transaction.type)}">${transaction.type === "expense" ? "-" : "+"}Rs. ${escapeHtml(transaction.amount)}</strong>
        <button class="delete" data-id="${transaction.id}">Delete</button>
      </span>
    </li>
  `).join("");
}

async function loadSummary() {
  const response = await fetch(`${API_URL}/summary`);
  if (!response.ok) throw new Error("Could not load summary");
  const summary = await response.json();
  document.querySelector("#income").textContent = `Rs. ${summary.income}`;
  document.querySelector("#expense").textContent = `Rs. ${summary.expense}`;
  document.querySelector("#balance").textContent = `Rs. ${summary.balance}`;
}

async function refresh() {
  try {
    errorBox.textContent = "";
    await Promise.all([loadTransactions(), loadSummary()]);
  } catch (error) {
    errorBox.textContent = `${error.message}. Is the API running?`;
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  data.amount = Number(data.amount);
  if (!data.date) delete data.date;

  const response = await fetch(`${API_URL}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    errorBox.textContent = "Could not create transaction";
    return;
  }

  form.reset();
  refresh();
});

list.addEventListener("click", async (event) => {
  if (!event.target.matches(".delete")) return;
  await fetch(`${API_URL}/transactions/${event.target.dataset.id}`, { method: "DELETE" });
  refresh();
});

refresh();
