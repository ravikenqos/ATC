'use strict';

module.exports = {
    restApiRoot: '/api',
    host: process.env.SERVICE_HOST || 'localhost',
    port: process.env.SERVICE_PORT || 3000,
    remoting: {
        context: false,
        rest: {
            handleErrors: true,
            normalizeHttpPath: false,
            xml: false,
        },
        json: {
            strict: false,
            limit: '100kb'
        },
        urlencoded: {
            extended: true,
            limit: '100kb',
        },
        cors: false,
    },
};