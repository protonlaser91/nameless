var fs = require('fs');
var cfiles = fs.readdirSync(`${__dirname}/commands`);
var efiles = fs.readdirSync(`${__dirname}/events`);

export let config = {
    "token": "ODE3MjMwMTY2ODI0MzIxMDU0.YEGe5w.DGMkCdLF8sD5dPyAd84UzbfnBAg",
    "prefix": "!",
    "commands": cfiles,
    "events": efiles
}

