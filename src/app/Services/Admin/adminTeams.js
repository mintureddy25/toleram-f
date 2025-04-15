import { baseApi } from "../baseApi";

const betsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: () => `/teams`,
      providesTags: (result, error, arg) => {
        return ["Teams"];
      },
    }),
    getTeam: builder.query({
      query: (teamId) => `/teams/${teamId}`,
      providesTags: (result, error, arg) => {
        return ["Teams"];
      },
    }),
    getTeamPlayersList: builder.query({
      query: (teamId) => `/teams/${teamId}/players`,
      providesTags: (result, error, arg) => {
        return ["Player"];
      },
    }),
    createTeam: builder.mutation({
      query: ({ teamName, imageUrl }) => ({
        url: "/admin/teams",
        method: "POST",
        body: {
          name: teamName,
          imageUrl: imageUrl,
        },
      }),
      invalidatesTags: ["Teams"],
    }),
    addPlayerToTeam: builder.mutation({
      query: (playerData) => ({
        url: `/admin/teams/${playerData.teamId}`,
        method: "POST",
        body: playerData,
      }),
      invalidatesTags: ["Player"],
    }),
    updateTeamsDetails: builder.mutation({
      query: ({ teamName, imageUrl, teamId }) => ({
        url: `/admin/teams/${teamId}`,
        method: "PATCH",
        body: {
          name: teamName,
          imageUrl: imageUrl,
        },
      }),
      invalidatesTags: ["Teams"],
    }),
    addImageUrl: builder.mutation({
      query: (imageData) => ({
        url: `/admin/media/generate-presigned-url`,
        method: "POST",
        body: imageData,
      }),
    }),
    updatePlayerDetails: builder.mutation({
        query: ({name, imageUrl, playerId}) => ({
            url: `/admin/players/${playerId}`,
            method: 'PATCH',
            body: {
                name,
                imageUrl: imageUrl && imageUrl,
            },
        }),
        invalidatesTags: ['Player'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTeamsQuery,
  useGetTeamQuery,
  useGetTeamPlayersListQuery,
  useCreateTeamMutation,
  useAddPlayerToTeamMutation,
  useUpdateTeamsDetailsMutation,
  useAddImageUrlMutation,
  useUpdatePlayerDetailsMutation,
} = betsApi;