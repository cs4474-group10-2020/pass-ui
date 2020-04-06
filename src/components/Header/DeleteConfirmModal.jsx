import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const DeleteConfirmModal = ({
    contentToDelete, onConfirm, onHide, ...props
}) => (
    <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={onHide}
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Delete
                {` "${contentToDelete}"`}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure you want to delete
            {` "${contentToDelete}" `}
            ?
        </Modal.Body>
        <Modal.Footer>
            <div className="settings-modal-footer">
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
                <Button variant="danger" onClick={onConfirm}>Delete</Button>
            </div>
        </Modal.Footer>
    </Modal>
);

DeleteConfirmModal.propTypes = {
    contentToDelete: PropTypes.string,
    onConfirm: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
};

export default DeleteConfirmModal;
