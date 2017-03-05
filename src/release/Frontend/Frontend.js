/* @flow */

var defaults = require('./defaults')
var Release  = require('../../artifact/Release')

var Manifest = require('../metalbucket/Manifest')
var pug  = require('./pug')
var less = require('./less')
var rollup = require('./rollup')
var assets = require('./assets')

module.exports = function Frontend /* ::<Env: EnvFrontend> */ ()
	/* :T_Release<Env> */
{
	return defaults({},
	Release(
	[
		Manifest(),
		pug.Min(),
		less.Min(),
		rollup.Min(),
		assets.Standard()
	]))
}
