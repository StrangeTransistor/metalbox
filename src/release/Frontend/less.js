/* @flow */

var File = require('../../artifact/File')

var Pipeline = require('../../producer/Pipeline')

var LessCss = require('../../producer/LessCss')
var Autoprefixer = require('../../pipe/Autoprefixer')
var CssNano = require('../../pipe/CssNano')

module.exports.Standard = function ()
{
	return File('index.css', Pipeline(
		LessCss(),
		Autoprefixer()
	))
}

module.exports.Live = function ()
{
	// return Standard
}

module.exports.Min = function ()
{
	return File('index.css', Pipeline(
		LessCss(),
		Autoprefixer(),
		CssNano()
	))
}
