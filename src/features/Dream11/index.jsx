import React from "react";
import Dream11Leaderboard from "./Leaderboard";

import { Tab } from "@headlessui/react";
import MenuTabs from "../Layout/MenuTabs";
import Dream11Team from "./Team";

function Dream11() {
  return (
    <MenuTabs>
      <div className="">
        <Tab.Group defaultIndex={0}>
          <Tab.List className="flex justify-center justify-items-center space-x-4 px-4 sm:px-8 mb-6">
            <Tab
              className={({ selected }) =>
                `px-4 py-2 rounded-lg text-sm font-medium focus:outline-none ${
                  selected
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`
              }
            >
              Team
            </Tab>
            <Tab
              className={({ selected }) =>
                `px-4 py-2 rounded-lg text-sm font-medium focus:outline-none ${
                  selected
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`
              }
            >
              Leaderboard
            </Tab>
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <Dream11Team />
            </Tab.Panel>

            <Tab.Panel className="leaderboard">
              <Dream11Leaderboard />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </MenuTabs>
  );
}

export default Dream11;
