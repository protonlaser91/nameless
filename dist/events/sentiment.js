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
exports.credits = exports.values = void 0;
const Discord = require("discord.js");
var https = require('follow-redirects').https;
var fs = require('fs');
const db = require("quick.db");
exports.values = {
    "P+": 1,
    "P": 0.5,
    "NEU": 0,
    "NONE": 0,
    "N": -0.5,
    "N+": -1,
};
exports.credits = NaN;
class sentiment {
    constructor() {
        this._command = "sentiment";
    }
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
                let body1;
                var req = https.request(options, function (res) {
                    var chunks = [];
                    res.on("data", function (chunk) {
                        chunks.push(chunk);
                    });
                    res.on("end", function (chunk) {
                        body1 = JSON.parse(Buffer.concat(chunks).toString());
                        let score = exports.values[body1[`score_tag`]];
                        let recycle = db.get(`${msg.author.id}.recycleAmt`);
                        msg.channel.send("new updated score: " + 1 / (recycle + 1) * score + recycle / (recycle + 1) * db.get(`${msg.author.id}.sentiment`));
                        db.set(`${msg.author.id}.sentiment`, 1 / (recycle + 1) * score + recycle / (recycle + 1) * db.get(`${msg.author.id}.sentiment`));
                    });
                    res.on("error", function (error) {
                        console.error(error);
                    });
                });
                req.end();
                db.set(`${msg.author.id}.msgArray`, []);
            }
            var options = {
                'method': 'POST',
                'hostname': 'api.meaningcloud.com',
                'path': `/sentiment-2.1?key=bb7856b3cc9b538b7534467a7afbea0b&lang=en&txt=${encodeURI(msg.content)}&model=test`,
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
                    let score = body[`score_tag`];
                    let colorScheme = () => {
                        let j = () => {
                            var newSize = 16777214 - 2;
                            var oldSize = 1 - (-1);
                            var oldScale = exports.values[score] - (-1);
                            return (newSize * oldScale / oldSize) + 2;
                        };
                        return Math.floor(j());
                    };
                    const sentiment = new Discord.MessageEmbed()
                        .setAuthor(msg.author.username, msg.author.avatarURL(), ``)
                        .setColor(colorScheme())
                        .addField('Sentiment', score, true)
                        .addField('Subjectivity', body[`subjectivity`], true)
                        .addField('Irony', body[`irony`], true)
                        .addField('Agreement', body[`agreement`], true)
                        .setFooter(`${body[`confidence`]}% confident`, Bot.user.avatarURL())
                        .setTimestamp(new Date());
                    msg.channel.send(sentiment);
                    exports.credits = body['status']['remaining_credits'];
                });
                res.on("error", function (error) {
                    console.error(error);
                });
            });
            req.end();
        });
    }
}
exports.default = sentiment;
function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VudGltZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2V2ZW50cy9zZW50aW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXNDO0FBRXRDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUM5QyxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdkIsK0JBQStCO0FBRXBCLFFBQUEsTUFBTSxHQUFnQztJQUMvQyxJQUFJLEVBQUUsQ0FBQztJQUNQLEdBQUcsRUFBRSxHQUFHO0lBQ1IsS0FBSyxFQUFHLENBQUM7SUFDVCxNQUFNLEVBQUcsQ0FBQztJQUNWLEdBQUcsRUFBRyxDQUFDLEdBQUc7SUFDVixJQUFJLEVBQUUsQ0FBQyxDQUFDO0NBQ1QsQ0FBQTtBQUNVLFFBQUEsT0FBTyxHQUFXLEdBQUcsQ0FBQTtBQUVoQyxNQUFxQixTQUFTO0lBQTlCO1FBR3FCLGFBQVEsR0FBRyxXQUFXLENBQUE7SUFvSHZDLENBQUM7SUFsSEQsSUFBSTtRQUNBLE9BQU8sV0FBVyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJO1FBQ0EsT0FBTyxXQUFXLENBQUM7SUFDdkIsQ0FBQztJQUlLLFFBQVEsQ0FBQyxHQUFvQixFQUFFLEdBQW1COztZQUNwRCxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLG9CQUFvQixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLG9CQUFvQixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQztnQkFDNUcsT0FBTztZQUVkLElBQUksUUFBZ0IsQ0FBQztZQUNyQixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQzlDLElBQUksR0FBRyxD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