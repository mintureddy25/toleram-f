import { baseApi } from "./baseApi";

const tournamentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTournament: builder.query({
      query: () => `/tournament`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetTournamentQuery } = tournamentApi;
