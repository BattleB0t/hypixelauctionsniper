const HypixelAPI = require('hypixel-api');

const nbt = require('prismarine-nbt');
const util = require('util');
const fs = require('fs')
const {
    parse
} = require('path');
const {
    stringify
} = require('querystring');


var parseNbt = util.promisify(nbt.parse);

/* (unused)
const nbtUtil = require('./util.js')
*/
const mathUtil = require('./util/math.js');
const { time } = require('console');



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
        page = await client.getSkyblockAuctions(j);
        for (let i = 0; i < page.auctions.length; i++) {
          
            element = page.auctions[i]

            itemNbt = await decodeData(element.item_bytes)
            sbID = await nbtToSbID(itemNbt)


            //scan profit
            // mathUtil.min(lowestBin[sbID]) => pour voir la lbin, tout est dans ./util/math
            console.log(((element.starting_bid - mathUtil.min(lowestBin[sbID])) / mathUtil.min(lowestBin[sbID])))
            if (((element.starting_bid - mathUtil.min(lowestBin[sbID])) / mathUtil.min(lowestBin[sbID])) > 10 ){
            //if ((mathUtil.min(lowestBin[sbID])) - (element.starting_bid) > 100000) {

                console.log('')
                console.log('======================')
                console.log('')
                console.log(element.item_name)
                console.log(`profit : ${mathUtil.min(lowestBin[sbID]) - (element.starting_bid)}`)
                console.log(`/viewauction ${element.uuid}`)
                console.log('')
                console.log('======================')
                console.log('')

            }

            
            

        }
    }


}

async function lbinRequest() {
    var lowestBin = {}

    pages = await client.getSkyblockAuctions();
    for (let j = 0; j < pages.totalPages; j++) {
        console.log(`page : ${j}`)
        page = await client.getSkyblockAuctions(j);
        for (let i = 0; i < page.auctions.length; i++) {
          
            element = page.auctions[i]

            itemNbt = await decodeData(element.item_bytes)
            sbID = await nbtToSbID(itemNbt)


            if (!lowestBin[sbID]) {
                lowestBin[sbID] = []
            }

            lowestBin[sbID].push(element.starting_bid)

        }
    }
    let ts = Date.now();
    let date_ob = new Date(ts);

    let json = JSON.stringify(lowestBin);
    fs.writeFileSync(`lowestBin.json`, json);
}


lbinRequest().then(() => {
    while (True) {
        search()
    }
})

