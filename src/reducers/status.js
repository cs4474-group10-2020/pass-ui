import actionTypes from '../actions/actionTypes';
import { concatPaths, STATUS_TYPES, trimGPGExtension } from '../service';

const DEFAULT_STATE = {
    loadingActions: {},
    lastError: {
        type: null,
        payload: null,
        message: '',
    },
};

const addLoadingAction = (action, state) => ({
    ...state,
    loadingActions: {
        ...state.loadingActions,
        [action]: true,
    },
});

const removeLoadingAction = (action, state) => ({
    ...state,
    loadingActions: {
        ...state.loadingActions,
        [action]: false,
    },
});

const addFailure = (type, payload, message, state) => ({
    ...state,
    lastError: {
        type,
        payload,
        message,
    },
});

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case actionTypes.DELETE_FILE_STARTED:
            return addLoadingAction(STATUS_TYPES.deleteFile, state);
        case actionTypes.DELETE_FILE_ENDED:
            return removeLoadingAction(STATUS_TYPES.deleteFile, state);
        case actionTypes.RENAME_FILE_STARTED:
            return addLoadingAction(STATUS_TYPES.renameFile, state);
        case actionTypes.RENAME_FILE_ENDED:
            return removeLoadingAction(STATUS_TYPES.renameFile, state);
        case actionTypes.FETCH_PASSWORD_CONTENTS_STARTED:
            return addLoadingAction(STATUS_TYPES.openPassword, state);
        case actionTypes.FETCH_PASSWORD_CONTENTS_ENDED:
            return removeLoadingAction(STATUS_TYPES.openPassword, state);
        case actionTypes.SYNC_PASSWORD_STORE_STARTED:
            return addLoadingAction(STATUS_TYPES.sync, state);
        case actionTypes.SYNC_PASSWORD_STORE_ENDED:
            return removeLoadingAction(STATUS_TYPES.sync, state);
        case actionTypes.SAVE_PASSWORD_STARTED:
            return addLoadingAction(STATUS_TYPES.savePassword, state);
        case actionTypes.SAVE_PASSWORD_ENDED:
            return removeLoadingAction(STATUS_TYPES.savePassword, state);
        case actionTypes.DELETE_FILE_SUCCESS:
        case actionTypes.RENAME_FILE_SUCCESS:
        case actionTypes.FETCH_PASSWORD_CONTENTS_SUCCESS:
        case actionTypes.SYNC_PASSWORD_STORE_SUCCESS:
        case actionTypes.SAVE_PASSWORD_SUCCESS:
        case actionTypes.HIDE_ERROR:
            return addFailure(null, action.payload, '', state);
        case actionTypes.DELETE_FILE_FAILURE:
            return addFailure(
                STATUS_TYPES.deleteFile,
                action.payload,
                `Could not delete ${concatPaths(action.payload)}.`,
                state,
            );
        case actionTypes.RENAME_FILE_FAILURE:
            return addFailure(
                STATUS_TYPES.renameFile,
                action.payload,
                `Could not rename ${concatPaths(action.payload.previousPath)} to ${concatPaths(action.payload.newPath)}.`,
                state,
            );
        case actionTypes.FETCH_PASSWORD_CONTENTS_FAILURE:
            return addFailure(
                STATUS_TYPES.openPassword,
                action.payload,
                `Could not open ${trimGPGExtension(concatPaths(action.payload))}.`,
                state,
            );
        case actionTypes.SYNC_PASSWORD_STORE_FAILURE:
            return addFailure(
                STATUS_TYPES.sync,
                action.payload,
                'Could not sync password store.',
                state,
            );
        case actionTypes.SAVE_PASSWORD_FAILURE:
            return addFailure(
                STATUS_TYPES.savePassword,
                action.payload,
                `Could not save ${concatPaths(action.payload.path)}.`,
                state,
            );
        default:
            return state;
    }
};

export const isLoading = (state) => Object.values(state.loadingActions).includes(true);

export const getLastError = (state) => state.lastError;
