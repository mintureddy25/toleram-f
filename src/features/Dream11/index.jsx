import React, { useState } from "react";
import Dream11Leaderboard from "./Leaderboard";
import MenuTabs from "../Layout/MenuTabs";
import Dream11Team from "./Team";
import TabSwitcher from "../../Components/Tabs/TabsSwitcher";

function Dream11() {
  const tabs = [
    { label: "Team", content: <Dream11Team /> },
    { label: "Leaderboard", content: <Dream11Leaderboard /> },
  ];

  return (
    <MenuTabs>
      <TabSwitcher tabs={tabs} />
    </MenuTabs>
  );
}

export default Dream11;
