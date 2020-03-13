import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { getDirectoryContents } from './actions/directory';
import configureStore from './configureStore';

const app = (renderTo) => {
    const store = configureStore();
    store.dispatch(getDirectoryContents(['./']));

    ReactDOM.render(
        <Provider store={store}>
            <div />
        </Provider>, renderTo,
    );
};

export default app;
