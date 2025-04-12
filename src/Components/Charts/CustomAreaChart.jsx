import React from "react";
import { AreaChart, BarChart, BarList } from "@tremor/react";
import { useState } from "react";
import numeral from "numeral";

export default function CustomAreaChart({
  title,
  chartdata,
  categories,
  colors,
}) {
  return (
    <div className=" dark:bg-dark-tremor-bg rounded-lg shadow-md p-5 bg-gray-800 my-4 pr-4">
      <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong mt-2 text-left">
        {title}
      </h3>
      <BarList
        className="mx-5 mt-1"
        data={chartdata.map((item) => ({
          name: item.name,
          value: item[categories[0]],
        }))}
        valueFormatter={(value) => numeral(value).format("0,0")}
        showAnimation={true}
      />
    </div>
  );
}
