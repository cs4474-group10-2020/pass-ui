import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, ListGroup } from 'react-bootstrap';
import './File.scss';
import { ContextMenuTrigger } from 'react-contextmenu';
import { concatPaths, ITEM_TYPES, trimGPGExtension } from '../../service';
import RightClickMenu from './RightClickMenu';
import AddDirectoryForm from './AddDirectoryForm';

const File = ({
    path, onOpen, selectedItemPath, onSelectItem, onEditPassword, onDeleteFile, onRenameFile,
}) => {
    const [isBeingRenamed, setIsBeingRenamed] = useState(false);
    const fileName = trimGPGExtension(path[path.length - 1]);
    const pathString = concatPaths(path);
    const isSelected = pathString === selectedItemPath;

    const onRename = () => {
        setIsBeingRenamed(true);
    };

    const onRenameComplete = (newFileName) => {
        setIsBeingRenamed(false);
        onRenameFile(path, [...path.slice(0, -1), newFileName]);
    };

    const onEdit = () => onEditPassword(path);

    const onDelete = () => {
        onDeleteFile([...path.slice(0, -1), fileName]);
    };

    const rightClickMenuOptions = [
        {
            menuItem: 'Edit',
            callback: onEdit,
        },
        {
            menuItem: 'Delete',
            callback: onDelete,
        },
        {
            menuItem: 'Rename',
            callback: onRename,
        },
    ];
    return (
        <ListGroup.Item variant={isSelected ? 'primary' : null} className="directory-child">
            <ContextMenuTrigger id={`context-menu-${pathString}`}>
                <div className="file">
                    <Button
                        variant="outline-primary"
                        className="expand-button"
                        onClick={() => onOpen(path)}
                    >
                        <FontAwesomeIcon icon={faKey} size="lg" />
                    </Button>

                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                    {isBeingRenamed ? (
                        <AddDirectoryForm onSubmit={onRenameComplete} onCancel={() => setIsBeingRenamed(false)} initialValue={fileName} />
                    ) : (
                        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events
                        <h3
                            onClick={() => {
                                onSelectItem(path, ITEM_TYPES.file);
                            }}
                            className="file-name"
                        >
                            {fileName}
                        </h3>
                    )}
                </div>
            </ContextMenuTrigger>
            <RightClickMenu
                menuId={`context-menu-${pathString}`}
                itemList={rightClickMenuOptions}
            />
        </ListGroup.Item>
    );
};

File.propTypes = {
    path: PropTypes.arrayOf(PropTypes.string).isRequired,
    onOpen: PropTypes.func.isRequired,
    selectedItemPath: PropTypes.string.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    onEditPassword: PropTypes.func.isRequired,
    onDeleteFile: PropTypes.func.isRequired,
    onRenameFile: PropTypes.func.isRequired,
};

export default File;
