import * as Discord from "discord.js";
import { IBotCommand } from "../api/capi";
import * as db from "quick.db";
import { elegance, values } from "../events/asentiment"
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
            if (o.ID == "817230166824321054")
                continue;
            if(guildArray.includes(o.ID)){

            let senti = o.data.sentiment;
            if (senti == undefined || senti == null)
                senti = NaN;
            userArray.push([o.ID, senti])
            }
        }
        userArray.sort(cTC)
      //  console.log(userArray)
        const embed = new Discord.MessageEmbed()
        .setTitle('Positivity Leaderboard!')
        
        .setColor('#0099ff')
        .setAuthor(Bot.user!.username, Bot.user!.avatarURL()!)
        //.setImage('https://i.redd.it/l28662sbcec51.png')
        .setThumbnail('https://i.imgur.com/aowYZQG.jpeg')
        //.setAuthor(msg.author.username)
        var count;
        if(msg.guild!.memberCount<11){
           count = msg.guild!.memberCount-1;
        }
        else{
            count=10;
        }
        let bruh = "ten";
        switch (count){
            case 1:
                bruh = ""
                break;
            case 2:
                bruh = "two"
                break;
                case 3:
                    bruh = "three"
                    break;
                    case 4:
                        bruh = "four"
                        break;
                        
                        case 5:
                            bruh = "five"
                            break;
                            case 6:
                bruh = "six"
                break;
                case 7:
                bruh = "seven"
                break;
                case 8:
                bruh = "eight"
                break;
                case 9:
                bruh = "nine"
                break;
        }
        embed.setDescription(`Here are the top ${bruh} most positive people in the server!`)
        let average = 0;
        for (const c of userArray){
            if (!isNaN(c[1]))
                average += c[1]
        }
        embed.addField(`Average Server Sentiment: `,`${(average/userArray.length).toFixed(2)} (${elegance.get(values.revGet(Math.round(average*2)/2))})`);


        for(var i=0;i<count;i++){
            let username = Bot.users.cache.find(user => user.id === userArray[i][0])?.username;
            let rounded;
                if(isNaN(userArray[i][1])){
                    rounded = NaN;
                    userArray[i][1] = 0;
        }
                 else 
                    rounded =  Math.round(userArray[i][1]*2)/2;
            
                let initializer = "";

                if(i==0)
                        initializer = `<:first_place:822885876144275499>`;
                else if(i==1)
                        initializer = `<:second_place:822887005679648778>`;                
                else if(i==2)
                        initializer = `<:third_place:822887031143137321>`;
                
                if (userArray[i][0] == msg.author.id)
                    embed.addFields(
                        { name:`${initializer} **#${(i+1)}: ${username}**`, value: `**${userArray[i][1].toFixed(2)} (${elegance.get(values.revGet(rounded))})**`},)
                 else
                    embed.addFields(
                        { name:`${initializer} #${(i+1)}: ${username}`, value: `${userArray[i][1].toFixed(2)} (${elegance.get(values.revGet(rounded))})`},)
                
                
        }
        
        embed.setTimestamp()
        let ind = this.search(userArray,msg.author.id);
        let rounded = Math.round(userArray[ind][1]*2)/2;
        let initializer = "";

                if(ind==0)
                        initializer = `<:first_place:822885876144275499>`;
                else if(ind==1)
                        initializer = `<:second_place:822887005679648778>`;                
                else if(ind==2)
                        initializer = `<:third_place:822887031143137321>`;
        embed.addField(`${initializer} **#${ind+1}: ${msg.author.username}**`,`**${userArray[ind][1].toFixed(2)} (${elegance.get(values.revGet(rounded))})**`)
        msg.channel.send(embed);         
    
}

search(array: any[][], targetValue: any) {
    for (var i = 0; i < array.length; i++){
        if (array[i][0] == targetValue)
            return i;
    }
    return -1;
}
}
