import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import { useUpdatePlayerScoreMutation } from "../../../../app/Services/Admin/adminMatches";

export default function ScorePopup({
    open,
    setOpen,
    player,
    matchId
}) {
    const [updatePlayerScore] = useUpdatePlayerScoreMutation();
    const [stats, setStats] = useState({
        ballsPlayed: player.stats.ballsPlayed,
        score: player.stats.playerScore,
        fours: player.stats.fours,
        sixes: player.stats.sixes,
        wickets: player.stats.wickets,
        maidenOvers: player.stats.maidenOvers,
        stumps: player.stats.stumps,
        catches: player.stats.catches,
        runOuts: player.stats.runOuts,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStats(prev => ({
            ...prev,
            [name]: value === '' ? '' : Number(value)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const submitStats = Object.fromEntries(
                Object.entries(stats).map(([key, value]) => [key, value === '' ? 0 : value])
            );
            
            await updatePlayerScore({
                matchId: 1,
                playerId: player.id,
                stats: submitStats
            });
            setOpen(false);
        } catch (error) {
            console.error('Error updating stats:', error);
        }
    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)} className="relative">
            <DialogBackdrop className="fixed inset-0 bg-gray-500/50" />
            <div className="fixed inset-0 z-11 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel className="relative bg-gray-900 rounded-lg p-6 sm:p-8 w-full max-w-xl mx-2">
                        <DialogTitle className="text-xl sm:text-xl font-semibold text-gray-100 mb-6">
                            Player: {player.name}
                            <p className="text-gray-300 text-sm font-normal mt-1">
                                Update Player Stats
                            </p>
                        </DialogTitle>

                        <div className="space-y-4">
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {Object.entries(stats).map(([key, value]) => (
                                        <div key={key} className="flex items-center space-x-4">
                                            <label className="text-gray-300 w-32 capitalize font-medium">
                                                {key.replace(/([A-Z])/g, ' $1').trim()}:
                                            </label>
                                            <input
                                                type="number"
                                                name={key}
                                                value={value}
                                                onChange={handleChange}
                                                className="bg-gray-800 text-gray-200 rounded-md px-4 py-2 w-28 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                min="0"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-end space-x-4 mt-8">
                                    <button 
                                        type="submit"
                                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Update Stats
                                    </button>
                                </div>
                            </form>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}
