import React from "react";
import { useGetTeamQuery } from "../../app/Services/Admin/adminTeams";
import { useParams } from "react-router-dom";
import Loader from "../../Components/Loader";
import TeamPlayers from "./TeamPlayers";
import BackButtonWithRules from "../../Components/BackButtonWithRules";

function TeamDetails() {
  const { teamId } = useParams();

  const {
    data: team,
    isLoading: teamLoading,
    isError: teamError,
  } = useGetTeamQuery(teamId);
  if (teamLoading) return <Loader />;
  if (teamError) return <div>Error loading team</div>;
  return (
    <>
      <BackButtonWithRules />
      <div className="py-8">
        <div className="flex justify-around items-center px-6 lg:px-8 mb-4">
          <div className="text-pretty text-4xl font-semibold tracking-tight text-gray-100 sm:text-4xl">
            {team?.team?.team_name}
          </div>
        </div>

        <TeamPlayers teamId={teamId} />
      </div>
    </>
  );
}

export default TeamDetails;
