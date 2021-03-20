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
            if (mentionedUser != null && mentionedUser != undefined) {
                if (!(msg.member.roles.cache.has('god'))) {
                    msg.author.send("Unfortunately, you cannot access this method because you do not have adminstrator privileges in the server. Instead, we put your profile!");
                    targetedUser = msg.author;
                }
                else {
                    targetedUser = mentionedUser;
                }
            }
            else {
                targetedUser = msg.author;
            }
            let sentimentScore = db.get(`${targetedUser.id}.sentiment`);
            let rounded = Math.round(sentimentScore * 2) / 2;
            let color = asentiment_1.colorMap.get(asentiment_1.values.revGet(rounded));
            let strikes = db.get(`${targetedUser.id}.strikes`);
            let moneyEmbed = new Discord.MessageEmbed()
                .setTitle(`${targetedUser.username}'s Sentiment`)
                .setAuthor(targetedUser.username, targetedUser.avatarURL())
                .setColor(color)
                .addField(`Sentiment`, `**${asentiment_1.elegance.get(asentiment_1.values.revGet(rounded))}**`, true)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9wcm9maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0Esc0NBQXNDO0FBRXRDLCtCQUErQjtBQUMvQixxREFBa0U7QUFFbEUsTUFBcUIsT0FBTztJQUE1QjtRQUVxQixZQUFPLEdBQUcsQ0FBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxDQUFBO0lBZ0V0RCxDQUFDO0lBOURHLElBQUk7UUFDQSxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBSTtRQUNBLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBQ0QsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBQ0ssVUFBVSxDQUFDLElBQWMsRUFBRSxHQUFvQixFQUFFLEdBQW1COztZQUV0RSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBQztnQkFDekQsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDLE1BQU0sR0FBRywwQkFBMEIsQ0FBQyxDQUFDO2dCQUNuRixHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQzthQUNwRDtZQUVELE1BQU0sYUFBYSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRWpELElBQUksWUFBWSxDQUFDO1lBRWpCLElBQUcsYUFBYSxJQUFFLElBQUksSUFBRSxhQUFhLElBQUUsU0FBUyxFQUFDO2dCQUM3QyxJQUFHLENBQUMsQ0FBQyxHQUFJLENBQUMsTUFBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUM7b0JBQ3RDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDJJQUEySSxDQUFDLENBQUE7b0JBQzVKLFlBQVksR0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO2lCQUMzQjtxQkFDRztvQkFDQSxZQUFZLEdBQUMsYUFBYSxDQUFDO2lCQUM5QjthQUNKO2lCQUNHO2dCQUNBLFlBQVksR0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO2FBQzNCO1lBSUQsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFlBQVksQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFBO1lBQzNELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQTtZQUM1QyxJQUFJLEtBQUssR0FBRyxxQkFBUSxDQUFDLEdBQUcsQ0FBQyxtQkFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO1lBQ2hELElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxZQUFZLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQTtZQUNsRCxJQUFJLFVBQVUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxZQUFZLEVBQUU7aUJBQ3RDLFFBQVEsQ0FBQyxHQUFHLFlBQVksQ0FBQyxRQUFRLGNBQWMsQ0FBQztpQkFDaEQsU0FBUyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRyxDQUFDO2lCQUMxRCxRQUFRLENBQUMsS0FBSyxDQUFDO2lCQUNmLFFBQVEsQ0FBQyxXQUFXLEVBQUMsS0FBSyxxQkFBUSxDQUFDLEdBQUcsQ0FBQyxtQkFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDO2lCQUN4RSxRQUFRLENBQUMsU0FBUyxFQUFDLEtBQUssT0FBTyxJQUFJLEVBQUMsSUFBSSxDQUFDO2lCQUN6QyxZQUFZLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRyxDQUFDO2lCQUN2QyxZQUFZLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztpQkFDeEIsU0FBUyxDQUFDLHdCQUF3QixFQUFFLHlGQUF5RixDQUFDLENBQUM7WUFFcEksR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBa0IsRUFBRSxFQUFFO2dCQUNyRCxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3hDLENBQUMsQ0FBQyxDQUFBO1FBSU4sQ0FBQztLQUFBO0NBRUo7QUFsRUQsMEJBa0VDIn0=