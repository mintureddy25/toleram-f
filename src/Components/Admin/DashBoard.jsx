import React, { useMemo, useState } from "react";
import CustomAreaChart from "../Charts/CustomAreaChart";
import {
  useGetMatchBetAnalyticsQuery,
  useGetRoundBetAnalyticsQuery,
  useGetTournamenBetAnalyticsQuery,
} from "../../app/Services/Admin/analyticsApi";
import Loader from "../Loader";
import { formatToAbbreviation } from "../../Utils/Helpers";

const basicColors = [
  "blue-500",
  "indigo-500",
  "violet-500",
  "purple-500",
  "fuchsia-500",
  "pink-500",
  "rose-500",
  "red-500",
  "orange-500",
  "amber-500",
  "yellow-400", // slightly lighter for better contrast
  "lime-400",
  "green-500",
  "emerald-500",
  "teal-500",
  "cyan-500",
  "sky-500",
  "blue-400",
  "indigo-400",
  "violet-400",
];

const getStatusColors = (data) => {
  return data.map((item) => (item.points < 0 ? "green-500" : "red-500"));
};

export default function AdminDashboard() {
  const { data: matchBets, isLoading: matchBetsLoading } =
    useGetMatchBetAnalyticsQuery();

  const { data: roundBets, isLoading: roundBetsLoading } =
    useGetRoundBetAnalyticsQuery();

  const { data: tournamentBets, isLoading: tournamentBetsLoading } =
    useGetTournamenBetAnalyticsQuery();

  const matchData = useMemo(() => {
    if (!matchBets) return [];
    return matchBets?.map((item) => ({
      name: item.matchTitle,
      bets: item.totalBets,
      amount: item.totalAmount,
      points: item.totalPoints,
    }));
  }, [matchBets]);
  const roundData = useMemo(() => {
    if (!roundBets) return [];
    return roundBets?.map((item) => ({
      name: item.roundName,
      bets: item.totalBets,
      amount: item.totalAmount,
      points: item.totalPoints,
    }));
  }, [roundBets]);

  if (matchBetsLoading || roundBetsLoading || tournamentBetsLoading) {
    return <Loader />;
  }
  const getColors = (length) => {
    const shuffledColors = basicColors.sort(() => 0.5 - Math.random());

    return shuffledColors.map((color) => color.toLowerCase()).slice(0, length);
  };
  return (
    <div className="mx-10 pl-0 sm:pl-10 my-10 pb-10">
      <h1 className="text-2xl font-bold">Tournament Dashboard</h1>
      <Stats
        stats={[
          { name: "Match Bets", stat: tournamentBets?.totalMatchesBets || 0 },
          {
            name: "Round Bets",
            stat: tournamentBets?.totalRoundsBets || 0,
          },
          {
            name: "Dream 11 Bets",
            stat: tournamentBets?.totalDream11Bets || 0,
          },
          {
            name: "Total Match Bet Amout",
            stat: tournamentBets?.totalMatchesbetAmount || 0,
          },
          {
            name: "Total Round Bet Amount",
            stat: tournamentBets?.totalRoundsBetAmount || 0,
          },
        ]}
      />
      <CustomAreaChart
        title={"Match Bets"}
        chartdata={matchData}
        categories={["bets"]}
        colors={getColors(matchData.length)}
      />
      <CustomAreaChart
        title={"Match Amounts"}
        chartdata={matchData}
        categories={["amount"]}
        colors={getColors(matchData.length)}
      />
       <CustomAreaChart
        title={"Match Analysis"}
        chartdata={matchData ? matchData : []}
        categories={["points"]}
        colors={getStatusColors(matchData)}
        showLegend={true}
        legendItems={[
          { label: "Profit", color: "green-500" },
          { label: "Loss", color: "red-500" },
        ]}
      />
      <CustomAreaChart
        title={"Round Bets"}
        chartdata={roundData}
        categories={["bets"]}
        colors={getColors(roundData.length)}
      />
      <CustomAreaChart
        title={"Round Amounts"}
        chartdata={roundData ? roundData : []}
        categories={["amount"]}
        colors={getColors(roundData.length)}
      />
      <CustomAreaChart
        title={"Round Analysis"}
        chartdata={roundData ? roundData : []}
        categories={["points"]}
        colors={getStatusColors(roundData)}
        showLegend={true}
        legendItems={[
          { label: "Profit", color: "green-500" },
          { label: "Loss", color: "red-500" },
        ]}
      />
    </div>
  );
}

function Stats({ stats }) {
  return (
    <div>
      <h3 className="text-base font-semibold text-gray-900">Last 30 days</h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.length > 0 ? (
          stats.map((item) => {
            return (
              <div
                key={item.name}
                className="overflow-hidden rounded-lg bg-gray-800 px-4 py-5 shadow sm:p-6"
              >
                <dt className="truncate text-sm font-medium text-gray-100">
                  {item.name}
                </dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-200">
                  {formatToAbbreviation(item.stat)}
                </dd>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500">No data available</div>
        )}
      </dl>
    </div>
  );
}
