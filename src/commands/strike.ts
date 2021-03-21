import * as Discord from "discord.js";
import { IBotCommand } from "../api/capi";
import * as db from "quick.db";

export default class strike implements IBotCommand {

    private readonly aliases = ["strike"]

    name(): string {
        return "strike";
    } 

    help(): string {
        return "strike";
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
        const mentionedUser = msg.mentions.users.first();
        if(args.length > 1 && args[1].toLowerCase().includes('res')){
            db.set(`${mentionedUser!.id}.strikes`,0);
            msg.reply(`${mentionedUser?.username} now has 0 strikes!`)
            return;
        }
        let strikeAmount = db.add(`${mentionedUser!.id}.strikes`,1);
        switch (strikeAmount.strikes){
            case 1:
                msg.reply(`${mentionedUser?.username} now has ${db.get(`${mentionedUser!.id}.strikes`)} strike(s)!`)
                break;
            default:
                msg.reply(`${mentionedUser?.username} now has ${db.get(`${mentionedUser!.id}.strikes`)} strike(s)!`)
                break;
        }
        
        console.log(strikeAmount)
    }
}