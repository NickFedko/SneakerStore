import { ADD_TO_FAVORITE, REMOVE_FROM_FAVORITE } from "../actions/types";

const initialState = {favoriteArr : []};

export default function favorite(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ADD_TO_FAVORITE:
            return {
                ...state,
                favorites:[payload, ...state.favorites]
            };
        case REMOVE_FROM_FAVORITE:
            const filteredFavorites = state.favorites.filter(favorite => favorite.id !== payload)
            return {
                ...state,
                favorites: filteredFavorites
            }
        default: return false;
    }
}