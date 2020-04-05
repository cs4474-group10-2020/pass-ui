import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Button, Form, FormControl, InputGroup,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './TemplateSetting.scss';

const TemplateSetting = ({
    template, setTemplate,
}) => {
    const [dragIndex, setDragIndex] = useState(null);

    const preventDrag = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const allowDrag = (event) => {
        event.preventDefault();
    };

    const startDrag = (event, fieldIndex) => {
        setDragIndex(fieldIndex);
    };

    const dropDrag = (event, targetIndex) => {
        event.preventDefault();

        const newTemplate = template.slice();
        const movedInput = template[dragIndex];

        if (dragIndex !== targetIndex) {
            const insertIndex = targetIndex > dragIndex ? targetIndex + 1 : targetIndex;
            newTemplate.splice(insertIndex, 0, movedInput);
            const deleteIndex = targetIndex > dragIndex ? dragIndex : dragIndex + 1;
            newTemplate.splice(deleteIndex, 1);

            setTemplate(newTemplate);
        }

        setDragIndex(null);
    };

    const addField = () => {
        const newTemplate = template.slice();
        newTemplate.push('');
        setTemplate(newTemplate);
    };

    const removeField = (fieldIndex) => {
        const newTemplate = template.slice();
        newTemplate.splice(fieldIndex, 1);
        setTemplate(newTemplate);
    };

    const updateField = (event, fieldIndex) => {
        const newTemplate = template.slice();
        newTemplate[fieldIndex] = event.target.value;
        setTemplate(newTemplate);
    };

    const renderTemplateField = (input, index) => (
        <div
            draggable
            onDragStart={(event) => startDrag(event, index)}
            onDrop={(event) => dropDrag(event, index)}
            onDragOver={allowDrag}
            className="settings-template-field"
            style={{ backgroundColor: dragIndex === index ? '#e6e6e6' : null }}
            key={index}
        >
            <div className="settings-template-field-icon">
                <FontAwesomeIcon icon={faBars} size="1x" />
            </div>
            <div className="settings-template-field-group" draggable onDragStart={preventDrag}>
                <InputGroup>
                    <FormControl
                        placeholder="Field Name"
                        value={input}
                        onChange={(event) => updateField(event, index)}
                    />
                    <InputGroup.Append>
                        <Button variant="outline-danger" onClick={() => removeField(index)}>
                            <FontAwesomeIcon icon={faTrashAlt} size="1x" />
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        </div>
    );

    return (
        <div>
            <h5>Default Template</h5>
            <Form>
                <div className="settings-template">
                    {template.map(renderTemplateField)}

                    <div className="settings-template-field-add-button-wrapper">
                        <Button className="settings-template-field-add-button" variant="primary" onClick={addField}>
                            <FontAwesomeIcon icon={faPlus} size="1x" />
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    );
};

TemplateSetting.propTypes = {
    template: PropTypes.arrayOf(PropTypes.string).isRequired,
    setTemplate: PropTypes.func.isRequired,
};

export default TemplateSetting;
