/* @flow */
/* eslint-disable no-unused-expressions */

module.exports = (argv /* :Array<string> */) =>
{
	require('yargs')
	.command([ 'run <preset>', 'r' ], 'run preset', {},
		require('./preset'))
	.command([ 'template <template>', 't' ], 'generate by template', {},
		require('./template')
	)
	// .showHelp()
	.help()
	.version()
	.parse(argv.slice(2))
}
