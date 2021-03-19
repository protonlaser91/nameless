
import * as Discord from "discord.js";
import { IBotCommand } from "../api/capi";
import * as db from "quick.db";

export default class profile implements IBotCommand {

    private readonly _command = "profile"

    name(): string {
        return "profile";
    } 

    help(): string {
        return "profile";
    }   
    
    cooldown(): number{
        return 2;
    }
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        let sentimentScore = db.get(`${msg.author.id}.sentiment`)
        let strikes = db.get(`${msg.author.id}.strikes`)
        let moneyEmbed = new Discord.MessageEmbed()
            .setTitle(`${msg.author.username}'s Sentiment`)
            .setAuthor(msg.author.username,msg.author.avatarURL()!)
            .setColor([0,200,0])
            .addField(`Sentiment`,`**${sentimentScore}**`,true)
            .addField(`Strikes`,`**${strikes}**`,true)
            .setThumbnail(msg.author.avatarURL()!)
            .setTimestamp(new Date())
            .setFooter('bruh h1gh Technologies', 'https://cdn.discordapp.com/attachments/819032675469361154/822502319147974666/lunges.png');
        
        msg.channel.send(moneyEmbed).then((m: Discord.Message) => {
            setTimeout(() => m.delete(), 20000);
        })

    //    msg.channel.send(db.get(`${msg.author.id}.msgArray`).join('\n'))
        
    }

}
