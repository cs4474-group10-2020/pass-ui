import path from 'path';

// eslint-disable-next-line import/prefer-default-export
export const getPasswordStorePath = () => process.env.REACT_APP_PASSWORD_STORE_PATH;

export const concatPaths = (paths) => path.join(...paths);

export const trimGPGExtension = (fileName) => fileName.replace(/\.gpg$/g, '');
