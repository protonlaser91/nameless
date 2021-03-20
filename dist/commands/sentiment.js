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
const Discord = require("discord.js");
var https = require('follow-redirects').https;
var fs = require('fs');
const asentiment_1 = require("../events/asentiment");
class sentiment {
    constructor() {
        this.aliases = ["sentiment", "senti"];
    }
    name() {
        return "sentiment";
    }
    help() {
        return "sentiment";
    }
    cooldown() {
        return 2;
    }
    isThisCommand(command) {
        return this.aliases.includes(command);
    }
    runCommand(args, msg, Bot) {
        return __awaiter(this, void 0, void 0, function* () {
            var options = {
                'method': 'POST',
                'hostname': 'api.meaningcloud.com',
                'path': `/sentiment-2.1?key=bb7856b3cc9b538b7534467a7afbea0b&lang=en&txt=${encodeURI(args.join(" "))}&model=test`,
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
                            var oldScale = asentiment_1.values.get(score) - (-1);
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
                    asentiment_1.GlobalVars.credits = body['status']['remaining_credits'];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VudGltZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3NlbnRpbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUV0QyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDOUMsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBR3ZCLHFEQUEwRDtBQUUxRCxNQUFxQixTQUFTO0lBQTlCO1FBRXFCLFlBQU8sR0FBRyxDQUFDLFdBQVcsRUFBQyxPQUFPLENBQUMsQ0FBQTtJQXNFcEQsQ0FBQztJQXBFRyxJQUFJO1FBQ0EsT0FBTyxXQUFXLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUk7UUFDQSxPQUFPLFdBQVcsQ0FBQztJQUN2QixDQUFDO0lBRUQsUUFBUTtRQUNKLE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUNELGFBQWEsQ0FBQyxPQUFlO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsR0FBb0IsRUFBRSxHQUFtQjs7WUFDdEUsSUFBSSxPQUFPLEdBQUc7Z0JBQ1YsUUFBUSxFQUFFLE1BQU07Z0JBQ2hCLFVBQVUsRUFBRSxzQkFBc0I7Z0JBQ2xDLE1BQU0sRUFBRSxtRUFBbUUsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsYUFBYTtnQkFDakgsU0FBUyxFQUFFLEVBQ1Y7Z0JBQ0QsY0FBYyxFQUFFLEVBQUU7YUFDbkIsQ0FBQztZQUNGLElBQUksSUFBSSxDQUFDO1lBQ1QsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsVUFBVSxHQUEyRztnQkFDdEosSUFBSSxNQUFNLEdBQVUsRUFBRSxDQUFD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