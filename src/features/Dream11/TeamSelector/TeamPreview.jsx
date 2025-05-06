import React from "react";
import { PLAYER_IMAGE } from "../../../constants/teamLimits";

const TeamPreview = ({
  selectedPlayers,
  captain,
  viceCaptain,
  getRoleColorClass,
  teamName,
}) => {
  const captainPlayer = selectedPlayers.find((p) => p.id === captain);
  const viceCaptainPlayer = selectedPlayers.find((p) => p.id === viceCaptain);
  const genderColors = { male: "green", female: "red", others: "yellow" };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0">
        <div className="bg-green-600 text-white text-sm font-medium shadow-sm hover:bg-green-500 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 p-4 rounded-lg mb-4">
          <h2 className="text-md font-bold text-white mb-2">
            Your {teamName} Team
          </h2>
          <p className="text-white text-xs">
            Review your team before submitting
          </p>
        </div>

        <div className="mb-4 p-4 bg-gray-800 text-gray-100 border border-green-200 rounded-lg">
          <div className="flex justify-between mb-3">
            <div>
              <span className="block text-xs font-bold">Captain</span>
              <span className="text-md font-medium flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-orange-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
                {captainPlayer?.name}
              </span>
            </div>
            <div className="text-right">
              <span className="block text-xs font-bold">Vice Captain</span>
              <span className="text-md font-medium flex items-center gap-1 justify-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-yellow-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                  />
                </svg>
                {viceCaptainPlayer?.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto h-96">
        <div className="mb-4">
          {[
            "wicket-keeper",
            "batsman",
            "all-rounder",
            "bowler",
            "impact-player",
          ].map((role) => {
            const playersInRole = selectedPlayers.filter(
              (p) => p.player_role === role
            );
            if (playersInRole.length === 0) return null;

            return (
              <div key={role} className="mb-4">
                <h3 className="font-medium mb-2 text-gray-100 capitalize">
                  {role == "impact-player" ? "female player" : role}s (
                  {playersInRole.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {playersInRole.map((player) => {
                    const isCaptain = captain === player.id;
                    const isViceCaptain = viceCaptain === player.id;
                    const roleColor = getRoleColorClass(player.player_role);

                    return (
                      <div
                        key={player.id}
                        className="border border-green-600 rounded-lg overflow-hidden bg-gray-800 text-gray-100"
                      >
                        <div className="flex items-center p-3">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3 relative">
                            <img
                              src={player.player_logo || PLAYER_IMAGE}
                              alt={player.name}
                              className="w-8 h-8 rounded-full"
                            />
                            {isCaptain && (
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                C
                              </div>
                            )}
                            {isViceCaptain && (
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                VC
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-xs text-left">
                              {player.name}
                            </h3>
                            <div className="flex items-center text-xs mt-1">
                              <span className="text-gray-300">
                                {player.team_name}
                              </span>
                              <div
                                className={`ml-auto w-4 h-4 flex items-center justify-center rounded-full bg-${
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
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeamPreview;
