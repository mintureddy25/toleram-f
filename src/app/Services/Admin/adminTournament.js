import { baseApi } from "../baseApi";

const betsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTournamentRounds: builder.query({
      query: () => `/rounds`,
      providesTags: ["TournamentRound"]
    }),
    addTournamentRound: builder.mutation({
      query: (playerData) => ({
        url: `/admin/rounds`,
        method: "POST",
        body: playerData,
      }),
      invalidatesTags: ["TournamentRound"],
    }),
    getRound: builder.query({
      query: (roundId) => `/admin/rounds/${roundId}`,
      providesTags: (result, error, roundId) => [{ type: "TournamentRound", id: roundId }],
    }),
    updateRound: builder.mutation({
      query: (roundData) => ({
        url: `/admin/rounds/${roundData.id}`,
        method: "PATCH",
        body: roundData,
      }),
      invalidatesTags: (result, error, roundData) => [
        { type: "TournamentRound", id: roundData.id },
        "TournamentRound",
      ],
    }),
    getAdminRoundQuestions: builder.query({
      query: ({ roundId }) => `/rounds/${roundId}/questions`,
      providesTags: (result, error, { roundId }) => [
        { type: "RoundQuestion", id: roundId },
      ],
    }),
    addRoundQuestion: builder.mutation({
      query: (RoundData) => ({
        url: `/admin/rounds/${RoundData.roundId}/addQuestion`,
        method: "POST",
        body: RoundData,
      }),
      invalidatesTags: (result, error, RoundData) => [
        { type: "RoundQuestion", id: RoundData.roundId },
      ],
    }),
    updateTournamentQuestion: builder.mutation({
      query: (questionsData) => ({
        url: `/admin/round-questions/${questionsData.id}`,
        method: "PATCH",
        body: questionsData,
      }),
      invalidatesTags: (result, error, questionsData) => [
        { type: "RoundQuestion", id: questionsData.roundId },
      ],
    }),
    updateCorrectAnswerTournament: builder.mutation({
      query: (questionsData) => ({
        url: `/admin/round-questions/${questionsData.questionId}/correctOption`,
        method: "PATCH",
        body: questionsData,
      }),
      invalidatesTags: (result, error, questionsData) => [
        { type: "RoundQuestion", id: questionsData.roundId },
      ],
    }),
    updateRoundStatus: builder.mutation({
      query: (roundData) => ({
        url: `/admin/rounds/${roundData.id}/process-bet`,
        method: "PATCH",
        body: roundData,
      }),
      invalidatesTags: ["TournamentRound"],
    }),
    updateRoundBetStatus: builder.mutation({
      query: (roundData) => ({
        url: `/admin/rounds/${roundData.id}`,
        method: "PATCH",
        body: roundData,
      }),
      invalidatesTags: ["TournamentRound"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddRoundMutation,
  useUpdateRoundMutation,
  useAddRoundQuestionMutation,
  useUpdateTournamentQuestionMutation,
  useUpdateCorrectAnswerTournamentMutation,
  useUpdateRoundStatusMutation,
  useUpdateRoundBetStatusMutation,
  useGetTournamentRoundsQuery,
  useAddTournamentRoundMutation,
  useGetAdminRoundQuestionsQuery,
  useGetRoundQuery
} = betsApi;
