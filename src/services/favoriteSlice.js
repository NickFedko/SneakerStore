import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import message from "../store/reducers/message";

const initialState = {
    favoriteItems: []
};

const notify = (message) => toast(message, {
    type: 'default',
    autoClose: 2000,
    theme: 'colored'
});

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        addToFavorite(state, action) {
            state.favoriteItems.push(action.payload);
            notify(`${action.payload.title} added to favorite`);
        },
        removeFromFavorite(state, action) {
            const nextFavoriteItems =  state.favoriteItems.filter(
                favoriteItem => favoriteItem.id !== action.payload.id
            );

            state.favoriteItems = nextFavoriteItems;
            notify(`${action.payload.title} removed from favorite`);
        }
    }
})

export const { addToFavorite, removeFromFavorite } = favoriteSlice.actions

export default favoriteSlice.reducer;