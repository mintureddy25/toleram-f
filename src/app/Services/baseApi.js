import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_REACT_APP_API_URL,
  prepareHeaders: (headers, { getState }) => {
    headers.set("Content-Type", "application/json");

    // lets attach the token from the state (localstorage if not the state)
    const token = getState().JWTtoken
      ? getState().JWTtoken
      : localStorage.getItem("encodedToken");
    if (token) {
      headers.set("token", token);
    }
    return headers;
  },
});
const dynamicBaseQuery = async (args, api, extraOptions) => {
  const url = typeof args === "string" ? args : args.url;

  // construct a dynamically generated portion of the url - adding a timestamp at the end
  // adding with a '&' if a '?'' already exists
  const adjustedUrl = url;
  const adjustedArgs =
    typeof args === "string" ? adjustedUrl : { ...args, url: adjustedUrl };
  // provide the amended url and other params to the raw base query
  return rawBaseQuery(adjustedArgs, api, extraOptions);
};

// initialize an empty api service that we'll inject endpoints into later as needed
export const baseApi = createApi({
  baseQuery: dynamicBaseQuery,
  tagTypes: [
    "Bets",
    "Tournament",
    "History",
    "Question",
    "Match",
    "Player",
    "RoundQuestion",
    "TournamentRound",
    "PlayerScore",
    "PlayersBets",
  ],
  endpoints: () => ({}),
});
