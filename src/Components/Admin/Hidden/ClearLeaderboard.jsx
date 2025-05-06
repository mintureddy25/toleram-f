import React from "react";
import CustomButton from "../../CustomButton";
import { useClearLeaderboardMutation } from "../../../app/Services/Admin/analyticsApi";
import { toast } from "react-toastify";

export default function ClearLeaderboard() {
  const [clearLeaderboard, { isLoading: clearing, isError, error }] =
    useClearLeaderboardMutation();

  const handleClearLeaderboard = async () => {
    if (clearing) return;
    await clearLeaderboard().unwrap();
    if (isError) {
      console.error("Error clearing leaderboard:", error);
      toast.error(error?.data?.message || "Failed to clear leaderboard");
    } else {
      toast.success("Leaderboard cleared successfully");
    }
  };

  return (
    <div className="mt-8 max-w-md mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-100 mb-6">
          Super12 Leaderboard
        </h2>

        <CustomButton
          isLoading={clearing}
          onClick={handleClearLeaderboard}
          className={`flex items-center justify-center px-6 py-3 rounded-lg w-full transition-all duration-300 ${
            clearing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {"Clear Leaderboard"}
        </CustomButton>
      </div>
    </div>
  );
}
