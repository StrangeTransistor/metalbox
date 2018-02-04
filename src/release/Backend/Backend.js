/* @flow */

var Defaults = require('../../artifact/Defaults')
var Release  = require('../../artifact/Release')

var Manifest = require('../metalbucket/Manifest')
var Package  = require('./Package')
var json     = require('./json')
var rollup   = require('./rollup')
var Other    = require('./Other')

var defaults =
{
	instance: 'battle'
}

module.exports = function Backend /* ::<Env: EnvBackend> */ ()
	/* :T_Release<Env> */
{
	return Defaults(defaults, Release(
	[
		Manifest(),
		Package(),
		json.Prod(),
		rollup.Prod(),
		Other(),
	]))
}
