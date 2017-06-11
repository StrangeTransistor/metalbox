/* @flow */

var defaults = require('./defaults')
var Release  = require('../../artifact/Release')
var Buckets  = require('./Buckets')
var Hash     = require('./Hash')

var Manifest = require('../metalbucket/Manifest')
var pug  = require('./pug')
var less = require('./less')
var rollup = require('./rollup')
var assets = require('./assets')
var vendor = require('./vendor')

var Clean = require('./Clean')

module.exports = function Frontend /* ::<Env: EnvFrontendOptional> */ ()
	/* :T_Release<Env> */
{
	return defaults({}, Buckets(Hash(
	Release(
	[
		Clean(),
		Manifest(),
		pug.Min(),
		less.Min(),
		rollup.Min(),
		assets.Min(),
		vendor.Standard(),
	]))))
}
