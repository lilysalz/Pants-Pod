import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pantsApi = createApi({
    reducerPath: 'pantsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_HOST,
    }),
    endpoints: (builder) => ({
        getAllEpisodes: builder.query({
            query: () => '/api/episodes',
            providesTags: ['Episodes'],
        }),

        likeEpisode: builder.mutation({
            query: (info) => ({
                url: '/api/episodes/liked/me',
                method: 'POST',
                body: info,
                credentials: 'include',
            }),
            invalidatesTags: ['Favorites'],
        }),
        deleteLikeEpisode: builder.mutation({
            query: (id) => ({
                url: `/api/episodes/liked/me?episode_id=${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: ['Favorites'],
        }),
        getLikedEpisodes: builder.query({
            query: () => ({
                url: '/api/episodes/liked/me',
                credentials: 'include',
            }),
            providesTags: ['Favorites'],
        }),
        getToken: builder.query({
            query: () => ({
                url: '/token',
                credentials: 'include',
            }),
            providesTags: ['Account'],
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/token',
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: ['Account'],
        }),
        login: builder.mutation({
            query: (info) => {
                const formData = new FormData()
                formData.append('username', info.username)
                formData.append('password', info.password)

                return {
                    url: '/token',
                    method: 'POST',
                    body: formData,
                    credentials: 'include',
                }
            },
            invalidatesTags: ['Account'],
        }),
        signUp: builder.mutation({
            query: (info) => {
                return {
                    url: '/api/accounts',
                    method: 'POST',
                    body: info,
                }
            },
        }),
        submitTellUsAnything: builder.mutation({
            query: (info) => {
                return {
                    url: '/api/tell_us_anything',
                    method: 'POST',
                    body: info,
                    credentials: 'include',
                }
            },
        }),
        getPodcastData: builder.query({
            query: () => '/api/episodes/admin/get_podcast_data',
        }),
        deletePodcastData: builder.mutation({
            query: () => {
                return {
                    url: '/api/episodes/admin/clear_episode_data',
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['Episodes'],
        }),
    }),
})

export const {
    useLazyGetAllEpisodesQuery,
    useGetAllEpisodesQuery,
    useLikeEpisodeMutation,
    useDeleteLikeEpisodeMutation,
    useLazyGetLikedEpisodesQuery,
    useGetTokenQuery,
    useLogoutMutation,
    useLoginMutation,
    useSignUpMutation,
    useGetLikedEpisodesQuery,
    useSubmitTellUsAnythingMutation,
    useGetPodcastDataQuery,
    useDeletePodcastDataMutation
} = pantsApi
