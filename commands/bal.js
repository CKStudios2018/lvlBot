module.exports = {
  name: 'bal',
  description: 'Ur balance',
  async run(message, args, Discord){
    const balanceEmbed = new Discord.MessageEmbed()
            .setColor('#AE7BDD')
            .setTitle('Account details for ' + message.author.username)
            .setThumbnail(message.author.avatarURL())
            .setURL('https://github.com/CKStudios2018/lvlBot/blob/main/stats.json')
            .addFields(
                {name: 'Balance', value: userStats.coins + ' coins', inline: true},
                {name: 'Level', value: userStats.level, inline: true},
                {name: 'Total XP', value: userStats.total_xp, inline: true},
                {name: 'Coins Spent', value: userStats.coins_spent + ' coins', inline: true}
            )
            .addField('\u200b', '\u200b')
            .addField("Help", '[Link](https://ckstudios2018.github.io/lvlBot/help/)')
            .setTimestamp()
            .setFooter(`Account details for ` + message.author.username + " (" + message.author.id + ")")
        message.channel.send(balanceEmbed);
    
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
            } else {
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
  }
}
