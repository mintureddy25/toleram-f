import React, { useState } from "react";
import BettingHistoryRow from "./Row";

const BettingHistory = ({ matchBets = [], roundBets = [] }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const combinedBets = [
    ...matchBets.map((m, i) => ({ ...m, type: "Match", key: `match-${i}` })),
    ...roundBets.map((r, i) => ({ ...r, type: "Round", key: `round-${i}` })),
  ];

  const headers = [
    { label: "Type", className: "px-6 py-3 rounded-tl-lg" },
    { label: "Title", className: "px-6 py-3" },
    { label: "Bet Amount", className: "px-6 py-3" },
    { label: "Points", className: "px-6 py-3" },
    { label: "Action", className: "px-6 py-3 rounded-tr-lg text-right" },
  ];

  const toggleExpand = (key) => {
    setExpandedIndex(expandedIndex === key ? null : key);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow">
      <h3 className="tracking-tight text-gray-100 text-left sm:text-xl mb-4">
        Betting History
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-900 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              {headers.map((header, idx) => (
                <th key={idx} className={header.className}>
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {combinedBets.map((entry, index) => (
              <BettingHistoryRow
                key={entry.key}
                entry={entry}
                isExpanded={expandedIndex === entry.key}
                toggleExpand={toggleExpand}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BettingHistory;
