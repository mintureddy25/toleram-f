import React, { useState } from "react";
import ScorePopup from "./ScorePopup";
import { useParams } from "react-router-dom";
import { PLAYER_IMAGE } from "../../../../constants/teamLimits";
function ScoreDashboard({ team }) {
  const matchId = useParams();
  const [open, setOpen] = useState(false);
  const [player, setPlayer] = useState(null);

  const tableHeaders = [
    { id: "name", label: "Player Name" },
    { id: "score", label: "Score" },
    { id: "points", label: "Points" },
    { id: "sixes", label: "Sixes" },
    { id: "wickets", label: "Wickets" },
    { id: "maidenOvers", label: "Maiden Overs" },
  ];

  const getPlayerData = (player) => [
    {
      content: (
        <div className="flex items-center gap-2">
          <img
            src={player.playerLogo || PLAYER_IMAGE}
            alt={player.name}
            className="w-8 h-8 rounded-full"
          />
          {player.name}
        </div>
      ),
    },
    { content: player.stats.playerScore },
    { content: player.stats.points },
    { content: player.stats.sixes },
    { content: player.stats.wickets },
    { content: player.stats.maidenOvers },
  ];

  return (
    <div className="">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="flex items-center text-left">
            <img
              src={team.teamLogo}
              alt={team.teamName}
              className="w-10 h-10 rounded-full mr-2"
            />
            <h1 className="text-lg font-semibold text-gray-100">
              {team.teamName}
            </h1>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-600">
                <thead>
                  <tr>
                    {tableHeaders.map((header) => (
                      <th
                        key={header.id}
                        scope="col"
                        className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-100 sm:pl-0"
                      >
                        {header.label}
                      </th>
                    ))}
                    <th
                      scope="col"
                      className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700 bg-gray-900 text-left">
                  {!team || team?.players?.length === 0 ? (
                    <tr>
                      <td
                        colSpan={10}
                        className="text-center text-gray-100 py-4"
                      >
                        No players found
                      </td>
                    </tr>
                  ) : (
                    team?.players?.map((player) => (
                      <tr key={player.id}>
                        {getPlayerData(player).map((cell, index) => (
                          <td
                            key={index}
                            className="whitespace-nowrap px-2 py-2 text-sm text-gray-100"
                          >
                            {cell.content}
                          </td>
                        ))}
                        <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 cursor-pointer">
                          <div
                            onClick={() => {
                              setOpen(true);
                              setPlayer(player);
                            }}
                            className="text-indigo-600 hover:text-indigo-800"
                          >
                            Edit<span className="sr-only">, {player.id}</span>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <ScorePopup
          open={open}
          setOpen={setOpen}
          player={player}
          matchId={matchId?.matchId}
        />
      )}
    </div>
  );
}

export default ScoreDashboard;
