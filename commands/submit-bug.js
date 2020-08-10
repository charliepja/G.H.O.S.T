const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'submit-bug',
	description: 'Submits a bug for the chosen bot',
	usage: '<bot> <command_broken> <bug_report>',
	example: 'submit-bug havenbot ban <insert debugging checklist>',
	args: true,
	argsCount: 3,
	async run(message, args, octokit) {
		let repo;
		let issueChannel;
		const getRepo = args[0].toLowerCase();
		const title = args[1];
		const issue = args.slice(1).join(' ');

		if(['haven', 'havenbot'].indexOf(getRepo) !== -1) {
			repo = 'HavenBotv3';
			issueChannel = '742076748438700052';
		}
		else if(getRepo === 'dochas') {
			repo = 'Dochas';
			issueChannel = '742076769066025050';
		}
		else if(['hedwig', 'hermes'].indexOf(getRepo) !== -1) {
			repo = 'Hedwig';
			if(getRepo === 'hedwig') {
				issueChannel = '742076793032278087';
			}
			else {
				issueChannel = '742076819087425597';
			}
		}
		else {
			return message.channel.send('Error, cannot find repo!');
		}

		const result = await octokit.request('POST /repos/{owner}/{repo}/issues', {
			owner: 'charliepja',
			repo: repo,
			title: title,
			body: issue,
		});

		if(result.status === 201) {
			const embed = new MessageEmbed()
				.setColor('#a6a6a6')
				.setDescription(`A new bug has been submitted!\nCommand: ${title}\nIssue:${issue}`)
				.setFooter(`Submitted by: ${message.author.username} | ${message.author.id}`)
				.setTimestamp();

			message.client.channels.resolve(issueChannel).send({ embed: embed });
			return message.channel.send(`Your bug report number is: ${result.data.number}`);
		}
		return message.channel.send('Error: Could not send report!');
	},
};
