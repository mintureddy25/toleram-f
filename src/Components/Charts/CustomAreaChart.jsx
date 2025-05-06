import React from "react";
import { BarList } from "@tremor/react";
import { formatToAbbreviation, toTitleCase } from "../../Utils/Helpers";

export default function CustomAreaChart({
  title,
  chartdata,
  categories,
  colors,
}) {
  return (
    <div className=" dark:bg-dark-tremor-bg rounded-lg shadow-md p-5 bg-gray-800 my-4 pr-4">
      <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong mt-2 text-left sm:text-gray-100">
        {title}
      </h3>

      {chartdata?.length === 0 ? (
        <>No data available</>
      ) : (
        <BarList
          className="mx-5 mt-1"
          data={chartdata?.map((item, index) => ({
            name: toTitleCase(item.name),
            value: item[categories[0]],
            color: colors[index % colors.length],
          }))}
          valueFormatter={(value) => formatToAbbreviation(value)}
          showAnimation={true}
        />
      )}
    </div>
  );
}
