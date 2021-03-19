
import * as Discord from "discord.js";
import { IBotCommand } from "../api/capi";
import * as db from "quick.db";
import { values } from "../events/sentiment";

export default class profile implements IBotCommand {

    private readonly aliases = ["profile","user","me"]

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
        return this.aliases.includes(command);
    }
    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        if (args[0] != null && args[0].toLowerCase().includes('dev')){
            msg.reply(db.get(`${msg.author.id}.msgArray`).length + " items in the array bruh");
            msg.reply(db.get(`${msg.author.id}.recycleAmt`));
    }

        let sentimentScore = db.get(`${msg.author.id}.sentiment`)
        let strikes = db.get(`${msg.author.id}.strikes`)
        let moneyEmbed = new Discord.MessageEmbed()
            .setTitle(`${msg.author.username}'s Sentiment`)
            .setAuthor(msg.author.username,msg.author.avatarURL()!)
            .setColor([0,200,0])
            .addField(`Sentiment`,`**${values.revGet(sentimentScore)}**`,true)
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
