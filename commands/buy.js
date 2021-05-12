module.exports = {
  name: 'buy',
  description: 'Buy stuff',
  async run(message, args, Discord, userStats){ 
 const item = args[0]
        if(args[0] === 'levelswap'){
            const swapPrice = 550
        if (userStats.coins < swapPrice) {
            message.lineReply('`err:` You dont have enough coins for that!');
            } else {
            userStats.coins -= swapPrice;
            userStats.coins_spent += swapPrice;
            message.reply('GG, you just bought ' + item);
            }
        } else if(args[0] == 'Cookie'){
            const cookPrice = 6
        if (userStats.coins < cookPrice) {
            message.lineReply('`err:` You dont have enough coins for that!');
            } else {
            userStats.coins -= cookPrice;
            userStats.coins_spent += cookPrice;
            message.reply('GG, you just bought ' + item);
            }
        } else if(args[0] == 'Socks'){
            const sockPrice = 12
        if (userStats.coins < sockPrice) {
            message.lineReply('`err:` You dont have enough coins for that!');
            } else {
            userStats.coins -= sockPrice;
            userStats.coins_spent += sockPrice;
            message.reply('GG, you just bought ' + item);
            }
        } else if(args[0] == 'V1RU5'){
            const hackPrice = 24
            if (userStats.coins < hackPrice) {
                message.lineReply('`err:` You dont have enough coins for that!');
            } else {
                userStats.coins -= hackPrice;
                userStats.coins_spent += hackPrice;
                message.reply('GG, you just got hacked');
            }
        }
    }
}
