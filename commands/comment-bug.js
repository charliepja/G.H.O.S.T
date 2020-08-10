module.exports = {
	name: 'comment-bug',
	description: 'Adds a comment to an already submitted bug',
	usage: '<bot> <issue_number> <comment>',
	example: 'comment-bug havenbot 3 need more info',
	args: true,
	argsCount: 3,
	async run(message, args, octokit) {
		let repo;
		const getRepo = args[0].toLowerCase();
		const issueNumber = args[1];
		const comment = args.slice(1).join(' ');

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

		const result = await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
			owner: 'charliepja',
			repo: repo,
			issue_number: issueNumber,
			body: comment,
		});

		if(result.status === 201) {
			return message.channel.send(`Your bug report number is: ${result.data.number}`);
		}
		return message.channel.send('Error: Could not send report!');
	},
};
