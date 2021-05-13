module.exports = {
    name: 'bizno',
    description: 'Yo biz',
    async run(message, args, Discord, userStats){
      const bizEmbed = new Discord.MessageEmbed()
              .setColor('RANDOM')
              .setTitle('biz details for ' + message.author.username)
              .setURL('https://github.com/CKStudios2018/lvlBot/blob/main/stats.json')
              .addFields(
                  {name: 'biz', value: userStats.own_store + ' stores', inline: true},
                  {name: 'Bonus Coin Multiplier', value: userStats.own_store, inline: true}
              )
              .addField('\u200b', '\u200b')
              .addField("Help", '[Link](https://ckstudios2018.github.io/lvlBot/help/)')
              .setTimestamp()
              .setFooter(`biz details for ` + message.author.username + " (" + message.author.id + ")")
          message.channel.send(bizEmbed);
      }
  }