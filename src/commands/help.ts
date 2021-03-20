import * as Discord from "discord.js";
import { IBotCommand } from "../api/capi";
import * as db from "quick.db";


export default class getbanlist implements IBotCommand {

    private readonly aliases = ["help"]

    name(): string {
        return "help";
    } 

    help(): string {
        return "help";
    }   
    
    cooldown(): number{
        return 2;
    }
    isThisCommand(command: string): boolean {
        return this.aliases.includes(command);
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        const embed = new Discord.MessageEmbed()
        .setTitle('Eclipse Help is Here!')
        .setDescription('Here are a list of our commands!')
        .setColor('#0099ff')
        .setAuthor(Bot.user!.username, Bot.user!.avatarURL()!)
        //.setAuthor(msg.author.username)
        //.addField(mod,'Mod only commands')
        .addFields(
            { name: '!banlist', value: 'Replies with the list of banned users from the server' },
            { name: '!strike', value: 'A manual strike to a user' },
            //{ name: '!getsentiment', value: 'Replies with the sentiment score of specified user' },
            { name: '!me, !user, !profile', value: 'Gives your sentiment score and total profanity strikes' },
            { name: '!me, !user, !profile @username', value: 'Gives the mentioned member\'s sentiment score and total profanity strikes (MOD ONLY)' },
            { name: '!strike @username', value: 'A manual strike for mods to use on members' },
            { name: '!strike @username reset', value: 'Resets a member\'s strikes' }
        )
        //.addField('Member available commands',' ')
        .addFields(
            { name:'!leaderboard', value:'Gives leaderboard of the top ten most positive members based on sentiment scores'},
        )
    
        .setTimestamp()
    
    msg.channel.send(embed);         
    /*let arr = db.all();
    for(let i = 0; i<arr.length; i++){
        
    }*/
    
}
}
