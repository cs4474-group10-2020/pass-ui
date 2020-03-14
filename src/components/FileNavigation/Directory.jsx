import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { concatPaths } from '../../service';
import File from './File';
// eslint-disable-next-line import/no-cycle
import DirectoryChild from '../../containers/FileNavigation/Directory';
import './Directory.scss';


const Directory = ({
    directoryChildren, path, getDirectoryContents, onFileOpen,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <ListGroup.Item>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div
                className="directory-name"
                onClick={() => {
                    getDirectoryContents(path);
                    setIsOpen(!isOpen);
                }}
            >
                <FontAwesomeIcon className="directory-icon" size="2x" icon={isOpen ? faMinus : faPlus} />
                <h1 className="directory-name-text">{path[path.length - 1]}</h1>
            </div>

            {isOpen && (
                <ListGroup>
                    {directoryChildren.directories.map(((directory) => {
                        const childPath = [...path, directory];
                        return (
                            <DirectoryChild key={concatPaths(childPath)} path={childPath} onFileOpen={onFileOpen} />
                        );
                    }))}
                    {directoryChildren.files.map(((file) => {
                        const childPath = [...path, file];
                        return (
                            <File key={concatPaths(childPath)} path={childPath} onOpen={onFileOpen} />
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
};

Directory.defaultProps = {
    directoryChildren: {
        files: [],
        directories: [],
    },
};

export default Directory;
