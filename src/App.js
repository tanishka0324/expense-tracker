import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [darkMode, setDarkMode] = useState(false);

  const addTransaction = () => {
    if (!text || !amount) return;
    setTransactions([...transactions, { text, amount: parseFloat(amount), category }]);
    setText("");
    setAmount("");
  };

  const total = transactions.reduce((acc, t) => acc + t.amount, 0);

  const chartData = {
    labels: transactions.map((t) => `${t.text} (${t.category})`),
    datasets: [
      {
        data: transactions.map((t) => t.amount),
        backgroundColor: ["#A3C4F3", "#F7D9C4", "#C1E1C1", "#E5D4ED", "#F8E1F4"],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="p-6 max-w-xl mx-auto text-center 
      bg-white dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200 
      transition duration-300 font-sans rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">

        {/* 🌙 Dark Mode Button */}
        <div className="flex justify-end">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="mb-4 px-4 py-2 text-sm rounded-md bg-gray-100 dark:bg-gray-800 
            hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <h1 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Expense Tracker
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Track your spending with a clean, simple interface.
        </p>

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
            onClick={addTransaction}
          >
            Add
          </button>
        </div>

        {/* Total */}
        <h2 className="text-xl font-medium mb-3">Total: ₹{total}</h2>

        {/* Transactions List */}
        <ul className="mb-4 bg-gray-50 dark:bg-gray-800 rounded-md shadow p-3 divide-y divide-gray-200 dark:divide-gray-700">
          {transactions.map((t, i) => (
            <li key={i} className="py-2 flex justify-between">
              <span>{t.text} ({t.category})</span>
              <span className="font-medium">₹{t.amount}</span>
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
