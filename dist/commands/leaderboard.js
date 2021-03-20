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
const db = require("quick.db");
const asentiment_1 = require("../events/asentiment");
function cTC(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? 1 : -1;
    }
}
class leaderboard {
    constructor() {
        this.aliases = ["leaderboard", "lb"];
    }
    name() {
        return "leaderboard";
    }
    help() {
        return "leaderboard";
    }
    cooldown() {
        return 2;
    }
    isThisCommand(command) {
        return this.aliases.includes(command);
    }
    runCommand(args, msg, Bot) {
        return __awaiter(this, void 0, void 0, function* () {
            let userArray = [];
            let guildArray = msg.guild.members.cache.array().map(element => {
                return element.id;
            });
            for (const o of db.all()) {
                if (o.ID == "817230166824321054")
                    continue;
                if (guildArray.includes(o.ID)) {
                    let senti = o.data.sentiment;
                    if (senti == undefined || senti == NaN)
                        senti = 0;
                    userArray.push([Bot.users.cache.find(user => user.id === o.ID).username, senti]);
                }
            }
            userArray.sort(cTC);
            console.log(userArray);
            const embed = new Discord.MessageEmbed()
                .setTitle('Positivity Leaderboard!')
                .setDescription('Here are the top ten most positive people in the server!')
                .setColor('#0099ff')
                .setAuthor(Bot.user.username, Bot.user.avatarURL())
                .setThumbnail('https://i.imgur.com/aowYZQG.jpeg');
            var count;
            if (msg.guild.memberCount < 11) {
                count = msg.guild.memberCount - 1;
            }
            else {
                count = 10;
            }
            for (var i = 0; i < count; i++) {
                if (userArray[i][1] == undefined || userArray[i][1] == NaN) {
                    userArray[i][1] = 0;
                }
                let rounded = Math.round(userArray[i][1] * 2) / 2;
                if (i == 0) {
                    embed.addFields({ name: `<:first_place:822885876144275499>` + (i + 1) + '. ' + userArray[i][0], value: asentiment_1.values.revGet(rounded) + ': ' + userArray[i][1].toFixed(2) });
                }
                else if (i == 1) {
                    embed.addFields({ name: `<:second_place:822887005679648778>` + (i + 1) + '. ' + userArray[i][0], value: asentiment_1.values.revGet(rounded) + ': ' + userArray[i][1].toFixed(2) });
                }
                else if (i == 2) {
                    embed.addFields({ name: `<:third_place:822887031143137321>` + (i + 1) + '. ' + userArray[i][0], value: asentiment_1.values.revGet(rounded) + ': ' + userArray[i][1].toFixed(2) });
                }
                else {
                    embed.addFields({ name: i + 1 + '. ' + userArray[i][0], value: asentiment_1.values.revGet(rounded) + ': ' + userArray[i][1].toFixed(2) });
                }
            }
            for (var i = 0; i < userArray.length; i++) {
                let rounded = Math.round(userArray[i][1] * 2) / 2;
                if (userArray[i][0] == msg.author.username) {
                    embed.addFields({ name: 'Your place ' + (i + 1) + '. ' + msg.author.username, value: asentiment_1.values.revGet(rounded) + ': ' + userArray[i][1].toFixed(2) });
                    break;
                }
            }
            embed.setTimestamp();
            msg.channel.send(embed);
        });
    }
}
exports.default = leaderboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhZGVyYm9hcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvbGVhZGVyYm9hcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFFdEMsK0JBQStCO0FBQy9CLHFEQUE2QztBQVM3QyxTQUFTLEdBQUcsQ0FBQyxDQUFzQixFQUFFLENBQXNCO0lBQ3ZELElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNmLE9BQU8sQ0FBQyxDQUFDO0tBQ1o7U0FDSTtRQUNELE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDakM7QUFDTCxDQUFDO0FBRUQsTUFBcUIsV0FBVztJQUFoQztRQUVxQixZQUFPLEdBQUcsQ0FBQyxhQUFhLEVBQUMsSUFBSSxDQUFDLENBQUE7SUE0Rm5ELENBQUM7SUExRkcsSUFBSTtRQUNBLE9BQU8sYUFBYSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFJO1FBQ0EsT0FBTyxhQUFhLENBQUM7SUFDekIsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFDRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLEdBQW9CLEVBQUUsR0FBbUI7O1lBQ3RFLElBQUksU0FBUyxHQUFLLEVBQUUsQ0FBQztZQUNyQixJQUFJLFVBQVUsR0FBQyxHQUFHLENBQUMsS0FBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQSxFQUFFO2dC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