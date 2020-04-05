/* eslint-disable react/no-array-index-key */
import {
    Button, Card, FormControl, InputGroup, ListGroup,
} from 'react-bootstrap';
import React, { useState } from 'react';
import { faBars, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { concatPaths, trimGPGExtension } from '../../service';
import './PasswordEditPanel.scss';

const PasswordEditPanel = ({
    password, path, fileName, onSave, onClose, editFileName,
}) => {
    const [currentPassword, setCurrentPassword] = useState(password.password);
    const [fields, setFields] = useState(password.fields);
    const [currentFileName, setCurrentFileName] = useState(fileName);
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

        const newFields = fields.slice();
        const movedInput = fields[dragIndex];

        if (dragIndex !== targetIndex) {
            const insertIndex = targetIndex > dragIndex ? targetIndex + 1 : targetIndex;
            newFields.splice(insertIndex, 0, movedInput);
            const deleteIndex = targetIndex > dragIndex ? dragIndex : dragIndex + 1;
            newFields.splice(deleteIndex, 1);

            setFields(newFields);
        }

        setDragIndex(null);
    };

    return (
        <Card className="password-display-panel">
            <Card.Header>
                {editFileName ? (
                    <>
                        {trimGPGExtension(concatPaths(path))}
                        <FormControl
                            placeholder="Name"
                            aria-label="Name"
                            value={currentFileName}
                            onChange={(changeEvent) => setCurrentFileName(changeEvent.target.value)}
                        />
                    </>
                ) : (
                    <>
                        {trimGPGExtension(concatPaths([...path, currentFileName]))}
                    </>
                ) }
            </Card.Header>
            <ListGroup variant="flush" className="field-group">
                <ListGroup.Item>
                    <FormControl
                        placeholder="Password"
                        aria-label="Password"
                        value={currentPassword}
                        onChange={(changeEvent) => setCurrentPassword(changeEvent.target.value)}
                    />
                </ListGroup.Item>
                <ListGroup.Item>
                    {fields.map(({ key, value }, index) => (
                        <div
                            key={index}
                            className="password-field"
                            draggable
                            onDragStart={(event) => startDrag(event, index)}
                            onDrop={(event) => dropDrag(event, index)}
                            onDragOver={allowDrag}
                        >
                            <FontAwesomeIcon className="field-drag-icon" icon={faBars} size="1x" />
                            <InputGroup draggable onDragStart={preventDrag}>
                                <FormControl
                                    placeholder="Field name"
                                    aria-label="Field name"
                                    value={key}
                                    onChange={(changeEvent) => setFields(fields.map((field, fieldIndex) => {
                                        if (index !== fieldIndex) {
                                            return field;
                                        }
                                        return {
                                            key: changeEvent.target.value,
                                            value,
                                        };
                                    }))}
                                />
                                <FormControl
                                    placeholder="Value"
                                    aria-label="Value"
                                    value={value}
                                    onChange={(changeEvent) => setFields(fields.map((field, fieldIndex) => {
                                        if (index !== fieldIndex) {
                                            return field;
                                        }
                                        return {
                                            key,
                                            value: changeEvent.target.value,
                                        };
                                    }))}
                                />
                                <InputGroup.Append>
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => {
                                            setFields(fields.filter((field, fieldIndex) => fieldIndex !== index));
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>

                        </div>
                    ))}
                </ListGroup.Item>
                <Button className="password-edit-panel-button" variant="primary" onClick={() => setFields([...fields, { key: '', value: '' }])}>
                    <FontAwesomeIcon icon={faPlus} />
                </Button>
            </ListGroup>
            <div className="button-group">
                <Button className="password-edit-panel-button cancel-button" variant="secondary" onClick={onClose}>Cancel</Button>
                <Button
                    className="password-edit-panel-button accept-button"
                    variant="success"
                    onClick={() => {
                        onSave(
                            [...path, currentFileName],
                            ({
                                password: currentPassword,
                                fields,
                            }),
                        );
                        onClose();
                    }}
                >
                    Save
                </Button>
            </div>
        </Card>
    );
};

PasswordEditPanel.propTypes = {
    password: PropTypes.shape({
        password: PropTypes.string.isRequired,
        fields: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })).isRequired,
    }).isRequired,
    path: PropTypes.arrayOf(PropTypes.string).isRequired,
    fileName: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    editFileName: PropTypes.bool.isRequired,
};

export default PasswordEditPanel;
