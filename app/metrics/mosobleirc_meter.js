import MosOblEIRC from '../api/mosobleirc.js';
import {getCurrentFilename} from '../helpers/paths.js';

export default {
    name: getCurrentFilename(import.meta.url),
    help: 'Meter',
    labelNames: [
        'type',
        'accountName',
        'accountId',
        'meterId',
        'meterType',
        'meterUnit',
        'meterAttorneyDeadline',
    ],

    async collect(ctx) {
        ctx.reset();

        const accounts = await MosOblEIRC.getAccountsData();

        await Promise.all(accounts.map(async account => {
            const meters = await MosOblEIRC.getMetersByAccountId(account.id);

            meters.forEach(({meter}) => {
                const tags = [
                    account.name,
                    account.id,
                    meter.id,
                    meter.type,
                    meter.unit,
                    meter.attorneyDeadline,
                ];

                ctx.labels('total', ...tags).set(meter.lastValue.total.value);
                ctx.labels('consumption', ...tags).set(meter.lastValue.total.consumptionValue);
            });
        }));
    },
};
