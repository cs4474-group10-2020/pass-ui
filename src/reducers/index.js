import directoryReducer, * as directory from './directory';
import passwordReducer, * as password from './password';

export default {
    directory: directoryReducer,
    password: passwordReducer,
};

export const getDirectory = (state, path) => directory.getDirectory(state.directory, path);

export const isPasswordLoading = (state) => password.isLoading(state.password);

export const getPassword = (state) => password.getPassword(state.password);

export const getPasswordPath = (state) => password.getPasswordPath(state.password);
