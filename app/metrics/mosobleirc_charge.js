import MosOblEIRC from '../api/mosobleirc.js';
import {getCurrentFilename} from '../helpers/paths.js';

export default {
    name: getCurrentFilename(import.meta.url),
    help: 'Charge',
    labelNames: [
        'accountName',
        'accountId',
        'service',
        'measure',
    ],

    async collect(ctx) {
        ctx.reset();

        const accounts = await MosOblEIRC.getAccountsData();

        await Promise.all(accounts.map(async account => {
            const charges = await MosOblEIRC.getChargeByPersonalAccountId(account.personalAccount.id);

            charges.forEach(charge => {
                ctx.labels(
                    account.name,
                    account.id,
                    charge.nm_service,
                    charge.nm_measure_unit,
                ).set(Number(charge.sm_total));
            });
        }));
    },
};
