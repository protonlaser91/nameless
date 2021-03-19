"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalVars = exports.values = void 0;
var https = require('follow-redirects').https;
var fs = require('fs');
const db = require("quick.db");
const TwoWayMap_1 = require("../util/TwoWayMap");
exports.values = new TwoWayMap_1.default({
    "P+": 1,
    "P": 0.5,
    "NEU": 0,
    "NONE": 0,
    "N": -0.5,
    "N+": -1,
});
class GlobalVars {
}
exports.GlobalVars = GlobalVars;
GlobalVars.credits = NaN;
class sentiment {
    name() {
        return "sentiment";
    }
    help() {
        return "sentiment";
    }
    runEvent(msg, Bot) {
        return __awaiter(this, void 0, void 0, function* () {
            if (msg.channel.id != `821743564731973674` && msg.channel.id != `822258266075430933` || msg.content.startsWith("!"))
                return;
            let totalMsg;
            let arr = db.get(`${msg.author.id}.msgArray`);
            if (arr.length < 10) {
                db.push(`${msg.author.id}.msgArray`, msg.content);
            }
            else {
                totalMsg = arr.join('\n');
                var options = {
                    'method': 'POST',
                    'hostname': 'api.meaningcloud.com',
                    'path': `/sentiment-2.1?key=bb7856b3cc9b538b7534467a7afbea0b&lang=en&txt=${encodeURI(totalMsg)}&model=test`,
                    'headers': {},
                    'maxRedirects': 20
                };
                let body;
                var req = https.request(options, function (res) {
                    var chunks = [];
                    res.on("data", function (chunk) {
                        chunks.push(chunk);
                    });
                    res.on("end", function (chunk) {
                        body = JSON.parse(Buffer.concat(chunks).toString());
                        let score = exports.values.get(body[`score_tag`]);
                        let recycle = db.get(`${msg.author.id}.recycleAmt`);
                        db.set(`${msg.author.id}.sentiment`, 1 / (recycle + 1) * score + recycle / (recycle + 1) * db.get(`${msg.author.id}.sentiment`));
                        GlobalVars.credits = body['status']['remaining_credits'];
                    });
                    res.on("error", function (error) {
                        console.error(error);
                    });
                });
                req.end();
                db.set(`${msg.author.id}.msgArray`, []);
            }
        });
    }
}
exports.default = sentiment;
function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VudGltZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2V2ZW50cy9zZW50aW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUMsS0FBSyxDQUFDO0FBQzlDLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN2QiwrQkFBK0I7QUFDL0IsaURBQTBDO0FBRS9CLFFBQUEsTUFBTSxHQUFlLElBQUksbUJBQVMsQ0FBQztJQUM1QyxJQUFJLEVBQUUsQ0FBQztJQUNQLEdBQUcsRUFBRSxHQUFHO0lBQ1IsS0FBSyxFQUFHLENBQUM7SUFDVCxNQUFNLEVBQUcsQ0FBQztJQUNWLEdBQUcsRUFBRyxDQUFDLEdBQUc7SUFDVixJQUFJLEVBQUUsQ0FBQyxDQUFDO0NBQ1QsQ0FBQyxDQUFDO0FBRUgsTUFBYSxVQUFVOztBQUF2QixnQ0FFQztBQURlLGtCQUFPLEdBQVcsR0FBRyxDQUFDO0FBR3RDLE1BQXFCLFNBQVM7SUFFMUIsSUFBSTtRQUNBLE9BQU8sV0FBVyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJO1FBQ0EsT0FBTyxXQUFXLENBQUM7SUFDdkIsQ0FBQztJQUlLLFFBQVEsQ0FBQyxHQUFvQixFQUFFLEdBQW1COztZQUNwRCxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLG9CQUFvQixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLG9CQUFvQixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQztnQkFDNUcsT0FBTztZQUVkLElBQUksUUFBZ0IsQ0FBQztZQUNyQixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQzlDLElBQUksR0FBRyxD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