import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, ListGroup } from 'react-bootstrap';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ContextMenuTrigger } from 'react-contextmenu';
import { concatPaths, ITEM_TYPES } from '../../service';
// eslint-disable-next-line import/no-cycle
import DirectoryChild from '../../containers/FileNavigation/Directory';
import './Directory.scss';
import RightClickMenu from './RightClickMenu';
import AddDirectoryForm from './AddDirectoryForm';
import File from '../../containers/FileNavigation/File';


const Directory = ({
    directoryChildren, path, getDirectoryContents, onFileOpen, selectedItemPath, onSelectItem,
    canRename, onCreatePassword, onEditPassword, onCreateDirectory, onDeleteDirectory, onRenameDirectory,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isBeingRenamed, setIsBeingRenamed] = useState(false);
    const [isAddingDirectory, setIsAddingDirectory] = useState(false);
    const directoryName = path[path.length - 1];
    const pathString = concatPaths(path);
    const isSelected = pathString === selectedItemPath;
    const onNewPassword = () => {
        onCreatePassword(path);
    };
    const onNewDirectory = () => {
        getDirectoryContents(path);
        setIsOpen(true);
        setIsAddingDirectory(true);
    };
    const onRename = () => {
        setIsAddingDirectory(false);
        setIsBeingRenamed(true);
    };

    const onRenameComplete = (newDirectoryName) => {
        setIsBeingRenamed(false);
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

    if (canRename) {
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
                            setIsOpen(!isOpen);
                        }}
                    >
                        <FontAwesomeIcon
                            className="directory-icon"
                            size="2x"
                            icon={isOpen ? faMinus : faPlus}
                        />
                    </Button>
                    {isBeingRenamed ? (
                        <AddDirectoryForm
                            onSubmit={onRenameComplete}
                            onCancel={() => {
                                setIsBeingRenamed(false);
                            }}
                            initialValue={path[path.length - 1]}
                        />
                    ) : (
                        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events
                        <h1
                            onClick={() => {
                                onSelectItem(path, ITEM_TYPES.directory);
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
                                        setIsAddingDirectory(false);
                                        onCreateDirectory([...path, name]);
                                    }}
                                    onCancel={() => setIsAddingDirectory(false)}
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
                                canRename
                                onCreatePassword={onCreatePassword}
                                onEditPassword={onEditPassword}
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
    selectedItemPath: PropTypes.string.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    canRename: PropTypes.bool,
    onCreatePassword: PropTypes.func.isRequired,
    onEditPassword: PropTypes.func.isRequired,
    onCreateDirectory: PropTypes.func.isRequired,
    onDeleteDirectory: PropTypes.func.isRequired,
    onRenameDirectory: PropTypes.func.isRequired,
};

Directory.defaultProps = {
    directoryChildren: {
        files: [],
        directories: [],
    },
    canRename: false,
};

export default Directory;
