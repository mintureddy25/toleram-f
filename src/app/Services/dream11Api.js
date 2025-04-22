import { baseApi } from "./baseApi";

const dream11Api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDream11Team: builder.query({
      query: () => `dream11/team`,
      providesTags: (result, error, arg) => {
        return ["dream11"];
      },
    }),
    createDream11Team: builder.mutation({
      query: ({ teamData }) => ({
        url: `dream11/createTeam`,
        method: "POST",
        body: teamData,
      }),
      invalidatesTags: ["dream11"],
    }),
    updateDream11Team: builder.mutation({
      query: ({ teamData }) => ({
        url: `dream11/updateTeam`,
        method: "PUT",
        body: teamData,
      }),
      invalidatesTags: ["dream11"],
    }),
    getDream11Leaderboard: builder.query({
      query: () => `/dream11/leaderboard`,
    })
  }),
  overrideExisting: false,
});

export const { useCreateDream11TeamMutation, useGetDream11TeamQuery, useUpdateDream11TeamMutation, useGetDream11LeaderboardQuery } = dream11Api;
