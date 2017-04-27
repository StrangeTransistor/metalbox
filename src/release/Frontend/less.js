/* @flow */

var File = require('../../artifact/File')
var Heat = require('../../artifact/Watch/Heat')

var Pipeline = require('../../producer/Pipeline')

var LessCss = require('../metalbucket/LessCss')
var Autoprefixer = require('../../pipe/Autoprefixer')
var CssNano = require('../../pipe/CssNano')

var Standard = module.exports.Standard = function ()
{
	return File('index.css', Pipeline(
		LessCss(),
		Autoprefixer()
	))
}

module.exports.Watch = function ()
{
	return Heat(env => env.src(env.buckets_path, '**/*.less'), Standard())
}

module.exports.Min = function ()
{
	return File('index.css', Pipeline(
		LessCss(),
		Autoprefixer(),
		CssNano()
	))
}
