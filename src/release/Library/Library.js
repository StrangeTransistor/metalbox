/* @flow */

var Release = require('../../artifact/Release')

var Manifest = require('../metalbucket/Manifest')
var Package  = require('./Package')
var rollup   = require('./rollup')

module.exports = function Library /* ::<Env: EnvRelease> */ ()
	/* :T_Release<Env> */
{
	return Release(
	[
		Manifest(),
		Package(),
		rollup.Modern(),
		rollup.Standard(),
	])
}
