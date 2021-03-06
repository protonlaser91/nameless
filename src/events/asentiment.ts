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
  "NONE" : NaN,
  "N" : -0.5,
  "N+": -1,
});

export let colorMap: TwoWayMap = new TwoWayMap({
  "P+": '#2cff00',
  "P": '#2da015',
  "NEU" : '#84a7ac',
  "NONE" : '#84a7ac',
  "N" : '#f98b8b',
  "N+": '#ff0000',
})

export let elegance: TwoWayMap = new TwoWayMap({
  "P+": 'Very Positive',
  "P": 'Positive',
  "NEU" : 'Neutral',
  "NONE" : 'Not Enough Data',
  "N" : 'Negative',
  "N+": 'Very Negative',
})

export class GlobalVars {
  public static credits: number = NaN;
}

export default class asentiment implements IBotEvent {
  
    name(): string {
        return "asentiment";
    } 

    help(): string {
        return "asentiment";
    }   

    

    async runEvent(msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        if (msg.content.startsWith("!") || msg.content.length == 0)
               return;
        
        let totalMsg: string; 
        let arr = db.get(`${msg.author.id}.msgArray`);
        if (arr.length < 4){ // if not full
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
                    try {
                  body = JSON.parse(Buffer.concat(chunks).toString());
                    } catch {
                      console.error();
                      return;
                    }
                   let score = values.get(body[`score_tag`])
                   let recycle = db.get(`${msg.author.id}.recycleAmt`)
                    if (!isNaN(score)){
                      db.set(`${msg.author.id}.sentiment`,
                      1/(recycle + 1) * score + recycle/(recycle + 1) * db.get(`${msg.author.id}.sentiment`)
                      );
                    db.add(`${msg.author.id}.recycleAmt`,1);
              //      msg.channel.send(`Sentiment score has been updated for user ${msg.author.username}, this round had ${score}`)
                    }
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