const HypixelAPI = require('hypixel-api');

const nbt = require('prismarine-nbt');
const util = require('util');
const {
    parse
} = require('path');
const {
    stringify
} = require('querystring');

const nbtUtil = require('./nbtUtil.js')
const ahPage = require('./ahPage.json')
const lowestBin = require('./lowestBin.json')



const client = new HypixelAPI();


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


                            if ((lowestBin[resp]) - (element.starting_bid) > 100000){

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

searchWoAPI()