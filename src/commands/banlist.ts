import * as Discord from "discord.js";
import { IBotCommand } from "../api/capi";

export default class banlist implements IBotCommand {

    private readonly _command = "banlist"

    name(): string {
        return "banlist";
    } 

    help(): string {
        return "banlist";
    }   
    
    cooldown(): number{
        return 2;
    }
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        if(!(!msg!.member!.roles.cache.has('god'))){
            msg.author.send("Unfortunately, you cannot access this method because you do not have adminstrator privileges in the server.")
        } else

        {
        let count = 1;
        msg.guild?.fetchBans().then(a => {
            for (const user of a.array()){
                msg.author.send(count++ + ". " + user.user.username + ", ");
            }
        })
    }
}
}
