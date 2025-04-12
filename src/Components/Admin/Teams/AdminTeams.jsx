import React, { useState } from "react";
import { useGetTeamsQuery } from "../../../app/Services/Admin/adminTeams";
import CreateTeamPopup from "./CreateOrEditTeamPopup";
import Loader from "../../Loader";
import {
  PlusIcon,
} from "@heroicons/react/20/solid";
import TeamCard from "./TeamCard";

export default function AdminTeams() {
  const [open, setOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const { data: teams, isLoading, isError } = useGetTeamsQuery();
  if (isLoading) return <Loader />;

  return (
    <div className="py-8">
      <div className=" mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex justify-between items-center px-6 lg:px-8 py-4 bg-gray-800 rounded-lg">
        <h2 className="text-pretty text-small font-semibold tracking-tight text-gray-100 sm:text-xl">
          Teams
        </h2>
        <button
          type="button"
          onClick={(e) => {
            setOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-white text-sm font-medium shadow-sm hover:bg-indigo-500 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon className="size-5" />
          Create team
        </button>
        </div>

      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="mt-8 lg:mt-4">
            {!teams || teams?.teams.length === 0 ? (
                <div className="text-center py-12 flex flex-col items-center justify-center col-span-2 bg-gray-800 rounded-2xl">
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
                    <h3 className="mt-4 text-xl font-semibold text-gray-100">No teams yet</h3>
                    <p className="mt-2 text-gray-400">Get started by creating your first team.</p>
                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="mt-6 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Create Team
                    </button>
                </div>
            ) : (
                <ul
                    role="list"
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {teams?.teams.map((team) => (
                        <TeamCard key={team.id} team={team} />
                    ))}
                </ul>
            )}
          </div>
        </div>
      </div>
      {open && (
        <CreateTeamPopup
          open={open}
          setOpen={setOpen}
          selectedTeam={selectedTeam}
        />
      )}
    </div>
  );
}