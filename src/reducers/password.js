import actionTypes from '../actions/actionTypes';

const DEFAULT_STATE = {
    data: null,
    isLoading: false,
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PASSWORD_CONTENTS_STARTED:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.FETCH_PASSWORD_CONTENTS_SUCCESS:
            return {
                ...state,
                data: action.payload,
            };
        case actionTypes.FETCH_PASSWORD_CONTENTS_ENDED:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};

export const isLoading = (state) => state.isLoading;

export const getPassword = (state) => {
    if (state.data) {
        return state.data.password;
    }
    return null;
};

export const getPasswordPath = (state) => {
    if (state.data) {
        return state.data.path;
    }
    return null;
};
