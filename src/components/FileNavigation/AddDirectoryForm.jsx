import {
    Button, FormControl, InputGroup,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AddDirectoryForm.scss';


const AddDirectoryForm = ({ onSubmit, onCancel, initialValue }) => {
    const [name, setName] = useState(initialValue);
    return (
        <InputGroup className="add-directory-form">
            <FormControl
                as="input"
                value={name}
                onChange={(event) => setName(event.target.value)}
                onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                        onSubmit(name);
                    }
                }}
            />
            <InputGroup.Append>
                <Button
                    variant="outline-success"
                    onClick={() => onSubmit(name)}
                >
                    <FontAwesomeIcon icon={faCheck} />
                </Button>
                <Button
                    variant="outline-danger"
                    onClick={() => onCancel()}
                >
                    <FontAwesomeIcon icon={faTimes} />
                </Button>
            </InputGroup.Append>
        </InputGroup>
    );
};

AddDirectoryForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    initialValue: PropTypes.string,
};

AddDirectoryForm.defaultProps = {
    initialValue: '',
};

export default AddDirectoryForm;
