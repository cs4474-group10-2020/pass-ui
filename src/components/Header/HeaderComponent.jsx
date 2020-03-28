import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsPencil } from 'react-icons/bs';
import { FaSyncAlt, FaCog } from 'react-icons/fa';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './HeaderComponent.scss';
import PropTypes from 'prop-types';

const HeaderComponent = ({
    isDisabled, syncText, isSpinning, setShowModal,
}) => {
    const navDropdownTitle = (<AiOutlinePlus size={45} />);


    return (
        <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
                <NavDropdown id="basic-nva-dropdown" title={navDropdownTitle} disabled={isDisabled}>
                    <NavDropdown.Item href="#action/3.1">Directory</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Password</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link className="edit" onSelect={() => setShowModal(true)} disabled={isDisabled}>
                    <BsPencil size={45} />
                </Nav.Link>
                <Nav.Link className="synchronize" disabled={isDisabled}>
                    <FaSyncAlt size={45} spin={isSpinning} />
                </Nav.Link>
                <Navbar.Text>{syncText}</Navbar.Text>
            </Nav>
            <Nav className="navbar-nav ml-auto">
                <Nav.Link href="#settings" disabled={isDisabled} >
                    <FaCog size={45} />
                </Nav.Link>
            </Nav>
        </Navbar>
    );
};

HeaderComponent.propTypes = {
    isDisabled: PropTypes.bool.isRequired,
    syncText: PropTypes.string.isRequired,
    isSpinning: PropTypes.bool.isRequired,
    setShowModal: PropTypes.func.isRequired,
};

export default HeaderComponent;
