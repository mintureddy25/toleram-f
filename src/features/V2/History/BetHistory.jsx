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
      <>
        <div className="max-w-7xl mx-auto py-2 sm:px-2 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-500">
            🧙 The betting magic hasn't begun. Cast your first spell!
          </h1>
        </div>
      </>
    );
  }
  return (
    <div className="max-w-7xl mx-auto py-2 sm:px-2 lg:px-8">
      {matchBets?.length != 0 && (
        <div className="px-4 py-2 sm:px-0">
          <h2 className="text-2xl font-semibold bg-green-500 rounded-lg shadow text-gray-900">
            Match Bets
          </h2>
          <div className="mt-2 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {matchBets.map((bet) => (
              <Link to={`/history/matches/${bet.match_id}`} key={bet.match_id}>
                <div className="p-4 shadow mt-2 cursor-pointer rounded-xl border border-gray-200 bg-gray-600">
                  <h3 className="text-lg leading-6 font-medium text-white">
                    {bet.match_title}
                  </h3>
                  <p className=" text-white">
                    Points: {bet?.can_show_points == "1" ? bet.points : "- -"}
                  </p>
                  <p className=" underline text-blue-300">View Details</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      {roundBets?.length != 0 && (
        <div className="px-4 py-2 sm:px-0">
          <h2 className="text-2xl font-semibold bg-green-500 rounded-lg shadow text-gray-900">
            Round Bets
          </h2>
          <div className="mt-2 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {roundBets.map((bet) => (
              <Link to={`/history/rounds/${bet.round_id}`} key={bet.round_id}>
                <div className="p-4 shadow mt-2 cursor-pointer rounded-xl border border-gray-200 bg-gray-600">
                  <h3 className="text-lg leading-6 font-medium text-white">
                    {bet.round_name}
                  </h3>
                  <p className=" text-white">
                    Points: {bet?.can_show_points == "1" ? bet.points : "- -"}
                  </p>
                  <p className=" hover:text-indigo-500  underline text-blue-300">
                    View Details
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      {betPlayerBets?.length != 0 && (
        <div className="px-4 py-2 sm:px-0">
          <h2 className="text-2xl font-semibold bg-green-500 rounded-lg shadow text-gray-900">
            Player Bets
          </h2>
          <div className="mt-2 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {betPlayerBets.map((bet, index) => (
              <Link to={`/history/bestPlayers`} key={index}>
                <div className="p-4 shadow mt-2 cursor-pointer rounded-xl border border-gray-200 bg-gray-600">
                  <h3 className="text-lg leading-6 font-medium text-white">{`Player Bets`}</h3>
                  <p className=" text-white">
                    Points: {bet?.can_show_points == "1" ? bet.points : "- -"}
                  </p>
                  <p className=" hover:text-indigo-500 mt-4 underline text-blue-300">
                    View Details
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BetHistory;
