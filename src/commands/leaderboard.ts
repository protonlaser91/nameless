import * as Discord from "discord.js";
import { IBotCommand } from "../api/capi";
import * as db from "quick.db";

/*let  usersArray=[


    ["fanman"= 0.2],
    ["sanjit"= 4],
    ["speckled"= 1.2],
    [fairy= 2],
]*/
function cTC(a: (string | number)[], b: (string | number)[]) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? 1 : -1;
    }
}

export function getUserFromID(Bot: Discord.Client, id:string){
    let thanos = Bot.users.fetch(id);
        thanos.then(user=> {
            return user.username
        });
}
export default class leaderboard implements IBotCommand {

    private readonly aliases = ["leaderboard","lb"]

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
        return this.aliases.includes(command);
    }

    async runCommand(args: string[], msg: Discord.Message, Bot: Discord.Client): Promise<void> {
        let userArray:any=[];
        let guildArray=msg.guild!.members.cache.array().map(element=>{
            return element.id
        })
        for(const o of db.all()){
            if(guildArray.includes(o.ID)){
            /*    let thanos = Bot.users.fetch(o.ID);
                thanos.then(user=> {
                
            });*/
            userArray.push([Bot.users.cache.find(user => user.id === o.ID)!.username, o.data.sentiment])
            }
        }
        userArray.sort(cTC)
        console.log(userArray)
        
        const embed = new Discord.MessageEmbed()
        .setTitle('Positivity Leaderboard!')
        .setDescription('Here are the top ten most positive people in the server!')
        .setColor('#0099ff')
        .setAuthor(Bot.user!.username, Bot.user!.avatarURL()!)
        //.setImage('https://i.redd.it/l28662sbcec51.png')
        .setThumbnail('https://i.imgur.com/aowYZQG.jpeg')
        //.setAuthor(msg.author.username)
        
        if(msg.guild!.memberCount<10){
            for(var i=0;i<msg.guild!.memberCount;i++){
                if(userArray[i][0]=='Eclipse'){
                    continue;
                }
                embed.addFields(
                  { name: userArray[i][0], value: userArray[i][1]},)
            }
        }
        else{
            for(var i=0;i<10;i++){
                if(userArray[i][0]=='Eclipse'){
                    continue;
                }
                embed.addFields(
                  { name: userArray[i][0], value: userArray[i][1]},)
            }
        }
        
    
        embed.setTimestamp()
    
    msg.channel.send(embed);         
    /*let arr = db.all();
    for(let i = 0; i<arr.length; i++){
        
    }*/
    
}
}
