import React from "react";

const Dream11Team = ({ dream11 }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="tracking-tight text-gray-100 sm:text-xl">
          Dream11 Team
        </h3>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-yellow-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>

          <span className="ml-1 text-yellow-400">
            {dream11.totalPoints} points
          </span>
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
                src={player.player_logo}
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
                      ? "text-indigo-400"
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
