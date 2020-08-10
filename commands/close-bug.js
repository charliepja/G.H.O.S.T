const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'close-bug',
	description: 'Closes {resolves} an already submitted bug',
	usage: '<bot> <issue_number> <reason>',
	example: 'close-bug havenbot 3 resolved | off-topic | too heated | spam',
	args: true,
	argsCount: 3,
	async run(message, args, octokit) {
		if(message.author.id !== '197793890034515969') return;
		let repo;
		let issueChannel;
		const getRepo = args[0].toLowerCase();
		const issueNumber = args[1];
		const reason = args[2];

		if(['haven', 'havenbot'].indexOf(getRepo) !== -1) {
			repo = 'HavenBotv3';
			issueChannel = '742076933801508885';
		}
		else if(getRepo === 'dochas') {
			repo = 'Dochas';
			issueChannel = '742076906626613259';
		}
		else if(['hedwig', 'hermes'].indexOf(getRepo) !== -1) {
			repo = 'Hedwig';
			if(getRepo === 'hedwig') {
				issueChannel = '742076881938939985';
			}
			else {
				issueChannel = '742076852960624752';
			}
		}
		else {
			return message.channel.send('Error, cannot find repo!');
		}

		await octokit.request('PUT /repos/{owner}/{repo}/issues/{issue_number}/lock', {
			owner: 'charliepja',
			repo: repo,
			issue_number: issueNumber,
			lock_reason: reason,
		});

		const embed = new MessageEmbed()
			.setColor('#a6a6a6')
			.setDescription(`Issue number: ${issueNumber} has been locked for the following reason: ${reason}`)
			.setTimestamp();

		message.channel.send({ embed: embed });
		return message.client.channels.resolve(issueChannel).send({ embed: embed });

	},
};
