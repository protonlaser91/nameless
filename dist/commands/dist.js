"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let plotly = require('plotly')("dachosendude", "4d8cfjegKD3WlxmSZeBg");
const db = require("quick.db");
class dist {
    constructor() {
        this.aliases = ["dist", "distribution"];
    }
    name() {
        return "dist";
    }
    help() {
        return "dist";
    }
    cooldown() {
        return 20;
    }
    isThisCommand(command) {
        return this.aliases.includes(command);
    }
    runCommand(args, msg, Bot) {
        return __awaiter(this, void 0, void 0, function* () {
            var y = [];
            var count = 0;
            var x = db.all().map(o => {
                var _a;
                if (o.data.recycleAmt != 0) {
                    count++;
                    if ((_a = msg.guild) === null || _a === void 0 ? void 0 : _a.member(o.ID))
                        y.push(o.data.sentiment);
                    else
                        return o.data.sentiment;
                }
            });
            var trace1 = {
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
            var trace2 = {
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
            var chart = { data: [trace1, trace2], layout: layout };
            let john = new Promise((resolve, reject) => {
                plotly.getImage(chart, imgOpts, function (error, imageStream) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (error)
                            console.error(reject);
                        yield imageStream.pipe(fs.createWriteStream('temp/senti.png'));
                    });
                });
                resolve();
            });
            john.then(_ => {
                setTimeout(function () {
                    msg.channel.send(`Sample size: ${count}`, { files: ["temp/senti.png"] });
                }, 6000);
            });
        });
    }
}
exports.default = dist;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9kaXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxjQUFjLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztBQUN2RSwrQkFBK0I7QUFFL0IsTUFBcUIsSUFBSTtJQUF6QjtRQUVtQixZQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQUUsY0FBYyxDQUFDLENBQUE7SUFrSXJELENBQUM7SUFoSUMsSUFBSTtRQUNGLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxJQUFJO1FBQ0YsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFDRCxhQUFhLENBQUMsT0FBZTtRQUMzQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLEdBQW9CLEVBQUUsR0FBbUI7O1lBRXhFLElBQUksQ0FBQyxHQUFVLEVBQUUsQ0FBQTtZQUNqQixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFOztnQkFDdkIsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLEVBQUM7b0JBQ3pCLEtBQUssRUFBRSxDQUFDO29CQUNSLElBQUksTUFBQSxHQUFHLENBQUMsS0FBSywwQ0FBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzt3QkFDekIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFB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