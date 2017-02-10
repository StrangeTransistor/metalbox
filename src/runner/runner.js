/* @flow */
/* eslint-disable no-unused-expressions */

var bold = require('cli-color').bold

module.exports = (argv /* :Array<string> */) =>
{
	require('yargs')
	.command([ 'preset <preset>', 'p' ]
	, `run preset from ${bold('package.json')}`,
	{
		instance:
		{
			alias: 'i',
			describe: 'instance for what this release is',
			type: 'string'
		}
	},
	(yargv) =>
	{
		var preset = require('./preset')

		preset(yargv.preset, slice(yargv))
	})
	.command([ 'template <template>', 't' ]
	, `generate by template from ${bold('metalbox')} ${bold('templates/')}`
	, {},
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
