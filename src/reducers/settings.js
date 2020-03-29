import actionTypes from '../actions/actionTypes';

const DEFAULT_STATE = {
    data: {
        template: ['username', 'password'],
    },
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_TEMPLATE:
            return {
                ...state,
                data: {
                    ...state.data,
                    template: action.payload,
                },
            };
        default:
            return state;
    }
};
