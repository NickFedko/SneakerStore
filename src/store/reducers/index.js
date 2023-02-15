import { combineReducers } from "redux";
import auth from './auth';
import message from './message';
import updateData from "./account_update";

export default combineReducers({
    auth,
    message,
    updateData
})