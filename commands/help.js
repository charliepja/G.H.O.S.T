const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'help',
	description: 'Meta',
	usage: '<*command>',
	example: 'help OR help submit-bug',
	args: false,
	async run(message, args) {
		let command;
		if(args[0]) {
			command = args[0].toLowerCase();
			if(message.client.commands.has(command)) {
				const getCommand = message.client.commands.get(command);

				const embed = new MessageEmbed()
					.setColor('#a6a6a6')
					.setDescription(`Name: ${getCommand.name}\nDescription: ${getCommand.description}\nUsage: ${getCommand.usage}\nExample: ${getCommand.example}`)
					.setTimestamp();

				return message.channel.send({ embed: embed });
			}
			return message.reply('Error: Cannot find command');
		}

		const allCommands = message.client.commands.map(c => c.name);
		const commandNames = allCommands.join('\n');

		const embed = new MessageEmbed()
			.setColor('#a6a6a6')
			.setDescription(commandNames)
			.setTimestamp();

		return message.channel.send({ embed: embed });
	},
};
