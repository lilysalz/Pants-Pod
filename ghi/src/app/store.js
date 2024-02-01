import { configureStore } from '@reduxjs/toolkit'
import { pantsApi } from './apiSlice'
import queryReducer from './querySlice'

export const store = configureStore({
    reducer: {
        query: queryReducer,
        [pantsApi.reducerPath]: pantsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(pantsApi.middleware),
});
