/**
 * @param {string} name
 * @returns {string}
 */
export const renameToRu = name => {
    const renames = {
        KILOWATT_HOUR: 'кВт*ч',
        METERS: 'куб.м.',

        ColdWater: 'Холодная вода',
        HotWater: 'Горячая вода',
        Electricity: 'Электричество',
    };

    return renames[name] || name;
};
