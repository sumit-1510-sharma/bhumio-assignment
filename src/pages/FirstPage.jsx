import BottomComp from "../components/BottomComp";
import StatGrid from "../components/StatGrid";
import React, { useState } from "react";

const FirstPage = () => {
  // Initial values for Sell Side, Dual Side, Buy Side
  const [stats, setStats] = useState([
    { label: "🏠 # Sell Side", value: 67 },
    { label: "⚖ # Dual Side", value: 38 },
    { label: "🔑 # Buy Side", value: 37 },
  ]);

  // Calculate closed deal as sum of the three
  const closedDeal = stats.reduce((sum, s) => sum + Number(s.value), 0);

  // Handler for input change
  const handleStatChange = (idx, newValue) => {
    // Only allow numbers >= 0
    const val = Math.max(0, parseInt(newValue) || 0);
    setStats((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, value: val } : s))
    );
  };

  // Prepare statGridData for 1b and 1c (unchanged)
  const statGridData = [
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
  ];

  // Prepare data for pie chart (to be passed to BottomComp)
  const pieData = stats.map((s) => ({
    name: s.label.replace("# ", ""), // cleaner legend
    value: Number(s.value),
  }));

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mt-16 my-4">
        Brokerage Dashboard: Sterling Real Estate Group
      </h2>

      {/* Editable StatGrid for 1a */}
      <div className="w-full max-w-[80%] mb-6 border rounded-xl shadow bg-white">
        <div className="p-4 text-center border-b">
          <h3 className="font-bold text-lg">💰 Closed Deal</h3>
          <div className="text-2xl font-bold">{`$69M`}</div>
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

      {/* StatGrid for 1b */}
      <StatGrid
        key={statGridData[0].number}
        items={statGridData[0]}
        number={statGridData[0].number}
      />
      {/* StatGrid for 1c */}
      <StatGrid
        key={statGridData[1].number}
        items={statGridData[1]}
        number={statGridData[1].number}
      />

      <BottomComp closedDeal={closedDeal} number="1" pieData={pieData} />
    </div>
  );
};

export default FirstPage;
