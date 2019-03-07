// invite link: https://discordapp.com/oauth2/authorize?client_id=552488718188019732&scope=bot&permissions=7168

const fs = require("fs");
const Discord = require("discord.js");
const { prefix, token } = require("./config.json");
const easterEggs = require("./easterEggs");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", message => {
    // if message is from another bot end excecution
    if (message.author.bot) return;

    // if message does not start with prefix end execution
    if (!message.content.startsWith(prefix)) {
        if (easterEggs[message.content.toLowerCase()]) {
            message.channel.send(...easterEggs[message.content.toLowerCase()]);
        }
        return;
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
    if (command === "") {
        message.channel.send("No command provided");
        return;
    }
    if (!client.commands.has(command)) {
        message.channel.send("Command not found");
        return;
    }

    try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.channel.send('there was an error trying to execute that command!');
	}
});

client.on("error", error => {
    console.error(error);
});

client.login(token);