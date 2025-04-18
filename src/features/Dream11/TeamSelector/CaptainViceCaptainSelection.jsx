import React from 'react';
import { PLAYER_IMAGE } from '../../../constants/teamLimits';

const CaptainViceCaptainSelection = ({
  selectedPlayers,
  captain,
  viceCaptain,
  selectCaptain,
  selectViceCaptain,
  getRoleColorClass
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0">
        <div className="bg-indigo-600 text-white text-sm font-medium shadow-sm hover:bg-indigo-500 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 p-2 rounded-lg mb-4">
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
                className="border border-indigo-600 rounded-lg overflow-hidden"
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
                      className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                        isCaptain
                          ? "bg-orange-600 text-white border-orange-600"
                          : "border-gray-300 text-gray-100 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={isCaptain ? "white" : "none"}
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => selectViceCaptain(player.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                        isViceCaptain
                          ? "bg-yellow-500 text-white border-yellow-500"
                          : "border-gray-300 text-gray-100 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={isViceCaptain ? "white" : "none"}
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                        />
                      </svg>
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
