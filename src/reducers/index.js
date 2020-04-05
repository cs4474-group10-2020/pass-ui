import directoryReducer, * as directory from './directory';
import passwordReducer, * as password from './password';
import settingsReducer, * as settings from './settings';

export default {
    directory: directoryReducer,
    settings: settingsReducer,
    password: passwordReducer,
};

export const getDirectory = (state, path) => directory.getDirectory(state.directory, path);

export const getAllDirectories = (state) => directory.getAllDirectories(state.directory);

export const isPasswordLoading = (state) => password.isLoading(state.password);

export const getPassword = (state) => password.getPassword(state.password);

export const getPasswordPath = (state) => password.getPasswordPath(state.password);

export const getTemplate = (state) => settings.getTemplate(state.settings);
