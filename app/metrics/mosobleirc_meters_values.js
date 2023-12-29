import MosOblEIRC from '../api/mosobleirc.js';
import {renameToRu} from '../helpers/metrics.js';
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
        ctx.reset();

        const meters = await MosOblEIRC.getAllMeters();

        meters.forEach(({__account, meter}) => {
            const tags = [
                __account.name,
                meter.number,
                renameToRu(meter.type),
                renameToRu(meter.unit),
            ];

            ctx.labels(...tags, 'total').set(meter.lastValue.total.value);
            ctx.labels(...tags, 'consumption').set(meter.lastValue.total.consumptionValue);
        });
    },
};
