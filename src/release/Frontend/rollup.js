/* @flow */

var File = require('../../artifact/File')

var Pipeline = require('../../producer/Pipeline')

var Rollup = require('../../producer/Rollup')
var Babili = require('../../pipe/Babili')

module.exports.Standard = function ()
{
	return File('index.js', Pipeline(
		Rollup()
	))
}

module.exports.Live = function ()
{
	// return Standard
}

module.exports.Min = function ()
{
	return File('index.js', Pipeline(
		Rollup(),
		Babili()
	))
}
