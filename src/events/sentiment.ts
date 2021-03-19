import * as Discord from "discord.js";
import { IBotEvent } from "../api/eapi";
var https = require('follow-redirects').https;
var fs = require('fs');
import * as db from "quick.db";
import TwoWayMap from "../util/TwoWayMap";

export let values: TwoWayMap  = new TwoWayMap({
  "P+": 1,
  "P": 0.5,
  "NEU" : 0,
  "NONE" : 0,
  "N" : -0.5,
  "N+": -1,
});

export class GlobalVars {
  public static credits: number = NaN;
}

export default class sentiment implements IBotEvent {
  
    name(): string {
        return "sentiment";
    } 

    help(): string {
        return "sentiment";
    }   

    

    async runEvent(msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        if (msg.channel.id != `821743564731973674` && msg.channel.id != `822258266075430933` || msg.content.startsWith("!"))
               return;
        
        let totalMsg: string; 
        let arr = db.get(`${msg.author.id}.msgArray`);
        if (arr.length < 10){ // if not full
                  db.push(`${msg.author.id}.msgArray`,msg.content);
        } else {
                // calculate sentiment for last 10 messages, clear array
                totalMsg = arr.join('\n');

                var options = {
                  'method': 'POST',
                  'hostname': 'api.meaningcloud.com',
                  'path': `/sentiment-2.1?key=bb7856b3cc9b538b7534467a7afbea0b&lang=en&txt=${encodeURI(totalMsg)}&model=test`,
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
                   let score = values.get(body[`score_tag`])
                    let recycle = db.get(`${msg.author.id}.recycleAmt`)
                    db.set(`${msg.author.id}.sentiment`,
                      1/(recycle + 1) * score + recycle/(recycle + 1) * db.get(`${msg.author.id}.sentiment`)
                    );
                    GlobalVars.credits = body['status']['remaining_credits']

                  });

                  res.on("error", function (error: any) {
                    console.error(error);
                  });
                });
              
                req.end(); 
                db.set(`${msg.author.id}.msgArray`,[])
        }
    

        }

    }
    function randint(min: number,max: number) // min and max included
    {
            return Math.floor(Math.random()*(max-min+1)+min);
    }