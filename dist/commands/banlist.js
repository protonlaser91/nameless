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
class banlist {
    constructor() {
        this.aliases = ["banlist", "bans"];
    }
    name() {
        return "banlist";
    }
    help() {
        return "banlist";
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
            if (!(!msg.member.roles.cache.has('god'))) {
                msg.author.send("Unfortunately, you cannot access this method because you do not have adminstrator privileges in the server.");
            }
            else {
                let count = 1;
                (_a = msg.guild) === null || _a === void 0 ? void 0 : _a.fetchBans().then(a => {
                    for (const user of a.array()) {
                        msg.channel.send(count++ + ". " + user.user.username + ", ");
                    }
                });
            }
        });
    }
}
exports.default = banlist;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFubGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9iYW5saXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBR0EsTUFBcUIsT0FBTztJQUE1QjtRQUVxQixZQUFPLEdBQUcsQ0FBQyxTQUFTLEVBQUMsTUFBTSxDQUFDLENBQUE7SUErQmpELENBQUM7SUE3QkcsSUFBSTtRQUNBLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUFJO1FBQ0EsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFDRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLEdBQW9CLEVBQUUsR0FBbUI7OztZQUN0RSxJQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUksQ0FBQyxNQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQztnQkFDdkMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsNkdBQTZHLENBQUMsQ0FBQTthQUNqSTtpQkFFRDtnQkFDQSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ2QsTUFBQSxHQUFHLENBQUMsS0FBSywwQ0FBRSxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUM1QixLQUFLLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBQzt3QkFDekIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDO3FCQUNoRTtnQkFDTCxDQUFDLENBQUMsQ0FBQTthQUNMOztLQUNKO0NBQ0E7QUFqQ0QsMEJBaUNDIn0=