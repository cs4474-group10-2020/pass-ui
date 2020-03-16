import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Directory from '../../containers/FileNavigation/Directory';

const DirectoryViewPanel = ({ onFileOpen, selectedItemPath, onSelectItem }) => (
    <Card className="directory-view-panel">
        <Directory selectedItemPath={selectedItemPath} onSelectItem={onSelectItem} onFileOpen={onFileOpen} path={['./']} />
    </Card>
);

DirectoryViewPanel.propTypes = {
    onFileOpen: PropTypes.func.isRequired,
    selectedItemPath: PropTypes.string.isRequired,
    onSelectItem: PropTypes.func.isRequired,
};

export default DirectoryViewPanel;
