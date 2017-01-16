/* @flow */

var Release = require('../../artifact/Release')

var Manifest = require('../metalbucket/Manifest')
var rollup = require('./rollup')

var Esc = require('../../artifact/Esc')

module.exports = function Backend /* ::<Env: EnvBackend & EnvPrinter> */ ()
	/* :T_Release<Env> */
{
	return Release(
	[
		Manifest(),
		Esc(rollup.Watch()),
	])
}
