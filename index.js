const Discord = require('discord.js');
const random = require('random');
const fs = require('fs');
const jsonfile = require('jsonfile');
const { O_TRUNC } = require('constants');

const prefix = '>';
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command);
}

bot.once('ready', async () => {
    await bot.user.setPresence({ activity: { name: "Levels", type: "LISTENING"}, status: 'dnd'})
    console.log("ayo, I'm online");
});

var stats = {};
if(fs.existsSync('stats.json')) {
    stats = jsonfile.readFileSync('stats.json');
}

bot.on('message', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    let channel = message.channel;

    if (message.guild.id in stats === false) {
        stats[message.guild.id] = {};
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const guildStats = stats[message.guild.id];
    if (message.author.id in guildStats === false) {
        guildStats[message.author.id] = {
            xp: 0,
            total_xp: 0,
            level: 0,
            last_message: 0,
            coins: 0
        };
    }

    const userStats = guildStats[message.author.id];
    if (Date.now() - userStats.last_message > 60000) { //Now it's 60s
        userStats.xp += random.int(25, 35);
        userStats.coins += random.int(1, 5);
        userStats.total_xp += random.int(25, 35);
        userStats.last_message = Date.now();
        const xpToNextLvl = 5 * Math.pow(userStats.level, 2) + 50 * userStats.level + 100;
        if(userStats.xp >= xpToNextLvl) {
            const name = 'levels';
            const Admin = message.guild.roles.cache.get("835850414183546910")
            userStats.level++;
            userStats.xp = userStats.xp - xpToNextLvl;
            if(message.guild.channels.cache.find(chnl => chnl.name === 'levels')) {
            message.guild.channels.cache.find(i => i.name === 'levels').send(`<@!${message.author.id}> has reached level ` + userStats.level);
            } else{
                message.guild.channels.create(name, {
                    topic: `levels go here...`,
                    permissionOverwrites: [{
                        id: message.author.id,
                        allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS'],
                    }, {
                        id: message.guild.id,
                        deny: ['ADD_REACTIONS', 'ATTACH_FILES', 'SEND_MESSAGES'],

                    }, {
                        id: Admin,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS']
                    }]
                })
            }
        }
        jsonfile.writeFileSync('stats.json', stats);
    }

    if(command === 'rank'){
        message.reply(' you are at level ' + userStats.level);
    } else if(command == 'help'){
        message.react('✅');
        const helpEmbed = new Discord.MessageEmbed()
            .setColor('#AE7BDA')
            .setTitle('Help')
            .setDescription('Get some commands help!')
            .setURL('https://ckstudios2018.github.io/lvlBot/help/')
            .addFields(
                {name: 'Help', value: 'This embed', inline: true},
                {name: 'Rank', value: 'Shows your DLB Rank', inline: true},
                {name: 'XP', value: 'Shows your total DLB XP', inline: true},
                {name: 'bal', value: 'Shows your balance', inline: true},
                {name: 'Shop', value: 'Opens the shop', inline: true},
                {name: 'buy', value: 'for buying an item', inline: true}
            )
            .addField('\u200b', '\u200b')
            .addField("Website", '[Link](https://ckstudios2018.github.io/lvlBot/)', true)
            .setTimestamp()
            .setFooter(`requested by ` + message.author.username + " (" + message.author.id + ")")
        message.channel.send(helpEmbed);
    } else if(command == 'bal'){
        const balanceEmbed = new Discord.MessageEmbed()
            .setColor('#AE7BDD')
            .setTitle('Account details for ' + message.author.username)
            .setURL('https://github.com/CKStudios2018/lvlBot/blob/main/stats.json')
            .addFields(
                {name: 'Balance', value: userStats.coins, inline: true},
                {name: 'Level', value: userStats.level, inline: true},
                {name: 'Total XP', value: userStats.total_xp, inline: true}
            )
            .addField('\u200b', '\u200b')
            .addField("Help", '[Link](https://ckstudios2018.github.io/lvlBot/help/)')
            .setTimestamp()
            .setFooter(`Account details for ` + message.author.username + " (" + message.author.id + ")")
        message.channel.send(balanceEmbed);
    } else if(command == 'shop'){
        bot.commands.get('shop').execute(message, args, Discord);
    } else if(command == 'buy'){
        message.channel.send('sorry that command is still a work in progress');
    }
});

bot.login('not process.env.token');