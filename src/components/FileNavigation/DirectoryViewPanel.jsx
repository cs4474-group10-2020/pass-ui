import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Directory from '../../containers/FileNavigation/Directory';
import { DIRECTORY_EDIT_TYPES } from '../../service';

const DirectoryViewPanel = ({
    onFileOpen, selectedItemPath, onSelectItem, onCreatePassword, onEditPassword, onAddDirectoryStart,
    setEdit, editDirectoryPath, editType, onDirectoryChangeOpenState, openDirectories,
}) => (
    <Card className="directory-view-panel">
        <Directory
            selectedItemPath={selectedItemPath}
            onSelectItem={onSelectItem}
            onFileOpen={onFileOpen}
            path={['./']}
            onCreatePassword={onCreatePassword}
            onEditPassword={onEditPassword}
            setEdit={setEdit}
            editDirectoryPath={editDirectoryPath}
            editType={editType}
            onDirectoryChangeOpenState={onDirectoryChangeOpenState}
            openDirectories={openDirectories}
            onAddDirectoryStart={onAddDirectoryStart}
        />
    </Card>
);

DirectoryViewPanel.propTypes = {
    onFileOpen: PropTypes.func.isRequired,
    selectedItemPath: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSelectItem: PropTypes.func.isRequired,
    onCreatePassword: PropTypes.func.isRequired,
    onEditPassword: PropTypes.func.isRequired,
    setEdit: PropTypes.func.isRequired,
    editDirectoryPath: PropTypes.arrayOf(PropTypes.string).isRequired,
    editType: PropTypes.oneOf(Object.values(DIRECTORY_EDIT_TYPES)).isRequired,
    onDirectoryChangeOpenState: PropTypes.func.isRequired,
    openDirectories: PropTypes.arrayOf(PropTypes.string).isRequired,
    onAddDirectoryStart: PropTypes.func.isRequired,
};

export default DirectoryViewPanel;
