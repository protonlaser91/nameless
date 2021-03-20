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
class getbanlist {
    constructor() {
        this.aliases = ["help"];
    }
    name() {
        return "help";
    }
    help() {
        return "help";
    }
    cooldown() {
        return 2;
    }
    isThisCommand(command) {
        return this.aliases.includes(command);
    }
    runCommand(args, msg, Bot) {
        return __awaiter(this, void 0, void 0, function* () {
            const embed = new Discord.MessageEmbed()
                .setTitle('Eclipse Help is Here!')
                .setDescription('Here are a list of our commands!')
                .setColor('#0ae090')
                .setAuthor(Bot.user.username, Bot.user.avatarURL())
                .addFields({ name: '!banlist (MOD ONLY)', value: 'Replies with the list of banned users from the server' }, { name: '!me, !user, !profile', value: 'Gives your sentiment score and total profanity strikes' }, { name: '!me, !user, !profile @username (MOD ONLY)', value: 'Gives the mentioned member\'s sentiment score and total profanity strikes' }, { name: '!strike @username (MOD ONLY)', value: 'A manual strike for mods to use on members' }, { name: '!strike @username reset (MOD ONLY)', value: 'Resets a member\'s strikes' }, { name: '!senti, !sentiment \'any messsage\'', value: 'Our bot reports back the sentiment score of the given message in a clean format' })
                .addFields({ name: '!leaderboard, !lb', value: 'Gives leaderboard of the top ten most positive members based on sentiment scores' })
                .setThumbnail('https://wallpapercave.com/wp/wp4055520.png')
                .setTimestamp();
            msg.channel.send(embed);
        });
    }
}
exports.default = getbanlist;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9oZWxwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXNDO0FBS3RDLE1BQXFCLFVBQVU7SUFBL0I7UUFFcUIsWUFBTyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7SUFpRHZDLENBQUM7SUEvQ0csSUFBSTtRQUNBLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxJQUFJO1FBQ0EsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFDRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLEdBQW9CLEVBQUUsR0FBbUI7O1lBQ3RFLE1BQU0sS0FBSyxHQUFHLElBQUksT0FBTyxDQUFDLFlBQVksRUFBRTtpQkFDdkMsUUFBUSxDQUFDLHVCQUF1QixDQUFDO2lCQUNqQyxjQUFjLENBQUMsa0NBQWtDLENBQUM7aUJBQ2xELFFBQVEsQ0FBQyxTQUFTLENBQUM7aUJBQ25CLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsSUFBSyxDQUFDLFNBQVMsRUFBRyxDQUFDO2lCQUdyRCxTQUFTLENBQ04sRUFBRSxJQUFJLEVBQUUscUJBQXFCLEVBQUUsS0FBSyxFQUFFLHVEQUF1RCxFQUFFLEVBRy9GLEVBQUUsSUFBSSxFQUFFLHNCQUFzQixFQUFFLEtBQUssRUFBRSx3REFBd0QsRUFBRSxFQUNqRyxFQUFFLElBQUksRUFBRSwyQ0FBMkMsRUFBRSxLQUFLLEVBQUUsMkVBQTJFLEVBQUUsRUFDekksRUFBRSxJQUFJLEVBQUUsOEJBQThCLEVBQUUsS0FBSyxFQUFFLDRDQUE0QyxFQUFFLEVBQzdGLEVBQUUsSUFBSSxFQUFFLG9DQUFvQyxFQUFFLEtBQUssRUFBRSw0QkFBNEIsRUFBRSxFQUNuRixFQUFFLElBQUksRUFBRSxxQ0FBcUMsRUFBRSxLQUFLLEVBQUUsaUZBQWlGLEVBQUUsQ0FDNUk7aUJBRUEsU0FBUyxDQUNOLEVBQUUsSUFBSSxFQUFDLG1CQUFtQixFQUFFLEtBQUssRUFBQyxrRkFBa0YsRUFBQyxDQUN4SDtpQkFDQSxZQUFZLENBQUMsNENBQTRDLENBQUM7aUJBQzFELFlBQVksRUFBRSxDQUFBO1lBRW5CLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBTTVCLENBQUM7S0FBQTtDQUNBO0FBbkRELDZCQW1EQyJ9