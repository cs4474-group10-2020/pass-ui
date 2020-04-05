import actionTypes from '../actions/actionTypes';

const DEFAULT_STATE = {
    template: ['Username', 'Password', 'test1', 'test2', 'test3'],
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
