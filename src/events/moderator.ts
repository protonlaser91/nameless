import * as Discord from "discord.js";
import { IBotEvent } from "../api/eapi";
import  values  from "../commands/sentiment";
var https = require('follow-redirects').https;
var fs = require('fs');
import * as db from "quick.db";
import sentiment from "./sentiment";
//export let credits: number = NaN
var forbiddenWords=['banana','apple','strawberry', 'pineapple','grape'];//use fruit names
export default class moderator implements IBotEvent {

    name(): string {
        return "moderator";
    }

    help(): string {
        return "moderator";
    }   
    
    
    async runEvent(msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        if (msg.channel.id != `816678642254872680` || msg.content.startsWith("!"))
                return;
        let allMessages: string = db.get(`${msg.author.id}.msgArray`).join();
        console.log(allMessages)
        for(var i=0;i<forbiddenWords.length;i++){
          if (allMessages.includes(forbiddenWords[i])) {
            //const mentionedUser = msg.mentions.users.first();
            let strikeAmount = db.add(`${msg.author.id}.strikes`,1);
            msg.reply(`${msg.author.username} now has ${db.get(`${msg.author.id}.strikes`)} strikes!`)
            console.log(strikeAmount)
            //msg.delete();
            console.log('Deleted message due to forbidden word');
            msg.author.send("Hey, you used a bad word in your recent message. It was deleted and you were given a strike."
            +"You now have "+`${db.get(`${msg.author.id}.strikes`)} strikes!`);
            // delete message, log, etc.
            break;
          }
        }
        
                
               /* const deleted = new Discord.MessageEmbed()
                                .setAuthor(msg.author.username,msg.author.avatarURL()!,``)
                                .setColor('greeb')
                                .addField('Sentiment',score,true)
                                .addField('Subjectivity',body[`subjectivity`],true)
                                .addField('Irony',body[`irony`],true)
                                .addField('Agreement',body[`agreement`],true)
                                .setFooter(`${body[`confidence`]}% confident`,Bot.user!.avatarURL()!)
                                .setTimestamp(new Date());
                msg.channel.send(deleted);*/



                

    }
  }