module.exports = {
  name: 'buy',
  description: 'Buy stuff',
  async run(message, args, jsonfile, stats, guildStats, userStats){ 
 const item = args[0]
        if(args[0] === 'levelswap'){
            const swapPrice = 55555
        if (userStats.coins < swapPrice) {
            message.lineReply('`err:` You dont have enough coins for that!');
            } else {
            userStats.coins -= swapPrice;
            userStats.coins_spent += swapPrice;
            message.reply('GG, you just bought ' + item);
            }
        } else if(args[0] == 'cookie'){
            const cookPrice = 6
        if (userStats.coins < cookPrice) {
            message.lineReply('`err:` You dont have enough coins for that!');
            } else {
            userStats.coins -= cookPrice;
            userStats.coins_spent += cookPrice;
            message.reply('GG, you just bought ' + item);
            }
        } else if(args[0] == 'socks'){
            const sockPrice = 12
        if (userStats.coins < sockPrice) {
            message.lineReply('`err:` You dont have enough coins for that!');
            } else {
            userStats.coins -= sockPrice;
            userStats.coins_spent += sockPrice;
            message.reply('GG, you just bought ' + item);
            }
        } else if(args[0] == 'v1ru5'){
            const hackPrice = 24
            if (userStats.coins < hackPrice) {
                message.lineReply('`err:` You dont have enough coins for that!');
            } else {
                userStats.coins -= hackPrice;
                userStats.coins_spent += hackPrice;
                message.reply('GG, you just got hacked');
            } 
        } else if(args[0] == 'biz'){
            const bizPrice = 2000
            const hasBiz = 1
            if(userStats.coins < bizPrice){
                message.lineReply('`err:` You dont have enough coins for that!');
            } else {
                userStats.coins -= bizPrice;
                userStats.coins_spent += bizPrice;
                userStats.own_store += hasBiz;
                jsonfile.writeFileSync('stats.json', stats);
                if(userStats.own_store == 1){
                    message.reply('GG, you now have a business');
                } else{
                    message.reply('GG, you now have an additional business')
                }
            }
        } else if(args[0] == 'duckplush'){
            const duckpPrice = 20
            if(userStats.coins < duckpPrice){
                message.lineReply('`err:` You dont have enough coins for that!');
            } else{
                userStats.coins -= duckpPrice;
                userStats.coins_spent += duckpPrice;
                message.reply('GG, you bought ' + item);
                message.channel.send('https://image.made-in-china.com/2f0j00siwfpzRghhqZ/Fluffy-Sitting-Animal-Stuffed-Cotton-Plush-Ce-Custom-Duck-Toy.jpg')
            }
        }
    }
}
