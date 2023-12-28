import {requestCache} from '@k03mad/request';

import env from '../../env.js';
import {getDateYMD} from '../helpers/date.js';

/** */
class MosOblEIRC {

    constructor() {
        this.urls = {
            api: 'https://lkk.mosobleirc.ru/api',
        };

        this.reqOpts = {
            cacheResponseSec: 3600,
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

    async getAccountsData() {
        const {items} = await this._getCacheAuth('/api/clients/configuration-items');
        return items;
    }

    async getMetersByAccountId(id) {
        return await this._getCacheAuth(`/api/clients/meters/for-item/${id}`);
    }

    async getChargeByPersonalAccountId(id) {
        const {chargeDetails} = await this._getCacheAuth(`/api/personal_account/charge-details/${id}`, {
            searchParams: {
                date: getDateYMD(),
            },
        });

        return chargeDetails;
    }

}
export default new MosOblEIRC();
