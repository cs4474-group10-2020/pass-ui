import path from 'path';
import sanitize from 'sanitize-filename';
import generator from 'generate-password';

// eslint-disable-next-line import/prefer-default-export
export const getPasswordStorePath = () => process.env.REACT_APP_PASSWORD_STORE_PATH;

export const concatPaths = (paths) => path.join(...paths);

export const trimGPGExtension = (fileName) => fileName.replace(/\.gpg$/g, '');

export const ITEM_TYPES = Object.freeze({
    none: 0, file: 1, directory: 2,
});

export const DIRECTORY_EDIT_TYPES = Object.freeze({
    none: 0, rename: 1, addChild: 2,
});

export const MODES = Object.freeze({
    none: 0, view: 1, create: 2, edit: 3,
});

export const STATUS_TYPES = Object.freeze({
    deleteFile: 'deleteFile', renameFile: 'renameFile', openPassword: 'openPassword', sync: 'sync', savePassword: 'savePassword',
});

export const parsePassword = (passwordFile) => {
    const fileLines = passwordFile.split(/\r?\n/);

    return {
        password: fileLines[0],
        fields: fileLines.slice(1)
            .filter((currentLine) => !/^\s*$/.test(currentLine))
            .map((currentLine) => {
                const [fieldName, fieldValue] = currentLine.split(/:\s*/);

                return {
                    key: fieldName,
                    value: fieldValue,
                };
            }),
    };
};

export const getPasswordString = (password) => [
    `${password.password}\n`,
    ...(password.fields.map(({ key, value }) => `${key}: ${value}\n`)),
].join('');


export const isFileNameValid = (fileName) => sanitize(fileName) === fileName && fileName !== '';

export const generatePassword = (length, includeNumbers, includeSpecialCharacters) => generator.generate({
    length,
    numbers: includeNumbers,
    symbols: includeSpecialCharacters,
    lowercase: true,
    uppercase: true,
    strict: true,
});

export const validPasswordFieldValue = (value) => !value.includes(':') && value !== '';

export const isPasswordValid = (fileName, password) => {
    let isValid = isFileNameValid(fileName);
    isValid = isValid && password !== '';
    password.fields.forEach(({ key, value }) => {
        isValid = isValid && validPasswordFieldValue(key);
        isValid = isValid && validPasswordFieldValue(value);
    });
    return isValid;
};
