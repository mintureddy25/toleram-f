import React from "react";
import { useGetMatchPlayersQuery } from "../../../../app/Services/Admin/adminMatches";
import PlayersTable from "./PlayersTable";
import Loader from "../../../Loader";

function ScoreDashboard({matchId}) {
    const { data: matchPlayers, isLoading } = useGetMatchPlayersQuery(matchId);
    if (isLoading) return <Loader />

    if(Object.keys(matchPlayers?.team2).length === 0 || Object.keys(matchPlayers?.team1).length === 0 || Object.keys(matchPlayers?.team2).length === 0) return <div>Please add players to the teams</div>

    return <div className="py-8">
        <PlayersTable team={matchPlayers.team1}/>
        <div className="mt-8">  
            <PlayersTable team={matchPlayers.team2}/>
        </div>
    </div>
}

export default ScoreDashboard;