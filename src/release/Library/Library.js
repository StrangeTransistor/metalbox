/* @flow */

var Release = require('../../artifact/Release')

var Manifest = require('../metalbucket/Manifest')
var Package  = require('./Package')
var rollup   = require('./rollup')
var Other    = require('./Other')

module.exports = function Library /* ::<Env: EnvRelease> */ ()
	/* :T_Release<Env> */
{
	return Release(
	[
		Manifest(),
		Package(),
		rollup.Prod(),
		rollup.Types(),
		Other()
	])
}
