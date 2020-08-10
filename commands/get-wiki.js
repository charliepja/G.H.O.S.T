module.exports = {
	name: 'get-wiki',
	description: 'Returns a link to the chosen bot\'s wiki page',
	usage: '<bot>',
	example: 'get-wiki havenbot',
	args: true,
	argsCount: 1,
	async run(message, args, octokit) {
		let repo;
		const getRepo = args[0].toLowerCase();

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

		const result = await octokit.request('GET /repos/{owner}/{repo}/pages', {
			owner: 'charliepja',
			repo: repo,
		});

		message.channel.send(result.data.html_url);
	},
};
