const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
	name: 'get-update',
	description: 'Retrieves any comments that have been made on a submitted bug',
	usage: '<bot> <issue_number>',
	example: 'get-update havenbot 3',
	args: true,
	argsCount: 2,
	async run(message, args, octokit) {
		let repo;
		const getRepo = args[0].toLowerCase();
		const issueNumber = parseInt(args[1]);

		if(['haven', 'havenbot'].indexOf(getRepo) !== -1) {
			repo = 'HavenBotv3';
		}
		else if(getRepo === 'dochas') {
			repo = 'Dochas';
		}
		else if(['hedwig', 'hermes'].indexOf(getRepo) !== -1) {
			repo = 'Hedwig';
		}
		else {
			return message.channel.send('Error, cannot find repo!');
		}

		const result = await octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}/comments', {
			owner: 'charliepja',
			repo: repo,
			issue_number: issueNumber,
		});

		if(result.status === 200) {
			const comments = result.data;
			const embed = new MessageEmbed()
				.setColor('#a6a6a6')
				.setTimestamp();

			for(const comment of comments) {
				const commentBody = comment.body;
				const createdAt = comment.created_at;
				const updatedAt = comment.updated_at;
				embed.addField('\u200b', `Comment Created: ${moment(createdAt).format('DD MMM YY')}\nComment Updated: ${moment(updatedAt).format('DD MMM YY')}\n\nComment: ${commentBody}`);
			}

			return message.channel.send({ embed: embed });
		}
		return message.channel.send('Error: Could not send report!');
	},
};
