import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DirectoryViewPanel from './FileNavigation/DirectoryViewPanel';
import HeaderComponent from './Header/HeaderComponent';
import VerticalModal from './VerticalModal/VerticalModal';
import './Layout.scss';
import { concatPaths, ITEM_TYPES, MODES } from '../service';
import PasswordDisplayPanel from '../containers/Password/PasswordDisplayPanel';
import PasswordCreatePanel from '../containers/Password/PasswordCreatePanel';
import PasswordEditPanel from '../containers/Password/PasswordEditPanel';

const Layout = ({ getPassword }) => {
    const [fileOpen, setFileOpen] = useState(null);
    const [selectedItemPath, setSelectedItemPath] = useState('');
    const [selectedItemType, setSelectedItemType] = useState(ITEM_TYPES.none);
    const [mode, setMode] = useState(MODES.none);
    const [isDisabled, toggleDisabled] = useState(true);
    const [isSpinning, toggleSpin] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const onSelectItem = (path, type) => {
        setSelectedItemPath(concatPaths(path));
        setSelectedItemType(type);
    };

    const onClose = () => {
        setMode(MODES.none);
        setFileOpen(null);
    };

    const onFileOpen = (path) => {
        setMode(MODES.view);
        if (path) {
            getPassword(path).then(() => setFileOpen(path));
        } else {
            setFileOpen(path);
        }
    };

    const onCreatePassword = (path) => {
        setMode(MODES.create);
        setFileOpen(path);
    };

    const onEditPassword = (path) => {
        setMode(MODES.edit);
        getPassword(path).then(() => setFileOpen(path));
    };

    return (
        <div>
            <div className="header">
                <HeaderComponent isDisabled={isDisabled} isSpinning={isSpinning} setShowModal={setShowModal} />
            </div>
            <div className="layout">
                <DirectoryViewPanel
                    selectedItemPath={selectedItemPath}
                    onFileOpen={onFileOpen}
                    onSelectItem={onSelectItem}
                    onCreatePassword={onCreatePassword}
                    onEditPassword={onEditPassword}
                />
                {fileOpen && mode === MODES.view && <PasswordDisplayPanel />}
                {fileOpen && mode === MODES.create && <PasswordCreatePanel path={fileOpen} fileName="" onClose={onClose} />}
                {fileOpen && mode === MODES.edit && <PasswordEditPanel path={fileOpen} onClose={onClose} />}

            </div>
            <VerticalModal
                show={showModal}
                onHide={() => setShowModal(false)}
            />
        </div>
    );
};

Layout.propTypes = {
    getPassword: PropTypes.func.isRequired,
};

export default Layout;
