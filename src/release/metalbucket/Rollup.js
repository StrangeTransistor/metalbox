/* @flow */

var File = require('../../artifact/File')
var Rollup = require('../../producer/rollup/Backend')

module.exports = () =>
{
	var art = File(env => env.entry, Rollup())

	art.describe = () =>
	{
		return '[Rollup]'
	}

	return art
}
