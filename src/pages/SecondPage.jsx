import BottomComp from "../components/BottomComp";
import StatGrid from "../components/StatGrid";
import React, { useState } from "react";

const SecondPage = () => {
  const [statGridData, setStatGridData] = useState([
    {
      number: "2a",
      heading: "Agents & Offices",
      stats: [
        { label: "Current Total Agents", value: "32" },
        { label: "Current Active Agents", value: "32" },
        { label: "Current Inactive Agents", value: "0" },
        { label: "# Offices", value: "1" },
      ],
    },
    {
      number: "2b",
      heading: [
        "Sold to List Price Ratio Change (%)",
        "Avg. # of Days on Market (List to Close)",
      ],
      stats: [
        [
          {
            label: "(All Sides)",
            subLabel: "Not a Simple Avg. of Buy and Sell",
            value: "5.6%",
          },
          { label: "(Buy Side)", subLabel: "Dual included", value: "4.9%" },
          { label: "(Buy Side)", subLabel: "Dual included", value: "6%" },
        ],
        [
          { label: "(All Sides)", value: "175" },
          { label: "(Buy Side)", subLabel: "Dual included", value: "134" },
          { label: "(Buy Side)", subLabel: "Dual included", value: "200" },
        ],
      ],
    },
    {
      number: "2c",
      heading: "Estimated Total Org. Revenue",
      subHeading: "(8% overhead + 20% Brokerage share)",
      value: "$213K",
      stats: [
        { label: "Property Sold Month Rate", value: "18" },
        { label: "Property Sold Weekly Rate", value: "4" },
        { label: "Property Sold Per Day", value: "~1" },
        { label: "Deals Per Agent", value: "5" },
      ],
    },
  ]);

  // Update nested value by path
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

  // Download JSON
  const handleDownload = () => {
    const dataToDownload = { statGridData };
    const jsonStr = JSON.stringify(dataToDownload, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "secondpage-data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl sm:text-2xl lg:text-3xl text-center font-bold mt-16 my-4">
        Brokerage Dashboard: Sterling Real Estate Group
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

      <BottomComp number="2" />

      <button
        onClick={handleDownload}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Download Page Data (JSON)
      </button>
    </div>
  );
};

export default SecondPage;
