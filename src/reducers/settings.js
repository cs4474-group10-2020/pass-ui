import actionTypes from '../actions/actionTypes';

const DEFAULT_STATE = {
    template: ['Username'],
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_TEMPLATE:
            return {
                ...state,
                template: action.payload,
            };
        default:
            return state;
    }
};

export const getTemplate = (state) => state.template;
