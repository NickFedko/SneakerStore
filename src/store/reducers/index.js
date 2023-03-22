import { combineReducers } from "redux";
import auth from './auth';
import message from './message';
import favorite from "./favorite";
import cartReducer from "../../services/cartSlice";

export default combineReducers({
    auth,
    message,
    favorite,
    cartReducer
})