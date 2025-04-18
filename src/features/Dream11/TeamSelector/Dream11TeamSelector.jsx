import React, { useState, useEffect } from "react";
import { useGetPlayersQuery } from "../../../app/Services/playersApi";
import Loader from "../../../Components/Loader";
import PlayerSelection from "./PlayersSelection";
import CaptainViceCaptainSelection from "./CaptainViceCaptainSelection";
import TeamPreview from "./TeamPreview";
import NavigationBar from "./NavigationBar";
import { useGetTournamentQuery } from "../../../app/Services/tournament";
import {
  DEFAULT_MAX_PLAYERS,
  DEFAULT_TOTAL_CREDITS,
  DEFAULT_ROLE_LIMITS,
  DEFAULT_GENDER_LIMITS,
} from "../../../constants/teamLimits";

const Dream11TeamSelector = ({ players, onSubmit, onClose }) => {
  const [allPlayers, setAllPlayers] = useState([]);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [captain, setCaptain] = useState(null);
  const [viceCaptain, setViceCaptain] = useState(null);
  const [filter, setFilter] = useState("All");
  const [genderFilter, setGenderFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [teamFilter, setTeamFilter] = useState("All");
  const [maxPlayers, setMaxPlayers] = useState(DEFAULT_MAX_PLAYERS);
  const [totalCredits, setTotalCredits] = useState(DEFAULT_TOTAL_CREDITS);
  const [roleLimits, setRoleLimits] = useState(DEFAULT_ROLE_LIMITS);
  const [genderLimits, setGenderLimits] = useState(DEFAULT_GENDER_LIMITS);
  const {
    data: playerData,
    isLoading: playersLoading,
    isError,
    error: errorMesssage,
  } = useGetPlayersQuery();
  const { data: limits, isLoading: limitsLoading } = useGetTournamentQuery();

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
      }
    } else {
    }
  }, [playersLoading, isError, playerData, error]);

  useEffect(() => {
    if (limits?.tournament) {
      const t = limits.tournament;
      setMaxPlayers(t.noOfPlayers || DEFAULT_MAX_PLAYERS);
      setTotalCredits(t.totalCredits ?? DEFAULT_TOTAL_CREDITS);

      setRoleLimits({
        batsman: {
          min: t.batsmenMin ?? DEFAULT_ROLE_LIMITS.batsman.min,
          max: 11,
        },
        bowler: {
          min: t.bowlersMin ?? DEFAULT_ROLE_LIMITS.bowler.min,
          max: 11,
        },
        "all-rounder": {
          min: t.allRoundersMin ?? DEFAULT_ROLE_LIMITS["all-rounder"].min,
          max: 11,
        },
        "wicket-keeper": {
          min: t.wicketKeepersMin ?? DEFAULT_ROLE_LIMITS["wicket-keeper"].min,
          max: 11,
        },
      });

      setGenderLimits({
        male: {
          min: DEFAULT_GENDER_LIMITS.male.min,
          max: DEFAULT_GENDER_LIMITS.male.max,
        },
        female: {
          min: t.femalePlayersMin ?? DEFAULT_GENDER_LIMITS.female.min,
          max: DEFAULT_GENDER_LIMITS.female.max,
        },
        others: {
          min: DEFAULT_GENDER_LIMITS.others.min,
          max: DEFAULT_GENDER_LIMITS.others.max,
        },
      });
    }
  }, [limits]);

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
        teamFilter === "All" || player.team_name === teamFilter;

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
    return ["All", ...new Set(teams)];
  };

  const togglePlayerSelection = (player) => {
    const isSelected = isPlayerSelected(player.id);
    const playerCredits = player?.credits ?? 0;

    if (isSelected) {
      setSelectedPlayers(selectedPlayers.filter((p) => p.id !== player.id));
    } else {
      const newTotalCredits = usedCredits + playerCredits;

      if (
        selectedPlayers.length < maxPlayers &&
        !isRoleFull(player.player_role) &&
        !isGenderFull(player.gender) &&
        newTotalCredits <= totalCredits
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
      await onSubmit({
        team: selectedPlayers,
        captain,
        viceCaptain,
      });
    } else {
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
      <div className="bg-indigo-600 text-white text-sm font-medium shadow-sm hover:bg-indigo-500 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-white p-2 rounded-t-lg">
        <h1 className="text-md font-bold text-center">
          Dream 11 Team Selection
        </h1>
      </div>

      <div className="bg-gray-900 rounded-b-lg shadow-lg flex flex-col h-screen max-h-screen">
        <NavigationBar
          step={step}
          goBack={goBack}
          goToNextStep={goToNextStep}
          handleSubmit={handleSubmit}
          isTeamValid={isTeamValid}
          captain={captain}
          viceCaptain={viceCaptain}
          usedCredits={usedCredits}
          totalCredits={totalCredits}
        />
        <div className="flex space-x-2 min-w-max px-2 mb-2">
          {Object.entries(roleLimits).map(([role, limits]) => {
            const count = countByRole(role);
            return (
              <div
                key={role}
                className={`px-2 py-1 rounded text-xs ${
                  count >= limits.min && count <= limits.max
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {role.toUpperCase().slice(0, 3)}: {count}/{limits.min}
              </div>
            );
          })}
          <div
            className={`px-2 py-1 rounded text-xs ${
              countByGender("female") >= genderLimits.female.min
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            F: {countByGender("female")}/{genderLimits.female.min}
          </div>
        </div>

        <div className="px-2 flex-grow overflow-hidden flex flex-col">
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
            <TeamPreview
              selectedPlayers={selectedPlayers}
              captain={captain}
              viceCaptain={viceCaptain}
              getRoleColorClass={getRoleColorClass}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Dream11TeamSelector;
