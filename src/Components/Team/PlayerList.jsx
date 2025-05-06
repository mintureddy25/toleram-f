import React from "react";
import { PLAYER_IMAGE } from "../../constants/teamLimits";

function PlayerList({ players, canShowEdit = false, editHandler = () => {} }) {
  return (
    <div className="px-6 lg:px-8">
      {players?.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-xl text-gray-100">No players found in this team</p>
        </div>
      ) : (
        <>
          <ul
            role="list"
            className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-8 text-center sm:grid-cols-2 md:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-4 xl:grid-cols-4"
          >
            {players?.map((player) => (
              <li
                key={player.id}
                className="group relative bg-gray-800 rounded-lg p-6 hover:bg-gray-800 transition-all"
              >
                <img
                  alt={player.name}
                  src={player.player_logo || PLAYER_IMAGE}
                  className="mx-auto size-16 rounded-full"
                />
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-gray-100">
                  {player.name}
                </h3>
                <p className="text-sm text-gray-400">{player.player_role}</p>
                {canShowEdit && (
                  <button
                    onClick={() => editHandler(player)}
                    className="mt-4 w-full rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-100 hover:bg-gray-600 transition-colors"
                  >
                    Edit Player
                  </button>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default PlayerList;
