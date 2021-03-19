import * as Discord from "discord.js";
import * as Config from "./config";
var db = require('quick.db');
import { IBotCommand } from "./api/capi";
import { IBotEvent } from "./api/eapi";
var userBehavior = new db.table('user');
const Bot: Discord.Client = new Discord.Client();
const request = require('request');
const fs = require('fs');
//Required imports

let commands: IBotCommand[] = [];
let events: IBotEvent[] = [];


loadCommands(`${__dirname}/commands`)
loadEvents(`${__dirname}/events`)
//get all commands from directory name (arbitrary) and load them into commands which is of type IBotCommand

const cooldowns: any = new Discord.Collection();

//cooldowns is a object that takes a key-value pair and stores it in an array
function randint(min: number,max: number) // min and max included
{
        return Math.floor(Math.random()*(max-min+1)+min);
}

Bot.on("ready", () => {
    console.log("This bot is online!"); //standard protocol when starting up the bot
    Bot.user!.setPresence({ activity: {type: "WATCHING", name: 'you through your window' }, status: 'dnd' })
    //.then(console.log)
    .catch(console.error);

    let allUsers = Bot.users.cache.array(); //get all Users and store them in an array
    for (let i = 0; i < allUsers.length; i++){
        if (!db.has(allUsers[i].id)){ //if User ID is not already in database (db) then add them, else do nothing
            db.set(allUsers[i].id,{msgArray:[],sentiment:0,strikes:0,recycleAmt:0})
        }
    } 
    
})

Bot.on("guildMemberAdd", member => {
   if (!db.has(member.id)){ //if new member not in db, add them!
       db.set(member.id,{sentiment:0,strikes:0})
   }
   console.log(member.user)
   var role: any = member.guild.roles.cache.find(role => role.id == "822258289814536203");
    member.roles.add(role);
 
})

Bot.on("message", msg => {
    if (msg.author.bot) return;
    handleEvent(msg); // checks every message regardless of what it contains
    if (!msg.content.startsWith('!')) return;
    if (msg.channel.type == 'dm'){
        msg.author.send(`Please talk to me on a server! This ensures more engagement and reliability.`);
        return;
    } //makes sure that user cannot talk to bot on direct message, must be server!
    handleCommand(msg);

})

async function handleEvent(msg: Discord.Message){
    for (const eventClass of events){
        await eventClass.runEvent(msg,Bot);
    }
}

async function handleCommand(msg: Discord.Message){
    let command = msg.content.split(" ")[0].replace(Config.config.prefix,"").toLowerCase(); //Config.config.prefix is "!"
    let args = msg.content.split(" ").slice(1);
    //Make command and args lowercase
    if (command == "helpcommands" || command == "helpcommand" || command == "helpcmd"){
        let a = [];
        for (const cmdClass of commands){
            a.push(`${cmdClass.name()}\n`);
        }
        msg.author.send(`Here are a list of my commands: ${a}\nYou can say \`!command_name help\``);
        return;
    } //see above

    for (const commandClass of commands){
        try {
            if (!commandClass.isThisCommand(command) ){
                continue;
            } //Checks IBotCommands (located in api.ts) for layout, if isThisCommand String is not equal to command, skip!
            if (!cooldowns.has(commandClass.name())) { //if name String in capi.ts (IBotCommand) == to command
                cooldowns.set(commandClass.name(), new Discord.Collection()); //store the command name and a obj key-val 
            }
            
            const now = Date.now();
            const timestamps = cooldowns.get(commandClass.name()); //whatever is in the Discord.Collection, yeah thats timestamps now!
            const cooldownAmount = (commandClass.cooldown() || 3) * 1000; //from ms to sec
            //Begins the cooldown command process!
            if (timestamps.has(msg.author.id)) { //checks to see if user in col
                const expirationTime: number = timestamps.get(msg.author.id) + cooldownAmount; //expiration is time assigned to user + cooldownAmt
            
                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    if (timeLeft > 3600){
                        return msg.reply(`please wait ${Math.round(timeLeft/3600)} more hour(s) before reusing the \`${commandClass.name()}\` command.`);
                    } else if (timeLeft > 60 && timeLeft < 3600){
                        return msg.reply(`please wait ${Math.round(timeLeft/60)} more minute(s) before reusing the \`${commandClass.name()}\` command.`);
                    } else {
                    return msg.reply(`please wait ${Math.round(timeLeft)} more second(s) before reusing the \`${commandClass.name()}\` command.`);
                } //if hours, run 1, if min, run2, else run3
            }
            }
            timestamps.set(msg.author.id, now); //user = key, time = val
            setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount); //wait cooldownAmt!
            await commandClass.runCommand(args,msg,Bot); //allows asynchronous operation and multithreading so multiple things can happen at once! also executes the cmd!
        }
        catch(e){
            console.log(e);
        }  //if error, log it!
    }
} 

function loadCommands(commandsPath: string){
    if (!Config.config.commands || (Config.config.commands as string[]).length == 0) return; //goes into config.ts and reads the commands, checks if they are valid

    for (const commandName of Config.config.commands as string[]){ //turns commands in config.ts into a string array and iterates over them
        const commandsClass = require(`${commandsPath}/${commandName}`).default; //imports the command file (default=ts) from file directory

        const command = new commandsClass() as IBotCommand; //command now follows same layout as IBotCommand in form commandsClass(), created new object
        commands.push(command); //adds commands to command array
    }
}

function loadEvents(commandsPath: string){
    if (!Config.config.events || (Config.config.events as string[]).length == 0) return; 

    for (const eventName of Config.config.events as string[]){ //turns events in config.ts into a string array and iterates over them
        const eventsClass = require(`${commandsPath}/${eventName}`).default; //imports the event file (default=ts) from file directory

        const event = new eventsClass() as IBotEvent; //command now follows same layout as IBotCommand in form commandsClass(), created new object
        events.push(event); //adds event to events array
    }
}

Bot.login(Config.config.token); //logs in using token in config.config (not accessible to you)
