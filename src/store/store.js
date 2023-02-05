import { configureStore } from '@reduxjs/toolkit';
import initialState from './initialState';
import rootReducer from './reducer'

const store = configureStore({
    reducer : rootReducer, 
    preloadedState: initialState
});

export default store;