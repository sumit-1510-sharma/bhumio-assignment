import React, { useState, useEffect } from "react";

// Editable small input
const EditableValue = ({ val, path, onChange }) => {
  const [localVal, setLocalVal] = useState(val);

  useEffect(() => {
    setLocalVal(val); // sync if parent updates externally
  }, [val]);

  return (
    <input
      type="text"
      className="text-base sm:text-lg font-bold w-16 text-center bg-transparent border-none outline-none"
      value={localVal}
      onChange={(e) => setLocalVal(e.target.value)}
      onBlur={() => onChange(path, localVal)}
      spellCheck={false}
    />
  );
};

// Editable large input
const EditableValueLarge = ({ val, path, onChange }) => {
  const [localVal, setLocalVal] = useState(val);

  useEffect(() => {
    setLocalVal(val); // sync if parent updates externally
  }, [val]);

  return (
    <input
      type="text"
      className="text-lg sm:text-2xl font-bold w-32 text-center bg-transparent border-none outline-none"
      value={localVal}
      onChange={(e) => setLocalVal(e.target.value)}
      onBlur={() => onChange(path, localVal)}
      spellCheck={false}
    />
  );
};

// Helper to update nested state by path
const updateByPath = (obj, path, value) => {
  const newObj = Array.isArray(obj) ? [...obj] : { ...obj };
  let temp = newObj;
  for (let i = 0; i < path.length - 1; i++) {
    temp[path[i]] = Array.isArray(temp[path[i]])
      ? [...temp[path[i]]]
      : { ...temp[path[i]] };
    temp = temp[path[i]];
  }
  temp[path[path.length - 1]] = value;
  return newObj;
};

