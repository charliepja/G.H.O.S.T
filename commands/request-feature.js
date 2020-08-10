const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'request-feature',
	description: 'Request a feature be implemented or changed for the chosen bot',
	usage: '<bot> <command> <implementation>',
	example: 'request-feature havenbot freeze locks the channel',
	args: true,
	argsCount: 3,
	async run(message, args) {
		let requestChannel;
		const commandName = args[1];
		const request = args.slice(1).join(' ');

		if(['haven', 'havenbot'].indexOf(args[0].toLowerCase()) !== -1) {
			requestChannel = '742076748438700052';
		}
		else if(args[0].toLowerCase() === 'dochas') {
			requestChannel = '742076769066025050';
		}
		else if(['hedwig', 'hermes'].indexOf(args[0].toLowerCase()) !== -1) {
			if(args[0].toLowerCase() === 'hedwig') {
				requestChannel = '742076793032278087';
			}
			else {
				requestChannel = '742076819087425597';
			}
		}
		else {
			return message.channel.send('Error, cannot find bot!');
		}

		const embed = new MessageEmbed()
			.setColor('#a6a6a6')
			.setDescription(`A new request has been submitted!\nCommand: ${commandName}\nIssue:${request}`)
			.setFooter(`Submitted by: ${message.author.username} | ${message.author.id}`)
			.setTimestamp();

		return message.client.channels.resolve(requestChannel).send({ embed: embed });
	},
};
