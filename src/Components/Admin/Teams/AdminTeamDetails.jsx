import React, { useState } from "react";
import {
  useGetTeamPlayersListQuery,
  useGetTeamQuery,
} from "../../../app/Services/Admin/adminTeams";
import { useParams } from "react-router-dom";
import AddTeamPlayerPopup from "./AddTeamPlayerPopup";
import CreateTeamPopup from "./CreateOrEditTeamPopup";
import Loader from "../../Loader";
import { PlusIcon } from "@heroicons/react/24/outline";
import PlayerList from "../../Team/PlayerList";

export default function AdminTeamDetails() {
  const { teamId } = useParams();
  const {
    data: players,
    isLoading,
    isError,
  } = useGetTeamPlayersListQuery(teamId);
  const {
    data: team,
    isLoading: teamLoading,
    isError: teamError,
  } = useGetTeamQuery(teamId);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [player, setPlayer] = useState(null);

  if (isLoading) return <Loader />;
  if (isError) return <div>Error loading players</div>;

  return (
    <div className="py-8">
      <div className="flex justify-around items-center px-6 lg:px-8 mb-4">
        <div className="text-pretty text-4xl font-semibold tracking-tight text-gray-100 sm:text-4xl">
          {team?.team?.team_name}
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex justify-between items-center bg-gray-800 rounded-lg px-6 lg:px-8 py-4">
          <h2 className="text-sm font-semibold tracking-tight text-gray-100 sm:text-xl text-center ">
            Team Players
          </h2>
          <button
            type="button"
            onClick={() => {
              setOpen(true);
              setPlayer(null);
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-white text-sm font-medium shadow-sm hover:bg-green-500 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            <PlusIcon className="size-5" />
            Add Player
          </button>
        </div>
      </div>

      <PlayerList
        players={players?.teamPlayers}
        canShowEdit={true}
        editHandler={(playerData) => {
          setPlayer(playerData);
          setOpen(true);
        }}
      />
      <AddTeamPlayerPopup
        open={open}
        setOpen={setOpen}
        teamId={teamId}
        player={player}
      />
      <CreateTeamPopup
        open={openEdit}
        setOpen={setOpenEdit}
        selectedTeam={team?.team}
      />
    </div>
  );
}
