import actionTypes from './actionTypes';


// eslint-disable-next-line import/prefer-default-export
export const hideError = () => (dispatch) => {
    dispatch({
        type: actionTypes.HIDE_ERROR,
    });
};
