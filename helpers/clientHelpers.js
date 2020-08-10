const fs = require('fs');
const path = require('path');

module.exports.generateCommands = async (collection) => {
	const commandFile = fs.readdirSync(path.resolve('commands')).filter(file => file.endsWith('.js'));
	for (const file of commandFile) {
		const command = require(path.resolve('commands', file));
		collection.set(command.name, command);
	}
};
