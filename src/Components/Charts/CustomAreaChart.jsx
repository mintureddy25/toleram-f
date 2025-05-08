import React from "react";
import { BarList } from "@tremor/react";
import { formatToAbbreviation, toTitleCase } from "../../Utils/Helpers";

export default function CustomAreaChart({
  title,
  chartdata = [],
  categories = [],
  colors = [],
  showLegend = false,
  legendItems = [],
}) {
  return (
    <div className="dark:bg-dark-tremor-bg rounded-lg shadow-md p-5 bg-gray-800 my-4 pr-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong sm:text-gray-100">
          {title}
        </h3>

        {showLegend && legendItems?.length > 0 && (
          <div className="flex gap-4 text-sm text-gray-300">
            {legendItems.map((item, index) => (
              <div key={index} className="flex items-center gap-1">
                <span
                  className={`w-3 h-3 rounded-full bg-${item.color}`}
                ></span>
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {chartdata.length === 0 ? (
        <p className="text-gray-400">No data available</p>
      ) : (
        <BarList
          className="mx-5 mt-1"
          data={chartdata.map((item, index) => ({
            name: toTitleCase(item.name),
            value: Math.abs(item[categories[0]]),
            color: colors[index % colors.length],
          }))}
          valueFormatter={(value) => formatToAbbreviation(value)}
          showAnimation={true}
        />
      )}
    </div>
  );
}
