import React from "react";
import { PLAYER_IMAGE } from "../../../constants/teamLimits";
import { TrophyIcon } from "@heroicons/react/24/solid";

const Dream11Team = ({ dream11 }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow">
      <div className="bg-gray-900 rounded-lg p-4 mb-2 shadow-lg border border-gray-800">
        <div className="flex-wrap flex items-center justify-between">
          <div className="flex items-center space-x-2 mb-2 sm:mb-0">
            <div className="p-1.5 bg-gray-800 rounded-lg">
              <TrophyIcon className="size-6 text-green-600" />{" "}
            </div>
            <h3 className="text-xl font-bold text-white tracking-wide">
              Super12 Team
            </h3>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center px-3 py-1.5 bg-gray-800 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5 text-green-400 mr-2"
              >
                <path
                  fillRule="evenodd"
                  d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium text-green-400">
                Rank: {dream11.userRank || "N/A"}
              </span>
            </div>

            <div className="flex items-center px-3 py-1.5 bg-gray-800 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5 text-yellow-400 mr-2"
              >
                <path
                  fillRule="evenodd"
                  d="M12 1.5a.75.75 0 0 1 .75.75V4.5a.75.75 0 0 1-1.5 0V2.25A.75.75 0 0 1 12 1.5ZM5.636 4.136a.75.75 0 0 1 1.06 0l1.592 1.591a.75.75 0 0 1-1.061 1.06l-1.591-1.59a.75.75 0 0 1 0-1.061Zm12.728 0a.75.75 0 0 1 0 1.06l-1.591 1.592a.75.75 0 0 1-1.06-1.061l1.59-1.591a.75.75 0 0 1 1.061 0Zm-6.816 4.496a.75.75 0 0 1 .82.311l5.228 7.917a.75.75 0 0 1-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 0 1-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 0 1-1.247-.606l.569-9.47a.75.75 0 0 1 .554-.68ZM3 10.5a.75.75 0 0 1 .75-.75H6a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 10.5Zm14.25 0a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5H18a.75.75 0 0 1-.75-.75Zm-8.962 3.712a.75.75 0 0 1 0 1.061l-1.591 1.591a.75.75 0 1 1-1.061-1.06l1.591-1.592a.75.75 0 0 1 1.06 0Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium text-yellow-400">
                Points: {dream11.totalPoints}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {dream11.team.map((player, index) => (
          <div
            key={index}
            className="flex items-center p-2 bg-gray-900 rounded-lg"
          >
            <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden flex-shrink-0">
              <img
                src={player.player_logo || PLAYER_IMAGE}
                alt={player.player_name}
                className="w-full h-full"
              />
            </div>
            <div className="ml-3 flex-grow">
              <p className="font-medium text-left">{player.player_name}</p>
              <div className="flex items-center">
                <span
                  className={`text-xs ${
                    player.player_role === "captain"
                      ? "text-yellow-400"
                      : player.player_role === "vice-captain"
                      ? "text-green-400"
                      : "text-gray-400"
                  }`}
                >
                  {player.player_role === "captain"
                    ? "Captain"
                    : player.player_role === "vice-captain"
                    ? "Vice Captain"
                    : "Player"}
                </span>
                {player.points > 0 && (
                  <span className="ml-2 text-xs text-green-400">
                    +{player.points} pts
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dream11Team;
