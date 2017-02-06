/* @flow */

var findRoot = require('find-root')
var Rootpath = require('rootpath')

var load = require('fs-sync').readJSON

var bold = require('cli-color').bold

var With = require('../artifact/With')

var Printer = require('../printer')
var ReleaseNotify = require('../notify/release-notify')

var resolve = require('./_/resolve')
var output  = require('./_/output')

module.exports = (template_name /* :string */) =>
{
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

		env.package = manifest

		env.dst = Rootpath(rootpath(process.cwd()))

		env.printer  = printer
		env.notifier = ReleaseNotify(env)

		return env
	})

	output(printer, template_name, sealed_artifact.construct())
	.finally(process.exit)
}
