import directoryReducer, * as directory from './directory';
import settingsReducer from './settings';

export default {
    directory: directoryReducer,
    settings: settingsReducer,
};

export const getDirectory = (state, path) => directory.getDirectory(state.directory, path);
