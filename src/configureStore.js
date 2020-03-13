import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import allReducers from './reducers';

const logger = createLogger({
    collapsed: true,
});

const composeEnhancers = composeWithDevTools({});

export default function configureStore() {
    const reducer = combineReducers(allReducers);
    const middleware = composeEnhancers(applyMiddleware(thunk, promise, logger));
    return createStore(reducer, middleware);
}
