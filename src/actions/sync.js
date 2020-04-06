import { exec } from 'child_process';
import actionTypes from './actionTypes';
import { refreshAllDirectoryContents } from './directory';

// eslint-disable-next-line import/prefer-default-export
export const resetPasswordStore = () => (dispatch, getState) => new Promise((resolutionFunc) => {
    exec('pass git reset HEAD --hard', () => {
        refreshAllDirectoryContents()(dispatch, getState);
        resolutionFunc();
    });
});

export const syncPasswordStore = () => (dispatch, getState) => {
    dispatch({
        type: actionTypes.SYNC_PASSWORD_STORE_STARTED,
    });

    return new Promise((resolutionFunc, rejectionFunc) => {
        exec('pass git pull', (error, stdout, stderr) => {
            if (error) {
                resetPasswordStore()(dispatch, getState).then(() => {
                    dispatch({
                        type: actionTypes.SYNC_PASSWORD_STORE_FAILURE,
                    });
                    rejectionFunc(error || stderr);
                    dispatch({
                        type: actionTypes.SYNC_PASSWORD_STORE_ENDED,
                    });
                });
            } else {
                dispatch({
                    type: actionTypes.SYNC_PASSWORD_STORE_SUCCESS,
                });
                resolutionFunc();
                refreshAllDirectoryContents()(dispatch, getState);
                dispatch({
                    type: actionTypes.SYNC_PASSWORD_STORE_ENDED,
                });
            }
        });
    });
};
