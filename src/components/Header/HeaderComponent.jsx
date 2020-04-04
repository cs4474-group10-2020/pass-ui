import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSyncAlt, faPlus, faPencilAlt, faCog, faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import './HeaderComponent.scss';
import PropTypes from 'prop-types';
import { Button, Dropdown } from 'react-bootstrap';

const HeaderComponent = ({
    isDisabled, isSpinning, setShowModal,
}) => (
    <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto">
            <Dropdown className="button-of-header">
                <Dropdown.Toggle variant="success" disabled={isDisabled}>
                    <FontAwesomeIcon icon={faPlus} size="3x" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Directory</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Password</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Button className="button-of-header" disabled={isDisabled}>
                <FontAwesomeIcon icon={faPencilAlt} size="3x" />
            </Button>
            <Button className="button-of-header" disabled={isDisabled}>
                <FontAwesomeIcon icon={faSyncAlt} spin={isSpinning} size="3x" />
            </Button>
            <Button className="button-of-header" variant="danger" disabled={isDisabled}>
                <FontAwesomeIcon icon={faTrashAlt} size="3x" />
            </Button>
        </Nav>
        <Nav className="navbar-nav ml-auto">
            <Button className="button-of-header" disabled={isDisabled} onClick={() => setShowModal(true)}>
                <FontAwesomeIcon icon={faCog} size="3x" />
            </Button>
        </Nav>
    </Navbar>
);

HeaderComponent.propTypes = {
    isDisabled: PropTypes.bool.isRequired,
    isSpinning: PropTypes.bool.isRequired,
    setShowModal: PropTypes.func.isRequired,
};

export default HeaderComponent;
