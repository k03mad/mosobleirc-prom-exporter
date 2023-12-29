/**
 * @param {string} [init]
 */
export const getDateYMD = init => {
    const date = init ? new Date(init) : new Date();

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return [
        year,
        String(month).length === 1 ? `0${month}` : month,
        String(day).length === 1 ? `0${day}` : day,
    ].join('-');
};
