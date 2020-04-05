import fs from 'fs';
import actionTypes from './actionTypes';
import { concatPaths, getPasswordStorePath } from '../service';
import { getAllDirectories } from '../reducers';

// eslint-disable-next-line import/prefer-default-export
export const getDirectoryContents = (dirs) => (dispatch) => {
    const fullPath = concatPaths([getPasswordStorePath(), ...dirs]);

    dispatch({
        type: actionTypes.FETCH_DIRECTORY_CONTENTS_STARTED,
        payload: dirs,
    });

    const filterDirectory = (file) => !['.gitattributes', '.gpg-id', '.git'].includes(file.name);

    fs.readdir(fullPath, { withFileTypes: true }, (err, files) => {
        if (err) {
            dispatch({
                type: actionTypes.FETCH_DIRECTORY_CONTENTS_FAILURE,
                payload: err.message,
            });
            // refresh the tree
            if (dirs.length > 1) {
                getDirectoryContents(dirs.slice(0, -1))(dispatch);
            }
        } else {
            const directoryChildren = {
                files: files.filter(filterDirectory).filter((file) => file.isFile()).map((file) => file.name),
                directories: files.filter(filterDirectory).filter((file) => file.isDirectory()).map((file) => file.name),
            };

            dispatch({
                type: actionTypes.FETCH_DIRECTORY_CONTENTS_SUCCESS,
                payload: {
                    path: dirs,
                    directoryChildren,
                },
            });
        }

        dispatch({
            type: actionTypes.FETCH_DIRECTORY_CONTENTS_ENDED,
            payload: dirs,
        });
    });
};

export const createDirectory = (path) => (dispatch) => {
    const fullPath = concatPaths([getPasswordStorePath(), ...path]);

    dispatch({
        type: actionTypes.CREATE_DIRECTORY_STARTED,
        payload: path,
    });

    fs.mkdir(fullPath, (err) => {
        if (err) {
            dispatch({
                type: actionTypes.CREATE_DIRECTORY_FAILURE,
                payload: err.message,
            });
        } else {
            dispatch({
                type: actionTypes.CREATE_DIRECTORY_SUCCESS,
                payload: path,
            });
            getDirectoryContents(path.slice(0, -1))(dispatch);
        }
        dispatch({
            type: actionTypes.CREATE_DIRECTORY_ENDED,
            payload: path,
        });
    });
};

export const refreshAllDirectoryContents = () => (dispatch, getState) => {
    getAllDirectories(getState()).forEach((directoryPath) => getDirectoryContents(directoryPath)(dispatch));
};
