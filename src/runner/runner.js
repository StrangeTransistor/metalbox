/* @flow */
/* eslint-disable no-unused-expressions */

module.exports = (argv /* :Array<string> */) =>
{
	require('yargs')
	.command([ 'run <preset>', 'r' ], 'run preset',
	{
		instance:
		{
			alias: 'i',
			describe: 'instance for what this release is',
			default: 'battle'
		}
	},
	(yargv) =>
	{
		var preset = require('./preset')

		preset(yargv.preset, slice(yargv))
	})
	.command([ 'template <template>', 't' ], 'generate by template', {},
	(yargv) =>
	{
		var template = require('./template')

		template(yargv.template, slice(yargv))
	})
	// .showHelp()
	.help()
	.version()
	.parse(argv.slice(2))
}

function slice (yargv /* :yargv */)
{
	var _ = yargv._.slice(1)

	return Object.assign({}, yargv, { _: _ })
}
