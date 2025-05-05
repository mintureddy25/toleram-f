import React from "react";
import BackButtonWithRules from "../../../../Components/BackButtonWithRules";
import MatchQuestions from "../Questions";
import CommentsSection from "../../../../Components/comments/CommentsSection";
import { useParams } from "react-router-dom";
import TabSwitcher from "../../../../Components/Tabs/TabsSwitcher";
import { useGetMatchQuery } from "../../../../app/Services/matchesApi";
import MatchDetails from "./MatchDetails";

function Match() {
  const { matchId } = useParams();
  const tabs = [
    { label: "Questions", content: <MatchQuestions /> },
    {
      label: "Discussion",
      content: (
        <CommentsSection
          title="MatchTalk: Dive Into the Discussion"
          roomName={`match-${matchId}`}
        />
      ),
    },
    {label: "Match Details", content: <MatchDetails matchId={matchId} />},
  ];

  return (
    <div className="max-w-3xl text-base leading-7  rounded bg-gray-900 h-screen md:max-w-7xl w-screen mx-auto pb-24 px-6">
      <BackButtonWithRules />
      <TabSwitcher tabs={tabs} />
    </div>
  );
}

export default Match;
