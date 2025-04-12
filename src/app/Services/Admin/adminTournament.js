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
      providesTags: (result, error, arg) => {
        return [{ type: "Rounds", id: arg.roundId }];
      },
    }),
    updateRound: builder.mutation({
      query: (roundData) => ({
        url: `/admin/rounds/${roundData.id}`,
        method: "PATCH",
        body: roundData,
      }),
      invalidatesTags: ["Rounds"]
    }),
    getAdminRoundQuestions: builder.query({
      query: ({roundId}) => `/rounds/${roundId}/questions`,
      providesTags: (result, error, arg) => {
        return [{ type: "RoundQuestion", id: arg.id }];
      }
    }),
    addRoundQuestion: builder.mutation({
      query: (RoundData) => ({
        url: `/admin/rounds/${RoundData.roundId}/addQuestion`,
        method: "POST",
        body: RoundData,
      }),
      invalidatesTags: (result, error, arg) => {
        return [{ type: "RoundQuestion", id: arg.id }];
      }
    }),
    updateTournamentQuestion: builder.mutation({
      query: (questionsData) => ({
        url: `/admin/round-questions/${questionsData.id}`,
        method: "PATCH",
        body: questionsData,
      }),
      invalidatesTags: (result, error, arg) => {
        return [{ type: "RoundQuestion", id: arg.id }];
      }
    }),
    updateCorrectAnswerTournament: builder.mutation({
      query: (questionsData) => ({
        url: `/admin/round-questions/${questionsData.questionId}/correctOption`,
        method: "PATCH",
        body: questionsData,
      }),
      invalidatesTags: (result, error, arg) => {
        return [{ type: "RoundQuestion", id: arg.RoundId }];
      }
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
  useGetAdminRoundQuestionsQuery
  
} = betsApi;
