
import * as Discord from "discord.js";
import { IBotCommand } from "../api/capi";
import * as db from "quick.db";
import { values, colorMap } from "../events/asentiment";

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
    
        const mentionedUser = msg.mentions.users.first();
        
        let targetedUser;
        
        if(mentionedUser!=null&&mentionedUser!=undefined){
            if(!(msg!.member!.roles.cache.has('god'))){
                msg.author.send("Unfortunately, you cannot access this method because you do not have adminstrator privileges in the server. Instead, we put your profile!")
                targetedUser=msg.author;
            } 
            else{
                targetedUser=mentionedUser;
            }
        }
        else{
            targetedUser=msg.author;
        }
            
        
        
        let sentimentScore = db.get(`${targetedUser.id}.sentiment`)
        let rounded = Math.round(sentimentScore*2)/2
        let color = colorMap.get(values.revGet(rounded))
        let strikes = db.get(`${targetedUser.id}.strikes`)
        let moneyEmbed = new Discord.MessageEmbed()
            .setTitle(`${targetedUser.username}'s Sentiment`)
            .setAuthor(targetedUser.username,targetedUser.avatarURL()!)
            .setColor(color)
            .addField(`Sentiment`,`**${values.revGet(rounded)}**`,true)
            .addField(`Strikes`,`**${strikes}**`,true)
            .setThumbnail(targetedUser.avatarURL()!)
            .setTimestamp(new Date())
            .setFooter('bruh h1gh Technologies', 'https://cdn.discordapp.com/attachments/819032675469361154/822502319147974666/lunges.png');
        
        msg.channel.send(moneyEmbed).then((m: Discord.Message) => {
            setTimeout(() => m.delete(), 20000);
        })

    //    msg.channel.send(db.get(`${msg.author.id}.msgArray`).join('\n'))
        
    }

}
