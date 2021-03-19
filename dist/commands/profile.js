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
class profile {
    constructor() {
        this._command = "profile";
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
        return command === this._command;
    }
    runCommand(args, msg, Bot) {
        return __awaiter(this, void 0, void 0, function* () {
            if (args[0] != null && args[0].toLowerCase().includes('dev')) {
                msg.reply(db.get(`${msg.author.id}.msgArray`).length + " items in the array bruh");
                msg.reply(db.get(`${msg.author.id}.recycleAmt`));
            }
            let sentimentScore = db.get(`${msg.author.id}.sentiment`);
            let strikes = db.get(`${msg.author.id}.strikes`);
            let moneyEmbed = new Discord.MessageEmbed()
                .setTitle(`${msg.author.username}'s Sentiment`)
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setColor([0, 200, 0])
                .addField(`Sentiment`, `**${sentimentScore}**`, true)
                .addField(`Strikes`, `**${strikes}**`, true)
                .setThumbnail(msg.author.avatarURL())
                .setTimestamp(new Date())
                .setFooter('bruh h1gh Technologies', 'https://cdn.discordapp.com/attachments/819032675469361154/822502319147974666/lunges.png');
            msg.channel.send(moneyEmbed).then((m) => {
                setTimeout(() => m.delete(), 20000);
            });
        });
    }
}
exports.default = profile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9wcm9maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0Esc0NBQXNDO0FBRXRDLCtCQUErQjtBQUUvQixNQUFxQixPQUFPO0lBQTVCO1FBRXFCLGFBQVEsR0FBRyxTQUFTLENBQUE7SUEyQ3pDLENBQUM7SUF6Q0csSUFBSTtRQUNBLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUFJO1FBQ0EsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFDRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLEdBQW9CLEVBQUUsR0FBbUI7O1lBQ3RFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFDO2dCQUN6RCxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUMsTUFBTSxHQUFHLDBCQUEwQixDQUFDLENBQUM7Z0JBQ25GLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO2FBQ3hEO1lBRUcsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQTtZQUN6RCxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFBO1lBQ2hELElBQUksVUFBVSxHQUFHLElBQUksT0FBTyxDQUFDLFlBQVksRUFBRTtpQkFDdEMsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLGNBQWMsQ0FBQztpQkFDOUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFHLENBQUM7aUJBQ3RELFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ25CLFFBQVEsQ0FBQyxXQUFXLEVBQUMsS0FBSyxjQUFjLElBQUksRUFBQyxJQUFJLENBQUM7aUJBQ2xELFFBQVEsQ0FBQyxTQUFTLEVBQUMsS0FBSyxPQUFPLElBQUksRUFBQyxJQUFJLENBQUM7aUJBQ3pDLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRyxDQUFDO2lCQUNyQyxZQUFZLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztpQkFDeEIsU0FBUyxDQUFDLHdCQUF3QixFQUFFLHlGQUF5RixDQUFDLENBQUM7WUFFcEksR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBa0IsRUFBRSxFQUFFO2dCQUNyRCxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3hDLENBQUMsQ0FBQyxDQUFBO1FBSU4sQ0FBQztLQUFBO0NBRUo7QUE3Q0QsMEJBNkNDIn0=