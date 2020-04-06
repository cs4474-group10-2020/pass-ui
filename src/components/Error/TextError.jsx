import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';


const TextError = ({ lastError }) => (
    <Modal.Body>{lastError.message}</Modal.Body>
);

TextError.propTypes = {
    lastError: PropTypes.shape({
        type: PropTypes.string,
        payload: PropTypes.any,
        message: PropTypes.string.isRequired,
    }).isRequired,
};

export default TextError;
