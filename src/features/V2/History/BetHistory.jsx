import React from "react";
import { useGetBetHistoryQuery } from "../../../app/Services/betHistory";
import { Link } from "react-router-dom";
import Loader from "../../../Components/Loader";

function BetHistory() {
  const { data: betHistory, isLoading, isError } = useGetBetHistoryQuery();
  if (isLoading) return <Loader />;
  if (isError) return <div>Error loading bet history</div>;

  const { matchBets, roundBets, betPlayerBets } = betHistory.bets;

  if (
    matchBets?.length == 0 &&
    roundBets?.length == 0 &&
    betPlayerBets?.length == 0
  ) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-gray-900 rounded-xl p-8 text-center shadow-xl">
          <h1 className="text-3xl font-bold text-gray-200">
            🎲 No Betting History Yet
          </h1>
          <p className="mt-4 text-gray-400">
            Ready to start your betting journey? Place your first bet to see your history here!
          </p>
        </div>
      </div>
    );
  }

  const BetCard = ({ title, points, canShowPoints, link, children }) => (
    <Link to={link}>
      <div className="transform transition-all duration-200 hover:scale-105">
        <div className="p-6 rounded-xl bg-gray-800 border border-gray-700 hover:border-gray-600 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-100 mb-3">{title}</h3>
          <p className="text-gray-300 mb-3">
            Points: {canShowPoints == "1" ? points : "- -"}
          </p>
          <p className="text-blue-400 hover:text-blue-300 font-medium">
            View Details →
          </p>
        </div>
      </div>
    </Link>
  );

  const BetSection = ({ title, bets, renderBet }) => (
    <div className="mb-8 mt-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-6 pb-2 border-b border-gray-700">
        {title}
      </h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {bets.map(renderBet)}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-900 min-h-screen">
      {matchBets?.length > 0 && (
        <BetSection
          title="Match Bets"
          bets={matchBets}
          renderBet={(bet) => (
            <BetCard
              key={bet.match_id}
              title={bet.match_title}
              points={bet.points}
              canShowPoints={bet.can_show_points}
              link={`/history/matches/${bet.match_id}`}
            />
          )}
        />
      )}

      {roundBets?.length > 0 && (
        <BetSection
          title="Round Bets"
          bets={roundBets}
          renderBet={(bet) => (
            <BetCard
              key={bet.round_id}
              title={bet.round_name}
              points={bet.points}
              canShowPoints={bet.can_show_points}
              link={`/history/rounds/${bet.round_id}`}
            />
          )}
        />
      )}

      {betPlayerBets?.length > 0 && (
        <BetSection
          title="Player Bets"
          bets={betPlayerBets}
          renderBet={(bet, index) => (
            <BetCard
              key={index}
              title="Player Bets"
              points={bet.points}
              canShowPoints={bet.can_show_points}
              link="/history/bestPlayers"
            />
          )}
        />
      )}
    </div>
  );
}

export default BetHistory;
