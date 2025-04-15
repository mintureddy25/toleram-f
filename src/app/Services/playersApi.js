import { baseApi } from "./baseApi";

const betsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPlayers: builder.query({
            query: () => `players`,
            providesTags: (result, error, arg) => {
              return ["Player"];
            },
          }),
        getPlayerQuestions: builder.query({
            query: () => `bestplayers/questions`,
            providesTags: (result, error, arg) => {
                return ["Player"];
            },
        }),
        getPlayersBets: builder.query({
            query: () => `bestplayers/bets`,
            providesTags: (result, error, arg) => {
                return ["PlayersBets"];
            },
        }),
        updatePlayerBets: builder.mutation({
            query: ({ data }) => ({
                url: `bestplayers/bets`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["PlayersBets", "History"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetPlayersQuery,
    useGetPlayerQuestionsQuery,
    useGetPlayersBetsQuery,
    useUpdatePlayerBetsMutation,
} = betsApi;
