import {
  CheckBadgeIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";

export default function Dream11Header() {
  const [showRules, setShowRules] = useState(false);
  const [hovering, setHovering] = useState(false);

  const rules = [
    "You must select your own dream team of 10 (male players) + 2 (female players) for the entire tournament. Each player has a specified point value associated with them. You will have to select your team within 100 credits.",
    "Hurry up! Team entry window will close by 8th May, 8 am.",
    "Please do not share your user credentials with anyone to ensure sanctity of your bets. Bets once finalized will not be cancelled.",
    "You must select 2 female players, minimum 3 to maximum 5 batsmen, minimum 2 allrounders to maximum 4 allrounders, minimum 3 bowlers to maximum 5 bowlers.",
  ];

  const shouldShowRules = showRules || hovering;

  return (
    <div className="relative">
      <div className="bg-green-600 text-white text-sm font-medium shadow-sm hover:bg-green-500 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 p-2 rounded-t-lg flex justify-between items-center">
        <div className="w-6"></div>
        <h1 className="text-md font-bold text-center">
          Super 12 Team Selection
        </h1>

        <InformationCircleIcon
          className="text-gray-100 h-5 w-5"
          onClick={() => setShowRules(!showRules)}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        />
      </div>

      {shouldShowRules && (
        <div
          className="absolute right-0 top-12 w-full sm:w-96 p-4 bg-gray-900 text-white rounded-md shadow-lg z-20"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold">Super12 Rules</h3>
            <button
              onClick={() => {setShowRules(false); setHovering(false)}}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <ul className="list-decimal pl-5 space-y-2 text-sm">
            {rules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
