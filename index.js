const Discord = require('discord.js'); // Imports the required libraries.
require('discord-reply');
const random = require('random'); 
const fs = require('fs');
const jsonfile = require('jsonfile');
const { O_TRUNC } = require('constants');

const prefix = '>'; // The prefix you want your bot to use.
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command);
}

bot.once('ready', async () => { 
    await bot.user.setPresence({ activity: { name: "Levels", type: "LISTENING"}, status: 'dnd'}) // Sets the bot's status.
    console.log("ayo, I'm online"); // Sends a message in the console when the bot is online.
});

var stats = {};
if(fs.existsSync('stats.json')) {
    stats = jsonfile.readFileSync('stats.json');  // The stats variable.
}

bot.on('message', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return; // Checks if a message starts with the prfix or is sent by anothre bot.

    let channel = message.channel;

    if (message.guild.id in stats === false) {
        stats[message.guild.id] = {};
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const guildStats = stats[message.guild.id];
    if (message.author.id in guildStats === false) { // Checks if a user has any xp/items. If they don't it sets it to zero.
        guildStats[message.author.id] = {
            xp: 0,
            total_xp: 0,
            level: 0,
            last_message: 0,
            coins: 0,
            coins_spent: 0,
            own_store: 0
        };
    }

    const userStats = guildStats[message.author.id];
    if (Date.now() - userStats.last_message > 60000) { // Makes it so that the bot gives xp with 60 second intervals instead of every message to avoid spam letting people level up.
        if(userStats.own_store == 0){ // Checks if the user doesn't own a store and applies these coin and xp values.
            userStats.xp += random.int(25, 35);
            userStats.coins += random.int(1, 5);
            userStats.total_xp += random.int(25, 35);
        } else { // Checks if the user owns a store and applies these coin and xp values instead of the normal ones.
            userStats.xp += random.int(30, 35) * userStats.own_store;
            userStats.coins += random.int(2, 10) * userStats.own_store;
            userStats.total_xp += random.int(30, 35) * userStats.own_store;
        }
        userStats.last_message = Date.now();
        const xpToNextLvl = 5 * Math.pow(userStats.level, 2) + 50 * userStats.level + 100;
        if(userStats.xp >= xpToNextLvl) {
            const name = 'levels'; // A const for the channel name to execute the following code in.
            const Admin = message.member.roles.cache.some(r  => r.name === "Admin") // This is the admin role's definition for the next section of code. Change this to the Admin role of your server.
            userStats.level++;
            userStats.xp = userStats.xp - xpToNextLvl;
            if(message.guild.channels.cache.find(chnl => chnl.name === 'levels')) {
            message.guild.channels.cache.find(i => i.name === 'levels').send(`<@!${message.author.id}> has reached level ` + userStats.level); // Sends the level up message in the levels channel.
            } else{
                message.guild.channels.create(name, { // If there isn't a channel called levels it creates a channel called that.
                    topic: `levels go here...`,
                    permissionOverwrites: [{
                        id: bot.id,
                        allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'SEND_MESSAGES'], // Permissions for the bot in the levels channel.
                    }, {
                        id: message.author.id,
                        allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS'], // Permissions for members of the server in the levels channel.
                    }, {
                        id: message.guild.id,
                        deny: ['ADD_REACTIONS', 'ATTACH_FILES', 'SEND_MESSAGES'],

                    }, {
                        id: Admin,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS'] // Channel permissions for the Admin role
                    }]
                })
            }
        }
        jsonfile.writeFileSync('stats.json', stats); // Writes all the data in a json file.
    }

    if(command === 'rank'){
        message.reply(' you are at level ' + userStats.level); // Displayes the user's rank.
    } else if(command == 'help'){
        bot.commands.get('help').run(message, args, Discord); // Takes code from the help.js file and executes it.
        message.channel.send(`code ${bot.guilds.cache.size}`);
    } else if(command == 'bal'){
        bot.commands.get('bal').run(message, args, Discord, userStats); // Takes code from the bal.js file and executes it.
    } else if(command == 'shop'){
        bot.commands.get('shop').execute(message, args, Discord); // Takes code from the shop.js file and executes it.
    } else if(command == 'buy'){
        bot.commands.get('buy').run(message, args, jsonfile, stats, guildStats, userStats); // Takes code from the buy.js file and executes it.
    } else if(command == 'credits'){
        bot.commands.get('credits').execute(message, args, Discord); // Takes code from the credits.js file and executes it.
    } else if(command == 'biz'){
        bot.commands.get('bizno').run(message, args, Discord, userStats); // Takes code from the bizno.js file and executes it.
    }
});

bot.login('not process.env.token'); // Makes the bot login to the token in the env file.
