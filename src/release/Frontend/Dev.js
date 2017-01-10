/* @flow */

var defaults = require('./defaults')
var Release  = require('../../artifact/Release')

var Manifest = require('./Manifest')
var pug  = require('./pug')
var less = require('./less')
var rollup = require('./rollup')
var Assets = require('./Assets')

module.exports = function Frontend /* ::<Env: EnvFrontend> */
(
	is_watch /* :?bool */
)
	/* :T_Release<Env> */
{
	return defaults(Release(
	[
		Manifest(),
		pug.Standard(),
		less.Live(is_watch),
		rollup.Standard(),
		Assets()
	]))
}
