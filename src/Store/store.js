import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers'
import thunk from 'redux-thunk';

const middleware = [thunk];

const store = configureStore({
    reducer: rootReducer,
    middleware: middleware
});

export default store;