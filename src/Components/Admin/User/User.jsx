import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useGetUserAnalyticsQuery } from "../../../app/Services/Admin/analyticsApi";
import BettingHistory from "./BettingHistory";
import Dream11Team from "./Dream11Team";
import Analytics from "./Analytics";

export default function User() {
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState("");
  const {
    data: analyticsData,
    isError,
    error,
    isLoading,
  } = useGetUserAnalyticsQuery(email, {
    skip: !email,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setEmail(searchQuery.trim());
      if (searchQuery.trim() !== email) {
        setUserData(null);
      }
    }
  };

  useEffect(() => {
    if (analyticsData) {
      setUserData(analyticsData);
    }
  }, [analyticsData, error]);

  useEffect(() => {
    if (isError) {
      console.error(error);
      setUserData(null);
    }
  }, [isError, error]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-6 px-6">
        <div className="bg-gray-800 rounded-lg p-6 shadow">
          <h2 className="tracking-tight text-gray-100 sm:text-xl mb-4">
            Search User
          </h2>
          <form className="flex gap-2">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search user by email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full rounded-md px-3 py-1.5 text-base bg-gray-800 text-white outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            <button
              type="submit"
              onClick={handleSearch}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-white text-sm font-medium shadow-sm hover:bg-indigo-500 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={isLoading}
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </form>
        </div>
      </div>

      {isLoading ? (
        <div className="max-w-7xl mx-auto py-6 px-6 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-full h-64 bg-gray-800 rounded-lg"></div>
            <p className="mt-4 text-gray-400">Loading user data...</p>
          </div>
        </div>
      ) : userData ? (
        <div className="max-w-7xl mx-auto py-6 px-6">
          <Analytics userData={userData} />
          <div className="grid grid-cols-1 gap-6 lg:col-span-2">
            <BettingHistory
              matchBets={userData.matchBets}
              roundBets={userData.roundBets}
            />
            <Dream11Team dream11={userData?.dream11} />
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto py-12 px-6 text-center">
          <div className="bg-gray-800 rounded-lg p-8 shadow text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8 text-gray-500 mx-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>

            <h3 className="tracking-tight text-gray-100 sm:text-xl mb-4">
              {error?.data?.message}
            </h3>
            <p className="mt-2 text-gray-400">
              Search for a user by email to view their betting analytics and
              Dream11 team
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
