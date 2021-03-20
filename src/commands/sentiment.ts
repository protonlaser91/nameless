import * as Discord from "discord.js";
import { IBotCommand } from "../api/capi";
var https = require('follow-redirects').https;
var fs = require('fs');
import * as db from "quick.db";
import TwoWayMap from "../util/TwoWayMap";
import { GlobalVars, values } from "../events/asentiment";

export default class sentiment implements IBotCommand {

    private readonly aliases = ["sentiment","senti"]

    name(): string {
        return "sentiment";
    } 

    help(): string {
        return "sentiment";
    }   
    
    cooldown(): number{
        return 2;
    }
    isThisCommand(command: string): boolean {
        return this.aliases.includes(command);
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        var options = {
            'method': 'POST',
            'hostname': 'api.meaningcloud.com',
            'path': `/sentiment-2.1?key=bb7856b3cc9b538b7534467a7afbea0b&lang=en&txt=${encodeURI(args.join(" "))}&model=test`,
            'headers': {
            },
            'maxRedirects': 20
          };
          let body;
          var req = https.request(options, function (res: { on: (arg0: string, arg1: { (chunk: any): void; (chunk: any): void; (error: any): void; }) => void; }) {
          var chunks: any[] = [];
            
            res.on("data", function (chunk: any) {
              chunks.push(chunk);
            });
            
            res.on("end", function (chunk: any) {
            body = JSON.parse(Buffer.concat(chunks).toString());
             let score = body[`score_tag`]
        
             let colorScheme = () => {
               let j = () => {
                 var newSize = 16777214 - 2;
                 var oldSize = 1 - (-1);
                 if (values.get(score) == NaN)
                  var oldScale: number = 0 - (-1);
                 else
                  var oldScale: number = values.get(score) - (-1);
                  
                 return (newSize * oldScale / oldSize) + 2 as number;
             
             }
               return Math.floor(j()) as number 
             }
        
             const sentiment = new Discord.MessageEmbed()
                         .setAuthor(msg.author.username,msg.author.avatarURL()!,``)
                         .setColor(colorScheme())
                         .addField('Sentiment',score,true)
                         .addField('Subjectivity',body[`subjectivity`],true)
                         .addField('Irony',body[`irony`],true)
                         .addField('Agreement',body[`agreement`],true)
                         .setFooter(`${body[`confidence`]}% confident`,Bot.user!.avatarURL()!)
                         .setTimestamp(new Date());
               msg.channel.send(sentiment);
        
         GlobalVars.credits = body['status']['remaining_credits']
            });
        
            res.on("error", function (error: any) {
              console.error(error);
            });
          });
        
          req.end(); 
}
}
