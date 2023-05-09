import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/styles/index.css';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import store from './store/store';
import { getTotals } from './services/cartSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));
const PersistStore = persistStore(store);

store.dispatch(getTotals());

root.render(
    <Provider store={store}>
        <HashRouter>
          <PersistGate persistor={PersistStore}>
            <App />
          </PersistGate>
        </HashRouter>
    </Provider>
);
