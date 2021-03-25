import * as Discord from "discord.js";
import { IBotCommand } from "../api/capi";
const fs = require("fs");
let plotly = require('plotly')("dachosendude", "4d8cfjegKD3WlxmSZeBg");
import * as db from "quick.db";

export default class dist implements IBotCommand {

    private readonly aliases = ["dist","distribution"]

    name(): string {
        return "dist";
    } 

    help(): string {
        return "dist";
    }   
    
    cooldown(): number{
        return 2;
    }
    isThisCommand(command: string): boolean {
        return this.aliases.includes(command);
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        




var x = db.all().map(o => {
    return o.data.sentiment;
});


var trace = [
  {
    x: x,
    type: "histogram",
    autobinx: false,
    xbins: {
    start: -1,
    end: 1,
    size: 0.25,
  }}
];

var layout = {
  title: {
    text: "Sentiment score analysis",
    font: {
      color: "#FFF",
    }
  },
  xaxis: {
    tickangle:0,
    title: {
      text: "Senti-score",
    },
    showgrid: true,
    zeroline: false,
    color: "#FFFF00",
    tickvals: [-1,-0.75,-0.5,-0.25,0,,0.25,0.5,0.75,1]
  },
  yaxis: {
    title: {
      text: "# of users",
    },
    showline: true,
    color: "#BFFF00"
  },
  paper_bgcolor: "#000000",
  plot_bgcolor: "#000000",
  font: {
    size:30,
  }
};

var imgOpts = {
  format: 'png',
  width: 1000,
  height: 500
};

var chart = {data: trace, layout: layout}

var graphOptions = {layout: layout, filename: "basic-histogram", fileopt: "overwrite"};
//plotly.plot(data, graphOptions, function (err, msg) {
  //  console.log(msg);
//})

await plotly.getImage(chart,imgOpts,function (error: any, imageStream: any) {
  if (error) return console.log (error);

  imageStream.pipe(fs.createWriteStream('temp/senti.png'));
  
})
msg.channel.send("Testing message.", { files: ["temp/senti.png"] });

        
}
}
