import BottomComp from "../components/BottomComp";
import StatGrid from "../components/StatGrid";
import React from "react";

const SecondPage = () => {
  const statGridData = [
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
  ];

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl sm:text-2xl lg:text-3xl text-center font-bold mt-16 my-4">
        Brokerage Dashboard: Sterling Real Estate Group
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
      <StatGrid
        key={statGridData[2].number}
        items={statGridData[2]}
        number={statGridData[2].number}
      />

      <BottomComp number="2" />
    </div>
  );
};

export default SecondPage;
