// Function to define arrays and utilize other functions of such
function add(a, b) {
    return a + b;
}

const transaction = [
    { type: "income", amount: 50000, notes: "Salary" },
    { type: "expense", amount: 1321, notes: "Food" },
]

const income = transaction.
    filter((t) => t.type == "income").
    reduce((sum, t) => sum + t.amount, 0);

const fomatMoney = (amount) => `Rs. ${amount.toFixed(2)}`;

console.log("a + b =", add(2, 3));
console.log("Income: ", income);