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
        return 2;
    }
    isThisCommand(command) {
        return this.aliases.includes(command);
    }
    runCommand(args, msg, Bot) {
        return __awaiter(this, void 0, void 0, function* () {
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
                    }
                }
            ];
            var layout = {
                title: {
                    text: "Sentiment score analysis",
                    font: {
                        color: "#FFF",
                    }
                },
                xaxis: {
                    tickangle: 0,
                    title: {
                        text: "Senti-score",
                    },
                    showgrid: true,
                    zeroline: false,
                    color: "#FFFF00",
                    tickvals: [-1, -0.75, -0.5, -0.25, 0, , 0.25, 0.5, 0.75, 1]
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
                    size: 30,
                }
            };
            var imgOpts = {
                format: 'png',
                width: 1000,
                height: 500
            };
            var chart = { data: trace, layout: layout };
            var graphOptions = { layout: layout, filename: "basic-histogram", fileopt: "overwrite" };
            yield plotly.getImage(chart, imgOpts, function (error, imageStream) {
                if (error)
                    return console.log(error);
                imageStream.pipe(fs.createWriteStream('temp/senti.png'));
            });
            msg.channel.send("Testing message.", { files: ["temp/senti.png"] });
        });
    }
}
exports.default = dist;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9kaXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxjQUFjLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztBQUN2RSwrQkFBK0I7QUFFL0IsTUFBcUIsSUFBSTtJQUF6QjtRQUVxQixZQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQUMsY0FBYyxDQUFDLENBQUE7SUE4RnRELENBQUM7SUE1RkcsSUFBSTtRQUNBLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxJQUFJO1FBQ0EsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFDRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLEdBQW9CLEVBQUUsR0FBbUI7O1lBTTlFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3JCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDNUIsQ0FBQyxDQUFDLENBQUM7WUFHSCxJQUFJLEtBQUssR0FBRztnQkFDVjtvQkFDRSxDQUFDLEVBQUUsQ0FBQztvQkFDSixJQUFJLEVBQUUsV0FBVztvQkFDakIsUUFBUSxFQUFFLEtBQUs7b0JBQ2YsS0FBSyxFQUFFO3dCQUNQLEtBQUssRUFBRSxDQUFDLENBQUM7d0JBQ1QsR0FBRyxFQUFFLENBQUM7d0JBQ04sSUFBSSxFQUFFLElBQUk7cUJBQ1g7aUJBQUM7YUFDSCxDQUFDO1lBRUYsSUFBSSxNQUFNLEdBQUc7Z0JBQ1gsS0FBSyxFQUFFO29CQUNMLElBQUksRUFBRSwwQkFBMEI7b0JBQ2hDLElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsTUFBTTtxQkFDZDtpQkFDRjtnQkFDRCxLQUFLLEVBQUU7b0JBQ0wsU0FBUyxFQUFDLENBQUM7b0JBQ1gsS0FBSyxFQUFFO3dCQUNMLElBQUksRUFBRSxhQUFhO3FCQUNwQjtvQkFDRCxRQUFRLEVBQUUsSUFBSTtvQkFDZCxRQUFRLEVBQUUsS0FBSztvQkFDZixLQUFLLEVBQUUsU0FBUztvQkFDaEIsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO2lCQUNuRDtnQkFDRCxLQUFLLEVBQUU7b0JBQ0wsS0FBSyxFQUFFO3dCQUNMLElBQUksRUFBRSxZQUFZO3FCQUNuQjtvQkFDRCxRQUFRLEVBQUUsSUFBSTtvQkFDZCxLQUFLLEVBQUUsU0FBUztpQkFDakI7Z0JBQ0QsYUFBYSxFQUFFLFNBQVM7Z0JBQ3hCLFlBQVksRUFBRSxTQUFTO2dCQUN2QixJQUFJLEVBQUU7b0JBQ0osSUFBSSxFQUFDLEVBQUU7aUJBQ1I7YUFDRixDQUFDO1lBRUYsSUFBSSxPQUFPLEdBQUc7Z0JBQ1osTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsTUFBTSxFQUFFLEdBQUc7YUFDWixDQUFDO1lBRUYsSUFBSSxLQUFLLEdBQUcsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUMsQ0FBQTtZQUV6QyxJQUFJLFlBQVksR0FBRyxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUMsQ0FBQztZQUt2RixNQUFNLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxVQUFVLEtBQVUsRUFBRSxXQUFnQjtnQkFDeEUsSUFBSSxLQUFLO29CQUFFLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBRSxLQUFLLENBQUMsQ0FBQztnQkFFdEMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBRTNELENBQUMsQ0FBQyxDQUFBO1lBQ0YsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUdwRSxDQUFDO0tBQUE7Q0FDQTtBQWhHRCx1QkFnR0MifQ==