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
  const formattedDate = `${new Date(match.match_time).toLocaleDateString('en-IN')} starts at: ${new Date(match.match_time).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true })}`;

  return (
    <div className="bg-gray-900 text-white p-4">
      <h2 className="text-3xl font-bold text-green-400 mb-2">
        {match.match_title}
      </h2>

      <div class="max-w-sm mx-auto rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div class="p-2">
          <div class="flex items-center space-x-4 justify-center">
            <span class="text-md">⏰</span>
            <div>
              <p class="text-gray-300 text-md font-medium">{formattedDate}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center mb-4 mt-6 max-w-4xl mx-auto">
        {/* Team One Card */}
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

        {/* VS Divider */}
        <div className="flex items-center justify-center text-2xl font-bold text-white">
          <img src="/vs.png" alt="VS" class="vs-image w-16" />
        </div>

        {/* Team Two Card */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-center">
            <img
              src={match.team_two_logo}
              alt={match.team_two_name}
              className="w-24 h-24 mx-auto mb-2 object-contain bg-gray-700 p-2 rounded-lg"
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
