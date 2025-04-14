import React from "react";
import BettingDetailsTable from "./QuestionsTable";


const BettingHistoryRow = ({ entry, isExpanded, toggleExpand, index }) => {
  return (
    <>
      <tr className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"}>
        <td className="px-6 py-4 tracking-tight">
          <span className="bg-indigo-900 text-indigo-300 px-2 py-1 rounded text-xs">
            {entry.type}
          </span>
        </td>
        <td className="px-6 py-4 tracking-tight">
          {entry.type === "Match" ? entry.matchTitle : entry.roundTitle}
        </td>
        <td className="px-6 py-4 tracking-tight">{entry.betAmount}</td>
        <td className="px-6 py-4 tracking-tight">{entry.points}</td>
        <td className="px-6 py-4 text-right">
          <button
            onClick={() => toggleExpand(entry.key)}
            className="text-indigo-400 hover:underline text-xs"
          >
            {isExpanded ? "Hide" : "View"} Details
          </button>
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan="5" className="bg-gray-900 px-6 py-4">
            <BettingDetailsTable bets={entry.bets} />
          </td>
        </tr>
      )}
    </>
  );
};

export default BettingHistoryRow;
