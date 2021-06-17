const nbt = require('prismarine-nbt');
const util = require('util');
const {
    parse
} = require('path');
const {
    stringify
} = require('querystring');

const parseNbt = util.promisify(nbt.parse);

module.exports = {
    decodeData: async function (buffer) {

        var buffer = Buffer.from(buffer, 'base64')

        var parsedNbt = await parseNbt(buffer);
        return await nbt.simplify(parsedNbt);
    },

    nbtToSbID :async function (nbt) {
        var sbID = ""

        if (nbt && nbt.i[0].tag.ExtraAttributes) {
            var ea = nbt.i[0].tag.ExtraAttributes
            if (nbt.i[0].tag.ExtraAttributes.id) {
                sbID = nbt.i[0].tag.ExtraAttributes.id.replace(/:/, '-')

            } else {
                return null
            }
            if (sbID == 'PET') {
                petInfo = JSON.parse(ea["petInfo"])
                sbID = petInfo["type"]
                tier = petInfo["tier"]
                tiers = ["COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY"]
                sbID += `;${tiers.indexOf(tier)}`

            } else if (sbID == "ENCHANTED_BOOK") {
                return null // a gerer plus tard flm
            }
            return sbID
        }


    }
}