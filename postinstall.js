#!/usr/bin/env node

'use strict';

function isTrue(value) {
    return !!value && value !== '0' && value !== 'false';
}

let envDisable = isTrue(process.env.DISABLE_OPENCOLLECTIVE) || isTrue(process.env.CI);
let logLevel = process.env.npm_config_loglevel;
let logLevelDisplay = ['silent', 'error', 'warn'].indexOf(logLevel) > -1;

if (!envDisable && !logLevelDisplay) {
    console.log('Thank you for using \u001b[35mMikudos\u001b[0m: (\u001b[32mhttps://mikudos.github.io/doc/\u001b[0m)\n');
}
