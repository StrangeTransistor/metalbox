/* @flow */

var Release = require('../../artifact/Release')

var Manifest = require('../metalbucket/Manifest')
var rollup = require('./rollup')

module.exports = function Backend /* ::<Env: EnvBackend & EnvPrinter> */ ()
	/* :T_Release<Env> */
{
	return Release(
	[
		Manifest(),
		rollup.Standard(),
	])
}
