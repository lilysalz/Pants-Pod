import { configureStore } from '@reduxjs/toolkit'
import { pantsApi } from './apiSlice'

export const store = configureStore({
    reducer: {
        [pantsApi.reducerPath]: pantsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(pantsApi.middleware),
});
