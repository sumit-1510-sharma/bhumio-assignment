import React, { useState } from "react";
import BottomComp from "../components/BottomComp";
import StatGrid from "../components/StatGrid";

const ThirdPage = () => {
  // ✅ Use state for editable data
  const [statGridData, setStatGridData] = useState([
    {
      number: "3a",
      heading: ["Average Listing Price", "# Active Agents"],
      subHeading: ["Per Sqft.", "(Done At least 1 Deal)"],
      value: ["$379", "2504"],
      stats: [
        [
          { label: "📌# Closed", value: "6573" },
          { label: "⏳# Pending", value: "3215" },
          { label: "🔉# Active", value: "3606" },
        ],
        [
          { label: "Property Price Market Median", value: "$138K" },
          { label: " Avg. Days from Pending to Closed", value: "71" },
          { label: "Gross Income (Commission)", value: "$245M" },
        ],
      ],
    },
    {
      number: "3b",
      stats: [
        { label: "Multiple-Agent Deal", subLabel: "(Seller)", value: "14%" },
        { label: "Multiple-Agent Deal", subLabel: "(Buyer)", value: "6%" },
        { label: "Duel", subLabel: "(Buyer, Seller)", value: "14%" },
        { label: "Single Agent Deal", subLabel: "(Seller)", value: "86%" },
        { label: "Single Agent Deal", subLabel: "(Buyer)", value: "94%" },
      ],
    },
  ]);

  // ✅ Update nested value by path
  const handleStatGridChange = (number, path, newValue) => {
    setStatGridData((prev) =>
      prev.map((item) => {
        if (item.number !== number) return item;

        const updatedItem = JSON.parse(JSON.stringify(item)); // deep clone
        let temp = updatedItem;
        for (let i = 0; i < path.length - 1; i++) temp = temp[path[i]];
        temp[path[path.length - 1]] = newValue;

        return updatedItem;
      })
    );
  };

  // ✅ Download latest state as JSON
  const handleDownload = () => {
    const dataToDownload = { statGridData };
    const jsonStr = JSON.stringify(dataToDownload, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "thirdpage-data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mt-16 my-4">
        Market Analytics
      </h2>

      {statGridData.map((gridItem) => (
        <StatGrid
          key={gridItem.number}
          items={gridItem}
          number={gridItem.number}
          onChange={(path, value) =>
            handleStatGridChange(gridItem.number, path, value)
          }
        />
      ))}

      <BottomComp number="3" />

      <button
        onClick={handleDownload}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Download Page Data (JSON)
      </button>
    </div>
  );
};

export default ThirdPage;
