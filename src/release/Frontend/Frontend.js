/* @flow */

var defaults = require('./defaults')
var Release  = require('../../artifact/Release')

var Manifest = require('../metalbucket/Manifest')
var pug  = require('./pug')
var less = require('./less')
var rollup = require('./rollup')
var assets = require('./assets')

var Hash = require('./Hash')

module.exports = function Frontend /* ::<Env: EnvFrontend> */ ()
	/* :T_Release<Env> */
{
	return defaults({}, Hash(
	Release(
	[
		Manifest(),
		pug.Min(),
		less.Min(),
		rollup.Min(),
		assets.Min(),
	])))
}
