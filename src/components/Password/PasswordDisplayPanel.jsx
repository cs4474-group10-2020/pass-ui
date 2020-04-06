import { Button, Card, ListGroup } from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { concatPaths, trimGPGExtension } from '../../service';
import './PasswordDisplayPanel.scss';
import ClipboardButton from './ClipboardButton';

const PasswordDisplayPanel = ({ password, path, onEdit }) => (
    <Card className="password-display-panel">
        <Card.Header>
            <Button className="edit-button" onClick={onEdit}>
                <FontAwesomeIcon icon={faPencilAlt} />
            </Button>
            {trimGPGExtension(concatPaths(path))}
        </Card.Header>
        <ListGroup variant="flush">
            <ListGroup.Item>
                {`Password: ${password.password}`}
                <ClipboardButton text={password.password} />
            </ListGroup.Item>
            {password.fields.map(({ key, value }) => (
                <ListGroup.Item key={key}>
                    {`${key}: ${value}`}
                    <ClipboardButton text={password.password} />
                </ListGroup.Item>
            ))}
        </ListGroup>
    </Card>
);

PasswordDisplayPanel.propTypes = {
    password: PropTypes.shape({
        password: PropTypes.string.isRequired,
        fields: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })).isRequired,
    }).isRequired,
    path: PropTypes.arrayOf(PropTypes.string).isRequired,
    onEdit: PropTypes.func.isRequired,
};

export default PasswordDisplayPanel;
