import { Modal } from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';
import TextError from './TextError';
import './ErrorPopup.scss';
import { STATUS_TYPES } from '../../service';
import SaveError from '../../containers/Error/SaveError';


const ErrorPopup = ({ lastError, onClose }) => (
    <Modal show={lastError.type !== null} onHide={onClose} centered dialogClassName="error-popup text-white">
        <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        {lastError.type !== STATUS_TYPES.savePassword && (<TextError lastError={lastError} />)}
        {lastError.type === STATUS_TYPES.savePassword && (<SaveError lastError={lastError} />)}
    </Modal>
);

ErrorPopup.propTypes = {
    lastError: PropTypes.shape({
        type: PropTypes.string,
        payload: PropTypes.any,
        message: PropTypes.string.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ErrorPopup;
