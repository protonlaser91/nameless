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
            let rounded = Math.round(userArray[ind][1] * 2) / 2;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhZGVyYm9hcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvbGVhZGVyYm9hcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFFdEMsK0JBQStCO0FBQy9CLHFEQUF1RDtBQVN2RCxTQUFTLEdBQUcsQ0FBQyxDQUFzQixFQUFFLENBQXNCO0lBQ3ZELElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNmLE9BQU8sQ0FBQyxDQUFDO0tBQ1o7U0FDSTtRQUNELE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDakM7QUFDTCxDQUFDO0FBRUQsTUFBcUIsV0FBVztJQUFoQztRQUVxQixZQUFPLEdBQUcsQ0FBQyxhQUFhLEVBQUMsSUFBSSxDQUFDLENBQUE7SUE4SW5ELENBQUM7SUE1SUcsSUFBSTtRQUNBLE9BQU8sYUFBYSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFJO1FBQ0EsT0FBTyxhQUFhLENBQUM7SUFDekIsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFDRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLEdBQW9CLEVBQUUsR0FBbUI7OztZQUN0RSxJQUFJLFNBQVMsR0FBSyxFQUFFLENBQUM7WUFDckIsSUFBSSxVQUFVLEdBQUMsR0FBRyxDQUFDLEtBQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUEsRUFBRTtn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