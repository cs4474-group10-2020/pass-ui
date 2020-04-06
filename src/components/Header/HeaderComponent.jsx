import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSyncAlt, faPlus, faPencilAlt, faCog, faTrashAlt, faSpinner, faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import './HeaderComponent.scss';
import PropTypes from 'prop-types';
import {
    Button, Dropdown, OverlayTrigger, Tooltip,
} from 'react-bootstrap';
import { ITEM_TYPES, trimGPGExtension } from '../../service';

const HeaderComponent = ({
    selectedItemType, selectedItemPath, canEditSelectedItem, isLoading, setShowModal,
    onCreatePassword, onEditPassword, onDelete, onAddDirectory, onSync, lastError,
}) => (
    <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto">
            <Dropdown className="header-item">
                <Dropdown.Toggle disabled={selectedItemType !== ITEM_TYPES.directory}>
                    <FontAwesomeIcon icon={faPlus} size="3x" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => onAddDirectory(selectedItemPath)}>Folder</Dropdown.Item>
                    <Dropdown.Item onClick={() => onCreatePassword(selectedItemPath)}>Password</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Button className="header-item" disabled={selectedItemType !== ITEM_TYPES.file} onClick={() => onEditPassword(selectedItemPath)}>
                <FontAwesomeIcon icon={faPencilAlt} size="3x" />
            </Button>
            <Button
                className="header-item"
                variant="danger"
                disabled={selectedItemType === ITEM_TYPES.none || !canEditSelectedItem}
                onClick={() => {
                    if (selectedItemType === ITEM_TYPES.directory) {
                        onDelete(selectedItemPath);
                    } else {
                        onDelete([...selectedItemPath.slice(0, -1), trimGPGExtension(selectedItemPath[selectedItemPath.length - 1])]);
                    }
                }}
            >
                <FontAwesomeIcon icon={faTrashAlt} size="3x" />
            </Button>
            <Button variant="success" className="header-item" onClick={() => onSync()}>
                <FontAwesomeIcon icon={faSyncAlt} size="3x" />
            </Button>
            {(isLoading && (
                <FontAwesomeIcon className="header-item" icon={faSpinner} size="3x" spin color="white" />
            )) || (lastError.type !== null && (
                <OverlayTrigger
                    placement="bottom"
                    overlay={(
                        <Tooltip id="header-error-message-tooltip">{lastError.message}</Tooltip>
                    )}
                >
                    <FontAwesomeIcon className="header-item" icon={faExclamationTriangle} size="3x" color="white" />
                </OverlayTrigger>

            ))}

        </Nav>
        <Nav className="navbar-nav ml-auto">
            <Button variant="secondary" className="header-item" onClick={() => setShowModal(true)}>
                <FontAwesomeIcon icon={faCog} size="3x" />
            </Button>
        </Nav>
    </Navbar>
);

HeaderComponent.propTypes = {
    selectedItemType: PropTypes.oneOf(Object.values(ITEM_TYPES)).isRequired,
    selectedItemPath: PropTypes.arrayOf(PropTypes.string).isRequired,
    canEditSelectedItem: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    setShowModal: PropTypes.func.isRequired,
    onCreatePassword: PropTypes.func.isRequired,
    onEditPassword: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onAddDirectory: PropTypes.func.isRequired,
    onSync: PropTypes.func.isRequired,
    lastError: PropTypes.shape({
        type: PropTypes.string,
        payload: PropTypes.any,
        message: PropTypes.string.isRequired,
    }).isRequired,
};

export default HeaderComponent;
