/* @flow */

var File  = require('../../artifact/File')
var Watch = require('../../artifact/Watch')


var Pipeline = require('../../producer/Pipeline')

var Rollup = require('../../producer/rollup/Rollup')
var Babili = require('../../pipe/Babili')

var Standard = module.exports.Standard = function ()
{
	return File('index.js', Rollup())
}

module.exports.Watch = function ()
{
	return Watch(env => env.src(env.buckets_path, '*/*.js'), Standard())
}

module.exports.Min = function ()
{
	return File('index.js', Pipeline(
		Rollup(),
		Babili()
	))
}
