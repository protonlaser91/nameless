import * as Discord from "discord.js";
import { IBotCommand } from "../api/capi";

export default class banlist implements IBotCommand {

    private readonly aliases = ["banlist","bans"]

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
        return this.aliases.includes(command);
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        if(!(msg!.member!.roles.cache.has('821193739358830612'))){
            msg.author.send("Unfortunately, you cannot access this method because you do not have adminstrator privileges in the server.")
            return;
        } 
        else{
        let count = 1;
        msg.guild?.fetchBans().then(a => {
            for (const user of a.array()){
                msg.channel.send(count++ + ". " + user.user.username + ", ");
            }
        })
    }
}
}
