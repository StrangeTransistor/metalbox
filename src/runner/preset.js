/* @flow */

var findRoot = require('find-root')
var Rootpath = require('rootpath')

var load = require('fs-sync').readJSON

var clc = require('cli-color')
var bold = clc.bold

var resolve = require('./_/resolve-shortcut')
var run_sealed = require('./_/run-sealed')

/* eslint-disable complexity */
module.exports = (preset_name /* :string */, yargv /* :yargv */) =>
{
	/*if (! preset_name)
	{
		console.log(`pass ${bold('<preset>')},` +
			` one of ${bold('metalbox.presets')},` +
			` located in ${bold('package.json')}`
		)
		process.exit(-1)
	}*/

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
		if (preset.length > 2) throw new Error('must be (Release, [ options ])')

		var release_name = preset[0]
		var options = preset[1]
	}
	catch (e)
	{
		console.error(`preset error: ${clc.red(e.message)}`)
		process.exit(-1)
	}

	/* @flow-off */
	var Artifact /* :() => T_Artifact<any> */ = resolve(rootpath, release_name)

	run_sealed(Artifact,
	{
		options: options,
		manifest: manifest,
		rootpath: rootpath,
		preset_name: preset_name,
		yargv: yargv
	})
}
/* eslint-enable complexity */
