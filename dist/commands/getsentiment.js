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
class strike {
    constructor() {
        this.aliases = ["getsentiment"];
    }
    name() {
        return "getsentiment";
    }
    help() {
        return "getsentiment";
    }
    cooldown() {
        return 2;
    }
    isThisCommand(command) {
        return this.aliases.includes(command);
    }
    runCommand(args, msg, Bot) {
        return __awaiter(this, void 0, void 0, function* () {
            const mentionedUser = msg.mentions.users.first();
            let sentscore = db.get(`${mentionedUser.id}.sentiment`);
            let username = mentionedUser === null || mentionedUser === void 0 ? void 0 : mentionedUser.username;
            let picture = mentionedUser === null || mentionedUser === void 0 ? void 0 : mentionedUser.avatarURL;
            const embed = new Discord.MessageEmbed()
                .setTitle('Sentiment Score')
                .addFields({ name: username + '\'s score:', value: sentscore })
                .setThumbnail("" + picture)
                .setTimestamp();
            msg.reply(embed);
        });
    }
}
exports.default = strike;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0c2VudGltZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2dldHNlbnRpbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUV0QywrQkFBK0I7QUFFL0IsTUFBcUIsTUFBTTtJQUEzQjtRQUVxQixZQUFPLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQTtJQWtDL0MsQ0FBQztJQWhDRyxJQUFJO1FBQ0EsT0FBTyxjQUFjLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQUk7UUFDQSxPQUFPLGNBQWMsQ0FBQztJQUMxQixDQUFDO0lBRUQsUUFBUTtRQUNKLE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUNELGFBQWEsQ0FBQyxPQUFlO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsR0FBb0IsRUFBRSxHQUFtQjs7WUFDdEUsTUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDakQsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLGFBQWMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQ3pELElBQUksUUFBUSxHQUFHLGFBQWEsYUFBYixhQUFhLHVCQUFiLGFBQWEsQ0FBRSxRQUFRLENBQUM7WUFDdkMsSUFBSSxPQUFPLEdBQUcsYUFBYSxhQUFiLGFBQWEsdUJBQWIsYUFBYSxDQUFFLFNBQVMsQ0FBQztZQUV2QyxNQUFNLEtBQUssR0FBRyxJQUFJLE9BQU8sQ0FBQyxZQUFZLEVBQUU7aUJBQ25DLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQztpQkFDM0IsU0FBUyxDQUNKLEVBQUUsSUFBSSxFQUFFLFFBQVEsR0FBRyxZQUFZLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxDQUN0RDtpQkFDRixZQUFZLENBQUMsRUFBRSxHQUFDLE9BQU8sQ0FBQztpQkFDeEIsWUFBWSxFQUFFLENBQUE7WUFFZixHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXpCLENBQUM7S0FBQTtDQUNKO0FBcENELHlCQW9DQyJ9