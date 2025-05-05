import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import {
  useAddMatchMutation,
  useGetMatchQuery,
  useUpdateMatchDetailsMutation,
} from "../../../app/Services/Admin/adminMatches";
import { useGetTeamsQuery } from "../../../app/Services/Admin/adminTeams";

export default function CreateNewMatch({ open, setOpen, matchId }) {
  const {
    data: match,
    isLoading: matchLoading,
    isError: matchError,
  } = useGetMatchQuery(matchId);
  const [createMatch, { isLoading }] = useAddMatchMutation();
  const [updateMatchDetails, { isLoading: isUpdateMatchLoading }] =
    useUpdateMatchDetailsMutation();

  const { data: teams } = useGetTeamsQuery();

  const initialMatchData = {
    teamOneId: "",
    teamTwoId: "",
    matchTitle: "",
    matchTime: "",
    canBet: "0",
    canShow: "1",
    betStatus: "dont_process",
    maxBetAmount: "",
  };

  const [matchData, setMatchData] = useState(initialMatchData);

  useEffect(() => {
    if (match) {
      setMatchData({
        teamOneId: match?.match?.team_one.toString(),
        teamTwoId: match?.match?.team_two.toString(),
        matchTitle: match?.match?.match_title,
        matchTime: match?.match?.match_time.split(".")[0],
        canBet: match?.match?.can_bet,
        canShow: match?.match?.can_show,
        betStatus: match?.match?.bet_status,
        maxBetAmount: Number(match?.match?.max_bet_amount) || 0,
      });
    }
  }, [match]);

  const onSubmit = async () => {
    if (!matchData.matchTitle.trim()) {
      toast.error("Match title is required");
      return;
    }
    if (!matchData.maxBetAmount || Number(matchData.maxBetAmount) < 1000) {
      toast.error("Max bet amount must be at least 1000");
      return;
    }
    if (!matchData.teamOneId || !matchData.teamTwoId) {
      toast.error("Both teams are required");
      return;
    }

    if (!matchData.matchTime) {
      toast.error("Match time is required");
      return;
    }

    try {
      if (match) {
        await updateMatchDetails({
          id: match?.match?.id,
          ...matchData,
        }).unwrap();
        toast.success("Match updated successfully");
      } else {
        await createMatch(matchData).unwrap();
        toast.success("Match created successfully");
      }
      setOpen(false);
    } catch (error) {
      toast.error(
        error?.data?.message || `Failed to ${match ? "update" : "create"} match`
      );
      console.error("Error details:", error);
    }
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-[45]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-gray-900 px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 w-full sm:max-w-md sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100">
                <UserGroupIcon
                  aria-hidden="true"
                  className="size-6 text-green-600"
                />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-gray-100"
                >
                  {match ? "Edit Match" : "Create New Match"}
                </DialogTitle>
                <div className="mt-4 space-y-4">
                  <input
                    type="text"
                    value={matchData.matchTitle}
                    onChange={(e) =>
                      setMatchData({ ...matchData, matchTitle: e.target.value })
                    }
                    placeholder="Enter match title"
                    className="w-full bg-gray-900 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />

                  <input
                    type="number"
                    min="0"
                    value={matchData.maxBetAmount}
                    onChange={(e) =>
                      setMatchData({ ...matchData, maxBetAmount: Number(e.target.value) })
                    }
                    placeholder="Enter max bet amount (min. 1000)"
                    className="w-full bg-gray-900 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />

                  <input
                    type="datetime-local"
                    value={matchData.matchTime}
                    onChange={(e) =>
                      setMatchData({ ...matchData, matchTime: e.target.value })
                    }
                    className="datetime-picker w-full bg-gray-900 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />

                  <select
                    value={matchData.teamOneId}
                    onChange={(e) => {
                      const newTeamId = e.target.value;
                      if (newTeamId === matchData.teamTwoId) {
                        toast.error("Cannot select same team for both sides");
                        return;
                      }
                      setMatchData({ ...matchData, teamOneId: newTeamId });
                    }}
                    className="w-full bg-gray-900 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select Team One</option>
                    {teams?.teams.map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.team_name}
                      </option>
                    ))}
                  </select>

                  <select
                    value={matchData.teamTwoId}
                    onChange={(e) => {
                      const newTeamId = e.target.value;
                      if (newTeamId === matchData.teamOneId) {
                        toast.error("Cannot select same team for both sides");
                        return;
                      }
                      setMatchData({ ...matchData, teamTwoId: newTeamId });
                    }}
                    className="w-full bg-gray-900 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select Team Two</option>
                    {teams?.teams.map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.team_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                onClick={onSubmit}
                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                {match
                  ? isUpdateMatchLoading
                    ? "Updating..."
                    : "Update Match"
                  : isLoading
                  ? "Creating..."
                  : "Create Match"}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
