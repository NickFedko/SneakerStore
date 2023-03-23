import { combineReducers } from "redux";
import auth from './auth';
import message from './message';
import cartReducer from "../../services/cartSlice";
import favoriteReducer from "../../services/favoriteSlice";

export default combineReducers({
    auth,
    message,
    cartReducer,
    favoriteReducer
})