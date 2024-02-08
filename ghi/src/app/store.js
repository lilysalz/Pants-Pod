import { configureStore } from '@reduxjs/toolkit'
import { pantsApi } from './apiSlice'
import querySlice from './querySlice'

export const store = configureStore({
    reducer: {
        query: querySlice,
        [pantsApi.reducerPath]: pantsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(pantsApi.middleware),
})
