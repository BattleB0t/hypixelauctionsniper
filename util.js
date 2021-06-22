const nbt = require('prismarine-nbt');
const util = require('util');
const {
    parse
} = require('path');
const {
    stringify
} = require('querystring');

const parseNbt = util.promisify(nbt.parse);

module.exports = {}