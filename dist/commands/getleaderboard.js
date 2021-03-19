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
let usersArray = {
    "fanman": 0.2,
    "sanjit": 4,
    "arnav": 1.2,
    "fairy": 2,
};
class getleaderboard {
    constructor() {
        this._command = "getleaderboard";
    }
    name() {
        return "getleaderboard";
    }
    help() {
        return "getleaderboard";
    }
    cooldown() {
        return 2;
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msg, Bot) {
        return __awaiter(this, void 0, void 0, function* () {
            const embed = new Discord.MessageEmbed()
                .setTitle('Positivity Leaderboard!')
                .setDescription('Here are the top ten most positive people in the server!')
                .setColor('#0099ff')
                .setAuthor(Bot.user.username, Bot.user.avatarURL())
                .setImage('https://i.imgur.com/aowYZQG.jpeg')
                .addFields({ name: usersArray[0], value: usersArray[0] }, { name: 'my field title2', value: 'some stuff' }, { name: 'my field title3', value: 'some stuff' })
                .setTimestamp();
            msg.channel.send(embed);
        });
    }
}
exports.default = getleaderboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0bGVhZGVyYm9hcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvZ2V0bGVhZGVyYm9hcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFJdEMsSUFBSyxVQUFVLEdBQXdCO0lBQ25DLFFBQVEsRUFBRSxHQUFHO0lBQ2IsUUFBUSxFQUFFLENBQUM7SUFDWCxPQUFPLEVBQUUsR0FBRztJQUNaLE9BQU8sRUFBRSxDQUFDO0NBQ2IsQ0FBQTtBQUNELE1BQXFCLGNBQWM7SUFBbkM7UUFFcUIsYUFBUSxHQUFHLGdCQUFnQixDQUFBO0lBeUNoRCxDQUFDO0lBdkNHLElBQUk7UUFDQSxPQUFPLGdCQUFnQixDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFJO1FBQ0EsT0FBTyxnQkFBZ0IsQ0FBQztJQUM1QixDQUFDO0lBRUQsUUFBUTtRQUNKLE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUNELGFBQWEsQ0FBQyxPQUFlO1FBQ3pCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDckMsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsR0FBb0IsRUFBRSxHQUFtQjs7WUFDdEUsTUFBTSxLQUFLLEdBQUcsSUFBSSxPQUFPLENBQUMsWUFBWSxFQUFFO2lCQUN2QyxRQUFRLENBQUMseUJBQXlCLENBQUM7aUJBQ25DLGNBQWMsQ0FBQywwREFBMEQsQ0FBQztpQkFDMUUsUUFBUSxDQUFDLFNBQVMsQ0FBQztpQkFDbkIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxJQUFLLENBQUMsU0FBUyxFQUFHLENBQUM7aUJBRXJELFFBQVEsQ0FBQyxrQ0FBa0MsQ0FBQztpQkFFNUMsU0FBUyxDQUNOLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQzdDLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsRUFDaEQsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxDQUNuRDtpQkFFQSxZQUFZLEVBQUUsQ0FBQTtZQUVuQixHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQU01QixDQUFDO0tBQUE7Q0FDQTtBQTNDRCxpQ0EyQ0MifQ==