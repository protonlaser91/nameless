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
            if (!(msg.member.roles.cache.has('821193739358830612'))) {
                msg.author.send("Unfortunately, you cannot access this method because you do not have adminstrator privileges in the server.");
                return;
            }
            const mentionedUser = msg.mentions.users.first();
            if (args.length > 2 && args[1].toLowerCase().includes('res')) {
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
                    msg.reply(`${mentionedUser === null || mentionedUser === void 0 ? void 0 : mentionedUser.username} now has ${db.get(`${mentionedUser.id}.strikes`)} strike(s)!`);
                    break;
            }
            console.log(strikeAmount);
        });
    }
}
exports.default = strike;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaWtlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3N0cmlrZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLCtCQUErQjtBQUUvQixNQUFxQixNQUFNO0lBQTNCO1FBRXFCLFlBQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBd0N6QyxDQUFDO0lBdENHLElBQUk7UUFDQSxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBRUQsSUFBSTtRQUNBLE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBQ0QsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxHQUFvQixFQUFFLEdBQW1COztZQUN0RSxJQUFHLENBQUMsQ0FBQyxHQUFJLENBQUMsTUFBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUMsRUFBQztnQkFDckQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsNkdBQTZHLENBQUMsQ0FBQTtnQkFDOUgsT0FBTzthQUNWO1lBQ0QsTUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDakQsSUFBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFDO2dCQUN4RCxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsYUFBYyxDQUFDLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsYUFBYSxhQUFiLGFBQWEsdUJBQWIsYUFBYSxDQUFFLFFBQVEscUJBQXFCLENBQUMsQ0FBQTtnQkFDMUQsT0FBTzthQUNWO1lBQ0QsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLGFBQWMsQ0FBQyxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUMsQ0FBQztZQUM1RCxRQUFRLFlBQVksQ0FBQyxPQUFPLEVBQUM7Z0JBQ3pCLEtBQUssQ0FBQztvQkFDRixHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsYUFBYSxhQUFiLGFBQWEsdUJBQWIsYUFBYSxDQUFFLFFBQVEsWUFBWSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsYUFBYyxDQUFDLEVBQUUsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFBO29CQUNwRyxNQUFNO2dCQUNWO29CQUNJLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxhQUFhLGFBQWIsYUFBYSx1QkFBYixhQUFhLENBQUUsUUFBUSxZQUFZLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxhQUFjLENBQUMsRUFBRSxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUE7b0JBQ3BHLE1BQU07YUFDYjtZQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDN0IsQ0FBQztLQUFBO0NBQ0o7QUExQ0QseUJBMENDIn0=