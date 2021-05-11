module.exports = {
    name: 'credits',
    description: 'Shows the credits',
    execute(message, args, Discord) {
      const chawiEmbed = new Discord.MessageEmbed()
        .setTitle('Chawi Mi')
        .setDescription("Lead Developer")
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
        .addField("Discord Server", "N/A", true)
        .addField("YouTube", "[Alkazar](https://www.youtube.com/channel/UCNioMTBy56r2S-AOWv_7z-Q)", true)
        .addField("Twitch", "[AlkazarG](https://www.twitch.tv/alkazarg)", true)
        .setThumbnail('https://cdn.discordapp.com/avatars/503538108705538050/5a0c5b420fce33805cdf846ee76fc463.png?size=128')
        .setTimestamp()
        .setFooter('Alkazar.jar#2370')
        .setColor('RANDOM')
  
    
      message.channel.send(chawiEmbed);
      message.channel.send(alkEmbed);
    }
  }
