import React from "react";
import { PLAYER_IMAGE } from "../../constants/teamLimits";
import { Link } from "react-router-dom";
import {
  ShieldCheckIcon,
  StarIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";

const TeamDetails = ({ teamData, handleEdit }) => {
  const calculatedTotalPoints = teamData.team.reduce(
    (sum, player) => sum + player.points,
    0
  );
  const totalPoints = calculatedTotalPoints || teamData.totalPoints;

  const captain = teamData.team.find(
    (player) => player.player_role === "captain"
  );
  const viceCaptain = teamData.team.find(
    (player) => player.player_role === "vice-captain"
  );
  const players = teamData.team.filter(
    (player) => player.player_role === "player"
  );

  return (
    <div className="min-h-screen text-white">
      <div className="bg-gray-800/95 backdrop-blur-sm  p-3 sticky top-0 shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 max-w-6xl mx-auto">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-2 rounded-lg shadow-inner">
              <TrophyIcon className="size-12 text-yellow-600" />
            </div>

            <div>
              <h1 className="text-sm font-bold text-left">
                {teamData?.teamName}
              </h1>
              <div className="flex items-center">
                <span className="text-gray-200 text-sm">Total Points:</span>
                <span className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-sm font-bold rounded-full px-3 py-0.5 ml-2">
                  {totalPoints}
                </span>
              </div>
            </div>
          </div>
          {teamData?.canEdit && (
            <button
              onClick={handleEdit}
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 text-white text-sm font-medium shadow-sm hover:bg-green-500 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 py-2 px-4 w-full sm:w-auto justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              Edit Team
            </button>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-3">
        <div className="mb-6 mt-4">
          <div className="flex flex-col gap-4">
            {captain && (
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800 shadow">
                <div className="absolute bottom-0 right-0 bg-red-600 text-white px-3 py-1 rounded-tl-lg font-bold flex items-center text-xs">
                  <ShieldCheckIcon className="size-4 text-white mr-1" /> CAPTAIN
                </div>
                <div className="p-3 flex items-center gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-red-500 shadow-lg flex-shrink-0">
                    <img
                      src={captain.player_logo || PLAYER_IMAGE}
                      alt={captain.player_name}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <h3 className="font-bold text-sm">{captain.player_name}</h3>
                    <div className="bg-red-800/50 text-left rounded-full px-3 py-1 inline-block mt-1">
                      <span className="text-yellow-300 font-bold text-sm sm:text-base">
                        {captain.points}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {viceCaptain && (
              <div className="relative  rounded-xl overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800 shadow">
                <div className="absolute bottom-0 right-0 bg-blue-600 text-white px-3 py-1 rounded-tl-lg font-bold flex items-center text-xs">
                  <StarIcon className="size-4 text-white mr-1" /> VICE-CAPTAIN
                </div>
                <div className="p-3 flex items-center gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-blue-500 shadow-lg flex-shrink-0">
                    <img
                      src={viceCaptain.player_logo || PLAYER_IMAGE}
                      alt={viceCaptain.player_name}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <h3 className="font-bold text-sm">
                      {viceCaptain.player_name}
                    </h3>
                    <div className="bg-red-800/50 text-left rounded-full px-3 py-1 inline-block mt-1">
                      <span className="text-yellow-300 font-bold text-sm sm:text-base">
                        {viceCaptain.points}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-md font-bold mb-4 text-center">
            <span className="inline-flex items-center gap-2 rounded-lg bg-green-600 text-white text-sm font-medium shadow-sm transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 px-4 py-2 rounded-full inline-block">
              TEAM PLAYERS
            </span>
          </h2>

          <div className="relative rounded-xl px-4 py-8 bg-gradient-to-br from-gray-700 to-gray-800 shadow">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-2 gap-y-6 justify-center">
              {players.map((player, index) => (
                <PlayerBubble
                  key={player.player_id}
                  player={player}
                  isLast={index === players.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlayerBubble = ({ player, isLast }) => {
  return (
    <div
      className={`flex flex-col items-center transform transition-all scale-110 group ${
        isLast ? "col-start-2 sm:col-start-auto" : ""
      }`}
    >
      <div className="relative mb-2">
        <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-gradient-to-b from-gray-600 to-gray-700 border-2 border-gray-400 shadow-lg shadow-green-500/20 transition-all duration-300">
          <img
            src={player.player_logo || PLAYER_IMAGE}
            alt={player.player_name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "/api/placeholder/100/100";
            }}
          />
        </div>
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-xs font-bold rounded-lg w-7 h-6 px-1 flex items-center justify-center shadow-lg border border-gray-800">
          {player.points}
        </div>
      </div>
      <h3 className="font-medium text-xs text-left sm:text-center px-2 py-0.5 rounded-md w-full truncate transition-colors">
        {player.player_name}
      </h3>
    </div>
  );
};

export default TeamDetails;
