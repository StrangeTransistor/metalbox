/* @flow */

var Release = require('../../artifact/Release')

var Manifest = require('../metalbucket/Manifest')
var Package  = require('./Package')
var rollup   = require('./rollup')

module.exports = function Backend /* ::<Env: EnvBackend> */ ()
	/* :T_Release<Env> */
{
	return Release(
	[
		Manifest(),
		Package(),
		rollup.Standard(),
	])
}
