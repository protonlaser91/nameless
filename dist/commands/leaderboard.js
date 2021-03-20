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
                if (guildArray.includes(o.ID)) {
                    userArray.push([Bot.users.cache.find(user => user.id === o.ID).username, o.data.sentiment]);
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
            if (msg.guild.memberCount < 10) {
                count = msg.guild.memberCount;
            }
            else {
                count = 10;
            }
            for (var i = 0; i < count; i++) {
                if (userArray[i][0] == 'Eclipse') {
                    continue;
                }
                let rounded = Math.round(userArray[i][1] * 2) / 2;
                if (i == 0) {
                    embed.addFields({ name: `<:first_place:822885876144275499>` + (i + 1) + '. ' + userArray[i][0], value: asentiment_1.values.revGet(rounded) + ': ' + userArray[i][1] });
                }
                else if (i == 1) {
                    embed.addFields({ name: `<:second_place:822887005679648778>` + (i + 1) + '. ' + userArray[i][0], value: asentiment_1.values.revGet(rounded) + ': ' + userArray[i][1] });
                }
                else if (i == 2) {
                    embed.addFields({ name: `<:third_place:822887031143137321>` + (i + 1) + '. ' + userArray[i][0], value: asentiment_1.values.revGet(rounded) + ': ' + userArray[i][1] });
                }
                else {
                    embed.addFields({ name: i + 1 + '. ' + userArray[i][0], value: asentiment_1.values.revGet(rounded) + ': ' + userArray[i][1] });
                }
            }
            for (var i = 0; i < userArray.length; i++) {
                if (userArray[i][0] == msg.author.username && i > 10) {
                    embed.addFields({ name: msg.author.username, value: 'You\'re place is ' + i });
                }
            }
            embed.setTimestamp();
            msg.channel.send(embed);
        });
    }
}
exports.default = leaderboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhZGVyYm9hcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvbGVhZGVyYm9hcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFFdEMsK0JBQStCO0FBQy9CLHFEQUE2QztBQVM3QyxTQUFTLEdBQUcsQ0FBQyxDQUFzQixFQUFFLENBQXNCO0lBQ3ZELElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNmLE9BQU8sQ0FBQyxDQUFDO0tBQ1o7U0FDSTtRQUNELE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDakM7QUFDTCxDQUFDO0FBRUQsTUFBcUIsV0FBVztJQUFoQztRQUVxQixZQUFPLEdBQUcsQ0FBQyxhQUFhLEVBQUMsSUFBSSxDQUFDLENBQUE7SUF3Rm5ELENBQUM7SUF0RkcsSUFBSTtRQUNBLE9BQU8sYUFBYSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFJO1FBQ0EsT0FBTyxhQUFhLENBQUM7SUFDekIsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFDRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLEdBQW9CLEVBQUUsR0FBbUI7O1lBQ3RFLElBQUksU0FBUyxHQUFLLEVBQUUsQ0FBQztZQUNyQixJQUFJLFVBQVUsR0FBQyxHQUFHLENBQUMsS0FBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQSxFQUFFO2dC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