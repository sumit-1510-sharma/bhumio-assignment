import React, { useState } from "react";
import BottomComp from "../components/BottomComp";
import StatGrid from "../components/StatGrid";

const FirstPage = () => {
  // Editable stats for 1a
  const [stats, setStats] = useState([
    { label: "🏠 # Sell Side", value: 67 },
    { label: "⚖ # Dual Side", value: 38 },
    { label: "🔑 # Buy Side", value: 37 },
  ]);

  // Calculate closed deal
  const closedDeal = stats.reduce((sum, s) => sum + Number(s.value), 0);

  // Nested updater helper
  const updateNestedValue = (itemNumber, path, newValue) => {
    setStatGridData((prev) =>
      prev.map((item) => {
        if (item.number !== itemNumber) return item;
        const updatedItem = { ...item };
        let temp = updatedItem;
        for (let i = 0; i < path.length - 1; i++) temp = temp[path[i]];
        temp[path[path.length - 1]] = newValue;
        return updatedItem;
      })
    );
  };

  // Editable StatGrid data (1b, 1c)
  const [statGridData, setStatGridData] = useState([
    {
      number: "1b",
      heading: ["⏳ Pending", "📢 Active"],
      value: ["$103M", "$46M"],
      subHeading: ["(Primary Agent)", "(Primary Agent)"],
      stats: [
        { label: "🏠 Sell Side", value: "78" },
        { label: "⚖ Dual", value: "28" },
        { label: "🔑 Buy Side", value: "19" },
        { label: "", value: "71" },
      ],
    },
    {
      number: "1c",
      stats: [
        { label: "💎 - 📉 Range", value: "$1.7M - $100K" },
        { label: "📈 Avg. Sold Price", value: "$517K" },
      ],
    },
  ]);

  const pieData = stats.map((s) => ({
    name: s.label.replace("# ", ""), // cleaner legend
    value: Number(s.value),
  }));

  // Handler for downloading JSON
  const handleDownload = () => {
    const dataToDownload = { closedDeal, stats, statGridData };
    const jsonStr = JSON.stringify(dataToDownload, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "dashboard-data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Handler for 1a stats inputs
  const handleStatChange = (idx, newValue) => {
    const val = Math.max(0, parseInt(newValue) || 0);
    setStats((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, value: val } : s))
    );
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mt-16 my-4">
        Brokerage Dashboard: Sterling Real Estate Group
      </h2>

      {/* Editable 1a */}
      <div className="w-full max-w-[80%] mb-6 border rounded-xl shadow bg-white">
        <div className="p-4 text-center border-b">
          <h3 className="font-bold text-lg">💰 Closed Deal</h3>
          <div className="text-2xl font-bold">{`$${closedDeal}M`}</div>
          <p className="text-sm">(100% allocated to Primary Agent)</p>
        </div>
        <div className="grid grid-cols-4 divide-x">
          {stats.map((stat, idx) => (
            <div key={stat.label} className="p-4 text-center self-center">
              <div className="text-lg">{stat.label}</div>
              <input
                type="text"
                className="text-lg font-bold w-16 text-center"
                value={stat.value}
                onChange={(e) => handleStatChange(idx, e.target.value)}
                style={{ outline: "none" }}
              />
            </div>
          ))}
          <div className="p-4 text-center self-center">
            <div className="text-lg">📌 Closed Deal</div>
            <div className="text-lg font-bold">{closedDeal}</div>
          </div>
        </div>
      </div>

      {/* StatGrid 1b & 1c */}
      {statGridData.map((item) => (
        <StatGrid
          key={item.number}
          items={item}
          number={item.number}
          onChange={(path, val) => updateNestedValue(item.number, path, val)}
        />
      ))}

      <BottomComp closedDeal={closedDeal} number="1" pieData={pieData} />

      {/* Download JSON */}
      <button
        onClick={handleDownload}
        className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Download Page Data (JSON)
      </button>
    </div>
  );
};

export default FirstPage;
