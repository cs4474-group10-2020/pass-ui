import actionTypes from './actionTypes';

// eslint-disable-next-line import/prefer-default-export
export const updateTemplate = (template) => async (dispatch) => {
    dispatch({
        type: actionTypes.UPDATE_TEMPLATE,
        payload: template,
    });
};
