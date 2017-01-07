/* @flow */

var defaults = require('./defaults')
var Release  = require('../Release')

var Manifest = require('./Manifest')
var pug  = require('./pug')
var less = require('./less')
var rollup = require('./rollup')
var Assets = require('./Assets')

module.exports = function Frontend /* ::<Env: EnvFrontend> */ ()
	/* :T_Release<Env> */
{
	return defaults(Release(
	[
		Manifest(),
		pug.Standard(),
		less.Standard(),
		rollup.Standard(),
		Assets()
	]))
}
