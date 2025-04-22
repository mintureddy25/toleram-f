import React from 'react';
import { useGetDream11TeamQuery } from '../../app/Services/dream11Api';
import Dream11TeamDisplay from './ViewTeam';
import Loader from '../../Components/Loader';
import CreateTeam from './CreateTeam';
import ViewTeam from './ViewTeam';
import MenuTabs from '../Layout/MenuTabs';


const Dream11Team = () => {
  const {
    data: teamData,
    isLoading: teamLoading,
    isError,
    error: errorMessage,
  } = useGetDream11TeamQuery();

  if (teamLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="p-4 text-2xl text-red-500">
        <p>{errorMessage?.data?.message || 'Something went wrong, please try again later'}</p>
        
      </div>
    );
  }

  const hasTeam = teamData?.team && teamData.team.length > 0;

  return (
    
    <div className="team-container rounded-lg shadow-sm">
      {hasTeam ? (
        <ViewTeam teamData={teamData} />
      ) : teamData?.canCreate ? (
        <CreateTeam />
      ) : (
        <div className="p-4 text-2xl font-bold text-gray-500">
          <p>Tournament already started. You cannot create a team now.</p>
        </div>
      )}
    </div>

  );
};

export default Dream11Team;