import putAccountInfo from "../../services/api/account-info"
import { UPDATE_ACCOUNT_DATA_SUCCESS, UPDATE_ACCOUNT_DATA_FAIL, SET_MESSAGE } from "./types"

export const accountUpdate = (userInfo) => (dispatch) => {
    return putAccountInfo(userInfo).then(
        (data) => {
            dispatch({
                type:UPDATE_ACCOUNT_DATA_SUCCESS,
                payload:{ data }
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();

            dispatch({
                type: UPDATE_ACCOUNT_DATA_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload:message,
            });

            return Promise.reject();
        }
    )
}