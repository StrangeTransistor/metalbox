/* @flow */

var defaults = require('./defaults')
var Manifest = require('./Manifest')

var pug = require('./pug')
var Assets = require('./Assets')

var File = require('../../artifact/File')

var Pipeline = require('../../producer/Pipeline')

var LessCss = require('../../producer/LessCss')
var Autoprefixer = require('../../pipe/Autoprefixer')
var CssNano = require('../../pipe/CssNano')

var Rollup = require('../../producer/Rollup')
var Babili = require('../../pipe/Babili')

var Release = require('../Release')

module.exports = function Frontend /* ::<Env: EnvFrontend> */ ()
	/* :T_Release<Env> */
{
	return defaults(Release(
	[
		Manifest(),
		pug.Standard(),
		File('index.css', Pipeline(
			LessCss(),
			Autoprefixer(),
			CssNano()
		)),
		File('index.js', Pipeline(
			Rollup(),
			Babili()
		)),
		Assets()
	]))
}
