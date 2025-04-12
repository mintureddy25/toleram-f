import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { useGetTeamsQuery } from "../../../app/Services/Admin/adminTeams";
import { useAddRoundMutation, useAddTournamentRoundMutation, useUpdateRoundMutation } from "../../../app/Services/Admin/adminTournament";

export default function AddNewTournament({ open, setOpen, round }) {
  const [addTournamentRound, { isLoading }] = useAddTournamentRoundMutation();
  const [updateRound, { isLoading: isUpdateRoundLoading }] =
    useUpdateRoundMutation();

  const [roundData, setRoundData] = useState({
    roundName: "",
  });

  useEffect(() => {
    if (round) {
      setRoundData({
        ...roundData,
        roundName: round.round_name,
      });
    }
  }, [round]);

  const onSubmit = async () => {
    if (!roundData.roundName.trim()) {
      toast.error("Round name is required");
      return;
    }

    try {
      if (round) {
        await updateRound({
          id: round.id,
          roundName: roundData.roundName,
        }).unwrap();
        toast.success("Round updated successfully");
      } else {
        await addTournamentRound({
          roundName: roundData.roundName,
        }).unwrap();
        toast.success("Round created successfully");
      }
      setOpen(false);
    } catch (error) {
      toast.error(
        error?.data?.message || `Failed to ${round ? "update" : "create"} round`
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
                  {round ? "Edit Round" : "Create New Round"}
                </DialogTitle>
                <div className="mt-4 space-y-4">
                  <input
                    type="text"
                    value={roundData.roundName}
                    onChange={(e) =>
                      setRoundData({ ...roundData, roundName: e.target.value })
                    }
                    placeholder="Enter round name"
                    className="w-full bg-gray-900 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                onClick={onSubmit}
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {round
                  ? isUpdateRoundLoading
                    ? "Updating..."
                    : "Update Round"
                  : isLoading
                  ? "Creating..."
                  : "Create Round"}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
