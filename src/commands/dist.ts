import * as Discord from "discord.js";
import { IBotCommand } from "../api/capi";
const fs = require("fs");
let plotly = require('plotly')("dachosendude", "4d8cfjegKD3WlxmSZeBg");
import * as db from "quick.db";

export default class dist implements IBotCommand {

  private readonly aliases = ["dist", "distribution"]

  name(): string {
    return "dist";
  }

  help(): string {
    return "dist";
  }

  cooldown(): number {
    return 20;
  }
  isThisCommand(command: string): boolean {
    return this.aliases.includes(command);
  }

  async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {

    var y: any[] = []
    var count = 0;
    var x = db.all().map(o => {
      if (o.data.recycleAmt != 0){
        count++;
        if (msg.guild?.member(o.ID))
          y.push(o.data.sentiment)
        else  
          return o.data.sentiment;
    }
    });



    var trace1 =
    {
      x: y,
      name: "Server users",
      type: "histogram",
      autobinx: false,
      xbins: {
        start: -1,
        end: 1,
        size: 0.25,
        bingroup: "1",
      },
      marker: {
        color: "#ff7f0e"
      }
    };

    var trace2 =
    {
      x: x,
      name: "All users",
      type: "histogram",
      autobinx: false,
      xbins: {
        start: -1,
        end: 1,
        size: 0.25,
        bingroup: "1",
      },
      marker: {
        color: "#1f77b4"
      }
    };


    var layout = {
      barmode: "stack",
      title: {
        text: "Sentiment score analysis",
        font: {
          color: "#FFF",
        },
      },
      xaxis: {
        tickangle: 0,
        title: {
          text: "Senti-score",
        },
        showgrid: true,
        zeroline: false,
        color: "#FFFF00",
        tickvals: [-1, -0.75, -0.5, -0.25, 0, , 0.25, 0.5, 0.75, 1],
        range: [-1, 1]
      },
      yaxis: {
        title: {
          text: "# of users",
        },
        showline: true,
        color: "#BFFF00",
        tickformat: ',d',
        tickfont: {
          size: 35
        }
      },
      paper_bgcolor: "#000000",
      plot_bgcolor: "#000000",
      font: {
        size: 30,
      },
    };

    var imgOpts = {
      format: 'png',
      width: 1100,
      height: 600
    };

    var chart = { data: [trace1, trace2], layout: layout }


      let john: Promise<void> = new Promise((resolve,reject) => {
        plotly.getImage(chart, imgOpts, async function (error: any, imageStream: any) {
        if (error) console.error(reject);
        await imageStream.pipe(fs.createWriteStream('temp/senti.png'));
        })
        resolve();
      })
    
      john.then(_ => {
        setTimeout(function() {
          msg.channel.send(`Sample size: ${count}`,{ files: ["temp/senti.png"] })
        },6000);
      });
    
    
  }
}
