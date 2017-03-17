/* @flow */

var Defaults = require('../../artifact/Defaults')
var Release  = require('../../artifact/Release')
var Parallel = require('../../artifact/Parallel')

var Manifest = require('../metalbucket/Manifest')
var Package  = require('./Package')
var json     = require('./json')
var rollup   = require('./rollup')
var Serve    = require('../metalbucket/Serve')

var Esc = require('../../artifact/Esc')

var defaults =
{
	instance: 'dev'
}

module.exports = function Backend /* ::<Env: EnvBackend> */ ()
	/* :T_Release<Env> */
{
	return Defaults(defaults, Release(
	[
		Manifest(),
		Package(),
		Esc(Parallel(
		[
			rollup.Watch(),
			json.Watch(),
			Serve()
		])),
	]))
}
