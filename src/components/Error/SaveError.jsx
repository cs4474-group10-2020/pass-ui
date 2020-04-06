import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';


const SaveError = ({ lastError, onFix }) => (
    <>
        <Modal.Body>{lastError.message}</Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={() => onFix(lastError.payload.path, lastError.payload.password)}>
                Save Changes
            </Button>
        </Modal.Footer>
    </>
);

SaveError.propTypes = {
    lastError: PropTypes.shape({
        type: PropTypes.string,
        payload: PropTypes.shape({
            path: PropTypes.arrayOf(PropTypes.string),
            password: PropTypes.shape({
                password: PropTypes.string.isRequired,
                fields: PropTypes.arrayOf(PropTypes.shape({
                    key: PropTypes.string.isRequired,
                    value: PropTypes.string.isRequired,
                })).isRequired,
            }).isRequired,
        }),
        message: PropTypes.string.isRequired,
    }).isRequired,
    onFix: PropTypes.func.isRequired,
};

export default SaveError;
