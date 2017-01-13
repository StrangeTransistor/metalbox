/* @flow */

var findRoot = require('find-root')
var Rootpath = require('rootpath')

var load = require('fs-sync').readJSON

var clc = require('cli-color')
var bold = clc.bold

var program = require('commander')


var With = require('./artifact/With')

var Printer = require('./printer')
var ReleaseNotify = require('./notify/release-notify')


/* eslint-disable complexity */
module.exports = (argv /* :Array<string> */) =>
{
	var preset_name = ''

	program
	.arguments('<preset>').action(it =>
	{
		preset_name = it
	})

	program.parse(argv)

	if (! preset_name)
	{
		console.log(`pass ${bold('<preset>')},` +
			` one of ${bold('metalbox.presets')},` +
			` located in ${bold('package.json')}`
		)
		process.exit(-1)
	}

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

	var Artifact /* :() => T_Artifact<any> */

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
		var dynamic_require
		= (require /* :(string) => () => T_Artifact<any> */)

		/* @flow-off */
		var Artifact = dynamic_require(rootpath(release_name))
	}
	catch (e)
	{

	try
	{
		/* @flow-off */
		var local_release = rootpath('src/release/', release_name)

		/* @flow-off */
		var Artifact = dynamic_require(rootpath(local_release))
	}
	catch (e)
	{
		console.error(`could not resolve Release ${bold(release_name)}`)

		process.exit(-1)
	}
	}

	var printer = Printer(process.stdout)

	/* @flow-off */
	var sealed_artifact = With(Artifact(), () =>
	{
		var env = Object.assign({}, options)

		env.version = manifest.version

		env.src = Rootpath(rootpath(env.src || ''))
		env.dst = Rootpath(rootpath(env.dst || [ 'release', preset_name]))

		env.printer  = printer
		env.notifier = ReleaseNotify(env)

		// printer.detail(env)

		return env
	})

	return sealed_artifact.construct()
	.then(() =>
	{
		printer.write(`${bold('OK:')} ${preset_name}`)
	},
	error =>
	{
		// TODO dry
		printer.write(`${bold.red('ERROR:')} ${error.message}`)
	})
	.finally(process.exit)
}
/* eslint-enable complexity */
