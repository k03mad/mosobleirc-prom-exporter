const prefixZero = datePart => String(datePart).length === 1
    ? `0${datePart}`
    : datePart;

/**
 * @param {object} [opts]
 * @param {number|string} [opts.init]
 * @param {string} [opts.ymdSeparator]
 */
export const getDateYMD = ({init, ymdSeparator = '-'} = {}) => {
    const date = init ? new Date(init) : new Date();

    return [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
    ].map(elem => prefixZero(elem)).join(ymdSeparator);
};

/**
 * @param {object} [opts]
 * @param {number|string} [opts.init]
 * @param {string} [opts.hmsSeparator]
 */
export const getDateHMS = ({init, hmsSeparator = ':'} = {}) => {
    const date = init ? new Date(init) : new Date();

    return [
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
    ].map(elem => prefixZero(elem)).join(hmsSeparator);
};

/**
 * @param {object} [opts]
 * @param {number|string} [opts.init]
 * @param {string} [opts.ymdSeparator]
 * @param {string} [opts.hmsSeparator]
 */
export const getDateYMDHMS = ({init, ymdSeparator = '-', hmsSeparator = ':'} = {}) => {
    const ymd = getDateYMD({init, ymdSeparator});
    const hms = getDateHMS({init, hmsSeparator});

    return `${ymd} ${hms}`;
};
