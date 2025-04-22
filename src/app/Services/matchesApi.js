import { baseApi } from "./baseApi";

const betsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMatches: builder.query({
            query: () => `/matches`,
            providesTags: (result, error, arg) => {
                return ["matches"];
            },
        }),
        getMatch: builder.query({
            query: (matchId) => `/matches/${matchId}`,
            providesTags: (result, error, arg) => {
                return ["matches"];
            },
        }),
        getMatchQuestions: builder.query({
            query: (matchId) => `/matches/${matchId}/questions`,
            providesTags: (result, error, arg) => {
                return ["questions"];
            },
        }),
        getMatchBets: builder.query({
            query: (matchId) => `/matches/${matchId}/bet`,
            providesTags: (result, error, arg) => {
                return ["MatchBets"];
            },
        }),
        updateMatchBets: builder.mutation({
            query: ({ matchId, data }) => ({
                url: `/matches/${matchId}/bet`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["MatchBets", "History"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetMatchesQuery,
    useGetMatchQuery,
    useGetMatchQuestionsQuery,
    useGetMatchBetsQuery,
    useUpdateMatchBetsMutation,
} = betsApi;
