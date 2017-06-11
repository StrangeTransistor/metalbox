/* @flow */

var File = require('../../artifact/File')
var Heat = require('../../artifact/Watch/Heat')

var Pipeline = require('../../producer/Pipeline')

var LessCss = require('../metalbucket/producer/LessCss')
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
	return Heat(env => env.buckets('**/*.less'), Standard())
}


var hashed = (env) => `index.${env.hash}.css`

module.exports.Min = function ()
{
	return File(hashed, Pipeline(
		LessCss(),
		Autoprefixer(),
		CssNano()
	))
}
