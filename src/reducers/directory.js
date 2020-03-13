import path from 'path';
import actionTypes from '../actions/actionTypes';

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
                        path.join(...(action.payload)),
                    ],
                },
            };
        case actionTypes.FETCH_DIRECTORY_CONTENTS_SUCCESS:
            return {
                ...state,
                data: {
                    store: {
                        ...state.data.store,
                        [path.join(...(action.payload.path))]: action.payload.directoryChildren,
                    },
                },
            };
        case actionTypes.FETCH_DIRECTORY_CONTENTS_ENDED:
            return {
                ...state,
                data: {
                    ...state.data,
                    loadingPaths: state.data.loadingPaths.filter((currentPath) => currentPath !== path.join(...(action.payload))),
                },
            };
        default:
            return state;
    }
};
