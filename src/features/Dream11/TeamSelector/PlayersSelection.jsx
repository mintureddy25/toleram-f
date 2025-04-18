import React from "react";
import { PLAYER_IMAGE } from "../../../constants/teamLimits";

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
            <div className="overflow-x-auto pb-1 mb-2"></div>
            <div className="mb-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <input
                    type="search"
                    placeholder="Search players..."
                    value={searchQuery}
                    onChange={(e) => {
                      e.preventDefault();
                      setSearchQuery(e.target.value);
                    }}
                    className="w-full pl-10 pr-2 py-2 bg-gray-800 text-white border text-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                <div className="flex gap-3">
                  <div className="flex items-center gap-2">
                    <label htmlFor="gender" className="text-xs text-white">
                      Gender:
                    </label>
                    <select
                      id="gender"
                      value={genderFilter}
                      onChange={(e) => setGenderFilter(e.target.value)}
                      className="border rounded-lg px-2 py-1 bg-gray-800 text-xs text-white"
                    >
                      {["All", "male", "female", "others"].map((gender) => (
                        <option key={gender} value={gender}>
                          {gender.charAt(0).toUpperCase() + gender.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <label htmlFor="gender" className="text-xs text-white">
                      Teams:
                    </label>

                    <select
                      value={teamFilter}
                      onChange={(e) => setTeamFilter(e.target.value)}
                      className="border rounded-lg px-2 py-1 bg-gray-800 text-white text-xs"
                    >
                      {getUniqueTeams().map((team) => (
                        <option key={team} value={team}>
                          {team}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {["All", "batsman", "bowler", "all-rounder", "wicket-keeper"].map(
                (role) => (
                  <button
                    key={role}
                    onClick={() => setFilter(role)}
                    className={`px-1 sm:px-1 py-1 rounded-full text-xs font-medium ${
                      filter === role
                        ? "bg-indigo-600 text-white text-sm font-medium shadow-sm hover:bg-indigo-500 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        : "bg-gray-800 text-gray-100 hover:bg-indigo-500"
                    }`}
                  >
                    {role}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="flex-grow overflow-y-auto h-96">
            {filteredPlayers.length === 0 ? (
              <div className="text-center py-8 text-gray-100">
                No players found matching your filters
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                {filteredPlayers.map((player) => {
                  const isSelected = isPlayerSelected(player.id);
                  const roleColor = getRoleColorClass(player.player_role);

                  return (
                    <div
                      key={player.id}
                      style={{ overflowAnchor: "none" }}
                      onClick={() => togglePlayerSelection(player)}
                      className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                        isSelected
                          ? "border-indigo-500 bg-gray-800"
                          : "border-gray-200 hover:border-gray-300"
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
                            <h3 className="font-medium text-xs text-gray-100">
                              {player.name}
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

                            {/* Player credits to the right */}
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
