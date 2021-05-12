module.exports = {
  name: 'help',
  description: 'Get some commands help!',
  async run(message, args, Discord){
    message.react('✅');
        const helpEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Help')
            .setDescription('Get some commands help!')
            .setURL('https://ckstudios2018.github.io/lvlBot/help/')
            .addFields(
                {name: 'Help', value: 'This embed', inline: true},
                {name: 'Rank', value: 'Shows your DLB Rank', inline: true},
                {name: 'Bal', value: 'Shows your balance, rank and total XP', inline: true},
                {name: 'Shop', value: 'Opens the shop', inline: true},
                {name: 'Buy', value: 'For buying an item {requires args}', inline: true},
                {name: 'credits', value: 'Shows the creators of this wonderful bot', inline: true},
                {name: 'biz', value: 'administrate your buisiness!', inline: true}
            )
            .addField('\u200b', '\u200b')
            .addField("Website", '[Link](https://ckstudios2018.github.io/lvlBot/)', true)
            .setTimestamp()
            .setFooter(`requested by ` + message.author.username + " (" + message.author.id + ")")
        message.channel.send(helpEmbed);
  }
}
