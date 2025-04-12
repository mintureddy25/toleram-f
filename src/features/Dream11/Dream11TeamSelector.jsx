import React, { useState, useEffect } from "react";
import { useGetPlayersQuery } from "../../app/Services/playersApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader";

const Dream11TeamSelector = ({ players, onSubmit, onClose }) => {
  const [allPlayers, setAllPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [step, setStep] = useState(1);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [captain, setCaptain] = useState(null);
  const [viceCaptain, setViceCaptain] = useState(null);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [teamFilter, setTeamFilter] = useState("All");
  const {
    data: playerData,
    isLoading: playersLoading,
    isError,
    error: errorMesssage,
  } = useGetPlayersQuery();

  useEffect(() => {
    if (playersLoading) {
      setLoading(true);
    } else if (isError) {
      setError(errorMesssage);
      console.error(errorMesssage);
      setLoading(false);
    } else if (playerData && playerData.players) {
      setAllPlayers(playerData.players);
      if (players && players.length > 0) {
        const selectedPlayersData = playerData.players.filter((player) =>
          players.some((p) => p.player_id === player.id)
        );
        setSelectedPlayers(selectedPlayersData);
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [playersLoading, isError, playerData, error]);

  const MAX_PLAYERS = 11;
  const roleLimits = {
    batsman: { min: 0, max: 11 },
    bowler: { min: 0, max: 11 },
    "all-rounder": { min: 0, max: 11 },
    "wicket-keeper": { min: 0, max: 11 },
  };

  const countByRole = (role) =>
    selectedPlayers.filter((player) => player.player_role === role).length;

  const isRoleFull = (role) => countByRole(role) >= roleLimits[role].max;

  const getFilteredPlayers = () => {
    return allPlayers.filter((player) => {
      const roleMatches = filter === "All" || player.player_role === filter;

      const teamMatches =
        teamFilter === "All" || player.team_name === teamFilter;

      const searchMatches = player.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return roleMatches && teamMatches && searchMatches;
    });
  };

  const isPlayerSelected = (playerId) =>
    selectedPlayers.some((player) => player.id === playerId);

  const isTeamValid = () => {
    return (
      Object.entries(roleLimits).every(([role, limits]) => {
        const count = countByRole(role);
        return count >= limits.min && count <= limits.max;
      }) && selectedPlayers.length === MAX_PLAYERS
    );
  };

  const getUniqueTeams = () => {
    const teams = allPlayers.map((player) => player.team_name);
    return ["All", ...new Set(teams)];
  };

  const togglePlayerSelection = (player) => {
    if (isPlayerSelected(player.id)) {
      setSelectedPlayers(selectedPlayers.filter((p) => p.id !== player.id));
    } else {
      if (
        selectedPlayers.length < MAX_PLAYERS &&
        !isRoleFull(player.player_role)
      ) {
        setSelectedPlayers([...selectedPlayers, player]);
      }
    }
  };

  const selectCaptain = (playerId) => {
    setCaptain(playerId);
    if (viceCaptain === playerId) {
      setViceCaptain(null);
    }
  };

  const selectViceCaptain = (playerId) => {
    setViceCaptain(playerId);
    if (captain === playerId) {
      setCaptain(null);
    }
  };

  const goToNextStep = () => {
    if (step === 1 && isTeamValid()) {
      setStep(2);
    } else if (step === 2 && captain && viceCaptain) {
      setStep(3);
    }
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onClose();
    }
  };

  const resetSelection = () => {
    setSelectedPlayers([]);
    setCaptain(null);
    setViceCaptain(null);
    setStep(1);
  };

  const getRoleColorClass = (role) => {
    switch (role) {
      case "batsman":
        return "bg-red-600";
      case "bowler":
        return "bg-green-600";
      case "all-rounder":
        return "bg-yellow-600";
      case "wicket-keeper":
        return "bg-blue-600";
      default:
        return "bg-gray-600";
    }
  };

  const handleSubmit = async () => {
    if (isTeamValid() && captain && viceCaptain) {
      await onSubmit({
        team: selectedPlayers,
        captain,
        viceCaptain,
      });
    } else {
      console.error("Invalid team selection");
    }
  };

  const SearchAndFilterBar = () => (
    <div className="mb-4">
      <div className="flex flex-col sm:flex-row gap-2">
      <div className="relative flex-1">
      <input
        type="text"
        key="search-bar"
        autoFocus="autoFocus"
        placeholder="Search players..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    </div>
        <div className="flex gap-2">
          <select
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
            className="border rounded-lg px-4 py-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {getUniqueTeams().map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const RoleFilterButtons = () => (
    <div className="flex flex-wrap gap-4 mb-4">
      {["All", "batsman", "bowler", "all-rounder", "wicket-keeper"].map(
        (role) => (
          <button
            key={role}
            onClick={() => setFilter(role)}
            className={`px-3 sm:px-1 py-1 rounded-full text-sm font-medium ${
              filter === role
                ? "bg-indigo-600 text-white text-sm font-medium shadow-sm hover:bg-indigo-500 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                : "bg-gray-800 text-gray-100 hover:bg-indigo-500"
            }`}
          >
            {role}
          </button>
        )
      )}
    </div>
  );

  const PlayerSelectionScreen = () => {
    if (loading) {
      return <div className="text-center py-8">Loading players...</div>;
    }

    if (error) {
      return (
        <div className="text-center py-8 text-red-600">
          Error loading players: {error}
        </div>
      );
    }

    const filteredPlayers = getFilteredPlayers();

    return (
      <div className="flex flex-col h-full">
        <div className="flex-shrink-0">
          <div className="text-white text-sm font-medium shadow-sm hover:bg-indigo-500 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 p-2 rounded-lg mb-2">
            <h2 className="text-sm font-bold text-white">
              Select 11 Players
            </h2>
          </div>
          {SearchAndFilterBar()}
          <RoleFilterButtons />
        </div>

        <div className="flex-grow overflow-y-auto h-96">
          {filteredPlayers.length === 0 ? (
            <div className="text-center py-8 text-gray-100">
              No players found matching your filters
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              {filteredPlayers.map((player) => {
                const isSelected = isPlayerSelected(player.id);
                const roleColor = getRoleColorClass(player.player_role);

                return (
                  <div
                    key={player.id}
                    style={{ overflowAnchor: "none" }}
                    onClick={() => togglePlayerSelection(player)}
                    className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                      isSelected
                        ? "border-indigo-500 bg-gray-800"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center p-3">
                      <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                        <img
                          src={player.player_logo}
                          alt={player.name}
                          className="w-12 h-12 rounded-full"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-gray-100">{player.name}</h3>
                          {isSelected && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5 text-indigo-600"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                          )}
                        </div>
                        <div className="flex items-center text-xs mt-1">
                          <span
                            className={`${roleColor} text-white px-2 py-0.5 rounded-full mr-2`}
                          >
                            {player.player_role}
                          </span>
                          <span className="text-gray-300">
                            {player.team_name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };
  const CaptainSelectionScreen = () => (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0">
        <div className="bg-indigo-600 text-white text-sm font-medium shadow-sm hover:bg-indigo-500 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 p-4 rounded-lg mb-4">
          <h2 className="text-lg font-bold text-white mb-2">
            Choose Captain & Vice Captain
          </h2>
          <p className="text-white text-sm mb-2">
            Captain gets 2x points & Vice Captain gets 1.5x points
          </p>
          <div className="bg-gray-900 bg-opacity-20 p-2 rounded-lg">
            <div className="flex justify-between text-xs text-white">
              <span>
                Captain:{" "}
                {captain
                  ? selectedPlayers.find((p) => p.id === captain)?.name
                  : "Not Selected"}
              </span>
              <span>
                Vice Captain:{" "}
                {viceCaptain
                  ? selectedPlayers.find((p) => p.id === viceCaptain)?.name
                  : "Not Selected"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto h-96">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {selectedPlayers.map((player) => {
            const roleColor = getRoleColorClass(player.player_role);
            const isCaptain = captain === player.id;
            const isViceCaptain = viceCaptain === player.id;

            return (
              <div
                key={player.id}
                className="border border-indigo-600 rounded-lg overflow-hidden"
              >
                <div className="flex items-center p-3 bg-gray-800">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3 relative">
                    <img
                      src={player.player_logo}
                      alt={player.name}
                      className="w-12 h-12 rounded-full"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-left text-gray-100 ">{player.name}</h3>
                    <div className="flex items-center text-xs mt-1">
                      <span
                        className={`${roleColor} text-white px-2 py-0.5 rounded-full mr-2`}
                      >
                        {player.player_role}
                      </span>
                      <span className="text-gray-300">{player.team_name}</span>
                      {/* <span className="ml-auto font-medium">{player.points} pts</span> */}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => selectCaptain(player.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                        isCaptain
                          ? "bg-orange-600 text-white border-orange-600"
                          : "border-gray-300 text-gray-100 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={isCaptain ? "white" : "none"}
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => selectViceCaptain(player.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                        isViceCaptain
                          ? "bg-yellow-500 text-white border-yellow-500"
                          : "border-gray-300 text-gray-100 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={isViceCaptain ? "white" : "none"}
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const ConfirmationScreen = () => {
    const captainPlayer = selectedPlayers.find((p) => p.id === captain);
    const viceCaptainPlayer = selectedPlayers.find((p) => p.id === viceCaptain);

    return (
      <div className="flex flex-col h-full">
        <div className="flex-shrink-0">
          <div className="bg-indigo-600 text-white text-sm font-medium shadow-sm hover:bg-indigo-500 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 p-4 rounded-lg mb-4">
            <h2 className="text-lg font-bold text-white mb-2">
              Your Dream 11 Team
            </h2>
            <p className="text-white text-sm">
              Review your team before submitting
            </p>
          </div>

          <div className="mb-4 p-4 bg-gray-800 text-gray-100 border border-green-200 rounded-lg">
            <div className="flex justify-between mb-3">
              <div>
                <span className="block text-sm font-bold">Captain</span>
                <span className="text-lg font-medium flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-orange-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>

                  {captainPlayer?.name}
                </span>
              </div>
              <div className="text-right">
                <span className="block text-sm font-bold">Vice Captain</span>
                <span className="text-lg font-medium flex items-center gap-1 justify-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                    />
                  </svg>

                  {viceCaptainPlayer?.name}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto h-96">
          <div className="mb-4">
            {["wicket-keeper", "batsman", "all-rounder", "bowler"].map(
              (role) => {
                const playersInRole = selectedPlayers.filter(
                  (p) => p.player_role === role
                );
                if (playersInRole.length === 0) return null;

                return (
                  <div key={role} className="mb-4">
                    <h3 className="font-medium mb-2 text-gray-100">
                      {role}s ({playersInRole.length})
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {playersInRole.map((player) => {
                        const isCaptain = captain === player.id;
                        const isViceCaptain = viceCaptain === player.id;
                        const roleColor = getRoleColorClass(player.player_role);

                        return (
                          <div
                            key={player.id}
                            className="border border-indigo-600 rounded-lg overflow-hidden bg-gray-800 text-gray-100"
                          >
                            <div className="flex items-center p-3">
                              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3 relative">
                                <img
                                  src={player.player_logo}
                                  alt={player.name}
                                  className="w-10 h-10 rounded-full"
                                />
                                {isCaptain && (
                                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                    C
                                  </div>
                                )}
                                {isViceCaptain && (
                                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                    VC
                                  </div>
                                )}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium text-sm text-left">
                                  {player.name}
                                </h3>
                                <div className="flex items-center text-xs mt-1">
                                  <span className="text-gray-300">
                                    {player.team_name}
                                  </span>
                                  {/* <span className="ml-auto font-medium">
                                  {isCaptain ? `${player.points}×2` : isViceCaptain ? `${player.points}×1.5` : player.points} pts
                                </span> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    );
  };

  const NavigationBar = () => (
    <div className="flex justify-between items-center py-3 px-4 border-t bg-gray-900">
      {
        <button
          onClick={goBack}
          className={`
         px-4 py-2 rounded-md bg-gray-800 border border-gray-100 text-sm font-semibold text-gray-100 shadow-sm ring-1 ring-inset ring-gray-900 hover:bg-gray-50 hover:text-gray-900`}
        >
          {step > 1 ? "Back" : "Cancel"}
        </button>
      }

      {step < 3 ? (
        <button
          onClick={goToNextStep}
          disabled={
            (step === 1 && !isTeamValid()) ||
            (step === 2 && (!captain || !viceCaptain))
          }
          className={`px-4 py-2 rounded-lg flex items-center ${
            (step === 1 && !isTeamValid()) ||
            (step === 2 && (!captain || !viceCaptain))
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-indigo-600 text-white text-sm font-medium shadow-sm hover:bg-indigo-500 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          }`}
        >
          {step === 1 ? "Next" : "Preview Team"}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 ml-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      ) : (
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
        >
          Submit Team
        </button>
      )}
    </div>
  );

  const ProgressIndicator = () => (
    <div className="flex items-center justify-between mb-4">
      {[1, 2, 3].map((stepNumber) => (
        <React.Fragment key={stepNumber}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
              step >= stepNumber
                ? "bg-indigo-600 text-white text-sm font-medium shadow-sm hover:bg-indigo-500 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {stepNumber}
          </div>
          {stepNumber < 3 && (
            <div
              className={`flex-1 h-1 ${
                step > stepNumber
                  ? "bg-indigo-600 shadow-sm hover:bg-indigo-500 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  : "bg-gray-200"
              }`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
  if(playersLoading){
    return(<Loader/>)
  }

  if(error){
    return(<div className="flex flex-col items-center justify-center h-screen text-center">
      <p className="text-xl text-white font-medium mb-4">Unable to load players. Please try again later !</p>
    </div>)
  }

  return (
    <div className="max-w-3xl mx-auto pb-2 text-black max-h-screen">
      <div className="bg-indigo-600 text-white text-sm font-medium shadow-sm hover:bg-indigo-500 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-white p-2 rounded-t-lg">
        <h1 className="text-xl font-bold text-center">
          Dream 11 Team Selection
        </h1>
      </div>

      <div className="bg-gray-900 rounded-b-lg shadow-lg flex flex-col h-screen max-h-screen">
        {/* <div className="p-2 flex-shrink-0">
          <ProgressIndicator />
        </div> */}
        <NavigationBar />

        <div className="px-4 flex-grow overflow-hidden flex flex-col">
          {step === 1 && <PlayerSelectionScreen />}
          {step === 2 && <CaptainSelectionScreen />}
          {step === 3 && <ConfirmationScreen />}
        </div>
      </div>
    </div>
  );
};
export default Dream11TeamSelector;
