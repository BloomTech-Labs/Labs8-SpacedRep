const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
    orgUrl: 'https://dev-714580.oktapreview.com',
    token: '00UrrMsM_WcMv4YPLfOqqwv4z3_IuH8zjPvlUlRmvX'
});

module.exports = client;