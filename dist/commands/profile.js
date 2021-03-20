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
class profile {
    constructor() {
        this.aliases = ["profile", "user", "me"];
    }
    name() {
        return "profile";
    }
    help() {
        return "profile";
    }
    cooldown() {
        return 2;
    }
    isThisCommand(command) {
        return this.aliases.includes(command);
    }
    runCommand(args, msg, Bot) {
        return __awaiter(this, void 0, void 0, function* () {
            if (args[0] != null && args[0].toLowerCase().includes('dev')) {
                msg.reply(db.get(`${msg.author.id}.msgArray`).length + " items in the array bruh");
                msg.reply(db.get(`${msg.author.id}.recycleAmt`));
            }
            const mentionedUser = msg.mentions.users.first();
            let targetedUser;
            if (mentionedUser != null) {
                targetedUser = mentionedUser;
            }
            else {
                targetedUser = msg.author;
            }
            let sentimentScore = db.get(`${targetedUser.id}.sentiment`);
            let strikes = db.get(`${targetedUser.id}.strikes`);
            let moneyEmbed = new Discord.MessageEmbed()
                .setTitle(`${targetedUser.username}'s Sentiment`)
                .setAuthor(targetedUser.username, targetedUser.avatarURL())
                .setColor('##00fff9')
                .addField(`Sentiment`, `**${asentiment_1.values.revGet(sentimentScore)}**`, true)
                .addField(`Strikes`, `**${strikes}**`, true)
                .setThumbnail(targetedUser.avatarURL())
                .setTimestamp(new Date())
                .setFooter('bruh h1gh Technologies', 'https://cdn.discordapp.com/attachments/819032675469361154/822502319147974666/lunges.png');
            msg.channel.send(moneyEmbed).then((m) => {
                setTimeout(() => m.delete(), 20000);
            });
        });
    }
}
exports.default = profile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9wcm9maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0Esc0NBQXNDO0FBRXRDLCtCQUErQjtBQUMvQixxREFBOEM7QUFFOUMsTUFBcUIsT0FBTztJQUE1QjtRQUVxQixZQUFPLEdBQUcsQ0FBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxDQUFBO0lBb0R0RCxDQUFDO0lBbERHLElBQUk7UUFDQSxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBSTtRQUNBLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBQ0QsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBQ0ssVUFBVSxDQUFDLElBQWMsRUFBRSxHQUFvQixFQUFFLEdBQW1COztZQUN0RSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBQztnQkFDekQsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDLE1BQU0sR0FBRywwQkFBMEIsQ0FBQyxDQUFDO2dCQUNuRixHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQzthQUN4RDtZQUNHLE1BQU0sYUFBYSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRWpELElBQUksWUFBWSxDQUFDO1lBQ2pCLElBQUcsYUFBYSxJQUFFLElBQUksRUFBQztnQkFDbkIsWUFBWSxHQUFDLGFBQWEsQ0FBQzthQUU5QjtpQkFDRztnQkFDQSxZQUFZLEdBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQzthQUUzQjtZQUNELElBQUksY0FBYyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxZQUFZLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQTtZQUMzRCxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUE7WUFDbEQsSUFBSSxVQUFVLEdBQUcsSUFBSSxPQUFPLENBQUMsWUFBWSxFQUFFO2lCQUN0QyxRQUFRLENBQUMsR0FBRyxZQUFZLENBQUMsUUFBUSxjQUFjLENBQUM7aUJBQ2hELFNBQVMsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUcsQ0FBQztpQkFDMUQsUUFBUSxDQUFDLFVBQVUsQ0FBQztpQkFDcEIsUUFBUSxDQUFDLFdBQVcsRUFBQyxLQUFLLG1CQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDO2lCQUNqRSxRQUFRLENBQUMsU0FBUyxFQUFDLEtBQUssT0FBTyxJQUFJLEVBQUMsSUFBSSxDQUFDO2lCQUN6QyxZQUFZLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRyxDQUFDO2lCQUN2QyxZQUFZLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztpQkFDeEIsU0FBUyxDQUFDLHdCQUF3QixFQUFFLHlGQUF5RixDQUFDLENBQUM7WUFFcEksR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBa0IsRUFBRSxFQUFFO2dCQUNyRCxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3hDLENBQUMsQ0FBQyxDQUFBO1FBSU4sQ0FBQztLQUFBO0NBRUo7QUF0REQsMEJBc0RDIn0=