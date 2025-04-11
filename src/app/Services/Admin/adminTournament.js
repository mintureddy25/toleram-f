import { baseApi } from "../baseApi";

const betsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRounds: builder.query({
      query: () => `/admin/rounds`,
      providesTags: (result, error, arg) => {
        return ["Round"];
      },
    }),
    getRound: builder.query({
      query: (roundId) => `/admin/rounds/${roundId}`,
      providesTags: (result, error, arg) => {
        return [{ type: "Round", id: arg.id }];
      },
    }),
    getRoundPlayersList: builder.query({
      query: (roundId) => `/rounds/${roundId}/players`,
      providesTags: (result, error, arg) => {
        return ["Player"];
      },
    }),
    getPlayers: builder.query({
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
    createRound: builder.mutation({
      query: (roundData) => ({
        url: "/admin/round",
        method: "POST",
        body: roundData,
      }),
      invalidatesTags: ["Round", "Question"],
    }),
    addRound: builder.mutation({
      query: (playerData) => ({
        url: `/admin/rounds`,
        method: "POST",
        body: playerData,
      }),
      invalidatesTags: ["Round", "Question"],
    }),
    updateRound: builder.mutation({
      query: (roundData) => ({
        url: `/admin/rounds/${roundData.id}`,
        method: "PATCH",
        body: roundData,
      }),
      invalidatesTags: (result, error, arg) => {
        return ["Round"];
      }
    }),
    getRoundQuestions: builder.query({
      query: (RoundData) => `/admin/rounds/${RoundData.RoundId}/questions`,
      providesTags: (result, error, arg) => {
        return ["Question"];
      },
    }),
    addRoundQuestion: builder.mutation({
      query: (RoundData) => ({
        url: `/admin/rounds/${RoundData.roundId}/addQuestion`,
        method: "POST",
        body: RoundData,
      }),
      invalidatesTags: ["Round"],
    }),
    updateTournamentQuestion: builder.mutation({
      query: (questionsData) => ({
        url: `/admin/round-questions/${questionsData.id}`,
        method: "PATCH",
        body: questionsData,
      }),
      invalidatesTags: (result, error, arg) => ["Question"],
    }),
    updateCorrectAnswerTournament: builder.mutation({
      query: (questionsData) => ({
        url: `/admin/round-questions/${questionsData.questionId}/correctOption`,
        method: "PATCH",
        body: questionsData,
      }),
      invalidatesTags: (result, error, arg) => ["Question"],
    }),
    updateRoundStatus: builder.mutation({
      query: (roundData) => ({
        url: `/admin/rounds/${roundData.id}/process-bet`,
        method: "PATCH",
        body: roundData,
      }),
      invalidatesTags: (result, error, arg) => ["Round"],
    }),
    updateRoundBetStatus: builder.mutation({
      query: (roundData) => ({
        url: `/admin/rounds/${roundData.id}`,
        method: "PATCH",
        body: roundData,
      }),
      invalidatesTags: (result, error, arg) => ["Round"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetRoundsQuery,
  useGetRoundQuery,
  useGetRoundPlayersListQuery,
  useGetPlayerDetailsQuery,
  useGetPlayersQuery,
  useCreateRoundMutation,
  useAddRoundMutation,
  useUpdateRoundMutation,
  useGetRoundQuestionsQuery,
  useAddRoundQuestionMutation,
  useUpdateTournamentQuestionMutation,
  useUpdateCorrectAnswerTournamentMutation,
  useUpdateRoundStatusMutation,
  useUpdateRoundBetStatusMutation,
} = betsApi;