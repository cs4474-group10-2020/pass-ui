import React, { useState } from 'react';
import DirectoryViewPanel from './FileNavigation/DirectoryViewPanel';
import './Layout.scss';

const Layout = () => {
    const [fileOpen, setFileOpen] = useState([]);

    return (
        <div className="layout">
            <DirectoryViewPanel onFileOpen={setFileOpen} />
        </div>
    );
};

export default Layout;
