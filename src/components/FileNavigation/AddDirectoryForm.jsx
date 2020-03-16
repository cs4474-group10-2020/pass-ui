import {
    Button, FormControl, InputGroup, ListGroup,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import PropTypes from 'prop-types';


const AddDirectoryForm = ({ onSubmit, onCancel }) => {
    const [name, setName] = useState('');
    return (
        <ListGroup.Item>
            <div className="directory-name">
                <InputGroup className="mb-3">
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
                            variant="outline-danger"
                            onClick={() => onCancel()}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        </ListGroup.Item>
    );
};

AddDirectoryForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default AddDirectoryForm;
