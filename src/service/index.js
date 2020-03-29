import path from 'path';

// eslint-disable-next-line import/prefer-default-export
export const getPasswordStorePath = () => process.env.REACT_APP_PASSWORD_STORE_PATH;

export const concatPaths = (paths) => path.join(...paths);

export const trimGPGExtension = (fileName) => fileName.replace(/\.gpg$/g, '');

export const ITEM_TYPES = Object.freeze({
    none: 0, file: 1, directory: 2,
});

export const MODES = Object.freeze({
    none: 0, view: 1, create: 2, edit: 3,
});

export const parsePassword = (passwordFile) => {
    const fileLines = passwordFile.split(/\r?\n/);

    return {
        password: fileLines[0],
        fields: fileLines.slice(1).reduce((accumulator, currentValue) => {
            if (/^\s*$/.test(currentValue)) {
                return accumulator;
            }

            const [fieldName, fieldValue] = currentValue.split(/:\s*/);

            return {
                ...accumulator,
                [fieldName]: fieldValue,
            };
        }, {}),
    };
};

export const getPasswordString = (password) => [
    `${password.password}\n`,
    ...(Object.entries(password.fields).map(([key, value]) => `${key}: ${value}\n`)),
].join('');
