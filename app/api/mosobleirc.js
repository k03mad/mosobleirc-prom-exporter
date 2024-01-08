import {requestCache} from '@k03mad/request';

import env from '../../env.js';
import {getDateHMS, getDateYMD} from '../helpers/date.js';

/** */
class MosOblEIRC {

    constructor() {
        this.urls = {
            api: 'https://lkk.mosobleirc.ru/api',
        };

        this.reqOpts = {
            cacheResponseSec: 3600,
        };

        // HHmmss
        this.lkkWorks = {
            from: '060000',
            to: '230000',
        };
    }

    /**
     * @param {string} path
     * @param {object} [options]
     * @returns {Promise<object>}
     */
    async _getCache(path, options = {}) {
        const {body} = await requestCache(
            this.urls.api + path,
            options,
            {expire: this.reqOpts.cacheResponseSec},
        );

        return body;
    }

    /**
     * @param {string} path
     * @param {object} [options]
     * @returns {Promise<object>}
     */
    async _getCacheAuth(path, options = {}) {
        const headers = await this.getAuthHeaders();
        return await this._getCache(path, {...options, headers});
    }

    /**
     * @returns {Promise<Array>}
     */
    async getAccountsData() {
        const {items} = await this._getCacheAuth('/api/clients/configuration-items');
        return items;
    }

    /**
     * @returns {Promise<Array>}
     */
    async getAllMeters() {
        const accounts = await this.getAccountsData();

        const metersByAccount = await Promise.all(accounts.map(async account => {
            const meters = await this.getMetersByAccountId(account.id);

            meters.forEach(meter => {
                meter.__account = {name: account.name};
            });

            return meters;
        }));

        return metersByAccount.flat();
    }

    async getAuthHeaders() {
        const {token} = await this._getCache('/tenants-registration/v2/login', {
            method: 'POST',
            json: {
                phone: env.mosobleirc.phone,
                password: env.mosobleirc.password,
                loginMethod: 'PERSONAL_OFFICE',
            },
        });

        return {'X-Auth-Tenant-Token': token};
    }

    /**
     * @param {string|number} id
     * @returns {Promise<Array>}
     */
    async getChargeByPersonalAccountId(id) {
        const {chargeDetails} = await this._getCacheAuth(`/api/personal_account/charge-details/${id}`, {
            searchParams: {
                date: getDateYMD(),
            },
        });

        return chargeDetails;
    }

    /**
     * @param {string|number} id
     * @returns {Promise<Array>}
     */
    async getMetersByAccountId(id) {
        return await this._getCacheAuth(`/api/clients/meters/for-item/${id}`);
    }

    isWorkingTime() {
        const hms = Number(getDateHMS({hmsSeparator: ''}));
        return Boolean(hms > Number(this.lkkWorks.from) && hms < Number(this.lkkWorks.to));
    }

    /**
     * @param {string} name
     * @returns {string}
     */
    renameStringsToRu(name) {
        const renames = {
            KILOWATT_HOUR: 'кВт*ч',
            METERS: 'куб.м.',

            ColdWater: 'Холодная вода',
            HotWater: 'Горячая вода',
            Electricity: 'Электричество',
        };

        return renames[name] || name;
    }

}
export default new MosOblEIRC();
