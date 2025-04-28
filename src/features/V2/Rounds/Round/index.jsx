import React from "react";
import RoundQuestions from "../Questions";
import CommentsSection from "../../../../Components/comments/CommentsSection";
import BackButtonWithRules from "../../../../Components/BackButtonWithRules";
import TabSwitcher from "../../../../Components/Tabs/TabsSwitcher";
import { useParams } from "react-router-dom";

function Round() {
  const { roundId } = useParams();
  const tabs = [
    { label: "Questions", content: <RoundQuestions /> },
    {
      label: "Discussion",
      content: <CommentsSection title="RoundTalk: Dive Into the Discussion" roomName={`round-${roundId}`} />,
    },
  ];

  return (
    <div className="max-w-3xl text-base leading-7  rounded bg-gray-900 h-screen md:max-w-7xl w-screen mx-auto pb-24 px-6">
      <BackButtonWithRules />
      <TabSwitcher tabs={tabs} />
    </div>
  );
}

export default Round;
