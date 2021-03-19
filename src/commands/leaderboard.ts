import * as Discord from "discord.js";
import { IBotCommand } from "../api/capi";
import * as db from "quick.db";

/*let  usersArray=[


    ["fanman"= 0.2],
    ["sanjit"= 4],
    ["speckled"= 1.2],
    [fairy= 2],
]*/

export default class getleaderboard implements IBotCommand {

    private readonly _command = "leaderboard"

    name(): string {
        return "leaderboard";
    } 

    help(): string {
        return "leaderboard";
    }   
    
    cooldown(): number{
        return 2;
    }
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        const embed = new Discord.MessageEmbed()
        .setTitle('Positivity Leaderboard!')
        .setDescription('Here are the top ten most positive people in the server!')
        .setColor('#0099ff')
        .setAuthor(Bot.user!.username, Bot.user!.avatarURL()!)
        //.setImage('https://i.redd.it/l28662sbcec51.png')
        .setThumbnail('https://i.imgur.com/aowYZQG.jpeg')
        //.setAuthor(msg.author.username)
        .addFields(
          //  { name: usersArray[0], value: usersArray[0] },
            { name: 'my field title2', value: 'some stuff' },
            { name: 'my field title3', value: 'some stuff' }
        )
    
        .setTimestamp()
    
    msg.channel.send(embed);         
    /*let arr = db.all();
    for(let i = 0; i<arr.length; i++){
        
    }*/
    
}
}
