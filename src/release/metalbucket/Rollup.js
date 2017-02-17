/* @flow */

var File = require('../../artifact/File')
var Rollup = require('../../producer/rollup/Backend')

module.exports = () =>
{
	return File(env => env.entry, Rollup())
}
