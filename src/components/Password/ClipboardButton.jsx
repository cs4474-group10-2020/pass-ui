import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { Button, Overlay, Tooltip } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ClipboardButton = ({ text }) => {
    const [show, setShow] = useState(false);
    const [timer, setTimer] = useState(null);
    const target = useRef(null);
    useEffect(() => () => clearTimeout(timer), [timer]);

    const writeToClipboard = () => navigator.clipboard.writeText(text).then(() => {
        setShow(true);
        setTimer(setTimeout(() => {
            setShow(false);
        }, 1000));
    });
    return (
        <>
            <Button ref={target} className="clipboard-button" onClick={writeToClipboard}><FontAwesomeIcon icon={faClipboard} /></Button>
            <Overlay target={target.current} show={show} placement="auto">
                <Tooltip id="clipboard-tooltip">
                    Copied to clipboard!
                </Tooltip>
            </Overlay>
        </>
    );
};

ClipboardButton.propTypes = {
    text: PropTypes.string.isRequired,
};

export default ClipboardButton;
