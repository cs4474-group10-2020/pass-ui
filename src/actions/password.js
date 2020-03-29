import { exec } from 'child_process';
import execa from 'execa';
import os from 'os';
import {
    concatPaths, getPasswordStorePath, getPasswordString, parsePassword, trimGPGExtension,
} from '../service';
import actionTypes from './actionTypes';
import { getDirectoryContents } from './directory';


// eslint-disable-next-line import/prefer-default-export
export const fetchPassword = (path) => (dispatch) => {
    const fullPath = trimGPGExtension(concatPaths(path));

    dispatch({
        type: actionTypes.FETCH_PASSWORD_CONTENTS_STARTED,
        payload: path,
    });
    return new Promise((resolutionFunc, rejectionFunc) => {
        exec(`pass "${fullPath}"`, (error, stdout, stderr) => {
            if (error || stderr) {
                dispatch({
                    type: actionTypes.FETCH_PASSWORD_CONTENTS_FAILURE,
                    payload: path,
                });
                rejectionFunc(error || stderr);
            } else {
                dispatch({
                    type: actionTypes.FETCH_PASSWORD_CONTENTS_SUCCESS,
                    payload: {
                        password: parsePassword(stdout),
                        path,
                    },
                });
                resolutionFunc();
            }
            dispatch({
                type: actionTypes.FETCH_PASSWORD_CONTENTS_ENDED,
                payload: path,
            });
        });
    });
};

export const createPassword = (path, password) => (dispatch) => {
    const fullPath = trimGPGExtension(concatPaths(path));

    dispatch({
        type: actionTypes.CREATE_PASSWORD_STARTED,
        payload: path,
    });
    return new Promise((resolutionFunc, rejectionFunc) => {
        execa(
            'pass',
            ['insert', fullPath, '--multiline'],
            {
                env: {
                    ...(process.env),
                    PASSWORD_STORE_DIR: getPasswordStorePath(),
                    HOME: os.homedir(),
                },
                input: getPasswordString(password),
                uid: process.geteuid(),
            },
        )
            .then((process) => {
                dispatch({
                    type: actionTypes.CREATE_PASSWORD_SUCCESS,
                    payload: process,
                });
                getDirectoryContents(path.slice(0, -1))(dispatch);
                resolutionFunc();
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.CREATE_PASSWORD_FAILURE,
                    payload: error,
                });
                rejectionFunc();
            })
            .finally(() => {
                dispatch({
                    type: actionTypes.CREATE_PASSWORD_ENDED,
                    payload: path,
                });
            });
    });
};