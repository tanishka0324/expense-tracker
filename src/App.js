import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("🍔 Food");
  const [darkMode, setDarkMode] = useState(false);

  const addTransaction = () => {
    if (!text || !amount) return;
    setTransactions([...transactions, { text, amount: parseFloat(amount), category }]);
    setText("");
    setAmount("");
  };

  const total = transactions.reduce((acc, t) => acc + t.amount, 0);

  const chartData = {
    labels: transactions.map((t) => `${t.text} ${t.category}`),
    datasets: [
      {
        data: transactions.map((t) => t.amount),
        backgroundColor: [
          "#FFB6C1", "#FFDAB9", "#B0E0E6", "#E6E6FA", "#FADADD", "#C1E1C1"
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="p-6 max-w-lg mx-auto text-center 
      bg-pink-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white 
      transition duration-300 font-sans rounded-xl shadow-xl border border-pink-200">

        {/* 🌙 Dark Mode Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mb-4 px-4 py-2 rounded-full bg-pink-300 text-white 
          hover:bg-pink-400 transform hover:scale-105 transition"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        <h1 className="text-3xl font-bold mb-4">💖 Cute Expense Tracker 💸</h1>

        {/* Input Fields */}
        <div className="mb-4 flex flex-wrap justify-center gap-2">
          <input
            className="border p-2 rounded-lg dark:bg-gray-700 dark:border-gray-500 focus:ring-2 focus:ring-pink-300"
            placeholder="Expense Name ✏️"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            className="border p-2 rounded-lg dark:bg-gray-700 dark:border-gray-500 focus:ring-2 focus:ring-pink-300"
            placeholder="Amount 💰"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <select
            className="border p-2 rounded-lg dark:bg-gray-700 dark:border-gray-500 focus:ring-2 focus:ring-pink-300"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>🍔 Food</option>
            <option>✈️ Travel</option>
            <option>🛍️ Shopping</option>
            <option>🎬 Entertainment</option>
            <option>💖 Other</option>
          </select>

          <button
            className="bg-pink-400 text-white px-4 py-2 rounded-full 
            hover:bg-pink-500 transform hover:scale-105 transition"
            onClick={addTransaction}
          >
            ➕ Add
          </button>
        </div>

        {/* Total */}
        <h2 className="text-xl font-semibold mb-3">✨ Total: ₹{total} ✨</h2>

        {/* Transactions List */}
        <ul className="mb-4 bg-white dark:bg-gray-800 rounded-lg shadow p-3 divide-y divide-pink-100 dark:divide-gray-700">
          {transactions.map((t, i) => (
            <li key={i} className="py-2">
              {t.text} - <span className="font-bold">₹{t.amount}</span> {t.category}
            </li>
          ))}
        </ul>

        {/* Chart */}
        {transactions.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <Pie data={chartData} />
          </div>
        )}
      </div>
    </div>
  );
}
