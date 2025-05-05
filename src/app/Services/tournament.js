import { baseApi } from "./baseApi";

const tournamentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTournament: builder.query({
      query: () => `/tournament`,
      providesTags: ['Tournament'],
    }),

    updateSuper12BetStatus: builder.mutation({
      query: (updatedData) => ({
        url: `/tournament/super12`,
        method: 'PATCH', 
        body: updatedData,
      }),
      invalidatesTags: ['Tournament'], 
    }),
  }),
  overrideExisting: false,
});

export const { useGetTournamentQuery, useUpdateSuper12BetStatusMutation } = tournamentApi;
