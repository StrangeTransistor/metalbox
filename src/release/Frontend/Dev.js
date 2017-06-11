/* @flow */

var defaults = require('./defaults')
var Release  = require('../../artifact/Release')
var Buckets  = require('./Buckets')

var Manifest = require('../metalbucket/Manifest')

var pug  = require('./pug')
var less = require('./less')
var rollup = require('./rollup')
var assets = require('./assets')
var vendor = require('./vendor')

var Serve  = require('../metalbucket/Serve')

var Esc = require('../../artifact/Esc')
var Parallel = require('../../artifact/Parallel')

module.exports = function Frontend /* ::<Env: EnvFrontendOptional> */ ()
	/* :T_Release<Env> */
{
	return defaults({ dev: true }, Buckets(
	Release(
	[
		Manifest(),
		Esc(Parallel(
		[
			pug.Watch(),
			less.Watch(),
			rollup.Watch(),
			assets.Watch(),
			vendor.Standard(),
			Serve(),
		]))
	])))
}
