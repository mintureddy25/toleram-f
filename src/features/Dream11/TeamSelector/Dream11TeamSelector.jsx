import React, { useState, useEffect } from "react";
import { useGetPlayersQuery } from "../../../app/Services/playersApi";
import Loader from "../../../Components/Loader";
import PlayerSelection from "./PlayersSelection";
import CaptainViceCaptainSelection from "./CaptainViceCaptainSelection";
import TeamPreview from "./TeamPreview";
import NavigationBar from "./NavigationBar";
import {
  DEFAULT_MAX_PLAYERS,
  DEFAULT_TOTAL_CREDITS,
  DEFAULT_ROLE_LIMITS,
  DEFAULT_GENDER_LIMITS,
} from "../../../constants/teamLimits";
import Dream11Header from "./Dream11Header";
import { toast } from "react-toastify";
import TeamNameInput from "./TeamNameSelector";

const Dream11TeamSelector = ({
  players,
  onSubmit,
  onClose,
  super12TeamName = "",
}) => {
  const [allPlayers, setAllPlayers] = useState([]);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [captain, setCaptain] = useState(null);
  const [viceCaptain, setViceCaptain] = useState(null);
  const [filter, setFilter] = useState("All");
  const [genderFilter, setGenderFilter] = useState("female");
  const [searchQuery, setSearchQuery] = useState("");
  const [teamFilter, setTeamFilter] = useState("All Teams");
  const [maxPlayers] = useState(DEFAULT_MAX_PLAYERS);
  const [totalCredits] = useState(DEFAULT_TOTAL_CREDITS);
  const [roleLimits] = useState(DEFAULT_ROLE_LIMITS);
  const [genderLimits] = useState(DEFAULT_GENDER_LIMITS);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [teamName, setTeamName] = useState(super12TeamName || "");

  const handleTeamNameChange = (e) => {
    setTeamName(e.target.value);
  };

  const {
    data: playerData,
    isLoading: playersLoading,
    isError,
    error: errorMesssage,
  } = useGetPlayersQuery();

  useEffect(() => {
    if (isError) {
      setError(errorMesssage);
      console.error(errorMesssage);
    } else if (playerData && playerData.players) {
      setAllPlayers(playerData.players);
      if (players && players.length > 0) {
        const selectedPlayersData = playerData.players.filter((player) =>
          players.some((p) => p.player_id === player.id)
        );
        setSelectedPlayers(selectedPlayersData);

        setCaptain(
          players.find((player) => player.player_role === "captain")
            ?.player_id || null
        );
        setViceCaptain(
          players.find((player) => player.player_role === "vice-captain")
            ?.player_id || null
        );
      }
    } else {
    }
  }, [playersLoading, isError, playerData, error]);

  const countByRole = (role) =>
    selectedPlayers.filter((player) => player.player_role === role).length;

  const isRoleFull = (role) => countByRole(role) >= roleLimits[role].max;

  const countByGender = (gender) =>
    selectedPlayers.filter((player) => player.gender === gender).length;

  const isGenderFull = (gender) =>
    countByGender(gender) >= genderLimits[gender]?.max;

  const getFilteredPlayers = () => {
    return allPlayers.filter((player) => {
      const roleMatches = filter === "All" || player.player_role === filter;

      const teamMatches =
        teamFilter === "All Teams" || player.team_name === teamFilter;

      const genderMatches =
        genderFilter === "All" || player.gender === genderFilter;

      const searchMatches = player.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return roleMatches && teamMatches && genderMatches && searchMatches;
    });
  };

  const filteredPlayers = getFilteredPlayers();

  const isPlayerSelected = (playerId) =>
    selectedPlayers.some((player) => player.id === playerId);

  const usedCredits = selectedPlayers.reduce((sum, player) => {
    const credit = player?.credits ?? 0;
    return sum + credit;
  }, 0);

  const isTeamValid = () => {
    const rolesValid = Object.entries(roleLimits).every(([role, limits]) => {
      const count = countByRole(role);
      return count >= limits.min && count <= limits.max;
    });

    const gendersValid = Object.entries(genderLimits).every(
      ([gender, limits]) => {
        const count = countByGender(gender);
        return count >= limits.min && count <= limits.max;
      }
    );
    const creditsValid = usedCredits <= totalCredits;

    return (
      rolesValid &&
      gendersValid &&
      selectedPlayers.length === maxPlayers &&
      creditsValid
    );
  };

  const getUniqueTeams = () => {
    const teams = allPlayers.map((player) => player.team_name);
    return ["All Teams", ...new Set(teams)];
  };

  const togglePlayerSelection = (player) => {
    const isSelected = isPlayerSelected(player.id);
    const playerCredits = player?.credits ?? 0;

    if (isSelected) {
      setSelectedPlayers(selectedPlayers.filter((p) => p.id !== player.id));
      return;
    }

    const newTotalCredits = usedCredits + playerCredits;

    if (selectedPlayers.length >= maxPlayers) {
      toast.error(`You can only select ${maxPlayers} players.`);
      return;
    }

    if (isRoleFull(player.player_role)) {
      toast.error(`No more spots for ${player.player_role}s.`);
      return;
    }

    if (isGenderFull(player.gender)) {
      toast.error(`Limit reached for ${player.gender} players.`);
      return;
    }

    if (newTotalCredits > totalCredits) {
      toast.error(
        `You need ${playerCredits} credits, only ${
          totalCredits - usedCredits
        } left.`
      );
      return;
    }

    setSelectedPlayers([...selectedPlayers, player]);
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
    const selectedIds = selectedPlayers.map((p) => p.id);

    if (captain && !selectedIds.includes(captain)) {
      setCaptain(null);
    }
    if (viceCaptain && !selectedIds.includes(viceCaptain)) {
      setViceCaptain(null);
    }

    if (step === 1 && isTeamValid()) {
      setStep(2);
    } else if (step === 2 && captain && viceCaptain) {
      setStep(3);
    } else if (step === 3 && teamName) {
      setStep(4);
    }
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onClose();
    }
  };

  const isNextDisabled =
    (step === 1 && !isTeamValid()) ||
    (step === 2 && (!captain || !viceCaptain)) ||
    (step === 3 && !teamName);

  const getRoleColorClass = (role) => {
    switch (role) {
      case "batsman":
        return "red";
      case "bowler":
        return "green";
      case "all-rounder":
        return "yellow";
      case "wicket-keeper":
        return "blue";
      default:
        return "red";
    }
  };

  const handleSubmit = async () => {
    if (isTeamValid() && captain && viceCaptain) {
      setButtonLoading(true);
      await onSubmit({
        team: selectedPlayers,
        captain,
        viceCaptain,
        teamName,
      });
      setButtonLoading(false);
    } else {
      setButtonLoading(false);
      console.error("Invalid team selection");
    }
  };

  if (playersLoading) {
    return <Loader />;
  }

  if (!allPlayers || allPlayers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-500">
          🏏 No players yet. The pitch is empty! 🏟️
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pb-2 text-black max-h-screen">
      <Dream11Header />

      <div className="bg-gray-900 rounded-b-lg shadow-lg flex flex-col h-screen max-h-screen">
        <NavigationBar
          step={step}
          goBack={goBack}
          goToNextStep={goToNextStep}
          handleSubmit={handleSubmit}
          buttonLoading={buttonLoading}
          usedCredits={usedCredits}
          totalCredits={totalCredits}
          isNextDisabled={isNextDisabled}
        />
        {step === 1 && (
          <div className="flex w-full border border-gray-700 rounded-md overflow-hidden mb-2">
            {filter !== "All" ? (
              <div
                className={`flex-1 py-2 text-sm font-medium border-r border-gray-700 transition-colors duration-200 ${
                  countByRole(filter) >= roleLimits[filter].min
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {filter.toLocaleUpperCase()} : {countByRole(filter)}/
                {`${roleLimits[filter].min} - ${roleLimits[filter].max}`}
              </div>
            ) : (
              <div
                className={`flex-1 py-2 text-sm font-medium border-r border-gray-700 transition-colors duration-200 ${
                  countByGender("female") >= genderLimits.female.min
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                FEMALE: {countByGender("female")}/{genderLimits.female.min}
              </div>
            )}
            <div
              className={`flex-1 py-2 text-sm font-medium transition-colors duration-200 ${
                selectedPlayers.length >= maxPlayers
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              Total: {selectedPlayers.length}/{maxPlayers}
            </div>
          </div>
        )}

        <div className="flex-grow overflow-hidden flex flex-col">
          {step === 1 && (
            <PlayerSelection
              playersLoading={playersLoading}
              error={error}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              teamFilter={teamFilter}
              setTeamFilter={setTeamFilter}
              filter={filter}
              setFilter={setFilter}
              genderFilter={genderFilter}
              setGenderFilter={setGenderFilter}
              getUniqueTeams={getUniqueTeams}
              filteredPlayers={filteredPlayers}
              isPlayerSelected={isPlayerSelected}
              togglePlayerSelection={togglePlayerSelection}
              getRoleColorClass={getRoleColorClass}
            />
          )}
          {step === 2 && (
            <CaptainViceCaptainSelection
              selectedPlayers={selectedPlayers}
              captain={captain}
              viceCaptain={viceCaptain}
              selectCaptain={selectCaptain}
              selectViceCaptain={selectViceCaptain}
              getRoleColorClass={getRoleColorClass}
            />
          )}
          {step === 3 && (
            <TeamNameInput
              teamName={teamName}
              onChange={handleTeamNameChange}
            />
          )}
          {step === 4 && (
            <TeamPreview
              selectedPlayers={selectedPlayers}
              captain={captain}
              viceCaptain={viceCaptain}
              getRoleColorClass={getRoleColorClass}
              teamName={teamName}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Dream11TeamSelector;
