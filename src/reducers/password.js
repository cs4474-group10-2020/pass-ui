import actionTypes from '../actions/actionTypes';

const DEFAULT_STATE = {
    data: null,
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PASSWORD_CONTENTS_SUCCESS:
            return {
                ...state,
                data: action.payload,
            };
        default:
            return state;
    }
};

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
