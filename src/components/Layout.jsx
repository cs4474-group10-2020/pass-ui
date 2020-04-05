import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DirectoryViewPanel from './FileNavigation/DirectoryViewPanel';
import VerticalModal from './VerticalModal/VerticalModal';
import './Layout.scss';
import {
    concatPaths, DIRECTORY_EDIT_TYPES, ITEM_TYPES, MODES,
} from '../service';
import PasswordDisplayPanel from '../containers/Password/PasswordDisplayPanel';
import PasswordCreatePanel from '../containers/Password/PasswordCreatePanel';
import PasswordEditPanel from '../containers/Password/PasswordEditPanel';
import HeaderComponent from '../containers/Header/HeaderComponent';

const Layout = ({ getPassword, getDirectoryContents }) => {
    const [fileOpen, setFileOpen] = useState(null);
    const [selectedItemPath, setSelectedItemPath] = useState([]);
    const [selectedItemType, setSelectedItemType] = useState(ITEM_TYPES.none);
    const [canEditSelectedItem, setCanEditSelectedItem] = useState(false);
    const [editDirectoryPath, setEditDirectoryPath] = useState([]);
    const [editType, setEditType] = useState(DIRECTORY_EDIT_TYPES.none);
    const [mode, setMode] = useState(MODES.none);
    const [showModal, setShowModal] = useState(false);
    const [openDirectories, setOpenDirectories] = useState(['./']);

    const onDirectoryChangeOpenState = (path) => {
        const fullPath = concatPaths(path);
        if (openDirectories.includes(fullPath)) {
            setOpenDirectories(openDirectories.filter((directoryPath) => directoryPath !== fullPath));
        } else {
            getDirectoryContents(path);
            setOpenDirectories([...openDirectories, fullPath]);
        }
    };

    const setEdit = (path, newEditType) => {
        setEditDirectoryPath(path);
        setEditType(newEditType);
    };

    const onAddDirectory = (path) => {
        const fullPath = concatPaths(path);
        if (!openDirectories.includes(fullPath)) {
            getDirectoryContents(path);
            setOpenDirectories([...openDirectories, fullPath]);
        }
        setEditDirectoryPath(path);
        setEditType(DIRECTORY_EDIT_TYPES.addChild);
    };

    const onSelectItem = (path, type, canEdit = true) => {
        setSelectedItemPath(path);
        setSelectedItemType(type);
        setCanEditSelectedItem(canEdit);
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
        <div className="layout">
            <div className="header">
                <HeaderComponent
                    selectedItemType={selectedItemType}
                    selectedItemPath={selectedItemPath}
                    canEditSelectedItem={canEditSelectedItem}
                    isLoading
                    setShowModal={setShowModal}
                    onCreatePassword={onCreatePassword}
                    onEditPassword={onEditPassword}
                    onAddDirectory={onAddDirectory}
                />
            </div>
            <div className="content">
                <DirectoryViewPanel
                    selectedItemPath={selectedItemPath}
                    onFileOpen={onFileOpen}
                    onSelectItem={onSelectItem}
                    onCreatePassword={onCreatePassword}
                    onEditPassword={onEditPassword}
                    editType={editType}
                    editDirectoryPath={editDirectoryPath}
                    setEdit={setEdit}
                    onDirectoryChangeOpenState={onDirectoryChangeOpenState}
                    openDirectories={openDirectories}
                    onAddDirectoryStart={onAddDirectory}
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
    getDirectoryContents: PropTypes.func.isRequired,
};

export default Layout;
