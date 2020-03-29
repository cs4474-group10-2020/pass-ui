import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DirectoryViewPanel from './FileNavigation/DirectoryViewPanel';
import './Layout.scss';
import { concatPaths, ITEM_TYPES, MODES } from '../service';
import PasswordDisplayPanel from '../containers/Password/PasswordDisplayPanel';
import PasswordCreatePanel from '../containers/Password/PasswordCreatePanel';

const Layout = ({ getPassword }) => {
    const [fileOpen, setFileOpen] = useState(null);
    const [selectedItemPath, setSelectedItemPath] = useState('');
    const [selectedItemType, setSelectedItemType] = useState(ITEM_TYPES.none);
    const [mode, setMode] = useState(MODES.none);

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

    return (
        <div className="layout">
            <DirectoryViewPanel
                selectedItemPath={selectedItemPath}
                onFileOpen={onFileOpen}
                onSelectItem={onSelectItem}
                onCreatePassword={onCreatePassword}
            />
            {fileOpen && mode === MODES.view && <PasswordDisplayPanel />}
            {fileOpen && mode === MODES.create && <PasswordCreatePanel path={fileOpen} fileName="" onClose={onClose} />}
        </div>
    );
};

Layout.propTypes = {
    getPassword: PropTypes.func.isRequired,
};

export default Layout;
