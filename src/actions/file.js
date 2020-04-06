import { exec } from 'child_process';
import { concatPaths } from '../service';
import actionTypes from './actionTypes';
import { refreshAllDirectoryContents } from './directory';
import { resetPasswordStore } from './sync';


// eslint-disable-next-line import/prefer-default-export
export const deleteFile = (path) => (dispatch, getState) => {
    const fullPath = concatPaths(path);

    dispatch({
        type: actionTypes.DELETE_FILE_STARTED,
        payload: path,
    });

    return new Promise((resolutionFunc, rejectionFunc) => {
        exec(`pass rm "${fullPath}" -r -f`, (error, stdout, stderr) => {
            if (error) {
                resetPasswordStore()(dispatch, getState).then(() => {
                    dispatch({
                        type: actionTypes.DELETE_FILE_FAILURE,
                        payload: path,
                    });
                    rejectionFunc(error || stderr);
                });
            } else {
                dispatch({
                    type: actionTypes.DELETE_FILE_SUCCESS,
                    payload: path,
                });
                resolutionFunc();
                refreshAllDirectoryContents()(dispatch, getState);
            }
            dispatch({
                type: actionTypes.DELETE_FILE_ENDED,
                payload: path,
            });
        });
    });
};

export const renameFile = (previousPath, newPath) => (dispatch, getState) => {
    const previousFullPath = concatPaths(previousPath);
    const newFullPath = concatPaths(newPath);

    dispatch({
        type: actionTypes.RENAME_FILE_STARTED,
        payload: {
            previousPath,
            newPath,
        },
    });

    return new Promise((resolutionFunc, rejectionFunc) => {
        exec(`pass mv "${previousFullPath}" "${newFullPath}" `, (error, stdout, stderr) => {
            if (error || stderr) {
                resetPasswordStore()(dispatch, getState).then(() => {
                    dispatch({
                        type: actionTypes.RENAME_FILE_FAILURE,
                        payload: {
                            previousPath,
                            newPath,
                        },
                    });
                    rejectionFunc(error || stderr);
                });
            } else {
                dispatch({
                    type: actionTypes.RENAME_FILE_SUCCESS,
                    payload: {
                        previousPath,
                        newPath,
                    },
                });
                resolutionFunc();
                refreshAllDirectoryContents()(dispatch, getState);
            }
            dispatch({
                type: actionTypes.RENAME_FILE_ENDED,
                payload: {
                    previousPath,
                    newPath,
                },
            });
        });
    });
};
