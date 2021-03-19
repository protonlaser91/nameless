import { Console } from "console";
import * as Discord from "discord.js";
import { join } from "path";
import { IBotCommand } from "../api/capi";

export default class fetchmessage implements IBotCommand {

    private readonly aliases = ["fm","fetch","fetchmessage"]

    name(): string {
        return "fetchMessage";
    } 

    help(): string {
        return "fetchMessages";
    }   
    
    cooldown(): number{
        return 2;
    }
    isThisCommand(command: string): boolean {
        return this.aliases.includes(command);
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        if (args.length == 0)
            return;

        const num = parseInt(args[1]) || 5;
        const mentionedUser = msg.mentions.users.first()
        
        Bot.guilds.cache.get(msg.guild!.id)?.channels.cache.forEach((ch : any) => {
                if (ch.type === 'text'){
                    ch.messages.fetch({
                        limit: num
                    }).then((messages: any[]) => {
                        messages.filter(m => m.author.id === mentionedUser!.id).forEach(m => msg.channel.send(m.content));
                    })
            } 
        })
        
    }

}

