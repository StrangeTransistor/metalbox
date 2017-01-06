/* @flow */

var defaults = require('./defaults')
var Manifest = require('./Manifest')

var File = require('../../artifact/File')
var Glob = require('../../artifact/Glob')

var Pipeline = require('../../producer/Pipeline')

var Pug = require('../../producer/Pug')

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
		File('index.html', Pug()),
		File('index.css', Pipeline(
			LessCss(),
			Autoprefixer(),
			CssNano()
		)),
		File('index.js', Pipeline(
			Rollup(),
			Babili()
		)),
		Glob(env => env.src(env.buckets_path), '**/*.@(jpg|png|gif)', 'assets')
	]))
}
