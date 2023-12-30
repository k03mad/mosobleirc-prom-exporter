import MosOblEIRC from '../api/mosobleirc.js';
import {getDateYMDHMS} from '../helpers/date.js';
import {renameToRu} from '../helpers/metrics.js';
import {getCurrentFilename} from '../helpers/paths.js';

export default {
    name: getCurrentFilename(import.meta.url),
    help: 'Meters Dates',
    labelNames: [
        'accountName',
        'meterNumber',
        'meterType',
        'meterUnit',

        'dateReceived',
        'dateAttorney',
    ],

    async collect(ctx) {
        ctx.reset();

        const meters = await MosOblEIRC.getAllMeters();

        meters.forEach(({__account, meter}) => {
            ctx.labels(
                __account.name,
                meter.number,
                renameToRu(meter.type),
                renameToRu(meter.unit),
                getDateYMDHMS(meter.lastValue.receivedDate),
                meter.attorneyDeadline,
            ).set(1);
        });
    },
};
