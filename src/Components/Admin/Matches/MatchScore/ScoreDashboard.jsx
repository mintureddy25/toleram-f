import React from "react";
import { useGetMatchPlayersQuery } from "../../../../app/Services/Admin/adminMatches";
import PlayersTable from "./PlayersTable";
import Loader from "../../../Loader";
import { isEmptyObject } from "../../../../Utils/Helpers";

function ScoreDashboard({matchId}) {
    const { data: matchPlayers, isLoading } = useGetMatchPlayersQuery(matchId);
    if (isLoading) return <Loader />
    if(isEmptyObject(matchPlayers?.team2) || isEmptyObject(matchPlayers?.team1) || isEmptyObject(matchPlayers?.team2)) return <div>Please add players to the teams</div>

    return <div className="py-8">
        <PlayersTable team={matchPlayers.team1}/>
        <div className="mt-8">  
            <PlayersTable team={matchPlayers.team2}/>
        </div>
    </div>
}

export default ScoreDashboard;