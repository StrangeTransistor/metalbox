/* @flow */

var exists = require('fs-sync').exists
var find = require('globule').find

var glob_resolve = require('../../glob-resolve')

module.exports = function js_mode (env /* :EnvIn */) /* :string */
{
	if (exists(env.src('tsconfig.json')))
	{
		return 'ts'
	}

	var glob = glob_resolve(env.src(), [ '**.ts' ])

	if (find(glob).length)
	{
		return 'ts'
	}

	return 'flow'
}
