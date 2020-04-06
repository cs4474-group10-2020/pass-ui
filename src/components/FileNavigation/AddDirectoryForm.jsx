import {
    Button, FormControl, InputGroup,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AddDirectoryForm.scss';
import { isFileNameValid } from '../../service';


const AddDirectoryForm = ({ onSubmit, onCancel, initialValue }) => {
    const [name, setName] = useState(initialValue);
    const isValid = isFileNameValid(name);
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
                isInvalid={!isValid}
            />
            <InputGroup.Append>
                <Button
                    disabled={!isValid}
                    variant="outline-success"
                    onClick={() => onSubmit(name)}
                >
                    <FontAwesomeIcon icon={faCheck} />
                </Button>
                <Button
                    variant="outline-secondary"
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
