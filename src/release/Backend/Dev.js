/* @flow */

var Release  = require('../../artifact/Release')
var Parallel = require('../../artifact/Parallel')

var Manifest = require('../metalbucket/Manifest')
var Package  = require('./Package')
var rollup   = require('./rollup')
var Serve    = require('./Serve')

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
			Serve()
		])),
	])
}
