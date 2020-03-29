import {
    Button, Card, FormControl, InputGroup, ListGroup,
} from 'react-bootstrap';
import React, { useState } from 'react';
import { faCheck, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { concatPaths, trimGPGExtension } from '../../service';
import './PasswordEditPanel.scss';

const PasswordEditPanel = ({
    password, path, fileName, onSave, onClose,
}) => {
    const [currentPassword, setCurrentPassword] = useState(password.password);
    const [fields, setFields] = useState(Object.entries(password.fields));
    const [currentFileName, setCurrentFileName] = useState(fileName);

    return (
        <Card className="password-display-panel">
            <Card.Header>
                {trimGPGExtension(concatPaths(path))}
                <FormControl
                    placeholder="Name"
                    aria-label="Name"
                    value={currentFileName}
                    onChange={(changeEvent) => setCurrentFileName(changeEvent.target.value)}
                />
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
                {fields.map(({ key, value }, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <ListGroup.Item key={index}>
                        <InputGroup>
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
                                    <FontAwesomeIcon icon={faTimes} />
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>

                    </ListGroup.Item>
                ))}
            </ListGroup>

            <Button className="password-edit-panel-button" variant="primary" onClick={() => setFields([...fields, { key: '', value: '' }])}>
                <FontAwesomeIcon icon={faPlus} />
            </Button>
            <Button
                className="password-edit-panel-button"
                variant="success"
                onClick={() => {
                    onSave(
                        [...path, currentFileName],
                        ({
                            password: currentPassword,
                            fields: fields.reduce((accumulator, { key, value }) => ({
                                ...accumulator,
                                [key]: value,
                            }), {}),
                        }),
                    );
                    onClose();
                }}
            >
                <FontAwesomeIcon icon={faCheck} />
            </Button>
        </Card>
    );
};

PasswordEditPanel.propTypes = {
    password: PropTypes.shape({
        password: PropTypes.string.isRequired,
        fields: PropTypes.objectOf(PropTypes.string).isRequired,
    }).isRequired,
    path: PropTypes.arrayOf(PropTypes.string).isRequired,
    fileName: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default PasswordEditPanel;
