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
    "NONE": NaN,
    "N": -0.5,
    "N+": -1,
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
            if (msg.content.startsWith("!"))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNlbnRpbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ldmVudHMvYXNlbnRpbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDOUMsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZCLCtCQUErQjtBQUMvQixpREFBMEM7QUFFL0IsUUFBQSxNQUFNLEdBQWUsSUFBSSxtQkFBUyxDQUFDO0lBQzVDLElBQUksRUFBRSxDQUFDO0lBQ1AsR0FBRyxFQUFFLEdBQUc7SUFDUixLQUFLLEVBQUcsQ0FBQztJQUNULE1BQU0sRUFBRyxHQUFHO0lBQ1osR0FBRyxFQUFHLENBQUMsR0FBRztJQUNWLElBQUksRUFBRSxDQUFDLENBQUM7Q0FDVCxDQUFDLENBQUM7QUFFSCxNQUFhLFVBQVU7O0FBQXZCLGdDQUVDO0FBRGUsa0JBQU8sR0FBVyxHQUFHLENBQUM7QUFHdEMsTUFBcUIsVUFBVTtJQUUzQixJQUFJO1FBQ0EsT0FBTyxZQUFZLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQUk7UUFDQSxPQUFPLFlBQVksQ0FBQztJQUN4QixDQUFDO0lBSUssUUFBUSxDQUFDLEdBQW9CLEVBQUUsR0FBbUI7O1lBQ3BELElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDO2dCQUN4QixPQUFPO1lBRWQsSUFBSSxRQUFnQixDQUFDO1lBQ3JCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDOUMsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQztnQkFDVCxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFdB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