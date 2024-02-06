import { createSlice } from "@reduxjs/toolkit";

export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: {
        favorites: []
    },
    reducers: {
        setFavorite: (state, action) => {
            return { ...state, favorites: [...action.payload] }
        },
        addFavorite: (state, action) => {
            return { ...state, favorites: [action.payload, ...state.favorites] }
        },
        deleteFavorite: (state, action) => {
            const favorites = state.favorites.filter(favorite =>
                favorite.id !== action.payload.id)
            return { ...state, favorites: [...favorites] }
        }
    }
})

export const { setFavorite, addFavorite, deleteFavorite } = favoriteSlice.actions

export default favoriteSlice.reducer
