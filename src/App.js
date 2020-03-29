import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './configureStore';
import { getDirectoryContents } from './actions/directory';
import Layout from './components/Layout';

const app = (renderTo) => {
    const { store, persistor } = configureStore();
    store.dispatch(getDirectoryContents(['./']));

    ReactDOM.render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Layout />
            </PersistGate>
        </Provider>, renderTo,
    );
};

export default app;
