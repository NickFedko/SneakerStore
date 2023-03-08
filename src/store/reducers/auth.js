import getAccount from '../../services/api/account';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from '../actions/types';

const accessToken = JSON.parse(localStorage.getItem('access_token'));

const initialState = accessToken
                        ? { isLoggedIn: true, accessToken, user: getAccount().then(response => response.data) }
                        : { isLoggedIn: false, accessToken: null, user: null };

export default function authorization(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false
            };
        case REGISTER_FAIL: 
            return {
                ...state,
                isLoggedIn: false
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload
            };
        case LOGIN_FAIL: 
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };
        default: 
            return state;
    }

}