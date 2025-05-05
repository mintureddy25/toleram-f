import React from "react";
import { useGetMatchQuery } from "../../../../app/Services/matchesApi";
import Loader from "../../../../Components/Loader";
import { useNavigate } from "react-router-dom";

export default function MatchDetails({ matchId }) {
  const { data, isLoading, isError } = useGetMatchQuery(matchId);
  const navigate = useNavigate();

  const handleShowPlayers = (teamId) => {
    navigate(`/team/${teamId}`);
    
  };

  

  if (isLoading) {
    return <Loader />;
  }

  const match = data.match;
  const formattedDate = new Date(match.match_time).toLocaleString();

  return (
    <div className="bg-gray-900 text-white p-4">
      <h2 className="text-2xl font-bold text-green-400 mb-2">
        {match.match_title}
      </h2>

      <div className="flex items-center mb-4">
        <span className="text-green-400 mr-2">⏰</span>
        <span className="text-gray-300">{formattedDate}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-6 justify-center mb-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-center">
            <img
              src={match.team_one_logo}
              alt={match.team_one_name}
              className="w-24 h-24 mx-auto mb-2 object-contain bg-gray-700 p-2 rounded-lg"
            />
            <h3 className="text-lg font-medium text-white mb-3">
              {match.team_one_name}
            </h3>
            <button
              onClick={() => handleShowPlayers(match.team_one)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md w-full flex items-center justify-center"
            >
              <span className="mr-2">👥</span>
              Show Players
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center text-2xl font-bold">
          VS
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-center">
            <img
              src={match.team_two_logo}
              alt={match.team_two_name}
              className="w-24 h-24 mx-auto mb-2 object-contain bg-gray-700 p-2 rounded-lg Z-90"
            />
            <h3 className="text-lg font-medium text-white mb-3">
              {match.team_two_name}
            </h3>
            <button
              onClick={() => handleShowPlayers(match.team_two)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md w-full flex items-center justify-center"
            >
              <span className="mr-2">👥</span>
              Show Players
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
