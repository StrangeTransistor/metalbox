/* @flow */

var findRoot = require('find-root')
var Rootpath = require('rootpath')

var load = require('fs-sync').readJSON

// var Proxy = require('../artifact/Proxy')

// var Printer = require('../printer')
// var ReleaseNotify = require('../notify/release-notify')

var clc = require('cli-color')
var bold = clc.bold

var program = require('commander')

/* eslint-disable complexity */
program
.command('run <preset>').action(preset_name =>
{
	var rootpath = Rootpath(findRoot(process.cwd()))

	var manifest = load(rootpath('package.json'))

	if (! manifest.metalbox)
	{
		console.error(
			`${bold('metalbox')} not found in ${bold('package.json')}` +
			` at ${clc.italic.cyan(rootpath())}`
		)
		process.exit(-1)
	}

	var metalbox = manifest.metalbox

	if (! metalbox.presets)
	{
		console.error(
			`${bold('metalbox.presets')} not found in ${bold('package.json')}` +
			` at ${clc.italic.cyan(rootpath())}`
		)
		process.exit(-1)
	}

	var presets = metalbox.presets

	if (! presets[preset_name])
	{
		console.error(
			`${bold(`metalbox.presets.${preset_name}`)}` +
			` not found in ${bold('package.json')}` +
			` at ${clc.italic.cyan(rootpath())}`
		)
		process.exit(-1)
	}

	var preset = presets[preset_name]

	try
	{
		if (! Array.isArray(preset)) throw new Error('must be array')
		if (preset.length !== 2) throw new Error('must be (Release, options)')

		var release_name = preset[0]
		var options = preset[1]
	}
	catch (e)
	{
		console.error(`preset error: ${clc.red(e.message)}`)
		process.exit(-1)
	}

	try
	{
		var dynamic_require = (require /* : Function*/)
		var Artifact = dynamic_require(rootpath(preset_name))
	}
	catch (e)
	{
		console.log(e)
	}

	/*var release_art = Proxy(artifact, construct =>
	{
		return (env) =>
		{
			env = Object.assign({}, env)

			env.version = manifest.version

			env.src = Rootpath(rootpath())
			env.dst = Rootpath(rootpath('release/dev'))

			env.printer  = Printer(process.stdout)
			env.notifier = ReleaseNotify(env)

			// env.is_esc = false
			env.src = Rootpath(rootpath('test/_/release-src/frontend')) // TODO

			return construct(env)
		}
	})*/
})
/* eslint-enable complexity */

program.parse(process.argv)
