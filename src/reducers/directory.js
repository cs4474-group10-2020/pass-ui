import actionTypes from '../actions/actionTypes';
import { concatPaths } from '../service';

const DEFAULT_STATE = {
    data: {
        store: {},
        loadingPaths: [],
    },
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case actionTypes.FETCH_DIRECTORY_CONTENTS_STARTED:
            return {
                ...state,
                data: {
                    ...state.data,
                    loadingPaths: [
                        ...state.data.loadingPaths,
                        concatPaths(action.payload),
                    ],
                },
            };
        case actionTypes.FETCH_DIRECTORY_CONTENTS_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    store: {
                        ...state.data.store,
                        [concatPaths(action.payload.path)]: action.payload.directoryChildren,
                    },
                },
            };
        case actionTypes.FETCH_DIRECTORY_CONTENTS_ENDED:
            return {
                ...state,
                data: {
                    ...state.data,
                    loadingPaths: state.data.loadingPaths.filter((currentPath) => currentPath !== concatPaths(action.payload)),
                },
            };
        default:
            return state;
    }
};


export const getDirectory = (state, path) => state.data.store[concatPaths(path)];
