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
            let arr = db.get(`${msg.author.id}.msgArray`);
            let allMessages = arr.join('');
            for (var i = 0; i < forbiddenWords.length; i++) {
                if (allMessages.includes(forbiddenWords[i])) {
                    let strikeAmount = db.add(`${msg.author.id}.strikes`, 1);
                    msg.reply(`${msg.author.username} now has ${db.get(`${msg.author.id}.strikes`)} strikes!`);
                    db.set(`${msg.author.id}.msgArray`, arr.slice(0, arr.length - forbiddenWords[i].length));
                    msg.author.send("Hey, you used a bad word in your recent message. It was deleted and you were given a strike. "
                        + "You now have " + `${db.get(`${msg.author.id}.strikes`)} strikes!`);
                    break;
                }
            }
        });
    }
}
exports.default = moderator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2V2ZW50cy9tb2RlcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFHQSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDOUMsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZCLCtCQUErQjtBQUcvQixJQUFJLGNBQWMsR0FBQyxDQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsWUFBWSxFQUFFLFdBQVcsRUFBQyxPQUFPLENBQUMsQ0FBQztBQUN4RSxNQUFxQixTQUFTO0lBRTFCLElBQUk7UUFDQSxPQUFPLFdBQVcsQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSTtRQUNBLE9BQU8sV0FBVyxDQUFDO0lBQ3ZCLENBQUM7SUFHSyxRQUFRLENBQUMsR0FBb0IsRUFBRSxHQUFtQjs7WUFDcEQsSUFBSSxHQUFHLEdBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQTtZQUMzQyxJQUFJLFdBQVcsR0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBR3ZDLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxjQUFjLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDO2dCQUN0QyxJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBRTNDLElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4RCxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLFlBQVksRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUE7b0JBQzFGLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsV0FBVyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7b0JBS3JGLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLCtGQUErRjswQkFDOUcsZUFBZSxHQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBRW5FLE1BQU07aUJBQ1A7YUFFRjtRQWtCTCxDQUFDO0tBQUE7Q0FDRjtBQW5ESCw0QkFtREcifQ==