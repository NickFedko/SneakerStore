import { UPDATE_ACCOUNT_DATA_SUCCESS, UPDATE_ACCOUNT_DATA_FAIL } from "../actions/types";

const accessToken = JSON.parse(localStorage.getItem('access_token'));

const initialState = accessToken ? {isLoggedIn: true, accessToken}: {isLoggedIn: false, accessToken: null}

export default function updateData(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case UPDATE_ACCOUNT_DATA_SUCCESS: 
            return {
                ...state,
                isLoggedIn:true,
                user: payload
            }
        case UPDATE_ACCOUNT_DATA_FAIL:
            return {
                ...state,
                isLoggedIn:true
            }
        default:
            return state;
    }
}