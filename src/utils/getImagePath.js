export const getImagePath = (path) => {
    return require('../images/' + path);
}

export default { getImagePath };