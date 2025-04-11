import { baseApi } from "../baseApi";

const betsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getmatches: builder.query({
      query: () => `/matches`,
      providesTags: (result, error, arg) => {
        return ["Match"];
      },
    }),
    getMatch: builder.query({
      query: (matchId) => `/Matches/${matchId}`,
      providesTags: (result, error, arg) => {
        return [{ type: "Match", id: arg.id }];
      },
    }),
    getMatchPlayersList: builder.query({
      query: (matchId) => `/Matches/${matchId}/players`,
      providesTags: (result, error, arg) => {
        return ["Player"];
      },
    }),
    getMatchPlayers: builder.query({
      query: () => `/players`,
      providesTags: (result, error, arg) => {
        return ["Player"];
      },
    }),
    getPlayerDetails: builder.query({
      query: (playrId) => `/players/${playrId}`,
      providesTags: (result, error, arg) => {
        return ["Player"];
      },
    }),
    createMatch: builder.mutation({
      query: (MatchData) => ({
        url: "/admin/match",
        method: "POST",
        body: MatchData,
      }),
      invalidatesTags: ["Match"],
    }),
    addMatch: builder.mutation({
      query: (playerData) => ({
        url: `/admin/Matches`,
        method: "POST",
        body: playerData,
      }),
      invalidatesTags: ["Match"],
    }),
    updateMatchDetails: builder.mutation({
      query: (MatchData) => ({
        url: `/admin/matches/${MatchData.id}`,
        method: "PATCH",
        body: MatchData,
      }),
      invalidatesTags: ["Match"],
    }),
    getAdminQuestions: builder.query({
      query: (matchId) => `/admin/matches/${matchId}/questions`,
      providesTags: (result, error, arg) => {
        return ["Question"];
      },
    }),
    addQuestion: builder.mutation({
      query: (matchData) => ({
        url: `/admin/matches/${matchData.matchId}/addQuestion`,
        method: "POST",
        body: matchData,
      }),
      invalidatesTags: ["Match", "Question"],
    }),
    updateQuestion: builder.mutation({
      query: (questionsData) => ({
        url: `/admin/match-questions/${questionsData.id}`,
        method: "PATCH",
        body: questionsData,
      }),
      invalidatesTags: (result, error, arg) => ["Question"],
    }),
    updateCorrectAnswer: builder.mutation({
      query: (questionsData) => ({
        url: `/admin/match-questions/${questionsData.questionId}/correctOption`,
        method: "PATCH",
        body: questionsData,
      }),
      invalidatesTags: (result, error, arg) => ["Question"],
    }),
    updateMatchStatus: builder.mutation({
      query: (matchData) => ({
        url: `/admin/matches/${matchData.id}`,
        method: "PATCH",
        body: matchData,
      }),
      invalidatesTags: (result, error, arg) => ["Question"],
    }),
    setProcessing: builder.mutation({
      query: (matchData) => ({
        url: `/admin/matches/${matchData.id}/process-bet`,
        method: "PATCH",
        body: matchData,
      }),
      invalidatesTags: (result, error, arg) => ["Question"],
    }),
    updateBetStatus: builder.mutation({
      query: (matchData) => ({
        url: `/admin/matches/${matchData.id}/process-bet`,
        method: "PATCH",
        body: matchData,
      }),
      invalidatesTags: (result, error, arg) => ["Question"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetmatchesQuery,
  useGetMatchQuery,
  useGetMatchPlayersListQuery,
  useGetPlayerDetailsQuery,
  useGetPlayersQuery,
  useCreateMatchMutation,
  useAddMatchMutation,
  useUpdateMatchDetailsMutation,
  useGetAdminQuestionsQuery,
  useAddQuestionMutation,
  useUpdateQuestionMutation,
  useUpdateCorrectAnswerMutation,
  useUpdateMatchStatusMutation,
  useUpdateBetStatusMutation,
} = betsApi;