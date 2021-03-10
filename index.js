const Discord = require('discord.js');
const random = require('random');
const fs = require('fs');
const jsonfile = require('jsonfile');


const bot = new Discord.Client();

var stats = {};
if (fs.existsSync('stats.json')) {
    stats = jsonfile.readFileSync('stats.json');
}


bot.on('message', (message) => {
    if (message.author.id == bot.user.id)
        return;

    if (message.guild.id in stats === false) {
        stats[message.guild.id] = {};
    }


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

    const parts = message.content.split(' ');

    if(parts[0] === '!hello') {
        message.reply('hi')
    }
});

bot.login('ODA0MjMzMTkyNjM4MzgyMTAy.YBJWhw.Omd4-mqj4cmS2RNspB2_KExZyW4');
