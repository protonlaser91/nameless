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
exports.GlobalVars = exports.colorMap = exports.values = void 0;
var https = require('follow-redirects').https;
var fs = require('fs');
const db = require("quick.db");
const TwoWayMap_1 = require("../util/TwoWayMap");
exports.values = new TwoWayMap_1.default({
    "P+": 1,
    "P": 0.5,
    "NEU": 0,
    "NONE": NaN,
    "N": -0.5,
    "N+": -1,
});
exports.colorMap = new TwoWayMap_1.default({
    "P+": '#2cff00',
    "P": '#2da015',
    "NEU": '#84a7ac',
    "NONE": '#84a7ac',
    "N": '#f98b8b',
    "N+": '#ff0000',
});
class GlobalVars {
}
exports.GlobalVars = GlobalVars;
GlobalVars.credits = NaN;
class asentiment {
    name() {
        return "asentiment";
    }
    help() {
        return "asentiment";
    }
    runEvent(msg, Bot) {
        return __awaiter(this, void 0, void 0, function* () {
            if (msg.content.startsWith("!") || msg.content.length == 0)
                return;
            let totalMsg;
            let arr = db.get(`${msg.author.id}.msgArray`);
            if (arr.length < 2) {
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
                        if (score != NaN)
                            db.set(`${msg.author.id}.sentiment`, 1 / (recycle + 1) * score + recycle / (recycle + 1) * db.get(`${msg.author.id}.sentiment`));
                        db.add(`${msg.author.id}.recycleAmt`, 1);
                        msg.channel.send(`Sentiment score has been updated for user ${msg.author.username}, this round had ${score}`);
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
exports.default = asentiment;
function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNlbnRpbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ldmVudHMvYXNlbnRpbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDOUMsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZCLCtCQUErQjtBQUMvQixpREFBMEM7QUFFL0IsUUFBQSxNQUFNLEdBQWUsSUFBSSxtQkFBUyxDQUFDO0lBQzVDLElBQUksRUFBRSxDQUFDO0lBQ1AsR0FBRyxFQUFFLEdBQUc7SUFDUixLQUFLLEVBQUcsQ0FBQztJQUNULE1BQU0sRUFBRyxHQUFHO0lBQ1osR0FBRyxFQUFHLENBQUMsR0FBRztJQUNWLElBQUksRUFBRSxDQUFDLENBQUM7Q0FDVCxDQUFDLENBQUM7QUFFUSxRQUFBLFFBQVEsR0FBYyxJQUFJLG1CQUFTLENBQUM7SUFDN0MsSUFBSSxFQUFFLFNBQVM7SUFDZixHQUFHLEVBQUUsU0FBUztJQUNkLEtBQUssRUFBRyxTQUFTO0lBQ2pCLE1BQU0sRUFBRyxTQUFTO0lBQ2xCLEdBQUcsRUFBRyxTQUFTO0lBQ2YsSUFBSSxFQUFFLFNBQVM7Q0FDaEIsQ0FBQyxDQUFBO0FBRUYsTUFBYSxVQUFVOztBQUF2QixnQ0FFQztBQURlLGtCQUFPLEdBQVcsR0FBRyxDQUFDO0FBR3RDLE1BQXFCLFVBQVU7SUFFM0IsSUFBSTtRQUNBLE9BQU8sWUFBWSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJO1FBQ0EsT0FBTyxZQUFZLENBQUM7SUFDeEIsQ0FBQztJQUlLLFFBQVEsQ0FBQyxHQUFvQixFQUFFLEdBQW1COztZQUNwRCxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUM7Z0JB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