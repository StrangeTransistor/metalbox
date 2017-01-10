/* @flow */

var File  = require('../../artifact/File')
var Watch = require('../../artifact/Watch')
var Esc   = require('../../artifact/Esc')

var Pipeline = require('../../producer/Pipeline')

var LessCss = require('../../producer/LessCss')
var Autoprefixer = require('../../pipe/Autoprefixer')
var CssNano = require('../../pipe/CssNano')

var Standard = module.exports.Standard = function ()
{
	return File('index.css', Pipeline(
		LessCss(),
		Autoprefixer()
	))
}

module.exports.Live = function ()
{
	return Esc(Watch(env => env.src(env.buckets_path, '*/*.less'),
		Standard()
	))
}

module.exports.Min = function ()
{
	return File('index.css', Pipeline(
		LessCss(),
		Autoprefixer(),
		CssNano()
	))
}
