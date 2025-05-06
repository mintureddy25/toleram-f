import React from "react";
import {
  useUpdateSuper12BetStatusMutation,
  useGetTournamentQuery,
} from "../../../app/Services/tournament";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import CustomButton from "../../CustomButton";

export default function Super12() {
  const { data: tournament, isLoading: isTournamentLoading } =
    useGetTournamentQuery();
  const [updateSuper12BetStatus, { isLoading: isUpdating }] =
    useUpdateSuper12BetStatusMutation();

  const runSuper12BetsStatus = tournament?.tournament?.runSuper12Bets;
  const isBetsOn = runSuper12BetsStatus === "yes";

  const toggleBets = async () => {
    if (isTournamentLoading || isUpdating) return;
    const newStatus = isBetsOn ? "no" : "yes";
    await updateSuper12BetStatus({ status: newStatus }).unwrap();
  };

  return (
    <div className="mt-8 max-w-md mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-100 mb-6">
          Super12 Betting
        </h2>

        <div className="flex items-center justify-between w-full mb-6">
          <span className="text-lg font-medium text-gray-300">
            Betting is currently:{" "}
            {runSuper12BetsStatus ? (
              <span
                className={`font-bold ${
                  isBetsOn ? "text-green-600" : "text-red-600"
                }`}
              >
                {isBetsOn ? "ON" : "OFF"}
              </span>
            ) : null}
          </span>

          <div className="flex items-center">
            {runSuper12BetsStatus &&
              (isBetsOn ? (
                <CheckCircleIcon className="w-6 h-6 text-green-500 mr-2" />
              ) : (
                <XCircleIcon className="w-6 h-6 text-red-500 mr-2" />
              ))}
          </div>
        </div>

        <CustomButton
          disabled={isTournamentLoading}
          isLoading={isTournamentLoading || isUpdating}
          onClick={toggleBets}
          className={`flex items-center justify-center px-6 py-3 rounded-lg w-full transition-all duration-300 ${
            isTournamentLoading || isUpdating
              ? "bg-gray-400 cursor-not-allowed"
              : isBetsOn
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {isBetsOn ? "Turn OFF Bets" : "Turn ON Bets"}
        </CustomButton>
      </div>
    </div>
  );
}
