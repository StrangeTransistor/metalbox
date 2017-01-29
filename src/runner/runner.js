/* @flow */
/* eslint-disable no-unused-expressions */

module.exports = (argv /* :Array<string> */) =>
{
	require('yargs')
	.command([ 'run <preset>', 'r' ], 'run preset', {},
	(argv) =>
	{
		var preset = require('./preset')

		preset(argv.preset)
	})
	.command([ 'template <template>', 't' ], 'generate by template', {},
	(argv) =>
	{
		var template = require('./template')

		template(argv.template)
	})
	// .showHelp()
	.help()
	.version()
	.parse(argv.slice(2))
}
