import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

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
        backgroundColor: ["#4F46E5", "#22C55E", "#EF4444", "#FACC15", "#14B8A6", "#8B5CF6"],
      },
    ],
  };

  return (
    <div className="p-6 max-w-lg mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">💸 Expense Tracker</h1>

      <div className="mb-4">
        <input
          className="border p-2 mr-2"
          placeholder="Expense Name"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          className="border p-2 mr-2"
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select className="border p-2 mr-2" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Entertainment</option>
          <option>Other</option>
        </select>

        <button className="bg-blue-500 text-white p-2" onClick={addTransaction}>
          Add
        </button>
      </div>

      <h2 className="text-xl mb-2">Total: ₹{total}</h2>

      <ul className="mb-4">
        {transactions.map((t, i) => (
          <li key={i} className="border-b py-1">
            {t.text} - ₹{t.amount} <span className="text-gray-500">({t.category})</span>
          </li>
        ))}
      </ul>

      {transactions.length > 0 && <Pie data={chartData} />}
    </div>
  );
}
