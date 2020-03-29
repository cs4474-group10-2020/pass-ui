import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { getDirectoryContents } from './actions/directory';
import Layout from './containers/Layout';

const app = (renderTo) => {
    const store = configureStore();
    store.dispatch(getDirectoryContents(['./']));

    ReactDOM.render(
        <Provider store={store}>
            <Layout />
        </Provider>, renderTo,
    );
};

export default app;
