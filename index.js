const Discord = require('discord.js');
const random = require('random');
const fs = require('fs');
const jsonfile = require('jsonfile');

const prefix = '!';
const bot = new Discord.Client();

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

var stats = {};
if (fs.existsSync('stats.json')) {
    stats = jsonfile.readFileSync('stats.json');
}


bot.on('message', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    if (message.guild.id in stats === false) {
        stats[message.guild.id] = {};
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();


    const guildStats = stats[message.guild.id];
    if (message.author.id in guildStats === false) {
         guildStats[message.author.id] = {
             xp: 0,
             level: 0,
             last_message: 0
         };
    }
    

    const userStats = guildStats[message.author.id];
    if (Date.now() - userStats.last_message > 30000) {
    userStats.xp += random.int(25, 35);
    userStats.last_message = Date.now();

    const xpToNextLvl = 5 * Math.pow(userStats.level, 2) + 50 * userStats.level + 100;
    if(userStats.xp >= xpToNextLvl) {
        userStats.level++;
        userStats.xp = userStats.xp - xpToNextLvl;
        message.reply(' has reached level ' + userStats.level);
        console.log(message.author.username + ' has reached level ' + userStats.level);
    }

    jsonfile.writeFileSync('stats.json', stats);

}


    if(command === 'rank'){
        message.reply(' you are at level ' + userStats.level);
    } else if(command == 'help'){
        client.commands.get('help').execute(message, args);
    }
});

bot.login(process.env.token);
