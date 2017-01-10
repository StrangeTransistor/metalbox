/* @flow */

var defaults = require('./defaults')
var Release  = require('../../artifact/Release')

var Manifest = require('./Manifest')
var pug  = require('./pug')
var less = require('./less')
var rollup = require('./rollup')
var assets = require('./assets')

var Esc = require('../../artifact/Esc')
var Parallel = require('../../artifact/Parallel')

module.exports = function Frontend /* ::<Env: EnvFrontend> */ ()
	/* :T_Release<Env> */
{
	return defaults(Release(
	[
		Manifest(),
		Esc(Parallel(
		[
			pug.Watch(),
			less.Watch(),
			rollup.Watch(),
			assets.Watch()
		]))
	]))
}
