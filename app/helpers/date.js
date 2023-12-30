const prefixZero = datePart => String(datePart).length === 1
    ? `0${datePart}`
    : datePart;

/**
 * @param {string} [init]
 */
export const getDateYMD = init => {
    const date = init ? new Date(init) : new Date();

    return [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
    ].map(elem => prefixZero(elem)).join('-');
};

/**
 * @param {string} [init]
 */
export const getDateYMDHMS = init => {
    const date = init ? new Date(init) : new Date();

    const hms = [
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
    ].map(elem => prefixZero(elem)).join(':');

    return `${getDateYMD(init)} ${hms}`;
};
