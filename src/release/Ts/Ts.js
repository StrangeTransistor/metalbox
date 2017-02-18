/* @flow */

var File = require('../../artifact/File')
var Release = require('../../artifact/Release')

var Rollup = require('./rollup')

module.exports = function Frontend /* ::<Env: EnvFrontend> */ ()
	/* :T_Release<Env> */
{
	return Release(
	[
		File('index.js', Rollup()),
	])
}
