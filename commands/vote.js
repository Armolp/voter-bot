module.exports = {
    name: "vote",
    description: "vote for a person",
    execute(message, args) {
        console.log(args);
        message.channel.send("vote not implemented");
    },
};