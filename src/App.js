import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [editIndex, setEditIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // ✅ Add / Edit Transaction
  const handleTransaction = () => {
    if (!text || !amount || !date) return;

    const newTransaction = {
      text,
      amount: parseFloat(amount),
      category,
      date,
      month: date.slice(0, 7), // YYYY-MM
    };

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
    setDate("");
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
    setDate(t.date);
    setEditIndex(index);
  };

  // ✅ Filter transactions by selected month
  const filteredTransactions =
    selectedMonth === "All"
      ? transactions
      : transactions.filter((t) => t.month === selectedMonth);

  // ✅ Calculate totals
  const total = filteredTransactions.reduce((acc, t) => acc + t.amount, 0);

  const categoryTotals = {};
  filteredTransactions.forEach((t) => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });

  // ✅ Extract unique months
  const months = [...new Set(transactions.map((t) => t.month))];

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
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-semibold">Expense Tracker</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 text-sm rounded-md bg-gray-100 dark:bg-gray-800 
            hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* 🔥 Month Filter */}
        <div className="mb-4 flex justify-center">
          <select
            className="border p-2 rounded-md dark:bg-gray-800 dark:border-gray-600 
            focus:ring-2 focus:ring-blue-300"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="All">All Months</option>
            {months.map((m, i) => (
              <option key={i} value={m}>
                {new Date(m + "-01").toLocaleString("default", { month: "long", year: "numeric" })}
              </option>
            ))}
          </select>
        </div>

        {/* ✅ Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md shadow">
            <p className="text-sm text-gray-500">Total ({selectedMonth})</p>
            <h2 className="text-xl font-semibold">₹{total}</h2>
          </div>
          {Object.keys(categoryTotals).map((cat, i) => (
            <div key={i} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md shadow">
              <p className="text-sm text-gray-500">{cat}</p>
              <h3 className="text-lg font-medium">₹{categoryTotals[cat]}</h3>
            </div>
          ))}
        </div>

        {/* ✅ Input */}
        <div className="mb-4 flex flex-wrap justify-center gap-2">
          <input
            className="border p-2 rounded-md dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-blue-300 w-32"
            placeholder="Name"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            className="border p-2 rounded-md dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-blue-300 w-24"
            placeholder="₹ Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            type="date"
            className="border p-2 rounded-md dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-blue-300 w-36"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <select
            className="border p-2 rounded-md dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-blue-300 w-28"
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
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            onClick={handleTransaction}
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        {/* ✅ Transaction List */}
        <ul className="mb-4 bg-gray-50 dark:bg-gray-800 rounded-md shadow p-3 divide-y divide-gray-200 dark:divide-gray-700">
          {filteredTransactions.map((t, i) => (
            <li key={i} className="py-2 flex justify-between items-center">
              <div>
                <span className="font-medium">{t.text}</span> 
                <span className="text-sm text-gray-500"> ({t.category}, {t.date})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">₹{t.amount}</span>
                <button onClick={() => editTransaction(i)} className="text-blue-500 hover:underline text-sm">Edit</button>
                <button onClick={() => deleteTransaction(i)} className="text-red-500 hover:underline text-sm">Delete</button>
              </div>
            </li>
          ))}
        </ul>

        {/* ✅ Chart */}
        {filteredTransactions.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4 shadow">
            <Pie data={chartData} />
          </div>
        )}
      </div>
    </div>
  );
}
