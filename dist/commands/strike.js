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
const db = require("quick.db");
class strike {
    constructor() {
        this.aliases = ["strike"];
    }
    name() {
        return "strike";
    }
    help() {
        return "strike";
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
            if (args[1].toLowerCase().includes('res')) {
                db.set(`${mentionedUser.id}.strikes`, 0);
                msg.reply(`${mentionedUser === null || mentionedUser === void 0 ? void 0 : mentionedUser.username} now has 0 strikes!`);
                return;
            }
            let strikeAmount = db.add(`${mentionedUser.id}.strikes`, 1);
            switch (strikeAmount.strikes) {
                case 1:
                    msg.reply(`${mentionedUser === null || mentionedUser === void 0 ? void 0 : mentionedUser.username} now has ${db.get(`${mentionedUser.id}.strikes`)} strike(s)!`);
                    break;
                default:
                    msg.reply(`${mentionedUser === null || mentionedUser === void 0 ? void 0 : mentionedUser.username} now has ${db.get(`${mentionedUser.id}.strikes`)} strikes(s)!`);
                    break;
            }
            console.log(strikeAmount);
        });
    }
}
exports.default = strike;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaWtlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3N0cmlrZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLCtCQUErQjtBQUUvQixNQUFxQixNQUFNO0lBQTNCO1FBRXFCLFlBQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBb0N6QyxDQUFDO0lBbENHLElBQUk7UUFDQSxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBRUQsSUFBSTtRQUNBLE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBQ0QsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxHQUFvQixFQUFFLEdBQW1COztZQUN0RSxNQUFNLGFBQWEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNqRCxJQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUM7Z0JBQ3JDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxhQUFjLENBQUMsRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxhQUFhLGFBQWIsYUFBYSx1QkFBYixhQUFhLENBQUUsUUFBUSxxQkFBcUIsQ0FBQyxDQUFBO2dCQUMxRCxPQUFPO2FBQ1Y7WUFDRCxJQUFJLFlBQVksR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsYUFBYyxDQUFDLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVELFFBQVEsWUFBWSxDQUFDLE9BQU8sRUFBQztnQkFDekIsS0FBSyxDQUFDO29CQUNGLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxhQUFhLGFBQWIsYUFBYSx1QkFBYixhQUFhLENBQUUsUUFBUSxZQUFZLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxhQUFjLENBQUMsRUFBRSxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUE7b0JBQ3BHLE1BQU07Z0JBQ1Y7b0JBQ0ksR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLGFBQWEsYUFBYixhQUFhLHVCQUFiLGFBQWEsQ0FBRSxRQUFRLFlBQVksRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLGFBQWMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQTtvQkFDckcsTUFBTTthQUNiO1lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUM3QixDQUFDO0tBQUE7Q0FDSjtBQXRDRCx5QkFzQ0MifQ==