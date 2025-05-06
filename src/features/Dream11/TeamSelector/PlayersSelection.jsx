import React from "react";
import { PLAYER_IMAGE } from "../../../constants/teamLimits";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

const PlayerSelection = ({
  playersLoading,
  error,
  searchQuery,
  setSearchQuery,
  teamFilter,
  setTeamFilter,
  filter,
  setFilter,
  genderFilter,
  setGenderFilter,
  getUniqueTeams,
  filteredPlayers,
  isPlayerSelected,
  togglePlayerSelection,
  getRoleColorClass,
}) => {
  const genderColors = { male: "green", female: "red", others: "yellow" };

  return (
    <div className="flex flex-col h-full">
      {playersLoading ? (
        <div className="text-center py-8">Loading players...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-600">
          Error loading players: {error}
        </div>
      ) : (
        <>
          <div className="flex-shrink-0">
            <div className="overflow-x-auto pb-1"></div>
            <div className="mb-2">
              <div className="flex flex-col">
                <div className="relative flex-1">
                  <input
                    type="search"
                    placeholder="Search players..."
                    value={searchQuery}
                    onChange={(e) => {
                      e.preventDefault();
                      setSearchQuery(e.target.value);
                    }}
                    className="w-full pl-10 pr-2 py-2 bg-gray-800 text-white border text-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </div>
                <div className="w-full py-2 pb-1">
                  <div className="relative w-full">
                    <select
                      id="team"
                      value={teamFilter}
                      onChange={(e) => setTeamFilter(e.target.value)}
                      className="w-full border rounded-lg px-4 py-2 bg-gray-800 text-sm text-white appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {getUniqueTeams().map((team) => (
                        <option className="w-4/5" key={team} value={team}>
                          {team}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white">
                      {/* Heroicon - Chevron Down */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center mb-2 mt-3">
              <div className="flex w-full max-w-md border border-gray-700 rounded-md overflow-hidden">
                <button
                  onClick={() => {
                    setFilter("All");
                    setGenderFilter("female");
                  }}
                  className={`flex-1 py-2 text-xs font-medium ${
                    genderFilter === "female"
                      ? "bg-green-600 text-white"
                      : "bg-gray-800 text-gray-100 hover:bg-gray-700"
                  }`}
                >
                  FEMALE
                </button>
                <button
                  onClick={() => {
                    setGenderFilter("male");
                    setFilter("batsman");
                  }}
                  className={`flex-1 py-2 text-xs font-medium border-r border-gray-700 ${
                    filter === "batsman"
                      ? "bg-green-600 text-white"
                      : "bg-gray-800 text-gray-100 hover:bg-gray-700"
                  }`}
                >
                  BATSMAN
                </button>
                <button
                  onClick={() => {
                    setGenderFilter("male");
                    setFilter("bowler");
                  }}
                  className={`flex-1 py-2 text-xs font-medium border-r border-gray-700 ${
                    filter === "bowler"
                      ? "bg-green-600 text-white"
                      : "bg-gray-800 text-gray-100 hover:bg-gray-700"
                  }`}
                >
                  BOWLER
                </button>
                <button
                  onClick={() => {
                    setGenderFilter("male");
                    setFilter("all-rounder");
                  }}
                  className={`flex-1 py-2 text-xs font-medium border-r border-gray-700 ${
                    filter === "all-rounder"
                      ? "bg-green-600 text-white"
                      : "bg-gray-800 text-gray-100 hover:bg-gray-700"
                  }`}
                >
                  ALL-ROUNDER
                </button>
              </div>
            </div>
          </div>

          <div className="flex-grow overflow-y-auto h-96">
            {filteredPlayers.length === 0 ? (
              <div className="text-center py-8 text-gray-100">
                No players found matching your filters
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {filteredPlayers.map((player) => {
                  const isSelected = isPlayerSelected(player.id);
                  const roleColor = getRoleColorClass(player.player_role);

                  return (
                    <div
                      key={player.id}
                      style={{ overflowAnchor: "none" }}
                      onClick={() => togglePlayerSelection(player)}
                      className={`rounded-lg overflow-hidden cursor-pointer transition-all ${
                        isSelected
                          ? "border border-green-600 shadow-md shadow-green-500/20 bg-gray-800"
                          : "border border-gray-200 hover:border-gray-300 hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-center p-3">
                        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                          <img
                            src={player.player_logo || PLAYER_IMAGE}
                            alt={player.name}
                            className="w-8 h-8 rounded-full"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium text-xs text-gray-100 flex items-center gap-1">
                              {player.name}
                              {isSelected && (
                                <CheckBadgeIcon className="h-4 w-4 text-green-600" />
                              )}
                            </h3>
                            <div
                              className={`w-4 h-4 flex items-center justify-center rounded-full bg-${
                                genderColors[player.gender]
                              }-400/10 text-${
                                genderColors[player.gender]
                              }-400 font-bold text-sm`}
                            >
                              {player.gender === "male"
                                ? "M"
                                : player.gender === "female"
                                ? "F"
                                : "O"}
                            </div>
                          </div>
                          <div className="flex items-center text-xs mt-1">
                            <span
                              className={`mr-2 inline-flex items-center rounded-md bg-${roleColor}-400/10 px-2 py-1 text-xs font-medium text-${roleColor}-400 ring-1 ring-inset ring-${roleColor}-400/20`}
                            >
                              {player.player_role}
                            </span>
                            <span className="text-gray-300">
                              {player.team_name}
                            </span>
                            <span className="ml-auto text-gray-100 font-semibold">
                              +{player.credits} Cr
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PlayerSelection;
