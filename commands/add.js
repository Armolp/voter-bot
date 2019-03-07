module.exports = {
    name: "add",
    description: "Add people to the voting games",
    execute(message, args) {
        console.log(args);
        message.channel.send("Added tribute");
    },
};