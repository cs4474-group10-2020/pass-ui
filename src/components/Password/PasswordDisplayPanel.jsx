import { Card, ListGroup } from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';
import { concatPaths, trimGPGExtension } from '../../service';
import './PasswordDisplayPanel.scss';
import ClipboardButton from './ClipboardButton';

const PasswordDisplayPanel = ({ password, path }) => (
    <Card className="password-display-panel">
        <Card.Header>{trimGPGExtension(concatPaths(path))}</Card.Header>
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
};

export default PasswordDisplayPanel;
