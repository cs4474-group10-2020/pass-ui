import React from 'react';
import PropTypes from 'prop-types';
import { Button, ListGroup } from 'react-bootstrap';
import { faFolder, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ContextMenuTrigger } from 'react-contextmenu';
import { concatPaths, DIRECTORY_EDIT_TYPES, ITEM_TYPES } from '../../service';
// eslint-disable-next-line import/no-cycle
import DirectoryChild from '../../containers/FileNavigation/Directory';
import './Directory.scss';
import RightClickMenu from './RightClickMenu';
import AddDirectoryForm from './AddDirectoryForm';
import File from '../../containers/FileNavigation/File';


const Directory = ({
    directoryChildren, path, getDirectoryContents, onFileOpen, selectedItemPath, onSelectItem, setEdit, editDirectoryPath, editType,
    onAddDirectoryStart, canEdit, onCreatePassword, onEditPassword, onCreateDirectory, onDeleteDirectory, onRenameDirectory,
    onDirectoryChangeOpenState, openDirectories,
}) => {
    const directoryName = path[path.length - 1];
    const pathString = concatPaths(path);
    const isOpen = openDirectories.includes(pathString);
    const isAddingDirectory = pathString === concatPaths(editDirectoryPath) && editType === DIRECTORY_EDIT_TYPES.addChild;
    const isBeingRenamed = pathString === concatPaths(editDirectoryPath) && editType === DIRECTORY_EDIT_TYPES.rename;
    const isSelected = pathString === concatPaths(selectedItemPath);
    const onNewPassword = () => {
        onCreatePassword(path);
    };
    const onNewDirectory = () => {
        onAddDirectoryStart(path);
    };
    const onRename = () => {
        setEdit(path, DIRECTORY_EDIT_TYPES.rename);
    };

    const onRenameComplete = (newDirectoryName) => {
        setEdit([], DIRECTORY_EDIT_TYPES.none);
        onRenameDirectory(path, [...path.slice(0, -1), newDirectoryName]);
    };

    const onDelete = () => {
        onDeleteDirectory(path);
    };

    const rightClickMenuOptions = [
        {
            menuItem: 'New Password',
            callback: onNewPassword,
        },
        {
            menuItem: 'New Folder',
            callback: onNewDirectory,
        },
    ];

    if (canEdit) {
        rightClickMenuOptions.push({
            menuItem: 'Rename',
            callback: onRename,
        }, {
            menuItem: 'Delete',
            callback: onDelete,
        });
    }

    return (
        <ListGroup.Item variant={isSelected ? 'primary' : null} className="directory-child">
            <ContextMenuTrigger id={`context-menu-${pathString}`}>
                <div className="directory-name">
                    <Button
                        variant="outline-primary"
                        className="expand-button"
                        onClick={() => {
                            getDirectoryContents(path);
                            onDirectoryChangeOpenState(path);
                        }}
                    >
                        <FontAwesomeIcon
                            className="directory-icon"
                            size="2x"
                            icon={isOpen ? faFolder : faFolderOpen}
                        />
                    </Button>
                    {isBeingRenamed ? (
                        <AddDirectoryForm
                            onSubmit={onRenameComplete}
                            onCancel={() => {
                                setEdit([], DIRECTORY_EDIT_TYPES.none);
                            }}
                            initialValue={path[path.length - 1]}
                        />
                    ) : (
                        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events
                        <h1
                            onClick={() => {
                                onSelectItem(path, ITEM_TYPES.directory, canEdit);
                            }}
                            className="directory-name-text"
                        >
                            {directoryName}
                        </h1>
                    )}

                </div>
            </ContextMenuTrigger>
            <RightClickMenu
                menuId={`context-menu-${pathString}`}
                itemList={rightClickMenuOptions}
            />

            {isOpen && (
                <ListGroup>
                    {isAddingDirectory && (
                        <ListGroup.Item variant={isSelected ? 'primary' : null} className="directory-child">
                            <div className="directory-name">
                                <AddDirectoryForm
                                    onSubmit={(name) => {
                                        setEdit([], DIRECTORY_EDIT_TYPES.none);
                                        onCreateDirectory([...path, name]);
                                    }}
                                    onCancel={() => setEdit([], DIRECTORY_EDIT_TYPES.none)}
                                />
                            </div>
                        </ListGroup.Item>
                    )}
                    {directoryChildren.directories.map(((directory) => {
                        const childPath = [...path, directory];
                        return (
                            <DirectoryChild
                                selectedItemPath={selectedItemPath}
                                onSelectItem={onSelectItem}
                                key={concatPaths(childPath)}
                                path={childPath}
                                onFileOpen={onFileOpen}
                                canEdit
                                onCreatePassword={onCreatePassword}
                                onEditPassword={onEditPassword}
                                setEdit={setEdit}
                                editDirectoryPath={editDirectoryPath}
                                editType={editType}
                                onDirectoryChangeOpenState={onDirectoryChangeOpenState}
                                openDirectories={openDirectories}
                                onAddDirectoryStart={onAddDirectoryStart}
                            />
                        );
                    }))}
                    {directoryChildren.files.map(((file) => {
                        const childPath = [...path, file];
                        return (
                            <File
                                selectedItemPath={selectedItemPath}
                                onSelectItem={onSelectItem}
                                key={concatPaths(childPath)}
                                path={childPath}
                                onOpen={onFileOpen}
                                onEditPassword={onEditPassword}
                            />
                        );
                    }))}
                </ListGroup>
            )}

        </ListGroup.Item>
    );
};

Directory.propTypes = {
    directoryChildren: PropTypes.shape({
        files: PropTypes.arrayOf(PropTypes.string).isRequired,
        directories: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
    path: PropTypes.arrayOf(PropTypes.string).isRequired,
    getDirectoryContents: PropTypes.func.isRequired,
    onFileOpen: PropTypes.func.isRequired,
    selectedItemPath: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSelectItem: PropTypes.func.isRequired,
    canEdit: PropTypes.bool,
    onCreatePassword: PropTypes.func.isRequired,
    onEditPassword: PropTypes.func.isRequired,
    onCreateDirectory: PropTypes.func.isRequired,
    onDeleteDirectory: PropTypes.func.isRequired,
    onRenameDirectory: PropTypes.func.isRequired,
    setEdit: PropTypes.func.isRequired,
    editDirectoryPath: PropTypes.arrayOf(PropTypes.string).isRequired,
    editType: PropTypes.oneOf(Object.values(DIRECTORY_EDIT_TYPES)).isRequired,
    onDirectoryChangeOpenState: PropTypes.func.isRequired,
    openDirectories: PropTypes.arrayOf(PropTypes.string).isRequired,
    onAddDirectoryStart: PropTypes.func.isRequired,
};

Directory.defaultProps = {
    directoryChildren: {
        files: [],
        directories: [],
    },
    canEdit: false,
};

export default Directory;
