module.exports = {
  name: 'bal',
  description: 'Ur balance',
  async run(message, args, Discord, userStats){
    const guildMember = message.mentions.members.first();
    const balanceEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Account details for ' + message.author.username)
            .setThumbnail(message.author.avatarURL())
            .setURL('https://github.com/CKStudios2018/lvlBot/blob/main/stats.json')
            .addFields(
                {name: 'Balance', value: userStats.coins + ' coins', inline: true},
                {name: 'Level', value: userStats.level, inline: true},
                {name: 'Total XP', value: userStats.total_xp, inline: true},
                {name: 'Coins Spent', value: userStats.coins_spent + ' coins', inline: true},
                {name: 'Biz Owned', value: userStats.own_store, inline: true},
                {name: 'Date joined', value: `on ${ message.member.joinedAt }`, inline: false}
            )
            .addField('\u200b', '\u200b')
            .addField("Help", '[Link](https://ckstudios2018.github.io/lvlBot/help/)')
            .setTimestamp()
            .setFooter(`Account details for ` + message.author.username + " (" + message.author.id + ")")
        message.channel.send(balanceEmbed);
    }
}