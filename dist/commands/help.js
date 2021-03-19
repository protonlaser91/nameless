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
                .setColor('#0099ff')
                .setAuthor(Bot.user.username, Bot.user.avatarURL())
                .addFields({ name: '!banlist', value: 'DMs the mod with the list of banned users from the server' }, { name: '!strike', value: 'A manual strike to a user' })
                .addFields({ name: '!getleaderboard', value: 'Gives leaderboard of the top ten most positive members based on sentiment scores' })
                .setTimestamp();
            msg.channel.send(embed);
        });
    }
}
exports.default = getbanlist;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9oZWxwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXNDO0FBS3RDLE1BQXFCLFVBQVU7SUFBL0I7UUFFcUIsWUFBTyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7SUEyQ3ZDLENBQUM7SUF6Q0csSUFBSTtRQUNBLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxJQUFJO1FBQ0EsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFDRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLEdBQW9CLEVBQUUsR0FBbUI7O1lBQ3RFLE1BQU0sS0FBSyxHQUFHLElBQUksT0FBTyxDQUFDLFlBQVksRUFBRTtpQkFDdkMsUUFBUSxDQUFDLHVCQUF1QixDQUFDO2lCQUNqQyxjQUFjLENBQUMsa0NBQWtDLENBQUM7aUJBQ2xELFFBQVEsQ0FBQyxTQUFTLENBQUM7aUJBQ25CLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsSUFBSyxDQUFDLFNBQVMsRUFBRyxDQUFDO2lCQUdyRCxTQUFTLENBQ04sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSwyREFBMkQsRUFBRSxFQUN4RixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLDJCQUEyQixFQUFFLENBQzFEO2lCQUVBLFNBQVMsQ0FDTixFQUFFLElBQUksRUFBQyxpQkFBaUIsRUFBRSxLQUFLLEVBQUMsa0ZBQWtGLEVBQUMsQ0FDdEg7aUJBRUEsWUFBWSxFQUFFLENBQUE7WUFFbkIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFNNUIsQ0FBQztLQUFBO0NBQ0E7QUE3Q0QsNkJBNkNDIn0=