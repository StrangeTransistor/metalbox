/* @flow */
/* eslint-disable no-unused-expressions */

var bold = require('cli-color').bold

var opt_instance =
{
	alias: 'i',
	describe: 'instance for what this release is',
	type: 'string'
}

module.exports = (argv /* :Array<string> */) =>
{
	require('yargs')
	.command([ 'run <release>', 'r' ]
	, `run release taken ${bold('locally')} or from ${bold('metalbox')}`,
	{
		instance: opt_instance
	},
	(yargv) =>
	{
		var run = require('./run')

		run(yargv.release, slice(yargv))
	}
	)
	.command([ 'preset <preset>', 'p' ]
	, `run release taken from preset in ${bold('package.json')}`,
	{
		instance: opt_instance
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
	.help()
	.version()
	.alias('version', 'v')
	.parse(argv.slice(2))
}

function slice (yargv /* :yargv */)
{
	var _ = yargv._.slice(1)

	return Object.assign({}, yargv, { _: _ })
}
