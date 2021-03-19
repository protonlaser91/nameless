import * as Discord from "discord.js";
import { IBotCommand } from "../api/capi";
import { credits } from "../events/sentiment";


export default class credit implements IBotCommand {

    private readonly aliases = ["credit"]

    name(): string {
        return "credit";
    } 

    help(): string {
        return "credit";
    }   
    
    cooldown(): number{
        return 5;
    }
    isThisCommand(command: string): boolean {
        return this.aliases.includes(command);
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        if (!isNaN(credits))
            msg.channel.send(credits);
        else
            msg.channel.send("Run a sentiment, then check!");

    }
}