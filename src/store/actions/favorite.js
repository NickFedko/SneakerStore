import { ADD_TO_FAVORITE, REMOVE_FROM_FAVORITE } from "./types";

export const addToFavorite = (data) => ({
    type: ADD_TO_FAVORITE,
    payload: data
})

export const removeFromFavorite = (data) => ({
    type: REMOVE_FROM_FAVORITE,
    payload: data
})