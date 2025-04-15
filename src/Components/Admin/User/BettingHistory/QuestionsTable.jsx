import React from "react";
import ResultBadge from "./ResultBadge";

const BettingDetailsTable = ({ bets }) => {
  const tableColumns = [
    {
      label: "Question",
      render: (bet) => bet.question,
    },
    {
      label: "Selected Option",
      render: (bet) => {
        const selected = bet.options.find((opt) => opt.id === bet.choseOption);
        return selected?.option || "N/A";
      },
    },
    {
      label: "Correct Option",
      render: (bet) => {
        const correctOption = bet.options.find(
          (opt) => opt.id.toString() === bet.correctOption
        );
        return correctOption?.option || "N/A";
      },
    },
    {
      label: "Amount",
      render: (bet) => bet.betAmount,
    },
    {
      label: "Odds",
      render: (bet) => {
        const selected = bet.options.find((opt) => opt.id === bet.choseOption);
        return selected?.odds || "-";
      },
    },
    {
      label: "Result",
      render: (bet) => {
        let result = "NA";
        if (
          bet.correct === "Yes" &&
          bet.choseOption.toString() === bet.correctOption
        ) {
          result = "Won";
        } else if (bet.correct === "No" && bet.correctOption) {
          result = "Lost";
        }
        return <ResultBadge result={result} />;
      },
    },
  ];

  return (
    <table className="min-w-full mt-2 text-left">
      <thead>
        <tr className="bg-gray-900 text-xs font-medium text-gray-400 uppercase tracking-wider">
          {tableColumns.map((col, idx) => (
            <th key={idx} className="px-6 py-3">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-700">
        {bets.map((bet, index) => (
          <tr
            key={index}
            className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"}
          >
            {tableColumns.map((col, i) => (
              <td key={i} className="px-6 py-4 tracking-tight">
                {col.render(bet)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BettingDetailsTable;
