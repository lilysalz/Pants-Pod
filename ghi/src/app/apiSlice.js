import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pantsApi = createApi({
    reducerPath: 'pantsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_HOST,
    }),
    endpoints: (builder) => ({
        getAllEpisodes: builder.query({
            query: () => '/api/episodes',
        }),
        likeEpisode: builder.mutation({
            query: (info) => ({
                url: '/api/episodes/liked/me',
                method: 'POST',
                body: info,
                credentials: 'include'
            }),
        }),
        getLikedEpisodes: builder.query({
            query: () => ({
                url: '/api/episodes/liked/me',
                credentials: 'include'
            })
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
            }
        })
    }),
})

export const {
    useLazyGetAllEpisodesQuery,
    useLikeEpisodeMutation,
    useLazyGetLikedEpisodesQuery,
    useGetTokenQuery,
    useLogoutMutation,
    useLoginMutation,
    useSignUpMutation,
} = pantsApi
