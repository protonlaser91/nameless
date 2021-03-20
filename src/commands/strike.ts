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
        const mentionedUser = msg.mentions.users.first();
        if(args[1].toLowerCase().includes('res')){
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
                msg.reply(`${mentionedUser?.username} now has ${db.get(`${mentionedUser!.id}.strikes`)} strikes(s)!`)
                break;
        }
        
        console.log(strikeAmount)
    }
}