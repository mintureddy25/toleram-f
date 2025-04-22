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
import { PLAYER_IMAGE } from "../../../constants/teamLimits";

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
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-white text-sm font-medium shadow-sm hover:bg-indigo-500 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="size-5" />
            Add Player
          </button>
        </div>
      </div>

      <div className="px-6 lg:px-8">
        {players?.teamPlayers?.length === 0 ? (
          <div className="mt-12 text-center">
            <p className="text-xl text-gray-100">
              No players found in this team
            </p>
          </div>
        ) : (
          <>
            {players?.teamPlayers?.length == 0 ? (
              <div className="text-center py-12 flex flex-col items-center justify-center bg-gray-800 rounded-2xl p-6">
                <svg
                  className="mx-auto h-24 w-24 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                  />
                </svg>
                <h3 className="mt-4 text-xl font-semibold text-gray-100">
                  No team players yet
                </h3>
                <p className="mt-2 text-gray-400">
                  Get started by adding your first team player.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(true);
                    setQuestion("");
                  }}
                  className="mt-6 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Team Players
                </button>
              </div>
            ) : (
              <ul
                role="list"
                className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-8 text-center sm:grid-cols-2 md:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-4 xl:grid-cols-4"
              >
                {players?.teamPlayers?.map((player) => (
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
                    <p className="text-sm text-gray-400">
                      {player.player_role}
                    </p>
                    <button
                      onClick={() => {
                        setOpen(true);
                        setPlayer(player);
                      }}
                      className="mt-4 w-full rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-100 hover:bg-gray-600 transition-colors"
                    >
                      Edit Player
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
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
