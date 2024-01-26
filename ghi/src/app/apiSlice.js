import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pantsApi = createApi({
    reducerPath: 'pantsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_HOST,
    }),
    endpoints: () => ({
        getAllEpisodes: builder.query({
            query: () => '/api/episodes'
        }),
        likeEpisode: builder.query({
            query: () => ({
                url: '/api/episodes/liked/me',
                method: 'POST'
            }),
        }),
        getLikedEpisodes: builder.query({
            query: () => '/api/episodes/liked/me'
        })
    })
})

export const { useGetAllEpisodesQuery } = pantsApi
