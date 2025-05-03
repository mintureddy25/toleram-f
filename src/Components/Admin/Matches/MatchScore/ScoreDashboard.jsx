import React from "react";
import { useGetMatchPlayersQuery } from "../../../../app/Services/Admin/adminMatches";
import PlayersTable from "./PlayersTable";
import Loader from "../../../Loader";

function ScoreDashboard({ matchId }) {
  const { data: matchPlayers, isLoading } = useGetMatchPlayersQuery(matchId);

  if (isLoading) return <Loader />;

  const team1 = matchPlayers?.team1;
  const team2 = matchPlayers?.team2;

  const noPlayers = !team1 && !team2;

  if (noPlayers) {
    return (
      <div className="p-6 text-center text-2xl font-bold text-gray-500">
        <p> Please add players to both teams</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      {team1 && <PlayersTable team={team1} />}
      {team2 && (
        <div className="mt-8">
          <PlayersTable team={team2} />
        </div>
      )}
    </div>
  );
}

export default ScoreDashboard;
