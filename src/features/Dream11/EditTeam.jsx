import React, { useState } from "react";
import { useUpdateDream11TeamMutation } from "../../app/Services/dream11Api";

import { toast } from "react-toastify";
import Loader from "../../Components/Loader";
import Dream11TeamSelector from "./TeamSelector";

const EditTeam = ({ teamData, handleEdit }) => {
  const [updateDream11Team, { isLoading: creatTeamLoading }] =
    useUpdateDream11TeamMutation();

  const handleUpdateTeam = async (selectedTeam) => {
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
      teamName: selectedTeam.teamName
    };
    try {
      const response = await updateDream11Team({ teamData }).unwrap();
      toast.success(response?.message || "Team updated successfully");
      handleEdit();
    } catch (error) {
      toast.error(error?.data?.message || "Error creating team");
      console.error("Error creating team:", error);
    }
  };

  if (!teamData || !teamData.team || teamData.team.length === 0) {
    return <Loader />;
  }

  return (
    <>
      <Dream11TeamSelector
        players={teamData.team} 
        onSubmit={handleUpdateTeam}
        onClose={handleEdit}
        super12TeamName={teamData.teamName}
      />
    </>
  );
};

export default EditTeam;
