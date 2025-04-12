import React, { useMemo, useState } from "react";
import CustomAreaChart from "../Charts/CustomAreaChart";
import {
  useGetMatchBetAnalyticsQuery,
  useGetRoundBetAnalyticsQuery,
  useGetTournamenBetAnalyticsQuery,
} from "../../app/Services/Admin/analyticsApi";
import Loader from "../Loader";
import numeral from "numeral";

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
    }));
  }, [matchBets]);
  const roundData = useMemo(() => {
    if (!roundBets) return [];
    return roundBets?.map((item) => ({
      name: item.roundName,
      bets: item.totalBets,
      amount: item.totalAmount,
    }));
  }, [roundBets]);

  if (matchBetsLoading || roundBetsLoading || tournamentBetsLoading) {
    return <Loader />;
  }
  return (
    <div className="mx-10 pl-10 my-10 pb-10">
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
        colors={["blue"]}
      />
      <CustomAreaChart
        title={"Match Amounts"}
        chartdata={matchData}
        categories={["amount"]}
        colors={["yellow"]}
      />
      <CustomAreaChart
        title={"Round Bets"}
        chartdata={roundData}
        categories={["bets"]}
        colors={["pink"]}
      />
      <CustomAreaChart
        title={"Round Amounts"}
        chartdata={roundData ? roundData : []}
        categories={["amount"]}
        colors={["purple"]}
      />
    </div>
  );
}

function Stats({ stats }) {
  return (
    <div>
      <h3 className="text-base font-semibold text-gray-900">Last 30 days</h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => {
          return (
            <div
              key={item.name}
              className="overflow-hidden rounded-lg bg-gray-800 px-4 py-5 shadow sm:p-6"
            >
              <dt className="truncate text-sm font-medium text-gray-100">
                {item.name}
              </dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-200">
                {numeral(item.stat).format("0,0")}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
