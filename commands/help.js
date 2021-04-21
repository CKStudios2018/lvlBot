module.exports = {
    name: 'help',
    description: "this is a help command",
    execute(message, args){
        message.react('✅');
        message.channel.send('Public commands: `-help`, `-rank`, `-setrank`');

    }
}