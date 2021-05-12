module.exports = {
    name: 'shop',
    description: "this is a store opening command",
    execute(message, args, Discord){
        const shopEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Shop')
            .setDescription('Spend your coins in the wholesome shop!')
            .setURL('https://github.com/CKStudios2018/lvlBot/blob/main/commands/shop.js')
            .addFields(
                {name: 'Lamborghini Huracán Evo', value: '261274 coins', inline: true},
                {name: 'Cookie', value: '6 coins', inline: true},
                {name: 'Level Copy', value: '550 coins', inline: true},
                {name: 'Socks', value: '12 coins', inline: true},
                {name: 'V1RU5', value: '24 coins', inline: true},
                {name: 'biz', value: "It's a business, ok? \n 2000 coins", inline: true}
            )
            .addField('\u200b', '\u200b')
            .addField("Help", '[Link](https://ckstudios2018.github.io/lvlBot/help/shop)', true)
            .addField("Sell Item", '[Link](https://ckstudios2018.github.io/lvlBot/shop/sell/)', true)
            .setTimestamp()
            .setFooter(`requested by ` + message.author.username + " (" + message.author.id + ")")
        message.channel.send(shopEmbed);
        message.channel.send('Use `>buy {item} [optional]` to buy stuff from the shop!');
    }
}
