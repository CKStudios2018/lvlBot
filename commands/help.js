module.exports = {
    name: 'help',
    description: "this is a help command",
    execute(message, args){
        message.channel.send('Public commands: !help, !rank');
        message.react('764475201668251648');
    }
}