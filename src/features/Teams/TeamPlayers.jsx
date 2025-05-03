import React from "react";
import { useGetTeamPlayersListQuery } from "../../app/Services/Admin/adminTeams";
import Loader from "../../Components/Loader";
import PlayerList from "../../Components/Team/PlayerList";

function TeamPlayers({ teamId }) {
  const {
    data: players,
    isLoading,
    isError,
  } = useGetTeamPlayersListQuery(teamId);
  if (isLoading) return <Loader />;
  if (isError) return <div>Error loading players</div>;

  return <PlayerList players={players?.teamPlayers} />;
}

export default TeamPlayers;
