import directoryReducer, * as directory from './directory';

export default {
    directory: directoryReducer,
};

export const getDirectory = (state, path) => directory.getDirectory(state.directory, path);
