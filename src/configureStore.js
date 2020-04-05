import { applyMiddleware, combineReducers, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import allReducers from './reducers';

const logger = createLogger({
    collapsed: true,
});

const persistConfig = {
    key: 'settings',
    storage,
    whitelist: 'settings', // Only persist settings reducer
};

const composeEnhancers = composeWithDevTools({});

export default function configureStore() {
    const rootReducer = combineReducers(allReducers);
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const middleware = composeEnhancers(applyMiddleware(thunk, promise, logger));

    const store = createStore(persistedReducer, middleware);
    const persistor = persistStore(store);

    return { store, persistor };
}
