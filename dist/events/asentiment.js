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
exports.GlobalVars = exports.elegance = exports.colorMap = exports.values = void 0;
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
exports.elegance = new TwoWayMap_1.default({
    "P+": 'Very Positive',
    "P": 'Positive',
    "NEU": 'Neutral',
    "NONE": 'Not Enough Data',
    "N": 'Negative',
    "N+": 'Very Negative',
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
            if (arr.length < 4) {
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
                        try {
                            body = JSON.parse(Buffer.concat(chunks).toString());
                        }
                        catch (_a) {
                            console.error();
                            return;
                        }
                        let score = exports.values.get(body[`score_tag`]);
                        let recycle = db.get(`${msg.author.id}.recycleAmt`);
                        if (!isNaN(score)) {
                            db.set(`${msg.author.id}.sentiment`, 1 / (recycle + 1) * score + recycle / (recycle + 1) * db.get(`${msg.author.id}.sentiment`));
                            db.add(`${msg.author.id}.recycleAmt`, 1);
                        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNlbnRpbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ldmVudHMvYXNlbnRpbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDOUMsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZCLCtCQUErQjtBQUMvQixpREFBMEM7QUFFL0IsUUFBQSxNQUFNLEdBQWUsSUFBSSxtQkFBUyxDQUFDO0lBQzVDLElBQUksRUFBRSxDQUFDO0lBQ1AsR0FBRyxFQUFFLEdBQUc7SUFDUixLQUFLLEVBQUcsQ0FBQztJQUNULE1BQU0sRUFBRyxHQUFHO0lBQ1osR0FBRyxFQUFHLENBQUMsR0FBRztJQUNWLElBQUksRUFBRSxDQUFDLENBQUM7Q0FDVCxDQUFDLENBQUM7QUFFUSxRQUFBLFFBQVEsR0FBYyxJQUFJLG1CQUFTLENBQUM7SUFDN0MsSUFBSSxFQUFFLFNBQVM7SUFDZixHQUFHLEVBQUUsU0FBUztJQUNkLEtBQUssRUFBRyxTQUFTO0lBQ2pCLE1BQU0sRUFBRyxTQUFTO0lBQ2xCLEdBQUcsRUFBRyxTQUFTO0lBQ2YsSUFBSSxFQUFFLFNBQVM7Q0FDaEIsQ0FBQyxDQUFBO0FBRVMsUUFBQSxRQUFRLEdBQWMsSUFBSSxtQkFBUyxDQUFDO0lBQzdDLElBQUksRUFBRSxlQUFlO0lBQ3JCLEdBQUcsRUFBRSxVQUFVO0lBQ2YsS0FBSyxFQUFHLFNBQVM7SUFDakIsTUFBTSxFQUFHLGlCQUFpQjtJQUMxQixHQUFHLEVBQUcsVUFBVTtJQUNoQixJQUFJLEVBQUUsZUFBZTtDQUN0QixDQUFDLENBQUE7QUFFRixNQUFhLFVBQVU7O0FBQXZCLGdDQUVDO0FBRGUsa0JBQU8sR0FBVyxHQUFHLENBQUM7QUFHdEMsTUFBcUIsVUFBVTtJQUUzQixJQUFJO1FBQ0EsT0FBTyxZQUFZLENBQUM7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