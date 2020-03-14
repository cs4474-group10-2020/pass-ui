import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';
import './File.scss';
import { trimGPGExtension } from '../../service';

const File = ({ path, onOpen }) => {
    const fileName = path[path.length - 1];

    return (
        <ListGroup.Item className="file" onClick={() => onOpen(path)}>
            <FontAwesomeIcon icon={faKey} size="lg" />
            <h3 className="file-name">{trimGPGExtension(fileName)}</h3>
        </ListGroup.Item>
    );
};

File.propTypes = {
    path: PropTypes.arrayOf(PropTypes.string).isRequired,
    onOpen: PropTypes.func.isRequired,
};

export default File;
