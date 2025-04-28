import React from "react";
import { PLAYER_IMAGE } from "../../constants/teamLimits";
import { Link } from "react-router-dom";

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
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="bg-gray-800 p-3 sticky top-0 shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 max-w-6xl mx-auto">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
              />
            </svg>

            <div>
              <h1 className="text-sm font-bold text-left">My Super 12 Team</h1>
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
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white text-sm font-medium shadow-sm hover:bg-indigo-500 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 py-2 px-4 w-full sm:w-auto justify-center"
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
              <div className="relative rounded-xl overflow-hidden bg-gray-800 shadow">
                <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 rounded-bl-lg font-bold flex items-center text-xs">
                  CAPTAIN
                </div>
                <div className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-red-500 shadow-lg flex-shrink-0">
                    <img
                      src={captain.player_logo || PLAYER_IMAGE}
                      alt={captain.player_name}
                      className="w-full h-full"
                      onError={(e) => {
                        e.target.src = "/api/placeholder/100/100";
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-start">
                    <div className="flex-1">
                      <h3 className="font-bold text-sm">
                        {captain.player_name}
                      </h3>
                      <div className="mt-1 bg-red-800/50 rounded-full px-3 py-1 inline-block">
                        <span className="text-yellow-300 mt-1 font-bold text-sm sm:text-base">
                          {captain.points}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {viceCaptain && (
              <div className="relative  rounded-xl overflow-hidden bg-gray-800 shadow">
                <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 rounded-bl-lg font-bold flex items-center text-xs">
                  VICE CAPTAIN
                </div>
                <div className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-blue-500 shadow-lg flex-shrink-0">
                    <img
                      src={viceCaptain.player_logo || PLAYER_IMAGE}
                      alt={viceCaptain.player_name}
                      className="w-full h-full"
                      onError={(e) => {
                        e.target.src = "/api/placeholder/100/100";
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-start">
                    <div className="flex-1">
                      <h3 className="font-bold text-sm">
                        {viceCaptain.player_name}
                      </h3>
                      <div className="mt-1 bg-blue-800/50 rounded-full px-3 py-1 inline-block">
                        <span className="text-yellow-300 mt-1 font-bold text-sm sm:text-base">
                          {viceCaptain.points}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-md font-bold mb-4 text-center">
            <span className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white text-sm font-medium shadow-sm hover:bg-indigo-500 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 px-4 py-2 rounded-full inline-block">
              TEAM PLAYERS
            </span>
          </h2>

          <div className="relative rounded-xl px-2 py-8 bg-gray-800 shadow">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-2 gap-y-6">
              {players.map((player) => (
                <PlayerBubble key={player.player_id} player={player} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlayerBubble = ({ player }) => {
  return (
    <div className="flex flex-col items-center transform transition-transform hover:scale-105 group">
      <div className="relative">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm border-2 border-white/50 shadow-lg group-hover:border-indigo-600 transition-all duration-300">
          <img
            src={player.player_logo || PLAYER_IMAGE}
            alt={player.player_name}
            className="w-full h-full"
          />
        </div>
        <div className="absolute -top-2 -right-2 text-white w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-bold">
          {player.points}
        </div>
      </div>
      <h3 className="font-medium text-xs mt-1 text-center w-16">
        {player.player_name}
      </h3>
    </div>
  );
};

export default TeamDetails;