const StatGrid = ({ items, number, onChange }) => {
  const { heading, subHeading, value, stats } = items;

  const handleInputChange = (path, newValue) => {
    const updated = updateByPath(items, path, newValue);
    onChange(updated);
  };

  if (number === "1b") {
    return (
      <div className="w-[95%] sm:w-full sm:max-w-[80%] my-4 sm:my-6 border rounded-xl shadow bg-white">
        {/* Top Two Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x border-b">
          {heading.map((h, idx) => (
            <div key={idx} className="p-2 sm:p-4 text-center">
              <h3 className="text-base sm:text-lg">{h}</h3>
              <EditableValueLarge
                val={value[idx]}
                path={["value", idx]}
                onChange={onChange}
              />
              {subHeading?.[idx] && (
                <p className="text-xs sm:text-sm">{subHeading[idx]}</p>
              )}
            </div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-6 divide-x divide-gray-200">
          {stats.slice(0, 3).map((stat, idx) => (
            <div key={idx} className="col-span-1 p-2 sm:p-4 text-center">
              <div className="text-base sm:text-lg">{stat.label}</div>
              <EditableValue
                val={stat.value}
                path={["stats", idx, "value"]}
                onChange={onChange}
              />
            </div>
          ))}
          <div className="col-span-1 sm:col-span-3 p-2 sm:p-4 text-center flex items-center justify-center">
            <EditableValue
              val={stats[3].value}
              path={["stats", 3, "value"]}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    );
  } else if (number === "1c") {
    return (
      <div className="w-[95%] sm:w-full sm:max-w-[80%] my-4 sm:my-6 border rounded-xl shadow bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x">
          {stats.map((stat, idx) => (
            <div key={idx} className="p-2 sm:p-4 text-center">
              <div className="text-base sm:text-lg">{stat.label}</div>
              <EditableValue
                val={stat.value}
                path={["stats", idx, "value"]}
                onChange={onChange}
              />
            </div>
          ))}
        </div>
      </div>
    );
  } else if (number === "2a") {
    return (
      <div className="w-[95%] sm:w-full sm:max-w-[80%] mb-4 sm:mb-6 border rounded-xl shadow bg-white">
        <div className="p-2 sm:p-3 text-center border-b bg-gray-50 rounded-t-xl">
          <h3 className="font-bold text-base sm:text-lg">{heading}</h3>
        </div>

        <div
          className="grid divide-x divide-gray-200"
          style={{
            gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))`,
          }}
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="p-2 sm:p-4 border-black text-center">
              <div className="text-base sm:text-lg">{stat.label}</div>
              <EditableValue
                val={stat.value}
                path={["stats", idx, "value"]}
                onChange={onChange}
              />
            </div>
          ))}
        </div>
      </div>
    );
  } else if (number === "2b") {
    return (
      <div className="w-[95%] sm:w-full sm:max-w-[80%] my-4 sm:my-6 border rounded-xl shadow bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x border-b">
          {heading.map((h, idx) => (
            <div
              key={idx}
              className="text-center p-2 sm:p-4 font-bold text-base sm:text-lg"
            >
              {h}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x">
          {stats.map((colStats, colIdx) => (
            <div
              key={colIdx}
              className="grid divide-x"
              style={{
                gridTemplateColumns: `repeat(${colStats.length}, minmax(0, 1fr))`,
              }}
            >
              {colStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-2 sm:p-4 flex flex-col items-center justify-center text-center"
                >
                  <div className="text-base sm:text-lg">
                    {stat.label}
                    {stat.subLabel && (
                      <div className="text-xs sm:text-xs">{stat.subLabel}</div>
                    )}
                  </div>
                  <EditableValue
                    val={stat.value}
                    path={["stats", colIdx, idx, "value"]}
                    onChange={onChange}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  } else if (number === "2c") {
    return (
      <div className="w-[95%] sm:w-full sm:max-w-[80%] my-4 sm:my-6 border rounded-xl shadow bg-white">
        <div className="p-2 sm:p-3 text-center border-b bg-gray-50 rounded-t-xl">
          <h3 className="font-bold text-base sm:text-lg">{heading}</h3>
          {subHeading && <p className="text-xs sm:text-sm">{subHeading}</p>}
          <EditableValueLarge
            val={value}
            path={["value"]}
            onChange={onChange}
          />
        </div>

        <div
          className="grid divide-x divide-gray-200"
          style={{
            gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))`,
          }}
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="p-2 sm:p-4 border-black text-center">
              <div className="text-base sm:text-lg">{stat.label}</div>
              <EditableValue
                val={stat.value}
                path={["stats", idx, "value"]}
                onChange={onChange}
              />
            </div>
          ))}
        </div>
      </div>
    );
  } else if (number === "3a") {
    return (
      <div className="w-[95%] sm:w-full sm:max-w-[80%] my-4 sm:my-6 border rounded-xl shadow bg-white">
        {/* Headings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x border-b">
          {heading.map((h, idx) => (
            <div key={idx} className="p-2 sm:p-4 text-center">
              <h3 className="text-base sm:text-lg">{h}</h3>
              {subHeading?.[idx] && (
                <p className="text-xs sm:text-sm">{subHeading[idx]}</p>
              )}
              <EditableValue
                val={value[idx]}
                path={["value", idx]}
                onChange={onChange}
              />
            </div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x">
          {stats.map((colStats, colIdx) => (
            <div
              key={colIdx}
              className="grid divide-x"
              style={{
                gridTemplateColumns: `repeat(${colStats.length}, minmax(0, 1fr))`,
              }}
            >
              {colStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-2 sm:p-4 flex flex-col items-center justify-center text-center"
                >
                  <div className="text-base sm:text-sm lg:text-lg">
                    {stat.label}
                    {stat.subLabel && (
                      <div className="text-xs sm:text-sm">{stat.subLabel}</div>
                    )}
                  </div>
                  <EditableValue
                    val={stat.value}
                    path={["stats", colIdx, idx, "value"]}
                    onChange={onChange}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  } else if (number === "3b") {
    return (
      <div className="w-[95%] sm:w-full sm:max-w-[80%] my-4 sm:my-6 border rounded-xl shadow bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x">
          {stats.map((stat, idx) => (
            <div key={idx} className="p-2 sm:p-4 text-center self-center">
              <div className="text-xs sm:text-sm">{stat.label}</div>
              {stat.subLabel && (
                <div className="text-xs sm:text-sm">{stat.subLabel}</div>
              )}
              <EditableValue
                val={stat.value}
                path={["stats", idx, "value"]}
                onChange={onChange}
              />
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    // Default fallback layout
    return (
      <div className="w-[95%] sm:w-full sm:max-w-[80%] my-4 sm:my-6 border rounded-xl shadow bg-white">
        <div className="p-2 sm:p-4 text-center border-b">
          <h3 className="font-bold text-base sm:text-lg">{heading}</h3>
          <EditableValueLarge
            val={value}
            path={["value"]}
            onChange={onChange}
          />
          {subHeading && (
            <p className="text-xs sm:text-sm text-gray-500">{subHeading}</p>
          )}
        </div>
      </div>
    );
  }
};

export default StatGrid;
