/* @flow */

var Rootpath = require('rootpath')
var ReleaseNotify = require('../../notify/release-notify')

/* ::

import type { SealedEnv } from './run-sealed'

export type PreEnv
= SealedEnv
&
{
	printer: T_Printer
};

*/

/* eslint-disable complexity */
module.exports = (pre_env /* :PreEnv */) =>
{
	var env = Object.assign({}, pre_env.options)

	env.package = pre_env.manifest

	var rootpath = pre_env.rootpath

	env.src = Rootpath(rootpath(env.src || ''))
	env.dst = Rootpath(rootpath(env.dst || [ 'release', pre_env.preset_name ]))

	env.printer  = pre_env.printer
	env.notifier = ReleaseNotify(env)

	var yargv = pre_env.yargv

	if (yargv.env)
	{
		Object.assign(env, yargv.env)
	}

	if (~ yargv._.indexOf(-1))
	{
		env.once = true
	}

	if (yargv.instance)
	{
		env.instance = yargv.instance
	}

	return env
}
/* eslint-enable complexity */
