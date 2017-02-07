/* @flow */

var load = require('fs-sync').readJSON

var Printer = require('../../src/printer')
var ReleaseNotify = require('../../src/notify/release-notify')

/* ::

type Options =
{
	notify?: boolean
}

*/

module.exports =
(
	src /* :T_Rootpath */,
	tmp /* :T_Rootpath */,
	options /* :?Options */
) =>
{
	options = Object.assign(
	{
		notify: false,
	}
	, options)

	var env =
	{
		package: load(src('package.json')),

		instance: 'battle',

		src: src,
		dst: tmp,

		printer: Printer(process.stdout),
	}

	if (options.notify)
	{
		/* @flow-off */
		env.notifier = ReleaseNotify(env)
	}

	return env
}
