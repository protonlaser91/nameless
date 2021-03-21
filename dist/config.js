"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var fs = require('fs');
var cfiles = fs.readdirSync(`${__dirname}/commands`);
var efiles = fs.readdirSync(`${__dirname}/events`);
exports.config = {
    "token": "ODE3MjMwMTY2ODI0MzIxMDU0.YEGe5w.rozJzPrgfSdsEDzTp6EeL7yQRkQ",
    "prefix": "!",
    "commands": cfiles,
    "events": efiles
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdkIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxHQUFHLFNBQVMsV0FBVyxDQUFDLENBQUM7QUFDckQsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxHQUFHLFNBQVMsU0FBUyxDQUFDLENBQUM7QUFFeEMsUUFBQSxNQUFNLEdBQUc7SUFDaEIsT0FBTyxFQUFFLDZEQUE2RDtJQUN0RSxRQUFRLEVBQUUsR0FBRztJQUNiLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLFFBQVEsRUFBRSxNQUFNO0NBQ25CLENBQUEifQ==