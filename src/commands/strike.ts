import * as Discord from "discord.js";
import { IBotCommand } from "../api/capi";
import { credits } from "../events/sentiment";
import * as db from "quick.db";

export default class strike implements IBotCommand {

    private readonly _command = "strike"

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
        return command === this._command;
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        const mentionedUser = msg.mentions.users.first();
        let strikeAmount = db.add(`${mentionedUser!.id}.strikes`,1);
        switch (strikeAmount.strikes){
            case 1:
                msg.reply(`${mentionedUser?.username} now has ${db.get(`${mentionedUser!.id}.strikes`)} strike!`)
                break;
            default:
                msg.reply(`${mentionedUser?.username} now has ${db.get(`${mentionedUser!.id}.strikes`)} strikes!`)
                break;
        }
        
        console.log(strikeAmount)
    }
}