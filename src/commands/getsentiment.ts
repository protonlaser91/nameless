import * as Discord from "discord.js";
import { IBotCommand } from "../api/capi";
import * as db from "quick.db";

export default class strike implements IBotCommand {

    private readonly aliases = ["getsentiment"]

    name(): string {
        return "getsentiment";
    } 

    help(): string {
        return "getsentiment";
    }   
    
    cooldown(): number{
        return 2;
    }
    isThisCommand(command: string): boolean {
        return this.aliases.includes(command);
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        const mentionedUser = msg.mentions.users.first();
        let sentscore = db.get(`${mentionedUser!.id}.sentiment`);
        let username = mentionedUser?.username;
        let picture = mentionedUser?.avatarURL;

        const embed = new Discord.MessageEmbed()
            .setTitle('Sentiment Score')
            .addFields(
                  { name: username + '\'s score:', value: sentscore }                 
              )
            .setThumbnail(""+picture)
            .setTimestamp()
       
            msg.reply(embed);
        
    }
}