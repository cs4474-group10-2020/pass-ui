import fs from 'fs';
import actionTypes from './actionTypes';
import { concatPaths, getPasswordStorePath } from '../service';

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
