/* eslint-disable react/no-array-index-key */
import {
    Accordion, Button, Card, Col, Form, FormControl, InputGroup, ListGroup,
} from 'react-bootstrap';
import React, { useState } from 'react';
import {
    faBars, faCog, faDice, faPlus, faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import {
    concatPaths, generatePassword, isFileNameValid, isPasswordValid, trimGPGExtension, validPasswordFieldValue,
} from '../../service';
import './PasswordEditPanel.scss';
import PasswordStrengthBar from './PasswordStrengthBar';

const PasswordEditPanel = ({
    password, path, fileName, onSave, onClose, editFileName,
}) => {
    const [currentPassword, setCurrentPassword] = useState(password.password);
    const [fields, setFields] = useState(password.fields);
    const [currentFileName, setCurrentFileName] = useState(fileName);
    const [dragIndex, setDragIndex] = useState(null);
    const [displayGenerationSettings, setDisplayGenerationSettings] = useState(false);
    const [passwordLength, setPasswordLength] = useState(12);
    const [includeSpecialCharacters, setIncludeSpecialCharacters] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);

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

    const createNewPassword = () => ({
        password: currentPassword,
        fields,
    });
    return (
        <Card className="password-display-panel">
            <Card.Header className="password-display-panel-header">
                {editFileName ? (
                    <>
                        {trimGPGExtension(concatPaths(path))}
                        <FormControl
                            isInvalid={!isFileNameValid(currentFileName)}
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
                <ListGroup.Item className="password-display-panel-header">
                    <InputGroup>
                        <FormControl
                            isInvalid={currentPassword === ''}
                            placeholder="Password"
                            aria-label="Password"
                            value={currentPassword}
                            onChange={(changeEvent) => setCurrentPassword(changeEvent.target.value)}
                        />
                        <InputGroup.Append>
                            <Button
                                variant="outline-primary"
                                onClick={() => setCurrentPassword(generatePassword(passwordLength, includeNumbers, includeSpecialCharacters))}
                            >
                                <FontAwesomeIcon icon={faDice} />
                            </Button>
                            <Button variant="outline-secondary" onClick={() => setDisplayGenerationSettings(!displayGenerationSettings)}>
                                <FontAwesomeIcon icon={faCog} />
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>

                    <PasswordStrengthBar password={currentPassword} />

                    <Accordion activeKey={displayGenerationSettings ? '0' : null}>
                        <Accordion.Collapse eventKey="0">
                            <Form className="password-generation-form">
                                <Form.Row>
                                    <Form.Group md="6" as={Col} className="password-length-field password-generation-form-col">
                                        <Form.Label>
                                            Password Length
                                        </Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={passwordLength}
                                            onChange={(changeEvent) => setPasswordLength(changeEvent.target.value)}
                                        />
                                    </Form.Group>
                                    <Col className="password-generation-form-col">
                                        <Form.Check
                                            checked={includeNumbers}
                                            onChange={(changeEvent) => setIncludeNumbers(changeEvent.target.checked)}
                                            inline
                                            type="checkbox"
                                            label="Numbers"
                                        />
                                    </Col>
                                    <Col className="password-generation-form-col">
                                        <Form.Check
                                            checked={includeSpecialCharacters}
                                            onChange={(changeEvent) => setIncludeSpecialCharacters(changeEvent.target.checked)}
                                            inline
                                            type="checkbox"
                                            label="Special Characters"
                                        />
                                    </Col>
                                </Form.Row>
                            </Form>
                        </Accordion.Collapse>
                    </Accordion>
                </ListGroup.Item>
                <ListGroup.Item className="password-field-list">
                    {fields.map(({ key, value }, index) => (
                        <div
                            key={index}
                            className="password-field"
                            draggable
                            onDragStart={(event) => startDrag(event, index)}
                            onDrop={(event) => dropDrag(event, index)}
                            onDragOver={allowDrag}
                            style={{ backgroundColor: dragIndex === index ? '#e6e6e6' : null }}
                        >
                            <FontAwesomeIcon className="field-drag-icon" icon={faBars} size="1x" />
                            <InputGroup draggable onDragStart={preventDrag}>
                                <FormControl
                                    isInvalid={!validPasswordFieldValue(key)}
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
                                    isInvalid={!validPasswordFieldValue(value)}
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
                    disabled={!isPasswordValid(currentFileName, createNewPassword())}
                    onClick={() => {
                        onSave(
                            [...path, currentFileName],
                            createNewPassword(),
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
