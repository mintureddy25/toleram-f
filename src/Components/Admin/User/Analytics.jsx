import React from "react";

const Analytics = ({ userData }) => {
  // Match-related calculations
  const calculateMatchBetsTotal = () => {
    if (!userData) return 0;
    return userData.matchBets.reduce((total, match) => {
      return total + match.bets.reduce((matchTotal, bet) => matchTotal + bet.betAmount, 0);
    }, 0);
  };

  const calculateMatchWinRate = () => {
    if (!userData) return 0;
    let totalBets = 0;
    let wonBets = 0;
    userData.matchBets.forEach((match) => {
      match.bets.forEach((bet) => {
        totalBets++;
        if (bet.correct === "Yes") wonBets++;
      });
    });
    return totalBets > 0 ? Math.round((wonBets / totalBets) * 100) : 0;
  };

  // Round-related calculations
  const calculateRoundBetsTotal = () => {
    if (!userData) return 0;
    return userData.roundBets.reduce((total, round) => {
      return total + round.bets.reduce((roundTotal, bet) => roundTotal + bet.betAmount, 0);
    }, 0);
  };

  const calculateRoundWinRate = () => {
    if (!userData) return 0;
    let totalBets = 0;
    let wonBets = 0;
    userData.roundBets.forEach((round) => {
      round.bets.forEach((bet) => {
        if (bet.correct !== null) {
          totalBets++;
          if (bet.correct === "Yes") wonBets++;
        }
      });
    });
    return totalBets > 0 ? Math.round((wonBets / totalBets) * 100) : 0;
  };

  // Combined calculations
  const calculateTotalBetAmount = () => {
    return calculateMatchBetsTotal() + calculateRoundBetsTotal();
  };

  const calculateWinRate = () => {
    const matchStats = userData?.matchBets.reduce((acc, match) => {
      match.bets.forEach(bet => {
        acc.total++;
        if (bet.correct === "Yes") acc.won++;
      });
      return acc;
    }, { total: 0, won: 0 }) || { total: 0, won: 0 };

    const roundStats = userData?.roundBets.reduce((acc, round) => {
      round.bets.forEach(bet => {
        if (bet.correct !== null) {
          acc.total++;
          if (bet.correct === "Yes") acc.won++;
        }
      });
      return acc;
    }, { total: 0, won: 0 }) || { total: 0, won: 0 };

    const totalBets = matchStats.total + roundStats.total;
    const totalWon = matchStats.won + roundStats.won;

    return totalBets > 0 ? Math.round((totalWon / totalBets) * 100) : 0;
  };

  return (
    <>
      {" "}
      <div className="bg-gray-800 rounded-lg p-6 shadow mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
              />
            </svg>

            <div className="ml-4 flex flex-col justify-start">
              <h2 className="text-md font-bold text-left">{userData.user.name}</h2>
              <p className="text-gray-400">
                {userData.user.email}
              </p>
            </div>
          </div>
          <div className="bg-green-600 bg-opacity-20 text-green-400 rounded-full px-3 py-1 text-sm font-medium">
            {userData.user.role}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-gray-800 rounded-lg p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm tracking-tight text-gray-400">
                Total Bet Amount
              </p>
              <h3 className="text-xl font-bold mt-1">
                {calculateTotalBetAmount().toLocaleString()}
              </h3>
            </div>
            <div className="bg-green-600 bg-opacity-20 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-green-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Win Rate</p>
              <h3 className="text-xl font-bold mt-1">{calculateWinRate()}%</h3>
            </div>
            <div className="bg-green-600 bg-opacity-20 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-green-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Dream11 Points</p>
              <h3 className="text-xl font-bold mt-1">
                {userData.dream11.totalPoints}
              </h3>
            </div>
            <div className="bg-green-600 bg-opacity-20 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-green-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Bets</p>
              <h3 className="text-xl font-bold mt-1">
                {userData.matchBets.reduce(
                  (acc, match) => acc + match.bets.length,
                  0
                ) +
                  userData.roundBets.reduce(
                    (acc, round) => acc + round.bets.length,
                    0
                  )}
              </h3>
            </div>
            <div className="bg-green-600 bg-opacity-20 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-green-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Analytics;
