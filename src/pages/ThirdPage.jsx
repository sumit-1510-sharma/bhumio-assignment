import BottomComp from "../components/BottomComp";
import StatGrid from "../components/StatGrid";
import React from "react";

const ThirdPage = () => {
  const statGridData = [
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
  ];

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mt-16 my-4">
        Market Analytics
      </h2>

      <StatGrid
        key={statGridData[0].number}
        items={statGridData[0]}
        number={statGridData[0].number}
      />
      <StatGrid
        key={statGridData[1].number}
        items={statGridData[1]}
        number={statGridData[1].number}
      />

      <BottomComp number="3" />
    </div>
  );
};

export default ThirdPage;
