import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [editIndex, setEditIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // ✅ Add / Edit Transaction
  const handleTransaction = () => {
    if (!text || !amount) return;

    const newTransaction = { text, amount: parseFloat(amount), category };

    if (editIndex !== null) {
      const updated = [...transactions];
      updated[editIndex] = newTransaction;
      setTransactions(updated);
      setEditIndex(null);
    } else {
      setTransactions([...transactions, newTransaction]);
    }

    setText("");
    setAmount("");
  };

  // ✅ Delete Transaction
  const deleteTransaction = (index) => {
    setTransactions(transactions.filter((_, i) => i !== index));
  };

  // ✅ Edit Transaction
  const editTransaction = (index) => {
    const t = transactions[index];
    setText(t.text);
    setAmount(t.amount);
    setCategory(t.category);
    setEditIndex(index);
  };

  // ✅ Total
  const total = transactions.reduce((acc, t) => acc + t.amount, 0);

  // ✅ Category-wise summary
  const categoryTotals = {};
  transactions.forEach((t) => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });

  // ✅ Chart Data
  const chartData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: ["#A3C4F3", "#F7D9C4", "#C1E1C1", "#E5D4ED", "#F8E1F4"],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="p-6 max-w-2xl mx-auto text-center 
      bg-white dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200 
      transition duration-300 font-sans rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">

        {/* 🌙 Dark Mode */}
        <div className="flex justify-end">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="mb-4 px-4 py-2 text-sm rounded-md bg-gray-100 dark:bg-gray-800 
            hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* Header */}
        <h1 className="text-3xl font-semibold mb-2">Expense Tracker</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Clean, simple, and smart way to monitor your spending.
        </p>

        {/* ✅ Monthly Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md shadow">
            <p className="text-sm text-gray-500">Total Spent</p>
            <h2 className="text-xl font-semibold">₹{total}</h2>
          </div>
          {Object.keys(categoryTotals).map((cat, i) => (
            <div key={i} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md shadow">
              <p className="text-sm text-gray-500">{cat}</p>
              <h3 className="text-lg font-medium">₹{categoryTotals[cat]}</h3>
            </div>
          ))}
        </div>

        {/* Input Fields */}
        <div className="mb-4 flex flex-wrap justify-center gap-2">
          <input
            className="border p-2 rounded-md dark:bg-gray-800 dark:border-gray-600 
            focus:ring-2 focus:ring-blue-300 w-32"
            placeholder="Name"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            className="border p-2 rounded-md dark:bg-gray-800 dark:border-gray-600 
            focus:ring-2 focus:ring-blue-300 w-24"
            placeholder="₹ Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select
            className="border p-2 rounded-md dark:bg-gray-800 dark:border-gray-600 
            focus:ring-2 focus:ring-blue-300 w-28"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Entertainment</option>
            <option>Other</option>
          </select>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md 
            hover:bg-blue-600 transition"
            onClick={handleTransaction}
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        {/* Transaction List */}
        <ul className="mb-4 bg-gray-50 dark:bg-gray-800 rounded-md shadow p-3 divide-y divide-gray-200 dark:divide-gray-700">
          {transactions.map((t, i) => (
            <li key={i} className="py-2 flex justify-between items-center">
              <div>
                <span className="font-medium">{t.text}</span> 
                <span className="text-sm text-gray-500"> ({t.category})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">₹{t.amount}</span>
                <button onClick={() => editTransaction(i)} className="text-blue-500 hover:underline text-sm">Edit</button>
                <button onClick={() => deleteTransaction(i)} className="text-red-500 hover:underline text-sm">Delete</button>
              </div>
            </li>
          ))}
        </ul>

        {/* Chart */}
        {transactions.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4 shadow">
            <Pie data={chartData} />
          </div>
        )}
      </div>
    </div>
  );
}
