const _ = require('lodash');
const storage = require('./storage');
const env = process.env.NODE_ENV || 'dev';
const envConfig = require('./' + env);
let defaultConfig = {
    env: env
};
module.exports = _.merge(defaultConfig, envConfig);