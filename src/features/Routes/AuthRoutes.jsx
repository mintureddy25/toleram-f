import React from "react";
import { Route, Routes } from "react-router-dom";
import Matches from "../V2/Matches";
import MatchQuestions from "../V2/Matches/Questions";
import Rounds from "../V2/Rounds";
import RoundQuestions from "../V2/Rounds/Questions";
import Players from "../V2/Players";
import Rules from "../../Rules";
import MatchHistory from "../V2/History/Match";
import RoundHistory from "../V2/History/Round";
import BestPlayersHistory from "../V2/History/BestPlayers";
import AdminDashboard from "../../Components/Admin";
import AdminTeams from "../../Components/Admin/Teams/AdminTeams";
import AdminTeamDetails from "../../Components/Admin/Teams/AdminTeamDetails";
import AdminMatches from "../../Components/Admin/Matches/AdminMatches";
import AdminMatchDetails from "../../Components/Admin/Matches/AdminMatchDetails";
import AdminLayout from "../Layout/AdminLayout";
import Dream11 from "../Dream11";
import User from "../../Components/Admin/User";
import BetHistoryWithLayout from "../V2/History/BetHistoryWithLayout";
import AdminRoundDetails from "../../Components/Admin/Tournamet/AdminTournamentDetails";
import Tournamet from "../../Components/Admin/Tournamet/AdminTournament";
import ScoreDashboard from "../../Components/Admin/Matches/MatchScore/ScoreDashboard";
import CommentsSection from "../../Components/comments/CommentsSection";

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/matches">
        <Route path=":matchId" Component={MatchQuestions} />
        <Route index Component={Matches} />
      </Route>
      <Route path="/rounds">
        <Route path=":roundId" Component={RoundQuestions} />
        <Route index Component={Rounds} />
      </Route>

      <Route path="/dream11">
        <Route index Component={Dream11} />
      </Route>

      <Route path="/discussions">
        <Route index element={<CommentsSection roomName={'tolaram-discussions'} title="Discussions" description=" Join the conversation! Share your thoughts"/>} />
      </Route>

      <Route path="/history">
        <Route path="matches/:matchId" Component={MatchHistory} />
        <Route path="rounds/:roundId" Component={RoundHistory} />
        <Route path="bestPlayers" Component={BestPlayersHistory} />
        <Route index Component={BetHistoryWithLayout} />
      </Route>

      <Route path="/admin" Component={AdminLayout}>
        <Route path="teams" Component={AdminTeams} />
        <Route path="teams/:teamId" Component={AdminTeamDetails} />
        <Route path="matches" Component={AdminMatches} />
        <Route path="matches/:matchId" Component={AdminMatchDetails} />
        <Route path="tournament" Component={Tournamet} />
        <Route path="match/:matchId/score" Component={ScoreDashboard} />
        <Route path="user" Component={User} />
        <Route
          path="tournament/rounds/:roundId"
          Component={AdminRoundDetails}
        />
        <Route path="dashboard" Component={AdminDashboard} />
      </Route>

      <Route path="/players" Component={Players} />
      <Route path="/rules" Component={Rules} />
      <Route path="*" Component={Matches} />
    </Routes>
  );
}

export default AuthRoutes;
