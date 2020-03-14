import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Directory from '../../containers/FileNavigation/Directory';

const DirectoryViewPanel = ({ onFileOpen }) => (
    <Card className="directory-view-panel">
        <Directory onFileOpen={onFileOpen} path={['./']} />
    </Card>
);

DirectoryViewPanel.propTypes = {
    onFileOpen: PropTypes.func.isRequired,
};

export default DirectoryViewPanel;
