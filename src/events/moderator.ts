import * as Discord from "discord.js";
import { IBotEvent } from "../api/eapi";
import  values  from "../commands/sentiment";
var https = require('follow-redirects').https;
var fs = require('fs');
import * as db from "quick.db";
//import sentiment from "./sentiment";
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
        let arr=db.get(`${msg.author.id}.msgArray`)
        let allMessages: string = arr.join('');
        
        
        for(var i=0;i<forbiddenWords.length;i++){
          if (allMessages.includes(forbiddenWords[i])) {
            //const mentionedUser = msg.mentions.users.first();
            db.add(`${msg.author.id}.strikes`,1);
            msg.reply(`${msg.author.username} now has ${db.get(`${msg.author.id}.strikes`)} strikes!`)
            db.set(`${msg.author.id}.msgArray`, arr.slice(0,arr.length-forbiddenWords[i].length))
            //console.log(db.get(`${msg.author.id}.msgArray`))
            //msg.delete();
            //console.log(allMessages)
            //console.log('Deleted message due to forbidden word');
      //      msg.author.send("Hey, you used a bad word in your recent message. It was deleted and you were given a strike. "
      //      +"You now have "+`${db.get(`${msg.author.id}.strikes`)} strikes!`);
            // delete message, log, etc.
            
            break;
          }
          
        }
        let strikeAmount = db.get(`${msg.author!.id}.strikes`);
          if(strikeAmount>5){
            var role: any = msg.guild!.roles.cache.find(role => role.name == 'mute');
            console.log(typeof role)
            msg.guild?.members.fetch(msg.author!.id).then(user=>{
                user.roles.add(role)
            })
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