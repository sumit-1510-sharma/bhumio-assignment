// StatGrid expects two props: items (object with all data), number (string like "1a", "2b", etc)
const StatGrid = ({ items, number }) => {
  // Destructure the data from items
  const { heading, subHeading, value, stats } = items;

  // Helper to render editable value
  const EditableValue = ({ val }) => (
    <input
      type="text"
      className="text-base sm:text-lg font-bold w-16 text-center bg-transparent border-none outline-none"
      defaultValue={val}
      readOnly={false}
      spellCheck={false}
    />
  );

  // Helper to render editable value for headings (for 1b, 2b, etc)
  const EditableValueLarge = ({ val }) => (
    <input
      type="text"
      className="text-lg sm:text-2xl font-bold w-32 text-center bg-transparent border-none outline-none"
      defaultValue={val}
      readOnly={false}
      spellCheck={false}
    />
  );

  // Render differently based on the "number" prop
  if (number === "1b") {
    return (
      <div className="w-[95%] sm:w-full sm:max-w-[80%] my-4 sm:my-6 border rounded-xl shadow bg-white">
        {/* Top Two Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x border-b">
          <div className="p-2 sm:p-4 text-center">
            <h3 className="text-base sm:text-lg">{heading[0]}</h3>
            <EditableValueLarge val={value[0]} />
            {subHeading[0] && (
              <p className="text-xs sm:text-sm">{subHeading[0]}</p>
            )}
          </div>
          <div className="p-2 sm:p-4 text-center">
            <h3 className="text-base sm:text-lg">{heading[1]}</h3>
            <EditableValueLarge val={value[1]} />
            {subHeading[1] && (
              <p className="text-xs sm:text-sm">{subHeading[1]}</p>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-6 divide-x divide-gray-200">
          {/* First 3 stats → 1/6 each */}
          {stats.slice(0, 3).map((stat, idx) => (
            <div
              key={idx}
              className="col-span-1 p-2 sm:p-4 border-black text-center"
            >
              <div className="text-base sm:text-lg">{stat.label}</div>
              <EditableValue val={stat.value} />
            </div>
          ))}

          {/* Last stat → 1/2 width (col-span-3 out of 6) */}
          <div className="col-span-1 sm:col-span-3 p-2 sm:p-4 text-center flex items-center justify-center">
            <EditableValue val={stats[3].value} />
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
              <input
                type="text"
                className="text-base sm:text-lg font-bold w-32 text-center bg-transparent border-none outline-none"
                defaultValue={stat.value}
                readOnly={false}
                spellCheck={false}
              />
            </div>
          ))}
        </div>
      </div>
    );
  } else if (number === "2a") {
    return (
      <div className="w-[95%] sm:w-full sm:max-w-[80%] mb-4 sm:mb-6 border rounded-xl shadow bg-white">
        {/* Section Heading */}
        <div className="p-2 sm:p-3 text-center border-b bg-gray-50 rounded-t-xl">
          <h3 className="font-bold text-base sm:text-lg">{heading}</h3>
        </div>

        {/* Stats Grid */}
        <div
          className="grid divide-x divide-gray-200"
          style={{
            gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))`,
          }}
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="p-2 sm:p-4 border-black text-center">
              <div className="text-base sm:text-lg">{stat.label}</div>
              <EditableValue val={stat.value} />
            </div>
          ))}
        </div>
      </div>
    );
  } else if (number === "2b") {
    return (
      <div className="w-[95%] sm:w-full sm:max-w-[80%] my-4 sm:my-6 border rounded-xl shadow bg-white">
        {/* Section Headings */}
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
                  <div className="text-base sm:text-lg">
                    {stat.label}
                    {stat.subLabel && (
                      <div className="text-xs sm:text-xs">{stat.subLabel}</div>
                    )}
                  </div>
                  <EditableValue val={stat.value} />
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
        {/* Section Heading */}
        <div className="p-2 sm:p-3 text-center border-b bg-gray-50 rounded-t-xl">
          <h3 className="font-bold text-base sm:text-lg">{heading}</h3>
          {subHeading && <p className="text-xs sm:text-sm">{subHeading}</p>}
          <EditableValueLarge val={value} />
        </div>

        {/* Stats Grid */}
        <div
          className="grid divide-x divide-gray-200"
          style={{
            gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))`,
          }}
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="p-2 sm:p-4 border-black text-center">
              <div className="text-base sm:text-lg">{stat.label}</div>
              <EditableValue val={stat.value} />
            </div>
          ))}
        </div>
      </div>
    );
  } else if (number === "3a") {
    return (
      <div className="w-[95%] sm:w-full sm:max-w-[80%] my-4 sm:my-6 border rounded-xl shadow bg-white">
        {/* Section Headings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x border-b">
          {heading.map((h, idx) => (
            <div key={idx} className="p-2 sm:p-4 text-center">
              <h3 className="text-base sm:text-lg">{h}</h3>
              {subHeading[idx] && (
                <p className="text-xs sm:text-sm">{subHeading[idx]}</p>
              )}
              <EditableValue val={value[idx]} />
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
                  <EditableValue val={stat.value} />
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
              <div className="text-xs sm:text-sm">{stat.subLabel}</div>
              <EditableValue val={stat.value} />
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
          <EditableValueLarge val={value} />
          {subHeading && (
            <p className="text-xs sm:text-sm text-gray-500">{subHeading}</p>
          )}
        </div>
      </div>
    );
  }
};

export default StatGrid;
