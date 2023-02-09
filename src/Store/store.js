import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '../reducers'
import thunk from 'redux-thunk';

const middleware = [thunk];

const store = configureStore({
    reducer: rootReducer,
    middleware: middleware
});

export default store;