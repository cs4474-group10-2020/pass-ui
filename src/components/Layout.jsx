import React, { useState } from 'react';
import DirectoryViewPanel from './FileNavigation/DirectoryViewPanel';
import './Layout.scss';
import { concatPaths, ITEM_TYPES } from '../service';

const Layout = () => {
    const [fileOpen, setFileOpen] = useState([]);
    const [selectedItemPath, setSelectedItemPath] = useState('');
    const [selectedItemType, setSelectedItemType] = useState(ITEM_TYPES.none);

    const onSelectItem = (path, type) => {
        setSelectedItemPath(concatPaths(path));
        setSelectedItemType(type);
    };

    return (
        <div className="layout">
            <DirectoryViewPanel selectedItemPath={selectedItemPath} onFileOpen={setFileOpen} onSelectItem={onSelectItem} />
        </div>
    );
};

export default Layout;
