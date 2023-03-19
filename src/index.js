import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/styles/index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
const PersistStore = persistStore(store);

root.render(
    <Provider store={store}>
        <BrowserRouter>
          <PersistGate persistor={PersistStore}>
            <App />
          </PersistGate>
        </BrowserRouter>
    </Provider>
);
