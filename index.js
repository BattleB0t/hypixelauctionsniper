const HypixelAPI = require('hypixel-api');

const nbt = require('prismarine-nbt');
const util = require('util');
const {
    parse
} = require('path');
const {
    stringify
} = require('querystring');

var parseNbt = util.promisify(nbt.parse);

const nbtUtil = require('./nbtUtil.js')
const ahPage = require('./ahPage.json')
//const lowestBin = require('./lowestBin.json')



const client = new HypixelAPI();

async function decodeData(buffer) {

    var buffer = await Buffer.from(buffer, 'base64')

    var parsedNbt = await parseNbt(buffer);
    return await nbt.simplify(parsedNbt);
}

async function nbtToSbID(nbt) {
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

async function search() {


    pages = await client.getSkyblockAuctions();
    for (let j = 0; j < pages.totalPages; j++) {
        item = await client.getSkyblockAuctions(j);
        item.auctions.forEach(element => {
            if (element.bin && !element.claimed) {
                nbtUtil.decodeData(element.item_bytes).then(nbt => {

                    nbtUtil.nbtToSbID(nbt).then(sbID => {
                        // comparaison des prix ici

                    })
                })
            }

        });
    }


}

async function searchWoAPI() {
    ahPage.auctions.forEach(element => {
        if (element.bin && !element.claimed) {
            nbtUtil.decodeData(element.item_bytes).then(nbt => {

                nbtUtil.nbtToSbID(nbt).then(sbID => {
                    nbtUtil.decodeData(element.item_bytes).then(itemNbt => {
                        nbtUtil.nbtToSbID(itemNbt).then(resp => {


                            if ((lowestBin[resp]) - (element.starting_bid) > 100000) {

                                console.log(element.item_name)
                                console.log(`profit : ${(lowestBin[resp]) - (element.starting_bid)}`)
                                console.log('')

                            }



                        })
                    })

                })
            })
        }

    });
}



async function lbinRequest() {
    var lowestBin = {}

    for (let j = 0; j < ahPage.auctions.length; j++) {
        element = ahPage.auctions[j]
        if (element.bin && !element.claimed) {
            itemNbt = await decodeData(element.item_bytes)
            sbID = await nbtToSbID(itemNbt)
            
            if (!lowestBin[sbID]) {
                lowestBin[sbID] = []
            }

            lowestBin[sbID].push(element.starting_bid)

            



        }
    }
    console.log(lowestBin)

}



lbinRequest()