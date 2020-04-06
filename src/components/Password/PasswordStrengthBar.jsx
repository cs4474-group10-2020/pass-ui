import * as zxcvbn from 'zxcvbn';
import { OverlayTrigger, ProgressBar, Tooltip } from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';

const passwordStrengthColors = {
    0: 'danger',
    1: 'danger',
    2: 'danger',
    3: 'warning',
    4: 'success',
};

const PasswordStrengthBar = ({ password }) => {
    const passwordResult = zxcvbn(password);
    const passwordFeedback = passwordResult.feedback.warning
        ? [passwordResult.feedback.warning, ...passwordResult.feedback.suggestions]
        : passwordResult.feedback.suggestions;

    const progressBar = (
        <ProgressBar
            className="password-strength-bar"
            variant={passwordStrengthColors[passwordResult.score]}
            now={(passwordResult.score * 100) / 4}
        />
    );

    if (passwordFeedback.length === 0) {
        return progressBar;
    }

    return (
        <OverlayTrigger
            placement="bottom"
            overlay={(
                <Tooltip id="password-strength-tooltip">
                    {passwordFeedback.map((feedback, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <React.Fragment key={index}>
                            {feedback}
                            <br />
                        </React.Fragment>
                    ))}
                </Tooltip>
            )}
        >
            {progressBar}
        </OverlayTrigger>
    );
};

PasswordStrengthBar.propTypes = {
    password: PropTypes.string.isRequired,
};

export default PasswordStrengthBar;
