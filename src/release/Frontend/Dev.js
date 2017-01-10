/* @flow */

var defaults = require('./defaults')
var Release  = require('../../artifact/Release')

var Manifest = require('./Manifest')
var pug  = require('./pug')
var less = require('./less')
var rollup = require('./rollup')
var Assets = require('./Assets')

var Esc = require('../../artifact/Esc')
var Composite = require('../../artifact/Composite')

module.exports = function Frontend /* ::<Env: EnvFrontend> */ ()
	/* :T_Release<Env> */
{
	return defaults(Release(
	[
		Manifest(),
		Esc(Composite(
		[
			pug.Watch(),
			less.Watch(),
			rollup.Watch(),
			Assets()
		]))
	]))
}
