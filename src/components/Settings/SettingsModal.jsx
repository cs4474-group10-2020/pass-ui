import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import TemplateSetting from './TemplateSetting';
import './SettingsModal.scss';

const SettingsModal = ({
    template, setTemplate, onHide, ...props
}) => {
    const [draftTemplate, setDraftTemplate] = useState(template);
    const [isTemplateValid, setTemplateValid] = useState(true);

    const discardAndHide = () => {
        setDraftTemplate(template);
        onHide();
    };

    const saveAndHide = () => {
        if (isTemplateValid) {
            setTemplate(draftTemplate);
            onHide();
        }
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={discardAndHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Settings
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TemplateSetting template={draftTemplate} setTemplate={setDraftTemplate} setTemplateValid={setTemplateValid} />
            </Modal.Body>
            <Modal.Footer>
                <div className="settings-modal-footer">
                    <Button variant="outline-danger" onClick={discardAndHide}>Cancel</Button>
                    <Button variant="success" onClick={saveAndHide}>Save</Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

SettingsModal.propTypes = {
    template: PropTypes.arrayOf(PropTypes.string).isRequired,
    setTemplate: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
};

export default SettingsModal;
