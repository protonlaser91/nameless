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
var https = require('follow-redirects').https;
var fs = require('fs');
const db = require("quick.db");
var forbiddenWords = ['banana', 'apple', 'strawberry', 'pineapple', 'grape'];
class moderator {
    name() {
        return "moderator";
    }
    help() {
        return "moderator";
    }
    runEvent(msg, Bot) {
        return __awaiter(this, void 0, void 0, function* () {
            let allMessages = db.get(`${msg.author.id}.msgArray`).join('');
            console.log(allMessages);
            for (var i = 0; i < forbiddenWords.length; i++) {
                if (allMessages.includes(forbiddenWords[i])) {
                    let strikeAmount = db.add(`${msg.author.id}.strikes`, 1);
                    msg.reply(`${msg.author.username} now has ${db.get(`${msg.author.id}.strikes`)} strikes!`);
                    console.log(strikeAmount);
                    console.log('Deleted message due to forbidden word');
                    msg.author.send("Hey, you used a bad word in your recent message. It was deleted and you were given a strike."
                        + "You now have " + `${db.get(`${msg.author.id}.strikes`)} strikes!`);
                    break;
                }
            }
        });
    }
}
exports.default = moderator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2V2ZW50cy9tb2RlcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFHQSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDOUMsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZCLCtCQUErQjtBQUcvQixJQUFJLGNBQWMsR0FBQyxDQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsWUFBWSxFQUFFLFdBQVcsRUFBQyxPQUFPLENBQUMsQ0FBQztBQUN4RSxNQUFxQixTQUFTO0lBRTFCLElBQUk7UUFDQSxPQUFPLFdBQVcsQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSTtRQUNBLE9BQU8sV0FBVyxDQUFDO0lBQ3ZCLENBQUM7SUFHSyxRQUFRLENBQUMsR0FBb0IsRUFBRSxHQUFtQjs7WUFFcEQsSUFBSSxXQUFXLEdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdkUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtZQUN4QixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsY0FBYyxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQztnQkFDdEMsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUUzQyxJQUFJLFlBQVksR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEQsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxZQUFZLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFBO29CQUMxRixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO29CQUV6QixPQUFPLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7b0JBQ3JELEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDhGQUE4RjswQkFDN0csZUFBZSxHQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBRW5FLE1BQU07aUJBQ1A7YUFDRjtRQWtCTCxDQUFDO0tBQUE7Q0FDRjtBQS9DSCw0QkErQ0cifQ==