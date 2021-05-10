module.exports = {
    name: 'credits',
    description: 'Shows the credits',
    execute(message, args, Discord) {
      const chawiEmbed = new Discord.MessageEmbed()
        .setTitle('Chawi Mi')
        .setDescription("Developer")
        .addField("GitHub", "[CKStudios](https://github.com/CKStudios2018)", true)
        .addField("Discord Server", "[CKStudios](https://discord.gg/fArH9rD)", true)
        .addField("YouTube", "[CKStudios](https://www.youtube.com/channel/UCXTuP_fBMU6EZszt19PYBCA)", true)
        .addField("Twitch", "[CKStudios](https://www.twitch.tv/ckstudios2003)", true)
        .setThumbnail("https://images-ext-2.discordapp.net/external/wJjqJ1zDQJ_MhPA8lx1yXTTAvXRUJsvREmcqFkmVOpI/https/cdn.discordapp.com/avatars/762935989512437800/df35556c0b6d86dc4b755bdb03aa3006.webp")
        .setTimestamp()
        .setFooter('Chawi Mi#8485')
        .setColor('RANDOM')
        
      const alkEmbed = new Discord.MessageEmbed()
        .setTitle('Alkazar')
        .setDescription("Developer & Art design")
        .addField("GitHub", "[AlkazarG](https://github.com/AlkazarG)", true)
        .addField("Discord Server", "None", true)
        .addField("YouTube", "[Alkazar](https://www.youtube.com/channel/UCNioMTBy56r2S-AOWv_7z-Q)", true)
        .addField("Twitch", "[AlkazarG](https://www.twitch.tv/alkazarg)", true)
        .setThumbnail('https://cdn.discordapp.com/attachments/808276626734579753/835097470148411422/image0.jpg')
        .setTimestamp()
        .setFooter('Alkazar™#2370')
        .setColor('RANDOM')
  
    
      message.channel.send(chawiEmbed);
      message.channel.send(alkEmbed);
    }
  }