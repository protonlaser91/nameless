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
    if (isNaN(a[1]))
        return 1;
    if (isNaN(b[1]))
        return -1;
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
        var _a;
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
                    if (senti == undefined || senti == null)
                        senti = NaN;
                    userArray.push([o.ID, senti]);
                }
            }
            userArray.sort(cTC);
            const embed = new Discord.MessageEmbed()
                .setTitle('Positivity Leaderboard!')
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
            let bruh = "ten";
            switch (count) {
                case 1:
                    bruh = "";
                    break;
                case 2:
                    bruh = "two";
                    break;
                case 3:
                    bruh = "three";
                    break;
                case 4:
                    bruh = "four";
                    break;
                case 5:
                    bruh = "five";
                    break;
                case 6:
                    bruh = "six";
                    break;
                case 7:
                    bruh = "seven";
                    break;
                case 8:
                    bruh = "eight";
                    break;
                case 9:
                    bruh = "nine";
                    break;
            }
            embed.setDescription(`Here are the top ${bruh} most positive people in the server!`);
            let average = 0;
            for (const c of userArray) {
                if (!isNaN(c[1]))
                    average += c[1];
            }
            embed.addField(`Average Server Sentiment: `, `${(average / userArray.length).toFixed(2)} (${asentiment_1.elegance.get(asentiment_1.values.revGet(Math.round(average * 2) / 2))})`);
            for (var i = 0; i < count; i++) {
                let username = (_a = Bot.users.cache.find(user => user.id === userArray[i][0])) === null || _a === void 0 ? void 0 : _a.username;
                let rounded;
                if (isNaN(userArray[i][1])) {
                    rounded = NaN;
                    userArray[i][1] = 0;
                }
                else
                    rounded = Math.round(userArray[i][1] * 2) / 2;
                let initializer = "";
                if (i == 0)
                    initializer = `<:first_place:822885876144275499>`;
                else if (i == 1)
                    initializer = `<:second_place:822887005679648778>`;
                else if (i == 2)
                    initializer = `<:third_place:822887031143137321>`;
                if (userArray[i][0] == msg.author.id)
                    embed.addFields({ name: `${initializer} **#${(i + 1)}: ${username}**`, value: `**${userArray[i][1].toFixed(2)} (${asentiment_1.elegance.get(asentiment_1.values.revGet(rounded))})**` });
                else
                    embed.addFields({ name: `${initializer} #${(i + 1)}: ${username}`, value: `${userArray[i][1].toFixed(2)} (${asentiment_1.elegance.get(asentiment_1.values.revGet(rounded))})` });
            }
            embed.setTimestamp();
            let ind = this.search(userArray, msg.author.id);
            let rounded = db.get(`${msg.author.id}.recycleAmt`) == 0 ? NaN : Math.round(userArray[ind][1] * 2) / 2;
            let initializer = "";
            if (ind == 0)
                initializer = `<:first_place:822885876144275499>`;
            else if (ind == 1)
                initializer = `<:second_place:822887005679648778>`;
            else if (ind == 2)
                initializer = `<:third_place:822887031143137321>`;
            embed.addField(`${initializer} **#${ind + 1}: ${msg.author.username}**`, `**${userArray[ind][1].toFixed(2)} (${asentiment_1.elegance.get(asentiment_1.values.revGet(rounded))})**`);
            msg.channel.send(embed);
        });
    }
    search(array, targetValue) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][0] == targetValue)
                return i;
        }
        return -1;
    }
}
exports.default = leaderboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhZGVyYm9hcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvbGVhZGVyYm9hcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFFdEMsK0JBQStCO0FBQy9CLHFEQUF1RDtBQVN2RCxTQUFTLEdBQUcsQ0FBQyxDQUFhLEVBQUUsQ0FBYTtJQUNyQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDWCxPQUFPLENBQUMsQ0FBQztJQUNiLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNYLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFFZCxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDZixPQUFPLENBQUMsQ0FBQztLQUNaO1NBQ0k7UUFDRCxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2pDO0FBQ0wsQ0FBQztBQUVELE1BQXFCLFdBQVc7SUFBaEM7UUFFcUIsWUFBTyxHQUFHLENBQUMsYUFBYSxFQUFDLElBQUksQ0FBQyxDQUFBO0lBOEluRCxDQUFDO0lBNUlHLElBQUk7UUFDQSxPQUFPLGFBQWEsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBSTtRQUNBLE9BQU8sYUFBYSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBQ0QsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxHQUFvQixFQUFFLEdBQW1COzs7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