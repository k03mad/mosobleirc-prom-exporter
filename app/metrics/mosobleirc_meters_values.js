import MosOblEIRC from '../api/mosobleirc.js';
import {getCurrentFilename} from '../helpers/paths.js';

export default {
    name: getCurrentFilename(import.meta.url),
    help: 'Meters Values',
    labelNames: [
        'accountName',
        'meterNumber',
        'meterType',
        'meterUnit',

        'type',
    ],

    async collect(ctx) {
        if (MosOblEIRC.isWorkingTime()) {
            ctx.reset();

            const meters = await MosOblEIRC.getAllMeters();

            meters.forEach(({__account, meter}) => {
                const tags = [
                    __account.name,
                    meter.number,
                    MosOblEIRC.renameStringsToRu(meter.type),
                    MosOblEIRC.renameStringsToRu(meter.unit),
                ];

                ctx.labels(...tags, 'total').set(meter.lastValue.total.value);
                ctx.labels(...tags, 'consumption').set(meter.lastValue.total.consumptionValue);
            });
        }
    },
};
