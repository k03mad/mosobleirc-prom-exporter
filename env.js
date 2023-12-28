import {errorText} from './app/helpers/colors.js';
import {throwPlainError} from './app/helpers/logging.js';

const env = {
    server: {
        port: process.env.npm_config_port
        || process.env.MOSOBLEIRC_EXPORTER_PORT
        || 11_013,
    },
    mosobleirc: {
        phone: process.env.npm_config_phone || process.env.MOSOBLEIRC_PHONE,
        password: process.env.npm_config_password || process.env.MOSOBLEIRC_PASSWORD,
    },
    debug: process.env.DEBUG,
};

const missedEnvNames = [];

Object.entries(env.mosobleirc).forEach(([key, value]) => {
    if (!value) {
        missedEnvNames.push(key);
    }
});

if (missedEnvNames.length > 0) {
    throwPlainError([
        errorText(` MosOblEIRC [${missedEnvNames.join(' + ')}] is not specified `),
        '> use env variables or npm parameters',
        '> see readme',
    ]);
}

export default env;
