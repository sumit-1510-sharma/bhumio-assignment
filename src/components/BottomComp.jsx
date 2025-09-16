import React from "react";
import rank_image from "../assets/rank_image.png";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
const COLORS2 = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#845EC2",
  "#D65DB1",
  "#FF6F91",
  "#FF9671",
  "#FFC75F",
  "#F9F871",
  "#2C73D2",
  "#0081CF",
  "#B39CD0",
  "#FF5E78",
];
const COLORS3 = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#845EC2",
  "#D65DB1",
];

const pieData2 = [
  { name: "Angela Boisvert", value: 20 },
  { name: "Christ", value: 13 },
  { name: "Kerry Loiselle", value: 13 },
  { name: "Carla", value: 13 },
  { name: "Richard Gargiulo", value: 9 },
  { name: "Sarah Trojanoski", value: 8 },
  { name: "David Ryan", value: 5 },
  { name: "Kathari", value: 4 },
  { name: "David", value: 4 },
  { name: "Laura", value: 3 },
  { name: "Richard Von", value: 3 },
  { name: "James Ciccarello", value: 2 },
  { name: "Laurie A Barton", value: 2 },
  { name: "Tina Berlin", value: 1 },
];

const pieData3 = [
  { name: "Active", value: 21 },
  { name: "Pending", value: 17 },
  { name: "Expire", value: 10 },
  { name: "Cancelled", value: 5 },
  { name: "Others", value: 4 },
  { name: "Closed", value: 43 },
];

const BottomComp = ({ closedDeal, number, pieData }) => {
  let content;

  if (number === "1" || number === 1) {
    content = (
      <div className="w-full max-w-[95%] sm:max-w-[80%] mx-auto my-8 py-8 bg-white rounded-xl border shadow p-6">
        <h3 className="text-lg font-bold sm:mb-4 text-center">
          Total Closed Deals Analysis
        </h3>
        <div className="relative flex flex-col sm:flex-row items-center justify-between">
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ name, percent, x, y }) => (
                    <text
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={10} // 👈 adjust size here
                      fill="#333"
                    >
                      {`${name}: ${(percent * 100).toFixed(0)}%`}
                    </text>
                  )}
                >
                  {pieData.map((entry, idx) => (
                    <Cell
                      key={`cell-${idx}`}
                      fill={COLORS[idx % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip contentStyle={{ fontSize: "12px" }} />
                {/* <Legend wrapperStyle={{ fontSize: "12px" }} /> */}
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData2}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ name, percent, x, y }) => (
                    <text
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={10} // 👈 smaller font size
                      fill="#333"
                    >
                      {`${name}: ${(percent * 100).toFixed(0)}%`}
                    </text>
                  )}
                >
                  {pieData2.map((entry, idx) => (
                    <Cell
                      key={`cell-${idx}`}
                      fill={COLORS2[idx % COLORS2.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 -sm:bottom-2 flex justify-center w-full">
            <p>
              # Closed Deals <span className="font-bold">{closedDeal}</span>
            </p>
          </div>
        </div>
      </div>
    );
  } else if (number === "2" || number === 2) {
    // Content for SecondPage
    content = (
      <div className="w-full max-w-[95%] sm:max-w-[80%] flex justify-center my-6 border rounded-xl  py-8">
        <img
          src={rank_image} // 👈 replace with your actual image path
          alt="Second Page Graphic"
          className="w-100 rounded-xl"
        />
      </div>
    );
  } else if (number === "3" || number === 3) {
    // Content for ThirdPage
    content = (
      <div className="w-full max-w-[95%] sm:max-w-[80%] mx-auto my-8 bg-white rounded-xl border shadow p-6">
        <h3 className="text-sm sm:text-lg font-bold mb-4 text-center">
          Distribution of Property Listing Status
        </h3>

        <div className="w-full" style={{ maxWidth: 500, margin: "0 auto" }}>
          <div
            style={{
              width: "100%",
              height: "clamp(200px, 40vw, 340px)",
              minHeight: 180,
              maxHeight: 400,
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData3}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  innerRadius="55%"
                  label={({ name, percent, x, y }) => (
                    <text
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={10}
                      fill="#333"
                    >
                      {`${name}: ${(percent * 100).toFixed(0)}%`}
                    </text>
                  )}
                >
                  {pieData3.map((entry, idx) => (
                    <Cell
                      key={`cell-${idx}`}
                      fill={COLORS3[idx % COLORS3.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  } else {
    // Fallback for unexpected number prop
    content = <div>Fallback for any other page number</div>;
  }

  return content;
};

export default BottomComp;
