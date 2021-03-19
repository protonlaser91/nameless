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
class fetchmessage {
    constructor() {
        this.aliases = ["fm", "fetch", "fetchmessage"];
    }
    name() {
        return "fetchMessage";
    }
    help() {
        return "fetchMessages";
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
            if (args.length == 0)
                return;
            const num = parseInt(args[1]) || 5;
            const mentionedUser = msg.mentions.users.first();
            (_a = Bot.guilds.cache.get(msg.guild.id)) === null || _a === void 0 ? void 0 : _a.channels.cache.forEach((ch) => {
                if (ch.type === 'text') {
                    ch.messages.fetch({
                        limit: num
                    }).then((messages) => {
                        messages.filter(m => m.author.id === mentionedUser.id).forEach(m => msg.channel.send(m.content));
                    });
                }
            });
        });
    }
}
exports.default = fetchmessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmV0Y2htZXNzYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2ZldGNobWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUtBLE1BQXFCLFlBQVk7SUFBakM7UUFFcUIsWUFBTyxHQUFHLENBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxjQUFjLENBQUMsQ0FBQTtJQW9DNUQsQ0FBQztJQWxDRyxJQUFJO1FBQ0EsT0FBTyxjQUFjLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQUk7UUFDQSxPQUFPLGVBQWUsQ0FBQztJQUMzQixDQUFDO0lBRUQsUUFBUTtRQUNKLE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUNELGFBQWEsQ0FBQyxPQUFlO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsR0FBb0IsRUFBRSxHQUFtQjs7O1lBQ3RFLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDO2dCQUNoQixPQUFPO1lBRVgsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQyxNQUFNLGFBQWEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQTtZQUVoRCxNQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBTSxDQUFDLEVBQUUsQ0FBQywwQ0FBRSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQVEsRUFBRSxFQUFFO2dCQUNqRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFDO29CQUNuQixFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQzt3QkFDZCxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBZSxFQUFFLEVBQUU7d0JBQ3hCLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxhQUFjLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ3RHLENBQUMsQ0FBQyxDQUFBO2lCQUNUO1lBQ0wsQ0FBQyxDQUFDLENBQUE7O0tBRUw7Q0FFSjtBQXRDRCwrQkFzQ0MifQ==