import React, { useState } from 'react';
import DirectoryViewPanel from './FileNavigation/DirectoryViewPanel';
import HeaderComponent from './Header/HeaderComponent';
import VerticalModal from './VerticalModal/VerticalModal';
import './Layout.scss';
import { concatPaths, ITEM_TYPES } from '../service';

const Layout = () => {
    const [fileOpen, setFileOpen] = useState([]);
    const [selectedItemPath, setSelectedItemPath] = useState('');
    const [selectedItemType, setSelectedItemType] = useState(ITEM_TYPES.none);
    const [isDisabled, toggleDisabled] = useState(true);
    const [isSpinning, toggleSpin] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const onSelectItem = (path, type) => {
        setSelectedItemPath(concatPaths(path));
        setSelectedItemType(type);
    };


    return (
        <div>
            <div className="header">
                <HeaderComponent isDisabled={isDisabled} isSpinning={isSpinning} setShowModal={setShowModal} />
            </div>
            <div className="layout">
                <DirectoryViewPanel selectedItemPath={selectedItemPath} onFileOpen={setFileOpen} onSelectItem={onSelectItem} />
            </div>
            <div>
                <VerticalModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                />
            </div>
        </div>
    );
};

export default Layout;
