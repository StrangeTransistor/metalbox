/* @flow */

var Release  = require('../../artifact/Release')
var Parallel = require('../../artifact/Parallel')

var Manifest = require('../metalbucket/Manifest')
var Package  = require('./Package')
var json     = require('./json')
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
		json.Dev(),
		Esc(Parallel(
		[
			rollup.Watch(),
			Serve()
		])),
	])
}
