import { configureStore } from '@reduxjs/toolkit'
import { pantsApi } from './apiSlice'
import favoriteSlice from './favoriteSlice';

export const store = configureStore({
    reducer: {
        favoriteSlice: favoriteSlice,
        [pantsApi.reducerPath]: pantsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(pantsApi.middleware),
});
