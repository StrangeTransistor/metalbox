/* @flow */

var File  = require('../../artifact/File')
var Watch = require('../../artifact/Watch')
var Artifact = require('../../artifact/Artifact')

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
	return Watch('.', Artifact(env =>
	{
		console.log('artifact start')

		return module.exports.Standard()
		.construct(env)
		.then(() =>
		{
			console.log('artifact stop')
		})
	}))
}

module.exports.Min = function ()
{
	return File('index.css', Pipeline(
		LessCss(),
		Autoprefixer(),
		CssNano()
	))
}
