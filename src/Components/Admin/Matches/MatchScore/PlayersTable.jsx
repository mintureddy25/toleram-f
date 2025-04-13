import React, { useState } from "react";
import ScorePopup from "./ScorePopup";
import { useParams } from "react-router-dom";

function ScoreDashboard({ team }) {
    const matchId = useParams();
    const [open, setOpen] = useState(false);
    const [player, setPlayer] = useState(null);

    return <div className="">
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="flex items-center text-left">
                    <img src={team.teamLogo} alt={team.teamName} className="w-10 h-10 rounded-full mr-2" />
                    <h1 className="text-lg font-semibold text-gray-100">{team.teamName}</h1>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-600">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-100 sm:pl-0"
                                    >
                                        Player Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-100"
                                    >
                                        Score
                                    </th>
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-100"
                                    >
                                        Balls
                                    </th>
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-100"
                                    >
                                        Points
                                    </th>
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-100"
                                    >
                                        Fours
                                    </th>
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-100"
                                    >
                                        Sixes
                                    </th>
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-100"
                                    >
                                        Wickets
                                    </th>
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-100"
                                    >
                                        Maiden Overs
                                    </th>
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-100"
                                    >
                                        Stumps
                                    </th>
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-100"
                                    >
                                        Catches
                                    </th>
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-100"
                                    >
                                        Run Out
                                    </th>
                                    <th scope="col" className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700 bg-gray-900 text-left">
                                {
                                  !team || team?.players?.length === 0 ? (
                                        <tr>
                                            <td colSpan={10} className="text-center text-gray-100 py-4">No players found</td>
                                        </tr>
                                    ) : (
                                        team?.players?.map((player) => (
                                    <tr key={player.id}>
                                        <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-100 sm:pl-0 flex items-center gap-2">
                                            <img src={player.playerLogo} alt={player.name} className="w-8 h-8 rounded-full" />
                                            {player.name}
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-100">
                                            {player.stats.playerScore}
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-100">
                                            {player.stats.ballsPlayed}
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-100">
                                            {player.stats.points}
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-100">
                                            {player.stats.fours}
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-100">
                                            {player.stats.sixes}
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-100">
                                            {player.stats.wickets}
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-100">
                                            {player.stats.maidenOvers}
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-100">
                                            {player.stats.stumps}
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-100">
                                            {player.stats.catches}
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-100">
                                            {player.stats.runOuts}
                                        </td>
                                        <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 cursor-pointer">
                                            <div onClick={() => { setOpen(true); setPlayer(player) }} className="text-indigo-600 hover:text-indigo-800">
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
        {open && <ScorePopup open={open} setOpen={setOpen} player={player} matchId={matchId?.matchId}/>}
    </div>
}

export default ScoreDashboard;