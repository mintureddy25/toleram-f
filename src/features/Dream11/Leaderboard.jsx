import React, { useState } from "react";
import { useGetDream11LeaderboardQuery } from "../../app/Services/dream11Api";
import {
  TrophyIcon,
  StarIcon,
  FireIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import { getUsernameFromEmail } from "../../Utils/Helpers";

function Dream11Leaderboard() {
  const userDetails = useSelector((state) => state.auth.user);
  const { data: leaderboard, isLoading } = useGetDream11LeaderboardQuery();

  const getMedalDisplay = (rank) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return rank;
    }
  };

  const getInitialBgColor = (index) => {
    const colors = [
      "bg-indigo-600",
      "bg-violet-600",
      "bg-fuchsia-600",
      "bg-purple-600",
      "bg-blue-600",
      "bg-sky-600",
      "bg-cyan-600",
      "bg-teal-600",
      "bg-emerald-600",
      "bg-green-600",
    ];
    return colors[index % colors.length];
  };

  const getUserRank = () => {
    if (!leaderboard || !leaderboard.leaderboard) return null;

    const userEntry = leaderboard.leaderboard.find(
      (user) => user.userId === userDetails.id
    );
    return userEntry ? userEntry.rank : null;
  };

  const userRank = getUserRank();

  const getDisplayLeaderboard = () => {
    if (
      !leaderboard ||
      !leaderboard.leaderboard ||
      leaderboard.leaderboard.length === 0
    ) {
      return [];
    }

    const originalLeaderboard = [...leaderboard.leaderboard];

    if (leaderboard.isInTop || (userRank && userRank <= 10)) {
      return originalLeaderboard;
    }

    const topTenPlayers = originalLeaderboard.filter((user) => user.rank <= 10);

    const userIndex = originalLeaderboard.findIndex(
      (user) => user.userId === userDetails.id
    );

    if (userIndex === -1) {
      return originalLeaderboard;
    }

    const startIndex = Math.max(0, userIndex - 1);
    const endIndex = Math.min(originalLeaderboard.length - 1, userIndex + 1);
    const userContext = originalLeaderboard.slice(startIndex, endIndex + 1);

    const result = [
      ...topTenPlayers,
      ...(userRank > 11 ? [{ isSeparator: true, id: "separator-1" }] : []),
      ...userContext,
    ];

    return result;
  };

  const displayLeaderboard = getDisplayLeaderboard();

  const renderEmptyState = () => (
    <div className="bg-gray-900 min-h-screen p-3 md:p-6">
      <div className="max-w-lg mx-auto">
        <div className="divide-y divide-gray-700">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full shadow-md bg-gray-700"></div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-700 mr-3"></div>
                    <div className="h-4 w-24 bg-gray-700 rounded"></div>
                  </div>
                </div>
                <div>
                  <div className="h-4 w-16 bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return renderEmptyState();
  }

  return (
    <div className="bg-gray-900 min-h-screen p-3 md:p-6">
      <div className="max-w-lg mx-auto">
        {leaderboard && leaderboard?.leaderboard.length === 0 ? (
          <div className="p-4 text-2xl font-bold text-gray-500">
            <p>🏆 No players yet. </p>
          </div>
        ) : (
          <>
            {leaderboard?.isInTop && (
              <div className="mb-6 p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <TrophyIcon className="w-8 h-8 text-yellow-300 mr-3" />
                    <div>
                      <h3 className="text-white font-bold text-lg">
                        Congratulations!
                      </h3>
                      <p className="text-green-100">You're in the top 10!</p>
                    </div>
                  </div>
                  <div className="flex">
                    <StarIcon className="w-6 h-6 text-yellow-300" />
                    <FireIcon className="w-6 h-6 text-orange-400 ml-1" />
                  </div>
                </div>
              </div>
            )}

            <div className="mb-2 flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center">
                Leaderboard
              </h1>
              {userRank && (
                <div className="flex items-center bg-gray-800 rounded-full px-3 py-1 shadow-md">
                  <span className="text-gray-400 text-sm mr-2">Your Rank:</span>
                  <span className="text-white font-bold flex items-center">
                    {userRank < 4 ? (
                      <span className="text-3xl">
                        {getMedalDisplay(userRank)}
                      </span>
                    ) : (
                      <span className="text-yellow-400 flex items-center">
                        <span className="font-bold">{userRank}</span>
                      </span>
                    )}
                  </span>
                </div>
              )}
            </div>
            <div className="text-white text-sm flex items-center gap-2 mb-4">
              <span className="text-gray-400">updated at:</span>
              <span>
                {leaderboard?.lastUpdated
                  ? `${new Date(
                      leaderboard.lastUpdated
                    ).toLocaleDateString()} | ${new Date(
                      leaderboard.lastUpdated
                    ).toLocaleTimeString()}`
                  : "--/--/---- | --:--:-- --"}
              </span>
            </div>
            <div className="divide-y divide-gray-700 text-yellow-500 font-medium">
              <div className="grid">
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-t-lg">
                  <div className="flex items-center space-x-3">
                    <div className="">Rank</div>
                    <div className="flex items-center"></div>
                    <div className="">Team</div>
                  </div>
                  <div className="">Points</div>
                </div>
              </div>
              {displayLeaderboard.map((item, index) => {
                if (item.isSeparator) {
                  return (
                    <div
                      key={item.id}
                      className="py-3 flex justify-center items-center text-gray-500"
                    >
                      <div className="flex items-center">
                        <div className="h-px w-16 bg-gray-700"></div>
                        <EllipsisHorizontalIcon className="w-6 h-6 mx-2" />
                        <div className="h-px w-16 bg-gray-700"></div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={item.userId}
                    className={`cursor-pointer transition-all duration-200 hover:bg-gray-700  ${
                      item.userId === userDetails.id
                        ? "bg-gray-800 border-yellow-500"
                        : ""
                    }`}
                  >
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-full shadow-md`}
                        >
                          <span
                            className={`${
                              item.rank < 4 ? "text-3xl" : "text-md"
                            } font-bold`}
                          >
                            {getMedalDisplay(item.rank)}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <div
                            className={`w-10 h-10 rounded-full ${getInitialBgColor(
                              index
                            )} text-white shadow-md flex items-center justify-center mr-3 text-sm font-medium`}
                          >
                            {(item.teamName || item.name || item.email)
                              ?.charAt(0)
                              ?.toUpperCase()}
                          </div>
                          <div className=" text-white flex flex-col">
                            <div className="inline-flex items-center gap-1 font-medium">
                              <span
                                className={`${
                                  item.userId == userDetails.id
                                    ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-transparent bg-clip-text font-bold"
                                    : " text-left"
                                }`}
                              >
                                {item.teamName}
                              </span>
                            </div>

                            <div className="text-gray-400 text-xs">
                              {item.userId == userDetails.id
                                ? ` by You`
                                : `${item.email}`}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-200">
                          {item.totalPoints.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dream11Leaderboard;
