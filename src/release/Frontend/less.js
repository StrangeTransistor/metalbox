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
	var less = module.exports.Standard()

	var art = Artifact(env =>
	{
		console.log('artifact start')

		return less
		.construct(env)
		.then(() =>
		{
			throw new Error('less_error')
			// console.log('artifact stop')
		})
	})

	art.describe = less.describe

	return Watch('.', art)
}

module.exports.Min = function ()
{
	return File('index.css', Pipeline(
		LessCss(),
		Autoprefixer(),
		CssNano()
	))
}
