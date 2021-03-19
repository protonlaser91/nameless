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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VudGltZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2V2ZW50cy9zZW50aW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXNDO0FBRXRDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUM5QyxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdkIsK0JBQStCO0FBRXBCLFFBQUEsTUFBTSxHQUFnQztJQUMvQyxJQUFJLEVBQUUsQ0FBQztJQUNQLEdBQUcsRUFBRSxHQUFHO0lBQ1IsS0FBSyxFQUFHLENBQUM7SUFDVCxNQUFNLEVBQUcsQ0FBQztJQUNWLEdBQUcsRUFBRyxDQUFDLEdBQUc7SUFDVixJQUFJLEVBQUUsQ0FBQyxDQUFDO0NBQ1QsQ0FBQTtBQUNVLFFBQUEsT0FBTyxHQUFXLEdBQUcsQ0FBQTtBQUVoQyxNQUFxQixTQUFTO0lBQTlCO1FBR3FCLGFBQVEsR0FBRyxXQUFXLENBQUE7SUFtSHZDLENBQUM7SUFqSEQsSUFBSTtRQUNBLE9BQU8sV0FBVyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJO1FBQ0EsT0FBTyxXQUFXLENBQUM7SUFDdkIsQ0FBQztJQUlLLFFBQVEsQ0FBQyxHQUFvQixFQUFFLEdBQW1COztZQUNwRCxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLG9CQUFvQixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLG9CQUFvQixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQztnQkFDNUcsT0FBTztZQUVkLElBQUksUUFBZ0IsQ0FBQztZQUNyQixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQzlDLElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxFQUFFLEVBQUM7Z0JBQ1YsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxXQUFXLEVBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzFEO2lCQUFNO2dCQUVDLFFBQVEsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUUxQixJQUFJLE9BQU8sR0FBRztvQkFDWixRQUFRLEVBQUUsTUFBTTtvQkFDaEIsVUFBVSxFQUFFLHNCQUFzQjtvQkFDbEMsTUFBTSxFQUFFLG1FQUFtRSxTQUFTLENBQUMsUUFBUSxDQUFDLGFBQWE7b0JBQzNHLFNBQVMsRUFBRSxFQUNWO29CQUNELGNBQWMsRUFBRSxFQUFFO2lCQUNuQixDQUFDO2dCQUNGLElBQUksS0FBSyxDQUFDO2dCQUNWLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFVBQVUsR0FBMkc7b0JBQ3RKLElBQUksTUFBTSxHQUFVLEVBQUUsQ0FBQztvQkFFckIsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxLQUFVO3dCQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNyQixDQUFDLENBQUMsQ0FBQztvQkFFSCxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxVQUFVLEtBQVU7d0JBQ2xDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzt3QkFDcEQsSUFBSSxLQUFLLEdBQUcsY0FBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFBO3dCQUNyQyxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFBO3dCQUNuRCxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFlBQVksRUFDakMsQ0FBQyxHQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxPQUFPLEdBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FDdkYsQ0FBQztvQkFHSixDQUFDLENBQUMsQ0FBQztvQkFFSCxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLEtBQVU7d0JBQ2xDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3ZCLENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUVILEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDVixFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFdBQVcsRUFBQyxFQUFFLENBQUMsQ0FBQTthQUM3QztZQUdILElBQUksT0FBTyxHQUFHO2dCQUNaLFFBQVEsRUFBRSxNQUFNO2dCQUNoQixVQUFVLEVBQUUsc0JBQXNCO2dCQUNsQyxNQUFNLEVBQUUsbUVBQW1FLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWE7Z0JBQzlHLFNBQVMsRUFBRSxFQUNWO2dCQUNELGNBQWMsRUFBRSxFQUFFO2FBQ25CLENBQUM7WUFDRixJQUFJLElBQUksQ0FBQztZQUNULElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFVBQVUsR0FBMkc7Z0JBQ3RKLElBQUksTUFBTSxHQUFVLEVBQUUsQ0FBQztnQkFFckIsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxLQUFVO29CQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNyQixDQUFDLENBQUMsQ0FBQztnQkFFSCxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxVQUFVLEtBQVU7b0JBQ2xDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDbkQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO29CQUU3QixJQUFJLFdBQVcsR0FBRyxHQUFHLEVBQUU7d0JBQ3JCLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRTs0QkFDWCxJQUFJLE9BQU8sR0FBRyxRQUFRLEdBQUcsQ0FBQyxDQUFDOzRCQUMzQixJQUFJLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN2QixJQUFJLFFBQVEsR0FBVyxjQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUM1QyxPQUFPLENBQUMsT0FBTyxHQUFHLFFBQVEsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFXLENBQUM7d0JBRXhELENBQUMsQ0FBQTt3QkFDQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQVcsQ0FBQTtvQkFDbEMsQ0FBQyxDQUFBO29CQUVELE1BQU0sU0FBUyxHQUFHLElBQUksT0FBTyxDQUFDLFlBQVksRUFBRTt5QkFDL0IsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFHLEVBQUMsRUFBRSxDQUFDO3lCQUN6RCxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7eUJBQ3ZCLFFBQVEsQ0FBQyxXQUFXLEVBQUMsS0FBSyxFQUFDLElBQUksQ0FBQzt5QkFDaEMsUUFBUSxDQUFDLGNBQWMsRUFBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUMsSUFBSSxDQUFDO3lCQUNsRCxRQUFRLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLENBQUM7eUJBQ3BDLFFBQVEsQ0FBQyxXQUFXLEVBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFDLElBQUksQ0FBQzt5QkFDNUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUMsR0FBRyxDQUFDLElBQUssQ0FBQyxTQUFTLEVBQUcsQ0FBQzt5QkFDcEUsWUFBWSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztvQkFDcEMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBRWxDLGVBQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtnQkFDMUMsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxLQUFVO29CQUNsQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN2QixDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRVIsQ0FBQztLQUFBO0NBRUo7QUF0SEwsNEJBc0hLO0FBQ0QsU0FBUyxPQUFPLENBQUMsR0FBVyxFQUFDLEdBQVc7SUFFaEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQyxDQUFDLEdBQUcsR0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFDLENBQUM7QUFDekQsQ0FBQyJ9