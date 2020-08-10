require('dotenv').config();
const Discord = require('discord.js');
const { Octokit } = require('@octokit/core');
const clientHelper = require('./helpers/clientHelpers.js');

const octokit = new Octokit({
	auth: process.env.GITHUB,
});

const client = new Discord.Client({ fetchAllMembers: true });

const prefix = '!';

client.commands = new Discord.Collection();

clientHelper.generateCommands(client.commands, 'commands');

client.on('ready', async () => {
	console.log('Hello World!');
});

client.on('message', async (message) => {
	if(message.author.bot) return;
	if(!message.content.startsWith(prefix)) return;
	const split = message.content.split(/ +/g);
	const commandName = split[0].slice(prefix.length).toLowerCase();
	const args = split.slice(1);

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if(!command) return;

	try {
		return command.run(message, args, octokit);
	}
	catch(error) {
		console.log(error);
		if(error) throw error;
	}
});

client.login(process.env.TOKEN);
