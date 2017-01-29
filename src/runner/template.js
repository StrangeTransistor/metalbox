/* @flow */

var findRoot = require('find-root')
var Rootpath = require('rootpath')

var load = require('fs-sync').readJSON

var clc = require('cli-color')
var bold = clc.bold

var With = require('../artifact/With')

var Printer = require('../printer')
var ReleaseNotify = require('../notify/release-notify')

var resolve = require('./_/resolve')

module.exports = (template /* :{ template: string } */) =>
{
	var template_name = template.template

	var rootpath = Rootpath(findRoot(process.cwd()))

	var manifest = load(rootpath('package.json'))

	var Artifact /* :() => T_Artifact<any> */

	try
	{
		Artifact = resolve(rootpath, template_name)
	}
	catch (e)
	{
		console.error(`could not resolve Release ${bold(template_name)}`)

		process.exit(-1)
	}


	var printer = Printer(process.stdout)


	/* @flow-off */
	var sealed_artifact = With(Artifact(), () =>
	{
		var env = {}

		env.version = manifest.version

		env.dst = Rootpath(rootpath(process.cwd()))

		env.printer  = printer
		env.notifier = ReleaseNotify(env)

		return env
	})

	/*return*/ sealed_artifact.construct()
	.then(() =>
	{
		printer.write(`${bold('OK:')} ${template_name}`)
	},
	error =>
	{
		// TODO dry
		printer.write(`${bold.red('ERROR:')} ${error.message}`)
		printer.detail(error)
	})
	.finally(process.exit)
}
