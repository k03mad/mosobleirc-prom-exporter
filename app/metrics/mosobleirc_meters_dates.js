import MosOblEIRC from '../api/mosobleirc.js';
import {getDateYMDHMS} from '../helpers/date.js';
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
        if (MosOblEIRC.isWorkingTime()) {
            ctx.reset();

            const meters = await MosOblEIRC.getAllMeters();

            meters.forEach(({__account, meter}) => {
                ctx.labels(
                    __account.name,
                    meter.number,
                    MosOblEIRC.renameStringsToRu(meter.type),
                    MosOblEIRC.renameStringsToRu(meter.unit),
                    getDateYMDHMS({init: meter.lastValue.receivedDate}),
                    meter.attorneyDeadline,
                ).set(1);
            });
        }
    },
};
