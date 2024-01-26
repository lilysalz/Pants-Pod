import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { pantsApi } from './apiSlice'


export const store = configureStore({
    reducer: {
        [pantsApi.reducerPath]: pantsApi.reducer
    },
    middleware: (GetDefaultMiddleware) => GetDefaultMiddleware().concat(pantsApi.middleware)
})
setupListeners(store.dispatch)
