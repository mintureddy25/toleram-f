import React, { useState } from "react";
import { useCreateDream11TeamMutation } from "../../app/Services/dream11Api";

import { toast } from "react-toastify";
import Dream11TeamSelector from "./TeamSelector";

const CreateTeam = () => {
  const [createDream11Team, { isLoading: creatTeamLoading }] =
    useCreateDream11TeamMutation();
  const [showTeamSelector, setShowTeamSelector] = useState(false);

  const handleCreateTeam = async (selectedTeam) => {
    const teamData = {
      players: selectedTeam.team.map((player) => {
        if (player.id === selectedTeam.captain) {
          return { playerId: player.id, roleType: "captain" ,gender:player.gender, type: player.player_role, credits: player.credits};
        }
        if (player.id === selectedTeam.viceCaptain) {
          return { playerId: player.id, roleType: "vice-captain", gender:player.gender, type: player.player_role, credits: player.credits};
        }
        return { playerId: player.id, roleType: "player", gender:player.gender, type: player.player_role, credits: player.credits };
      }),
    };
    try {
      const response = await createDream11Team({ teamData }).unwrap();
      toast.success(response?.message);
    } catch (error) {
      toast.error(error?.data?.message || "Error creating team");
      console.error("Error creating team:", error);
    }
  };
  const handCreateTeam = () => {
    setShowTeamSelector(!showTeamSelector);
  };

  return (
    <>
      {!showTeamSelector ? (
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-xl text-white font-medium mb-4">
            <h1 className="text-2xl font-bold text-gray-500">
              🧢 Your fantasy squad is still a fantasy… let’s make it real!
            </h1>
          </p>
          <button
            onClick={handCreateTeam}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white text-md font-medium shadow-sm hover:bg-indigo-500 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <span className="text-2xl">+</span>
            <span className="ml-2">Create Team</span>
          </button>
        </div>
      ) : (
        <Dream11TeamSelector
          players={null}
          onSubmit={handleCreateTeam}
          onClose={handCreateTeam}
        />
      )}
    </>
  );
};

export default CreateTeam;
