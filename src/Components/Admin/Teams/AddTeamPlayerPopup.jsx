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
  useAddPlayerToTeamMutation,
  useUpdatePlayerDetailsMutation,
} from "../../../app/Services/Admin/adminTeams";
import { useParams } from "react-router-dom";
import UploadImage from "../../UploadImage/Index";

export default function AddTeamPlayerPopup({ open, setOpen, player }) {
  const { teamId } = useParams();
  const [addplayer, { isLoading, isError }] =
    useAddPlayerToTeamMutation(teamId);
  const [
    updatePlayer,
    { isLoading: updatePlayerLoading, isError: updatePlayerError },
  ] = useUpdatePlayerDetailsMutation(teamId);

  const [playerName, setPlayerName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [role, setRole] = useState("batsman");
  const [gender, setGender] = useState("male");
  const [credits, setCredits] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (player) {
      setPlayerName(player.name || "");
      setRole(player.player_role || "batsman");
      setGender(player.gender || "male");
      setCredits(player.credits?.toString() || "");
      setImageUrl(player.player_logo || "");
    }
  }, [player]);

  const playerRoles = ["batsman", "bowler", "all-rounder"];
  const genderOptions = ["male", "female", "others"];
  const onSubmit = async () => {
    try {
      const playerData = {
        name: playerName,
        role: role,
        id: player?.id,
        gender: gender,
        credits: credits === "" ? 0 : parseFloat(credits),
        teamId: teamId,
        imageUrl: imageUrl || player?.player_logo,
      };
      console.log(playerData);

      if (player) {
        // Update existing player - now sending all fields
        const res = await updatePlayer({
          name: playerData.name,
          role: playerData.role,
          gender: playerData.gender,
          credits: playerData.credits,
          imageUrl: playerData.imageUrl,
          teamId: playerData.teamId,
          playerId: playerData.id,
        }).unwrap();
        toast.success("Player updated successfully");
      } else {
        // Add new player
        const res = await addplayer(playerData).unwrap();
        toast.success("Player added successfully");
      }
      resetForm();
      setOpen(false);
    } catch (error) {
      toast.error(
        error?.data?.message || `Failed to ${player ? "update" : "add"} player`
      );
      console.error("Error details:", error);
    }
  };

  const resetForm = () => {
    setPlayerName("");
    setImageFile(null);
    setRole("batsman");
    setGender("male");
    setCredits("");
    setImageUrl("");
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        resetForm();
        setOpen(false);
      }}
      className="relative z-[45]"
    >
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
                  {player ? "Edit Player" : "Add New Player"}
                </DialogTitle>
                <div className="mt-4 space-y-4">
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Enter player name"
                    className="w-full bg-gray-900 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                  />
                  <input
                    type="number"
                    min="0"
                    value={credits}
                    onChange={(e) => setCredits(e.target.value)}
                    placeholder="Enter player credits"
                    className="w-full bg-gray-900 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                  />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-gray-900 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                  >
                    {playerRoles.map((role) => (
                      <option key={role} value={role} className="bg-gray-900">
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </option>
                    ))}
                  </select>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-gray-900 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                  >
                    {genderOptions.map((option) => (
                      <option
                        key={option}
                        value={option}
                        className="bg-gray-900"
                      >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>
                    ))}
                  </select>
                  <UploadImage
                    placeholder={"Upload player image"}
                    updateImageUrl={setImageUrl}
                    existingImageUrl={player?.player_logo}
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
                {isLoading
                  ? player
                    ? "Updating..."
                    : "Adding..."
                  : player
                  ? "Update Player"
                  : "Add Player"}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
