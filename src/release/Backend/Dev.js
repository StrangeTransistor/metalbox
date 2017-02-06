/* @flow */

var Release  = require('../../artifact/Release')
var Parallel = require('../../artifact/Parallel')
var Command  = require('../../artifact/Command')

var Manifest = require('../metalbucket/Manifest')
var Package  = require('./Package')
var rollup   = require('./rollup')

var Esc = require('../../artifact/Esc')

module.exports = function Backend /* ::<Env: EnvBackend> */ ()
	/* :T_Release<Env> */
{
	return Release(
	[
		Manifest(),
		Package(),
		Esc(Parallel(
		[
			rollup.Watch(),
			Command('npm', [ 'run', 'serve' ])
		])),
	])
}
