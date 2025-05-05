import React from "react";
import { PLAYER_IMAGE } from "../../../constants/teamLimits";

const CaptainViceCaptainSelection = ({
  selectedPlayers,
  captain,
  viceCaptain,
  selectCaptain,
  selectViceCaptain,
  getRoleColorClass,
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0">
        <div className="bg-green-600 text-white text-sm font-medium shadow-sm hover:bg-green-500 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 p-2 rounded-lg mb-4">
          <h2 className="text-md font-bold text-white mb-2">
            Choose Captain & Vice Captain
          </h2>
          <p className="text-white text-sm mb-2">
            C: 2x points & VC: 1.5x points
          </p>
          <div className="bg-gray-900 bg-opacity-20 p-2 rounded-lg">
            <div className="flex justify-between text-xs text-white">
              <span>
                Captain:{" "}
                {captain
                  ? selectedPlayers.find((p) => p.id === captain)?.name
                  : "Not Selected"}
              </span>
              <span>
                Vice Captain:{" "}
                {viceCaptain
                  ? selectedPlayers.find((p) => p.id === viceCaptain)?.name
                  : "Not Selected"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto h-96">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {selectedPlayers.map((player) => {
            const roleColor = getRoleColorClass(player.player_role);
            const isCaptain = captain === player.id;
            const isViceCaptain = viceCaptain === player.id;

            return (
              <div
                key={player.id}
                className="border border-green-600 rounded-lg overflow-hidden"
              >
                <div className="flex items-center p-3 bg-gray-800">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3 relative">
                    <img
                      src={player.player_logo || PLAYER_IMAGE}
                      alt={player.name}
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-xs text-left text-gray-100 ">
                      {player.name}
                    </h3>
                    <div className="flex items-start text-xs mt-1">
                      <span
                        className={`${roleColor} text-white text-left px-2 pl-0 py-0.5 rounded-full mr-2`}
                      >
                        {player.player_role}
                      </span>
                      <span className="text-gray-300">{player.team_name}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => selectCaptain(player.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center border text-sm ${
                        isCaptain
                          ? "bg-orange-600 text-white font-bold border-orange-600"
                          : "border-gray-300 text-gray-100 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <span className="font-bold">C</span>
                    </button>
                    <button
                      onClick={() => selectViceCaptain(player.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center border text-sm ${
                        isViceCaptain
                          ? "bg-yellow-500 text-white font-bold border-yellow-500"
                          : "border-gray-300 text-gray-100 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <span className="font-bold">VC</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CaptainViceCaptainSelection;
