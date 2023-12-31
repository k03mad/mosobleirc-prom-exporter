const prefixZero = datePart => String(datePart).length === 1
    ? `0${datePart}`
    : datePart;

/**
 * @param {number|string} [init]
 * @param {object} [opts]
 * @param {string} [opts.ymdSeparator]
 */
export const getDateYMD = (init, {ymdSeparator = '-'} = {}) => {
    const date = init ? new Date(init) : new Date();

    return [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
    ].map(elem => prefixZero(elem)).join(ymdSeparator);
};

/**
 * @param {string} [init]
 * @param {object} [opts]
 * @param {string} [opts.ymdSeparator]
 * @param {string} [opts.hmsSeparator]
 */
export const getDateYMDHMS = (init, {ymdSeparator = '-', hmsSeparator = ':'} = {}) => {
    const date = init ? new Date(init) : new Date();
    const ymd = getDateYMD(init, {ymdSeparator});

    const hms = [
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
    ].map(elem => prefixZero(elem)).join(hmsSeparator);

    return `${ymd} ${hms}`;
};
