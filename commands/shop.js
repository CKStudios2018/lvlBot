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
                {name: 'Lamborghini Huracán Evo', value: '`ID: lambo` 261274 coins', inline: true},
                {name: 'Cookie', value: '`ID: cookie` 6 coins', inline: true},
                {name: 'Level Swap', value: '`ID: levelswap` 55555 coins', inline: true},
                {name: 'Socks', value: '`ID: socks` 12 coins', inline: true},
                {name: 'V1RU5', value: '`ID: v1ru5` 24 coins', inline: true},
                {name: 'biz', value: "`ID: biz` It's a business, ok? \n 2000 coins", inline: true},
                {name: 'Duck Plush', value: '`ID: duckplush` \n 20 coins'}
            )
            .addField('\u200b', '\u200b')
            .addField("Help", '[Link](https://ckstudios2018.github.io/lvlBot/help/shop)', true)
            .addField("Sell Item", '[Link](https://ckstudios2018.github.io/lvlBot/shop/sell/)', true)
            .setTimestamp()
            .setFooter(`requested by ` + message.author.username + " (" + message.author.id + ")")
        message.channel.send(shopEmbed);
        message.channel.send('Use `>buy {item_ID} [optional]` to buy stuff from the shop!');
    }
}
