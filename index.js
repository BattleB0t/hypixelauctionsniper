const HypixelAPI = require('hypixel-api');

const nbt = require('prismarine-nbt');
const util = require('util');
const { parse } = require('path');
const { stringify } = require('querystring');

const nbtUtil = require('./nbtUtil.js')

const client = new HypixelAPI();


async function search() {
    pages = await client.getSkyblockAuctions();
    for (let j = 0; j < pages.totalPages; j++) {
        item = await client.getSkyblockAuctions(j);
        item.auctions.forEach(element => {
            if (element.bin && !element.claimed) {
                //comparaison des prix
                console.log(element);
            }

        });
    }


}


var itemByte = 'H4sIAAAAAAAAAE1TXW7bRhAe2UlDCQXS5qV9ZBgXfajZcCmJFAXkQbFUm4ZEO4rkWAyCYEWORDr8A7l0RBU9QnuCvusCPYGO0oMUHapBYWCB3Zn55vtmhpwWQBMaYQsAGkdwFPqN3xvw+CwtE9FowbHg62NoXoQ+/hLxdUGof1rQevupjKKrzwnmEhzZPpzoRlfr6aahehrjalvnlmrpGlNNnyMz9Y7V7SDlXedphrkIsWiCJHAjyhyLg7QEj294VCL8hdWl5t4Gmn97GXmVbZA9e6tFV/ZdZtrJTbU8sw07pvjFwBhX1gNsV/B33WjRvgzc5E25jG+0cXsa4cWUefH8fnJnbyZDmznDiTYZvmGLeBo420HlvLO37my+cc7t7WTmBnS3ne3rOyd2g8VsGi5mUeCe29oinm+vhoOuM7N1t8boi657dmmtbrVX1EELnvhhkUW8asKjcZqjRM5n8O1+1xslXsATESZr+RoFub/f76gVgVEUrjHxsC/vd/wnpmnwjCJDXGFSfHF2NcJ/vd8ZY77FfIk8BoUwdFyeFXKVlrmMCcY0UnmV5pSzZNoGfqSbMIcwPf/+8w/5oSD5TLzHvALpQMbb9Zf9jmQe1DraZPLrNC0EvPhPkc7B/iL7AIqbDJ5SeFnVRevdH+hNhCeHJJyG60CoXhR6n2SRytz3ZRGEhZyhILseER4IazvGpHxej3O/s/a7aDqYjiR45PAYD1N7P76PZBrUB9Kxzkue+yFPaPZPRxuR84EQebgsBRYSPCE2O1mlEP6qiCpDpa+czwfToT1wlFOFeyK8J9+KRwWeKlS/0td/1gzDZLrZYT2jZxrWyDxV6F/NKbWug9IC2oOa9P9Ejyd+NS/QV/rabxI00zxch8mMr0G6Hs0+TkbOXKqXCo7JpEbKkt4nHeZzWpa2ygzNUjvtnqdapKyyNq7MnmHpnmkQmQhjLASPM/jGeMnYS53JjPU1Q76eABzBV0Me8zXCMcC/T3OaFsUDAAA\u003d';


nbtUtil.decodeData(itemByte).then(nbt => {

    nbtUtil.nbtToSbID(nbt).then(console.log)

})

