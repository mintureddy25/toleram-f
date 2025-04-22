import React from "react";
import {
  BuildingOfficeIcon,
  UserIcon,
  UsersIcon,
  TrophyIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MenuTabs(props) {
  const tabs = [
    {
      name: "Matches",
      href: "/matches",
      icon: UserIcon,
      current:
        location.pathname.includes("matches") || location.pathname === "/",
    },
    {
      name: "Tournament",
      href: "/rounds",
      icon: BuildingOfficeIcon,
      current: location.pathname.includes("rounds"),
    },
    {
      name: "Bet History",
      href: "/history",
      icon: UsersIcon,
      current: location.pathname.includes("history"),
    },
    {
      name: "Dream 11",
      href: "/dream11",
      icon: TrophyIcon,
      current: location.pathname.includes("dream11"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <nav
          className="bg-gray-800 rounded-lg shadow-xl mx-4 mt-4"
          aria-label="Tabs"
        >
          <div className="flex justify-around items-center px-2 py-3">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                to={tab.href}
                className={classNames(
                  tab.current
                    ? "bg-indigo-600 text-white shadow-lg transform scale-105 transition-all duration-200"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200",
                  "rounded-lg px-4 py-3 text-sm font-medium flex flex-col items-center space-y-1 min-w-[80px]"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                <tab.icon
                  className={classNames(
                    tab.current ? "text-white" : "text-gray-400 group-hover:text-white",
                    "h-6 w-6"
                  )}
                  aria-hidden="true"
                />
                <span className="text-xs sm:text-sm whitespace-nowrap">{tab.name}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-6 mb-24">
        {props.children}
      </div>
    </div>
  );
}
